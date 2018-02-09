import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/common/semantic.min.css';
import '../../styles/common/globals.css';
import '../../styles/components/settingspage';
import SettingsAdminForm from './Forms/SettingsAdminForm';
import {userFetch} from 'actions/users';
import settingsValues from './Forms/Values/SettingsValues';
import SettingsPasswordForm from './Forms/SettingsPasswordForm';
import strings from '../util/language';
import {Grid, Button} from 'semantic-ui-react';
import {Link} from 'react-router';


class SettingsAdminCard extends Component {
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
    updateSettings({values, settingId: this.props.user._id})
    .then((response) => {
      if (response.payload.status === 200) {
         this.setState({ registered: false});
        addNotification(strings.settingsNotify, 'success', 'tc');
         this.props.userFetch({userId: this.props.user.userId});
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
           <SettingsAdminForm
            onSubmit={this.saveSettings}
            settingsDetails={settingsValues(this.props.user)}
            settingsValues={this.props.user}
            userLanguage={userLanguage}
            />
           <div className="profileSection" />
           <br />
           <div className="settings-bottom" />
         </div>
       </Grid.Column>
     </Grid>
    );
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps() {
  return {
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {userFetch})(SettingsAdminCard);
