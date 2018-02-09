import Profile from '../models/profile';
import User from '../models/user';
import log from '../utils/slackbot';
import {ENV} from '../config/appConfig';
import FtpHelper from '../utils/FtpHelper';
import {sendMatchProjectContact, sendAutoEmail} from '../utils/email';
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

function _processCompanyFile(projectFile, req, res) {
  const fileExtRegex = /\..+$/;
  // Make sure we don't append `undefined` to the filename
  if (!req.user || !req.user.userId) {
    return console.error('invalidReq Error @ ProfileController.updateProjectFile()');
  }
  // Create a unique ID with the userid for the file to find it later
  // const fileExt = fileExtRegex.exec(logoFile.logo.name)[0];
  const fileURI = 'projectFile-' + randomObjectId();
  // Upload the logo file to KeyCDN via FTP
  // console.log(fileURI, 'URI');
  // console.log(projectFile.logo.path, 'logo path');
 let projectType;

 if (req.headers.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
   projectType = '.doc';
 } else if (req.headers.type === 'application/pdf') {
    projectType = '.pdf';
 }

 const fileURItype = fileURI + projectType;

  FtpHelper.uploadFile(
    projectFile.projectfile.path,
    'projectFile/' + fileURItype,
    (err) => {
      if (err) {
        console.error('UploadError @ ProfileController.updateFile(): ', err);
        return res.status(500).send(err);
      }
    //  Remove the file locally after we've uploaded
      fs.unlink(projectFile.projectfile.path, (ioErr) => { // here as well
        if (ioErr) {
          console.error('ioErr @ ProfileController.updateFile(): ', ioErr);
          return res.status(500).send(ioErr);
        }
      });
    }
  );


const projectUrl = `projects.${req.headers.projectindex}.projectfileURI`;

Profile.findOneAndUpdate(
  {elasticId: req.user.userId},
  { $set:
      {
        [projectUrl]: fileURItype
      }
   },
  (dbErr, updatedProfile) => {
    if (dbErr) {
      console.error('dbErr @ ProfileController.updateLogo(): ', dbErr);
      return res.status(500).send(dbErr);
    }
    console.log(`Successfully updated projectfileURI ${fileURI} in DB!`);
    return res.status(200).send(updatedProfile);
  }
);
}

function _processCompanyFileProjectApplication(projectFile, req, res) {
    // console.log(projectFile)
    const fileExtRegex = /\..+$/;
    // Make sure we don't append `undefined` to the filename
    if (!req.user || !req.user.userId) {
      return console.error('invalidReq Error @ ProfileController.updateProjectFile()');
    }
    // Create a unique ID with the userid for the file to find it later
    // const fileExt = fileExtRegex.exec(logoFile.logo.name)[0];
    const fileURI = 'projectFile-' + randomObjectId();
    // Upload the logo file to KeyCDN via FTP
    // console.log(fileURI, 'URI');
    // console.log(projectFile.logo.path, 'logo path');
   let projectType;

   if (req.headers.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
     projectType = '.doc';
   } else if (req.headers.type === 'application/pdf') {
      projectType = '.pdf';
   }

   const fileURItype = fileURI + projectType;

    FtpHelper.uploadFile(
      // TODO: projectFile or projectFileApplication
      projectFile.projectfile.path,
      'projectFile/' + fileURItype,
      (err) => {
        if (err) {
          console.error('UploadError @ ProfileController.updateFile(): ', err);
          return res.status(500).send(err);
        }
      //  Remove the file locally after we've uploaded
        fs.unlink(projectFile.projectfile.path, (ioErr) => { // here as well
          if (ioErr) {
            console.error('ioErr @ ProfileController.updateFile(): ', ioErr);
            return res.status(500).send(ioErr);
          }
        });
      }
    );

  const projectUrl = `projectsApplication.${req.headers.projectindex}.projectfileApplicationURI`;
  Profile.findOneAndUpdate(
    {elasticId: req.user.userId},
    { $set:
        {
          [projectUrl]: fileURItype
        }
     },
    (dbErr, updatedProfile) => {
      if (dbErr) {
      console.error('dbErr @ ProfileController.updateLogo(): ', dbErr);
        return res.status(500).send(dbErr);
      }
      console.log(`Successfully updated projectfileApplicationURI; ${fileURI} in DB!`);
      return res.status(200).send(updatedProfile);
        }
      );
      }
// ##################
// ROUTE HANDLERS
// ##################

/**
 * GET /account/project
 * Display Profile
 */
export function displayProject(req, res) {
  Profile.findOne({elasticId: req.headers.userid}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    return res.json(profiles);
  });
}


export function displayProjectView(req, res) {
  Profile.findOne({elasticId: req.body.projectId}).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    return res.json(profiles);
  });
}


/**
 * GET /account/project
 * Display Profile
 */
export function displayTargetProject(req, res) {
  Profile.findOne({elasticId: req.body.profileId}).exec((err, targetProfiles) => {
    if (err) { return res.sendStatus(500); }
    return res.json(targetProfiles);
  });
}


export function displayProjectSignup(req, res) {
  Profile.findOne({'projects.projectId': Object.keys(req.body)[0]}, {
    'projects.$': 1,
  }).exec((err, profiles) => {
    if (err) { return res.sendStatus(500); }
    if (profiles === null) {
      return res.redirect('/');
    }
    return res.json(profiles);
  });
}

