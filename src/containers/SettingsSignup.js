import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSettings, updateSettings, updatePasword, userFetch, deleteAccount, logoutUser } from '../actions/users';
import { addNotification } from '../actions/notification';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import SettingsAdminCard from '../components/Settings/SettingsAdminCard';
import { Grid, Container } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import strings from '../components/util/language';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';
import Scrollchor from 'react-scrollchor';


class SettingsSignup extends Component {

  constructor(props) {
    super(props);
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  componentWillMount() {
    const {userFetch, fetchUser} = this.props;
    if (!fetchUser) {
      this.props.userFetch({userId: this.props.params.settingId});
    }
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
  const {updatePasword, fetchUser, updateSettings, deleteAccount, logoutUser , addNotification} = this.props; //eslint-disable-line
  return (
    <Grid className="common-background settings-page overflow-page">
      <Grid.Row>
        <Container fluid>
          <Grid container>
           <Grid.Column computer={12}>
              {fetchUser && fetchUser.language && <ProfileHeader userLanguage={fetchUser.language} />}
            </Grid.Column>
            <Grid.Column tablet={12} computer={9}>
              <SettingsAdminCard
                   user={fetchUser}
                   logoutUser={logoutUser}
                   updateSettings={updateSettings}
                   updatePasword={updatePasword}
                   deleteAccount={deleteAccount}
                   addNotification={addNotification}
                   settingId={this.props.params.settingId} />
            </Grid.Column>
            <Grid.Column tablet={12} computer={3} textAlign="center">
              <div className="profile-page-right-sidebarnavSettings">
                <div className="card-generic mobile hidden tablet hidden nav">
                  <h3 className="sidebar-headertitle" style={{'margin-left': '23px'}}>{strings.webAppNav4}</h3>
                </div>
              </div>
              <div className="profile-page-right-sidebar">
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </Grid.Row>
    </Grid>
    );
  }
}


SettingsSignup.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  updatePasword: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
};


SettingsSignup = withRouter(SettingsSignup);

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     fetchUser: state.user.fetchUser,
     dirty: {
       /* Settings Forms */
       settingsFrom: isDirty('SettingsForm')(state)
     }
 };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {updatePasword, userFetch, deleteAccount, logoutUser, addNotification, updateSettings})(SettingsSignup);
