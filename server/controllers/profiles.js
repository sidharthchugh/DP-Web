import Profile from '../models/profile';
import User from '../models/user';
import log from '../utils/slackbot';
import {ENV} from '../config/appConfig';
import FtpHelper from '../utils/FtpHelper';
import {sendAutoEmail} from '../utils/email';
import crypto from 'crypto';

const formidable = require('formidable');
const path = require('path');
const fs = require('fs');


// ##################
// PRIVATE METHODS
// ##################


 function randomObjectId() {
        return crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
 }

// TODO Ben: This is messy with callbacks, should rewrite with Promises.
function _processLogoFile(logoFile, req, res) {
  const fileExtRegex = /\..+$/;
  // Make sure we don't append `undefined` to the filename
  if (!req.user || !req.user.userId) {
    return console.error('invalidReq Error @ ProfileController.updateLogo()');
  }
  // Create a unique ID with the userid for the file to find it later
  // const fileExt = fileExtRegex.exec(logoFile.logo.name)[0];
  const fileURI = 'companylogo-' + randomObjectId();
  // Upload the logo file to KeyCDN via FTP
  FtpHelper.uploadFile(
    logoFile.logo.path,
    'companylogos/' + fileURI,
    (err) => {
      if (err) {
        console.error('UploadError @ ProfileController.updateLogo(): ', err);
        return res.status(500).send(err);
      }
      // Remove the file locally after we've uploaded
      fs.unlink(logoFile.logo.path, (ioErr) => {
        if (ioErr) {
          console.error('ioErr @ ProfileController.updateLogo(): ', ioErr);
          return res.status(500).send(ioErr);
        }
      });
    }
    );

    // Update the URI string in the DB
    Profile.findOneAndUpdate(
      {elasticId: req.user.userId},
      {logoURI: fileURI},
      {new: true},
      (dbErr, updatedProfile) => {
        if (dbErr) {
          console.error('dbErr @ ProfileController.updateLogo(): ', dbErr);
          return res.status(500).send(dbErr);
        }
        console.log(`Successfully updated logoURI ${fileURI} in DB!`);
        return res.status(200).send(updatedProfile);
      }
    );
}


// ##################
// ROUTE HANDLERS
// ##################

/**
 * GET /account/profile
 * Display Profile
 */
export function displayProfile(req, res) {
  Profile.findOne({elasticId: req.headers.userid}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    return res.json(profiles);
  });
}


export function displayInnovationTour(req, res) {
 fs.readFile(path.join(__dirname) + '/../../Innovationtour2017.pdf', 'binary', (error, file) => {
   if (error) {
    res.writeHead(500, {'Content-Type': 'text/plain' });
    res.write(error + '\n');
    res.end();
   } else {
    res.writeHead(200, {'Content-Type': 'application/pdf' });
    res.write(file, 'binary');
    res.end();
  }
 });
}


// Profile.findOneAndRemove({elasticId: '5991a16d73838d1ef9ea84a9'}).exec((err, profiles) => {
//     if (err) { return res.såendStatus(500); }
//     return res.json(profiles);
// });

/**
 * GET /account/profile
 * Display Profile
 */
export function realTimeProfile(req, res) {
  Profile.findOne({elasticId: req.body.elasticSearch}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    return res.json([profiles]);
  });
}


