import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import UUID from 'node-uuid';
import editIcon from 'images/edit-icon.png';
import {FieldArray} from 'redux-form';
import {toggleProjectsEdit} from 'actions/projects';
import renderMultiSection from 'components/renderFields/renderMultiSection';
import ProfileModel from 'components/util/FrontendModel';
import TooltipWrapper from 'components/util/TooltipWrapper';
import { Grid, Button } from 'semantic-ui-react';
import strings from 'components/util/language';
import FontAwesome from 'react-fontawesome';
import ProjectApplicationSection from '../Sections/ProjectApplicationSection.js';
import dummyApplication from '../Dummy/dummyApplication.js';
import UploadFile from '../../Reusable/UploadFile';


class ProjectApplicationProgress extends Component {  //eslint-disable-line
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
  }

  render() {
    const self = this;
    const {handleSubmit, sections, profileDetails, userLanguage, initialValues, fullprofile, isProgress} = this.props;
    const languagePref = userLanguage === 'German';
    if (isProgress) {
    return (
      <Grid>
        <Grid.Column computer={12}>
          <form onSubmit={handleSubmit} id={'projectsApplicationForm'}>
            <div style={{paddingTop: '0px'}} className={'profile-card no-gutter no-shadow' + (sections.projectsApplication.editable ? ' edit-mode' : '')}>
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
          </form>
          <Button className="button-small projectSubmit align-move" onClick={this.props.submitApplication}>
            {strings.submitBotton}
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: ownProps.isProgress
   };
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProjectApplicationProgress = reduxForm({
  form: 'ProjectApplicationProgress'// ,  // a unique identifier for this form
})(ProjectApplicationProgress);


// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {toggleProjectsEdit})(ProjectApplicationProgress);
