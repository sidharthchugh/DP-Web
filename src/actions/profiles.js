import { update, fetch, destroy } from './network';
import * as types from '../types/profile';

// ################
// I/O ACTIONS
// ################
export function fetchProfiles() {
  console.log('***PRE-RENDER ACTION***\nGET_PROFILE_REQUEST');
  return fetch(types.GET_PROFILE_REQUEST, {
    url: '/account/profile'
  });
}

export function fetchCompanyName() {
  return fetch(types.GET_PROFILE_NAME_REQUEST, {
    url: '/account/fetchProfileName'
  });
}


export function fetchFeedProfile() {
  return fetch(types.GET_FEED_PROFILE_REQUEST, {
    url: '/account/fetchfeedprofile'
  });
}


export function fetchAdminProfiles(profileId) {
  // NOTE `fetch` won't let me pass params so have to use `update`
  console.log('***PRE-RENDER ACTION***\nGET_PROFILE_REQUEST');
  return update(types.FETCH_ADMIN_PROFILE_REQUEST, {
    url: '/account/adminprofile',
    data: profileId
  });
}


export function manualProfile(data) {
  return update(types.MANUAL_ADMIN_PROFILE_REQUEST, {
    url: '/account/manualProfile',
    data
  });
}

export function displayCompName(data) {
  //console.log(data, 'values');
  return update(types.GET_COMPNAME_DB_REQUEST, {
    url: 'account/id',
    data
  });
}

export function realTimeProfile(data) {
  return update(types.REALTIME_ADMIN_PROFILE_REQUEST, {
    url: '/account/realTimeProfile',
    data
  });
}


export function updateProfiles(data) {
  return update(types.UPDATE_PROFILE_REQUEST, {
    url: '/account/profileUpdate',
    data
  });
}

export function updateTargetProfiles(data) {
  return update(types.UPDATE_TARGET_PROFILE_REQUEST, {
    url: '/account/targetprofileUpdate',
    data
  });
}

export function updateAdminProfiles(data) {
  return update(types.UPDATE_ADMIN_PROFILE_REQUEST, {
    url: '/account/adminprofileUpdate',
    data
  });
}

export function fetchProfileSignup(profilesId) {
  return update(types.GET_PROFILE_SIGNUP_REQUEST, {
    url: '/account/profileSignup',
    data: profilesId
  });
}


// NOTE manually defined req/success/fail handlers for the CompanyLogo AJAX request.
export function updateLogoRequest() {
  return {
    type: types.UPDATE_LOGO_REQUEST
  };
}
export function updateLogoSuccess(data) {
  return {
    type: types.UPDATE_LOGO_SUCCESS,
    payload: { data }
  };
}
export function updateLogoFail(err) {
  return {
    type: types.UPDATE_LOGO_FAIL,
    err
  };
}

export function deleteLogo(logoURI) {
  return destroy(types.DELETE_LOGO_REQUEST, {
    url: '/account/logoDelete',
    data: { logoURI }
  });
}


// ################
// UI ACTIONS
// ################

export function toggleProfileEdit(section, edit_on = false) {
  return {
    type: types.TOGGLE_PROFILE_EDIT,
    payload: { section },
    edit_on: {edit_on}
  };
}

export function toggleLoaded() {
  return { type: types.TOGGLE_LOADED };
}
