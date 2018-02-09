import { create} from './network';
import * as types from '../types/contact';

export function contactDetails(data) {
  return create(types.CONTACT_DETAILS_REQUEST, {
    url: '/account/contact',
    data
  });
}
