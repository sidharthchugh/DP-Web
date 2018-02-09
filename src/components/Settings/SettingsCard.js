import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/common/semantic.min.css';
import '../../styles/common/globals.css';
import '../../styles/components/settingspage';
import SettingsForm from './Forms/SettingsForm';
import settingsValues from './Forms/Values/SettingsValues';
import SettingsPasswordForm from './Forms/SettingsPasswordForm';
import strings from '../util/language';
import {Grid, Button} from 'semantic-ui-react';
import {Link} from 'react-router';


class SettingsCard extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);

    this.settingsPasswordResults = this.settingsPasswordResults.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.logout = this.logout.bind(this);
    this.handleRegistered = this.handleRegistered.bind(this);
    this.state = {
     showComponent: false,
     registered: false
   };
   this._onButtonClick = this._onButtonClick.bind(this);
  }


componentWillMount() {
    const {user} = this.props;
  }



// Getting values for Change of Password
  settingsPasswordResults(values) {
    const { updatePasword, addNotification } = this.props; // eslint-disable-line
    const credentials = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    };

    updatePasword(credentials)
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: false});
        addNotification(strings.passwordSaveNotify, 'success', 'tc');
      }
    });
  }

  handleRegistered() {
    this.setState({ registered: false});
  }

  // Send Values To Database
  saveSettings(values) {
    const { updateSettings, addNotification } = this.props;
    updateSettings({values})
    .then((response) => {
      if (response.payload.status === 200) {
         this.setState({ registered: false});
        addNotification(strings.settingsNotify, 'success', 'tc');
      }
    });
  }

  // Delete Current User and Logout
  deleteUser() {
    const { addNotification, deleteAccount } = this.props; // eslint-disable-line
    const confirmedDeletion = confirm(strings.accountdeleteNotify);
    if (confirmedDeletion) {
      deleteAccount()
      .then((response) => {
        if (response.payload.status === 200) {
          addNotification(response.payload.request.response.message, 'success', 'tc');
        }
        // Dirty Hack
        window.location = '/';
      });
    }
  }

  // User Logout
  logout() {
    const { addNotification, logoutUser } = this.props; // eslint-disable-line

    logoutUser()
    .then((response) => {
      if (response.payload.status === 200) {
        addNotification(response.payload.request.response.message, 'success', 'tc');
      }
      // Dirty Hack
      window.location = '/';
    });
  }

  _onButtonClick() {
     this.setState({
       registered: true,
     });
   }

  render() {
   const {user, userLanguage} = this.props;
   const {registered} = this.state;
   return (
     <Grid className="profile-form settings-page">
       <Grid.Column computer={12} className="profile-page-content no-gutter no-vertical-padding">
         <div className="profile-card general-info extended-card card-generic" id={'settings'}>
           <SettingsForm
            onSubmit={this.saveSettings}
            settingsDetails={settingsValues(user.userObj)}
            userLanguage={userLanguage}
            />
           <div className="profileSection" />
           <div className="change-password">
             <h3>
               <Button onClick={this._onButtonClick} className="button-small change-password-button">
                 {userLanguage === 'German' ? 'Passwort ändern' : 'Change Password'}
               </Button>
             </h3>
             <div className="input-background-white placeholder-center">
               <br />
               {registered &&
               <div>
                 <SettingsPasswordForm
                    onSubmit={this.settingsPasswordResults}
                    cancel={this.handleRegistered}
                    userLanguage={userLanguage} />
               </div>
              }
             </div>
           </div>
           <Grid>
             <Grid.Column computer={12} textAlign="right">
               <Button className="button-small logout" onClick={this.logout}>
                 {userLanguage === 'German' ? 'ABMELDEN' : 'LOG OUT'}
               </Button>
               <Button
                className="button-4 button-4--black delete-account"
                onClick={this.deleteUser}>
                 {userLanguage === 'German' ? 'ACCOUNT LÖSCHEN' : 'DELETE ACCOUNT'}
               </Button>
             </Grid.Column>
           </Grid>
           <br />
           { user.userObj.email.includes('digitalpartners') &&
              <Link to="adminProfile">
              <Button className="button-small change-password-button">
                Search Profile
               </Button>
              </Link>
           }
           <div className="settings-bottom" />
         </div>
       </Grid.Column>
     </Grid>
    );
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user,
    userLanguage: state.user.userObj.language
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(SettingsCard);
