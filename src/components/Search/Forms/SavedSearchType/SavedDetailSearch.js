import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {v4} from 'node-uuid';
import SearchModel from '../../../util/FrontendModel';
import {ProductDetailSearch} from '../../Sections/ProductDetailSearch';
import {PartnerDetailSearch} from '../../Sections/PartnerDetailSearch';
import {ProjectDetailSearch} from '../../Sections/ProjectDetailSearch';
import {ProductSearch} from '../../Sections/ProductSearch';
import {PartnerSearch} from '../../Sections/PartnerSearch';
import {StartupSearch} from '../../Sections/StartupSearch';
import strings from '../../../util/language';
import Scrollchor from 'react-scrollchor';
import {Grid} from 'semantic-ui-react';



export default class SavedDetailSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }


  /**
   * onDelete - Confirms deletion of this saved search with the user, dispatches
   * `deleteSearch` action if confirmed, does nothing otherwise.
   */
  onDelete() {
    const {deleteSearch, savedSearch} = this.props;
    const confirmedDeletion = confirm(strings.searchConfirmDelete);
    if (confirmedDeletion) {
      const thisSearch = {
        _id: savedSearch._id,
        name: savedSearch.meta.name,
        searchMatchId: this.props.searchId
      };
    deleteSearch(thisSearch)
    .then((response) => {
       if (response.payload.status === 200) {
          this.props.addNotification('The selected saved search has been deleted.', 'success', 'tc');
          this.props.fetchSearches().then(action =>
             this.props.fetchMatches(action.payload.data)
           );
        }
       });
      }
  }


  /**
   * setTitle - Checks the `searchType` prop and returns the appropriate
   * title & search type description for this saved search.
   *
   * @return {JSX}
   */
  setTitle() {
    const {searchType, savedSearch} = this.props;
    switch (searchType) {
      case 'productSearch':
        return (
          <span>Products/Services - {savedSearch.fields.productSearchName.typeValues}</span>// taking into account the CP
        );
      case 'productDetailSearch':
        return (
          <span>Products/Services - {savedSearch.fields.productDetailSearchName.typeValues}</span>
        );
      case 'partnerDetailSearch':
        return (
          <span>Partners - {savedSearch.fields.partnerDetailSearchName.typeValues}</span>// taking into account CP
          // <p> This search is taking into account your company profile. </p>
        );
      case 'partnerSearch':
        return (
          <span>Partners - {savedSearch.fields.partnerSearchName.typeValues}</span>
        );
      case 'projectDetailSearch':
        return (
          <span>Project - {savedSearch.fields.projectDetailSearchName.typeValues}</span>
        );
      case 'startupSearch':
          return (
            <span>Startup - {savedSearch.fields.startupSearchName.typeValues}</span>
        );
      default:
        console.error(`Error @ SavedDetailSearch.setTitle: Passed searchType prop "${searchType}" does not have a specified title!`);
        return null;
    }
  }

