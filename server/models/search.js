/**
 * Defining a Search Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import {ENV} from '../config/appConfig';
import {elasticURL} from '../config/secrets';
import {multiSelectSchema, dropdownSchema, textAreaSchema, stringSchema, matchSchema, multiSelectAutoSuggestSchema, dropdownMultipleSchema} from './schemaFields';


/*
 Search Schema
*/

const SearchSchema = new mongoose.Schema({

  searchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},

  // Passive Search Preferences
  searchPreferences: [{
    suitableProduct: {type: Boolean, default: true},
    strategicPartners: {type: Boolean, default: true},
    collaboration: {type: Boolean, default: true},
    customer: {type: Boolean, default: true},
    opportunities: {type: Boolean, default: true}
  }],

   // Find a partner for me
  partnerSearch: [{
    meta: {
      name: {type: String, default: ''},
      type: {type: String, default: ''},
      createdAt: {type: Number, default: 0},
      searchStatus: {type: String, default: 'searchSaved'},
      matchLoaded: {type: String, default: 'true'},
      display: {type: String, default: 'none'}
    },
    fields: {
      partnerSearchName: stringSchema,
      partnerBusinessObjective: dropdownMultipleSchema,
      partnerIndustry: dropdownMultipleSchema,
      partnerSector: dropdownMultipleSchema,
      partnerSubSector: dropdownMultipleSchema,
      partnerOrganizationType: dropdownMultipleSchema,
      partnerBusinessType: dropdownMultipleSchema,
      partnerKeyActivities: multiSelectAutoSuggestSchema,
      partnerKeyResources: multiSelectAutoSuggestSchema,
      partnerChannel: multiSelectAutoSuggestSchema,
      partnerLocation: multiSelectSchema,
      partnerLanguages: multiSelectAutoSuggestSchema,
      partnerTechnologyField: dropdownMultipleSchema,
      partnerProductClass: dropdownMultipleSchema,
      partnerProductCategory: multiSelectSchema,
      partnerDigitalizationScopeMin: dropdownSchema,
      partnerFtes: dropdownMultipleSchema,
      partnerCapacityIndication: multiSelectSchema,
      partnerStandardsCertifications: multiSelectSchema,
      partnerTechnologies: multiSelectSchema,
      partnerLegalConsideration: textAreaSchema,
      partnerOtherPartnerCharacteristics: multiSelectSchema
    },
    matches: [matchSchema]
  }],


  // ################
  // CUSTOM SEARCHES
  // ################


  // Strategic Partner Search
  partnerDetailSearch: [{
    meta: {
      name: {type: String, default: ''},
      type: {type: String, default: ''},
      createdAt: {type: Number, default: 0},
      searchStatus: {type: String, default: 'searchSaved'},
      matchLoaded: {type: String, default: 'true'},
      display: {type: String, default: 'none'}
    },
    fields: {
      partnerDetailSearchName: stringSchema,
      partnerBusinessObjective: dropdownMultipleSchema,
      partnerIndustry: dropdownMultipleSchema,
      partnerSector: dropdownMultipleSchema,
      partnerSubSector: dropdownMultipleSchema,
      partnerOrganizationType: dropdownMultipleSchema,
      partnerBusinessType: dropdownMultipleSchema,
      partnerKeyActivities: multiSelectAutoSuggestSchema,
      partnerKeyResources: multiSelectAutoSuggestSchema,
      partnerChannel: multiSelectAutoSuggestSchema,
      partnerLocation: multiSelectSchema,
      partnerLanguages: multiSelectAutoSuggestSchema,
      partnerTechnologyField: dropdownMultipleSchema,
      partnerProductClass: dropdownMultipleSchema,
      partnerProductCategory: multiSelectSchema,
      partnerDigitalizationScopeMin: dropdownSchema,
      partnerFtes: dropdownMultipleSchema,
      partnerCapacityIndication: multiSelectSchema,
      partnerStandardsCertifications: multiSelectSchema,
      partnerTechnologies: multiSelectSchema,
      partnerLegalConsideration: textAreaSchema,
      partnerOtherPartnerCharacteristics: multiSelectSchema
    },
    matches: [matchSchema]
  }],

  // Strategic Partner Search
  startupSearch: [{
    meta: {
      name: {type: String, default: ''},
      type: {type: String, default: ''},
      createdAt: {type: Number, default: 0},
      searchStatus: {type: String, default: 'searchSaved'},
      matchLoaded: {type: String, default: 'true'},
      display: {type: String, default: 'none'}
    },
    fields: {
      startupSearchName: stringSchema,
      startupLocation: dropdownMultipleSchema,
      startupProductClass: dropdownMultipleSchema,
      startupIndustry: dropdownMultipleSchema,
      startupCoreTechnologies: dropdownMultipleSchema,
      startupApplicationTechnologies: dropdownMultipleSchema,
      startupStage: dropdownMultipleSchema,
      startupTraction: dropdownMultipleSchema
    },
    matches: [matchSchema]
  }],


  // Strategic Partner Search
  projectDetailSearch: [{
    meta: {
      name: {type: String, default: ''},
      type: {type: String, default: ''},
      createdAt: {type: Number, default: 0},
      searchStatus: {type: String, default: 'searchSaved'},
      matchLoaded: {type: String, default: 'true'},
      display: {type: String, default: 'none'}
    },
    fields: {
      projectDetailSearchName: stringSchema,
      projectType: dropdownMultipleSchema,
      projectLocation: dropdownMultipleSchema,
      projectTechnologyField: dropdownMultipleSchema,
      projectProductClass: dropdownMultipleSchema,
      projectCoreTechnologies: dropdownMultipleSchema,
      projectTechnologies: multiSelectSchema,
      projectApplication: stringSchema,
      projectBudget: stringSchema,
      projectStartingDate: stringSchema,
      projectCompletionDate: stringSchema,
      projectObjectives: multiSelectSchema,
      otherProjectAttributes: multiSelectSchema
    },
    matches: [matchSchema]
  }],

  // ###################
  // AUTOMATIC SEARCHES
  // ###################

  //  Find a product for me
  productSearch: [{
    meta: {
      name: {type: String, default: ''},
      type: {type: String, default: ''},
      createdAt: {type: Number, default: 0},
      searchStatus: {type: String, default: 'searchSaved'},
      matchLoaded: {type: String, default: 'true'},
      display: {type: String, default: 'none'}
    },
    fields: {
      productSearchName: stringSchema,
      businessObjective: dropdownMultipleSchema,
      technologyField: multiSelectSchema,
      productCategory: multiSelectSchema,
      applicationIndustry: multiSelectSchema,
      applicationSector: multiSelectSchema,
      applicationSubSector: multiSelectSchema,
      applicationValueChain: dropdownMultipleSchema,
      applicationBusinessType: multiSelectSchema,
      patents: stringSchema,
      productTechnologies: multiSelectSchema,
      compatibileTechnologies: multiSelectSchema,
      digitalizationScopeMin: dropdownSchema,
      digitalizationScopeMax: dropdownSchema,
      totalBudget: stringSchema,
      industryStandards: multiSelectSchema,
      otherProductAttributes: multiSelectSchema
    },
    matches: [matchSchema]
  }],

  // Product/Service Search
  productDetailSearch: [{
    meta: {
      name: {type: String, default: ''},
      type: {type: String, default: ''},
      createdAt: {type: Number, default: 0},
      searchStatus: {type: String, default: 'searchSaved'},
      matchLoaded: {type: String, default: 'true'},
      display: {type: String, default: 'none'}
    },
    fields: {
      productDetailSearchName: stringSchema,
      businessObjective: dropdownMultipleSchema,
      technologyField: multiSelectSchema,
      productCategory: multiSelectSchema,
      applicationIndustry: multiSelectSchema,
      applicationSector: multiSelectSchema,
      applicationSubSector: multiSelectSchema,
      applicationValueChain: dropdownMultipleSchema,
      applicationBusinessType: multiSelectSchema,
      patents: stringSchema,
      productTechnologies: multiSelectSchema,
      compatibileTechnologies: multiSelectSchema,
      digitalizationScopeMin: dropdownSchema,
      digitalizationScopeMax: dropdownSchema,
      totalBudget: stringSchema,
      industryStandards: multiSelectSchema,
      otherProductAttributes: multiSelectSchema
    },
    matches: [matchSchema]
  }]

});

 if (ENV === 'production') {
SearchSchema.plugin(mongoosastic, {
  index: 'elastic_digital',
  hosts: [
    'http://localhost:9220/'
  ]
});
 } else {
   SearchSchema.plugin(mongoosastic, {
  index: 'elastic_digital',
  hosts: [
       elasticURL
  ]
});
 }


export default mongoose.model('Search', SearchSchema);
