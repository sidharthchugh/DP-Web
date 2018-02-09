module.exports = {
  elasticId: {
    defaultTarget: 'elasticId'
  },
  statusLive: {
    defaultTarget: 'statusLive'
  },
    liveStatus: {
    defaultTarget: 'liveStatus'
  },
  projectType: {
    defaultTarget: 'projectType',
    mappingType: 'linear',
    mapsTo: 'project'
  },
  projectLocation: {
    defaultTarget: 'projectLocation',
    mappingType: 'linear',
    mapsTo: 'project'
  },
  projectProductClass: {
    defaultTarget: 'projectClass',
    mappingType: 'linear',
    mapsTo: 'project'
  },
  projectTechnologyField: {
    defaultTarget: 'projectTechnologies',
    mappingType: 'linear',
    mapsTo: 'project'
  },
  projectCoreTechnologies: {
    defaultTarget: 'projectCoreTechnologies',
    mappingType: 'linear',
    mapsTo: 'project'
  },
  projectApplication: {
    defaultTarget: 'projectAppDeadline',
    mappingType: 'datemax',
    mapsTo: 'project'
  },
  projectTechnologies: {
    defaultTarget: 'projectTechInvolved',
    mappingType: 'linear',
    mapsTo: 'project'
  },
  projectBudget: {
    defaultTarget: 'projectBudget',
    mappingType: 'rangemax',
    mapsTo: 'project'
  },
   projectStartingDate: {
    defaultTarget: 'projectStartDate',
    mappingType: 'datemin',
    mapsTo: 'project'
  },
  projectCompletionDate: {
    defaultTarget: 'projectCompletionDate',
    mappingType: 'datemax',
    mapsTo: 'project'
  },
  projectObjectives: {
    defaultTarget: 'projectObjective',
    mappingType: 'linear',
    mapsTo: 'project'
  },
  otherProjectAttributes: {
    defaultTarget: 'otherProjectDescription',
    mappingType: 'linear',
    mapsTo: 'project'
  },

  // check finish
  products: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    }
  },
   projects: {
    elasticId: {
      defaultTarget: 'elasticId',
      mappingType: 'linear'
    },
    projectType: {
      defaultTarget: 'projectType',
      mappingType: 'linear',
     },
     projectLocation: {
      defaultTarget: 'projectLocation',
      mappingType: 'linear',
     },
     projectClass: {
      defaultTarget: 'projectClass',
      mappingType: 'linear',
     },
     projectCoreTechnologies: {
       defaultTarget: 'projectCoreTechnologies',
       mappingType: 'linear',
     },
     projectTechnologies: {
       defaultTarget: 'projectTechnologies',
       mappingType: 'linear',
     },
     projectAppDeadline: {
       defaultTarget: 'projectAppDeadline',
       mappingType: 'linear',
     },
    projectTechInvolved: {
       defaultTarget: 'projectTechInvolved',
       mappingType: 'linear',
     },
    projectBudget: {
       defaultTarget: 'projectBudget',
      mappingType: 'linear',
    },
     projectStartDate: {
       defaultTarget: 'projectStartDate',
       mappingType: 'linear'
    },
    projectCompletionDate: {
       defaultTarget: 'projectCompletionDate',
       mappingType: 'linear'
    },
     projectObjective: {
       defaultTarget: 'projectObjective',
       mappingType: 'linear'
    },
    otherProjectDescription: {
       defaultTarget: 'otherProjectDescription',
       mappingType: 'linear'
    }
   },
    search: []
};
