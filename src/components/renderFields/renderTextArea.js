import React from 'react';
import Textarea from 'react-textarea-autosize';

const renderTextArea = ({ input, placeholder, validations, rows, meta: { touched, error } }) => (
  <div>
    <div className="ui form">
      <Textarea
        value={input.value}
        placeholder={placeholder}
        onChange={input.onChange}
        rows={rows}
        minRows={3} />
      {touched && error && <span className="validation">{error}</span>}
      {validations &&
      <div className="character-counter">
        {input.value.length} of {validations}c.
          </div>}
    </div>
  </div>
);

export default renderTextArea;
