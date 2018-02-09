import {multiSelectValues, chunk} from '../../util/multiSelectValues';

export function ProjectDetailSearch(values) {
return {
  projectDetailSearch: {
    meta: {
      name: 'projectDetailSearch',
      type: 'Project - I want to specify the details of what I am looking for',
      createdAt: null
    },
    fields: {
      projectDetailSearchName: {
        name: 'projectDetailSearchName',
        englishLabel: 'Search Name',
        germanLabel: 'Search Name',
        component: 'text',
        englishTooltip: '',
        germanTooltip: '',
        validations: '25',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'string',
        typeValues: null,
        ko:'no',
    },
      projectType: {
        name: 'projectType',
        englishLabel: 'Project type',
        germanLabel: 'Projekt Typ',
        component: 'dropdownMultiple',
        englishTooltip: '',
        germanTooltip: '',
        validations: '50',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'dropdownMultiple',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.project_type.split('\n'))),
        ko:'yes'
    },
    projectLocation: {
        name: 'projectLocation',
        englishLabel: 'Location',
        germanLabel: 'Standort',
        component: 'dropdownMultiple',
        englishTooltip: '',
        germanTooltip: '',
        validations: '',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'dropdownMultiple',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.country.split('\n'))),
        ko:'yes'
    },
    projectTechnologyField: {
        name: 'projectTechnologyField',
        englishLabel: 'Technology Field',
        germanLabel: 'Technologie-Feld',
        component: 'dropdownMultiple',
        englishTooltip: '',
        germanTooltip: '',
        type: 'dropdownMultiple',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.technology_application_field.split('\n'))),
        ko:'yes'
    },
    projectProductClass: {
        name: 'projectProductClass',
        englishLabel: 'Product Class',
        germanLabel: 'Produktklasse',
        component: 'dropdownMultiple',
        englishTooltip: '',
        germanTooltip: '',
        validations: '300',
        type: 'dropdownMultiple',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.product_class.split('\n'))),
        ko:'yes'
      },
      projectCoreTechnologies: {
         name: 'projectCoreTechnologies',
         englishLabel: 'Core Technologies',
         germanLabel: 'Basistechnologie',
         component: 'dropdownMultiple',
         validations: '300',
         englishTooltip: '',
         germanTooltip: '',
         type: 'dropdownMultiple',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.core_technologies.split('\n'))),
         ko:'yes'
      },
     projectTechnologies: {
        name: 'projectTechnologies',
        englishLabel: 'Technologies',
        germanLabel: 'Technologien',
        component: 'multiSelect',
        validations: '300',
        englishTooltip: '',
        germanTooltip: '',
        type: 'multiSelect',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: [{}],
        ko:'yes'
      },
    projectApplication: {
        name: 'projectApplication',
        englishLabel: 'Application Deadline',
        germanLabel: 'Bewerbungsfrist',
        component: 'calanderspecial',
        validations: '300',
        englishTooltip: '',
        germanTooltip: '',
        type: 'string',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: null,
        ko:'yes'
      },
    projectBudget: {
      name: 'projectBudget',
      englishLabel: 'Budget Range',
      germanLabel: 'Budget',
      component: 'number',
      englishTooltip: '',
      germanTooltip: '',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null,
      ko:'no'
    },
     projectStartingDate: {
        name: 'projectStartingDate',
        englishLabel: 'Starting Date',
        germanLabel: 'Projekt-Beginn',
        component: 'calanderspecial',
        englishTooltip: '',
        germanTooltip: '',
        validations: '300',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'string',
        typeValues: null,
        ko:'no'
      },
     projectCompletionDate: {
        name: 'projectCompletionDate',
        englishLabel: 'Completion Date',
        germanLabel: 'Abschluss-Frist',
        component: 'calanderspecial',
        englishTooltip: '',
        germanTooltip: '',
        type: 'string',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: null,
        ko:'no'
      },
      projectObjectives: {
       name: 'projectObjectives',
       englishLabel: 'Project objective',
       germanLabel: 'Projekt Ziel',
       component: 'multiSelect',
       englishTooltip: '',
       germanTooltip: '',
       validations: '',
       labelClassName: 'profile-label',
       valueClassName: 'profile-value',
       type: 'multiSelect',
       typeValues: [{}],
       ko:'yes'
     },
      otherProjectAttributes: {
         name: 'otherProjectAttributes',
         englishLabel: 'Other project characteristics',
         germanLabel: 'Andere Projekt Eigenschaften',
         component: 'multiSelect',
         englishTooltip: '',
         germanTooltip: '',
         type: 'multiSelect',
         labelClassName: 'profile-label',
         valueClassName: 'profile-value',
         typeValues: [{}],
         ko:'no'
      }
     }
  }
};
}