import * as types from '../types/notification';

export function addNotification(message, level, position) {
  return {
    type: types.ADD_NOTIFICATION,
    message,
    level,
    position
  };
}
