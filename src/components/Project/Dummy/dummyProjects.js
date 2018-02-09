/* Dummy Projects Data*/
const dummyAddedProjects = [
  {/* Project One */
    projectName: {
      type: 'string',
      typeValues: 'Project One'
    },
    projectDescription: {
      type: 'string',
      typeValues: 'No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'
    },
    projectType: {
      type: 'string',
      typeValues: 'Lorem Ipsum Type'
    },
    projectLocation: {
      type: 'string',
      typeValues: 'Paris'
    },
    projectTechnologies: {
      type: 'string',
      typeValues: 'Lorem Ipsum Project Tech Type'
    },
    projectClassInvolved: {
      type: 'string',
      typeValues: 'Class Involved'
    },
    projectAppDeadline: {
      type: 'string',
      typeValues: '06/06/2017'
    },
    projectBudget: {
      type: 'string',
      typeValues: '1.000.000'
    },
    projectCategory: {
      type: 'multiSelectAutoSuggest',
      typeValues: [
        {
          label: 'Simple Project Category',
          value: 'Simple Project Category'
        },
        {
          label: 'Complex Project Category',
          value: 'Complex Project Category'
        }
      ]
    }
  },
  {/* Project Two */
    projectName: {
      type: 'string',
      typeValues: 'Project Two'
    },
    projectDescription: {
      type: 'string',
      typeValues: 'No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'
    },
    projectCategory: {
      type: 'multiSelectAutoSuggest',
      typeValues: [
        {
          label: 'Simple Project Category',
          value: 'Simple Project Category'
        },
        {
          label: 'Complex Project Category',
          value: 'Complex Project Category'
        }
      ]
    }
  }
];


export default dummyAddedProjects;
