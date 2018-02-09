import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import UUID from 'node-uuid';
import {Sticky} from 'react-sticky';
import editIcon from 'images/edit-icon.png';
import {updateProjects} from 'actions/projects';
import { addNotification } from 'actions/notification';
import {FieldArray} from 'redux-form';
import ProjectOtherSection from '../Sections/ProjectOtherSection.js';
import renderMultiSection from 'components/renderFields/renderMultiSection';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import ProfileModel from 'components/util/FrontendModel';
import TooltipWrapper from 'components/util/TooltipWrapper';
import { Grid, Button } from 'semantic-ui-react';
import strings from 'components/util/language';
import FontAwesome from 'react-fontawesome';
import {ProjectSection} from '../Sections/ProjectSection.js';
import dummyAddedProjects from '../Dummy/dummyProjects.js';
import CompanyFile from '../../Reusable/CompanyFile';
import SharingLink from '../../Reusable/SharingLink';
import crypto from 'crypto';
import Scrollchor from 'react-scrollchor';
import {ENV} from '../../../../server/config/appConfig';


class Project extends Component {  //eslint-disable-line

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


  // Edit and Save Mode for Project Page
  toggleEdit(section, edit_on) {
    this.props.toggleProjectsEdit(section, edit_on);
  }


    randomObjectId() {
        return crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
    }

