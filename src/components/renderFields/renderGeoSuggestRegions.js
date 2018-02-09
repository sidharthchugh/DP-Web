import React from 'react';
import Geosuggest from 'react-geosuggest';

const renderGeoSuggestRegions = ({ input, placeholder, types }) => {
  return (<Geosuggest
            className="ui fluid input"
            placeholder={placeholder}
            types={types}
            initialValue={input.value}
            inputClassName="ui fluid input"
            onSuggestSelect={event => {
      let address = event.gmaps.address_components[0].long_name;
      if (types[0] === 'address') {
        address = event.label.split(',')[0];
      }
      input.onChange(address);
    }} />);
};

export default renderGeoSuggestRegions;
