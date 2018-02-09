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
  businessObjective: {
    defaultTarget: 'businessObjective',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  technologyField: {
    defaultTarget: 'technologyField',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  productCategory: {
    defaultTarget: 'productCategory',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  industry: {
    defaultTarget: 'applicationIndustry',
    mappingType: 'overridable',
    searchFieldSource: 'applicationIndustry',
    mapsTo: 'product'
  },
  sector: {
    defaultTarget: 'applicationSector',
     mappingType: 'overridable',
    searchFieldSource: 'applicationSector',
    mapsTo: 'product'
  },
  subSector: {
    defaultTarget: 'applicationSubSector',
     mappingType: 'overridable',
    searchFieldSource: 'applicationSubSector',
    mapsTo: 'product'
  },
  applicationValueChain: {
    defaultTarget: 'applicationValueChain',
    mappingType: 'linear',
    mapsTo: 'product'
  },
   businessType: {
    defaultTarget: 'applicationBusinessType',
    mappingType: 'overridable',
    searchFieldSource: 'applicationBusinessType',
    mapsTo: 'product'
  },
  patents: {
    defaultTarget: 'patents',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  productTechnologies: {
    defaultTarget: 'productTechnologies',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  locations: {
    defaultTarget: 'geographicalMarkets',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  languages: {
    defaultTarget: 'languages',
    mappingType: 'linear',
    mapsTo: 'profile'
  },
  technologies: {
    defaultTarget: 'compatibileTechnologies',
    mappingType: 'overridable',
    searchFieldSource: 'compatibileTechnologies',
    mapsTo: 'product'
  },
  digitalizationScope: {
    defaultTarget: 'digitalizationScope',
    mappingType: 'linear',
    mapsTo: 'product'
  },
   totalBudget: {
    defaultTarget: 'pricingIndicationMax',
    mappingType: 'rangemax',
    mapsTo: 'product'
  },
  industryStandards: {
    defaultTarget: 'industryStandards',
    mappingType: 'linear',
    mapsTo: 'product'
  },
   otherProductAttributes: {
    defaultTarget: 'otherProductAttributes',
    mappingType: 'linear',
    mapsTo: 'product'
  },

  products: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    },
    businessObjective: {
      defaultTarget: 'businessObjective',
      mappingType: 'linear'
    },
    technologyField: {
      defaultTarget: 'technologyField',
      mappingType: 'linear'
    },
    applicationIndustry: {
     defaultTarget: 'applicationIndustry',
     fallbackTarget: 'industry',
     mappingType: 'overridable'
    },
    productCategory: {
      defaultTarget: 'productCategory',
      mappingType: 'linear'
    },
    applicationSector: {
     defaultTarget: 'applicationSector',
     fallbackTarget: 'sector',
     mappingType: 'overridable'
    },
    applicationSubSector: {
     defaultTarget: 'applicationSubSector',
     fallbackTarget: 'subSector',
     mappingType: 'overridable'
    },
    applicationValueChain: {
      defaultTarget: 'applicationValueChain',
      mappingType: 'linear'
    },
    applicationBusinessType: {
      defaultTarget: 'applicationBusinessType',
      fallbackTarget: 'businessType',
      mappingType: 'overridable'
    },
    patents: {
      defaultTarget: 'patents',
      mappingType: 'linear'
    },
    productTechnologies: {
      defaultTarget: 'productTechnologies',
      mappingType: 'linear'
    },
    compatibileTechnologies: {
      defaultTarget: 'compatibileTechnologies',
      fallbackTarget: 'technolgies',
      mappingType: 'overridable'
    },
    digitalizationScope: {
      defaultTarget: 'digitalizationScope',
      mappingType: 'linear'
    },
     pricingIndicationMax: {
      defaultTarget: 'pricingIndicationMax',
      mappingType: 'linear'
    },
    geographicalMarkets: {
      defaultTarget: 'locations',
      mappingType: 'linear'
    },
    industryStandards: {
      defaultTarget: 'industryStandards',
      mappingType: 'linear'
    },
    otherProductAttributes: {
      defaultTarget: 'otherProductAttributes',
      mappingType: 'linear'
    }
  },
   projects: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    }
   },
   search: ['industry', 'sector', 'subSector', 'businessType', 'technologies']
};