export function displayFeedProfile(req, res) {
 Profile.esSearch({
    from: 0,
    size: 50,
    query: {
     bool: {
      must_not: [
        {
          match: {
            feedProductUpdatedAt: 0
          }
        },
        {
          match: {
            'products.productName.typeValues': ''
          }
        }
       ]
     }
    },
    sort: [
      {
        feedProductUpdatedAt: {
          order: 'desc'
        }
      }
    ]
  }, (error, results) => {
    const products = results ? results.hits.hits.map((a) => { return Object.assign({}, {_id: a._source.elasticId}, a._source); }) : [];
    const postedProducts = products && products.map((profilesProducts) => {
       profilesProducts.posted = 'products';
       profilesProducts.feedProjectUpdatedAt = profilesProducts.feedProductUpdatedAt;
       delete profilesProducts.feedProductUpdatedAt;
       return profilesProducts;
    });
    Profile.esSearch({
    from: 0,
    size: 50,
     query: {
     bool: {
      must_not: [
        {
          match: {
            feedProjectUpdatedAt: 0
          }
        },
        {
          match: {
            'projects.projectName.typeValues': ''
          }
        }
       ]
     }
    },
    sort: [
      {
        feedProjectUpdatedAt: {
          order: 'desc'
        }
      }
    ]
  }, (errorproject, projectresults) => {
      const projects = projectresults ? projectresults.hits.hits.map((a) => { return Object.assign({}, {_id: a._source.elasticId}, a._source); }) : [];
      const postedProjects = projects && projects.map((profilesProjects) => {
       profilesProjects.posted = 'projects';
       delete profilesProjects.feedProductUpdatedAt;
       return profilesProjects;
    });

     const postedProductFeed = postedProducts.filter((company) => {
      return company.companyWebsite.typeValues !== 'https://digitalpartners.io' && (company.products.length > 0 && company.products[0].productName.typeValues !== '');
    });

     const postedProjectsFeed = postedProjects.filter((company) => {
      return company.companyWebsite.typeValues !== 'https://digitalpartners.io' && (company.projects.length > 0 && company.projects[0].projectName.typeValues !== '');
    });

    const completeFeed = [...postedProductFeed, ...postedProjectsFeed];

    let newsFeedMatch = [];

    newsFeedMatch = completeFeed.sort((a, b) => {
      if (b.feedProjectUpdatedAt > a.feedProjectUpdatedAt) return 1;
      if (b.feedProjectUpdatedAt < a.feedProjectUpdatedAt) return -1;
    return 0;
    });

      return res.json(newsFeedMatch.slice(0, 5));
   });
  });
}


/**
 * GET /account/profile
 * Display Profile
 */
export function displayTargetProfile(req, res) {
  Profile.findOne({elasticId: req.body.profileId}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    return res.json(profiles);
  });
}

export function saveTargetProfile(req, res) {
  if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
     log.info('Profile has been saved by ' + req.headers.firstname + ' ' + req.headers.lastname);
     log.info(require('util').inspect(req.body, { depth: null }));
   }

     console.log(`Profile has been saved by ${req.headers.firstname}`);
     console.log(require('util').inspect(req.body, { depth: null }));
   }

   const callback = (err, updated) => {
     if (err) { return res.sendStatus(500); }
     return res.send(updated);
   };
   Profile.findOneAndUpdate({elasticId: req.body.profileId},
     req.body.updatedReceivedValues,
     {new: true}, callback);
}


/**
 * GET /account/fetchCompanyName
 * Display Profile
 */
export function displayProfileName(req, res) {
    Profile.esSearch({
    from: 0,
    size: 10000,
    _source: {
        includes: ['companyName.typeValues']
    },
    query: {
      bool: {
        must_not: [
          {
            match: {
              elasticId: req.headers.userid
            }
          }
        ]
      }
    }
  }, (error, results) => {
      if (error) console.log(error);
        const matchableProfiles = results.hits ? results.hits.hits.map((a) => { return Object.assign({}, {name: a._source.companyName.typeValues}); }) : [];
          return res.json(matchableProfiles);
  });
}


/**
 * GET /account/profile
 * Display Profile
 */
export function displayAdminProfile(req, res) {
  Profile.findOne({'companyName.typeValues': Object.keys(req.body)[0]}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    if (!profiles) {
      // Create Dummy Profile for the User in Database
      const profile = new Profile({
          companyStatus: 'Passive',
          companyName: {
            typeValues: Object.keys(req.body)[0]}
          });
          profile.save((adminerr) => {
            if (adminerr) {
                console.error('Error on profile.save()', err);
          }
      });
  } else {
    return res.json(profiles);
  }
  });
}




