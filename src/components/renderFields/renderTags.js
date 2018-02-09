import React from 'react';
import {Creatable} from 'react-select';

function validateOption(obj) {
  if (/\S/.test(obj)) {
   return obj;
}
}

const renderTags = ({ input, placeholder}) => {
 return (
   <div>
     <Creatable multi isValidNewOption={({ label }) => validateOption(label)} value={input.value} onChange={input.onChange} placeholder={placeholder} />
   </div>
 );
};

export default renderTags;
