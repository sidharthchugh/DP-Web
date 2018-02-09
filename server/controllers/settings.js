import User from '../models/user';
import log from '../utils/slackbot';
import {ENV} from '../config/appConfig';

/**
 * GET /account/settings
 * Display Settings
 */
export function displaySettings(req, res) {
  User.findOne({_id: req.headers.id}).exec((err, users) => {
    if (err) { return res.sendStatus(500); }
    return res.json(users);
  });
}

/**
 * PUT /account/updatePassword
 * Update current password.
 */
export function updatePassword(req, res, next) {
  User.findOne({_id: req.headers.id}).exec((err, user) => {
     if (err) { return next(err); }
     if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
       log.info('Password has been Updated by' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
     }
   }
     user.comparePassword(req.body.oldPassword, (passErr, isMatch) => {
       if (isMatch) {
         user.password = req.body.newPassword;
         user.save((saveErr) => {
           if (saveErr) { return res.sendStatus(500).json({ message: 'Error on saving updated user password' }); }
             return res.status(200).json({
               message: 'Password Updated Successfully'
            });
           });
         } else {
           return res.status(500).json({ message: 'Incorrect Current Password'});
         }
     });
   });
 }

/**
 * PUT /account/profileUpdate
 * Update Profile
 */
 export function saveSettings(req, res) {
  let findUserId;

  if (req.body.settingId) {
    findUserId = req.body.settingId;
  } else {
    findUserId = req.user.id;
  }

   const callback = (err, updated) => {
     if (err) { return res.status(500).json({ message: 'Email address Already Exist' }); }
     return res.send(updated);
   };
   User.findOneAndUpdate({_id: findUserId},
     req.body.values,
     {new: true}, callback);
 }

 /**
  * DELETE /account/delete
  * Delete user account.
 */
export function deleteAccount(req, res) {
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return res.status(500).json({ message: 'err' }); }
    if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
      log.info('Account has been deleted by' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
    }
  }
    res.clearCookie('sessionId');
    return res.status(200).json({
      message: 'Your account has been deleted.'
     });
  });
}

/**
  * Logout /logout
  * logout user account.
 */
export function logout(req, res) {
  res.clearCookie('sessionId');
  return res.status(200).json({
    message: 'You are Logout Successfully'
   });
}

export default {
  displaySettings,
  updatePassword,
  saveSettings,
  deleteAccount,
  logout
};
