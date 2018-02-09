import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import difference from 'rus-diff';
import FontAwesome from 'react-fontawesome';
import {fetchProjects, updateProjects, toggleProjectsEdit} from 'actions/projects';
import {cmsDetail} from 'actions/cms';
import { addNotification } from 'actions/notification';
import Project from './Forms/Project';
import AcceptedApplicationsCard from './AcceptedApplicationsCard';
import SkippedApplicationsCard from './SkippedApplicationsCard';
import ReceivedApplicationsCard from './ReceivedApplicationsCard';
import SubmittedApplicationsCard from './SubmittedApplicationsCard';
import SuccesfulApplicationsCard from './SuccesfulApplicationsCard';
import RejectedApplicationsCard from './RejectedApplicationsCard';
import InProgressApplicationsCard from './InProgressApplicationsCard';
import strings from 'components/util/language';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import { Grid } from 'semantic-ui-react';
import 'styles/components/projects.css';
import Scrollchor from 'react-scrollchor';


class ProjectCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
      this.saveProject = this.saveProject.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    const {cmsData, user} = this.props;
      this.props.fetchProjects();
       if (!cmsData.cmsData) {
        this.props.cmsDetail();
       }
  }


    toggleEdit(section, index) {
    const {toggleProjectsEdit} = this.props;
    this.props.toggleProjectsEdit(section, index);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // Send Values To Database
    saveProject(values, index, addProductIndex, addedProject, projectLink) {
    const { updateProjects, addNotification, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    if (addedProject) values.feedProjectUpdatedAt = Date.now();
    const updatedValue = difference.diff(profiles, values);
    if (!addProductIndex && values.projects[index].projectName.typeValues === '') {
        addNotification(strings.productName, 'warning', 'tc');
      } else {
    updateProjects({updatedValue, addedProject, projectLink})
    .then((response) => {
       if (response.payload.status === 200) {
        this.setState({ registered: true});
            this.toggleEdit('projectName' + index);
        addNotification(strings.projectupdateNotify, 'success', 'tc');
        }
     });
    }
  }

  render() {
    const {toggleProjectsEdit, sections, profiles, fullprofile, profileDetails, cmsData, logoURI, userLanguage, strings, matchLogo, projectSignUp} = this.props;

    return (
      <Grid centered style={{marginBottom: '20px'}}>
        <Grid.Column mobile={12} tablet={12} computer={12} className="no-vertical-padding">
          { this.props.sidebar !== 'true' && <Project
            toggleProjectsEdit={toggleProjectsEdit}
            sections={sections}
            onSubmit={this.saveProject}
            profileDetails={fullprofile || profiles}
            userLanguage={userLanguage}
            strings={strings}
            cmsData={cmsData}
            projectSignUp={projectSignUp}
            saveProject={this.saveProject}
            fullprofile={fullprofile}
          />}
          { this.props.sidebar !== 'true' && projectSignUp !== 'true' &&
          <div>
            <ReceivedApplicationsCard
            userLanguage={userLanguage}
            projectApplication={profiles.projectsApplication}
          />
            <AcceptedApplicationsCard
              userLanguage={userLanguage}
              projectApplication={profiles.projectsApplication}
            />
            <SkippedApplicationsCard
              userLanguage={userLanguage}
              projectApplication={profiles.projectsApplication}
            />
            <div id={'myApps'} className="myApps card-white lastCard-generic">
              <CollapsibleCardWrapper title={strings.allApplication} >
                <SubmittedApplicationsCard
              userLanguage={userLanguage}
              projectApplication={profiles.projectsApplication}
            />
              </CollapsibleCardWrapper>
            </div>
            <InProgressApplicationsCard
              userLanguage={userLanguage}
              sections={sections}
              projectApplication={profiles.projectsApplication}
            />

            <SuccesfulApplicationsCard
              userLanguage={userLanguage}
              projectApplication={profiles.projectsApplication}
            />
            <RejectedApplicationsCard
              userLanguage={userLanguage}
              projectApplication={profiles.projectsApplication}
            />
          </div>}
          {this.props.sidebar === 'true' &&
          <Grid>
            <Grid.Column computer={12} className="card-generic mobile hidden tablet hidden nav">
              <div id="profile">
                <h3 className="sidebar-headertitle">Projects</h3>
                <div className="search-card saved-search sidebar-search">
                  <Project
                sidebarP={'true'}
                profileDetails={profiles}
                userLanguage={userLanguage}
                strings={strings}
              />
                </div>
                <Scrollchor to={'recievedApps'} animate={{offset: -58, duration: 500}}>
                  <h3 className="sidebar-header1">Received Applications</h3>
                </Scrollchor>
                <Scrollchor to={'myApps'} animate={{offset: -58, duration: 500}}>
                  <h3 className="sidebar-header1">My Applications</h3>
                </Scrollchor>
              </div>
            </Grid.Column>
          </Grid>
      }
        </Grid.Column>
      </Grid>
     );
  }
}


ProjectCard.propTypes = {
  updateProjects: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleProjectsEdit: PropTypes.func.isRequired
};


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     user: state.user,
     profiles: state.projects.profiles,
     sections: state.projects.sections,
     cmsData: state.cms.cmsData
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { fetchProjects, updateProjects, addNotification, cmsDetail, toggleProjectsEdit})(ProjectCard);
