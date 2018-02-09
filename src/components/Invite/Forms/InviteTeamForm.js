import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderInput, renderTextArea} from '../../renderFields/index';
import strings from '../../util/language';
import {Grid, Button} from 'semantic-ui-react';

const validate = (values) => {
  const errors = {};
  if (!values.teamMemberFirstName) {
    errors.teamMemberFirstName = strings.requiredFields;
  }
  if (!values.teamMemberLastName) {
    errors.teamMemberLastName = strings.requiredFields;
  }
  if (!values.teamMemberEmail) {
    errors.teamMemberEmail = strings.requiredFields;
  } else if (!/^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!gmx\.de)(?!mailinator\.com)(?!guerrillamail\.com)(?!1usemail\.com)(?!mvrht\.net)(?!maildrop\.cc)(?!hmamail\.com)([\w-]+\.)+[\w-]{2,4})?$/.test(values.teamMemberEmail)) {
    errors.teamMemberEmail = strings.invalidEmail;
  }

  return errors;
};

const InviteTeamForm = (props) => {
    const { handleSubmit} = props;
    return (
      <form className="inviteTeam-form" onSubmit={handleSubmit}>
        <Grid>
          <Grid.Column mobile={12} computer={4} className="no-vertical-padding">
            <Field name="teamMemberFirstName" component={renderInput} type="text" placeholder={strings.signupFirstName} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={4} className="no-vertical-padding">
            <Field name="teamMemberLastName" component={renderInput} type="text" placeholder={strings.signupLastName} />
          </Grid.Column>
          <Grid.Column mobile={12} computer={4} className="no-vertical-padding">
            <Field name="teamMemberEmail" component={renderInput} type="email" placeholder={strings.signupEmail} />
          </Grid.Column>
          <Grid.Column computer={12} className="no-vertical-padding">
            <Field name="teamMemberMessage" component={renderTextArea} placeholder={strings.inviteMessage} rows={9} />
          </Grid.Column>
          <Grid.Column computer={12} textAlign="left" className="submit">
            <Button type="submit" className="button-small inviteTeam-button">{strings.sendButton}</Button>
          </Grid.Column>
        </Grid>
      </form>
    );
};

export default reduxForm({
  form: 'InviteTeamForm',  // a unique identifier for this form
  validate,
})(InviteTeamForm);
