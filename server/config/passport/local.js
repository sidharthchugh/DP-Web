
/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';
/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
module.exports = new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({ email }, (findErr, user) => {
     if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
     return user.comparePassword(password, (passErr, isMatch) => {
       if (isMatch) {
         return done(null, user);
       }
       return done(null, false, { message: 'Your email or password combination is not correct.' });
     });
   });
});
