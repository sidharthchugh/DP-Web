import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {StickyContainer} from 'react-sticky';
import { addNotification } from '../actions/notification';
import {updateSearches, toggleSearchEdit} from '../actions/searches';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import SearchCard from '../components/Search/SearchCard';
import { Grid, Container } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import strings from '../components/util/language';
import SidebarSearches from '../components/Reusable/sidebarSearches';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';

class SearchSignup extends Component {
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
    const {searches, updateSearches, toggleSearchEdit, addNotification, userLanguage, userRole} = this.props;
    return (
      <Grid className="common-background search-page overflow-page">
        <Grid.Row>
          <Container fluid>
            <Grid container>
              <Grid.Column computer={12}>
                <ProfileHeader userLanguage={userLanguage} />
              </Grid.Column>
              <Grid.Column tablet={12} computer={9}>
                <StickyContainer>
                  <SearchCard
                    addNotification={addNotification}
                    updateSearches={updateSearches}
                    toggleSearchEdit={toggleSearchEdit}
                    userLanguage={userLanguage}
                    userRole={userRole}
                    searchId={this.props.params.searchId}
                  />
                </StickyContainer>
              </Grid.Column>
              <Grid.Column tablet={12} computer={3} textAlign="center">
                <div className="profile-page-right-sidebarnavSearch">
                  <SidebarSearches userLanguage={userLanguage} strings={strings} searchId={this.props.params.searchId} />
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

SearchSignup.propTypes = {
  updateSearches: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleSearchEdit: PropTypes.func.isRequired
};

SearchSignup = withRouter(SearchSignup);


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    userLanguage: state.user.userObj.language,
    userRole: state.user.userObj.role,
    /* Search Forms */
    dirty: {
      strategicPartnerDetailSearch: isDirty('StrategicPartnerDetailSearch')(state),
      productServiceSearch: isDirty('ProductServiceSearch')(state)
    }
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {addNotification, updateSearches, toggleSearchEdit})(SearchSignup);
