import React, {Component} from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import {Grid, Button} from 'semantic-ui-react';
import strings from 'components/util/language.js';
import FrontendModel from '../../../util/FrontendModel.js';
import ProjectApplicationSection from '../../../Project/Sections/ProjectApplicationSection.js';
import dummyApplication from '../../../Project/Dummy/dummyApplication.js';
import UploadFile from '../../../Reusable/UploadFile';

class ProjectMatchExpanded extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {userLanguage, project, handleSubmit} = this.props;
    return (
      <Grid>
        <form onSubmit={handleSubmit} className="profile-card match-apply edit-mode" >
          <Grid.Column computer={12}>
            <h2 className="heading3 matches-applyButton">{strings.applyButton}</h2>
            <FrontendModel
              sectionName={ProjectApplicationSection.projectApplication}
              profileDetails={dummyApplication.projectApplication}
              userLanguage={userLanguage}
              responsive={{
                mobile: 12,
                tablet: 12,
                computer: 12,
                largeScreen: 12,
                widescreen: 12
              }} />
          </Grid.Column>
          {/* <UploadFile /> */}
          <Grid.Column computer={12} textAlign="right">
            <Button className="button-small button-small--grey" type="button" onClick={this.props.cancelButton}>
              {strings.cancel}
            </Button>
            <Button
className="button-small" onClick={handleSubmit(values =>
          this.props.saveButton({
            ...values
          }))}>
              {strings.saveButton}
            </Button>
            <Button
className="button-small" onClick={handleSubmit(values =>
          this.props.submitButton({
            ...values
          }))}>
              {strings.submitButton}
            </Button>
          </Grid.Column>
        </form>
      </Grid>
    );
  }
}


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProjectMatchExpanded = reduxForm({
  form: 'ProjectApplication'// ,  // a unique identifier for this form
})(ProjectMatchExpanded);


export default ProjectMatchExpanded;
