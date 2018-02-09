/**
 * Defining a Profile Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import {ENV} from '../config/appConfig';
import {elasticURL} from '../config/secrets';
import {stringSchema, dropdownSchema, textAreaSchema, dropdownMultipleSchema, networkautoSuggestSchema, multiSelectSchema, multiSelectAutoSuggestSchema} from './schemaFields';


/*
 Profile Schema
*/


const ProductSchema = new mongoose.Schema({
  // Meta Information
  elasticId: {type: mongoose.Schema.Types.ObjectId, auto: true},
  productCreatedAt: {type: Number, default: 0},
  productUpdatedAt: {type: Number, default: Date.now()},
  // Product/Service Section
  productName: stringSchema,
  technologyField: dropdownMultipleSchema,
  productClass: dropdownMultipleSchema,
  productCoreTechnologies: dropdownMultipleSchema,
  productCategory: multiSelectSchema,
  productSolution: textAreaSchema,
  businessObjective: dropdownMultipleSchema,
  problemSolved: textAreaSchema,
  applicationIndustry: dropdownMultipleSchema,
  applicationSector: dropdownMultipleSchema,
  applicationSubSector: dropdownMultipleSchema,
  applicationValueChain: dropdownMultipleSchema,
  applicationBusinessType: dropdownMultipleSchema,
  applicationKeyActivities: multiSelectSchema,
  applicationKeyResources: multiSelectSchema,
  applicationCostStructure: multiSelectSchema,
  digitalizationScope: dropdownMultipleSchema,
  applicationValueProposition: textAreaSchema,
  uniqueSellingPoints: textAreaSchema,
  productTechnologies: multiSelectSchema,
  compatibileTechnologies: multiSelectSchema,
  requirements: multiSelectSchema,
  patents: multiSelectSchema,
  pricingIndicationMin: stringSchema,
  pricingIndicationMax: stringSchema,
  capacityIndication: multiSelectSchema,
  delivery: multiSelectSchema,
  integration: multiSelectSchema,
  maintenance: multiSelectSchema,
  geographicalMarkets: multiSelectAutoSuggestSchema,
  industryStandards: multiSelectSchema,
  dataSecurity: textAreaSchema,
  segmentsDescription: textAreaSchema,
  regulatoryCondition: textAreaSchema,
  productRisk: textAreaSchema,
  otherProductAttributes: multiSelectSchema
});

const ProjectSchema = new mongoose.Schema({
  // Meta Information
  elasticId: {type: mongoose.Schema.Types.ObjectId, auto: true},
  projectCreatedAt: {type: Number, default: 0},
  projectUpdatedAt: {type: Number, default: Date.now()},
  // Product/Service Section
  projectStatus: {type: String, default: ''},
  projectLinkName: {type: String, default: ''},
  projectId: {type: mongoose.Schema.Types.ObjectId},
  projectName: stringSchema,
  projectDescription: textAreaSchema,
  projectType: dropdownMultipleSchema,
  projectLocation: dropdownMultipleSchema,
  projectTechInvolved: multiSelectSchema,
  projectClass: dropdownMultipleSchema,
  projectCoreTechnologies: dropdownMultipleSchema,
  projectTechnologies: dropdownMultipleSchema,
  projectAppDeadline: stringSchema,
  projectBudget: stringSchema,
  projectCapabilityReq: multiSelectSchema,
  projectCollabReq: textAreaSchema,
  projectStartDate: stringSchema,
  projectCompletionDate: stringSchema,
  projectObjective: multiSelectSchema,
  projectStages: multiSelectSchema,
  projectMustHaves: textAreaSchema,
  projectNiceHaves: textAreaSchema,
  legalRegulatoryCondition: textAreaSchema,
  projectfileURI: {type: Array, default: []},
  otherProjectDescription: [{
    otherProjectCategory: stringSchema,
    otherProjectDescription: multiSelectSchema,
  }]
});

const Project = mongoose.model('Project', ProjectSchema);


const ProjectApplicationSchema = new mongoose.Schema({
  elasticId: {type: mongoose.Schema.Types.ObjectId, auto: true},
  projectApplyStatus: {type: String, default: ''},
  companyDescription: textAreaSchema,
  companyName: stringSchema,
  headquarters: stringSchema,
  projectId: mongoose.Schema.Types.ObjectId,
  profileId: mongoose.Schema.Types.ObjectId,
  matchedProjects: [Project.schema],
  solution: stringSchema,
  techRecommendation: textAreaSchema,
  pricingIndication: stringSchema,
  timelineIndication: textAreaSchema,
  logoURI: '',
  projectfileApplicationURI: {type: String, default: ''},
  industry: dropdownSchema,
  sector: dropdownSchema,
  organizationType: dropdownSchema,
  referencesExperience: stringSchema,
  currentcompanyName: stringSchema,
  currentindustry: dropdownSchema,
  currentheadquarters: stringSchema,
  currentsector: dropdownSchema,
  currentlogoURI: '',
  createdAt: {type: Number, default: 0},
  currentcompanyDescription: dropdownSchema,
  currentorganizationType: dropdownSchema
});

