import * as types from '../types/projects';

const initialState = {
  logoURI: '',
  projectfileURI: '',
  projectfileApplicationURI: '',
  profiles: {
  },
  targetProfiles: {
  },
  sections: {
    projects: {
      editable: false
    },
    projectsApplication: {
      editable: false
    }
  }
};


export default function projects(state = initialState, action) {
  switch (action.type) {
    case types.GET_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data,
        projectfileApplicationURI: action.payload.data.projectsApplication
      });
      case types.UPDATE_PROJECT_SUCCESS:
        return Object.assign({}, state, {
          profiles: action.payload.data,
          projectfileURI: action.payload.data.projectfileURI
    });
     case types.UPDATE_STATUS_PROJECT_SUCCESS:
        return Object.assign({}, state, {
          logoURI: action.payload.data.logoURI,
          profiles: action.payload.data,
          projectfileURI: action.payload.data.projectfileURI
    });
    case types.GET_TARGET_PROFILE_SUCCESS:
        return Object.assign({}, state, {
          targetProfiles: action.payload.data,
          projectfileURI: action.payload.data.projectfileURI
    });
    case types.GET_VIEW_PROJECT_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data,
      });
    case types.UPDATE_CURRENT_PROJECT_SUCCESS:
        return Object.assign({}, state, {
          profiles: action.payload.data,
          projectfileURI: action.payload.data.projectfileURI
    });
    case types.GET_PROJECT_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        profiles: action.payload.data,
        projectfileURI: action.payload.data.projectfileURI
  });
    /*
    case types.GET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data
      });
    case types.FETCH_ADMIN_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        logoURI: action.payload.data.logoURI,
        profiles: action.payload.data
      });
    case types.UPDATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profiles: action.payload.data
      });
    case types.UPDATE_ADMIN_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profiles: action.payload.data
      });*/
     case types.UPDATE_FILE_SUCCESS:
      return Object.assign({}, state, {
        projectfileURI: action.payload.data.projectfileURI
      });
    case types.UPDATE_FILE_FAIL:
      console.error(action.err);
      return state;
    case types.DELETE_FILE_SUCCESS:
      return Object.assign({}, state, {
        projectfileURI: action.payload.data.projectfileURI
      });
      case types.DELETE_FILE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
              projectfileApplicationURI: action.payload.data.projectfileApplicationURI
            });
      case types.TOGGLE_LOADED:
        return Object.assign({}, state, {
          loadedState: !state.loadedState
     });
    case types.TOGGLE_PROJECTS_EDIT: {
      const {section} = action.payload;
      let editable = false;
      let showDiv = true;
       if (action.edit_on.edit_on) {
        editable = true;
          showDiv = false;
      } else if (section.includes('projectName')) {
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
