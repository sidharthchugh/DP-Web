import React from 'react';
import {fetchProfiles} from './actions/profiles';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Landing from './containers/Landing';
import SampleLogin from './containers/SampleLogin';
import Contact from './containers/Contact';
import Search from './containers/Search';
import Matches from './containers/Matches';
import Profile from './containers/Profile';
import Projects from './containers/Projects';
import ProjectSignup from './containers/ProjectSignup';
import ProfileSignup from './containers/ProfileSignup';
import SettingsSignup from './containers/SettingsSignup';
import ProfileNetwork from './containers/ProfileNetwork';
import ProjectView from './containers/ProjectView';
import MatchesSignup from './containers/MatchesSignup';
import Feed from './containers/Feed';
import Blog from './containers/Blog';
import Settings from './containers/Settings';
import Legal from './containers/Legal';
import FreAQ from './containers/FAQ';
import Support from './containers/Support';
import ValidateEmail from './containers/ValidateEmail';
import ResetPassword from './containers/ResetPassword';
import InviteTeam from './containers/InviteTeam';
import InvitePartner from './containers/InvitePartner';
import Imprint from './containers/Imprint';
import ValidateTeamMember from './containers/ValidateTeamMember';
import ValidatePartner from './containers/ValidatePartner';
import AdminProfile from './containers/AdminProfile';
import ProjectContact from './containers/ProjectContact';
import SearchSignup from './containers/SearchSignup';
import { addNotification } from './actions/notification';
import {ENV} from '../server/config/appConfig';
/*
/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */

 export default (store) => {
   const requireAuth = (nextState, replace, callback) => {
     const { user: { authenticated }} = store.getState();
     if (!authenticated) {
       replace({
         pathname: '/',
         state: { nextPathname: nextState.location.pathname }
       });

       store.dispatch(addNotification('You Need to Login', 'error', 'tc'));
     }
     callback();
   };

   const requireAuthProfileProd = (nextState, replace, callback) => {
     const { user: { authenticated }} = store.getState();
     if (!authenticated) {
       replace({
         pathname: '/',
         state: { nextPathname: nextState.location.pathname }
       });
      store.dispatch(addNotification('You Need to Login', 'error', 'tc'));
     } else if ((typeof window !== 'undefined') && !store.getState().profile.profiles) {
        // Check if store has profile values otherwise get it again
        store.dispatch(fetchProfiles());
     }
     callback();
   };

   const requireAuthProfileDev = (nextState, replace, callback) => {
     if ((typeof window !== 'undefined') && !store.getState().profile.profiles) {
        // Check if store has profile values otherwise get it again
        store.dispatch(fetchProfiles());
     }
     callback();
   };

   const redirectAuth = (nextState, replace, callback) => {
     const { user: { authenticated }} = store.getState();
     if (authenticated) {
       replace({
         pathname: '/profile'
       });
     }
     callback();
   };


    const redirectAdminAuth = (nextState, replace, callback) => {
     const { user} = store.getState();
     const admin = user.userObj && user.userObj.email.includes('digitalpartners.io');
     if (!user.authenticated) {
       replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
       });
     } else if (user.authenticated && !admin) {
        replace({
         pathname: '/profile'
       });
     }
     callback();
   };

   /*
    * Activate for Admin Profile Page
    *
   <Route path="fuck/:profileId" component={AdminProfile} />
   */

  return (
    <Route path="/" component={App} >
      <IndexRoute component={Landing} onEnter={ENV === 'production' ? redirectAuth : ''} />
      <Route path="landing/:projectId" component={Landing} />
      <Route path="claim/:claimprofileId" component={Landing} />
      <Route path="/legal" component={Legal} />
      <Route path="/faq" component={FreAQ} />
      <Route path="/login" component={SampleLogin} />
      <Route path="/signup" component={SampleLogin} />
      <Route path="/contact" component={Contact} />
      <Route path="/imprint" component={Imprint} />
      <Route path="/support" component={Support} />
      <Route path="validateEmail/:token" component={ValidateEmail} />
      <Route path="validateTeamMember/:teamToken" component={ValidateTeamMember} />
      <Route path="validatePartner/:partnerToken" component={ValidatePartner} />
      <Route path="resetPassword/:resetToken" component={ResetPassword} />
      <Route path="/profile" component={Profile} onEnter={ENV === 'production' ? requireAuth : ''} />
      <Route path="/feed" component={Feed} onEnter={ENV === 'production' ? requireAuth : ''} />
      <Route path="/blog" component={Blog} />
      <Route path="profiles/:profilesPlatformId" component={ProfileNetwork} onEnter={ENV === 'production' ? requireAuth : ''} />
      <Route path="adminProfile" component={AdminProfile} onEnter={ENV === 'production' ? redirectAdminAuth : ''} />
      <Route path="/settings" component={Settings} onEnter={ENV === 'production' ? requireAuth : ''} />
      <Route path="/search" component={Search} onEnter={ENV === 'production' ? requireAuth : ''} />
      <Route path="/matches" component={Matches} onEnter={ENV === 'production' ? requireAuth : ''} />
      <Route path="/projects" component={Projects} onEnter={ENV === 'production' ? requireAuth : ''} />
       <Route path="projectadmin/:projectId" component={ProjectView} onEnter={ENV === 'production' ? redirectAdminAuth : ''} />
      <Route path="settings/:settingId" component={SettingsSignup} onEnter={ENV === 'production' ? redirectAdminAuth : ''} />
      <Route path="projects/:projectId" component={ProjectSignup} />
      <Route path="profile/:profilesId" component={ProfileSignup} />
      <Route path="claimprofile/:claimprofilesId" component={ProfileSignup} />
      <Route path="search/:searchId" component={SearchSignup} onEnter={ENV === 'production' ? redirectAdminAuth : ''} />
      <Route path="matches/:searchId" component={MatchesSignup} onEnter={ENV === 'production' ? redirectAdminAuth : ''} />
      <Route path="projectContact" component={ProjectContact} onEnter={ENV === 'production' ? requireAuth : ''} />
      <Route path="inviteTeam" component={InviteTeam} onEnter={ENV === 'production' ? requireAuthProfileProd : requireAuthProfileDev} />
      <Route path="invitePartner" component={InvitePartner} onEnter={ENV === 'production' ? requireAuthProfileProd : requireAuthProfileDev} />
    </Route>
  );
};
