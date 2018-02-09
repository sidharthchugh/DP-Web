import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'styles/components/support';
import {renderInput, renderTextArea} from '../../renderFields/index';
import strings from '../../util/language';
import {Grid, Button} from 'semantic-ui-react';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = strings.requiredFields;
  }
  if (!values.email) {
    errors.email = strings.requiredFields;
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
    errors.email = strings.invalidEmail;
  }
  if (!values.subject) {
    errors.subject = strings.requiredFields;
  }
  if (!values.message) {
    errors.message = strings.requiredFields;
  }

  return errors;
};

const SupportForm = (props) => {
    const { handleSubmit} = props;
    return (
      <form className="contact-form" onSubmit={handleSubmit}>
        <Grid>
          <Grid.Column mobile={12} computer={4}>
            <Field name="name" component={renderInput} type="text" placeholder={strings.contactFormName} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={4}>
            <Field name="phoneNumber" component={renderInput} type="number" placeholder={strings.contactFromPhone} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={4}>
            <Field name="email" component={renderInput} type="email" placeholder={strings.contactFormEmail} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={12}>
            <Field name="subject" component={renderInput} type="text" placeholder={strings.contactFormSubject} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={12}>
            <Field name="message" component={renderTextArea} placeholder={strings.contactFormMessage} rows={9} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={12} textAlign="left">
            <Button type="submit" className="button-small contact-button">{strings.contactFromSend}</Button>
          </Grid.Column>
        </Grid>
      </form>
    );
};

export default reduxForm({
  form: 'SupportForm',  // a unique identifier for this form
  validate,               // <--- validation function given to redux-form
})(SupportForm);
