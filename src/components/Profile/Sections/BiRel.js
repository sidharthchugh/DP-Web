
const BiRel = {
  customers: {
    customerName: {
      name: 'customerName',
      englishLabel: 'Clients',
      germanLabel: 'Kunden',
      component: 'networkAutoSuggest',
      englishTooltip: 'Enter your client\'s names',
      germanTooltip: 'Fügen Sie ihre Kunden hinzu',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'networkAutoSuggest',
      typeValues: null
    }
  },
  strategicPartners: {
    strategicPartnersName: {
      name: 'strategicPartnersName',
      englishLabel: 'Partners',
      germanLabel: 'Strategische Partner',
      component: 'networkAutoSuggest',
      englishTooltip: 'Enter your partner\'s names',
      germanTooltip: 'Fügen Sie ihre strategischen Partner hinzu',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'networkAutoSuggest',
      typeValues: null
    }
  },
  investors: {
    investorsName: {
      name: 'investorsName',
      englishLabel: 'Investors',
      germanLabel: 'Investoren',
      component: 'networkAutoSuggest',
      englishTooltip: 'Enter your investor\'s names',
      germanTooltip: 'Fügen Sie ihre Investoren hinzu',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'networkAutoSuggest',
      typeValues: null
    }
  },
  suppliers: {
    suppliersName: {
      name: 'suppliersName',
      englishLabel: 'Suppliers',
      germanLabel: 'Zulieferer / Service-Partner',
      placeholder: 'Name',
      component: 'networkAutoSuggest',
      englishTooltip: 'Enter your supplier\'s and service provider\'s names',
      germanTooltip: 'Fügen Sie ihre Zulieferer und Dienstleister hinzu',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'networkAutoSuggest',
      typeValues: null
    }
  },
  daughterCompanies: {
    daughterCompaniesName: {
      name: 'daughterCompaniesName',
      englishLabel: 'Subsidiary Company',
      germanLabel: 'Tochterfirmen',
      englishPlaceholder: 'Name',
      germanPlaceHolder: 'Name',
      component: 'networkAutoSuggest',
      englishTooltip: 'Enter companies that are under your companies holding structure',
      germanTooltip: 'Fügen Sie Tochterunternehmen hinzu',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'networkAutoSuggest',
      typeValues: null
    }
  },
  holdingCompanies: {
    holdingCompaniesName: {
      name: 'holdingCompaniesName',
      englishLabel: 'Holding Companies',
      germanLabel: 'Muttergesellschaften',
      englishPlaceholder: 'Name',
      germanPlaceHolder: 'Name',
      component: 'networkAutoSuggest',
      englishTooltip: 'Enter the Holding companies of this organisation',
      germanTooltip: 'Fügen Sie Muttergesellschaften ihres Unternehmens hinzu',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'networkAutoSuggest',
      typeValues: null
    }
  }
};

export default BiRel;
