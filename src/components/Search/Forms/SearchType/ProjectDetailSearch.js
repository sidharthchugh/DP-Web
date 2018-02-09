import React from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import SearchModel from '../../../util/FrontendModel';
import {connect} from 'react-redux';

class ProjectDetailSearch extends React.Component {
render() {
  const {searchDetails, userLanguage, hasProjectStartingDate, hasProjectCompletionDate, hasProjectApplication} = this.props;
  const projectDetailSearchFields = searchDetails.projectDetailSearch.fields;
  return (
    <div className="no-gutter detailed-search-fields specific-partner-search">
      <SearchModel
        sectionName={projectDetailSearchFields}
        profileDetails={projectDetailSearchFields}
        userLanguage={userLanguage}
        conditional={Object.assign({}, {hasProjectStartingDate}, {hasProjectCompletionDate}, {hasProjectApplication})}
        columns={4} />
    </div>
  );
}
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProjectDetailSearch = reduxForm({
  form: 'ProjectDetailSearch'// ,  // a unique identifier for this form
})(ProjectDetailSearch);


// Decorate with connect to read form values
const selector = formValueSelector('ProjectDetailSearch'); // <-- same as form name
ProjectDetailSearch = connect(
  (state) => {
    // can select values individually
    const hasProjectStartingDate = selector(state, 'projectStartingDate');
    const hasProjectCompletionDate = selector(state, 'projectCompletionDate');
    const hasProjectApplication = selector(state, 'projectApplication');

    return {
      hasProjectStartingDate,
      hasProjectCompletionDate,
      hasProjectApplication
    };
  }
)(ProjectDetailSearch);


export default ProjectDetailSearch;
