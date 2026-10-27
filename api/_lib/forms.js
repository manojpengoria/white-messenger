/** Server-side form definitions. They mirror the client-side rules; the server is the source of truth. */
export const FORMS = {
  inquiry: {
    title: 'Project inquiry',
    emailField: 'business_email',
    nameField: 'full_name',
    fields: {
      full_name: { label: 'Full name', required: true, max: 120 },
      business_email: { label: 'Business email', required: true, type: 'email', max: 200 },
      company: { label: 'Company', required: true, max: 160 },
      phone: { label: 'Phone', type: 'phone', max: 30 },
      country: { label: 'Country', required: true, max: 80 },
      service: { label: 'Service of interest', required: true, max: 120 },
      budget: { label: 'Estimated budget', max: 80 },
      timeline: { label: 'Expected timeline', max: 80 },
      project_details: { label: 'Project details', required: true, min: 30, max: 5000, multiline: true },
    },
    subject: (d) => `New project inquiry: ${d.company} (${d.service})`,
    confirmSubject: 'We have received your inquiry | White Messenger',
    confirmText: 'Thank you for contacting White Messenger. We have received your project inquiry, and a member of our team will review it and reply by email.',
  },
  careers: {
    title: 'Career inquiry',
    emailField: 'email',
    nameField: 'full_name',
    fields: {
      full_name: { label: 'Full name', required: true, max: 120 },
      email: { label: 'Email address', required: true, type: 'email', max: 200 },
      phone: { label: 'Phone', type: 'phone', max: 30 },
      area: { label: 'Area of interest', required: true, max: 120 },
      experience: { label: 'Years of experience', required: true, max: 60 },
      profile_url: { label: 'Profile or portfolio link', required: true, type: 'url', max: 300 },
      message: { label: 'About the candidate', required: true, min: 30, max: 5000, multiline: true },
    },
    subject: (d) => `New career inquiry: ${d.full_name} (${d.area})`,
    confirmSubject: 'Thank you for your interest in White Messenger',
    confirmText: 'Thank you for your interest in working with White Messenger. We have received your career inquiry and will keep your details on file. If a suitable opportunity arises, we will contact you.',
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;
const URL_RE = /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i;

/** Returns { data, errors } where errors maps field name → message. */
export function validate(form, body) {
  const data = {};
  const errors = {};
  for (const [name, f] of Object.entries(form.fields)) {
    const raw = body[name];
    const v = (Array.isArray(raw) ? raw[0] : raw ?? '').toString().replace(/\r\n/g, '\n').trim();
    data[name] = v;
    if (f.required && !v) { errors[name] = `${f.label} is required.`; continue; }
    if (!v) continue;
    if (f.max && v.length > f.max) errors[name] = `${f.label} must be at most ${f.max} characters.`;
    else if (f.min && v.length < f.min) errors[name] = `${f.label} must be at least ${f.min} characters.`;
    else if (f.type === 'email' && !EMAIL_RE.test(v)) errors[name] = 'Please enter a valid email address.';
    else if (f.type === 'phone' && !PHONE_RE.test(v)) errors[name] = 'Please enter a valid phone number.';
    else if (f.type === 'url' && !URL_RE.test(v)) errors[name] = 'Please enter a full web address starting with https://';
    else if (!f.multiline && /[\n<>]/.test(v)) errors[name] = `${f.label} contains characters that are not allowed.`;
  }
  if (body.consent !== 'yes') errors.consent = 'Consent is required.';
  return { data, errors };
}
