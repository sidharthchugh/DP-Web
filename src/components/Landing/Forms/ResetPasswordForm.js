import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'styles/components/register.css';
import strings from '../../util/language';
import {Grid, Input, Button} from 'semantic-ui-react';

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = strings.requiredFields;
  } else if (values.password.length > 15) {
    errors.password = 'Must be 15 characters or less';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = strings.requiredFields;
  } else if (values.confirmPassword.length > 15) {
    errors.confirmPassword = strings.signupFiftheenCharacters;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = strings.mismatchPassword;
  }

  return errors;
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={12} textAlign="center" >
      <Input {...input} placeholder={placeholder} type={type} fluid/>
      {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);

const ResetPasswordForm = (props) => {
  const { handleSubmit } = props;
  return (
    <Grid centered>
      <Grid.Column mobile={12} tablet={12} computer={12} largeScreen={12} widescreen={12} textAlign="center">
        <form onSubmit={handleSubmit}>
          <Grid centered textAlign="center">
            <Field name="password" component={renderField} type="password" placeholder={strings.signupPassword} />
            <Field name="confirmPassword" component={renderField} type="password" placeholder={strings.signupConfirmPassword} />
            <Button type="submit" className="button-normal">{strings.headerLogin}</Button>
          </Grid>
        </form>
      </Grid.Column>
    </Grid>
  );
};

export default reduxForm({
  form: 'ResetPasswordForm',  // a unique identifier for this form
  validate,               // <--- validation function given to redux-form
})(ResetPasswordForm);
