import React from 'react';
import Select from 'react-select';

const renderMultiDropdowns = ({ input, placeholder, options, disabled}) =>
  <Select multi value={input.value} options={options} onChange={input.onChange} placeholder={placeholder} disabled={disabled} />;
export default renderMultiDropdowns;
