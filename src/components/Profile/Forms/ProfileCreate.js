import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'styles/components/register.css';
import strings from '../../util/language';
import {Grid, Input, Button} from 'semantic-ui-react';
import renderInput from '../../renderFields/renderInput';

const ProfileCreate = (props) => {
    const { handleSubmit} = props;
    return (
    <Grid className="profile-search">
    <Grid.Column computer={10} className="no-gutter">
      <form onSubmit={handleSubmit}>
        <Grid textAlign="center" centered>
        <Grid.Column computer={12} className="no-gutter">
        <Field name="profileCreate" component={renderInput} placeholder="Company Name" />
        <Button className="button-save-search adminProfile-button" type="button" onClick={handleSubmit(values => props.createProfile(values))}>Create Profile</Button>
        </Grid.Column>
        </Grid>
      </form>
    </Grid.Column>
    </Grid>
    );
};

export default reduxForm({
  form: 'ProfileCreateSearch',  // a unique identifier for this form
})(ProfileCreate);
