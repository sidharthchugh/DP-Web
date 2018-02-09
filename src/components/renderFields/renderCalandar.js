import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

const formatDate = (date, fullyear) => {
  const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  return fullyear ? date.getFullYear().toString() : date.getDate().toString() + ' ' + monthNames[date.getMonth()] + ' '  + date.getFullYear().toString();
};

const renderCalandar = ({ input, placeholder, max, initialView, formatValue, disabled, fullyear,min }) =>
  <DateTimePicker format={formatValue} max={max} disabled={disabled} value={input.value ? new Date(input.value) : null} min={min} placeholder={placeholder} initialView={initialView} footer={false} time={false} onChange={event => input.onChange(formatDate(event, fullyear))} />;

export default renderCalandar;
