import { create, update} from './network';
import * as types from '../types/invite';

export function inviteTeam(data) {
  return create(types.INVITE_TEAM_REQUEST, {
    url: '/account/invite-team',
    data
  });
}

export function invitePartner(data) {
  return create(types.INVITE_PARTNER_REQUEST, {
    url: '/account/invite-partner',
    data
  });
}

export function teamValidateEmail(data) {
  return update(types.TEAM_VALIDATE_EMAIL_REQUEST, {
    url: '/teamValidate-email',
    withCredentials: true,
    data
  });
}


export function partnerValidateEmail(data) {
  return update(types.PARTNER_VALIDATE_EMAIL_SUCCESS, {
    url: '/partnerValidate-email',
    withCredentials: true,
    data
  });
}
