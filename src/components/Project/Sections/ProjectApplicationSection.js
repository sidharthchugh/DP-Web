import {
  multiSelectValues
} from '../../util/multiSelectValues';

/*
 * Project Section
 */
const ProjectApplicationSection = {
  projectApplication: {
    solution: {
      name: 'solution',
      englishLabel: 'Solution Concept / Approach',
      germanLabel: 'Solution Concept / Approach',
      component: 'textArea',
      englishTooltip: '',
      germanTooltip: '',
      validations: '300',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    },
    techRecommendation: {
      name: 'techRecommendation',
      englishLabel: 'Technology recommendation',
      germanLabel: 'Projekt Beschreibung',
      component: 'textArea',
      englishTooltip: null,
      germanTooltip: null,
      validations: '500',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    },
    pricingIndication: {
      name: 'pricingIndication',
      englishLabel: 'Pricing Indication(EUR)',
      germanLabel: 'Pricing Indication(EUR)',
      component: 'number',
      englishTooltip: ' your product or service. If you do not have a name, a short descriptive title can substitute',
      germanTooltip: 'Fügen Sie den Namen oder einen kurzen, beschreibenden Titel für Ihr Produkt hinzu',
      validations: '50',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
    },
    timelineIndication: {
      name: 'timelineIndication',
      englishLabel: 'Timeline Indication',
      germanLabel: 'Projekt Standort',
      component: 'text',
      englishTooltip: '',
      germanTooltip: '',
      validations: '',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
    },
    referencesExperience: {
      name: 'referencesExperience',
      englishLabel: 'References /Experience',
      germanLabel: 'References /Experience',
      component: 'textArea',
      englishTooltip: '',
      germanTooltip: '',
      validations: '500',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'textArea',
      typeValues: null
    }
  }
};


export default ProjectApplicationSection;
