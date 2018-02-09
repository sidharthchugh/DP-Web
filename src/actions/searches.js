import { update, fetch, destroy } from './network';
import * as types from '../types/search';

// ###################
// I/O ACTIONS
// ###################
export function saveSearch(data) {
  return update(types.SAVE_SEARCH_REQUEST, {
    url: '/account/searchUpdate',
    data
  });
}

export function fetchSearches() {
  // console.log('***PRE-RENDER ACTION***\nGET_SEARCH_REQUEST');
  return fetch(types.GET_SEARCH_REQUEST, {
    url: '/account/search'
  });
}

export function updateSearches(data) {
  return update(types.UPDATE_SEARCH_REQUEST, {
    url: '/account/searchUpdate',
    data
  });
}


export function fetchSearchSignup(searchId) {
  return update(types.GET_SEARCH_SIGNUP_REQUEST, {
    url: '/account/searchSignup',
    data: searchId
  });
}


export function deleteSearch(data) {
  return destroy(types.DELETE_SEARCH_REQUEST, {
    url: '/account/searchDelete',
    data
  });
}

export function updateSearchPreferences(data) {
  return update(types.UPDATE_SEARCH_PREFERENCES_REQUEST, {
    url: '/account/searchPreferencesUpdate',
    data
  });
}


// ###################
// UI ACTIONS
// ###################

export function toggleSearchEdit(section, edit_on = false) {
  return {
    type: types.TOGGLE_SEARCH_EDIT,
    payload: { section },
    edit_on: {edit_on}
  };
}

export function toggleLoaded() {
  return { type: types.TOGGLE_LOADED };
}
