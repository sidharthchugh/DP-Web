import passport from 'passport';
import {ENV} from '../config/appConfig';
import Profile from '../models/profile';
import User from '../models/user';
import Search from '../models/search';
import utils from '../utils/index';
import log from '../utils/slackbot';
import crypto from 'crypto';
import {sendForgetEmail, sendAutoEmail, sendWelcomeEmail, sendResetEmail, sendPassiveEmail} from '../utils/email';

/**
 * POST /login
 * Login for existing users
 */

/* Elastic Search Sync */

// let countUser = 0;
// let countSearch = 0;
// let countProfile = 0;


// User.on('es-bulk-sent', function () {
//   console.log('buffer sent');
// });

// User.on('es-bulk-data', function (doc) {
//   countUser++;
// });

// User.on('es-bulk-error', function (err) {
//   console.error(err);
// });

// User
//   .esSynchronize()
//   .then(function () {
//    console.log('indexed ' + countUser + ' user documents!');
//   });


// Profile.on('es-bulk-sent', function () {});

// Profile.on('es-bulk-data', function (doc) {
//    countProfile++;
// });

// Profile.on('es-bulk-error', function (err) {});

// Profile
//   .esSynchronize()
//   .then(function () {
//       console.log('indexed ' + countProfile + ' profile documents!');
//   });


// Search.on('es-bulk-sent', function () {});

// Search.on('es-bulk-data', function (doc) {
//   countSearch++;
// });

// Search.on('es-bulk-error', function (err) {
//   console.error(err);
// });

// Search
//   .esSynchronize()
//   .then(function () {
//     console.log('indexed ' + countSearch + ' search documents!');
//   });


// const streamUser = User.synchronize();
// const streamSearch = Search.synchronize();
// const streamProfile = Profile.synchronize();
// let countUser = 0;
// let countSearch = 0;
// let countProfile = 0;

// streamUser.on('data', (err, doc) => {
//   countUser++;
// });
// streamUser.on('close', () => {
//   console.log('indexed ' + countUser + ' user documents!');
// });
// streamUser.on('error', (err) => {
//   console.log(err);
// });
// streamSearch.on('data', (err, doc) => {
//   countSearch++;
// });
// streamSearch.on('close', () => {
//   console.log('indexed ' + countSearch + ' search documents!');
// });
// streamSearch.on('error', (err) => {
//   console.log(err);
// });
// streamProfile.on('data', (err, doc) => {
//   countProfile++;
// });
// streamProfile.on('close', () => {
//   console.log('indexed ' + countProfile + ' profile documents!');
// });
// streamProfile.on('error', (err) => {
//   console.log(err);
// });

export function notify(req, res, next) {
//    if (ENV === 'production') {
//      sendNotifyEmail(user, process.env.hostName); // send contact email w/ user data
//      log.info('User Signup ' + req.body.email);
//  }
   res.status(200).json({ message: 'Email Send Successfully'});
//    next();
 }


 export function login(req, res, next) {
   // Do email and password validation for the server
   passport.authenticate('local', (authErr, user, info) => {
     if (authErr) return next(authErr);
     if (!user) {
       return res.status(401).json({ message: info.message });
     }
     // Passport exposes a login() function on req (also aliased as
     // logIn()) that can be used to establish a login session
     return req.logIn(user, (loginErr) => {
       if (loginErr) return res.status(401).json({ message: loginErr });
       if (!user.isEmailVerified) {
         return res.status(401).json({ message: 'Please Confirm your email'});
       }

       if (ENV === 'production') {
         if (!user.email.includes('digitalpartners.io') && !user.email.includes('tractionb2b.com')) {
           log.info(user.firstName + ' ' + user.firstName + ' Logged In\n userID:' + user.userId + '\nEmailId:' + user.email);
         }
        }


       const projectsApplication = {};

        function _queryProjects(projectId, callback) {
          Profile.find({'projects.projectId': projectId}, {
              elasticId: 1,
              industry: 1,
              sector: 1,
              organizationType: 1,
              'projects.$': 1,
              companyDescription: 1,
              companyName: 1,
              headquarters: 1
            }, (err, profiles) => {
              const projectProfile = JSON.stringify(profiles, null, '\t');
              const singleProjects = JSON.parse(projectProfile);
              if (singleProjects[0]) {
                projectsApplication.projectId = singleProjects[0].projects[0].projectId;
                projectsApplication.profileId = singleProjects[0].elasticId;
                projectsApplication.matchedProjects = singleProjects[0].projects[0];
                projectsApplication.industry = singleProjects[0].industry;
                projectsApplication.sector = singleProjects[0].sector;
                projectsApplication.organizationType = singleProjects[0].organizationType;
                projectsApplication.companyDescription = singleProjects[0].companyDescription;
                projectsApplication.companyName = singleProjects[0].companyName;
                projectsApplication.headquarters = singleProjects[0].headquarters;
                projectsApplication.logoURI = singleProjects[0].logoURI || '';
                projectsApplication.createdAt = Date.now();
                projectsApplication.projectApplyStatus = 'Saved';
                callback(null, projectsApplication);
              }
            });
        }


       const userID = JSON.stringify(user.userId);
       const profileId = JSON.parse(userID);

       // make sure to NOT pass password and anything sensitive inside token
       // Pass anything tht might be used in other parts of the app
        const token = utils.generateToken(user);

        user = utils.getCleanUser(user);


      if (req.body.projectId) {
        _queryProjects(req.body.projectId, (err, projects) => {
          Profile.findOne({elasticId: profileId}, (saveerr, docs) => {
          docs.projectsApplication = projects;

          docs.save((error) => {
              if (error) {
                  console.error('ERROR!');
              }
          });
      });
    });
  }
        return res.status(200).json({
          user,
          token
        });
     });
   })(req, res, next);
 }

 /**
 * PUT /validate-email
 * validate Email
 */
  export function validateEmail(req, res, next) {
   // check header or url parameters or post parameters for token
   const token = req.body.token;
   if (!token) {
     return res.status(401).json({
       message: 'Must pass token'
     });
   }

   User.findOne({
     verifyEmailToken: req.body.token,
     verifyEmailTokenExpires: {
       $gt: Date.now()
     }
   }, (err, user) => {
     if (!user) {
       return res.status(404).json({
         message: 'Email token is not valid or has expired'
       });
     }

     user.isEmailVerified = true;
     user.verifyEmailToken = undefined;
     user.verifyEmailTokenExpires = undefined;

     user.save((saveErr) => {
       if (saveErr) return next(saveErr);
       return req.logIn(user, (loginErr) => {
         if (loginErr) return res.status(401).json({ message: loginErr });
         return res.status(200).json({
            message: 'Email Verified Successfully'
          });
       });
     });
   });
 }

