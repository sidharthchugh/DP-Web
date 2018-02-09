/*
 Configuring Jwt strategy to authenticate strategies
 Code modified from : https://github.com/joshuaslate/mern-starter/blob/master/server/config/passport.js
 */
 import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
 import User from '../../models/user';
 import {jwtSecret} from '../secrets';

// Setting JWT strategy options
 const jwtOptions = {
   // Telling Passport to check authorization headers for JWT
   jwtFromRequest: ExtractJwt.fromAuthHeader(),
   // Telling Passport where to find the secret
   secretOrKey: jwtSecret

   // TO-DO: Add issuer and audience checks
 };

 // Setting up JWT login strategy
module.exports = new JwtStrategy(jwtOptions, (payload, done) => {
   User.findById(payload._id, (err, user) => { //eslint-disable-line
     if (err) { return done(err, false); }

     if (user) {
       done(null, user);
     } else {
       done(null, false);
     }
   });
 });
