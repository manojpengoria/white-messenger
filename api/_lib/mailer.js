/**
 * Email sending. Provider is chosen from environment variables:
 *   RESEND_API_KEY                         → Resend HTTP API (recommended)
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS → any SMTP mailbox (Gmail/Workspace app password, Zoho, Hostinger…)
 *   MAIL_DRY_RUN=1                         → log emails instead of sending (local testing)
 * MAIL_FROM sets the sender, e.g. "White Messenger <noreply@whitemessenger.com>".
 */
export function mailFrom() {
  return process.env.MAIL_FROM || (process.env.SMTP_USER ? `White Messenger <${process.env.SMTP_USER}>` : 'White Messenger <noreply@whitemessenger.com>');
}

export async function sendMail({ to, replyTo, subject, html, text }) {
  const from = mailFrom();
  const recipients = Array.isArray(to) ? to : [to];

  if (process.env.MAIL_DRY_RUN === '1') {
    console.log(`[mail:dry-run] from=${from} to=${recipients.join(',')} replyTo=${replyTo || '-'} subject="${subject}"\n${text}\n`);
    return;
  }

  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: recipients, subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return;
  }

  if (process.env.SMTP_HOST) {
    const { default: nodemailer } = await import('nodemailer');
    const port = Number(process.env.SMTP_PORT || 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transport.sendMail({ from, to: recipients.join(', '), replyTo, subject, html, text });
    return;
  }

  throw new Error('No email provider configured. Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS.');
}
