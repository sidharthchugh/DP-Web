import React from 'react';
import {Grid, Input, Button} from 'semantic-ui-react';


const inputField = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={16} textAlign="left" >
    <Input fluid {...input} placeholder={placeholder} type={type} className="input-error" />
    {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);

const checkbox = ({ input, placeholder, type, meta: { touched, error } }) => (
  <Grid.Column computer={16} textAlign="left" >
    <Input {...input} placeholder={placeholder} type={type} className="input-error" />
    {touched && error && <span className="validation">{error}</span>}
  </Grid.Column>
);

 export {inputField, checkbox};
