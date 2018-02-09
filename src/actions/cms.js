import { update} from './network';
import * as types from '../types/cms';

export function cmsDetail(data) {
  return update(types.CMS_DETAILS_REQUEST, {
    url: '/account/cmsdropDown',
    data
  });
}
