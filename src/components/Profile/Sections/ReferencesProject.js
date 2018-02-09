const ReferencesProject = {
  projectPartnersRole: {
    name: 'projectPartnersRole',
    englishLabel: 'Project Partner Role',
    germanLabel: 'Partner Zuständigkeitsbereich',
    component: 'text',
    englishTooltip: 'What was the role of the company involved?',
    germanTooltip: 'Fügen Sie den Zuständigkeitsbereich des jeweiligen Partners hinzu',
    validations: '50',
    labelClassName: 'profile-label',
    valueClassName: 'profile-value',
    type: 'string',
    typeValues: null
  },
  projectPartnersName: {
    name: 'projectPartnersName',
    englishLabel: 'Project Partner Name',
    germanLabel: 'Partner Name',
    component: 'text',
    englishTooltip: 'Enter the customers, partners or other parties that were involved in the project',
    germanTooltip: 'Fügen Sie den Namen des Unternehmens hinzu, mit dem Sie zusammengearbeitet haben ',
    validations: '50',
    labelClassName: 'profile-label',
    valueClassName: 'profile-value',
    type: 'string',
    typeValues: null
  }
};

export default ReferencesProject;
