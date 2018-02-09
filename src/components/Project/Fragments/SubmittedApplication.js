import React, { Component } from 'react';
import { Grid, Accordion } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language';
import { addNotification } from 'actions/notification';
import ProjectApplication from '../Forms/ProjectApplication.js';
import SubmittedApplicationCollapsed from './CollapsedAccordion/SubmittedApplicationCollapsed.js';
import ExpandedApplicationProjectDetails from './ExpandedAccordion/ExpandedApplicationProjectDetails.js';
import dummyAddedProjects from '../Dummy/dummyProjects.js';
import {fetchProjects, updateStatusProjects} from 'actions/projects';
import UploadFile from '../../Reusable/UploadFile';


class submittedApplication extends Component {

   constructor(props) {
    super(props);
    this.withdrawApplication = this.withdrawApplication.bind(this);
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
  withdrawApplication() {
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
            <SubmittedApplicationCollapsed
              isProgress={isProgress}
              userLanguage={userLanguage}
              user={user}
              withdrawApplication={this.withdrawApplication}
            />
          </Accordion.Title>
          <Accordion.Content>
            <h3 className="heading3">{strings.application}</h3>
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


export default connect(mapStateToProps, { fetchProjects, updateStatusProjects, addNotification })(submittedApplication);
