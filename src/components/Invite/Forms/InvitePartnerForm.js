import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderInput, renderTextArea} from '../../renderFields/index';
import strings from '../../util/language';
import {Grid, Button} from 'semantic-ui-react';

const validate = (values) => {
  const errors = {};
  if (!values.partnerCompanyName) {
    errors.partnerCompanyName = strings.requiredFields;
  }
  if (!values.partnerFirstName) {
    errors.partnerFirstName = strings.requiredFields;
  }
  if (!values.partnerLastName) {
    errors.partnerLastName = strings.requiredFields;
  }
  if (!values.partnerEmail) {
    errors.partnerEmail = strings.requiredFields;
  } else if (!/^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!gmx\.de)(?!mailinator\.com)(?!guerrillamail\.com)(?!1usemail\.com)(?!mvrht\.net)(?!maildrop\.cc)(?!hmamail\.com)([\w-]+\.)+[\w-]{2,4})?$/.test(values.partnerEmail)) {
    errors.partnerEmail = strings.invalidEmail;
  }
  return errors;
};

const InvitePartnerForm = (props) => {
    const { handleSubmit} = props;
    return (
      <form className="" onSubmit={handleSubmit}>
        <Grid>
          <Grid.Column mobile={12} computer={12}>
            <Field name="partnerCompanyName" component={renderInput} type="text" placeholder={strings.inviteCompanyName} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={4}>
            <Field name="partnerLastName" component={renderInput} type="text" placeholder={strings.signupLastName} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={4}>
            <Field name="partnerEmail" component={renderInput} type="email" placeholder={strings.signupEmail} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={4}>
            <Field name="partnerCompanyName" component={renderInput} type="text" placeholder={strings.inviteCompanyName} />
          </Grid.Column>
          <Grid.Column computer={12}>
            <Field name="partnerMessage" component={renderTextArea} placeholder={strings.inviteMessage} rows={9} />
          </Grid.Column>
          <Grid.Column computer={12} textAlign="left">
            <Button type="submit" className="button-small inviteTeam-button">{strings.sendButton}</Button>
          </Grid.Column>
        </Grid>
      </form>
    );
};

export default reduxForm({
  form: 'InvitePartnerForm',  // a unique identifier for this form
  validate,
})(InvitePartnerForm);