/**
 * PUT /account/profileUpdate
 * Update Profile
 */
 export function saveProfile(req, res) {
   const callback = (err, updated) => {
     if (err) { return res.sendStatus(500); }
   if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
     if (req.body.addedProduct) {
     sendAutoEmail(`Product has been created by ${req.headers.firstname} ${req.headers.lastname}`, req.headers.firstname, req.headers.lastname, req.headers.userid, req.headers.emailid, 'Product Created');
     log.info('Product has been created by' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid + '\nProfile Link:' + updated.profileLinkName);
     } else {
       log.info('Profile has been saved by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid + '\nProfile Link:' + updated.profileLinkName);
     }
   }
     console.log(`Profile has been saved by ${req.headers.firstname}`);
     console.log(require('util').inspect(req.body, { depth: null }));
   }
     return res.send(updated);
   };

   let searchProfile;
   if (req.body.searchProfileId) {
     searchProfile = req.body.searchProfileId;
   } else {
     searchProfile = req.headers.userid;
   }

   Profile.findOneAndUpdate({elasticId: searchProfile},
     req.body.updatedValue,
     {new: true}, callback);

  /* News Feed Updates */

//  Profile.findOne({elasticId: '593664b2314ad04ef41778ae'}).exec((err, profiles) => {
//     profiles.job = 0;
//    profiles.save(); // => job fields will be set to null on Elasticsearch
//   });

  //  Profile.findOneAndUpdate({elasticId: '598d91024f31c316a8e4ea86'},
  //    req.body.updatedValue,
  //    {new: true}, callback);
 }

  /* News Feed Updates */
  //  Profile.findOneAndUpdate({elasticId: '59a54621ab2c6310d512987a'},
  //    {feedProductUpdatedAt: 1504877370196},
  //    {new: true}, callback);



  export function manualProfile(req, res) {
   if (req.body.userSearch) {
    User.esSearch({
      from: 0,
      size: 5,
      query: {
        bool: {
          must: [
            {
              match_phrase: {
                email: req.body.userSearch
              }
            }
          ]
        }
      }
    }, (error, results) => {
        const userProfiles = results.hits && results.hits.hits ? results.hits.hits.map((a) => { return Object.assign({}, {_id: a._source.userId}, a._source); }) : [];
        if (error) { return res.sendStatus(500); }
         Profile.esSearch({
          from: 0,
          size: 5,
          query: {
            bool: {
              must: [
                {
                  match_phrase: {
                    elasticId: userProfiles[0].userId
                  }
                }
              ]
            }
          }
        }, (errorProfile, resultsProfiles) => {
            const matchableProfiles = resultsProfiles.hits && resultsProfiles.hits.hits ? resultsProfiles.hits.hits.map((a) => { return Object.assign({}, {_id: a._source.elasticId}, a._source); }) : [];
            if (errorProfile) { return res.sendStatus(500); }
          return res.json(JSON.stringify(matchableProfiles, null, '\t'));
        });
     });
   } else {
      Profile.esSearch({
      from: 0,
      size: 5,
      query: {
        bool: {
          must: [
            {
              match_phrase: {
                'companyName.typeValues': req.body.profileSearch
              }
            }
          ]
        }
      }
    }, (error, results) => {
        const matchableProfiles = results.hits ? results.hits.hits.map((a) => { return Object.assign({}, {_id: a._source.elasticId}, a._source); }) : [];
        if (error) { return res.sendStatus(500); }
      return res.json(JSON.stringify(matchableProfiles, null, '\t'));
    });
   }
 }


 /**
 * PUT /account/profileUpdate
 * Update Profile
 */
 export function saveStatusProfile(req, res) {
   if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
     sendAutoEmail(`Project Status Changed to  ${req.body.status} by ${req.headers.firstname} ${req.headers.lastname}`, req.headers.firstname, req.headers.lastname, req.headers.userid, req.headers.emailid, 'Project Status Changed');
     log.info(`Project Status has been changed to ${req.body.status} by ` + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
   }

     console.log(`Profile has been saved by ${req.headers.firstname}`);
     console.log(require('util').inspect(req.body, { depth: null }));
   }

   let statusID;

   const updatedId = req.body.isProgress;
    const status = req.body.status;
    if (req.body.statusID) {
        statusID = req.body.statusID;
    } else {
        statusID = req.headers.userid;
    }

    const callback = (err, updated) => {
      if (err) { return res.sendStatus(500); }
      return res.send(updated);
    };
      Profile.findOneAndUpdate(
     {elasticId: statusID, 'projectsApplication.projectId': updatedId},
     {$set: {'projectsApplication.$.projectApplyStatus': status}}, callback);
 }


 /**
 * PUT /account/profileUpdate
 * Update Profile
 */
 export function saveProject(req, res) {
   if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
     sendAutoEmail('Project has been saved by', req.headers.firstname, req.headers.lastname, req.headers.userid, req.headers.emailid, 'Project Created');
     log.info('Project has been saved by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
   }

     console.log(`Profile has been saved by ${req.headers.firstname}`);
     console.log(require('util').inspect(req.body, { depth: null }));
   }

   const updatedId = req.body.updatedId;
   const savedProject = req.body.savedProject;

    const callback = (err, updated) => {
      if (err) { return res.sendStatus(500); }
      return res.send(updated);
    };
    Profile.findOneAndUpdate(
     {elasticId: req.headers.userid, 'projectsApplication.projectId': updatedId},
     {$set: {'projectsApplication.$': savedProject}}, {new: true}, callback);
 }


 /**
  * PUT /account/profileUpdate
  * Update Profile
  */
  export function saveAdminProfile(req, res) {
     const profile = new Profile({
       companyStatus: 'Passive',
       companyName: {
         typeValues: req.body.companyName
       }
     });

   profile.save((error, profiles) => {
     console.log(profiles, 'profiles db');
      if (error) {
          console.error('Error on profile.save()', error);
        }
    return res.send([profiles]);
    });
  }
 /**
  * POST /account/logoUpdate
  * Update the user's logo on KeyCDN
  */
 export function updateLogo(req, res) {
   const form = new formidable.IncomingForm();
   let logoFile = null;

    form.uploadDir = path.join(__dirname);
    form.on('file', (field, file) => { logoFile = {[field]: file}; })
        .on('end', () => _processLogoFile(logoFile, req, res));
    form.parse(req);
 }

 export function deleteLogo(req, res) {
   const logoURI = req.body.logoURI;
   // Delete the file off the CDN
   FtpHelper.deleteFile('companylogos/' + logoURI, (err) => {
     if (err) {
       console.error('DeleteError @ ProfileController.deleteLogo(): ', err);
       return res.status(500).send(err);
     }
     // Reset the `logoURI` string in the DB
     Profile.findOneAndUpdate(
       {elasticId: req.headers.userid},
       {logoURI: ''},
       {new: true},
       (dbErr, updatedProfile) => {
         if (dbErr) {
           console.error('DbError @ ProfileController.deleteLogo(): ', dbErr);
           return res.status(500).send(dbErr);
         }
         console.log(`Company Logo ${logoURI} deleted successfully!`);
         return res.status(200).send(updatedProfile);
       }
     );
   });
 }

