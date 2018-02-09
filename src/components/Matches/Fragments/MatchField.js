import React from 'react';
import PropTypes from 'prop-types';

const MatchField = (props) => {
  const {name, label, field, className} = props;
  var 
  formattedField = Array.isArray(field) ? field.map((multiSelect, i) =>
    <div key={'ms-' + i}>{multiSelect.value}</div>
  ) : field;
  return (
    <div className={`${className} match-summary--${name}`}>
     {formattedField.length > 0 ? <div> <div className={`label-generic match-summary--${name}-label`}>{label || name}</div>
      <div className={'match-summary--field'}>
        { formattedField}
      </div>
      </div> : <div> <div className={`label-generic match-summary--${name}-label`}>{label || name}</div>
      <div className={'match-summary--field'}>
        {formattedField = '-'}
      </div>
      </div>}
    </div>
  );
};
MatchField.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.any.isRequired, // should be string|array
  label: PropTypes.string,
  className: PropTypes.string
};

export default MatchField;
