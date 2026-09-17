// Names and academic ranks are transcribed from the supplied institutional record.
// Store names explicitly per language; Russian uses practical transcription, not a letter swap.
// Canonical Serbian ranks are localized through titles.js when rendered.
export const team = [
  { id: 'aleksandar-selakov', name: { sr: 'Александар Селаков', en: 'Aleksandar Selakov', de: 'Aleksandar Selakov', ru: 'Александар Селаков' }, title: 'ванр. проф. др', head: false, email: 'aselakov@uns.ac.rs', ftnProfileUrl: 'https://ftn.uns.ac.rs/1874/aleksandar-selakov' },
  { id: 'milana-bojanic', name: { sr: 'Милана Бојанић', en: 'Milana Bojanić', de: 'Milana Bojanić', ru: 'Милана Боянич' }, title: 'ванр. проф. др', head: false, email: 'milana.bojanic@uns.ac.rs', ftnProfileUrl: 'https://ftn.uns.ac.rs/1569/milana-bojanic' },
  { id: 'nikola-petrovic', name: { sr: 'Никола Петровић', en: 'Nikola Petrović', de: 'Nikola Petrović', ru: 'Никола Петрович' }, title: 'доц. др', head: true, email: 'petrovicnikola@uns.ac.rs', ftnProfileUrl: 'https://ftn.uns.ac.rs/2906/nikola-petrovic' },
  { id: 'sladjana-turudic', name: { sr: 'Слађана Турудић', en: 'Slađana Turudić', de: 'Slađana Turudić', ru: 'Сладжана Турудич' }, title: 'асист.', head: false, email: 'sladjanaturudic@uns.ac.rs', ftnProfileUrl: 'https://ftn.uns.ac.rs/2776/sladjana-turudic' },
  { id: 'filip-djordjevic', name: { sr: 'Филип Ђорђевић', en: 'Filip Đorđević', de: 'Filip Đorđević', ru: 'Филип Джорджевич' }, title: 'асист.', head: false, email: 'filip.djordjevic@uns.ac.rs', ftnProfileUrl: 'https://ftn.uns.ac.rs/2284/filip-djordjevic' },
// Latin spelling identifies researchers consistently in Spanish, French and Chinese.
].map(member => ({ photo: null, researchInterests: null, email: null, ftnProfileUrl: null, orcid: null, googleScholar: null, researchGate: null, linkedIn: null, webpage: null, ...member, name: { ...member.name, es: member.name.en, fr: member.name.en, zh: member.name.en } }));

export const memberInitials = (member, language) => member.name[language].split(/\s+/).map(part => Array.from(part)[0]).join('');
