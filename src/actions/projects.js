import { update, fetch, destroy } from './network';
import * as types from '../types/projects';

// ################
// I/O ACTIONS
// ################
export function fetchProjects() {
  console.log('***PRE-RENDER ACTION***\nGET_PROJECT_REQUEST');
  return fetch(types.GET_PROJECT_REQUEST, {
    url: '/account/project'
  });
}


export function fetchTargetProfiles(data) {
  return update(types.GET_TARGET_PROFILE_REQUEST, {
    url: '/account/targetprofile',
    data
  });
}

export function fetchProfilesView(projectId) {
  return update(types.GET_VIEW_PROJECT_REQUEST, {
    url: '/account/viewproject',
    data: projectId
  });
}


export function updateProjects(data) {
  return update(types.UPDATE_PROJECT_REQUEST, {
    url: '/account/projectUpdate',
    data
  });
}


export function fetchProjectsSignup(projectId) {
  return update(types.GET_PROJECT_SIGNUP_REQUEST, {
    url: '/account/projectSignup',
    data: projectId
  });
}

export function updateStatusProjects(data) {
  return update(types.UPDATE_STATUS_PROJECT_REQUEST, {
    url: '/account/statusprofileUpdate',
    data
  });
}


export function updateCurrentProjects(data) {
  return update(types.UPDATE_CURRENT_PROJECT_REQUEST, {
    url: '/account/saveProject',
    data
  });
}


export function contactProjects(data) {
  return update(types.CONTACT_PROJECT_REQUEST, {
    url: '/contactProjectMatch-email',
    data
  });
}

// NOTE manually defined req/success/fail handlers for the CompanyLogo AJAX request.
export function updateFileRequest() {
  return {
    type: types.UPDATE_FILE_REQUEST,
  };
}

export function updateFileSuccess(data) {
  return {
    type: types.UPDATE_FILE_SUCCESS,
    payload: { data }
  };
}
export function updateFileFail(err) {
  return {
    type: types.UPDATE_FILE_FAIL,
    err
  };
}

export function deleteFile(projectfileURI) {
  return destroy(types.DELETE_FILE_REQUEST, {
    url: '/account/projectfileDelete',
    data: { projectfileURI }
  });
}
export function updateProjectApplicationFileRequest() {
  return {
    type: types.UPDATE_FILE_REQUEST,
  };
}

export function updateProjectApplicationFileSuccess(data) {
  return {
    type: types.UPDATE_FILE_APPLICATION_SUCCESS,
    payload: { data }
  };
}
export function updateProjectApplicationFileFail(err) {
  return {
    type: types.UPDATE_FILE_APPLICATION_FAIL,
    err
  };
}
export function deleteProjectApplicationFile(projectfileApplicationURI) {
    // console.log('from action:', projectfileApplicationURI)
    return destroy(types.DELETE_FILE_APPLICATION_REQUEST, {
      url: '/account/projectfileApplicationDelete',
      data: { projectfileApplicationURI }
    });
  }
// ################
// UI ACTIONS
// ################
export function toggleProjectsEdit(section, index, edit_on = false) {
  return {
    type: types.TOGGLE_PROJECTS_EDIT,
    payload: { section, index },
    edit_on: {edit_on}
  };
}
export function toggleLoaded() {
  return { type: types.TOGGLE_LOADED };
}