const ReferencesSchema = new mongoose.Schema({
  elasticId: {type: mongoose.Schema.Types.ObjectId, auto: true},
  projectName: stringSchema,
  projectDescription: textAreaSchema,
  projectPartners: [{
    projectPartnersRole: stringSchema,
    projectPartnersName: stringSchema
  }]
});

const Product = mongoose.model('Product', ProductSchema);
const ProjectApplication = mongoose.model('ProjectApplication', ProjectApplicationSchema);
const References = mongoose.model('References', ReferencesSchema);

const ProfileSchema = new mongoose.Schema({
    // Meta Data
    elasticId: {type: mongoose.Schema.Types.ObjectId, auto: true},
    useCase: {type: String, default: ''},
    feedProductUpdatedAt: {type: Number, default: 0},
    feedProjectUpdatedAt: {type: Number, default: 0},
    companyStatus: {type: String, default: ''},
    passiveProfileSource: {type: String, default: ''},
    profileCreatedBy: {type: String, default: ''},
    profileUpdatedBy: {type: String, default: ''},
    profileLinkName: {type: String, default: ''},
    /* Company Description Form */

    // ShoCompDescr Section
    logoURI: {type: String, default: ''},
    companyName: stringSchema,
    statusLive: dropdownSchema,
    slogan: stringSchema,
    companyDescription: textAreaSchema,

    /* General Information Form */

    // OrgaBizLegal Section
    organizationType: dropdownSchema,
    businessType: dropdownMultipleSchema,
    legalForm: stringSchema,
    industry: dropdownSchema,
    sector: dropdownSchema,
    subSector: dropdownMultipleSchema,

    // HQCountryHom Section
    headquarters: stringSchema,
    country: dropdownMultipleSchema,
    locations: dropdownMultipleSchema,

    // AdressYearFTE Section
    zipCode: stringSchema,
    streetAddress: stringSchema,
    yearEstablished: stringSchema,
    languages: multiSelectAutoSuggestSchema,
    ftes: dropdownSchema,

    // MiviTeamOther Section
    mission: textAreaSchema,
    vision: textAreaSchema,
    companyCulture: textAreaSchema,
    othercompanyAttributes: multiSelectSchema,

    /* Team Members Second Level Heading */
    // TeamMemb Section
    teamMember: [{
      teamMemberPosition: stringSchema,
      teamMemberName: stringSchema
    }],

    /* Business relationships Second Level Heading */
    // BiRel Section
    customers: [{
      customerName: networkautoSuggestSchema
    }],
    strategicPartners: [{
      strategicPartnersName: networkautoSuggestSchema
    }],
    investors: [{
      investorsName: networkautoSuggestSchema
    }],
    suppliers: [{
      suppliersName: networkautoSuggestSchema
    }],
    daughterCompanies: [{
      daughterCompaniesName: networkautoSuggestSchema
    }],
    holdingCompanies: [{
      holdingCompaniesName: networkautoSuggestSchema
    }],
    otherBusinessRelationships: [{
      otherBusinessRelationshipsName: stringSchema,
      otherBusinessRelationshipsType: stringSchema,
    }],

    /* Business Model Canvas Second Level Heading */
    // BMCKey Section
    keyActivities: textAreaSchema,
    keyResources: textAreaSchema,
    keyPartnership: textAreaSchema,
    costStructure: textAreaSchema,
    valueProposition: textAreaSchema,
    customerRelationships: textAreaSchema,
    customerSegments: multiSelectSchema,
    channels: multiSelectSchema,
    revenueStreams: multiSelectSchema,
    technologies: multiSelectSchema,
    standardsCertifications: multiSelectSchema,

    /* Financial Data Second Level Heading */
    // Financial Data Section
    revenue: stringSchema,
    investmentStage: dropdownSchema,
    totalFundingObtain: stringSchema,
    profileTraction: dropdownMultipleSchema,

    /* Digitilization Status Second Level Heading */
    // DigitilizationStatus Section
    valueChain: [{
      valueChainPosition: dropdownSchema,
      valueChainLevel: dropdownSchema
    }],
    supportFunction: [{
      supportFunctions: dropdownSchema,
      supportFunctionLevel: dropdownSchema
    }],

    /* Contact Data Second Level Heading */
    // Contact Details Section
    companyWebsite: stringSchema,
    phone: stringSchema,
    companyEmail: stringSchema,
    skype: stringSchema,
    facebook: stringSchema,
    linkedIn: stringSchema,
    twitter: stringSchema,
    otherWebPresense: [{
      otherWebPresenseName: stringSchema
    }],

    // Services/Products
    /* Services & Products Form */
    products: [Product.schema],

    projects: [Project.schema],

    projectsApplication: [ProjectApplication.schema],

    references: [References.schema],

    dimensionName: multiSelectSchema
}, {
  timestamps: true
});

 if (ENV === 'production') {
ProfileSchema.plugin(mongoosastic, {
  index: 'elastic_digital',
  hosts: [
    'http://localhost:9220/'
  ]
});
 } else {
   ProfileSchema.plugin(mongoosastic, {
  index: 'elastic_digital',
  hosts: [
       elasticURL
  ]
});
 }


export default mongoose.model('Profile', ProfileSchema);
