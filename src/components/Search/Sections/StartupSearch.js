import {multiSelectValues, chunk} from '../../util/multiSelectValues';

export function StartupSearch(values) {
return {
  startupSearch: {
    meta: {
      name: 'startupSearch',
      type: 'Search Startups - To invest, acquire, collaborate',
      createdAt: null
    },
    fields: {
      startupSearchName: {
        name: 'startupSearchName',
        englishLabel: 'Search Name',
        germanLabel: 'Search Name',
        component: 'text',
        englishTooltip: '',
        germanTooltip: '',
        validations: '25',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'string',
        typeValues: null
    },
    startupLocation: {
        name: 'startupLocation',
        englishLabel: 'Country',
        germanLabel: 'Land',
        component: 'dropdownMultiple',
        englishTooltip: '',
        germanTooltip: '',
        validations: '',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        type: 'dropdownMultiple',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.country.split('\n')))
    },
    startupIndustry: {
      name: 'startupIndustry',
      englishLabel: 'Industry',
      germanLabel: 'Industrie',
      component: 'dropdownMultiple',
      englishTooltip: '',
      germanTooltip: '',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdownMultiple',
      typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.sector.split('\n')))
    },
    startupProductClass: {
        name: 'startupProductClass',
        englishLabel: 'Product Class',
        germanLabel: 'Produktklasse',
        component: 'dropdownMultiple',
        englishTooltip: '',
        germanTooltip: '',
        validations: '300',
        type: 'dropdownMultiple',
        labelClassName: 'profile-label',
        valueClassName: 'profile-value',
        typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.product_class.split('\n')))
      },
      startupApplicationTechnologies: {
       name: 'startupApplicationTechnologies',
       englishLabel: 'Technology application field',
       germanLabel: 'Projekt Technologie',
       component: 'dropdownMultiple',
       englishTooltip: '',
       germanTooltip: '',
       validations: '',
       labelClassName: 'profile-label',
       valueClassName: 'profile-value',
       type: 'dropdownMultiple',
       typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.technology_application_field.split('\n')))
      },
      startupCoreTechnologies: {
       name: 'startupCoreTechnologies',
       englishLabel: 'Core Technologies',
       germanLabel: 'Technologiebereiche',
       component: 'dropdownMultiple',
       englishTooltip: '',
       germanTooltip: '',
       validations: '',
       labelClassName: 'profile-label',
       valueClassName: 'profile-value',
       type: 'dropdownMultiple',
       typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.core_technologies.split('\n')))
      },
      startupStage: {
       name: 'startupStage',
       englishLabel: 'Investment Stage',
       germanLabel: 'Investitionsrunde',
       component: 'dropdownMultiple',
       englishTooltip: '',
       germanTooltip: '',
       validations: '',
       labelClassName: 'profile-label',
       valueClassName: 'profile-value',
       type: 'dropdownMultiple',
       typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.investment_stage.split('\n')))
     },
     startupTraction: {
      name: 'startupTraction',
      englishLabel: 'Traction',
      germanLabel: 'Traction',
      component: 'dropdownMultiple',
      englishTooltip: '',
      germanTooltip: '',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdownMultiple',
      typeValues: values && values.cmsData && multiSelectValues(chunk(values.cmsData.traction.split('\n')))
     }

     }
  }
};
}
