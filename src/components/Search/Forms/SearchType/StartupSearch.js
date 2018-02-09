import React from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import SearchModel from '../../../util/FrontendModel';
import {connect} from 'react-redux';

class StartupSearch extends React.Component {
render() {
  const {searchDetails, userLanguage} = this.props;
  const startupSearchFields = searchDetails.startupSearch.fields;
  return (
    <div className="no-gutter detailed-search-fields specific-partner-search">
      <SearchModel
        sectionName={startupSearchFields}
        profileDetails={startupSearchFields}
        userLanguage={userLanguage}
        columns={4} />
    </div>
  );
}
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
StartupSearch = reduxForm({
  form: 'StartupSearch'// a unique identifier for this form
})(StartupSearch);


StartupSearch = connect(
  state => ({
  })
)(StartupSearch);


export default StartupSearch;
