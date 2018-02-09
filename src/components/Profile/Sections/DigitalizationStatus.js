export function DigitalizationStatus(values) {
return {
  valueChain: {
    valueChainPosition: {
      name: 'valueChainPosition',
      englishLabel: 'Value Chain',
      germanLabel: 'Wertschöpfungskette',
      englishplaceholder: 'Position',
      germanPlaceholder: 'Position',
      component: 'dropdown',
      englishTooltip: 'Chose the value chain position that you are referring to in your operations',
      germanTooltip: 'Wählen Sie einen Schritt in der Wertschöpfungskette',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdown',
      typeValues: values.cmsData && values.cmsData.value_chain_position.split('\n')
    },
    valueChainLevel: {
      name: 'valueChainLevel',
      englishLabel: 'Value Chain',
      germanLabel: '',
      englishPlaceholder: 'Level',
      germanPlaceholder: 'Digitalisierungsstadium',
      component: 'dropdown',
      englishTooltip: 'Chose the value chain position that you are referring to in your operations',
      germanTooltip: '',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdown',
      typeValues: values.cmsData && values.cmsData.digitalization_scope.split('\n')
    }
  },
  supportFunction: {
    supportFunctions: {
      name: 'supportFunctions',
      englishLabel: 'Support Function',
      germanLabel: 'Geschäftsfunktion',
      englishPlaceholder: 'Function',
      germanPlaceholder: 'Funktion',
      component: 'dropdown',
      englishTooltip: 'Choose the business support function that you are referring',
      germanTooltip: 'Wählen Sie eine Geschäftsfunktion',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'dropdown',
      typeValues: values.cmsData && values.cmsData.business_support_functions.split('\n')
    },
    supportFunctionLevel: {
      name: 'supportFunctionLevel',
      englishLabel: '',
      germanLabel: '',
      englishPlaceholder: 'Level',
      germanPlaceholder: 'Digitalisierungsstadium',
      component: 'dropdown',
      englishTooltip: 'Choose the corresponding digitalization level of the business support function',
      germanTooltip: 'Wählen Sie das Digitalisierungsstadium dieser Geschäftsfunktion',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-noLabel',
      type: 'dropdown',
      typeValues: values.cmsData && values.cmsData.digitalization_scope.split('\n')
    }
  }
};
}
