import React from 'react';
import PropTypes from 'prop-types';
import Match from './Fragments/Match';
import MatchSignup from './Fragments/MatchSignup';
import { connect } from 'react-redux';
import MatchCreateForm from './Forms/MatchCreateForm';
import CollapsibleCardWrapper from '../util/CollapsibleCardWrapper';
import {fetchMatches, matchRefresh, matchCreate} from '../../actions/matches';
import {fetchSearches, fetchSearchSignup} from '../../actions/searches';
import strings from 'components/util/language';
import {Grid, Button} from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';
import {ENV} from '../../../server/config/appConfig';

class MatchSignupCard extends React.Component {


  constructor(props) {
    super(props);
    this.refreshMatches = this.refreshMatches.bind(this);
    this.matchCreates = this.matchCreates.bind(this);
  }

matchReload() {
  const {search} = this.props.match;
  if (search.meta.matchLoaded === false) {
    window.location = '/matches';
  }
}


  refreshMatches(values) {
    const {matchRefresh, addNotification, fetchSearches, fetchSearchSignup, matchId} = this.props;
    if (matchId) values.matchId = matchId;
    matchRefresh(values)
    .then((response) => {
      if (response.payload.status === 200) {
        if (matchId) {
           this.props.fetchSearchSignup({searchId: matchId});
        } else {
          this.props.fetchSearches();
        }
        window.location.reload();
        addNotification('Matches Refreshed', 'success', 'tc');
      }
    });
  }


