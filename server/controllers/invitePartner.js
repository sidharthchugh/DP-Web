import {ENV} from '../config/appConfig';
import {sendInvitePartnerEmail} from '../utils/email';
import User from '../models/user';
import Search from '../models/search';
import Profile from '../models/profile';
import log from '../utils/slackbot';

/**
 * POST /invitePartner
 *
 */
 export function invitePartners(req, res, next) {
   Profile.findOne({elasticId: req.headers.userid}).exec((err, profiles) => {
     if (err) { return res.sendStatus(500); }
     // Create User in Database
     const user = new User({
       isEmailVerified: false,
       partnerId: profiles.elasticId,
       email: req.body.partnerEmail
     });

     // Create Dummy Profile for the User in Database
     const profile = new Profile({
       companyStatus: 'Active'
     });

     for (let i = 0; i < profile.products.length; i++) {
       profile.products[i].companyId = profile.elasticId;
     }

     // Create Dummy Search for the Search Table in Database
     const search = new Search({
       searchId: profile.elasticId,
       searchPreferences: [{}]
     });

     user.userId = profile.elasticId;

     User.findOne({ email: req.body.partnerEmail }, (findErr, existingUser) => {
       if (existingUser) {
         return res.status(409).json({ message: 'This e-mail address has been registered already!'});
       }

       return user.save((saveErr) => {
         if (saveErr) return next(saveErr);

         const companyInfo = {
           inviteeCompanyName: profiles.companyName.typeValues,
           inviteefirstName: req.headers.firstname,
           partnerFirstName: req.body.partnerFirstName,
           partnerCompanyName: req.body.partnerCompanyName,
           partnerLastName: req.body.partnerLastName,
           partnerEmail: req.body.partnerEmail,
           partnerMessage: req.body.partnerMessage,
           inviteeEmailID: req.headers.emailid
         };

         if (ENV === 'production') {
           sendInvitePartnerEmail(user, companyInfo, process.env.hostName || 'http://localhost:3000'); // send invite email w/ verification token
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
             log.info('Invite Partners Email Send by' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
          }
         }

         // Save Profile
         profile.save((error) => {
           if (error) {
               console.error('Error on profile.save()', error);
             }
         });

         // Save Search
         search.save((error) => {
           if (error) {
               console.error('Error on search.save()', error);
             }
         });

      res.status(200).json({ message: 'Invitation Send Successfully'});
     });
   });
 });
}
/**
* PUT /validate-email
* validate Email
*/
 export function validatePartner(req, res, next) {
  // check header or url parameters or post parameters for token
  const partnerToken = req.body.partnerToken;
  if (!partnerToken) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  User.findOne({
    invitePartnerToken: req.body.partnerToken,
    invitePartnerTokenExpires: {
      $gt: Date.now()
    }
  }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        message: 'Email token is not valid or has expired'
      });
    }

    user.isEmailVerified = true;
    user.invitePartnerTokenToken = undefined;
    user.invitePartnerTokenExpires = undefined;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.companyName = req.body.companyName;
    user.position = req.body.position;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
           message: 'User Info Updated Successfully'
         });
      });
    });
  });
}


export default {
  invitePartners,
  validatePartner
};
