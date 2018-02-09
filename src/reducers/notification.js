import * as types from '../types/notification';

export default function notification(
  state = {}, action
) {
  switch (action.type) {
    case types.NETWORK_EXCEPTION:
    return Object.assign({}, state, {
      message: action.error.response ? JSON.stringify(action.error.response.data.message) : '',
      level: 'error',
      position: 'tc'
    });
    case types.ADD_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level,
        position: action.position
      });

    default:
      return state;
  }
}
