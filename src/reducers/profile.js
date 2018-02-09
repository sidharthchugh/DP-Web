import * as types from '../types/profile';

const initialState = {
  logoURI: '',
  loadedState: false,
  profiles: {
  },
  feedsProfile: {

  },
  targetProfile: {
  },
  sections: {
    company: {
      editable: false,
      showDiv: true
    },
    reputation: {
       editable: false
    },
    generalInformation: {
      editable: false
    },
    services: {
      editable: false
    },
    references: {
      editable: false
    }
  }
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data
      });
     case types.GET_FEED_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        feedsProfile: action.payload.data
      });
      case types.GET_PROFILE_NAME_SUCCESS:
        return Object.assign({}, state, {
          profiles: action.payload.data
    });
    case types.FETCH_ADMIN_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data
      });
    case types.MANUAL_ADMIN_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data
    });
    case types.REALTIME_ADMIN_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data
    });
    case types.UPDATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data
      });
     case types.UPDATE_TARGET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profiles: action.payload.data
      });
    case types.UPDATE_ADMIN_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profiles: action.payload.data
      });
    case types.GET_COMPNAME_DB_SUCCESS:
      return Object.assign({}, state, {
        compNames: action.payload.data
      });
    case types.GET_PROFILE_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        targetProfile: action.payload.data,
        logoURI: action.payload.data.logoURI
    });
    case types.UPDATE_LOGO_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI
      });
    case types.UPDATE_LOGO_FAIL:
      console.error(action.err);
      return state;
    case types.DELETE_LOGO_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI
      });
     case types.TOGGLE_LOADED:
        return Object.assign({}, state, {
          loadedState: !state.loadedState
     });
    case types.TOGGLE_PROFILE_EDIT: {
      const {section} = action.payload;
      let editable = false;
      let showDiv = true;
      if (action.edit_on.edit_on) {
        editable = true;
        showDiv = false;
      } else if (section.includes('productName')) {
          if (!state.sections[section]) state.sections[section] = {};
           editable = !state.sections[section].editable;
           showDiv = !state.sections[section].showDiv;
      } else {
        editable = !state.sections[section].editable;
        showDiv = !state.sections[section].showDiv;
      }
      return Object.assign({}, state, {
        sections: {
          ...state.sections,
          [section]: {
            ...state.sections[section],
            editable,
            showDiv
          }
        }
      });
    }
    default:
      return state;
  }
}
