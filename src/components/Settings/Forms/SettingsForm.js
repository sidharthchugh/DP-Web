import React, {Component} from 'react';
import {connect} from 'react-redux';
import editIcon from '../../../images/edit-icon.png';
import {Field, reduxForm} from 'redux-form';
import {inputField, checkbox} from './renderSettingsField';
import {renderDropdownList} from '../../../components/renderFields';
import strings from '../../util/language';
import {Grid, Button} from 'semantic-ui-react';


const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = strings.requiredFields;
  } else if (!/^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!gmx\.de)(?!mailinator\.com)(?!guerrillamail\.com)(?!1usemail\.com)(?!mvrht\.net)(?!maildrop\.cc)(?!hmamail\.com)([\w-]+\.)+[\w-]{2,4})?$/.test(values.email)) {
    errors.email = strings.invalidEmail;
  }
  return errors;
};


class SettingsForm extends Component {
    /*
     * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
     * properties on the constructor
     * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
     */
     constructor(props) {
      super(props);
      this.chooseEditType = this.chooseEditType.bind(this);
      this.enterEditMode = this.enterEditMode.bind(this);
      this.cancelEditMode = this.cancelEditMode.bind(this);
    }

   chooseEditType(value) {
     let typeValuesArray = [];
     // If value.typeValues is defined, transform into Array<string> for redux-form render
     if (value.typeValues) {
       typeValuesArray = Object.keys(value.typeValues).map(key => value.typeValues[key]);
     }
     return (
       <div className="edit-field">
         {(() => {
            if (value.type === 'string') {
             return (
               <Field
                name={value.name}
                component={inputField}
                type="text"
                placeholder={value.label}
                size={value.size} />
             );
           } else if (value.type === 'checkbox') {
             return (
               <Field
                name={value.name}
                component={checkbox}
                type="checkbox"
                placeholder={value.label}
                size={value.size} />
             );
           } else if (value.type === 'dropdown') {
             return (
               <Field
                name={value.name}
                component={renderDropdownList}
                data={typeValuesArray}
                placeholder={value.label}
                size={value.size} />
             );
           }
         })()}
       </div>
     );
   }

   // NOTE Ben: Let's refactor the two methods below to use
   // `editable: true|false` in ProfileCard's state.
   enterEditMode(event) {
     $(event.target).closest('.profile-card').addClass('edit-mode'); //eslint-disable-line
   }

   cancelEditMode(event) {
     $(event.target).closest('.profile-card').removeClass('edit-mode'); //eslint-disable-line
   }

  render() {
    const {handleSubmit, settingsDetails, initialValues, userLanguage} = this.props;
    const newsLetter = (newsletterValue) => {
      if (!newsletterValue) {
        return initialValues.language === 'German' ? 'Sie sind nicht für den Newsletter angemeldet.' : 'You are not subscribed to the Newsletter';
      }
         return initialValues.language === 'German' ? 'Sie sind für den Newsletter angemeldet.' : 'You are subscribed to the Newsletter';
    };
    return (
      <form onSubmit={handleSubmit} className="settings-form topSettings">
        <div className="edit-save-wrapper">
          <a className="edit-button edit-settings" onClick={event => this.enterEditMode(event)}>
            <img src={editIcon} role="presentation" /> {initialValues.language === 'German' ? 'Bearbeiten' : 'Edit'}
          </a>
          <div id="setting-save-cancel-wrapper" className="save-cancel-button save-settings">
            <Button
              className="button-small button-small--grey"
              type="button"
              onClick={event => this.cancelEditMode(event)}
            >
              {initialValues.language === 'German' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button
              className="button-small"
              type="submit"
              onClick={event => this.cancelEditMode(event)}> {initialValues.language === 'German' ? 'Speichern' : 'Save'}</Button>
          </div>
        </div>
        <Grid>
          <Grid.Column computer={6} tablet={6} mobile={12} className="bigger-input no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[0].germanLabel : settingsDetails.SettingsInfo[0].englishLabel}</div>
            <div className="settingsPage-value profile-value">{settingsDetails.SettingsInfo[0].value}</div>
            {this.chooseEditType(settingsDetails.SettingsInfo[0])}
          </Grid.Column>
          <Grid.Column computer={6} tablet={6} mobile={12} className="end bigger-input no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[1].germanLabel : settingsDetails.SettingsInfo[1].englishLabel}</div>
            <div className="settingsPage-value profile-value">{settingsDetails.SettingsInfo[1].value}</div>
            {this.chooseEditType(settingsDetails.SettingsInfo[1])}
          </Grid.Column>
          <Grid.Column computer={12} className="no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[2].germanLabel : settingsDetails.SettingsInfo[2].englishLabel}</div>
            <div className="settingsPage-value profile-value">{settingsDetails.SettingsInfo[2].value}</div>
            {this.chooseEditType(settingsDetails.SettingsInfo[2])}
          </Grid.Column>
          <Grid.Column computer={12} className="no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[3].germanLabel : settingsDetails.SettingsInfo[3].englishLabel}</div>
            <div className="settingsPage-value profile-value">{settingsDetails.SettingsInfo[3].value}</div>
            {this.chooseEditType(settingsDetails.SettingsInfo[3])}
          </Grid.Column>
          <Grid.Column computer={12} className="no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[4].germanLabel : settingsDetails.SettingsInfo[4].englishLabel}</div>
            <div className="settingsPage-value profile-value">{settingsDetails.SettingsInfo[4].value}</div>
            {this.chooseEditType(settingsDetails.SettingsInfo[4])}
          </Grid.Column>
          <Grid.Column computer={12} className="no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[5].germanLabel : settingsDetails.SettingsInfo[5].englishLabel}</div>
            <div className="settingsPage-value profile-value">{settingsDetails.SettingsInfo[5].value}</div>
            {this.chooseEditType(settingsDetails.SettingsInfo[5])}
          </Grid.Column>
          <Grid.Column computer={12} className="no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[6].germanLabel : settingsDetails.SettingsInfo[6].englishLabel}</div>
            <div className="settingsPage-value profile-value">{settingsDetails.SettingsInfo[6].value}</div>
            {this.chooseEditType(settingsDetails.SettingsInfo[6])}
          </Grid.Column>
          <Grid.Column computer={12} className="no-vertical-padding">
            <div className="profile-label settings-label">{initialValues.language === 'German' ? settingsDetails.SettingsInfo[7].germanLabel : settingsDetails.SettingsInfo[7].englishLabel}</div>
            <div className="settingsPage-value profile-value">
              {
              newsLetter(settingsDetails.SettingsInfo[7].value)
              }
            </div>
            {this.chooseEditType(settingsDetails.SettingsInfo[7])}
          </Grid.Column>
        </Grid>
      </form>
    );
   }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SettingsForm = reduxForm({
  form: 'SettingsForm',  // a unique identifier for this form
   validate
})(SettingsForm);

SettingsForm = connect(
  state => ({
    initialValues: state.user.userObj,
    enableReinitialize: true
  })
)(SettingsForm);

export default SettingsForm;
