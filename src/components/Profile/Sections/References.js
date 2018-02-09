const References = {
  references: {
    projectName: {
      name: 'projectName',
      englishLabel: 'Project Name',
      germanLabel: 'Projekt Name',
      component: 'text',
      englishTooltip: 'Enter a descriptive name for the project',
      germanTooltip: 'Fügen Sie einen Namen für das Projekt hinzu',
      validations: '50',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
  },
    projectDescription: {
      name: 'projectDescription',
      englishLabel: 'Project Description',
      germanLabel: 'Projektbeschreibung',
      component: 'textArea',
      englishTooltip: 'Enter a short project description, describing the most important tasks performed and goals accomplished',
      germanTooltip: 'Fügen Sie eine Projektbeschreibung hinzu',
      validations: '300',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    }
  }
};

export default References;
