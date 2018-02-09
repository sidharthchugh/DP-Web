import {multiSelectValues, chunk} from '../../util/multiSelectValues';


export function AddressYearFTE(values) {
return {
    zipCode: {
      name: 'zipCode',
      englishLabel: 'Zip Code',
      germanLabel: 'PLZ',
      component: '(regions)',
      englishTooltip: 'Zip code of your headquarters',
      germanTooltip: 'Postleitzahl des Hauptsitzes',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'location',
      typeValues: null
    },
    streetAddress: {
      name: 'streetAddress',
      englishLabel: 'Street address',
      germanLabel: 'Straße, Hausnr.',
      component: 'address',
      englishTooltip: 'Street & House number of your headquarters',
      germanTooltip: 'Straße und Hausnummer des Hauptsitzes',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'location',
      typeValues: null
    },
    yearEstablished: {
      name: 'yearEstablished',
      englishLabel: 'Year Established',
      germanLabel: 'Gründungsjahr',
      placeholder: 'Year Established',
      component: 'calandar',
      englishTooltip: 'The year in which your company established',
      germanTooltip: 'Seit welchem Jahr besteht ihr Unternehmen?',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
    },
    languages: {
     name: 'languages',
     englishLabel: 'Languages',
     germanLabel: 'Sprachen',
     component: 'multiSelectAutoSuggest',
     englishTooltip: 'Select languages that you can use for conducting business',
     germanTooltip: 'Wählen Sie alle Sprachen, in denen ihre Organisation Geschäfte abwickeln kann',
     validations: '',
     labelClassName: 'profile-label',
     valueClassName: 'profile-value',
     type: 'multiSelectAutoSuggest',
     typeValues: values.cmsData && multiSelectValues(chunk(values.cmsData.languages.split('\n')))
    },
    ftes: {
      name: 'ftes',
      englishLabel: 'Full-time employees',
      germanLabel: 'Vollzeit-Mitarbeiter',
      component: 'dropdown',
      englishTooltip: 'Select the amount of full-time employees',
      germanTooltip: 'Wie viele Vollzeit-Äquivalent Mitarbeiter beschäftigt ihr Unternehmen?',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdown',
      typeValues: values.cmsData && values.cmsData.employees.split('\n')
    }
};
}
