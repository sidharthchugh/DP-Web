import React, { Component } from 'react';
import { Grid, Accordion, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language';
import { addNotification } from 'actions/notification';
import SkippedApplicationCollapsed from './CollapsedAccordion/SkippedApplicationCollapsed.js';
import ProjectApplication from '../Forms/ProjectApplication.js';
import {fetchProjects, updateStatusProjects} from 'actions/projects';
import dummyProfile from '../Dummy/dummyReceivedApplications.js';


class SkippedApplication extends Component {

  constructor(props) {
    super(props);
     this.acceptedApplication = this.acceptedApplication.bind(this);
  }


  acceptedStatusApplication() {
   const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, status: 'Accepted'})
    .then((response) => {
      if (response.payload.status === 200) {
        this.props.fetchProjects();
        addNotification('Project Updated Successfully', 'success', 'tc');
      }
    });
}

 // Send Values To Database
  acceptedApplication() {
    const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, statusID: isProgress.profileId, status: 'Successful'})
    .then((response) => {
         if (response.payload.status === 200) {
         this.acceptedStatusApplication();
      }
    });
  }


  render() {
    const matchingProfile = dummyProfile;
    const {userLanguage, isProgress, user} = this.props;
    return (
      <Grid className="grid-application-card">
        <Accordion className="no-gutter">
          <Accordion.Title>
            <SkippedApplicationCollapsed
            isProgress={isProgress}
            userLanguage={userLanguage}
            matchingProfile={matchingProfile}
            user={user}
            acceptedApplication={this.acceptedApplication}
            />
          </Accordion.Title>
          <Accordion.Content>
            <ProjectApplication
              userLanguage={userLanguage}
              isProgress={isProgress}
              fullprofile
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


export default connect(mapStateToProps, {fetchProjects, addNotification, updateStatusProjects })(SkippedApplication);
