const MiViTeamOther = {
    mission: {
      name: 'mission',
      englishLabel: 'Mission',
      germanLabel: 'Mission',
      component: 'textArea',
      englishTooltip: 'Describe the mission that your company is trying to accomplish in the medium term',
      germanTooltip: 'Was ist die Mission ihres Unternehmens, welche Ziele haben Sie sich mittelfristig gesetzt?',
      validations: '300',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    },
    vision: {
      name: 'vision',
      englishLabel: 'Vision',
      germanLabel: 'Vision',
      component: 'textArea',
      englishTooltip: 'Describe the vision that your company has in the long-run',
      germanTooltip: 'Welche Langzeit-Vision verfolgt ihr Unternehmen?',
      validations: '300',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    },
    companyCulture: {
      name: 'companyCulture',
      englishLabel: 'Company Culture',
      germanLabel: 'Firmenkultur',
      component: 'textArea',
      englishTooltip: 'Describe your company culture , including important values, work ethics and attributes that you may have. ',
      germanTooltip: 'Fügen Sie andere wichtige Stichworte hinzu, die Ihre Firma beschreiben',
      validations: '300',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    },
    othercompanyAttributes: {
     name: 'othercompanyAttributes',
     englishLabel: 'Other Company Attributes',
     germanLabel: 'Andere Firmenmerkmale',
     component: 'multiSelect',
     englishTooltip: 'Describe anything else that is relevant to know about your company',
     germanTooltip: 'Fügen Sie andere wichtige Stichworte hinzu, die Ihre Firma beschreiben',
     validations: '300',
     labelClassName: 'profile-label',
     valueClassName: 'profile-value',
     type: 'multiSelect',
     typeValues: null
    }
};

export default MiViTeamOther;
