import {ENV} from '../config/appConfig';
import {sendContactEmail} from '../utils/email';
import log from '../utils/slackbot';

/**
 * POST /login
 * Login for existing users
 */
 export function supportDetails(req, res, next) {
  const user = req.body;
   if (ENV === 'production') {
     sendContactEmail(user, process.env.hostName); // send support/contact email w/ user data
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
       log.info('Support Request by' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
    }
   }
   res.status(200).json({ message: 'Support Request Send Successfully'});
   next();
 }

export default {
  supportDetails
};
