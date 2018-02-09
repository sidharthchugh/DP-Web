module.exports = {
  elasticId: {
    defaultTarget: 'elasticId'
  },
  statusLive: {
    defaultTarget: 'statusLive'
  },
  liveStatus: {
    defaultTarget: 'liveStatus'
  },
  industry: {
    defaultTarget: 'industry',
    mappingType: 'overridable',
    searchFieldSource: 'startupIndustry',
    mapsTo: 'profile'
  },
  locations: {
    defaultTarget: 'locations',
    mappingType: 'overridable',
    searchFieldSource: 'startupLocation',
    mapsTo: 'profile'
  },
  investmentStage: {
    defaultTarget: 'investmentStage',
    mappingType: 'overridable',
    searchFieldSource: 'startupStage',
    mapsTo: 'profile'
  },
  profileTraction: {
    defaultTarget: 'profileTraction',
    mappingType: 'overridable',
    searchFieldSource: 'startupTraction',
    mapsTo: 'profile'
  },
  startupProductClass: {
    defaultTarget: 'productClass',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  startupApplicationTechnologies: {
    defaultTarget: 'technologyField',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  startupCoreTechnologies: {
    defaultTarget: 'productCoreTechnologies',
    mappingType: 'linear',
    mapsTo: 'product'
  },

  products: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    },
    technologyField: {
      defaultTarget: 'technologyField',
      mappingType: 'linear'
    },
    productTechnologies: {
      defaultTarget: 'productTechnologies',
      mappingType: 'linear'
    },
    productClass: {
      defaultTarget: 'productClass',
      mappingType: 'linear'
    },
    productCoreTechnologies: {
      defaultTarget: 'productCoreTechnologies',
       mappingType: 'linear'
    },
  },
  profile: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    },
    industry: {
      defaultTarget: 'industry',
      fallbackTarget: 'industry',
      mappingType: 'overridable'
    },
    locations: {
      defaultTarget: 'locations',
      fallbackTarget: 'headquarters',
      mappingType: 'overridable'
    },
    investmentStage: {
      defaultTarget: 'investmentStage',
      fallbackTarget: 'investmentStage',
      mappingType: 'overridable'
    },
    profileTraction: {
      defaultTarget: 'profileTraction',
      fallbackTarget: 'profileTraction',
      mappingType: 'overridable'
    }
  },
   projects: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    }
   },
   search: ['industry', 'locations', 'investmentStage', 'profileTraction']
};
