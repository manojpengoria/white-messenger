/**
 * Form submission handler shared by /api/inquiry and /api/careers.
 * Works as a Vercel Node function and as Express middleware (scripts/serve.mjs).
 *
 * Flow: method check → honeypot → rate limit → validation → Cloudflare Turnstile → notify team → confirm to visitor.
 * Nothing is stored; data only travels by email.
 */
import { FORMS, validate } from './forms.js';
import { sendMail } from './mailer.js';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Best-effort rate limit: 5 submissions per IP per 10 minutes, per warm server instance.
   Turnstile is the primary spam defence; this only slows down bursts. */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now(), windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('[forms] TURNSTILE_SECRET_KEY is not set; CAPTCHA verification skipped.');
    return true;
  }
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
  });
  const json = await res.json().catch(() => ({}));
  return json.success === true;
}

function teamEmail(form, data) {
  const rows = Object.entries(form.fields).map(([name, f]) => [f.label, data[name] || '—', f.multiline]);
  const html = `<div style="font-family:Arial,sans-serif;color:#111827;max-width:640px">
  <h2 style="color:#10223D;margin:0 0 4px">${esc(form.title)}</h2>
  <p style="color:#64748B;margin:0 0 16px">Submitted through whitemessenger.com. Reply to this email to respond directly.</p>
  <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
    ${rows.map(([l, v, ml]) => `<tr><td style="border-bottom:1px solid #E2E8F0;font-weight:bold;width:180px;vertical-align:top">${esc(l)}</td><td style="border-bottom:1px solid #E2E8F0;${ml ? 'white-space:pre-wrap' : ''}">${esc(v)}</td></tr>`).join('')}
  </table></div>`;
  const text = `${form.title}\n\n${rows.map(([l, v]) => `${l}: ${v}`).join('\n')}\n`;
  return { html, text };
}

/* The confirmation goes to an address typed by the visitor, so it must not echo their free text
   (that would let spammers relay content through us). Only a validated first name is used. */
function confirmationEmail(form, data) {
  const first = (data[form.nameField] || '').split(/\s+/)[0];
  const name = /^[\p{L}][\p{L}'.-]{0,39}$/u.test(first) ? first : 'there';
  const text = `Hi ${name},\n\n${form.confirmText}\n\nIf you need to add anything, simply reply to this email or write to info@whitemessenger.com.\n\nBest regards,\nWhite Messenger\nwhitemessenger.com\n`;
  const html = `<div style="font-family:Arial,sans-serif;color:#111827;max-width:560px;line-height:1.6">
  <p>Hi ${esc(name)},</p><p>${esc(form.confirmText)}</p>
  <p>If you need to add anything, simply reply to this email or write to <a href="mailto:info@whitemessenger.com" style="color:#2563EB">info@whitemessenger.com</a>.</p>
  <p>Best regards,<br><strong>White Messenger</strong><br><span style="color:#64748B">Intelligent Technology. Meaningful Progress.</span></p></div>`;
  return { html, text };
}

export function createHandler(formName) {
  const form = FORMS[formName];
  return async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ ok: false, message: 'Method not allowed.' });
    }
    const body = typeof req.body === 'object' && req.body ? req.body : {};

    // Honeypot filled: pretend success so bots learn nothing.
    if (body.website) return res.status(200).json({ ok: true });

    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
    if (rateLimited(ip)) return res.status(429).json({ ok: false, code: 'rate_limited', message: 'Too many submissions. Please try again in a few minutes.' });

    const { data, errors } = validate(form, body);
    if (Object.keys(errors).length) return res.status(422).json({ ok: false, code: 'invalid', errors });

    try {
      if (!(await verifyTurnstile(body['cf-turnstile-response'], ip))) {
        return res.status(400).json({ ok: false, code: 'captcha', message: 'The security check failed. Please complete it and try again.' });
      }
    } catch (err) {
      console.error('[forms] Turnstile verification error', err);
      return res.status(502).json({ ok: false, code: 'captcha_unavailable', message: 'The security check is temporarily unavailable. Please try again.' });
    }

    const to = (process.env.MAIL_TO || 'info@whitemessenger.com').split(',').map((s) => s.trim()).filter(Boolean);
    try {
      await sendMail({ to, replyTo: data[form.emailField], subject: form.subject(data), ...teamEmail(form, data) });
    } catch (err) {
      console.error(`[forms] Failed to send ${formName} notification`, err);
      return res.status(502).json({ ok: false, code: 'send_failed', message: 'We could not send your message right now.' });
    }

    try {
      await sendMail({ to: data[form.emailField], replyTo: to[0], subject: form.confirmSubject, ...confirmationEmail(form, data) });
    } catch (err) {
      // The team already has the inquiry; a failed confirmation should not fail the request.
      console.error(`[forms] Failed to send ${formName} confirmation`, err);
    }

    return res.status(200).json({ ok: true });
  };
}