export function userFetch(req, res) {
 User.findOne({userId: req.body.userId}).exec((err, users) => {
    if (err) { return res.sendStatus(500); }
    return res.json(users);
  });
}


/**
* POST /forget
* Forget Password for User
*/
export function forgotPassword(req, res, next) {
  const email = req.body.email;

  User.findOne({ email }, (err, user) => {
    // If user is not found, return error
    if (err || user == null) {
      res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
      return next(err);
    }

      user.save((saveErr) => {
        // If error in saving token, return it
        if (saveErr) { return next(saveErr); }

        if (ENV === 'production') {
          sendForgetEmail(user, process.env.hostName); // send forget password token
        }

        res.status(200).json({ message: 'Please check your email for the link to reset your password.'});
        next();
      });
    });
}

/**
 * POST /signup
 * Create a new account
 */
export function signUp(req, res, next) {
  const lang = req.body.language ? req.body.language : 'German';
  // Create User in Database
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    language: lang,
    role: req.body.role,
    userCompany: req.body.userCompany,
    userPhone: req.body.userPhone,
    isEmailVerified: ENV === 'development'
  });

const projectsApplication = {};

function _queryProjects(projectId, callback) {
   Profile.find({'projects.projectId': projectId}, {
      elasticId: 1,
      industry: 1,
      sector: 1,
      organizationType: 1,
      'projects.$': 1,
      companyDescription: 1,
      companyName: 1,
      headquarters: 1
    }, (err, profiles) => {
      const projectProfile = JSON.stringify(profiles, null, '\t');
      const singleProjects = JSON.parse(projectProfile);
      if (singleProjects[0]) {
        projectsApplication.projectId = singleProjects[0].projects[0].projectId;
        projectsApplication.profileId = singleProjects[0].elasticId;
        projectsApplication.matchedProjects = singleProjects[0].projects[0];
        projectsApplication.industry = singleProjects[0].industry;
        projectsApplication.sector = singleProjects[0].sector;
        projectsApplication.organizationType = singleProjects[0].organizationType;
        projectsApplication.companyDescription = singleProjects[0].companyDescription;
        projectsApplication.companyName = singleProjects[0].companyName;
        projectsApplication.headquarters = singleProjects[0].headquarters;
        projectsApplication.logoURI = singleProjects[0].logoURI || '';
        projectsApplication.projectApplyStatus = 'Saved';
        callback(null, projectsApplication);
      }
    });
}

  const profile = new Profile({
      companyStatus: 'Active',
      companyName: {
        type: 'string',
        typeValues: req.body.userCompany,
        ko: ''
       }
  });

  // Create Dummy Search for the Search Table in Database
  const search = new Search({
    searchId: profile.elasticId,
    searchPreferences: [{}]
  });

  profile.profileLinkName = (ENV === 'development' ? 'http://localhost:3000/profile/' : 'https://digitalpartners.io/profile/') + profile.elasticId;
 
  if (req.body.claimprofilesId) {
    user.userId = req.body.claimprofilesId;
  } else {
    user.userId = profile.elasticId;
  }

  User.findOne({ email: req.body.email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'This e-mail address has been registered already!'});
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);

      if (ENV === 'production') {
        sendWelcomeEmail(user, process.env.hostName); // send welcome email w/ verification token
      }

      const userId = user.userId;

      const token = utils.generateToken(user);

      user = utils.getCleanUser(user);

       if (!req.body.claimprofilesId) {
          if (req.body.projectId) {
            _queryProjects(req.body.projectId, (err, projects) => {
              profile.projectsApplication = projects;
              profile.save((error) => {
                    if (error) {
                        console.error('Error on profile.save()', error);
                      }
                  });
              });
          } else {
            profile.save((error) => {
                if (error) {
                    console.error('Error on profile.save()', error);
                  }
              });
          }
        }

      // Save Search
      search.save((err) => {
        if (err) {
            console.error('Error on search.save()', err);
          }
      });

      const userEmail = req.body.email;
      const emailParse = /@(.+)/.exec(userEmail)[1];

      Profile.esSearch({
        query: {
          bool: {
            should: [
              {
                regexp: {
                  'companyName.typeValues': req.body.userCompany
                }
              },
              {
                fuzzy: {
                  'companyWebsite.typeValues': emailParse
                }
              },
              {
                regexp: {
                  'companyEmail.typeValues': emailParse
                }
              }
            ],
            minimum_should_match: '1'
          }
        }
      }, (err, results) => {
        if (results && ENV === 'production') {
          if (!req.body.email.includes('digitalpartners.io') && !req.body.email.includes('tractionb2b.com')) {
             log.info(req.body.firstName + ' ' + req.body.lastName + ' SignUp\nEmailId:' + req.body.email, 'Double SignedUp Alert');
            sendAutoEmail(`${req.body.firstName} ${req.body.lastName} User Signed up up with Profile Link ${profile.profileLinkName} -----Double SignedUp Alert----`, req.body.firstName, req.body.lastName, userId, req.body.email, 'User Signed up -----Double SignedUp Alert----');
            // once you have the active users and passive users situated then this is where you will add the preventation.
            // sendPassiveEmail(user, process.env.hostName);
         }
       } else if (!results && ENV === 'production') {
          if (!req.body.email.includes('digitalpartners.io') && !req.body.email.includes('tractionb2b.com')) {
             log.info(req.body.firstName + ' ' + req.body.lastName + ' SignUp\nEmailId:' + req.body.email + '\nProfileLink:' + profile.profileLinkName);
            sendAutoEmail(`${req.body.firstName} ${req.body.lastName} User Signed up with Profile Link ${profile.profileLinkName}`, req.body.firstName, req.body.lastName, userId, req.body.email, 'User Signed up');
         }
       }
       return res.status(200).json({
         user,
         token
       });
      });

    // Profile.findOne({ 'companyName.typeValues': { $regex: req.body.userCompany, $options: 'i' }}, (findProfileErr, existingProfile) => {
    //   if (existingProfile && ENV === 'production') {
    //      if (!req.body.email.includes('digitalpartners.io') && !req.body.email.includes('tractionb2b.com')) {
    //         log.info(req.body.firstName + ' ' + req.body.lastName + ' SignUp\nEmailId:' + req.body.email, 'Double SignedUp Alert');
    //        sendAutoEmail(`${req.body.firstName} ${req.body.lastName} User Signed up -----Double SignedUp Alert----`, req.body.firstName, req.body.lastName, userId, req.body.email, 'User Signed up -----Double SignedUp Alert----');
    //        // once you have the active users and passive users situated then this is where you will add the preventation.
    //        console.log('this is working');
    //     }
    //   } else if (!existingProfile && ENV === 'production') {
    //      if (!req.body.email.includes('digitalpartners.io') && !req.body.email.includes('tractionb2b.com')) {
    //         log.info(req.body.firstName + ' ' + req.body.lastName + ' SignUp\nEmailId:' + req.body.email + '\nProfileLink:' + profile.profileLinkName);
    //        sendAutoEmail(`${req.body.firstName} ${req.body.lastName} User Signed up with Profile Link ${profile.profileLinkName}`, req.body.firstName, req.body.lastName, userId, req.body.email, 'User Signed up');
    //     }
    //   }
    //   return res.status(200).json({
    //     user,
    //     token
    //   });
    // });
  });
   });
 }

 /**
  * POST /resetPassword
  * Reseting Password of the User
  */
  export function resetPassword(req, res, next) {
   // check header or url parameters or post parameters for token
   const resetToken = req.body.resetToken;
   if (!resetToken) {
     return res.status(401).json({
       message: 'Must pass token'
     });
   }

   User.findOne({
     resetPasswordToken: req.body.resetToken,
     resetPasswordExpires: {
       $gt: Date.now()
     }
   }, (err, user) => {
     if (!user) {
       return res.status(404).json({
         message: 'Email token is not valid or has expired'
       });
     }

     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpires = undefined;

     user.save((saveErr) => {
       if (saveErr) return next(saveErr);
       return req.logIn(user, (loginErr) => {
         if (loginErr) return res.status(401).json({ message: loginErr });
         if (!user.isEmailVerified) {
           return res.status(300).json({ message: 'Please Confirm your email'});
         }
         if (ENV === 'production') {
           sendResetEmail(user, process.env.hostName); // send reset email
         }
         return res.status(200).json({
            message: 'Password changed successfully'
          });
       });
     });
   });
 }

export default {
  login,
  signUp,
  validateEmail,
  resetPassword,
  forgotPassword,
  userFetch,
  notify
};
