/**
 * Routes for express app
*/
const controllers = require('../controllers');

const usersController = controllers && controllers.users;
const settingsController = controllers && controllers.settings;
const profileController = controllers && controllers.profiles;
const contactController = controllers && controllers.contact;
const supportController = controllers && controllers.support;
const searchController = controllers && controllers.search;
const matchesController = controllers && controllers.matches;
const inviteTeamController = controllers && controllers.inviteTeam;
const invitePartnerController = controllers && controllers.invitePartner;
const projectController = controllers && controllers.projects;
const cmsController = controllers && controllers.cms;

export default (app) => {
  // user routes
  app.post('/signup', usersController.signUp);
  app.post('/login', usersController.login);
  app.post('/forgot', usersController.forgotPassword);
  app.put('/validate-email', usersController.validateEmail);
  app.put('/reset-password', usersController.resetPassword);
  app.put('/userFetch', usersController.userFetch);
  app.post('/notify', usersController.notify);

  // settings routes for updating password and deleting user
  app.get('/account/settings', settingsController.displaySettings);
  app.delete('/account/delete', settingsController.deleteAccount);
  app.put('/account/updatePassword', settingsController.updatePassword);
  app.put('/account/updateSettings', settingsController.saveSettings);
  app.post('/logout', settingsController.logout);

  // profile routes
  app.put('/account/id', profileController.displayCompName);
  app.get('/account/profile', profileController.displayProfile);
  app.get('/account/fetchProfileName', profileController.displayProfileName);
  app.put('/account/profileUpdate', profileController.saveProfile);
  app.post('/account/logoUpdate', profileController.updateLogo);
  app.delete('/account/logoDelete', profileController.deleteLogo);
  app.put('/account/adminprofile', profileController.displayAdminProfile);
  app.put('/account/adminprofileUpdate', profileController.saveAdminProfile);
  app.put('/account/targetprofileUpdate', profileController.saveTargetProfile);
  app.put('/account/statusprofileUpdate', profileController.saveStatusProfile);
  app.put('/account/saveProject', profileController.saveProject);
  app.put('/account/manualProfile', profileController.manualProfile);
  app.put('/account/realTimeProfile', profileController.realTimeProfile);
  app.put('/account/profileSignup', profileController.displayProfileSignup);
  app.get('/innovationTour2017', profileController.displayInnovationTour);
  app.get('/account/fetchfeedprofile', profileController.displayFeedProfile);


  // search routes
  app.get('/account/search', searchController.fetchSearches);
  app.put('/account/searchUpdate', searchController.saveSearch);
  app.delete('/account/searchDelete', searchController.deleteSearch);
  app.put('/account/refreshMatch', searchController.refreshMatch);
  app.put('/account/searchPreferencesUpdate', searchController.updateSearchPreferences);
  app.put('/account/searchSignup', searchController.displaySearchSignup);

  // Matches routes
  app.put('/account/matches', matchesController.fetchMatches);
  app.put('/account/saveMatch', matchesController.saveMatch);
  app.put('/account/updateMatch', matchesController.updateMatch);
  app.put('/contactMatch-email', matchesController.contactMatch);
  app.put('/account/matchCreate', matchesController.createMatch);

  // contact routes
  app.post('/account/contact', contactController.contactDetails);

  // support routes
  app.post('/account/support', supportController.supportDetails);

  // inviteTeamController routes
  app.post('/account/invite-team', inviteTeamController.inviteTeamMembers);
  app.put('/teamValidate-email', inviteTeamController.validateTeamMembers);

  // invitePartnerController routes
  app.post('/account/invite-partner', invitePartnerController.invitePartners);
  app.put('/partnerValidate-email', invitePartnerController.validatePartner);

  // projects routes
  app.get('/account/project', projectController.displayProject);
  app.put('/account/projectUpdate', projectController.saveProject);
  app.put('/account/viewproject', projectController.displayProjectView);
  app.put('/account/targetprofile', projectController.displayTargetProject);
  app.put('/contactProjectMatch-email', projectController.contactProjectMatch);
  app.put('/account/projectSignup', projectController.displayProjectSignup);
  app.post('/account/projectfileUpdate', projectController.updateFile);
  app.post('/account/projectfileApplicationUpdate', projectController.updateProjectApplicationFile);
  app.delete('/account/projectfileDelete', projectController.deleteFile);
  app.delete('/account/projectfileApplicationDelete', projectController.deleteProjectApplicationFile);

  // cms routes
  app.put('/account/cmsdropDown', cmsController.fetchCmsData);
};
