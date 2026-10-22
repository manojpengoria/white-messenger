/**
 * Accessible form building blocks. Validation is handled by assets/js/main.js ([data-validate]).
 * Submission goes to the endpoint configured in site.config.mjs; while it is empty the form explains
 * that online submission is not yet connected. Nothing is stored in the browser.
 */
import { site } from '../site.config.mjs';
import { esc, icon, href } from '../lib/components.mjs';

export function formField({ id, name, label, type = 'text', required = false, autocomplete, placeholder = '', hint, options, minlength, full = false, rows = 6 }) {
  const req = required ? ' required aria-required="true"' : '';
  const describedby = [hint ? `${id}-hint` : '', `${id}-error`].filter(Boolean).join(' ');
  const common = `id="${id}" name="${name}" class="field-input" aria-describedby="${describedby}"${req}`;
  let control;
  if (type === 'select') {
    control = `<select ${common}><option value="">Select an option</option>${options.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`;
  } else if (type === 'textarea') {
    control = `<textarea ${common} rows="${rows}"${minlength ? ` minlength="${minlength}"` : ''} placeholder="${esc(placeholder)}"></textarea>`;
  } else {
    control = `<input ${common} type="${type}"${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}${type === 'tel' ? ' inputmode="tel" data-rule="phone"' : ''}>`;
  }
  return `<div class="${full ? 'sm:col-span-2' : ''}" data-field>
  <label for="${id}" class="field-label">${esc(label)}${required ? ' <span class="text-red-600" aria-hidden="true">*</span>' : ' <span class="font-normal text-slate-500">(optional)</span>'}</label>
  ${control}
  ${hint ? `<p id="${id}-hint" class="field-hint">${esc(hint)}</p>` : ''}
  <p id="${id}-error" class="field-error" data-error hidden></p>
</div>`;
}

export function formShell({ id, name, endpointKey, fields, submitLabel, consentText, ctx }) {
  const endpoint = site.forms[endpointKey] || '';
  return `<form id="${id}" class="card p-6 sm:p-8" novalidate data-validate data-form-name="${name}" data-endpoint="${esc(endpoint)}" data-fallback-email="${site.contact.email}">
  <div class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert" tabindex="-1" data-error-summary hidden>
    <p class="font-semibold">Please correct the following:</p><ul class="mt-2 list-disc space-y-1 pl-5" data-error-list></ul>
  </div>
  <p class="mb-6 text-sm text-slate-500">Fields marked <span class="text-red-600">*</span> are required.</p>
  <div class="grid gap-5 sm:grid-cols-2">
    ${fields.join('\n')}
    <!-- Spam trap: hidden from people, ignored by the backend if filled. -->
    <div class="hidden" aria-hidden="true"><label for="${id}-website">Website</label><input id="${id}-website" type="text" name="website" tabindex="-1" autocomplete="off"></div>
    <div class="sm:col-span-2" data-field>
      <div class="flex items-start gap-3">
        <input id="${id}-consent" name="consent" type="checkbox" value="yes" required aria-required="true" aria-describedby="${id}-consent-error" class="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
        <label for="${id}-consent" class="text-sm leading-relaxed text-slate-600">${esc(consentText)} <a class="font-semibold text-brand-700 hover:underline" href="${href(ctx, 'privacy-policy')}">Read the Privacy Policy</a>. <span class="text-red-600" aria-hidden="true">*</span></label>
      </div>
      <p id="${id}-consent-error" class="field-error" data-error hidden></p>
    </div>
  </div>
  <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <button type="submit" class="btn-primary" data-submit>${esc(submitLabel)} ${icon('send', 'h-4 w-4')}</button>
    <p class="text-xs text-slate-500">We never store your form data in your browser.</p>
  </div>
  <div class="mt-6" role="status" aria-live="polite" data-form-status></div>
</form>`;
}
