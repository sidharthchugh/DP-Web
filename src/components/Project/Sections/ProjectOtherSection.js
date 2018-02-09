const ProjectOtherSection = {
      otherProjectCategory: {
      name: 'otherProjectCategory',
      englishLabel: '',
      germanLabel: '',
      component: 'text',
      englishTooltip: 'If you feel that there is an important category missing in order to describe your project, add the category here',
      germanTooltip: 'If you feel that there is an important category missing in order to describe your project, add the category here',
      englishPlaceholder: 'Other project category',
      germanPlaceholder: 'Andere Projektkategorie',
      validations: '50',
      labelClassName: 'profile-array',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
     },
    otherProjectDescription: {
    name: 'otherProjectDescription',
    englishLabel: '',
    germanLabel: '',
    englishPlaceholder: 'Other Project Description',
    germanPlaceholder: 'Andere Projektbeschreibung',
    component: 'multiSelect',
    englishTooltip: 'Describe the project according to the corresponding project category that you created',
    germanTooltip: 'Describe the project according to the corresponding project category that you created',
    validations: '500',
    labelClassName: 'profile-array',
    valueClassName: 'profile-value',
    type: 'multiSelect',
    typeValues: [{}]
    }
};

export default ProjectOtherSection;
