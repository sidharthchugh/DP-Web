import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {inviteTeam} from '../actions/invites';
import { addNotification } from '../actions/notification';
import InviteTeamCard from '../components/Invite/InviteTeamCard';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import { reset } from 'redux-form';
import { Grid } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import '../styles/components/invite-team';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';

class InviteTeam extends Component {

  constructor(props) {
    super(props);
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
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
  const {inviteTeam, addNotification, reset, userLanguage} = this.props; //eslint-disable-line
  return (
    <section className="common-background inviteTeam-page overflow-page">
      <Grid centered container>
        <Grid.Row>
          <Grid.Column computer={12}>
            <ProfileHeader userLanguage={userLanguage} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column tablet={12} computer={9} className="no-gutter">
            <InviteTeamCard
              inviteTeam={inviteTeam}
              addNotification={addNotification}
              reset={reset}
              userLanguage={userLanguage}
              />
          </Grid.Column>
          <Grid.Column tablet={12} computer={3} textAlign="center">
            <div className="profile-page-right-sidebar">
              <ProfilePageRightSidebar userLanguage={userLanguage} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </section>
  );
}
}

InviteTeam.propTypes = {
  addNotification: PropTypes.func.isRequired
};

InviteTeam = withRouter(InviteTeam);

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    userLanguage: state.user.userObj.language,
    dirty: {
       inviteTeamForm: isDirty('InviteTeamForm')(state)
    }
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {inviteTeam, addNotification, reset})(InviteTeam);
