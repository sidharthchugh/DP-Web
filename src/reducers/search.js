import * as types from '../types/search';

const initialState = {
  unsyncedSave: false, // `true` if new saved search/prefs in DB but not in client yet
  unsyncedDeletion: false, // `true` if search deleted in DB but not in client yet
  loaded: false,
  savedSearches: {
    productDetailSearch: [],
    partnerDetailSearch: [],
    projectDetailSearch: [],
    otherDetailSearch: [],
    productSearch: [],
    partnerSearch: [],
    otherSearch: [],
    searchPreferences: [],
    startupSearch: []
  },
  sections: {
    productDetailSearch: {
      editable: false
    },
    partnerDetailSearch: {
      editable: false
    },
    projectDetailSearch: {
      editable: false
    },
    otherDetailSearch: {
      editable: false
    },
    productSearch: {
      editable: false
    },
    partnerSearch: {
      editable: false
    },
    otherSearch: {
      editable: false
    },
    startupSearch: {
      editable: false
    }
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        loaded: false,
        unsyncedSave: false,
        unsyncedDeletion: false,
        savedSearches: action.payload.data
      });
    case types.GET_SEARCH_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        loaded: false,
        unsyncedSave: false,
        unsyncedDeletion: false,
        savedSearches: action.payload.data
    });
    case types.SAVE_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        unsyncedSave: true
      });
    case types.DELETE_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        unsyncedDeletion: true
      });
    case types.UPDATE_SEARCH_PREFERENCES_SUCCESS:
      return Object.assign({}, state, {
        unsyncedSave: true
      });
    case types.TOGGLE_LOADED:
      return Object.assign({}, state, {
        loaded: !state.loaded
      });
      case types.TOGGLE_SEARCH_EDIT: {
        const {section} = action.payload;
        let editable = false;
        let showDiv = true;
         if (action.edit_on.edit_on) {
          editable = true;
            showDiv = false;
        } else {
            if (!state.sections[section]) state.sections[section] = {};
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
