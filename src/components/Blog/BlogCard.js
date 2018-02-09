import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import difference from 'rus-diff';
import FontAwesome from 'react-fontawesome';
import {fetchFeedProfile} from 'actions/profiles';
import BlogProfile from './Forms/BlogProfile';
import strings from 'components/util/language';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import { Grid } from 'semantic-ui-react';
import 'styles/components/projects.css';
import {StickyContainer} from 'react-sticky';


class BlogCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
      // this.saveProject = this.saveProject.bind(this);
      // this.toggleEdit = this.toggleEdit.bind(this);
  }

  render() {
    const {toggleProjectsEdit, sections, fullprofile, profileDetails, logoURI, userLanguage, strings, matchLogo, profileSignUp} = this.props;
    return (
      <Grid centered style={{marginBottom: '20px'}}>
        <Grid.Column mobile={12} tablet={12} computer={12} className="no-vertical-padding">
          <StickyContainer>
            <BlogProfile
            logoURI={logoURI}
            sections={sections}
            companyName={this.saveCompany}
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
function mapStateToProps() {
  return {
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { fetchFeedProfile})(BlogCard);
