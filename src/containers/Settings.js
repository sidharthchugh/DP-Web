import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSettings, updateSettings, updatePasword, deleteAccount, logoutUser } from '../actions/users';
import { addNotification } from '../actions/notification';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import SettingsCard from '../components/Settings/SettingsCard';
import { Grid, Container } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import strings from '../components/util/language';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';
import Scrollchor from 'react-scrollchor';


class Settings extends Component {

  constructor(props) {
    super(props);
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  componentWillMount() {
    const {userLanguage} = this.props;
    if (userLanguage === 'German') {
      strings.setLanguage('de');
    } else {
      strings.setLanguage('en');
    }
    this.setState({});
  }

  routerWillLeave(nextLocation) {
      const self = this;
      // return false to prevent a transition w/o prompting the user,
      // or return a string to allow the user to decide:
      for (const key in self.props.dirty) {
        if (self.props.dirty[key]) {
          return 'Your work is not saved! Are you sure you want to leave?';
        }
      }
  }

  render() {
  const {updatePasword, user, updateSettings, deleteAccount, logoutUser , addNotification, userLanguage} = this.props; //eslint-disable-line
  return (
    <Grid className="common-background settings-page overflow-page">
      <Grid.Row>
        <Container fluid>
          <Grid container>
            <Grid.Column computer={12}>
              <ProfileHeader userLanguage={userLanguage} />
            </Grid.Column>
            <Grid.Column tablet={12} computer={9}>
              <SettingsCard
                   user={user}
                   logoutUser={logoutUser}
                   updateSettings={updateSettings}
                   updatePasword={updatePasword}
                   deleteAccount={deleteAccount}
                   addNotification={addNotification} />
            </Grid.Column>
            <Grid.Column tablet={12} computer={3} textAlign="center">
              <div className="profile-page-right-sidebarnavSettings">
                <div className="card-generic mobile hidden tablet hidden nav">
                  <h3 className="sidebar-headertitle" style={{'margin-left': '23px'}}>{strings.webAppNav4}</h3>
                </div>
              </div>
              <div className="profile-page-right-sidebar">
                <ProfilePageRightSidebar userLanguage={userLanguage} strings={strings} />
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </Grid.Row>
    </Grid>
    );
  }
}


Settings.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  updatePasword: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
};


Settings = withRouter(Settings);

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     user: state.user.userObj,
     userLanguage: state.user.userObj.language,
     dirty: {
       /* Settings Forms */
       settingsFrom: isDirty('SettingsForm')(state)
     }
 };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {updatePasword, deleteAccount, logoutUser, addNotification, updateSettings})(Settings);
