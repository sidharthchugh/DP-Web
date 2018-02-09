import React, { Component } from 'react';
import { Grid, Button, Accordion } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language';
import {updateProfiles, updateTargetProfiles} from 'actions/profiles';
import {fetchProjects, updateStatusProjects, updateCurrentProjects} from 'actions/projects';
import { addNotification } from 'actions/notification';
import ProjectApplication from '../Forms/ProjectApplication.js';
import ProjectApplicationProgress from '../Forms/ProjectApplicationProgress.js';
import InProgressApplicationCollapsed from './CollapsedAccordion/InProgressApplicationCollapsed.js';
import ExpandedApplicationProjectDetails from './ExpandedAccordion/ExpandedApplicationProjectDetails.js';
import dummyAddedProjects from '../Dummy/dummyProjects.js';


class InProgressApplication extends Component {

  constructor(props) {
    super(props);
     this.submitApplication = this.submitApplication.bind(this);
     this.withdrawApplication = this.withdrawApplication.bind(this);
    this.saveProject = this.saveProject.bind(this);
  }

 componentWillMount() {
    const {profiles} = this.props;
    if (!profiles.elasticId) {
      this.props.fetchProjects();
    }
  }

   // Send Values To Database
  submitStatusApplication() {
    const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, status: 'Submitted'})
    .then((response) => {
      if (response.payload.status === 200) {
        this.props.fetchProjects();
        addNotification('Project Updated Successfully', 'success', 'tc');
      }
    });
  }

  // Send Values To Database
  submitApplication() {
    const {updateTargetProfiles, addNotification, isProgress, profiles} = this.props;
    const matchingProfileId = isProgress.profileId;
    const newProject = isProgress;
    newProject.currentcompanyName = profiles.companyName || '';
    newProject.currentindustry = profiles.industry || '';
    newProject.currentheadquarters = profiles.headquarters || '';
    newProject.currentsector = profiles.sector || '';
    newProject.currentlogoURI = profiles.logoURI || '';
    newProject.currentcompanyDescription = profiles.companyDescription || '';
    newProject.currentorganizationType = profiles.organizationType || '';
    newProject.projectApplyStatus = 'Received';
    newProject.profileId = profiles.elasticId;
    newProject.createdAt = Date.now();
    const newArray = newProject;
    const updatedReceivedValues = { $push: { projectsApplication: newArray } };
    updateTargetProfiles({updatedReceivedValues, profileId: matchingProfileId})
    .then((response) => {
         if (response.payload.status === 200) {
        this.submitStatusApplication();
      }
    });
  }

  // Send Values To Database
  withdrawApplication() {
   const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, status: 'Withdraw'})
    .then((response) => {
      if (response.payload.status === 200) {
        this.props.fetchProjects();
        addNotification('Project Updated Successfully', 'success', 'tc');
      }
    });
  }

 saveProject(values) {
   const {updateCurrentProjects, addNotification, isProgress} = this.props;
   values.createdAt = Date.now();
    updateCurrentProjects({updatedId: values.projectId, savedProject: values})
    .then((response) => {
      if (response.payload.status === 200) {
        this.props.fetchProjects();
        addNotification('Project Updated Successfully', 'success', 'tc');
      }
    });
}


  render() {
    const {userLanguage, isProgress, user, sections} = this.props;
    const project = dummyAddedProjects[0];
    return (
      <Grid className="grid-application-card">
        <Accordion className="no-gutter">
          <Accordion.Title>
            <InProgressApplicationCollapsed
              project={project}
              isProgress={isProgress}
              userLanguage={userLanguage}
              user={user}
              sections={sections}
              submitApplication={this.submitApplication}
              withdrawApplication={this.withdrawApplication}
            />
          </Accordion.Title>
          <Accordion.Content>
            <h3 className="heading3">{strings.application}</h3>
            <ProjectApplicationProgress
              userLanguage={userLanguage}
              isProgress={isProgress}
              fullprofile
              submitApplication={this.submitApplication}
              sections={sections}
              onSubmit={this.saveProject}
            />
          </Accordion.Content>
        </Accordion>
      </Grid>
    );
  }
}


function mapStateToProps(state) {
  return {
     user: state.user.userObj,
     profiles: state.projects.profiles,
     sections: state.projects.sections
  };
}


export default connect(mapStateToProps, { addNotification, updateCurrentProjects, updateTargetProfiles, fetchProjects, updateStatusProjects, updateProfiles })(InProgressApplication);
