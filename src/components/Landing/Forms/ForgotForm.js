import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import 'styles/components/register.css';
import strings from '../../util/language';
import {Grid, Input, Button} from 'semantic-ui-react';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = strings.requiredFields;
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,12}))$/i.test(values.email)) {
    errors.email = strings.invalidEmail;
  }

  return errors;
};



const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={12}>
    <Input fluid {...input} placeholder={placeholder} type={type} />
    {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);

class ForgotForm extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
   componentWillReceiveProps(nextProps) {
     const registered = !nextProps.submitFailed && nextProps.submitSucceeded && !nextProps.submitting;
     if (registered) {
       this.props.onRegistered(); // <-- notify parent so it could remove form from rendering and do smthing good
     }
   }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Grid centered>
        <Grid.Column mobile={12} tablet={12} computer={12} largeScreen={12} widescreen={8} textAlign="center" >
          <form onSubmit={handleSubmit}>
            <Grid centered textAlign="center">
              <Field name="email" component={renderField} type="email" placeholder={strings.signupEmail} />
              <Button type="submit" className="lp-button">{strings.sendButton}</Button>
            </Grid>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'ForgotForm',  // a unique identifier for this form
  validate                 // <--- validation function given to redux-form
})(ForgotForm);
