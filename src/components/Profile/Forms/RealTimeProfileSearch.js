import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'styles/components/register.css';
import strings from '../../util/language';
import {Grid, Input, Button} from 'semantic-ui-react';


const validate = (values) => {
  const errors = {};
  if (!values.elasticSearch) {
    errors.elasticSearch = strings.requiredField;
  } else if (values.elasticSearch.length !== 24) {
    errors.elasticSearch = 'Must be 24 Characters';
  }
  return errors;
};


const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={16} textAlign="left" >
    <Input fluid {...input} placeholder={placeholder} type={type} className="input-error" />
    {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);



const RealTimeProfileSearch = (props) => {
    const { handleSubmit} = props;
    return (
    <Grid className="profile-search">
    <Grid.Column computer={10} className="no-gutter">
      <form onSubmit={handleSubmit}>
        <Grid textAlign="center" centered>
        <Field name="elasticSearch" component={renderField} type="text" placeholder="Elastic Id" />
        <Button className="button-save-search" type="submit">Search Profile</Button>
        </Grid>
      </form>
    </Grid.Column>
    </Grid>
    );
};

export default reduxForm({
  form: 'RealTimeProfileSearch',  // a unique identifier for this form
  validate,               // <--- validation function given to redux-form
})(RealTimeProfileSearch);
