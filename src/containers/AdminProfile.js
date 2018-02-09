import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StickyContainer} from 'react-sticky';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import AdminProfileCard from '../components/Profile/AdminProfileCard';
import '../styles/components/profilecard';
import { Grid } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import strings from '../components/util/language';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';

class AdminProfile extends Component {

  constructor(props) {
    super(props);
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
  render() {
    const {userLanguage} = this.props;
    return (
       <Grid className="common-background profile-page overflow-page">
        <Grid.Column computer={12}>
          <Grid container>
            <Grid.Column computer={12}>
              <ProfileHeader userLanguage={userLanguage} />
            </Grid.Column>
            <Grid.Column tablet={12} computer={12}>
              <StickyContainer>
               <AdminProfileCard userLanguage={userLanguage} strings={strings} />
              </StickyContainer>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
      );
   }
}

AdminProfile = withRouter(AdminProfile);

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    dirty: {
      /* Profile Forms */
      general: isDirty('GeneralInformation')(state),
      company: isDirty('CompanyDescription')(state),
      product: isDirty('Product')(state),
      reference: isDirty('Reference')(state),
    }
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(AdminProfile);
