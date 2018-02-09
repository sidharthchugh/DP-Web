import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StickyContainer} from 'react-sticky';
import ProfileHeader from 'components/Reusable/ProfileHeader';
import ProfileCard from 'components/Profile/ProfileCard';
import 'styles/components/profilecard';
import { Grid } from 'semantic-ui-react';
import ProfilePageRightSidebar from 'components/Reusable/ProfileRightSidebar';
import strings from 'components/util/language';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';

class FullProfileCard extends Component {

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
    const {userLanguage, fullprofile, matchLogo} = this.props;
    return (
      <section className="common-background profile-page full-profile no-vertical-padding">
        <Grid.Column mobile={12} tablet={12} computer={12}>
          <StickyContainer>
            <ProfileCard userLanguage={userLanguage} fullprofile={fullprofile} strings={strings} matchLogo={matchLogo} />
          </StickyContainer>
        </Grid.Column>
      </section>
      );
   }
}


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    userLanguage: state.user.userObj.language,
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
export default connect(mapStateToProps)(FullProfileCard);
