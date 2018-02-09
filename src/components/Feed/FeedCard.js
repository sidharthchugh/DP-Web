import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import difference from 'rus-diff';
import FontAwesome from 'react-fontawesome';
import {fetchFeedProfile} from 'actions/profiles';
import FeedsProfile from './Forms/FeedsProfile';
import strings from 'components/util/language';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import { Grid } from 'semantic-ui-react';
import 'styles/components/projects.css';
import {StickyContainer} from 'react-sticky';


class FeedCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
      // this.saveProject = this.saveProject.bind(this);
      // this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    if (!this.props.feedsProfile.elasticId) {
       this.props.fetchFeedProfile();
    }
  }


  render() {
    const {toggleProjectsEdit, sections, feedsProfile, fullprofile, profileDetails, logoURI, userLanguage, strings, matchLogo, profileSignUp} = this.props;
    return (
      <Grid centered style={{marginBottom: '20px'}}>
        <Grid.Column mobile={12} tablet={12} computer={12} className="no-vertical-padding">
          <StickyContainer>
            <FeedsProfile
            logoURI={logoURI}
            sections={sections}
            companyName={this.saveCompany}
            profileDetails={fullprofile || feedsProfile}
            userLanguage={userLanguage}
            strings={strings}
            matchLogo={matchLogo}
            profileSignUp={profileSignUp}
            fullprofile={fullprofile} />
          </StickyContainer>
        </Grid.Column>
      </Grid>
     );
  }
}


// ProjectSignupCard.propTypes = {
//   updateProjects: PropTypes.func.isRequired,
//   addNotification: PropTypes.func.isRequired,
//   toggleProjectsEdit: PropTypes.func.isRequired
// };


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     feedsProfile: state.profile.feedsProfile,
     sections: state.profile.sections
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { fetchFeedProfile})(FeedCard);
