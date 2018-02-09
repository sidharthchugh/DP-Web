import { create, update, fetch, destroy } from './network';
import * as types from '../types/user';

export function signIn(data) {
  return create(types.SIGNIN_REQUEST, {
    url: '/login',
    withCredentials: true,
    data
  });
}

 export function signUp(data) {
  return create(types.SIGNUP_REQUEST, {
    url: '/signup',
    withCredentials: true,
    data
  });
}

export function signOut() {
  return create(types.SIGNOUT_REQUEST, {
    url: '/logout'
  });
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function englishLanguage() {
  return { type: types.ENGLISH_MODE };
}

export function germanLanguage() {
  return { type: types.GERMAN_MODE };
}


export function toggleForgetMode() {
  return { type: types.TOGGLE_FORGET_MODE };
}

export function resetPassword(data) {
  return update(types.RESET_PASSWORD_REQUEST, {
    url: '/reset-password',
    withCredentials: true,
    data
  });
}

export function validateEmail(data) {
  return update(types.VALIDATE_EMAIL_REQUEST, {
    url: '/validate-email',
    withCredentials: true,
    data
  });
}

export function forgotPassword(data) {
  return create(types.FORGOT_PASSWORD_REQUEST, {
    url: '/forgot',
    data
  });
}

export function fetchSettings() {
  return fetch(types.GET_SETTING_REQUEST, {
    url: '/account/settings'
  });
}

export function userFetch(data) {
  return update(types.GET_USER_REQUEST, {
    url: '/userFetch',
    data
  });
}

export function updateSettings(data) {
  return update(types.UPDATE_SETTINGS_REQUEST, {
    url: '/account/updateSettings',
    data
  });
}

export function updatePasword(data) {
  return update(types.UPDATE_PASSWORD_REQUEST, {
    url: '/account/updatePassword',
    data
  });
}

export function logoutUser() {
  return create(types.LOGOUT_REQUEST, {
    url: '/logout'
  });
}

export function deleteAccount() {
  return destroy(types.DELETE_ACCOUNT_REQUEST, {
    url: '/account/delete'
  });
}

export function toggleSettingEdit(section, edit_on = false) {
  return {
    type: types.TOGGLE_SETTING_EDIT,
    payload: { section },
    edit_on: {edit_on}
  };
}

export function notify (data) {
  return create(types.NOTIFY_REQUEST, {
    url: '/notify',
    data
  });
}
