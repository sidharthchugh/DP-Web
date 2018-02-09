import Profile from '../models/profile';
import User from '../models/user';
import Search from '../models/search';
import MatchEngine from '../matchEngine/MatchEngine';
import log from '../utils/slackbot';
import {ENV} from '../config/appConfig';
import matchableSearchTypes from '../matchEngine/matchableSearchTypes';
import {sendMatchContact} from '../utils/email';
import {sendAutoEmail} from '../utils/email';
import crypto from 'crypto';

// ####################
// PRIVATE FUNCTIONS
// ####################

/**
 * _queryMatchingProfiles - Queries the DB and returns all profiles that
 * match an _id in the passed search's `profileIds` array.
 *
 * @param  {Object} search
 * @param  {fn} callback
 * @return {@callback}
 */
function _queryMatchingProfiles(search, callback) {
  const profileIds = search.matches.map(match => match.profileId);
  // const duplicates = profileIds.reduce((acc, el, i, arr) => {
  // if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
  // }, []);
  Profile.find({
    elasticId: {
      $in: profileIds
    }
  }, (err, matchingProfiles) => {
    if (err) {
      console.error('Error @ MatchesController._queryMatchingProfiles: ', err);
      return callback(err, null);
    }
      // Profile.find({
      //   elasticId: {
      //   $in: duplicates
      // }
      // }, (error, matchedProfiles) => {
      //  matchingProfiles = [...matchingProfiles, ...matchedProfiles];
       return callback(null, matchingProfiles);
 //  });
  });
}

/**
 * _getAllMatches - Takes a `savedSearches` object, builds an array of `match`
 * objects (containing the search itself and the matching profiles for it),
 * and finally resolves by passing the finished `matchesCollection` array.
 *
 * @param  {Object} savedSearches
 * @return {Promise}
 */
function _getAllMatches(savedSearches) {
  let matchableSearches =
    // retrieve all the values from the different types of saved searches
    matchableSearchTypes.map(searchType => savedSearches[searchType])
    // filter out all the ones that were empty
    .filter(arr => arr.length !== 0);
  // flatten the 2-dimensional array to a single one
  matchableSearches = [].concat(...matchableSearches);
  return new Promise((resolve, reject) => {
    const matchesCollection = [];
    matchableSearches.forEach((search) => {
      _queryMatchingProfiles(search, (err, matchingProfiles) => {
        if (err) reject(err);
        const match = {
          search,
          matchingProfiles
        };
        matchesCollection.push(match);
        if (matchesCollection.length === matchableSearches.length) resolve(matchesCollection);
      });
    });
  });
}

// ####################
// ROUTE HANDLERS
// ####################

export function fetchMatches(req, res) {
  const {
    savedSearches
  } = req.body;
  _getAllMatches(savedSearches).then((finalMatchesCollection) => {
      res.status(200).send(finalMatchesCollection);
    })
    .catch((err) => {
      console.error('Error @ MatchesController._getAllMatches: ', err);
      res.status(500).send(err);
    });
}

export function saveMatch(req, res) {
  const {
    searchType,
    match
  } = req.body;
  const search = `${searchType}._id`;
  const matches = `${searchType}.$.matches`;

 const callback = (err, updated) => {
     if (err) { return res.sendStatus(500); }
     return res.send(updated);
   };

 let elasticSearchId;
 if (req.body.matchId) {
  elasticSearchId = req.body.matchId;
 } else {
  elasticSearchId = req.headers.userid;
 }

Search.findOneAndUpdate(
   {
    searchId: elasticSearchId,
     [search]: req.body.searchId
   },
    { $pull: { [matches]: {_id: [match._id]}}},
    {new: true}, callback
);
}

