const ShortCompDescr = {
    slogan: {
      name: 'slogan',
      englishLabel: 'Slogan',
      germanLabel: 'Slogan',
      component: 'text',
      englishTooltip: 'Add your company\'s slogan or marketing punchline',
      germanTooltip: 'Hier können Sie ein Firmenlogo hochladen',
      validations: '150',
      labelClassName: 'profile-label',
      valueClassName: 'slogan-value',
      type: 'string',
      typeValues: null
    },
    companyDescription: {
      name: 'companyDescription',
      englishLabel: 'Short company description/pitch',
      germanLabel: 'Kurzbeschreibung',
      component: 'textArea',
      englishTooltip: 'Add a short description of your companies most important activities',
      germanTooltip: 'Beschreiben Sie ihr Unternehmen kurz und stichhaltig',
      validations: '400',
      labelClassName: 'profile-label mob-desc',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    }
};

export default ShortCompDescr;
