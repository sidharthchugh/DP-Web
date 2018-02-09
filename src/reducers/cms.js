import * as types from '../types/cms';

const initialState = {
  cmsData: []
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case types.CMS_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        cmsData: action.payload.data
      });
    default:
      return state;
  }
}
