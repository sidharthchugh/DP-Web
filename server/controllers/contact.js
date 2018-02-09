import {ENV} from '../config/appConfig';
import {sendContactEmail} from '../utils/email';
import log from '../utils/slackbot';

/**
 * POST /login
 * Login for existing users
 */
 export function contactDetails(req, res, next) {
  const user = req.body;
   if (ENV === 'production') {
     sendContactEmail(user, process.env.hostName); // send contact email w/ user data
     log.info('Contact Request Submitted by' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
 }
   res.status(200).json({ message: 'Contact Details Send Successfully'});
   next();
 }


export default {
  contactDetails
};
