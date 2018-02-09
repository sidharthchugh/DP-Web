import React from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import SearchModel from '../../../util/FrontendModel';
import {connect} from 'react-redux';

class StrategicPartnerDetailSearch extends React.Component {
render() {
  const {searchDetails, userLanguage, hasPartnerIndustry, hasPartnerSector, hasPartnerSubSector} = this.props;
  const partnerDetailSearchFields = searchDetails.partnerDetailSearch.fields;
  return (
    <div className="no-gutter detailed-search-fields specific-partner-search">
      <SearchModel
        sectionName={partnerDetailSearchFields}
        profileDetails={partnerDetailSearchFields}
        userLanguage={userLanguage}
        conditional={Object.assign({}, {hasPartnerIndustry}, {hasPartnerSector}, {hasPartnerSubSector})}
        columns={4} />
    </div>
  );
}
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
StrategicPartnerDetailSearch = reduxForm({
  form: 'StrategicPartnerDetailSearch'// ,  // a unique identifier for this form
})(StrategicPartnerDetailSearch);


// Decorate with connect to read form values
const selector = formValueSelector('StrategicPartnerDetailSearch'); // <-- same as form name
StrategicPartnerDetailSearch = connect(
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
)(StrategicPartnerDetailSearch);


export default StrategicPartnerDetailSearch;
