const mockSearchDetails = {
  searchTypes: {
    name: 'searchTypeDropdown',
    label: 'Choose your type of search',
    value: null,
    type: 'dropdown',
    typeValues: {
      auto: 'Automatic - Use my profile',
      productAuto: 'Products/Services - Search interesting options for my company',
      productSpecific: 'Products/Services - I want to specify the details of what I am looking for',
      partnerAuto: 'Strategic partners - Search relevant options for my company',
      partnerSpecific: 'Strategic partners - I want to specify the details of what I am looking for',
      otherAuto: 'Other - I am interested in other relevant opportunities',
      otherSpecific: 'Other - I want to specify other search details'
    },
    id: null
  },
  productSearch: {
    productSearchName: {
      name: 'productSearchName',
      label: 'Search Name',
      value: null,
      type: 'string'
    },
    businessObjectives: {
      name: 'businessObjectives',
      label: 'Business Objectives',
      value: null,
      type: 'multiSelect'
    },
    operationalGoal: {
      name: 'operationalGoal',
      label: 'Operational Goal / Problem',
      value: null,
      type: 'textarea'
    },
    budget: {
      name: 'budget',
      label: 'Budget',
      value: null,
      type: 'string'
    },
    timeline: {
      name: 'timeline',
      label: 'Timeline',
      value: null,
      type: 'string'
    },
    digitalizationScope: {
      name: 'digitalizationScope',
      label: 'Digitalization Scope',
      value: null,
      type: 'textarea'
    },
    capacity: {
      name: 'capacity',
      label: 'CAPACITY REQUIREMENTS',
      value: null,
      type: 'string'
    },
    solution: {
      name: 'solution',
      label: 'Solution',
      value: null,
      type: 'multiSelect'
    },
    valueChain: {
      name: 'valueChain',
      label: 'FOR VALUE CHAIN / SUPPORT FUNCTION',
      value: null,
      type: 'dropdown'
    },
    keyActivities: {
      name: 'keyActivities',
      label: 'PERFORMS KEY ACTIVITIES',
      value: null,
      type: 'multiSelect'
    },
    keyResources: {
      name: 'keyResources',
      label: 'IMPROVES KEY RESOURCES',
      value: null,
      type: 'multiSelect'
    },
    technologiesNeeded: {
      name: 'technologiesNeeded',
      label: 'TECHNOLOGIES NEEDED',
      value: null,
      type: 'multiSelect'
    },
    compatibileTechnologies: {
      name: 'compatibileTechnologies',
      label: 'COMPATIBLE TECHNOLOGIES',
      value: null,
      type: 'multiSelect'
    },
    partnerKeyResources: {
      name: 'partnerKeyResources',
      label: 'Company Description',
      value: null,
      type: 'textarea'
    },
    industryStandards: {
      name: 'industryStandards',
      label: 'PRODUCT / INDUSTRY STANDARDS',
      value: null,
      type: 'multiSelect'
    },
    dataSecurity: {
      name: 'dataSecurity',
      label: 'DATA SECURITY CONCERN',
      value: null,
      type: 'textarea'
    },
    legalConsideration: {
      name: 'legalConsideration',
      label: 'LEGAL CONSIDERATIONS',
      value: null,
      type: 'textarea'
    },
    otherPartnerCharacteristics: {
      name: 'otherPartnerCharacteristics',
      label: 'OTHER PRODUCT REQUIREMENTS',
      value: null,
      type: 'textarea'
    }
  },
  partnerSearch: {
    partnerSearchName: {
      name: 'partnerSearchName',
      label: 'Specific Strategic Partner',
      value: null,
      type: 'string'
    },
    otherPartnerCharacteristics: {
      name: 'otherPartnerCharacteristics',
      label: 'Other Partner Characteristics',
      value: null,
      type: 'multiSelect'
    },
    partnerLanguages: {
      name: 'partnerLanguages',
      label: 'Partner Languages',
      value: null,
      type: 'multiSelect'
    },
    partnerLocation: {
      name: 'partnerLocation',
      label: 'Partner Location',
      value: null,
      type: 'multiSelect'
    },
    partnerSizeIndication: {
      name: 'partnerSizeIndication',
      label: 'Partner Size Indication',
      value: null,
      type: 'multiSelect'
    },
    partnerKeyResources: {
      name: 'partnerKeyResources',
      label: 'Partner Key Resources',
      value: null,
      type: 'multiSelect'
    },
    partnerKeyActivities: {
      name: 'partnerKeyActivities',
      label: 'Partner Key Activites',
      value: null,
      type: 'multiSelect'
    },
    partnerBusinessType: {
      name: 'partnerBusinessType',
      label: 'Partner Business Type',
      value: null,
      type: 'multiSelect'
    },
    partnerSubSector: {
      name: 'partnerSubSector',
      label: 'Partner Sub-Sector',
      value: null,
      type: 'multiSelect'
    },
    partnerSector: {
      name: 'partnerSector',
      label: 'Partner Sector',
      value: null,
      type: 'multiSelect'
    },
    partnerIndustry: {
      name: 'partnerIndustry',
      label: 'Partner Industry',
      value: null,
      type: 'multiSelect'
    },
    partnerBenefits: {
      name: 'partnerBenefits',
      label: 'Benefits to Partner',
      value: null,
      type: 'textarea'
    },
    collaborationRequirements: {
      name: 'collaborationRequirements',
      label: 'Collaboration Requirements',
      value: null,
      type: 'textarea'
    },
    synergies: {
      name: 'synergies',
      label: 'Intended Synergies',
      value: null,
      type: 'textarea'
    },
    assetsSearch: {
      name: 'assetsSearch',
      label: 'Assets we Search',
      value: null,
      type: 'textarea'
    },
    assetsProvide: {
      name: 'assetsProvide',
      label: 'Assets We Provide',
      value: null,
      type: 'textarea'
    },
    operationalGoal: {
      name: 'operationalGoal',
      label: 'Operational Goal / Problem',
      value: null,
      type: 'textarea'
    },
    businessObjectives: {
      name: 'businessObjectives',
      label: 'Business Objectives',
      value: null,
      type: 'multiSelect'
    }
  },
  otherSearch: {
    otherSearchName: {
      name: 'otherSearchName',
      label: 'Other Search',
      value: null,
      type: 'string'
    }
  },
  searchPreferences: {
    suitableProduct: {
      name: null,
      label: 'I am interested in suitable product/service offers',
      value: null,
      type: 'checkbox',
      id: null
    },
    strategicPartners: {
      name: null,
      label: 'I am interested in strategic partnerships',
      value: null,
      type: 'checkbox',
      id: null
    },
    collaboration: {
      name: null,
      label: 'I am interested in joining projects for collaboration',
      value: null,
      type: 'checkbox',
      id: null
    },
    customer: {
      name: null,
      label: 'I am interested in new customers for my product/services',
      value: null,
      type: 'checkbox',
      id: null
    },
    opportunities: {
      name: null,
      label: 'I am interested in other relevant opportunities',
      value: null,
      type: 'checkbox',
      id: null
    }
  }
};

export {
  mockSearchDetails
};
