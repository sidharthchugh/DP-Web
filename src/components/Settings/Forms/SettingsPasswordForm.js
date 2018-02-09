import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderInput} from '../../renderFields';
import strings from '../../util/language';
import {Grid, Button} from 'semantic-ui-react';

const validate = (values) => {
  const errors = {};
  if (!values.oldPassword) {
    errors.oldPassword = strings.requiredFields;
  }
  if (!values.newPassword) {
    errors.newPassword = strings.requiredFields;
  } else if (values.newPassword.length < 6) {
    errors.newPassword = strings.signupSixCharacters;
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = strings.requiredFields;
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = strings.mismatchPassword;
  }
  return errors;
};


class SettingsPasswordForm extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */

   // Send data on blur and on Change
   cancelSettings() {
      this.props.cancel();
   }

  render() {
    const { userLanguage, handleSubmit} = this.props;
    return (
      <Grid>
        <Grid.Column tablet={12} computer={9} textAlign="center">
          <form onSubmit={handleSubmit}>
            <Field name="oldPassword" component={renderInput} type="password" placeholder={userLanguage === 'German' ? 'Altes Passwort' : 'Current Password'} />
            <Field name="newPassword" component={renderInput} type="password" placeholder={userLanguage === 'German' ? 'Neues Passwort' : 'New Password'} />
            <Field name="confirmPassword" component={renderInput} type="password" placeholder={userLanguage === 'German' ? 'Passwort bestätigen' : 'Confirm Password'} />
            <Button type="submit" className="button-small">{userLanguage === 'German' ? 'einreichen' : 'SUBMIT'}</Button>
            <Button onClick={() => this.cancelSettings()} className="button-small button-small--grey">{userLanguage === 'German' ? 'ABBRECHEN' : 'CANCEL'}</Button>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'SettingsPasswordForm',  // a unique identifier for this form
  validate            // <--- validation function given to redux-form
})(SettingsPasswordForm);
