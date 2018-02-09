import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchProfileSignup, updateProfiles} from 'actions/profiles';
import {cmsDetail} from 'actions/cms';
import difference from 'rus-diff';
import FeedsLatestProfiles from './FeedsLatestProfiles';
import strings from 'components/util/language';
import { Grid } from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
  }

  componentWillMount() {
       this.props.cmsDetail();
  }


  render() {
    const {toggleProfileEdit, sections, feedsProfile, fullprofile, cmsData, profileDetails, logoURI, userLanguage, strings, matchLogo, profileSignUp} = this.props;
    let cmsValue = [];
    if (cmsData.cmsData && cmsData.cmsData.blogs) {
      cmsValue = cmsData.cmsData.blogs.map((feedblog) => {
        feedblog.feedProjectUpdatedAt = Date.parse(feedblog.blogDate.replace(/\s/, 'T'));
        feedblog.posted = 'blogfeeds';
        return feedblog;
      });
    }
    const feedArray = [...cmsValue, ...feedsProfile];
    let sortedProfiles = [];
    if (feedArray && feedArray.length > 0) {
      sortedProfiles = feedArray && feedArray.length > 0 && feedArray.sort((a, b) => {
          return b.feedProjectUpdatedAt - a.feedProjectUpdatedAt;
        });
    }

    return (
      <Grid centered>
        <Grid.Column mobile={12} tablet={12} computer={12}>
      {sortedProfiles.length > 0 && sortedProfiles.map((profile, index) =>
          <FeedsLatestProfiles
             toggleProfileEdit={toggleProfileEdit}
             sections={sections}
             index={index}
             onSubmit={this.saveProfile}
             saveProfile={this.saveProfile}
             profileDetails={fullprofile || profile}
             userLanguage={userLanguage}
             strings={strings}
             cmsData={cmsData}
             profileSignUp={profileSignUp}
             fullprofile
           />
           )}
        </Grid.Column>
      </Grid>
     );
  }
}


// ProfileCard.propTypes = {
//   updateProfiles: PropTypes.func.isRequired,
// };

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     feedsProfile: state.profile.feedsProfile,
     sections: state.profile.sections,
     cmsData: state.cms.cmsData
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {fetchProfileSignup, cmsDetail})(ProfileCard);
