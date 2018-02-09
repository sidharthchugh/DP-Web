import React from 'react';
import { Input } from 'semantic-ui-react'

const renderInput = ({ input, placeholder, type, validations, disabled, defaultChecked, meta: { touched, error } }) => (
  <div>
    <div>
      <Input {...input}
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

export default renderInput;