export function displayProfileSignup(req, res) {
  Profile.findOne({elasticId: req.body.profilesId}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    return res.json(profiles);
  });
}

export function displayCompName(req, res) {
 Profile.esSearch({
    from: 0,
    size: 10,
    query: {
      bool: {
        must: [
          {
            prefix: {
              'companyName.typeValues': req.body.profileSearch
            }
          }
        ]
      }
    }
  }, (error, results) => {
      const matchableProfiles = results.hits ? results.hits.hits.map((a) => { return Object.assign({}, {_id: a._source.elasticId}, a._source); }) : [];
      if (error) { return res.sendStatus(500); }
       let dropDownCompany = [];
        if (matchableProfiles.length > 0) {
          dropDownCompany = matchableProfiles.map((i) => {
          return { compname: i.companyName.typeValues, searchId: i.elasticId };
        });
          return res.json(dropDownCompany);
        } else {
          return res.json(dropDownCompany);
        }
  });
}

export default {
  displayCompName,
  displayProfile,
  saveProfile,
  updateLogo,
  deleteLogo,
  displayAdminProfile,
  saveAdminProfile,
  displayTargetProfile,
  saveTargetProfile,
  displayProfileName,
  saveStatusProfile,
  saveProject,
  manualProfile,
  realTimeProfile,
  displayProfileSignup,
  displayInnovationTour,
  displayFeedProfile
};
