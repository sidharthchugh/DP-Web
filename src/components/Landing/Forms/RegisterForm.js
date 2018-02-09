import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'styles/components/register.css';
import strings from '../../util/language';
import {Grid, Input, Button} from 'semantic-ui-react';
import DropdownList from 'react-widgets/lib/DropdownList';
// import checker from './mailchecker';
import MailChecker from 'mailchecker';


const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = strings.requiredFields;
  } else if (values.firstName.length > 15) {
    errors.firstName = strings.signupFiftheenCharacters;
  }
  if (!values.lastName) {
    errors.lastName = strings.requiredFields;
  } else if (values.lastName.length > 15) {
    errors.lastName = strings.signupFiftheenCharacters;
  }
  //  if (!MailChecker.isValid(values.email)) {
  //   console.log(values.email, 'invalid email');
  // }
  if (!values.email) {
    errors.email = strings.requiredFields;
  } else if (!MailChecker.isValid(values.email)) {
    errors.email = strings.invalidEmail; // to add emails go to mailchecker then in the platform/node section go to index.js and add them to teh black list.
  } else if (!/^([\w-.]+@(?!gmail\.)(?!yahoo\.)(?!hotmail\.)(?!gmx\.)(?!mailinator\.)(?!guerrillamail\.)(?!1usemail\.)(?!mvrht\.)(?!maildrop\.)(?!hmamail\.)(?!freenet\.)([\w-]+\.)+[\w-]{2,12})?$/.test(values.email)) {
    errors.email = strings.invalidEmail;
  }
  if (!values.password) {
    errors.password = strings.requiredFields;
  } else if (values.password.length < 6) {
    errors.password = strings.signupSixCharacters;
  }
  if (!values.userCompany) {
    errors.userCompany = strings.requiredFields;
  } else if (values.userCompany.length < 4) {
    errors.userCompany = strings.signupFourCharacters;
  }
  if (!values.role) {
    errors.role = strings.requiredFields;
  }
  if (!values.userPhone) {
    errors.userPhone = strings.requiredFields;
  }
  if (!values.password) {
    errors.password = strings.requiredFields;
  } else if (values.password.length < 6) {
    errors.password = strings.signupSixCharacters;
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = strings.requiredFields;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = strings.mismatchPassword;
  }

  return errors;
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={16} textAlign="left" >
    <Input fluid {...input} placeholder={placeholder} type={type} className="input-error" />
    {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);

const renderDropdownList = ({ input, meta, ...rest, meta: { touched, error } }) => {
  return (
    <Grid.Column computer={16} textAlign="left" >
      <DropdownList {...input} {...rest} />
      {touched && error && <span className="validation">{error}</span>}
    </Grid.Column>
  );
};


const renderInput = ({ input, placeholder, type, validations, disabled, defaultChecked, meta: { touched, error } }) => (
  <div>
    <div>
      <Input
{...input}
        fluid
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        defaultChecked={defaultChecked} />
      {touched && error && <span className="validation">{error}</span>}
      {validations &&
        <div className="character-counter">
          {input.value.length} of {validations}c.
        </div>}
    </div>
  </div>
);

const roleValues = ['Investor', 'Startup', 'Established Company'];


const typeValuesArray = Object.keys(roleValues).map(key => roleValues[key]);


      const validateNumber = (values) => {
       if (values) {
          const numberValues = /[a-z]/.test(values.toLowerCase());
           if (!numberValues) {
             return values;
           }
         } else {
             return values;
         }
 };

const RegisterForm = (props) => {
    const { handleSubmit} = props;
    return (
      <form onSubmit={handleSubmit} id="register-form">
        <Grid textAlign="center" centered>
          <Field name="userCompany" component={renderField} type="text" placeholder={strings.signupCompany} />
          <Field name="firstName" component={renderField} type="text" placeholder={strings.signupFirstName} />
          <Field name="lastName" component={renderField} type="text" placeholder={strings.signupLastName} />
          <Field name="email" component={renderField} type="email" placeholder={strings.signupEmail} />
          <Field name="role" component={renderDropdownList} data={typeValuesArray} placeholder={strings.role} />
          <Grid.Column computer={16} textAlign="left" >
            <Field name="userPhone" component={renderInput} normalize={values => validateNumber(values)} placeholder={strings.phone} />
          </Grid.Column>
          <Field name="password" component={renderField} type="password" placeholder={strings.signupPassword} />
          <Field name="confirmPassword" component={renderField} type="password" placeholder={strings.signupConfirmPassword} />
          <Button type="submit" className="lp-button">{strings.signUpSubmit}</Button>
        </Grid>
      </form>
    );
};

export default reduxForm({
  form: 'RegisterForm',  // a unique identifier for this form
  validate,               // <--- validation function given to redux-form
})(RegisterForm);
