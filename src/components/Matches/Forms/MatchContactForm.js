import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderInput, renderTextArea} from 'components/renderFields/index';
import strings from 'components/util/language';
import {Grid, Button} from 'semantic-ui-react';

const validate = (values) => {
  const errors = {};
  if (!values.senderFirstName) {
    errors.senderFirstName = strings.requiredFields;
  }
  if (!values.senderLastName) {
    errors.senderLastName = strings.requiredFields;
  }
  if (!values.senderEmail) {
    errors.senderEmail = strings.requiredFields;
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.senderEmail)) {
    errors.senderEmail = strings.invalidEmail;
  }

  return errors;
};

const MatchContactForm = (props) => {
    const { handleSubmit} = props;
    return (
      <Grid>
        <Grid.Column computer={12}>
          <form className="inviteTeam-form" onSubmit={handleSubmit}>
            <Grid>
              <Grid.Column computer={12}>
                <Field name="senderMessage" component={renderTextArea} placeholder={strings.inviteMessage} rows={9} />
              </Grid.Column>
              <Grid.Column computer={12} className="submit" textAlign="left">
                <Button type="submit" className="button-small inviteTeam-button">{strings.sendButton}</Button>
              </Grid.Column>
            </Grid>
          </form>
        </Grid.Column>
      </Grid>
    );
};

export default reduxForm({
  form: 'MatchContactForm',  // a unique identifier for this form
  validate,
})(MatchContactForm);
