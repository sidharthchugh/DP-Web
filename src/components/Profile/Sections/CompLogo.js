const CompanyLogo = {
    companyName: {
      name: 'companyName',
      englishLabel: 'Company Name',
      germanLabel: 'Firmenname',
      component: 'text',
      englishTooltip: 'Full name of the company',
      germanTooltip: 'Geben Sie den Namen ihrer Firma ein',
      validations: '50',
      labelClassName: 'profile-label',
      valueClassName: 'company-value',
      type: 'string',
      typeValues: null,
      responsive: {
        mobile: 14,
        tablet: 12,
        computer: 16,
        largeScreen: 16,
        widescreen: 16,
      }
    },
    // statusLive: {
    //   name: 'statusLive',
    //   englishLabel: 'Live Status',
    //   germanLabel: 'Livestatus',
    //   component: 'dropdown',
    //   englishTooltip: 'Are you currently at a live event and want to get matched?',
    //   germanTooltip: 'Geben Sie den Namen ihrer Firma ein',
    //   validations: '',
    //   labelClassName: 'profile-label',
    //   valueClassName: 'profile-value',
    //   type: 'dropdown',
    //   typeValues: ['Not Live', 'Live at Pioneers 2017, Vienna', ],
    //   responsive: {
    //     mobile: 14,
    //     tablet: 12,
    //     computer: 16,
    //     largeScreen: 16,
    //     widescreen: 16,
    //   }
    // }
};

export default CompanyLogo;
