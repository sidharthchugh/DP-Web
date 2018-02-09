import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchMatches, toggleMatchesLoaded} from '../actions/matches';
import {fetchSearches} from '../actions/searches';
import { addNotification } from 'actions/notification';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import MatchCard from '../components/Matches/MatchCard';
import { Grid, Button, Container } from 'semantic-ui-react';
import SavedMatchesCard from '../components/Matches/SavedMatchesCard';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import '../styles/components/matches.css';
import strings from '../components/util/language';
import {ENV} from '../../server/config/appConfig';
import Spinner from 'react-spinkit';
import Scrollchor from 'react-scrollchor';
import {StickyContainer} from 'react-sticky';

class MatchesContainer extends React.Component {

  componentWillMount() {
      this.props.fetchSearches().then(action =>
        action.payload && this.props.fetchMatches(action.payload.data)
      );
  }

  renderMatches(sidebar) {
    const {matches, userLanguage, savedSearches, emailId} = this.props;
    const productSearch = savedSearches.productSearch.filter((product) => {
      return product.meta.searchStatus === 'searchSaved';
    });

    const productSearchLoad = savedSearches.productSearch.filter((product) => {
      return product.meta.matchLoaded === 'false';
    });
    const productSearchLoadUser = savedSearches.productSearch.filter((product) => {
     return product.meta.display === 'none';
   });
    const productDetailSearch = savedSearches.productDetailSearch.filter((productDetail) => {
      return productDetail.meta.searchStatus === 'searchSaved';
    });
    const productDetailSearchLoad = savedSearches.productDetailSearch.filter((productDetail) => {
      return productDetail.meta.matchLoaded === 'false';
    });
    const productDetailSearchLoadUser = savedSearches.productDetailSearch.filter((productDetail) => {
     return productDetail.meta.display === 'none';
   });
    const projectDetailSearch = savedSearches.projectDetailSearch.filter((projectDetail) => {
      return projectDetail.meta.searchStatus === 'searchSaved';
    });
    const projectDetailSearchLoad = savedSearches.projectDetailSearch.filter((projectDetail) => {
      return projectDetail.meta.matchLoaded === 'false';
    });
    const projectDetailSearchLoadUser = savedSearches.projectDetailSearch.filter((projectDetail) => {
       return projectDetail.meta.display === 'none';
   });
    const partnerSearch = savedSearches.partnerSearch.filter((partner) => {
      return partner.meta.searchStatus === 'searchSaved';
    });
    const partnerSearchLoad = savedSearches.partnerSearch.filter((partner) => {
      return partner.meta.matchLoaded === 'false';
    });
    const partnerSearchLoadUser = savedSearches.partnerSearch.filter((partner) => {
      return partner.meta.display === 'none';
    });
    const partnerDetailSearch = savedSearches.partnerDetailSearch.filter((partnerDetail) => {
      return partnerDetail.meta.searchStatus === 'searchSaved';
    });
    const partnerDetailSearchLoad = savedSearches.partnerDetailSearch.filter((partnerDetail) => {
      return partnerDetail.meta.matchLoaded === 'false';
    });
    const partnerDetailSearchLoadUser = savedSearches.partnerDetailSearch.filter((partnerDetail) => {
     return partnerDetail.meta.display === 'none';
   });
    const startupSearchLoad = savedSearches.startupSearch.filter((Startup) => {
      return Startup.meta.matchLoaded === 'false';
    });
    const startupSearchLoadUser = savedSearches.startupSearch.filter((Startup) => {
      return Startup.meta.display === 'none';
    });
    const startupSearch = savedSearches.startupSearch.filter((startup) => {
      return startup.meta.searchStatus === 'searchSaved';
    });

    // Reload Page when Matches are Loaded
    const refreshMatch = () => setTimeout(() => {
        window.location.reload(1);
      }, 12000);
    return (
      <div>
        {!sidebar && (productSearchLoad.length || productDetailSearchLoad.length || partnerSearchLoad.length || partnerDetailSearchLoad.length || projectDetailSearchLoad.length || startupSearchLoad.length > 0) && refreshMatch() &&
        <Grid className="match-card--container card-generic match-noResultCard">
          <Grid.Row>
            <Grid.Column computer={12}>
              <div className="no-matchResult">
                <div><br />
                  <br />
                  <h4>{strings.matchProgress} </h4>
                  <Spinner spinnerName="three-bounce" />
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        }
        {!sidebar && !(productSearchLoad.length || productDetailSearchLoad.length || partnerSearchLoad.length || partnerDetailSearchLoad.length || projectDetailSearchLoad.length || startupSearchLoad.length > 0) && clearTimeout(refreshMatch) }
        {!sidebar && (productSearch.length + productDetailSearch.length + partnerSearch.length + partnerDetailSearch.length + projectDetailSearch.length + startupSearch.length) < 1 &&
        <Grid className="match-card--container card-generic match-noResultCard">
          <Grid.Row>
            <Grid.Column computer={12}>
              <div className="no-matchResult">
                <div><br />
                  <br />
                  <h4>{strings.matchNoSearch} </h4>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        }
        {!(productSearch.length + productDetailSearch.length + partnerSearch.length + partnerDetailSearch.length + projectDetailSearch.length + startupSearch.length) < 1 &&
            matches.length > 0 && matches.sort((a, b) => b.search.meta.createdAt - a.search.meta.createdAt) && matches.map((match, i) =>
              <div>
                {match.search.meta.searchStatus === 'searchSaved' &&
                <div>
                  <MatchCard key={'match-card-' + i} match={match} index={i} userLanguage={userLanguage} sidebar={sidebar} />
                </div>
                }
              </div>
            )
          }
      </div>
    );
  }

