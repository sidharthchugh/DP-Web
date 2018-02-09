import {ENV} from '../config/appConfig';
import {sendInviteTeamEmail} from '../utils/email';
import User from '../models/user';
import Profile from '../models/profile';
import log from '../utils/slackbot';

/**
 * POST /inviteTeam
 * Login for existing users
 */
 export function inviteTeamMembers(req, res, next) {
   Profile.findOne({elasticId: req.headers.userid}).exec((error, profiles) => {
     if (error) { return res.sendStatus(500); }
     const user = new User({
       userId: profiles.elasticId,
       isEmailVerified: false,
       email: req.body.teamMemberEmail
     });
     const companyInfo = {
       inviteeCompanyName: profiles.companyName.typeValues,
       inviteefirstName: req.headers.firstname,
       inviteeEmailID: req.headers.emailid,
       teamMemberFirstName: req.body.teamMemberFirstName,
       teamMemberLastName: req.body.teamMemberLastName,
       teamMemberMessage: req.body.teamMemberMessage,
       teamMemberEmail: req.body.teamMemberEmail
     };
     User.findOne({
       email: req.body.teamMemberEmail
      }, (err, users) => {
       if (users) {
         return res.status(401).json({ message: 'This e-mail address has been registered already!'});
      }
        return user.save((saveErr) => {
       if (saveErr) return next(saveErr);
       if (ENV === 'production') {
         sendInviteTeamEmail(user, companyInfo, process.env.hostName || 'http://localhost:3000'); // send invite email w/ verification token
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
         log.info('Team Member Invite Email Send by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
        }
       }
      res.status(200).json({ message: 'Invitation Send Successfully'});
     });
 });
  });
}

/**
* PUT /validate-email
* validate Email
*/
 export function validateTeamMembers(req, res, next) {
  // check header or url parameters or post parameters for token
  const teamToken = req.body.teamToken;
  if (!teamToken) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  User.findOne({
    inviteTeamMemberToken: req.body.teamToken,
    inviteTeamMemberTokenExpires: {
      $gt: Date.now()
    }
  }, (err, user) => {
    if (!user) {
      return res.status(404).json({
        message: 'Email token is not valid or has expired'
      });
    }

    user.isEmailVerified = true;
    user.inviteTeamMemberToken = undefined;
    user.inviteTeamMemberTokenExpires = undefined;
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
  inviteTeamMembers,
  validateTeamMembers
};
