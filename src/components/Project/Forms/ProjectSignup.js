import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import UUID from 'node-uuid';
import {Sticky} from 'react-sticky';
import editIcon from 'images/edit-icon.png';
import ProjectOtherSection from '../Sections/ProjectOtherSection.js';
import {updateProjects} from 'actions/projects';
import { addNotification } from 'actions/notification';
import {FieldArray} from 'redux-form';
import renderMultiSection from 'components/renderFields/renderMultiSection';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import ProfileModel from 'components/util/FrontendModel';
import TooltipWrapper from 'components/util/TooltipWrapper';
import { Grid, Button } from 'semantic-ui-react';
import strings from 'components/util/language';
import FontAwesome from 'react-fontawesome';
import {ProjectSection} from '../Sections/ProjectSection.js';
import dummyAddedProjects from '../Dummy/dummyProjects.js';
import crypto from 'crypto';
import CompanyFile from '../../Reusable/CompanyFile';


class ProjectSignup extends Component {  //eslint-disable-line

  /*
 * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
 * properties on the constructor
 * Read more here: https://facebook.github.io/react/blog/2014/01/27/react-v0.13.0-beta-1.html#es6-classes
 */

 constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      expanded_index: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.addProject = this.addProject.bind(this);
    this.saveProject = this.saveProject.bind(this);
  }

  // Edit and Save Mode for Profile Page
  toggleEdit(section) {
    const {toggleProjectsEdit} = this.props;
    this.props.toggleProjectsEdit(section);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // Send Values To Database
  saveProject(status, index) {
    const { updateProjects, addNotification} = this.props;
    const values = status === 'Yes' ? {$set: {['projects.' + index + '.projectStatus']: 'No'}} : {$set: {['projects.' + index + '.projectStatus']: 'Yes'}};
    updateProjects(values)
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
        this.toggleEdit('projects', true);
        addNotification(strings.projectupdateNotify, 'success', 'tc');
      }
    });
  }


    randomObjectId() {
        return crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
    }

  // Add a new project
  addProject() {
    const {profileDetails} = this.props;
    const new_project = {
     projectName: {
       type: 'string',
       typeValues: '',
     },
     projectLinkName: process.projectLinkName || 'localhost:3000/projects/' + this.randomObjectId()
    };
    const new_products = new Array();
    for (let i = 0; i < profileDetails.projects.length; i++) {
      const product = profileDetails.projects[i];
      new_products.push(profileDetails.projects[i]);
    }
    new_products.push(new_project);
    const values = {...profileDetails, projects: new_products };

    const expanded_index = new_products.length - 1;
    const addProductIndex = true;
    this.props.saveProject(values, expanded_index, addProductIndex);
    // The index of the product card to expand

    this.setState({
      ...this.state,
      expanded_index
    });
    }

  // Removes a project
  removeProject(delete_id) {
    // Ask user to confirm delete
    const sure_delete = window.confirm('Are you sure you want to delete?');
    if (sure_delete) {
      const {profileDetails} = this.props;
      const new_products = new Array();
      // Rebuild new Products array
      for (let i = 0; i < profileDetails.projects.length; i++) {
        const product = profileDetails.projects[i];
        if (product.elasticId != delete_id) {
          new_products.push(profileDetails.projects[i]);
        }
      }
      // Build new values array and sent it to save
      const values = {...profileDetails, projects: new_products };
      const addProductIndex = true;
      const expanded_index = false;
       this.props.saveProject(values, expanded_index, addProductIndex);
    }
  }

  render() {
    const projects = dummyAddedProjects;
    const self = this;
    const {hasIndustry, handleSubmit, sections, profileDetails, userLanguage, strings, cmsData, initialValues, fullprofile, projectfileURI} = this.props;
    const languagePref = userLanguage === 'German';
    const stickyProps = {
      style: {
        transform: 'none',
        zIndex: 99,
        position: 'absolute',
        width: '100%'
      } // ensure btn is always on top
    };
    const projectSections = ProjectSection(cmsData);
    return (
      <Grid className="no-vertical-margin no-vertical-padding">
        {profileDetails.projects && profileDetails.projects.map((project, index) =>
          <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter" key={index}>
            <form onSubmit={handleSubmit} className="products-form" >
              <div className={'profile-card services' + (sections.projects.editable ? ' edit-label' : '')}>
                <Grid className="no-vertical-margin section-margin products">
                  {/* Project Sub Section */}
                  <Grid.Column computer={12} className="no-gutter">
                    <h3 className="heading1">{project.projectName.typeValues}</h3>
                    {/* Project Service */}
                    <ProfileModel
                        sectionName={projectSections.projectInfoSubSection}
                        profileDetails={project}
                        userLanguage={userLanguage}
                        arrayName={'projects[' + index + ']'}
                        responsive={{
                          mobile: 12,
                          tablet: 6,
                          computer: 4,
                          largeScreen: 4,
                          widescreen: 4
                        }} />

                    {project.otherProjectDescription && project.otherProjectDescription.map(projectSpecial =>
                      <div key={UUID.v4()} className="specialSection">
                        <ProfileModel
                          specialSection
                          sectionName={ProjectOtherSection}
                          profileDetails={projectSpecial}
                          userLanguage={userLanguage}
                          columns={5} />
                      </div>
                        )}
                    <div className="add-input">
                      <FieldArray
                        name="projects"
                        projectSpecial={ProjectOtherSection}
                        component={renderMultiSection}
                        sectionColumns={5}
                        sectionName={ProjectOtherSection}
                        multiSectionColumns={'column-collaborators'}
                        arrayClassName={'column-collaborators'}
                        profileDetails={profileDetails}
                        userLanguage={userLanguage}
                        responsive={{
                          mobile: 12,
                          tablet: 5,
                          computer: 5,
                          largeScreen: 5,
                          widescreen: 5
                        }}
                        />
                    </div>
                  </Grid.Column>
                </Grid>
                <Grid className="edit-field">
                  <Grid.Row>
                    <Grid.Column computer={12} className="no-gutter">
                      <Button
                        className="button-2"
                        type="button"
                        onClick={self.removeProject.bind(self, project.elasticId)}
                        ><FontAwesome name="minus-circle" />{strings.removeProject}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </form>
          </Grid.Column>
        )}
      </Grid>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProjectSignup = reduxForm({
  form: 'ProjectSignup' // ,  // a unique identifier for this form
})(ProjectSignup);

// Decorate with connect to read form values
const selector = formValueSelector('Project'); // <-- same as form name
ProjectSignup = connect(
  (state) => {
    // can select values individually
    const hasIndustry = selector(state, 'projectCapabilityReq');
    const hasSector = selector(state, 'sector');
    const hasSubSector = selector(state, 'subSector');
    const projectName = selector(state, 'projectName');
    return {
      hasIndustry,
      hasSector,
      hasSubSector,
      projectName,
      initialValues: state.projects.profiles,
      enableReinitialize: true
    };
  }
)(ProjectSignup);


ProjectSignup = connect(
  state => ({
    initialValues: state.projects.profiles,
    enableReinitialize: true
  }), {updateProjects, addNotification}
)(ProjectSignup);

export default ProjectSignup;
