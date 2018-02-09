import React, { Component } from 'react';
import { Grid, Accordion } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language.js';
import {fetchProjects, updateStatusProjects} from 'actions/projects';
import ProjectApplication from '../Forms/ProjectApplication.js';
import ReceivedApplicationCollapsed from './CollapsedAccordion/ReceivedApplicationCollapsed.js';
import ReceivedApplicationExpanded from './ExpandedAccordion/ReceivedApplicationExpanded.js';
import { addNotification } from 'actions/notification';
import dummyProfile from '../Dummy/dummyReceivedApplications.js';
import dummyApplication from '../Dummy/dummyApplication.js';


class ReceivedApplication extends Component {
  constructor(props) {
    super(props);
     this.acceptedApplication = this.acceptedApplication.bind(this);
     this.skippedApplication = this.skippedApplication.bind(this);
  }

  acceptedStatusApplication() {
   const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, status: 'Accepted'})
    .then((response) => {
      if (response.payload.status === 200) {
        this.props.fetchProjects();
        addNotification('Project Updated Successfully','success', 'tc');
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


    skippedStatusApplication() {
   const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, status: 'Skipped'})
    .then((response) => {
      if (response.payload.status === 200) {
        this.props.fetchProjects();
        addNotification('Project Updated Successfully', 'success', 'tc');
      }
    });
}

  // Send Values To Database
  skippedApplication() {
    const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, statusID: isProgress.profileId, status: 'Rejected'})
    .then((response) => {
         if (response.payload.status === 200) {
         this.skippedStatusApplication();
      }
    });
  }


  render() {
    const {userLanguage, isProgress, user} = this.props;
    const matchingProfile = dummyProfile;
    const receivedApplication = dummyApplication;
    return (
      <Grid className="grid-application-card">
        <Accordion className="no-gutter">
          <Accordion.Title>
            <ReceivedApplicationCollapsed
              userLanguage={userLanguage}
              matchingProfile={matchingProfile}
              receivedApplication={receivedApplication}
              isProgress={isProgress}
              user={user}
              acceptedApplication={this.acceptedApplication}
              skippedApplication={this.skippedApplication}
              />
          </Accordion.Title>
          <Accordion.Content>
            <ReceivedApplicationExpanded
                userLanguage={userLanguage}
                receivedApplication={receivedApplication}
                isProgress={isProgress}
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


export default connect(mapStateToProps, { updateStatusProjects, addNotification, fetchProjects})(ReceivedApplication);
