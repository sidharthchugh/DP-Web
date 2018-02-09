import { update } from './network';
import * as types from '../types/matches';

export function fetchMatches(savedSearches) {
  if (savedSearches) {
  // NOTE `fetch` won't let me pass params so have to use `update`
  return update(types.FETCH_MATCHES_REQUEST, {
    url: '/account/matches',
    data: { savedSearches }
  });
}
}


export function updateMatch() {
  return update(types.UPDATE_MATCHES_REQUEST, {
    url: 'account/matchUpdate'
  });
}

export function matchesUpdate(searchId, searchType, match, matchId, buttonStatus) {
  return update(types.SAVE_UPDATE_MATCHES_REQUEST, {
    url: 'account/updateMatch',
     data: {
      searchId,
      searchType,
      match,
      matchId,
      buttonStatus
    }
  });
}

export function matchRefresh(data) {
  return update(types.REFRESH_MATCH_REQUEST, {
    url: '/account/refreshMatch',
    data
  });
}

export function matchCreate(data) {
  return update(types.CREATE_MATCH_REQUEST, {
    url: '/account/matchCreate',
    data
  });
}



export function saveMatch(searchId, searchType, match, matchId) {
  return update(types.SAVE_MATCH_REQUEST, {
    url: '/account/saveMatch',
    data: {
      searchId,
      searchType,
      match,
      matchId
    }
  });
}

export function removeSavedMatch(match) {
  return update(types.REMOVE_SAVED_MATCH_REQUEST, {
    url: '/account/removeMatch',
    data: { match }
  });
}

export function contactMatch(data) {
  return update(types.CONTACT_MATCH_EMAIL_REQUEST, {
    url: '/contactMatch-email',
    withCredentials: true,
    data
  });
}

export function toggleMatchesLoaded() {
  return { type: types.TOGGLE_MATCHES_LOADED };
}
