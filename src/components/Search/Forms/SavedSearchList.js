import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {v4} from 'node-uuid';
import Spinner from 'react-spinkit';
import SavedDetailSearch from './SavedSearchType/SavedDetailSearch';
import {deleteSearch, fetchSearches, fetchSearchSignup} from '../../../actions/searches';
import {fetchMatches} from '../../../actions/matches';
import {addNotification} from '../../../actions/notification';
import strings from '../../util/language';
import {Grid} from 'semantic-ui-react';


class SavedSearchListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderSavedProductDetailSearches = this.renderSavedProductDetailSearches.bind(this);
    this.renderSavedPartnerDetailSearches = this.renderSavedPartnerDetailSearches.bind(this);
    this.renderSavedProjectDetailSearches = this.renderSavedProjectDetailSearches.bind(this);
    this.renderSavedStartupSearches = this.renderSavedStartupSearches.bind(this);
  }

  componentDidMount() {
    const {searchId} = this.props;
    // Manually trigger a fetch once component has mounted -> avoids empty render bug
    // (https://tree.taiga.io/project/davidhamel-tractionb2b/issue/221)
    if (searchId) {
      this.props.fetchSearchSignup({searchId});
    } else {
      this.props.fetchSearches();
    }
  }

  renderSavedProductDetailSearches(productDetailSearches, searchArray) {
    // If the array is empty we render nothing
    if (productDetailSearches.length === 0) return null;
    const {userLanguage, fetchSearches, fetchMatches, addNotification} = this.props;
    return productDetailSearches.map((search, index) => {
      return (
        search.meta.searchStatus === 'searchSaved' && <SavedDetailSearch
          key={v4()}
          searchType={'productDetailSearch'}
          savedSearch={search}
          indexValue={index}
          searchArray={searchArray}
          fetchSearches={fetchSearches}
          fetchMatches={fetchMatches}
          addNotification={addNotification}
          sidebar={this.props.sidebar}
          deleteSearch={this.props.deleteSearch}
          userLanguage={userLanguage}
          searchId={this.props.searchId}
        />);
    });
  }

    renderSavedStartupSearches(startupSearches, searchArray) {
      // If the array is empty we render nothing
      if (startupSearches.length === 0) return null;
      const {userLanguage, fetchSearches, fetchMatches, addNotification} = this.props;
      return startupSearches.map((search, index) => {
        return (
          search.meta.searchStatus === 'searchSaved' && <SavedDetailSearch
            key={v4()}
            searchType={'startupSearch'}
            savedSearch={search}
            indexValue={index}
            searchArray={searchArray}
            fetchSearches={fetchSearches}
            fetchMatches={fetchMatches}
            sidebar={this.props.sidebar}
            addNotification={addNotification}
            deleteSearch={this.props.deleteSearch}
            userLanguage={userLanguage}
            searchId={this.props.searchId}
          />
          );
      });
    }


  renderSavedPartnerDetailSearches(partnerDetailSearches, searchArray) {
    // If the array is empty we render nothing
    const {userLanguage, fetchSearches, fetchMatches, addNotification} = this.props;
    if (partnerDetailSearches.length === 0) return null;
    return partnerDetailSearches.map((search, index) => {
      return (
        search.meta.searchStatus === 'searchSaved' && <SavedDetailSearch
          key={v4()}
          searchType={'partnerDetailSearch'}
          savedSearch={search}
          indexValue={index}
          searchArray={searchArray}
          fetchSearches={fetchSearches}
          fetchMatches={fetchMatches}
          sidebar={this.props.sidebar}
          addNotification={addNotification}
          deleteSearch={this.props.deleteSearch}
          userLanguage={userLanguage}
          searchId={this.props.searchId}
        />);
    });
  }

  renderSavedProjectDetailSearches(projectDetailSearches, searchArray) {
    // If the array is empty we render nothing
    const {userLanguage, fetchSearches, fetchMatches, addNotification} = this.props;
    if (projectDetailSearches.length === 0) return null;
    return projectDetailSearches.map((search, index) => {
      return (
        search.meta.searchStatus === 'searchSaved' && <SavedDetailSearch
          key={v4()}
          searchType={'projectDetailSearch'}
          savedSearch={search}
          indexValue={index}
          searchArray={searchArray}
          fetchSearches={fetchSearches}
          fetchMatches={fetchMatches}
          sidebar={this.props.sidebar}
          addNotification={addNotification}
          deleteSearch={this.props.deleteSearch}
          userLanguage={userLanguage}
          searchId={this.props.searchId}
        />);
    });
  }


  renderSavedProductSearches(productSearches, searchArray) {
    // If the array is empty we render nothing
    const {userLanguage, fetchSearches, fetchMatches, addNotification} = this.props;
    if (productSearches.length === 0) return null;
    return productSearches.map((search, index) => {
      return (
        search.meta.searchStatus === 'searchSaved' && <SavedDetailSearch
          key={v4()}
          searchType={'productSearch'}
          savedSearch={search}
          indexValue={index}
          fetchSearches={fetchSearches}
          fetchMatches={fetchMatches}
          searchArray={searchArray}
          addNotification={addNotification}
          sidebar={this.props.sidebar}
          deleteSearch={this.props.deleteSearch}
          userLanguage={userLanguage}
          searchId={this.props.searchId}
        />);
    });
  }

  renderSavedPartnerSearches(partnerSearches, searchArray) {
    // If the array is empty we render nothing
   const {userLanguage, fetchSearches, fetchMatches, addNotification} = this.props;
    if (partnerSearches.length === 0) return null;
    return partnerSearches.map((search, index) => {
      return (
      search.meta.searchStatus === 'searchSaved' && <SavedDetailSearch
          key={v4()}
          searchType={'partnerSearch'}
          savedSearch={search}
          indexValue={index}
          fetchSearches={fetchSearches}
          fetchMatches={fetchMatches}
          addNotification={addNotification}
          searchArray={searchArray}
          userLanguage={userLanguage}
          sidebar={this.props.sidebar}
          searchId={this.props.searchId}
          deleteSearch={this.props.deleteSearch}
        />);
    });
  }


  render() {
    const {savedSearches, loaded, userLanguage} = this.props;
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
    const startupSearch = savedSearches.startupSearch.filter((startup) => {
      return startup.meta.searchStatus === 'searchSaved';
    });

    return (
      <Grid>
        <Grid.Column computer={12} className={this.props.sidebar === 'true' ? 'sidebar-search' : 'search-card saved-search'}>
          {this.props.sidebar !== 'true' && this.props.sidebarP !== 'true' && <div className="card-header">
            <div className="no-gutter" id={'saved-search'}>
              <h3>{userLanguage === 'German' ? 'Gespeicherte Suchanfragen' : 'Saved Searches'}</h3>
              {(productSearch.length + productDetailSearch.length + partnerSearch.length + partnerDetailSearch.length + projectDetailSearch.length + startupSearch.length) < 1 &&
              <p className="no-search">
                <br />
                {userLanguage === 'German' ? 'Sie haben noch keine Suchanfragen erstellt.' : 'No Saved Searches Yet'}
                <br />
                <br />
              </p>}
              {loaded && <div>
                <Spinner spinnerName="three-bounce" />
              </div>}
            </div>
          </div>}

          {this.renderSavedProductDetailSearches(savedSearches.productDetailSearch, productSearch.length + productDetailSearch.length + partnerDetailSearch.length + partnerSearch.length + projectDetailSearch.length + startupSearch.length)}
          {this.renderSavedPartnerDetailSearches(savedSearches.partnerDetailSearch, productSearch.length + productDetailSearch.length + partnerDetailSearch.length + partnerSearch.length + projectDetailSearch.length + startupSearch.length)}

          {this.renderSavedProductSearches(savedSearches.productSearch, productSearch.length + productDetailSearch.length + partnerDetailSearch.length + partnerSearch.length + projectDetailSearch.length + startupSearch.length)}
          {this.renderSavedPartnerSearches(savedSearches.partnerSearch, productSearch.length + productDetailSearch.length + partnerDetailSearch.length + partnerSearch.length + projectDetailSearch.length + startupSearch.length)}

          {this.renderSavedProjectDetailSearches(savedSearches.projectDetailSearch, productSearch.length + productDetailSearch.length + partnerDetailSearch.length + partnerSearch.length + projectDetailSearch.length + startupSearch.length)}
          {this.renderSavedStartupSearches(savedSearches.startupSearch, productSearch.length + productDetailSearch.length + partnerDetailSearch.length + partnerSearch.length + projectDetailSearch.length + startupSearch.length)}
        </Grid.Column>
      </Grid>
    );
  }
}
SavedSearchListComponent.propTypes = {
  searchDetails: PropTypes.object.isRequired,
  unsyncedSave: PropTypes.bool.isRequired, // from store
  loaded: PropTypes.bool.isRequired, // from store
  unsyncedDeletion: PropTypes.bool.isRequired, // from store
  savedSearches: PropTypes.object.isRequired // from store
};


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
  return {
    unsyncedSave: state.search.unsyncedSave,
    unsyncedDeletion: state.search.unsyncedDeletion,
    savedSearches: state.search.savedSearches,
    loaded: state.search.loaded
  };
};

const SavedSearchList = connect(mapStateToProps, {fetchSearchSignup, deleteSearch, fetchMatches, fetchSearches, addNotification})(SavedSearchListComponent);
export default SavedSearchList;
