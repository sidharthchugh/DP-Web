import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

const renderDropdownList = ({ input, meta, ...rest }) => {
  return <DropdownList {...input} {...rest} />;
};

export default renderDropdownList;
