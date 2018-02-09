import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import difference from 'rus-diff';
import FontAwesome from 'react-fontawesome';
import {fetchProjectsSignup, updateProjects, toggleProjectsEdit} from 'actions/projects';
import { addNotification } from 'actions/notification';
import {cmsDetail} from 'actions/cms';
import ProjectSignup from './Forms/ProjectSignup';
import strings from 'components/util/language';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import { Grid } from 'semantic-ui-react';
import 'styles/components/projects.css';


class ProjectSignupCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
      this.saveProject = this.saveProject.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    const {projectId, cmsData} = this.props;
    this.props.fetchProjectsSignup(projectId);
     if (!cmsData.cmsData) {
        this.props.cmsDetail();
       }
  }

    toggleEdit(section) {
    const {toggleProjectsEdit} = this.props;
    this.props.toggleProjectsEdit(section);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // Send Values To Database
    saveProject(values, index, addProductIndex) {
    const { updateProjects, addNotification, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    const updatedValue = difference.diff(profiles, values);
    if (!addProductIndex && values.projects[index].projectName.typeValues === '') {
        addNotification(strings.productName, 'warning', 'tc');
      } else {
    updateProjects({updatedValue})
    .then((response) => {
       if (response.payload.status === 200) {
        this.setState({ registered: true});
        this.toggleEdit('projects');
        addNotification(strings.projectupdateNotify, 'success', 'tc');
        }
     });
    }
  }

  render() {
    const {toggleProjectsEdit, sections, profiles, fullprofile, cmsData, profileDetails, logoURI, userLanguage, strings, matchLogo, projectSignUp} = this.props;
    return (
      <Grid centered style={{marginBottom: '20px'}}>
        <Grid.Column mobile={12} tablet={12} computer={12} className="no-vertical-padding">
          <ProjectSignup
            toggleProjectsEdit={toggleProjectsEdit}
            sections={sections}
            onSubmit={this.saveProject}
            profileDetails={fullprofile || profiles}
            userLanguage={userLanguage}
            strings={strings}
            projectSignUp={projectSignUp}
            saveProject={this.saveProject}
            fullprofile={fullprofile}
            cmsData={cmsData}
          />
        </Grid.Column>
      </Grid>
     );
  }
}


ProjectSignupCard.propTypes = {
  updateProjects: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleProjectsEdit: PropTypes.func.isRequired
};


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     profiles: state.projects.profiles,
     sections: state.projects.sections,
     cmsData: state.cms.cmsData
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { cmsDetail, fetchProjectsSignup, updateProjects, addNotification, toggleProjectsEdit})(ProjectSignupCard);