  // Add a new project
  addProject() {
    const {profileDetails} = this.props;
    const projectId = this.randomObjectId();
    const new_project = {
     projectName: {
       type: 'string',
       typeValues: '',
     },
     projectLinkName: (ENV === 'development' ? 'http://localhost:3000/projects/' : 'https://digitalpartners.io/projects/') + projectId,
     projectId,
     projectCreatedAt: Date.now()
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
    this.props.saveProject(values, expanded_index, addProductIndex, 'ProjectAdded', new_project.projectLinkName);
    // The index of the product card to expand

    this.setState({
      ...this.state,
      expanded_index
    });
    }


  saveProject(status, index) {
    const { updateProjects, addNotification} = this.props;
    const updatedValue = status === 'Yes' ? {$set: {['projects.' + index + '.projectStatus']: 'No'}} : {$set: {['projects.' + index + '.projectStatus']: 'Yes'}};
    updateProjects({updatedValue})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
        addNotification(strings.projectupdateNotify, 'success', 'tc');
      }
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
    const projectSections = ProjectSection(cmsData);
    const languagePref = userLanguage === 'German';
    const stickyProps = {
      style: {
        transform: 'none',
        zIndex: 99,
        position: 'absolute',
        width: '100%'
      } // ensure btn is always on top
    };
    return (
      <Grid className="no-vertical-margin no-vertical-padding">
        { this.props.sidebarP !== 'true' &&
        <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding">
          <Grid.Row className="card-white">
            <div className="add-array">
              <FontAwesome name="plus-circle" />
              <a className="button-2" type="button" onClick={this.addProject}>{strings.addProject}</a>
            </div>
          </Grid.Row>
        </Grid.Column>
        }
        {this.props.sidebarP !== 'true' && profileDetails.projects && profileDetails.projects.map((project, index) =>
          <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter" key={index}>
            <form onSubmit={handleSubmit} className="products-form" >
              <div id={'projectName' + index} className={'profile-card services firstCard-generic' + (sections['projectName' + index] && sections['projectName' + index].editable ? ' edit-label' : '')}>
                <CollapsibleCardWrapper title={project.projectName.typeValues} defaultCollapsed={self.state.expanded_index !== index}>
                  <Sticky
                    style={stickyProps.style}
                    stickyStyle={stickyProps.stickyStyle}
                    >
                    <div className="edit-save-wrapper">
                      {(!sections['projectName' + index] || (sections['projectName' + index] && !sections['projectName' + index].showDiv)) &&
                        <div className="foobar">
                          <SharingLink notify={'Project Link Copied'} projectLink={project.projectLinkName} />
                        </div>
                      }
                      <a className="button-4  edit-button collapse-edit" onClick={() => this.toggleEdit('projectName' + index)}>
                        <img src={editIcon} role="presentation" /> {strings.edit}
                      </a>
                      <a className="button-4 edit-button collapse-edit collapse-publish" type="button" onClick={() => this.saveProject(project.projectStatus, index)}>
                        <FontAwesome name="bullhorn" /> {project.projectStatus === 'Yes' ? strings.unpublish : strings.publish}
                      </a>
                      <div className="save-cancel-button collapse-edit">
                        <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('projectName' + index, false)}>cancel</Button>
                        <Button className="button-small" type="button" onClick={handleSubmit(values => this.props.saveProject(values, index))}>save</Button>
                      </div>
                    </div>
                  </Sticky>
                  <Grid className="no-vertical-margin section-margin products scroll-down">
                    {/* Project Sub Section */}
                    <Grid.Column computer={12} className="no-gutter">
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
                      {/* <CompanyFile
                        projectfileURI={projectfileURI}
                        index={index}
                        editable={sections['projectName' + index] && sections['projectName' + index].editable}
                        userLanguage={userLanguage} />*/}

                      <Grid>
                        <Grid.Column computer={4}>
                          <TooltipWrapper name={'otherProjectCategory'} tooltip={userLanguage === 'German' ? 'If you feel that there is an important category missing in order to describe your project, add the category here' : 'If you feel that there is an important category missing in order to describe your project, add the category here'}>
                            <div className={'profile-label'}>
                              {userLanguage === 'German' ? 'Andere Projektkategorie' : 'Other Project Category'}
                               <div className="inline-icon">
                              <FontAwesome name="pencil" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />
                           </div>
                            </div>
                          </TooltipWrapper>
                        </Grid.Column>
                        <Grid.Column computer={4}>
                          <TooltipWrapper name={'Other Project Description'} tooltip={userLanguage === 'German' ? 'Describe the project according to the corresponding project category that you created' : 'Describe the project according to the corresponding project category that you created'}>
                            <div className={'profile-label'}>
                              {userLanguage === 'German' ? 'Andere Projektbeschreibung' : 'Other Project Description'}
                               <div className="inline-icon">
                              <FontAwesome name="tags" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />
                           </div>
                            </div>
                          </TooltipWrapper>
                        </Grid.Column>
                      </Grid>


                      {project.otherProjectDescription && project.otherProjectDescription.map(projectSpecial =>
                        <div key={UUID.v4()} className="specialSection">
                          <ProfileModel
                          specialSection
                          sectionName={ProjectOtherSection}
                          profileDetails={projectSpecial}
                          userLanguage={userLanguage}
                          columns={4} />
                        </div>
                        )}
                      <div className="add-input">
                        <FieldArray
                        name="projects"
                        projectSpecial={ProjectOtherSection}
                        projectIndex={index}
                        component={renderMultiSection}
                        sectionColumns={4}
                        sectionName={ProjectOtherSection}
                        multiSectionColumns={'column-projects'}
                        arrayClassName={'column-projects'}
                        profileDetails={profileDetails}
                        userLanguage={userLanguage}
                        responsive={{
                          mobile: 12,
                          tablet: 4,
                          computer: 4,
                          largeScreen: 4,
                          widescreen: 4
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
                </CollapsibleCardWrapper>
              </div>
            </form>
          </Grid.Column>
        )}
        {this.props.sidebarP === 'true' && profileDetails.projects && profileDetails.projects.map((project, index) =>
          <Grid.Column computer={12} className={'projectSidebar-grid'} key={index}>
            <div className="saved-card">
              <Scrollchor to={'projectName' + index} className="project-sidebar" animate={{offset: -58, duration: 500}}>
                <h3 className="sidebar-header1">{project.projectName.typeValues}</h3>
              </Scrollchor>
            </div>
          </Grid.Column>
        )}
      </Grid>

    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
Project = reduxForm({
  form: 'Project' // ,  // a unique identifier for this form
})(Project);

// Decorate with connect to read form values
const selector = formValueSelector('Project'); // <-- same as form name
Project = connect(
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
)(Project);


Project = connect(
  state => ({
    initialValues: state.projects.profiles,
    enableReinitialize: true
  }), {updateProjects, addNotification}
)(Project);

export default Project;
