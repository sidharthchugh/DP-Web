import React, { Component } from 'react';
import { Grid, Accordion, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language';
import { addNotification } from 'actions/notification';
import {updateTargetProfiles} from 'actions/profiles';
import {fetchProjects, updateStatusProjects} from 'actions/projects';
import AcceptedApplicationCollapsed from './CollapsedAccordion/AcceptedApplicationCollapsed.js';
import ProjectApplication from '../Forms/ProjectApplication.js';


class AcceptedApplication extends Component {

    constructor(props) {
    super(props);
     this.skippedApplication = this.skippedApplication.bind(this);
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
    return (
      <Grid className="grid-application-card">
        <Accordion className="no-gutter">
          <Accordion.Title>
            <AcceptedApplicationCollapsed isProgress={isProgress} skippedApplication={this.skippedApplication} user={user} />
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


export default connect(mapStateToProps, { fetchProjects, updateStatusProjects, addNotification, updateTargetProfiles })(AcceptedApplication);