setSidebarTitle() {
    const {searchType, savedSearch} = this.props;
    switch (searchType) {
      case 'productSearch':
        return (
          <div className="sidebar-header2 search-margin">Products/Services - {savedSearch.fields.productSearchName.typeValues}</div>
        );
      case 'productDetailSearch':
        return (
          <div className="sidebar-header2 search-margin">Products/Services - {savedSearch.fields.productDetailSearchName.typeValues}</div>
        );
      case 'partnerDetailSearch':
        return (
          <div className="sidebar-header2 search-margin">Partners - {savedSearch.fields.partnerDetailSearchName.typeValues}</div>
        );
      case 'partnerSearch':
        return (
          <div className="sidebar-header2 search-margin">Partners - {savedSearch.fields.partnerSearchName.typeValues}</div>
        );
      case 'projectDetailSearch':
        return (
          <div className="sidebar-header2 search-margin">Project - {savedSearch.fields.projectDetailSearchName.typeValues}</div>
        );
      case 'startupSearch':
          return (
            <div className="sidebar-header2 search-margin">Startup - {savedSearch.fields.startupSearchName.typeValues}</div>
        );
      default:
        console.error(`Error @ SavedDetailSearch.setTitle: Passed searchType prop "${searchType}" does not have a specified title!`);
        return null;
    }
  }

  render() {
    const {savedSearch, userLanguage, searchType, indexValue} = this.props;
    const savedSearchFields = savedSearch.fields;
    let date = new Date(savedSearch.meta.createdAt);
    date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    const productSection = ProductSearch();
    const productDetailSection = ProductDetailSearch();
    const partnerSection = PartnerSearch();
    const partnerDetailSection = PartnerDetailSearch();
    const projectDetailSection = ProjectDetailSearch();
    const startupSection = StartupSearch();

    const searchTypeValue = (value) => {
    if (value === 'productDetailSearch') {
        return productDetailSection.productDetailSearch.fields;
    } else if (value === 'partnerDetailSearch') {
        return partnerDetailSection.partnerDetailSearch.fields;
    } else if (value === 'projectDetailSearch') {
        return projectDetailSection.projectDetailSearch.fields;
    } else if (value === 'productSearch') {
        return productSection.productSearch.fields;
    } else if (value === 'partnerSearch') {
        return partnerSection.partnerSearch.fields;
    } else if (value === 'startupSearch') {
        return startupSection.startupSearch.fields;
    }
  };

  const sidebarClassname = searchType + indexValue;
    return (
      <Grid>
        <Grid.Column computer={12}>
          <div className="card-content">
            <form>
              <Grid>
                <Grid.Column computer={12} className={this.props.sidebar === 'true' ? 'sidebar-grid' : ''}>
                  {this.props.sidebarP !== 'true' && this.props.sidebar !== 'true' && <div className="saved-search-card">
                    <div className="search-actions">
                      <a className="delete" onClick={this.onDelete}>
                        <FontAwesome name="minus-circle" /> {strings.searchDelete}
                      </a>
                      <a className="edit" style={{display: 'none'}}>
                        <FontAwesome name="dot-circle-o" /> Edit
                      </a>
                      <span className="date">{date}</span>
                    </div>

                    <div className="search-details" id={sidebarClassname}>
                      {this.setTitle()}
                    </div>

                    <div className="search-details-display">
                      <SearchModel
                      specialSection
                      sectionName={searchTypeValue(searchType)}
                      profileDetails={savedSearchFields}
                      userLanguage={userLanguage}
                      columns={4}
                      />
                      {this.props.searchArray !== 1 && <div className="searchSection" />}
                    </div>
                  </div>}
                  {this.props.sidebarP !== 'true' && this.props.sidebar === 'true' &&
                  <div className="saved-card">
                    <div className="details-search">
                      <ul>
                        <Scrollchor to={sidebarClassname} animate={{offset: -58, duration: 500}}>
                          <li className="margin-header2 lid marg-search marginR"> {this.setSidebarTitle()}</li>
                        </Scrollchor>
                      </ul>
                    </div>
                  </div>
                  }
                  {this.props.sidebarP === 'true' && this.props.sidebar !== 'true' &&
                  <div className="saved-card">
                    <div className="search-details details-search">
                      <Scrollchor to={sidebarClassname} animate={{offset: -58, duration: 500}}>
                        <div className="marginR">
                          {this.setTitle()}
                        </div>
                      </Scrollchor>
                    </div>
                  </div>
                  }
                </Grid.Column>
              </Grid>
            </form>
          </div>
        </Grid.Column>
      </Grid>
    );
  }

}
SavedDetailSearch.propTypes = {
  searchType: PropTypes.string.isRequired,
  savedSearch: PropTypes.object.isRequired,
  deleteSearch: PropTypes.func.isRequired
};

SavedDetailSearch.defaultProps = {
  date: 'DD.MM.YYYY',
  name: '[PLACEHOLDER SEARCH NAME]'
};
