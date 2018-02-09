import { NETWORK_EXCEPTION } from '../types/notification';

export function fetch(type, data) {
  return {
    types: [type, type.replace('REQUEST', 'SUCCESS'), NETWORK_EXCEPTION],
    payload: { request: { method: 'get', ...data } }
  };
}

export function create(type, data) {
  return {
    types: [type, type.replace('REQUEST', 'SUCCESS'), NETWORK_EXCEPTION],
    payload: { request: { method: 'post', ...data } }
  };
}

export function update(type, data) {
  return {
    types: [type, type.replace('REQUEST', 'SUCCESS'), NETWORK_EXCEPTION],
    payload: { request: { method: 'put', ...data } }
  };
}

export function destroy(type, data) {
  return {
    types: [type, type.replace('REQUEST', 'SUCCESS'), NETWORK_EXCEPTION],
    payload: { request: { method: 'delete', ...data } }
  };
}
