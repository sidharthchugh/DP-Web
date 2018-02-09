import React from 'react';
import NumberPicker from 'react-widgets/lib/NumberPicker';

const renderNumberPicker = ({ input, placeholder }) =>
  <NumberPicker placeholder={placeholder} value={parseInt(input.value, 10)} onChange={input.onChange} min={0} />;

export default renderNumberPicker;
