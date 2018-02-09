const TeamMemb = {
  teamMember: {
    teamMemberName: {
      name: 'teamMemberName',
      englishLabel: 'Name',
      germanLabel: 'Name',
      component: 'text',
      englishTooltip: 'Enter the name of your collaborator(s)',
      germanTooltip: 'Fügen Sie den Namen ihres Mitarbeiters hinzu. Laden Sie ihre Mitarbeiter als aktive Nutzer ein, um Sie zu unterstützen!',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
    },
    teamMemberPosition: {
      name: 'teamMemberPosition',
      englishLabel: 'Position',
      germanLabel: 'Position',
      component: 'text',
      englishTooltip: 'Enter the role/position of your collaborator(s)',
      germanTooltip: 'Fügen Sie die Position ihres Mitarbeiters hinzu',
      validations: '30',
      labelClassName: 'profile-label',
      valueClassName: 'profile-value',
      type: 'string',
      typeValues: null
    }
  }
};

export default TeamMemb;
