import strings from '../../../components/util/language';

export function SearchTypesFn(userRole) {
  let SearchTypes;
  if (userRole === 'Established Company') {
   SearchTypes = {
    searchTypes: {
      name: 'searchTypeDropdown',
      englishLabel: '',
      germanLabel: '',
      englishTooltip: '',
      germanTooltip: '',
      component: 'searchBox',
      type: 'dropdown',
      labelClassName: 'profile-noLabel',
      valueClassName: 'profile-noLabel',
      typeValues: {
        // auto: 'Automatic - Use my profile', NOTE deactivated until we have some useful logic here
        product: strings.productSearch,
        productDetail: strings.productDetailSearch,
        partner: strings.partnerSearch,
        partnerDetail: strings.partnerDetailSearch,
        projectDetail: strings.projectDetailSearch,
        // DEACTIVATED startup: strings.startupSearch
      }
    }
  };
} else if (userRole === 'Investor') {
   SearchTypes = {
    searchTypes: {
      name: 'searchTypeDropdown',
      englishLabel: '',
      germanLabel: '',
      englishTooltip: '',
      germanTooltip: '',
      component: 'searchBox',
      type: 'dropdown',
      labelClassName: 'profile-noLabel',
      valueClassName: 'profile-noLabel',
      typeValues: {
        // auto: 'Automatic - Use my profile', NOTE deactivated until we have some useful logic here
        startup: strings.startupSearch
      }
    }
  };
} else {
   SearchTypes = {
    searchTypes: {
      name: 'searchTypeDropdown',
      englishLabel: '',
      germanLabel: '',
      englishTooltip: '',
      germanTooltip: '',
      component: 'searchBox',
      type: 'dropdown',
      labelClassName: 'profile-noLabel',
      valueClassName: 'profile-noLabel',
      typeValues: {
        // auto: 'Automatic - Use my profile', NOTE deactivated until we have some useful logic here
        product: strings.productSearch,
        productDetail: strings.productDetailSearch,
        partner: strings.partnerSearch,
        partnerDetail: strings.partnerDetailSearch,
        projectDetail: strings.projectDetailSearch,
      }
    }
  };
}

 return SearchTypes;
}
