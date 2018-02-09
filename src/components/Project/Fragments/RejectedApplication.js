import React, { Component } from 'react';
import { Grid, Accordion } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language';
import { addNotification } from 'actions/notification';
import {fetchProjects, updateStatusProjects} from 'actions/projects';
import ProjectApplication from '../Forms/ProjectApplication.js';
import RejectedApplicationCollapsed from './CollapsedAccordion/RejectedApplicationCollapsed.js';
import dummyAddedProjects from '../Dummy/dummyProjects.js';


class RejectedApplication extends Component {

  constructor(props) {
    super(props);
     this.widthdrawApplication = this.widthdrawApplication.bind(this);
  }


  withdrawStatusApplication() {
   const {updateStatusProjects, addNotification, isProgress} = this.props;
    updateStatusProjects({isProgress: isProgress.projectId, status: 'Withdraw'})
    .then((response) => {
      if (response.payload.status === 200) {
        this.props.fetchProjects();
        addNotification('Project Updated Successfully', 'success', 'tc');
      }
    });
  }

  // Send Values To Database
  widthdrawApplication() {
    const {updateStatusProjects, addNotification, isProgress} = this.props;
   updateStatusProjects({isProgress: isProgress.projectId, statusID: isProgress.profileId, status: 'Withdraw'})
    .then((response) => {
         if (response.payload.status === 200) {
         this.withdrawStatusApplication();
      }
    });
  }


  render() {
    const {userLanguage, isProgress, user} = this.props;
    const project = dummyAddedProjects[0];
    return (
      <Grid className="grid-application-card">
        <Accordion className="no-gutter">
          <Accordion.Title>
            <RejectedApplicationCollapsed
            userLanguage={userLanguage}
            isProgress={isProgress}
            widthdrawApplication={this.widthdrawApplication}
            user={user}
            />
          </Accordion.Title>
          <Accordion.Content>
            <ProjectApplication
              userLanguage={userLanguage}
              fullprofile
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
     profiles: state.profile.profiles,
     sections: state.projects.sections
  };
}


export default connect(mapStateToProps, { fetchProjects, addNotification, updateStatusProjects })(RejectedApplication);
