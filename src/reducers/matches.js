import * as types from '../types/matches';

const initialState = {
  matches: [],
  matchLoadedSuccess: false
};

export default function matches(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MATCHES_SUCCESS:
      return {
        matches: action.payload.data
      };
    case types.UPDATE_MATCHES_SUCCESS:
      return {
        matches: action.payload.data
      };
    case types.CREATE_MATCH_SUCCESS:
      return {
        matches: action.payload.data
    };
    case types.SAVE_MATCH_SUCCESS:
      return Object.assign({}, state, {
    });
    case types.SAVE_UPDATE_MATCHES_SUCCESS:
     return Object.assign({}, state, {
        matches: action.payload.data
    });
    case types.REFRESH_MATCH_SUCCESS:
      return {
        matches: action.payload.data
      };
    case types.TOGGLE_MATCHES_LOADED:
      return Object.assign({}, state, {
        matchLoadedSuccess: !state.matchLoadedSuccess
      });
    default:
      return state;
  }
}