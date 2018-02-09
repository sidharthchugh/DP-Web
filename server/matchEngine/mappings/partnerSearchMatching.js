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
  partnerBusinessObjective: {
    defaultTarget: 'businessObjective',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  industry: {
    defaultTarget: 'industry',
    mappingType: 'overridable',
    searchFieldSource: 'partnerIndustry',
    mapsTo: 'profile'
  },
  sector: {
    defaultTarget: 'sector',
    mappingType: 'overridable',
    searchFieldSource: 'partnerSector',
    mapsTo: 'profile'
  },
  subSector: {
    defaultTarget: 'subSector',
    mappingType: 'overridable',
    searchFieldSource: 'partnerSubSector',
    mapsTo: 'profile'
  },
  businessType: {
    defaultTarget: 'businessType',
    mappingType: 'overridable',
    searchFieldSource: 'partnerBusinessType',
    mapsTo: 'profile'
  },
  keyActivities: {
    defaultTarget: 'keyActivities',
    mappingType: 'overridable',
    searchFieldSource: 'partnerKeyActivities',
    mapsTo: 'profile'
  },
  KeyResources: {
    defaultTarget: 'KeyResources',
    mappingType: 'overridable',
    searchFieldSource: 'partnerKeyResources',
    mapsTo: 'profile'
  },
  channel: {
    defaultTarget: 'channel',
    mappingType: 'overridable',
    searchFieldSource: 'partnerChannel',
    mapsTo: 'profile'
  },
  locations: {
    defaultTarget: 'locations',
    mappingType: 'overridable',
    searchFieldSource: 'partnerLocation',
    mapsTo: 'profile'
  },
  languages: {
    defaultTarget: 'languages',
    mappingType: 'overridable',
    searchFieldSource: 'partnerLanguages',
    mapsTo: 'profile'
  },
  ftes: {
    defaultTarget: 'ftes',
    mappingType: 'overridable',
    searchFieldSource: 'partnerFtes',
    mapsTo: 'profile'
  },
  standardsCertifications: {
    defaultTarget: 'standardsCertifications',
    mappingType: 'overridable',
    searchFieldSource: 'partnerStandardsCertifications',
    mapsTo: 'profile'
  },
  technologies: {
    defaultTarget: 'technologies',
    mappingType: 'overridable',
    searchFieldSource: 'partnerTechnologies',
    mapsTo: 'profile'
  },
  othercompanyAttributes: {
    defaultTarget: 'othercompanyAttributes',
    mappingType: 'overridable',
    searchFieldSource: 'partnerOtherPartnerCharacteristics',
    mapsTo: 'profile'
  },
  partnerTechnologyField: {
    defaultTarget: 'technologyField',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  partnerProductCategory: {
    defaultTarget: 'productCategory',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  partnerProductClass: {
    defaultTarget: 'productClass',
    mappingType: 'linear',
    mapsTo: 'product'
  },
  partnerDigitalizationScopeMin: {
    defaultTarget: 'digitalizationScope',
    mappingType: 'linear',
    mapsTo: 'product'
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
    sector: {
      defaultTarget: 'sector',
      fallbackTarget: 'sector',
      mappingType: 'overridable'
    },
    subSector: {
      defaultTarget: 'subSector',
      fallbackTarget: 'subSector',
      mappingType: 'overridable'
    },
    businessType: {
      defaultTarget: 'businessType',
      fallbackTarget: 'businessType',
      mappingType: 'overridable'
    },
    keyActivities: {
      defaultTarget: 'keyActivities',
      fallbackTarget: 'keyActivities',
      mappingType: 'overridable'
    },
    KeyResources: {
      defaultTarget: 'KeyResources',
      fallbackTarget: 'KeyResources',
      mappingType: 'overridable'
    },
    channel: {
      defaultTarget: 'channel',
      fallbackTarget: 'channel',
      mappingType: 'overridable'
    },
    locations: {
      defaultTarget: 'locations',
      fallbackTarget: 'headquarters',
      mappingType: 'overridable'
    },
    languages: {
      defaultTarget: 'languages',
      fallbackTarget: 'languages',
      mappingType: 'overridable'
    },
    ftes: {
      defaultTarget: 'ftes',
      fallbackTarget: 'ftes',
      mappingType: 'overridable'
    },
    standardsCertifications: {
      defaultTarget: 'standardsCertifications',
      fallbackTarget: 'standardsCertifications',
      mappingType: 'overridable'
    },
    technologies: {
      defaultTarget: 'technologies',
      fallbackTarget: 'technologies',
      mappingType: 'overridable'
    },
    othercompanyAttributes: {
      defaultTarget: 'othercompanyAttributes',
      fallbackTarget: 'othercompanyAttributes',
      mappingType: 'overridable'
    }

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
    productCategory: {
      defaultTarget: 'productCategory',
      mappingType: 'linear'
    },
    productClass: {
      defaultTarget: 'productClass',
      mappingType: 'linear'
    },
    businessObjective: {
      defaultTarget: 'businessObjective',
      mappingType: 'linear'
    },
    digitalizationScope: {
      defaultTarget: 'digitalizationScope',
      mappingType: 'linear'
    },
  },
   projects: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    }
   },
  search: ['industry', 'sector', 'subSector', 'keyActivities', 'KeyResources', 'channel', 'headquarters', 'languages', 'ftes', 'technologies', 'standardsCertifications']
};
