// Editorial translations of the recorded Serbian ranks, not new appointments.
// PhD preserves the doctoral qualification without implying a Russian DSc degree.
export const titles = {
  'доц. др': {
    sr: 'доц. др', en: 'Assistant Professor, PhD', ru: 'Ассистент-профессор, PhD',
    es: 'Profesor asistente, Dr.', fr: 'Professeur assistant, Dr',
    de: 'Assistenzprofessor, Dr.', zh: '助理教授，博士',
  },
  'проф. др': {
    sr: 'проф. др', en: 'Professor, PhD', ru: 'Профессор, PhD',
    es: 'Profesor, Dr.', fr: 'Professeur, Dr',
    de: 'Professor, Dr.', zh: '教授，博士',
  },
  'ванр. проф. др': {
    sr: 'ванр. проф. др', en: 'Associate Professor, PhD', ru: 'Ассоциированный профессор, PhD',
    es: 'Profesor asociado, Dr.', fr: 'Professeur associé, Dr',
    de: 'Assoziierter Professor, Dr.', zh: '副教授，博士',
  },
  'асист.': {
    sr: 'асист.', en: 'Teaching Assistant', ru: 'Ассистент',
    es: 'Asistente de docencia', fr: 'Assistant d’enseignement',
    de: 'Wissenschaftlicher Assistent', zh: '助教',
  },
  'лаборант': {
    sr: 'лаборант', en: 'Laboratory Technician', ru: 'Лаборант',
    es: 'Técnico de laboratorio', fr: 'Technicien de laboratoire',
    de: 'Labortechniker', zh: '实验室技术员',
  },
};

const personalForms = {
  'milana-bojanic': { es: 'Profesora asociada, Dra.', fr: 'Professeure associée, Dre', de: 'Assoziierte Professorin, Dr.' },
  'sladjana-turudic': { fr: 'Assistante d’enseignement', de: 'Wissenschaftliche Assistentin' },
};

export const memberTitle = (member, language) => personalForms[member.id]?.[language] ?? titles[member.title]?.[language];