/**
 * PUT /account/profileUpdate
 * Update Profile
 */
 export function saveProject(req, res) {
   if (ENV === 'production') {
    if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
    if (req.body.addedProject) {
      log.info('Project has been saved by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid, '\nProjectLink:' + req.body.projectLink);
      sendAutoEmail(`Project has been posted by ${req.headers.firstname} ${req.headers.lastname} with link ${req.body.projectLink} `, req.headers.firstname, req.headers.lastname, req.headers.userid, req.headers.emailid, 'Project Created');
    }
   }

     console.log(`Project has been saved by ${req.headers.firstname}`);
     console.log(require('util').inspect(req.body, { depth: null }));
   }


  let projectMatchId;

  if (req.body.projectMatchId) {
    projectMatchId = req.body.projectMatchId;
  } else {
    projectMatchId = req.headers.userid;
  }

   const callback = (err, updated) => {
     if (err) { return res.sendStatus(500); }
     return res.send(updated);
   };
   Profile.findOneAndUpdate({elasticId: projectMatchId},
     req.body.updatedValue,
     {new: true}, callback);
 }

 export function contactProjectMatch(req, res) {
   let userInfo;
   Profile.findOne({elasticId: req.headers.userid}).exec((err, profiles) => {
     if (err) { return res.sendStatus(500); }
     const companyInfo = {
       senderCompanyName: profiles.companyName.typeValues || '',
       senderIndustry: profiles.industry.typeValues || '',
       senderHeadquarters: profiles.headquarters.typeValues || '',
       senderDescription: profiles.companyDescription.typeValues || '',
       senderCompanyStatus: profiles.companyStatus,
       searchType: req.body.searchType,
       senderFirstName: req.body.senderFirstName,
       senderLastName: req.body.senderLastName,
       emailaddress: req.body.emailaddress
     };

     if (ENV === 'development') {
       const matchValues = req.body;
       User.findOne({userId: matchValues.elasticId}).exec((saveerr, user) => {
         if (saveerr) { return res.sendStatus(500); }
         if (user) {
          userInfo = {
           matchFirstName: user.firstName,
           matchLastName: user.lastName,
           matchEmail: user.email
         };
         sendMatchProjectContact(matchValues, userInfo, companyInfo, process.env.hostName || 'http://localhost:3000'); // send invite email w/ verification token
        if (!req.headers.emailid.includes('digitalpartners.io') && !req.headers.emailid.includes('tractionb2b.com')) {
          sendAutoEmail(`Project Contact requested for ${matchValues.companyName.typeValues} by`, req.headers.firstname, req.headers.lastname, req.headers.userid, req.headers.emailid, 'Project Contact Requested');
        //  log.info('Project Contact Email sent by ' + req.headers.firstname + ' ' + req.headers.lastname + ' \n userID:' + req.headers.userid + '\nEmailId:' + req.headers.emailid);
         }
        }
       });
     }
      res.status(200).json({ message: 'Contact Details Send Successfully'});
   });
 }
 /**
  * POST /account/fileUpdate
  * Update the user's logo on KeyCDN
  */
 export function updateFile(req, res) {
   const form = new formidable.IncomingForm();
   let projectFile = null;
    form.uploadDir = path.join(__dirname);
    form.on('file', (field, file) => { projectFile = {[field]: file}; })
        .on('end', () => _processCompanyFile(projectFile, req, res));
    form.parse(req);
 }

 export function updateProjectApplicationFile(req, res) {
  const form = new formidable.IncomingForm();
  let projectFile = null;
   form.uploadDir = path.join(__dirname);
   form.on('file', (field, file) => { projectFile = {[field]: file}; })
       .on('end', () => _processCompanyFileProjectApplication(projectFile, req, res));
   form.parse(req);
}

 export function deleteFile(req, res) {
   const projectfileURI = req.body.projectfileURI;
   // Delete the file off the CDN
   FtpHelper.deleteFile('projectfile/' + projectfileURI, (err) => {
     if (err) {
       console.error('DeleteError @ ProfileController.deleteFile(): ', err);
       return res.status(500).send(err);
     }
     // Reset the `projectfileURI` string in the DB
     Profile.findOneAndUpdate(
       {elasticId: req.headers.userid},
       {projectfileURI: ''},
       {new: true},
       (dbErr, updatedProfile) => {
         if (dbErr) {
           console.error('DbError @ ProfileController.deleteFile(): ', dbErr);
           return res.status(500).send(dbErr);
         }
         console.log(`Project File ${projectfileURI} deleted successfully!`);
         return res.status(200).send(updatedProfile);
       }
     );
   });
 }

 export function deleteProjectApplicationFile(req, res) {
  const projectfileApplicationURI = req.body.projectfileApplicationURI;
  // Delete the file off the CDN
  FtpHelper.deleteFile('projectfile/' + projectfileApplicationURI, (err) => {
    if (err) {
      console.error('DeleteError @ ProfileController.deleteFile(): ', err);
      return res.status(500).send(err);
    }
    // Reset the `projectfileApplicationURI` string in the DB
    Profile.findOneAndUpdate(
      {elasticId: req.headers.userid},
      {projectfileApplicationURI: ''},
      {new: true},
      (dbErr, updatedProfile) => {
        if (dbErr) {
          console.error('DbError @ ProfileController.deleteFile(): ', dbErr);
          return res.status(500).send(dbErr);
        }
        console.log(`Project File ${projectfileApplicationURI} deleted successfully!`);
        return res.status(200).send(updatedProfile);
      }
    );
  });
}


export default {
  displayProject,
  displayProjectSignup,
  saveProject,
  displayTargetProject,
  contactProjectMatch,
  updateFile,
  updateProjectApplicationFile,
  deleteFile,
  deleteProjectApplicationFile,
  displayProjectView
};
