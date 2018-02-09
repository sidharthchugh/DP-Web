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
  if (!values.notifyme) {
    errors.email = strings.requiredFields;
  } else if (!MailChecker.isValid(values.email)) {
    errors.email = strings.invalidEmail; // to add emails go to mailchecker then in the platform/node section go to index.js and add them to teh black list.
  } else if (!/^([\w-.]+@(?!gmail\.)(?!yahoo\.)(?!hotmail\.)(?!gmx\.)(?!mailinator\.)(?!guerrillamail\.)(?!1usemail\.)(?!mvrht\.)(?!maildrop\.)(?!hmamail\.)(?!freenet\.)([\w-]+\.)+[\w-]{2,12})?$/.test(values.email)) {
    errors.email = strings.invalidEmail;
  }
  return errors;
};

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={16} textAlign="left" >
    <Input fluid {...input} placeholder={placeholder} type={type} className="input-error" />
    {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);


const CommingSoonForm = (props) => {
    const { handleSubmit} = props;
    return (
      <form onSubmit={handleSubmit} id="notifyme-form">
        <Grid>
        <Grid.Column computer={7} textAlign="left" >
        <Field name="notifyme" component={renderField} type="text" placeholder={'Be the first to Know. Enter your email'} />
          </Grid.Column>
          <Grid.Column computer={2}>
          <Button type="submit" className="button-normal">{'Notify me!'}</Button>
          </Grid.Column>
        </Grid>
      </form>
    );
};

export default reduxForm({
  form: 'CommingSoonForm',  // a unique identifier for this form
  validate,               // <--- validation function given to redux-form
})(CommingSoonForm);