export function createMatch(req, res) {
  const search = `${req.body.searchType}._id`;
  const matches = `${req.body.searchType}.$.matches`;
  Profile.findOne({elasticId: req.body.createElasticId}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    if (!profiles) return res.sendStatus(500);
    const matchedProfile = JSON.stringify(profiles, null, '\t');
    const finalProfile = JSON.parse(matchedProfile);
    let productIds = [];
    let projectIds = [];
    const matchStatus = 'matchResult';
    const profileStatus = finalProfile.companyStatus === 'Active' ? 1 : 0;
    const keywordMatchCount = 1;
    const profileId = finalProfile.elasticId;

   if (finalProfile.products) {
      productIds = finalProfile.products.map((product) => {
          return product.elasticId;
       });
   }

   if (finalProfile.projects) {
    projectIds = finalProfile.projects.map((project) => {
        return project.elasticId;
      });
   }

   const callback = (error, updated) => {
     if (error) { return res.sendStatus(500); }
     return res.send(updated);
   };
    Search.findOneAndUpdate(
   {
    searchId: req.body.createMatchId,
     [search]: req.body.createSearchId
   },
    { $push: { [matches]: {matchStatus, profileId, projectIds, keywordMatchCount, profileStatus, productIds}}},
    {new: true}, callback
  );
  });
}


export function updateMatch(req, res) {
  const {
    searchType,
    match
  } = req.body;
  const search = `${searchType}._id`;
  const matches = `${searchType}.$.matches`;

 const callback = (err, updated) => {
     if (err) { return res.sendStatus(500); }
     return res.send(updated);
   };

  let elasticSearchId;
  let matchStatusId;
 if (req.body.matchId) {
  elasticSearchId = req.body.matchId;
  matchStatusId = 'matchVerified';
 } else {
  elasticSearchId = req.headers.userid;
  matchStatusId = 'matchSaved';
 }

 if (req.body.buttonStatus) {
  matchStatusId = 'matchResult';
  if (req.body.buttonStatus === 'plus') {
      match.keywordMatchCount ++;
  } else if (req.body.buttonStatus === 'minus') {
     match.keywordMatchCount --;
  }
 }


Search.findOneAndUpdate(
   {
    searchId: elasticSearchId,
     [search]: req.body.searchId
   },
    { $push: { [matches]: {matchStatus: matchStatusId, matchedAt: match.matchedAt, profileId: match.profileId, projectIds: match.projectIds, _id: match._id, keywordMatchCount: match.keywordMatchCount, profileStatus: match.profileStatus, productIds: match.productIds}}},
    {new: true}, callback
);
}

export function contactMatch(req, res) {
  let userInfo;
  Profile.findOne({elasticId: req.headers.userid}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    const companyInfo = {
      senderCompanyName: profiles.companyName.typeValues || '',
      senderIndustry: profiles.industry.typeValues || '',
      senderHeadquarters: profiles.headquarters.typeValues || '',
      senderDescription: profiles.companyDescription.typeValues || '',
      senderCompanyStatus: profiles.companyStatus,
      searchType: req.body.searchType,
      senderFirstName: req.body.senderFirstName,
      senderLastName: req.body.senderLastName,
      emailaddress: req.body.emailaddress
    };


    if (ENV === 'production') {
      const matchValues = req.body;
      User.findOne({userId: matchValues.elasticId}).exec((saveerr, user) => {
        if (saveerr) { return res.sendStatus(500); }
        if (user) {
         userInfo = {
          matchFirstName: user.firstName || '',
          matchLastName: user.lastName || '',
          matchEmail: user.email || ''
        };
        sendMatchContact(matchValues, userInfo, companyInfo, process.env.hostName || 'http://localhost:3000'); // send invite email w/ verification token
        if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
        sendAutoEmail(`Matches Contact requested for ${matchValues.companyName.typeValues} by`, req.headers.firstname, req.headers.lastname, req.headers.userid, req.headers.emailid, 'Matches Contact Requested');
        log.info('Contact Match Email Sent by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
      }
     }
    });
  }
     res.status(200).json({ message: 'Contact Details Send Successfully'});
  });
}

/**
 * findMatchesForSearch - Takes a full `search` object from `req.body` and
 * the search's `searchType` from `req.headers` to run matchEngine on said search.
 * @param  {type} req description
 * @param  {type} res description
 * @return {type}     description
 */