  renderSaveMatches(sidebar) {
    const {matches, userLanguage} = this.props;
    return matches.length > 0 && matches.sort((a, b) => b.search.meta.createdAt - a.search.meta.createdAt) && matches.map((match, i) => {
      return (
        <SavedMatchesCard
          key={'match-card-' + i}
          match={match}
          index={i}
          userLanguage={userLanguage} sidebar={sidebar} />
      );
    }
    );
  }

  render() {
    const {userLanguage} = this.props;
    return (
      <Grid className="common-background" >
        <Grid.Row>
          <Container fluid>
            <Grid container textAlign="right">
              <Grid.Column computer={12}>
                <ProfileHeader userLanguage={userLanguage} />
              </Grid.Column>
              <Grid.Column tablet={12} computer={9}>
                {this.renderMatches()}
                {this.renderSaveMatches()}
              </Grid.Column>
              <Grid.Column tablet={12} computer={3} textAlign="center">
                <div className="profile-page-right-sidebarnavMatch">
                  <Grid.Column computer={12} className={'card-generic mobile hidden tablet hidden nav'}>
                    <div id="match">
                       <h3 className="sidebar-headertitle">Matches</h3>
                       {this.renderMatches('sidebar')}
                       {this.renderSaveMatches('sidebar')}
                     </div>
                  </Grid.Column>
                </div>
                <div className="profile-page-right-sidebar">
                  <ProfilePageRightSidebar userLanguage={userLanguage} strings={strings} />
                </div>
              </Grid.Column>
            </Grid>
          </Container>
        </Grid.Row>
      </Grid>
    );
  }
}

MatchesContainer.propTypes = {
  savedSearches: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired
};

function mapStateToProps(state) {
 return {
   emailId: state.user.userObj.email,
   savedSearches: state.search.savedSearches,
   matches: state.matches.matches,
   userLanguage: state.user.userObj.language,
   matchLoadedSuccess: state.matches.matchLoadedSuccess
 };
}

const Matches = connect(
  mapStateToProps,
  {fetchSearches, fetchMatches, toggleMatchesLoaded, addNotification}
)(MatchesContainer);

export default Matches;
