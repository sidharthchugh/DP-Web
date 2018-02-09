import { create} from './network';
import * as types from '../types/support';

export function supportDetails(data) {
  return create(types.SUPPORT_DETAILS_REQUEST, {
    url: '/account/support',
    data
  });
}
