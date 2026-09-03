// Names and academic ranks are transcribed from the supplied institutional record.
// Store names explicitly per language; Russian uses practical transcription, not a letter swap.
// Academic ranks retain the original institutional wording.
export const team = [
  { id: 'nikola-petrovic', name: { sr: 'Никола Петровић', en: 'Nikola Petrović', de: 'Nikola Petrović', ru: 'Никола Петрович' }, title: 'доц. др', head: true },
  { id: 'luka-strezoski', name: { sr: 'Лука Стрезоски', en: 'Luka Strezoski', de: 'Luka Strezoski', ru: 'Лука Стрезоски' }, title: 'проф. др', head: false },
  { id: 'aleksandar-selakov', name: { sr: 'Александар Селаков', en: 'Aleksandar Selakov', de: 'Aleksandar Selakov', ru: 'Александар Селаков' }, title: 'ванр. проф. др', head: false },
  { id: 'milana-bojanic', name: { sr: 'Милана Бојанић', en: 'Milana Bojanić', de: 'Milana Bojanić', ru: 'Милана Боянич' }, title: 'ванр. проф. др', head: false },
  { id: 'sladjana-turudic', name: { sr: 'Слађана Турудић', en: 'Slađana Turudić', de: 'Slađana Turudić', ru: 'Сладжана Турудич' }, title: 'асист.', head: false },
  { id: 'filip-djordjevic', name: { sr: 'Филип Ђорђевић', en: 'Filip Đorđević', de: 'Filip Đorđević', ru: 'Филип Джорджевич' }, title: 'асист.', head: false },
  { id: 'darko-lazarevic', name: { sr: 'Дарко Лазаревић', en: 'Darko Lazarević', de: 'Darko Lazarević', ru: 'Дарко Лазаревич' }, title: 'асист.', head: false },
  { id: 'milan-zec', name: { sr: 'Милан Зец', en: 'Milan Zec', de: 'Milan Zec', ru: 'Милан Зец' }, title: 'лаборант', head: false },
// Latin spelling identifies researchers consistently in Spanish, French and Chinese.
].map(member => ({ photo: null, researchInterests: null, email: null, orcid: null, googleScholar: null, researchGate: null, linkedIn: null, webpage: null, ...member, name: { ...member.name, es: member.name.en, fr: member.name.en, zh: member.name.en } }));

export const memberInitials = (member, language) => member.name[language].split(/\s+/).map(part => Array.from(part)[0]).join('');
