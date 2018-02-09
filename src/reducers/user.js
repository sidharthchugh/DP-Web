import * as types from '../types/user';

const initialState = {
  users: {
  },
  fetchUser: {

  },
  isLogin: true,
  authenticated: false,
  isForget: false,
  sections: {
    setting: {
      editable: false
    }
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return Object.assign({}, state, {
        isLogin: !state.isLogin // defined in initialState in server.js
      });
    case types.TOGGLE_FORGET_MODE:
      return Object.assign({}, state, {
        // FIXME @Sidharth: `isForgOt` in initialState, `isForgEt` here, no idea
        // what's going on with this.
        isForget: !state.isForget
      });
    case types.SIGNIN_SUCCESS:
    case types.GET_SETTING_SUCCESS:
    case types.UPDATE_PASSWORD_SUCCESS:
    case types.RESET_PASSWORD_SUCCESS:
    case types.VALIDATE_EMAIL_SUCCESS:
      console.info('user/SUCCESS triggered');
      return Object.assign({}, state, {
        authenticated: true,
      });
    case types.SIGNUP_SUCCESS:
    case types.SIGNOUT_SUCCESS:
    case types.DELETE_ACCOUNT_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false,
      });
    case types.UPDATE_SETTINGS_SUCCESS:
      console.info(action);
      return Object.assign({}, state, {
        userObj: action.payload.data, // `userObj` defined in initialState in server.js
        authenticated: true,
      });
    case types.MANUAL_ADMIN_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        users: action.payload.data
    });
    case types.GERMAN_MODE:
      return Object.assign({}, state, {
        language: 'German',
      });
    case types.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        fetchUser: action.payload.data,
    });
    case types.ENGLISH_MODE:
      return Object.assign({}, state, {
        language: 'English',
      });
    case types.TOGGLE_SETTING_EDIT: {
      const {section} = action.payload;
      let editable = false;
      if (action.edit_on.edit_on) {
        editable = true;
      } else {
        editable = !state.sections[section].editable;
      }
      return Object.assign({}, state, {
        sections: {
          ...state.sections,
          [section]: {
            ...state.sections[section],
            editable
          }
        }
      });
    }
    default:
      return state;
  }
}
