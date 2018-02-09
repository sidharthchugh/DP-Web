import {multiSelectValues, chunk} from '../../util/multiSelectValues';

export function ProjectSection(values) {
return {
  projectInfoSubSection: {
    projectName: {
      name: 'projectName',
      englishLabel: 'Project Name',
      germanLabel: 'Projekt Name',
      component: 'text',
      englishTooltip: 'Indicate the name of your project. If you do not have a name, a short descriptive title can substitute.',
      germanTooltip: 'Fügen Sie den Namen oder einen kurzen, beschreibenden Titel für Ihr Produkt hinzu',
      validations: '50',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
     },
     projectDescription: {
      name: 'projectDescription',
      englishLabel: 'Project Description',
      germanLabel: 'Projekt Beschreibung',
      component: 'textArea',
      englishTooltip: '',
      germanTooltip: '',
      validations: '500',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    },
    projectType: {
      name: 'projectType',
      englishLabel: 'Project Type',
      germanLabel: 'Projekt Typ',
      component: 'dropdownMultiple',
      englishTooltip: '',
      germanTooltip: '',
      validations: '50',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdownMultiple',
      typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.project_type.split('\n')))
   },
   projectLocation: {
    name: 'projectLocation',
    englishLabel: 'Project Location',
    germanLabel: 'Projekt Standort',
    component: 'dropdownMultiple',
    englishTooltip: '',
    germanTooltip: '',
    validations: '',
    labelClassName: 'profile-label',
    valueClassName: 'profile-value',
    type: 'dropdownMultiple',
    typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.country.split('\n')))
  },
  projectTechInvolved: {
   name: 'projectTechInvolved',
   englishLabel: 'Project technologies involved',
   germanLabel: 'Projekt Technologien',
   component: 'multiSelect',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
     type: 'multiSelect',
   typeValues: [{}]
  },
  projectClass: {
   name: 'projectClass',
   englishLabel: 'Product classes involved',
   germanLabel: 'Projekt Produktklasse',
   component: 'dropdownMultiple',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'dropdownMultiple',
   typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.product_class.split('\n')))
  },
  projectCoreTechnologies: {
   name: 'projectCoreTechnologies',
   englishLabel: 'Project Core Technologies',
   germanLabel: 'Projekt Technologiebereiche',
   component: 'dropdownMultiple',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'dropdownMultiple',
   typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.core_technologies.split('\n')))
  },
  projectTechnologies: {
   name: 'projectTechnologies',
   englishLabel: 'Technology application field',
   germanLabel: 'Technologie-Anwendungsfeld',
   component: 'dropdownMultiple',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'dropdownMultiple',
   typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.technology_application_field.split('\n')))
  },
  projectAppDeadline: {
   name: 'projectAppDeadline',
   englishLabel: 'Project application deadline',
   germanLabel: 'Projekt Bewerbungsfrist',
   component: 'calanderspecial',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'string',
    typeValues: null
  },
  projectBudget: {
   name: 'projectBudget',
   englishLabel: 'Project Budget in EUR (max.)',
   germanLabel: 'Projekt Budget in EUR (max.)',
   component: 'number',
   englishTooltip: '',
   germanTooltip: '',
   validations: '50',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'string',
   typeValues: null
  },
  projectCapabilityReq: {
   name: 'projectCapabilityReq',
   englishLabel: 'Capacity',
   germanLabel: 'Kapazität & Skalierbarkeit',
   component: 'multiSelect',
   englishTooltip: 'Indicate if there are any size or capacity requirements in order to collaborate effectively with your partner',
   germanTooltip: 'Gibt es Voraussetzungen, die für eine Zusammenarbeit notwendig sind?',
   validations: '150',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'multiSelect',
   typeValues: [{}]
  },
  projectCollabReq: {
   name: 'projectCollabReq',
   englishLabel: 'Collaboration requirements',
   germanLabel: 'Kollaborations-Voraussetzungen',
   component: 'textArea',
   englishTooltip: 'Are there any requirements that are prerequisite for forming a partnership?',
   germanTooltip: 'Gibt es Voraussetzungen, die für eine Zusammenarbeit notwendig sind?',
   validations: '300',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'textArea',
   typeValues: null
  },
  projectStartDate: {
   name: 'projectStartDate',
   englishLabel: 'Project Starting Date',
   germanLabel: 'Projekt-Beginn',
   component: 'calanderspecial',
   englishTooltip: '',
   germanTooltip: '',
   validations: '300',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'string',
   typeValues: null
  },
  projectCompletionDate: {
   name: 'projectCompletionDate',
   englishLabel: 'Project Completion Date',
   germanLabel: 'Projekt Abschluss-Frist',
   component: 'calanderspecial',
   englishTooltip: '',
   germanTooltip: '',
   validations: '300',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'string',
   typeValues: null
  },
  projectObjective: {
   name: 'projectObjective',
   englishLabel: 'Project objective',
   germanLabel: 'Projekt Ziel',
   component: 'multiSelect',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'multiSelect',
   typeValues: [{}]
  },
  projectStages: {
   name: 'projectStages',
   englishLabel: 'Project stages',
   germanLabel: 'Projekt Phasen',
   component: 'multiSelect',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'multiSelect',
   typeValues: [{}]
  },
  projectMustHaves: {
   name: 'projectMustHaves',
   englishLabel: 'Must-Have',
   germanLabel: 'Mindest-Anforderungen',
   component: 'textArea',
   englishTooltip: '',
   germanTooltip: '',
   validations: '300',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'textArea',
   typeValues: null
  },
  projectNiceHaves: {
   name: 'projectNiceHaves',
   englishLabel: 'Nice-to-Have',
   germanLabel: 'Sekundäre Anforderungen',
   component: 'textArea',
   englishTooltip: '',
   germanTooltip: '',
   validations: '300',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'textArea',
   typeValues: null
  },
  legalRegulatoryCondition: {
   name: 'legalRegulatoryCondition',
   englishLabel: 'Legal/regulatory considerations',
   germanLabel: 'Rechtliche Hinweise',
   component: 'textArea',
   englishTooltip: 'Are there any specific legal or regulatory considerations that impact your partnerships?',
   germanTooltip: 'Gibt es rechtliche Themen, die bei einer Partnerschaft berücksichtigt werden sollten?',
   validations: '300',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'textArea',
   typeValues: null
  }
 }
};
}
