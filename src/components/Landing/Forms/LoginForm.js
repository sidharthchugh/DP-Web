import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'styles/components/register.css';
import strings from '../../util/language';
import {Grid, Input, Button} from 'semantic-ui-react';


const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = strings.requiredFields;
  } else if (!/^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!gmx\.de)(?!mailinator\.com)(?!guerrillamail\.com)(?!1usemail\.com)(?!mvrht\.net)(?!maildrop\.cc)(?!hmamail\.com)([\w-]+\.)+[\w-]{2,12})?$/.test(values.email)) {
    errors.email = strings.invalidEmail;
  }
  if (!values.password) {
    errors.password = strings.requiredFields;
  }

  return errors;
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={12}>
    <Input fluid {...input} placeholder={placeholder} type={type} />
    {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);


const LoginForm = (props) => {
  const { handleSubmit } = props;
  return (
    <Grid centered>
      <Grid.Column computer={12} textAlign="center">
        <form onSubmit={handleSubmit} id="authentication">
          <Grid centered textAlign="center">
            <Field name="email" component={renderField} type="email" placeholder={strings.signupEmail} />
            <Field name="password" component={renderField} type="password" placeholder={strings.signupPassword} />
            <Button type="submit" className="lp-button">{strings.signUpSubmit}</Button>
          </Grid>
        </form>
      </Grid.Column>
    </Grid>

  );
};

export default reduxForm({
  form: 'LoginForm',  // a unique identifier for this form
  validate            // <--- validation function given to redux-form
})(LoginForm);
