import React from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import SearchModel from '../../../util/FrontendModel';
import {connect} from 'react-redux';

class StrategicPartnerSearch extends React.Component {
render() {
  const {searchDetails, userLanguage, hasPartnerIndustry, hasPartnerSector, hasPartnerSubSector} = this.props;
  const partnerSearchFields = searchDetails.partnerSearch.fields;
  return (
    <div className="no-gutter detailed-search-fields specific-partner-search">
      <SearchModel
        sectionName={partnerSearchFields}
        profileDetails={partnerSearchFields}
        userLanguage={userLanguage}
        conditional={Object.assign({}, {hasPartnerIndustry}, {hasPartnerSector}, {hasPartnerSubSector})}
        columns={4} />
    </div>
  );
}
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
StrategicPartnerSearch = reduxForm({
  form: 'StrategicPartnerSearch'// ,  // a unique identifier for this form
})(StrategicPartnerSearch);


// Decorate with connect to read form values
const selector = formValueSelector('StrategicPartnerSearch'); // <-- same as form name
StrategicPartnerSearch = connect(
  (state) => {
    // can select values individually
    const hasPartnerIndustry = selector(state, 'partnerIndustry');
    const hasPartnerSector = selector(state, 'partnerSector');
    const hasPartnerSubSector = selector(state, 'partnerSubSector');

    return {
      hasPartnerIndustry,
      hasPartnerSector,
      hasPartnerSubSector
    };
  }
)(StrategicPartnerSearch);


export default StrategicPartnerSearch;
