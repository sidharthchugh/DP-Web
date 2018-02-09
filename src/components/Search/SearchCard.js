import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/components/search.css';
import '../../styles/components/profilecard.css';
import {SearchTypesFn} from './Sections/SearchTypes';
import {cmsDetail} from 'actions/cms';
import {ProductDetailSearch} from './Sections/ProductDetailSearch';
import {PartnerDetailSearch} from './Sections/PartnerDetailSearch';
import {ProjectDetailSearch} from './Sections/ProjectDetailSearch';
import {ProductSearch} from './Sections/ProductSearch';
import {PartnerSearch} from './Sections/PartnerSearch';
import {StartupSearch} from './Sections/StartupSearch';
import SearchPreferences from './Sections/SearchPreferences';
import {reduxForm} from 'redux-form';
import SearchBox from './Forms/SearchBox';
import SavedSearchList from './Forms/SavedSearchList';
// DEACTIVATED for now ---->  import SearchPreferencesForm from './Forms/SearchPreferences';
import {chooseEditType} from '../util/FrontendFields';
import {Grid} from 'semantic-ui-react';


export class SearchCard extends Component {

  constructor(props) {
    super(props);
      this.state = { registered: false};
      this.mergeSearchFields = this.mergeSearchFields.bind(this);
  }

    componentWillMount() {
    const {cmsData} = this.props;
      if (!cmsData.cmsData) {
        this.props.cmsDetail();
      }
  }

  mergeSearchFields() {
    const {userRole, cmsData} = this.props;
    return {
      ...SearchTypesFn(userRole),
      ...ProductDetailSearch(cmsData),
      ...PartnerDetailSearch(cmsData),
      ...ProjectDetailSearch(cmsData),
      ...ProductSearch(cmsData),
      ...PartnerSearch(cmsData),
      ...StartupSearch(cmsData),
      ...SearchPreferences
    };
  }

  render() {
    const {userLanguage, cmsData, searchId} = this.props;
    const searchDetails = this.mergeSearchFields();
    return (
      <Grid>
        <Grid.Column computer={12}>
          <SearchBox
            searchDetails={searchDetails}
            chooseEditType={chooseEditType}
            resetBox={this.props.reset}
            cmsData={cmsData}
            searchId={searchId}
            userLanguage={userLanguage}
          />
          <SavedSearchList
            searchDetails={searchDetails}
            chooseEditType={chooseEditType}
            userLanguage={userLanguage}
            cmsData={cmsData}
            searchId={searchId}
          />
          {/* DEACTIVATED additional search preferences
          <SearchPreferencesForm
            userLanguage={userLanguage}
            searchDetails={searchDetails}
          /> */}
        </Grid.Column>
      </Grid>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
SearchCard = reduxForm({
  form: 'SearchForm'// ,  // a unique identifier for this form
})(SearchCard);

SearchCard = connect(
  state => ({
    initialValues: state.search.searches,
    cmsData: state.cms.cmsData
  }),
  {cmsDetail}
)(SearchCard);

export default SearchCard;
