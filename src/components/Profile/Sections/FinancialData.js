import {multiSelectValues, chunk} from '../../util/multiSelectValues';

export function FinancialData(values) {
return {
    revenue: {
      name: 'revenue',
      englishLabel: 'Annual Revenue',
      germanLabel: 'Jahresumsatz',
      component: 'number',
      englishTooltip: 'Specify your annual revenue to give a rough size indication of your operations.',
      germanTooltip: 'Was ist ihr Gesamtumsatz im vergangenen Jahr gewesen?',
      validations: '15',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
    },
    investmentStage: {
      name: 'investmentStage',
      englishLabel: 'Investment Stage',
      germanLabel: 'Investitionsrunde',
      component: 'dropdown',
      englishTooltip: 'What investment stage are you in? (particularly for Startups)',
      germanTooltip: 'Falls es externe Investoren gibt (insbesondere für Startups), in welcher Investitionsrunde befinden Sie sich?',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdown',
      typeValues: values.cmsData && values.cmsData.investment_stage.split('\n')
    },
    totalFundingObtain: {
      name: 'totalFundingObtain',
      englishLabel: 'Total Funding',
      germanLabel: 'Gesamt-Finanzierungssumme',
      component: 'number',
      englishTooltip: 'If you have external equity investors, please mention your total funding received.',
      germanTooltip: 'Was ist die Gesamtfinanzierungssumme, die das Unternehmen erhalten hat?',
      validations: '15',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
  },
  profileTraction: {
   name: 'profileTraction',
   englishLabel: 'Traction',
   germanLabel: 'Traction',
   component: 'dropdownMultiple',
   englishTooltip: '',
   germanTooltip: '',
   validations: '',
   labelClassName: 'profile-label',
   valueClassName: 'profile-value',
   type: 'dropdownMultiple',
   typeValues: values.cmsData && multiSelectValues(chunk(values.cmsData.traction.split('\n')))
  }
};
}
