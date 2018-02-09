import {multiSelectValues, chunk} from '../../util/multiSelectValues';

export function HQCountryHome(values) {
return {
    headquarters: {
      name: 'headquarters',
      englishLabel: 'Headquarters',
      germanLabel: 'Hauptsitz',
      component: '(cities)',
      englishTooltip: 'Add the loaction of you companies headquarter',
      germanTooltip: 'Fügen Sie den Hauptsitz ihres Unternehmens hinzu',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'location',
      typeValues: null
    },
    country: {
      name: 'country',
      englishLabel: 'Country of Registration',
      germanLabel: 'Registriert in (Land)',
      component: 'dropdownMultiple',
      englishTooltip: 'Chose the country where you are legally registered',
      germanTooltip: 'In welchem Land ist ihr Unternehmen gemeldet/registriert?',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdownMultiple',
      typeValues: values.cmsData && multiSelectValues(chunk(values.cmsData.country.split('\n')))
    },
    locations: {
      name: 'locations',
      englishLabel: 'Other Locations',
      germanLabel: 'Niederlassungen (Länder)',
      component: 'dropdownMultiple',
      englishTooltip: 'Select all regions in which you are active',
      germanTooltip: 'In welchen Regionen und Ländern haben Sie Niederlassungen?',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdownMultiple',
      typeValues: values.cmsData && multiSelectValues(chunk(values.cmsData.country.split('\n')))
    }
};
}
