import React from 'react';
import PropTypes from 'prop-types';
import SavedMatch from './Fragments/SavedMatch';
import CollapsibleCardWrapper from '../util/CollapsibleCardWrapper';
import {Grid} from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';

const MatchCard = (props) => {
  const {matchingProfiles, search} = props.match;
  const searchType = search.meta.name;
  const searchStatus = search.meta.searchStatus;
  // If it's a named search -> show the value, else show the name of searchType
  function searchName(language) {
    if (searchType === 'productSearch') {
      return language === 'German' ? 'Produkt Suche:' + search.fields[`${searchType}Name`].typeValues : 'Products/Services: ' + search.fields[`${searchType}Name`].typeValues;
    } else if (searchType === 'productDetailSearch') {
        return language === 'German' ? 'Produkt Suche:' + search.fields[`${searchType}Name`].typeValues : 'Products/Services:  ' + search.fields[`${searchType}Name`].typeValues;
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
    function matchesName(language) {
       return language === 'German' ? 'Gespeicherte Matches' : 'Saved Matches';
     }

  console.info(`Rendering search: ${searchName()}`);
  const savedMatches = search.matches.filter(match => match.matchStatus === 'matchSaved');

    const limitMatches = matchingProfiles.slice(0, 20);
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
  const sortedMatches = sort(limitMatches, savedMatches);
  return (
    <div>
      {savedMatches.length > 0 && searchType !== 'projectDetailSearch' &&
      <Grid className="match-card--container card-generic--saved" id={`SavedMatches${searchType}${props.index}`}>
        <Grid.Column computer={12} className="no-vertical-padding">
          {!props.sidebar &&
          <CollapsibleCardWrapper title={`${matchesName(props.userLanguage)} - ${searchName(props.userLanguage)}`}>
            {sortedMatches.map((matchingProfile, i) =>
              <SavedMatch
                        key={'match-summary-' + i}
                        searchId={search._id}
                        searchType={searchType}
                        matchNo={i + 1}
                        matches={search.matches}
                        matchingProfile={matchingProfile}
                        userLanguage={props.userLanguage}
                        isLast={savedMatches.length === (i + 1)}
                      />
                    )}
          </CollapsibleCardWrapper>}
        </Grid.Column>
      </Grid>
        }
      {savedMatches.length > 0 && searchType !== 'projectDetailSearch' && props.sidebar &&
      <div>
        <Scrollchor to={`SavedMatches${searchType}${props.index}`} animate={{offset: -50, duration: 500}}>
          <h3 className="margin-header1">{`Saved Matches - ${searchName(props.userLanguage)}`}</h3>
        </Scrollchor>
      </div>
        }
    </div>
  );
};

MatchCard.propTypes = {
  match: PropTypes.object.isRequired
};

export default MatchCard;
