import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import UUID from 'node-uuid';
import editIcon from 'images/edit-icon.png';
import {FieldArray} from 'redux-form';
import renderMultiSection from 'components/renderFields/renderMultiSection';
import ProfileModel from 'components/util/FrontendModel';
import TooltipWrapper from 'components/util/TooltipWrapper';
import { Grid, Button } from 'semantic-ui-react';
import strings from 'components/util/language';
import FontAwesome from 'react-fontawesome';
import ProjectApplicationSection from '../Sections/ProjectApplicationSection.js';
import dummyApplication from '../Dummy/dummyApplication.js';


class ProjectApplication extends Component {  //eslint-disable-line
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
  }


  // Edit and Save Mode for Profile Page
  toggleEdit(section) {
    const {toggleProjectsEdit} = this.props;
    this.props.toggleProjectsEdit(section);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // Add a new product
  addProduct() {
    const {profileDetails} = this.props;
    const new_project = {
     projectName: {
       type: 'string',
       typeValues: '',
     }
    };
    const new_products = new Array();
    for (let i = 0; i < profileDetails.products.length; i++) {
      const product = profileDetails.products[i];
      new_products.push(profileDetails.products[i]);
    }
    new_products.push(new_product);
    const values = {...profileDetails, products: new_products };
    this.props.saveProfile(values);
    // The index of the product card to expand
    const expanded_index = new_products.length - 1;
    this.setState({
      ...this.state,
      expanded_index
    });
    this.toggleEdit('services', true);
  }

  // Removes a project
  removeProduct(delete_id) {
    // Ask user to confirm delete
    const sure_delete = window.confirm('Are you sure you want to delete?');
    if (sure_delete) {
      const {profileDetails} = this.props;
      const new_products = new Array();
      // Rebuild new Products array
      for (let i = 0; i < profileDetails.products.length; i++) {
        const product = profileDetails.products[i];
        if (product.elasticId != delete_id) {
          new_products.push(profileDetails.products[i]);
        }
      }
      // Build new values array and sent it to save
      const values = {...profileDetails, products: new_products };
      this.props.saveProfile(values);
    }
  }

  render() {
    const self = this;
    const {handleSubmit, sections, profileDetails, userLanguage, strings, initialValues, fullprofile, isProgress} = this.props;
    const languagePref = userLanguage === 'German';
    if (isProgress) {
    return (
      <Grid>
        <Grid.Column computer={12}>
          <form onSubmit={handleSubmit}>
            <div style={{paddingTop: '0px'}} className={'profile-card no-gutter no-shadow lastCard-generic' + (this.state.editMode.editable ? ' edit-mode' : '')}>
              <ProfileModel
                  sectionName={ProjectApplicationSection.projectApplication}
                  profileDetails={isProgress}
                  userLanguage={userLanguage}
                  responsive={{
                    mobile: 12,
                    tablet: 12,
                    computer: 4,
                    largeScreen: 4,
                    widescreen: 4
                  }} />
            </div>
            <div>{isProgress.projectfileApplicationURI}</div>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
    return null;
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProjectApplication = reduxForm({
  form: 'ProjectApplication'// ,  // a unique identifier for this form
})(ProjectApplication);

ProjectApplication = connect(
  state => ({
    initialValues: state.projects.profiles,
    enableReinitialize: true
  })
)(ProjectApplication);

export default ProjectApplication;