  matchCreates(values, matchId, searchId, searchType) {
    const {addNotification, matchCreate} = this.props;
   matchCreate({createElasticId: values.matchCreate, createSearchId: searchId, createMatchId: matchId, searchType})
    .then((response) => {
      if (response.payload.status === 200) {
        if (matchId) {
           this.props.fetchSearchSignup({searchId: matchId});
        } else {
          this.props.fetchSearches();
        }
        window.location.reload();
        addNotification('Matches Added', 'success', 'tc');
      } else {
        addNotification('No Profile Found', 'success', 'tc');
      }
    });
  }

render() {
  const {matchingProfiles, search} = this.props.match;
  const {savedSearches, matchId} = this.props;
  // Limit Matching Profiles upto 20
  const limitMatches = matchingProfiles.slice(0, 60);
  const matches = search.matches;

  const searchType = search.meta.name;

    const nonverifiedsortMatch = matches.sort((a, b) => {
        if (b.profileStatus > a.profileStatus || b.keywordMatchCount > a.keywordMatchCount) return 1;
        if (b.profileStatus < a.profileStatus || b.keywordMatchCount < a.keywordMatchCount) return -1;
        if (b.profileStatus > a.profileStatus || b.keywordMatchCount === a.keywordMatchCount) return -1;
        return 0;
    });
  // Sorting Function
  function sort(array, order) {
      // create a new array for storage
      const newArray = [];
      // loop through order to find a matching id
      for (let i = 0; i < order.length; i++) {
          for (let j = 0; j < array.length; j++) {
              // if we find a match, add it to the storage
              // remove the old item so we don't have to loop long nextime
              // and break since we don't need to find anything after a match
              if (array[j].elasticId === order[i].profileId) {
                  newArray.push(array[j]);
                  array.splice(j, 1);
                  break;
              }
          }
      }
      return newArray;
  }
  // Sorting Array on the basis of Ranking

 const sortednonfilterMatches = sort(limitMatches, nonverifiedsortMatch);


  // If it's a named search -> show the value, else show the name of searchType
  function searchName(language) {
    if (searchType === 'productSearch') {
      return language === 'German' ? 'Produkt Suche:' + search.fields[`${searchType}Name`].typeValues : 'Products/Services: ' + search.fields[`${searchType}Name`].typeValues;
    } else if (searchType === 'productDetailSearch') {
        return language === 'German' ? 'Produkt Suche:' + search.fields[`${searchType}Name`].typeValues : 'Products/Services: ' + search.fields[`${searchType}Name`].typeValues;
    } else if (searchType === 'partnerSearch') {
      return language === 'German' ? 'Unternehmenssuche' + search.fields[`${searchType}Name`].typeValues : 'Partners: ' + search.fields[`${searchType}Name`].typeValues;
    } else if (searchType === 'partnerDetailSearch') {
        return language === 'German' ? 'Unternehmenssuche' + search.fields[`${searchType}Name`].typeValues : 'Partners: ' + search.fields[`${searchType}Name`].typeValues;
    } else if (searchType === 'projectDetailSearch') {
        return language === 'German' ? 'Projekt' + search.fields[`${searchType}Name`].typeValues : 'Project: ' + search.fields[`${searchType}Name`].typeValues;
    } else if (searchType === 'startupSearch') {
        return language === 'German' ? 'Startup' + search.fields[`${searchType}Name`].typeValues : 'Startup: ' + search.fields[`${searchType}Name`].typeValues;
    }
  }
  const matchResult = search.matches.filter(match => match.matchStatus === 'matchResult');

  const matchVerified = search.matches.filter(match => match.matchStatus === 'matchVerified');

  const matchSaved = search.matches.filter(match => match.matchStatus === 'matchSaved');

  const productSearch = savedSearches.productSearch.filter((product) => {
    return product.meta.searchStatus === 'searchSaved';
  });

  const productSearchLoad = savedSearches.productSearch.filter((product) => {
    return product.meta.matchLoaded === 'false';
  });
  const productDetailSearch = savedSearches.productDetailSearch.filter((productDetail) => {
    return productDetail.meta.searchStatus === 'searchSaved';
  });
  const productDetailSearchLoad = savedSearches.productDetailSearch.filter((productDetail) => {
    return productDetail.meta.matchLoaded === 'false';
  });
  const projectDetailSearchLoad = savedSearches.projectDetailSearch.filter((projectDetail) => {
    return projectDetail.meta.matchLoaded === 'false';
  });
  const partnerSearch = savedSearches.partnerSearch.filter((partner) => {
    return partner.meta.searchStatus === 'searchSaved';
  });
  const partnerSearchLoad = savedSearches.partnerSearch.filter((partner) => {
    return partner.meta.matchLoaded === 'false';
  });
  const partnerDetailSearch = savedSearches.partnerDetailSearch.filter((partnerDetail) => {
    return partnerDetail.meta.searchStatus === 'searchSaved';
  });
  const partnerDetailSearchLoad = savedSearches.partnerDetailSearch.filter((partnerDetail) => {
    return partnerDetail.meta.matchLoaded === 'false';
  });
  const startupSearchLoad = savedSearches.startupSearch.filter((startup) => {
    return startup.meta.matchLoaded === 'false';
  });

  return (
    <Grid>
      <Grid.Row>
        {this.props.sidebar &&
        <div>
          <Scrollchor to={`${searchType}${this.props.index}`} animate={{offset: -50, duration: 500}}>
            <h3 className="margin-header1">{`Matches - ${searchName(this.props.userLanguage)}`}</h3>
          </Scrollchor>
        </div>
        }

        {!this.props.sidebar &&
        <Grid.Column computer={12}>
          {!(productSearchLoad.length || productDetailSearchLoad.length || partnerSearchLoad.length || partnerDetailSearchLoad.length || projectDetailSearchLoad.length || startupSearchLoad.length > 0) && matchingProfiles.length < 1 &&
            <Grid className="match-card--container card-generic">
              <Grid.Column computer={12} className="no-vertical-padding" id={`${searchType}${this.props.index}`}>
                <Button
                    className="button-small matchRefresh"
                    onClick={() => this.refreshMatches(search)}>
                  {'Refresh'}
                </Button>
                <CollapsibleCardWrapper title={`Matches - ${searchName(this.props.userLanguage)}`}>
                  <Grid.Row>
                    <div className="no-matchResult">
                      <div>
                        {/* <p className="no-matchSearchName">{`Matches -${searchName(this.props.userLanguage)}`}</p>*/}
                        <br />
                        {strings.matchNoResult}<br />
                        {strings.matchNoResult2}
                        <br />
                        <br />
                      </div>
                    </div>
                  </Grid.Row>
                </CollapsibleCardWrapper>
              </Grid.Column>

            </Grid>
          }
          {matchingProfiles.length > 0 &&
          <Grid className="match-card--container card-generic" id={`${searchType}${this.props.index}`}>
            <Grid.Column computer={12} className="no-vertical-padding">
              <div>
                {<Button
                      className="button-small matchRefresh"
                      onClick={() => this.refreshMatches(search)}>
                  {'Refresh'}
                </Button>}
                <CollapsibleCardWrapper title={`Matches - ${searchName(this.props.userLanguage)}`}>

                {!this.props.emailId.includes('digitalpartners.io') && matchVerified.length < 0 && matchSaved.length > 0 &&
                    <Grid>
                      <Grid.Row>
                      <Grid.Column computer={12}>
                        <div className="no-matchResult">
                          <div>
                            <br />
                            <h4>{'You have moved all matches for this search to “Saved Matches”'} </h4>
                          </div>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>}
                  {!this.props.emailId.includes('digitalpartners.io') && matchVerified.length < 0 && matchSaved.length < 0 &&
                    <Grid>
                      <Grid.Row>
                      <Grid.Column computer={12}>
                        <div className="no-matchResult">
                          <div>
                            <br />
                            <h4>{strings.matchProgress} </h4>
                          </div>
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>}
                  <Grid>
                    <Grid.Row>
                      <Grid.Column computer={12}>
                         <MatchCreateForm matchCreate={values => this.matchCreates(values, matchId, search._id, searchType)} />
                         {matchId && sortednonfilterMatches.map((matchingProfile, i) =>
                          <MatchSignup
                            key={'match-summary-' + i}
                            searchId={search._id}
                            searchType={searchType}
                            matchNo={i + 1}
                            search={search}
                            matches={matches}
                            matchId={matchId}
                            matchingProfile={matchingProfile}
                            userLanguage={this.props.userLanguage}
                            isLast={matchResult.length === (i + 1)}
                            sidebar={this.props.sidebar}
                          />
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </CollapsibleCardWrapper>
              </div>
            </Grid.Column>
          </Grid>
          }
        </Grid.Column>
        }
      </Grid.Row>
    </Grid>
  );
}
}

MatchSignupCard.propTypes = {
  savedSearches: PropTypes.object.isRequired,
  matches: PropTypes.array.isRequired
};


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    savedSearches: state.search.savedSearches,
    matches: state.matches.matches,
    userLanguage: state.user.userObj.language,
    matchLoadedSuccess: state.matches.matchLoadedSuccess,
    emailId: state.user.userObj.email
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, {fetchMatches, matchCreate, fetchSearchSignup, fetchSearches, matchRefresh})(MatchSignupCard);
