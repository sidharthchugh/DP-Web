import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {formValueSelector} from 'redux-form';
import {saveSearch, toggleLoaded, fetchSearches, fetchSearchSignup} from '../../../actions/searches';
import {addNotification} from '../../../actions/notification';
import strings from '../../../components/util/language';
import {reduxForm} from 'redux-form';
import {ENV} from '../../../../server/config/appConfig';
import { Grid, Button } from 'semantic-ui-react';

// Search fragments
import ProductDetailSearch from './SearchType/ProductDetailSearch';
import PartnerDetailSearch from './SearchType/PartnerDetailSearch';
import ProjectDetailSearch from './SearchType/ProjectDetailSearch';
import ProductSearch from './SearchType/ProductSearch';
import StartupSearch from './SearchType/StartupSearch';
import PartnerSearch from './SearchType/PartnerSearch';

export class SearchBoxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setSearchOpts = this.setSearchOpts.bind(this);
    this.onSaveSearch = this.onSaveSearch.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.matchLoaded = this.matchLoaded.bind(this);
  }

  onCancel() {
    this.boxTop.scrollIntoView();
    this.props.resetBox();
  }

  matchLoaded() {
    const {emailId} = this.props;
    if (emailId.includes('digitalpartners.io') || emailId.includes('tractionb2b.com') || ENV === 'development') {
      return 'false';
    }
      return 'true';
  }

  onSaveSearch() {
    const {activeSearchType, searchDetails, savedSearches, toggleLoaded, searchForm} = this.props;
    const searchTypes = searchDetails.searchTypes.typeValues;
    if (!searchForm.values) {
      this.props.addNotification('Please select a search scenario', 'warning', 'tc');
    }
    // Only begin processing values if a search type is actually active.
    if (activeSearchType) {
      console.info('activeSearchType onSave: ', activeSearchType);
      const searchTypeDef = this.getSearchTypeDefinition(activeSearchType, searchTypes, searchDetails);
      const formValues = this.getFormValues(activeSearchType, searchTypes);
      if (formValues && formValues.err) return null;
      const submittedSearch = {
        [searchTypeDef.meta.name]: {
          meta: {
            name: searchTypeDef.meta.name,
            type: activeSearchType,
            createdAt: Date.now(),
            matchLoaded: this.matchLoaded()
          },
          fields: {
            ...formValues
          }
        }
      };

        toggleLoaded();
        // console.log('\n\n\n\n');
        // console.log('SUBMITTED SEARCH');
        // console.log(require('util').inspect(submittedSearch, { depth: null }));
        // console.log('\n\n\n\n');
        if (this.props.searchId) {
             this.props.saveSearch({submittedSearch, searchMatchId: this.props.searchId})
          .then((response) => {
            if (response.payload.status === 200) {
            this.props.addNotification(strings.searchNotify, 'success', 'tc');
            this.props.fetchSearchSignup({searchId: this.props.searchId});
        }
       });
      } else {
          this.props.saveSearch({submittedSearch})
          .then((response) => {
            if (response.payload.status === 200) {
            this.props.addNotification(strings.searchNotify, 'success', 'tc');
          this.props.fetchSearches();
        }
       });
      }
        this.props.resetBox();
    }
  }

  /**
   * setSearchOpts - Checks the passed `searchType`
   * prop and returns the matching SearchType fragment.
   *
   * @param  {Object} props this.props
   * @return {Component}    SearchType fragment component
   */
  setSearchOpts(props) {
    const {activeSearchType, searchDetails, chooseEditType, savedSearches, userLanguage} = props;
    const searchTypes = searchDetails.searchTypes.typeValues;
    const productSearch = savedSearches.productSearch.filter((product) => {
      return product.meta.searchStatus === 'searchSaved';
    });
    const productDetailSearch = savedSearches.productDetailSearch.filter((productDetail) => {
      return productDetail.meta.searchStatus === 'searchSaved';
    });
    const partnerSearch = savedSearches.partnerSearch.filter((partner) => {
      return partner.meta.searchStatus === 'searchSaved';
    });
    const partnerDetailSearch = savedSearches.partnerDetailSearch.filter((partnerDetail) => {
      return partnerDetail.meta.searchStatus === 'searchSaved';
    });
    const projectDetailSearch = savedSearches.projectDetailSearch.filter((projectDetail) => {
      return projectDetail.meta.searchStatus === 'searchSaved';
    });
    const startupSearch = savedSearches.startupSearch.filter((Investor) => {
      return Investor.meta.searchStatus === 'searchSaved';
    });

    const searchlimit = productSearch.length + productDetailSearch.length + partnerSearch.length + partnerDetailSearch.length + projectDetailSearch.length + startupSearch.length > 10;
    switch (activeSearchType) {
      case '': // default state of `props.activeSearchType`
        return null;
       case searchlimit:
      return this.props.addNotification('You can only perform 10 Searches. To update your searches, please delete and perform it again.', 'warning', 'tc');
      case searchTypes.productDetail:
        return (
          !searchlimit && <ProductDetailSearch
            searchDetails={searchDetails}
            chooseEditType={chooseEditType}
            userLanguage={userLanguage}
          />);
      case searchTypes.partnerDetail:
        return (
          !searchlimit && <PartnerDetailSearch
            searchDetails={searchDetails}
            chooseEditType={chooseEditType}
            userLanguage={userLanguage}
          />);
      case searchTypes.projectDetail:
        return (
          !searchlimit && <ProjectDetailSearch
            searchDetails={searchDetails}
            chooseEditType={chooseEditType}
            userLanguage={userLanguage}
          />);
      case searchTypes.auto:
      case searchTypes.product:
      return (
        !searchlimit && <ProductSearch
          searchDetails={searchDetails}
          chooseEditType={chooseEditType}
          userLanguage={userLanguage}
        />);
      case searchTypes.partner:
      return (
        !searchlimit && <PartnerSearch
          searchDetails={searchDetails}
          chooseEditType={chooseEditType}
          userLanguage={userLanguage}
        />);
        case searchTypes.startup:
        return (
          !searchlimit && <StartupSearch
            searchDetails={searchDetails}
            chooseEditType={chooseEditType}
            userLanguage={userLanguage}
          />);
      default: // unexpected value -> throw error
        return console.error(`Error @ SearchBox.getSearchOpts: '${activeSearchType}' did not match any search types!`);
    }
  }


  /**
   * getFormValues - Takes the `activeSearchType` and a `searchTypes` obj
   * and returns the appropriate form values.
   *
   * @param  {String} activeSearchType description
   * @param  {Object} searchTypes      description
   * @return {Object}                  description
   */
   getFormValues(activeSearchType, searchTypes) {

   const {productDetailSearchVals, partnerDetailSearchVals, projectDetailSearchVals, productSearchVals, partnerSearchVals, startupSearchVals} = this.props;
   switch (activeSearchType) {
     case '': // default state of `props.activeSearchType`
       return null;
     case searchTypes.productDetail:
       if (!productDetailSearchVals || !productDetailSearchVals.productDetailSearchName) {
         this.props.addNotification('Please add a name for your new search.', 'warning', 'tc');
         return {err: 'invalid'};
       } else if (!productDetailSearchVals || Object.keys(productDetailSearchVals).length < 2) {
         this.props.addNotification('You must fill in at least one Search Field.', 'warning', 'tc');
         return {err: 'invalid'};
       }
       return productDetailSearchVals;

     case searchTypes.partnerDetail:
       if (!partnerDetailSearchVals || !partnerDetailSearchVals.partnerDetailSearchName) {
         this.props.addNotification('Please add a name for your new search.', 'warning', 'tc');
         return {err: 'invalid'};
       } else if (!partnerDetailSearchVals || Object.keys(partnerDetailSearchVals).length < 2) {
         this.props.addNotification('You must fill in at least one Search Field.', 'warning', 'tc');
         return {err: 'invalid'};
       }
       return partnerDetailSearchVals;

       case searchTypes.projectDetail:
         if (!projectDetailSearchVals || !projectDetailSearchVals.projectDetailSearchName) {
           this.props.addNotification('Please add a name for your new search.', 'warning', 'tc');
           return {err: 'invalid'};
         } else if (!projectDetailSearchVals || Object.keys(projectDetailSearchVals).length < 2) {
         this.props.addNotification('You must fill in at least one Search Field.', 'warning', 'tc');
         return {err: 'invalid'};
       }
      return projectDetailSearchVals;
     case searchTypes.product:
       if (!productSearchVals || !productSearchVals.productSearchName) {
         this.props.addNotification('Please add a name for your new search.', 'warning', 'tc');
         return {err: 'invalid'};
       } else if (!productSearchVals || Object.keys(productSearchVals).length < 2) {
         this.props.addNotification('You must fill in at least one Search Field.', 'warning', 'tc');
         return {err: 'invalid'};
       }
         return productSearchVals;
       case searchTypes.partner:
         if (!partnerSearchVals || !partnerSearchVals.partnerSearchName) {
           this.props.addNotification('Please add a name for your new search.', 'warning', 'tc');
           return {err: 'invalid'};
         } else if (!partnerSearchVals || Object.keys(partnerSearchVals).length < 2) {
         this.props.addNotification('You must fill in at least one Search Field.', 'warning', 'tc');
         return {err: 'invalid'};
       }
       return partnerSearchVals;
       case searchTypes.startup:
         if (!startupSearchVals || !startupSearchVals.startupSearchName) {
           this.props.addNotification('Please add a name for your new search.', 'warning', 'tc');
           return {err: 'invalid'};
         } else if (!startupSearchVals || Object.keys(startupSearchVals).length < 2) {
         this.props.addNotification('You must fill in at least one Search Field.', 'warning', 'tc');
         return {err: 'invalid'};
       }
       return startupSearchVals;
     case searchTypes.auto:
       return null;
     default:
       console.error(`Error @ SearchBox.onSaveSearch(): '${activeSearchType}' did not match any search types!`);
       return null;
   }
 }

  /**
   * getSearchTypeDefinition - Returns the matching search type definition
   * for the passed `activeSearchType`.
   *
   * @param  {String} activeSearchType
   * @param  {Object} searchTypes
   * @param  {Object} searchDetails
   * @return {Object}
   */
  getSearchTypeDefinition(activeSearchType, searchTypes, searchDetails) {
    switch (activeSearchType) {
      case searchTypes.productDetail:
        return searchDetails.productDetailSearch;
      case searchTypes.partnerDetail:
        return searchDetails.partnerDetailSearch;
      case searchTypes.projectDetail:
        return searchDetails.projectDetailSearch;
      case searchTypes.product:
        return searchDetails.productSearch;
      case searchTypes.partner:
        return searchDetails.partnerSearch;
      case searchTypes.startup:
          return searchDetails.startupSearch;
      default: // unexpected value -> throw error
        return console.error(`Error activeSearchType '${activeSearchType}' did not match any search types!`);
    }
  }

  /**
   * checkSingletonViolation - Checks whether an auto-type search of type
   * `activeSearchType` is already present for the user -> returns `true` for a
   * singleton violation, `false` otherwise.
   *
   * @param  {String} activeSearchType
   * @param  {Object} searchTypes
   * @param  {Object} savedSearches
   * @return {boolean}
   */
  checkSingletonViolation(activeSearchType, searchTypes, savedSearches) {
    const productSearch = savedSearches.productSearch.filter((product) => {
      return product.meta.searchStatus === 'searchSaved';
    });
    const partnerSearch = savedSearches.partnerSearch.filter((partner) => {
      return partner.meta.searchStatus === 'searchSaved';
    });
    switch (activeSearchType) {
      case searchTypes.product:
        return productSearch.length > 0;
      case searchTypes.partner:
        return partnerSearch.length > 0;
      case searchTypes.productDetail:
      case searchTypes.partnerDetail:
      case searchTypes.projectDetail:
      case searchTypes.startup:
        // catch all non-auto searches -> return false
        return false;
      default:
        console.error(`Error @ SearchBox.checkSingletonViolation: ${activeSearchType} did not match a checkable value!`);
        return true;
    }
  }

  render() {
    const {searchDetails, chooseEditType, userLanguage} = this.props;
    return (
      <Grid>
        <Grid.Column computer={12} tablet={12} className="search-card base-search">
          <form className="search-form" ref={boxTop => this.boxTop = boxTop}>
            <div id={'new-search'}>
              <h3>{strings.searchPreferences}</h3>
              <Grid>
                <Grid.Column computer={12}>
                  <div className="base-search-wrapper">
                    <div className="search-label">{searchDetails.searchTypes.englishLabel}</div>
                    <Grid>
                      <Grid.Column mobile={12} computer={8} className="container-search-type-dropdown">
                        {chooseEditType(searchDetails.searchTypes, userLanguage)}
                      </Grid.Column >
                      <Grid.Column mobile={12} computer={4} className="text-right container-search-btns no-gutter" textAlign="right">
                        <Button
                          id="button-cancel-search"
                          type="button"
                          className="button-normal hollow cancel-search"
                          onClick={this.onCancel}
                        >{strings.cancel}</Button>
                        <Button
                          id="button-save-search"
                          type="button"
                          className="button-normal save-search"
                          onClick={this.onSaveSearch}
                        >{strings.searchButton}</Button>
                      </Grid.Column>
                    </Grid>
                  </div>
                </Grid.Column>
              </Grid>
              {this.setSearchOpts(this.props)}
            </div>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}

SearchBoxComponent.propTypes = {
  activeSearchType: PropTypes.string.isRequired,
  searchDetails: PropTypes.object.isRequired,
  resetBox: PropTypes.func.isRequired,
  toggleLoaded: PropTypes.func.isRequired
};

// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
  const searchTypeSelector = formValueSelector('SearchForm');
  // Feed the form vals back into SearchBox as props as they update so we can dispatch the final vals.
  const productDetailSearchVals = state.form.ProductServiceSearch && state.form.ProductServiceSearch.values;
  const partnerDetailSearchVals = state.form.StrategicPartnerDetailSearch && state.form.StrategicPartnerDetailSearch.values;
  const projectDetailSearchVals = state.form.ProjectDetailSearch && state.form.ProjectDetailSearch.values;
  const productSearchVals = state.form.ProductSearch && state.form.ProductSearch.values;
  const partnerSearchVals = state.form.StrategicPartnerSearch && state.form.StrategicPartnerSearch.values;
  const startupSearchVals = state.form.StartupSearch && state.form.StartupSearch.values;
  return {
    // Get the search type selected
    // default state is empty string until selector is available
    activeSearchType: searchTypeSelector(state, 'searchTypeDropdown') || '',
    productDetailSearchVals,
    partnerDetailSearchVals,
    projectDetailSearchVals,
    productSearchVals,
    partnerSearchVals,
    startupSearchVals,
    emailId: state.user.userObj.email,
    userLanguage: state.user.userObj.language,
    savedSearches: state.search.savedSearches,
    searchForm: state.form.SearchForm
  };
};


const SearchBox = connect(mapStateToProps, {saveSearch, fetchSearchSignup, fetchSearches, toggleLoaded, addNotification})(SearchBoxComponent);
export default SearchBox;
