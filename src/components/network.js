import { icon } from './icons.js';

export function network(t) {
  return `<div class="network-art" aria-hidden="true">
    <div class="network-coordinate coord-top">LPSI <span>↗</span> ${t.hero.visualLabel}</div>
    <svg class="network-lines" viewBox="0 0 600 540" fill="none">
      <defs><linearGradient id="orbit" x1="80" y1="0" x2="520" y2="540" gradientUnits="userSpaceOnUse"><stop stop-color="#98b9e2"/><stop offset=".5" stop-color="#24a3b7"/><stop offset="1" stop-color="#4767bd"/></linearGradient><radialGradient id="aura"><stop stop-color="#dbeaff" stop-opacity=".8"/><stop offset="1" stop-color="#f6f9fd" stop-opacity="0"/></radialGradient></defs>
      <circle cx="300" cy="270" r="258" fill="url(#aura)"/>
      <g stroke="#dce6f1"><circle cx="300" cy="270" r="115"/><circle cx="300" cy="270" r="205" stroke-dasharray="3 8"/><path d="M300 35v470M65 270h470" stroke-dasharray="3 8"/></g>
      <g class="orbit" stroke="url(#orbit)" stroke-width="1.2"><ellipse cx="300" cy="270" rx="240" ry="100" transform="rotate(-35 300 270)"/><ellipse cx="300" cy="270" rx="215" ry="120" transform="rotate(45 300 270)"/><ellipse cx="300" cy="270" rx="192" ry="215" transform="rotate(-18 300 270)" opacity=".45"/></g>
      <g stroke="#b7cce4" stroke-width="1"><path d="M300 270 176 102m124 168 135-144M300 270l195 10M300 270l105 163M300 270 172 418m128-148L98 260"/></g>
      <g fill="#328ea9"><circle cx="176" cy="102" r="4"/><circle cx="435" cy="126" r="4"/><circle cx="495" cy="280" r="4"/><circle cx="405" cy="433" r="4"/><circle cx="172" cy="418" r="4"/><circle cx="98" cy="260" r="4"/></g>
      <g fill="#637fc3"><circle class="particle p1" cx="117" cy="164" r="3"/><circle class="particle p2" cx="466" cy="375" r="5"/><circle class="particle p3" cx="260" cy="469" r="3"/></g>
    </svg>
    <div class="core"><span class="core-icon">${icon('code')}</span><strong>${t.hero.center}<br>${t.hero.centerSecond}</strong><span class="core-sub">LPSI / ASE LAB</span></div>
    ${t.hero.nodes.map((label,i) => `<div class="discipline d${i}"><span class="node-dot"></span>${label}</div>`).join('')}
    <div class="network-coordinate coord-bottom"><span class="live-dot"></span>${t.institution.city}<span class="coord-mark">+ + +</span></div>
  </div>`;
}

export function projectVisual(type) {
  if (type === 'brain') return `<svg viewBox="0 0 400 170" fill="none" aria-hidden="true"><g stroke="currentColor" opacity=".18">${Array.from({length:9},(_,i)=>`<path d="M0 ${i*22}h400"/>`).join('')}</g><g stroke="currentColor" stroke-width="1.2">${[38,85,130].map((y,i)=>`<path d="M0 ${y}h30l6 -7 8 17 7 -26 7 16h20l8 -5 7 9 7 -14 8 11h30l8 -9 6 16 8 -${35+i*12} 8 ${26+i*12}h25l8 -8 6 14 8 -20 8 14h25l8 -5 8 9 8 -18 6 14h26l8 -9 8 15 8 -10h38"/>`).join('')}</g><circle cx="208" cy="85" r="49" fill="#f4f6fc" stroke="currentColor" stroke-opacity=".2"/><g transform="translate(181 58) scale(2.25)" stroke="currentColor" stroke-width=".6">${icon('brain').match(/<svg[^>]*>(.*)<\/svg>/)[1]}</g></svg>`;
  if(type === 'pulse') return `<svg viewBox="0 0 400 170" fill="none" aria-hidden="true"><g stroke="currentColor" opacity=".15">${[50,80,110,140].map((r)=>`<ellipse cx="200" cy="90" rx="${r}" ry="${r*.45}" transform="rotate(-25 200 90)"/>`).join('')}</g><path d="M0 90h80l12-12 13 23 16-32 15 21h32l11-44 17 80 17-66 12 30h36l9-12 13 22 10-10h107" stroke="currentColor" stroke-width="2"/><circle cx="200" cy="86" r="62" stroke="currentColor" stroke-dasharray="2 6" opacity=".4"/></svg>`;
  return `<svg viewBox="0 0 400 170" fill="none" aria-hidden="true"><g transform="translate(200 75) scale(1 .48) rotate(45)" stroke="currentColor">${[-110,-65,-20,25,70,115].map(n=>`<path d="M-140 ${n}H140M${n}-140V140" opacity=".16"/>`).join('')}<path d="M-110 70v-90h90v-90h90v180Z" opacity=".6"/><path d="M-110 70H25V25h90v-90H25V-110" opacity=".6"/>${[[-110,70],[-110,-20],[-20,-20],[-20,-110],[70,-110],[70,70],[25,25],[115,25],[115,-65]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="currentColor"/>`).join('')}</g><path d="M200 75v-37m0 0-14 6 14 7 14-7-14-6Z" stroke="currentColor"/></svg>`;
}