export function findMatchesForSearch(req, res) {
  // Fetch a copy of the user's profile
  let findMatchId;
  if (req.headers.adminMatch) {
    findMatchId = req.headers.adminMatch;
  } else {
    findMatchId = req.headers.userid;
  }

  Profile.findOne({
    elasticId: findMatchId
  }).exec((err, thisProfile) => {
    if (err) return res.status(500).send(err);
    console.log('Matching for profile _id:', req.headers.userid);
    const searcherProfile = thisProfile.toObject();
    console.log('before query execution');
    Profile.esSearch({
    from: 0,
    size: 10000,
    query: {
      bool: {
        must_not: [
          {
            match: {
              elasticId: findMatchId
            }
          },
          {
            match_phrase: {
              'companyWebsite.typeValues': 'https://digitalpartners.io'
            }
          }
        ]
      }
    }
  }, (error, results) => {
      if (err) console.log(error);
      let matches = [];
      // Retrieve the `searchType` we set previously in `saveSearch()`

      const {
        searchType
        } = req.headers;
         const matchableProfiles = results.hits ? results.hits.hits.map((a) => {
            return Object.assign({}, {_id: a._source.elasticId}, a._source);
}) : [];
        const latestSearch = req.headers.latestSearch ? req.headers.latestSearch :
         req.body[searchType][req.body[searchType].length - 1];

      // const searchType = req.headers.searchType;
      // // console.log('searchTypeeeeeeee', searchType)
      // const matchableProfiles = results ? results.hits.hits.map((a) => { return Object.assign({}, {_id: a._source.elasticId}, a._source); }) : [];
      // const latestSearch = req.headers.latestSearch ? req.headers.latestSearch : req.body['productSearch'][req.body['productSearch'].length - 1];
      const searchId = latestSearch._id;
      if (latestSearch.fields) {
        const searchFields = latestSearch.fields;
        console.log('SEARCH FIELDS\n');
        console.log(require('util').inspect(searchFields, {
          depth: null
        }));
        matches = MatchEngine.findMatches(searcherProfile, matchableProfiles, searchType, searchFields);
      } else {
        matches = MatchEngine.findMatches(searcherProfile, matchableProfiles, searchType, {});
      }
       const search = `${searchType}`;
      // Sorting Matches on the basis of keyword Match Count Descending
      let sortedMatches;
      let finalMatches;
      if (matches) {
        sortedMatches = matches.sort((a, b) => {
         if (b.profileStatus > a.profileStatus || b.keywordMatchCount > a.keywordMatchCount) return 1;
         if (b.profileStatus < a.profileStatus || b.keywordMatchCount < a.keywordMatchCount) return -1;
         if (b.profileStatus > a.profileStatus || b.keywordMatchCount === a.keywordMatchCount) return -1;
        return 0;
        });
         finalMatches = sortedMatches.slice(0, 20);
     }
     if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
           if (sortedMatches === undefined || sortedMatches.length < 1) {
       log.info('No Match Found for ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
     }
     }
   }
      if (finalMatches !== undefined) {
        Search.findOne({searchId: findMatchId}, (findErr, saveMatches) => {
           if (findErr) return res.status(500).json({ message: findErr });
            saveMatches[search].id(searchId).meta.matchLoaded = 'true';
            if (req.headers.emailid.includes('digitalpartners.io') || ENV === 'development') {
                saveMatches[search].id(searchId).meta.display = 'block';
              }
            const extractSavedMatches = JSON.stringify(saveMatches[search].id(searchId).matches, null, '\t');
            const parseSavedMatches = JSON.parse(extractSavedMatches);
            const filteredMatches = finalMatches.filter((match) => {
             return parseSavedMatches.map((savedMatch) => {
                 return match.profileId !== savedMatch.profileId;
             });
            });
            saveMatches[search].id(searchId).matches = filteredMatches;
            return saveMatches.save();
        });
      }
    });
  });
}

export default {
  fetchMatches,
  findMatchesForSearch,
  saveMatch,
  contactMatch,
  updateMatch,
  createMatch
};
