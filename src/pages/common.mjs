/** Section building blocks shared by the detail-page templates. */
import {
  section, sectionHeader, eyebrow, paragraphs, checklist, grid, featureCard, numberedCard,
  esc, icon,
} from '../lib/components.mjs';

let uid = 0;
const sid = (p) => `${p}-${++uid}`;

/** Two-column intro: heading on the left, paragraphs (+ optional checklist) on the right. */
export function introBlock({ eyebrow: eb, heading, paras, list, listTitle, tone = 'white' }) {
  const id = sid('intro');
  return section(`<div class="grid gap-10 lg:grid-cols-12">
  <div class="lg:col-span-5">${eyebrow(eb)}<h2 id="${id}" class="section-title ${eb ? 'mt-3' : ''}">${esc(heading)}</h2></div>
  <div class="space-y-5 lg:col-span-7">${paragraphs(paras, 'text-base leading-relaxed text-slate-600 sm:text-lg')}
    ${list ? `<div class="rounded-2xl border border-slate-200 bg-surface p-6">${listTitle ? `<h3 class="mb-4 font-bold text-navy-950">${esc(listTitle)}</h3>` : ''}${checklist(list)}</div>` : ''}
  </div>
</div>`, { tone, labelledby: id });
}

/** Generic card grid section. kind: feature | numbered | warn | plain */
export function cardsSection({ eyebrow: eb, title, lead, items, kind = 'feature', cols = 3, tone = 'white', align = 'left', anchor = '' }) {
  const id = sid('cards');
  const cards = items.map((it, i) => {
    if (kind === 'feature') return featureCard(it);
    if (kind === 'numbered') return numberedCard(it, i);
    if (kind === 'warn') return numberedCard(it, i, 'warn');
    return `<div class="card h-full p-6"><h3 class="text-base font-bold text-navy-950">${esc(it.t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(it.d)}</p></div>`;
  });
  return section(`${sectionHeader({ eyebrow: eb, title, lead, align, id })}${grid(cards, cols)}`, { tone, labelledby: id, id: anchor });
}

/** Paragraph + checklist “approach” section. */
export function approachSection({ eyebrow: eb = 'Our approach', title, lead, points, tone = 'surface' }) {
  const id = sid('approach');
  return section(`<div class="grid items-start gap-10 lg:grid-cols-12">
  <div class="lg:col-span-5">${eyebrow(eb)}<h2 id="${id}" class="section-title mt-3">${esc(title)}</h2>${lead ? `<p class="mt-4 text-lg leading-relaxed text-slate-600">${esc(lead)}</p>` : ''}</div>
  <div class="lg:col-span-7"><div class="card p-6 sm:p-8">${checklist(points)}</div></div>
</div>`, { tone, labelledby: id });
}

/** Use cases rendered as tagged cards. */
export function useCasesSection({ eyebrow: eb = 'Use cases', title, lead, items, tone = 'white', tag = 'Use case' }) {
  const id = sid('uses');
  const cards = items.map((u) => `<div class="card h-full p-6"><span class="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-700 ring-1 ring-teal-100">${icon('sparkles', 'h-3 w-3')}${esc(tag)}</span><h3 class="mt-4 text-base font-bold text-navy-950">${esc(u.t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(u.d)}</p></div>`);
  return section(`${sectionHeader({ eyebrow: eb, title, lead, id })}${grid(cards, items.length === 4 ? 2 : 3)}`, { tone, labelledby: id });
}

export function sectionWith(inner, { eyebrow: eb, title, lead, tone = 'white', align = 'left' }) {
  const id = sid('sec');
  return section(`${sectionHeader({ eyebrow: eb, title, lead, align, id })}${inner}`, { tone, labelledby: id });
}

/** Responsive data table wrapped for horizontal scroll on small screens. */
export function table(columns, rows, caption) {
  return `<div class="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card" tabindex="0" role="region" aria-label="${esc(caption)}">
  <table class="table-wm"><caption class="sr-only">${esc(caption)}</caption>
    <thead><tr>${columns.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row" class="!bg-white font-semibold text-navy-950">${c}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody>
  </table>
</div>`;
}

/** Accessible tabs (ARIA tabs pattern, wired up by main.js). */
export function tabs(name, label, items) {
  return `<div data-tabs>
  <div role="tablist" aria-label="${esc(label)}" class="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:inline-flex sm:rounded-full sm:bg-surface sm:p-1.5 sm:ring-1 sm:ring-slate-200">
    ${items.map((t, i) => `<button type="button" role="tab" id="${name}-tab-${i}" aria-controls="${name}-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" class="tab-btn">${esc(t.label)}</button>`).join('')}
  </div>
  ${items.map((t, i) => `<div role="tabpanel" id="${name}-panel-${i}" aria-labelledby="${name}-tab-${i}" tabindex="0" class="mt-8" ${i ? 'hidden' : ''}>${t.html}</div>`).join('')}
</div>`;
}
