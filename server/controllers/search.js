import Search from '../models/search';
import log from '../utils/slackbot';
import {ENV} from '../config/appConfig';
import {findMatchesForSearch} from './matches';
import {sendAutoEmail} from '../utils/email';
import matchableSearchTypes from '../matchEngine/matchableSearchTypes';

// ####################
// PRIVATE FUNCTIONS
// ####################

function _identifySearchType(req) {
  let identifiedSearchType = null;
  matchableSearchTypes.forEach((searchType) => {
    if (req.body.submittedSearch[searchType]) {
      console.log(`Identified searchType as ${searchType}`);
      identifiedSearchType = searchType;
    }
  });
  return identifiedSearchType;
}


// ####################
// ROUTE HANDLERS
// ####################

/**
 * GET /account/search
 * Fetch all Searches
 */
export function fetchSearches(req, res) {
  Search.find({searchId: req.headers.userid}).exec((err, searches) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    // unbox the `searches` object before returning
    return res.json(searches[0]);
  });
}


export function displaySearchSignup(req, res) {
   Search.find({searchId: req.body.searchId}).exec((err, searches) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    // unbox the `searches` object before returning
    return res.json(searches[0]);
  });
}
/**
 * PUT /account/searchUpdate
 * Update Search
 */
export function saveSearch(req, res) {
  // const searchType = req.body.searchType;
  // const hash = {};
  // hash[searchType] = req.body;

  let finSearchId;
  if (req.body.searchMatchId) {
    finSearchId = req.body.searchMatchId;
  } else {
    finSearchId = req.headers.userid;
  }

  Search.findOneAndUpdate(
    {searchId: finSearchId},
    // TODO :
    // it will not be req.body, but a nested object
    // instead of productSearch hardcoded take the search type
    {$addToSet: req.body.submittedSearch},
    {new: true},
    (err, registeredSearch) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
        res.send(registeredSearch);
        req.headers.searchType = _identifySearchType(req);
        if (req.body.searchMatchId) req.headers.adminMatch = req.body.searchMatchId;
        req.body = registeredSearch.toObject();
        // Matches Engine Processing Start
        console.log('Matches Engine Processing Start');
        findMatchesForSearch(req, res);
        if (ENV === 'production') {
        if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
          sendAutoEmail(`A new ${req.headers.searchType} search has been created by ${req.headers.firstname} ${req.headers.lastname}`, req.headers.firstname, req.headers.firstname, req.headers.userid, req.headers.emailid, 'Search Performed');
          log.info('A new search has been created by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid + '\nSearch Type:' + req.headers.searchType + '\nSearch Link: https://digitalpartners.io/search/' + req.headers.userid);
         }
       } else {
         console.log(`A new search has been created for searchId ${req.headers.firstname}`);
         console.log(require('util').inspect(req.body, { depth: null }));
       }
      }
  );
}

export function refreshMatch(req, res) {
let refreshId;
 if (req.body.matchId) {
  refreshId = req.body.matchId;
 } else {
  refreshId = req.headers.userid;
 }
Search.findOneAndUpdate(
  {searchId: refreshId},
  {new: true},
  (err, registeredSearch) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
      res.send(registeredSearch);
      req.headers.searchType = req.body.meta.name;
      if (ENV === 'production') {
        if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
         log.info('Matches has benn refreshed by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid + '\nSearch Type:' + req.headers.searchType);
       }
     } else {
       console.log(`A new search has been created for searchId ${req.headers.firstname}`);
       console.log(require('util').inspect(req.body, { depth: null }));
     }
      req.headers.latestSearch = req.body;
      if (req.body.matchId) req.headers.adminMatch = req.body.matchId;
      // Matches Engine Processing Start
      console.log('Matches Engine Processing Start');
      findMatchesForSearch(req, res);
    }
);
}

/**
 * DELETE /account/searchDelete
 * Delete the saved search of search type `name` (e.g. 'productDetailSearch'),
 * belonging to the passed `_id`.
 */
 export function deleteSearch(req, res) {
  let finSearchId;
  if (req.body.searchMatchId) {
    finSearchId = req.body.searchMatchId;
  } else {
    finSearchId = req.headers.userid;
  }

   const search = `${req.body.name}`;
   if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
      log.info('Search has been deleted by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
    }
  } else {
    console.log(`Search has been deleted by searchId ${req.headers.firstname}`);
    console.log(require('util').inspect(req.body, { depth: null }));
  }

   Search.findOne({searchId: finSearchId}, (findErr, deletedMatches) => {
      if (findErr) return res.status(500).json({ message: findErr });
       deletedMatches[search].id(req.body._id).meta.searchStatus = 'searchDeleted';
       return deletedMatches.save((saveErr) => {
        if (saveErr) return res.status(500).json({ message: saveErr });
        return res.status(200).json({
           message: 'Search Deleted Successfully'
         });
       });
   });
 }

// TODO Ben: like in the actual searchPreferences, we can simplify this
// drastically if we use a plain object in the schema that isn't nested
// inside an array.
export function updateSearchPreferences(req, res) {
  if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
     log.info('Search Preferences has been updated by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid + '\nSearch Type: Search Preferences');
   }
 } else {
   console.log(`Search Preferences has been updated by searchId ${req.headers.firstname}`);
   console.log(require('util').inspect(req.body, { depth: null }));
 }
  Search.update(
    { searchId: req.headers.userid },
    { $set: {searchPreferences: req.body} },
    { new: true },
    (err, updatedPrefs) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      return res.send(updatedPrefs);
    }
  );
}


export default {
  fetchSearches,
  saveSearch,
  deleteSearch,
  updateSearchPreferences,
  refreshMatch,
  displaySearchSignup
};
