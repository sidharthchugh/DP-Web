import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addNotification } from '../../../actions/notification';
import MatchingLogo from '../../Reusable/MatchingLogo';
import MatchField from '../../Matches/Fragments/MatchField';
import {updateProfiles, updateTargetProfiles} from 'actions/profiles';
import {fetchProjects} from 'actions/projects';
import ProductMatchSpecifics from '../../Matches/Fragments/MatchTypes/ProductMatchSpecifics';
import ProjectMatchSpecifics from '../../Matches/Fragments/MatchTypes/ProjectMatchSpecifics';
import {fetchMatches, saveMatch, matchesUpdate} from '../../../actions/matches';
import {fetchSearches} from '../../../actions/searches';
import strings from '../../../components/util/language';
import MatchingProfile from '../../Reusable/MatchingProfile';
import MatchLogo from '../../Reusable/MatchLogo';
import FullProfileCard from '../../Matches/FullProfileCard';
import TooltipWrapper from 'components/util/TooltipWrapper';
import MatchContactCard from '../../Matches/MatchContactCard';
import ProjectMatchExpanded from '../../Matches/Fragments/Expanded/ProjectMatchExpanded';
import { Grid, Button, Modal, Image} from 'semantic-ui-react';
import crypto from 'crypto';
import FontAwesome from 'react-fontawesome';
import Scrollchor from 'react-scrollchor';

class BlogLatestProfiles extends React.Component {

  constructor(props) {
    super(props);
    this.handleFullProfileOpen = this.handleFullProfileOpen.bind(this);
    this.handleFullProfileClose = this.handleFullProfileClose.bind(this);
    this.handleContactOpen = this.handleContactOpen.bind(this);
    this.handleContactClose = this.handleContactClose.bind(this);
    this.state = { fullprofileOpen: false};
    this.state = { contactmodalOpen: false};
    this.state = { apply: false};
  }


  handleFullProfileOpen() {
   this.setState({ fullprofileOpen: true});
  }

  handleContactOpen() {
   this.setState({ contactmodalOpen: true});
  }

  handleContactClose() {
   this.setState({ contactmodalOpen: false});
  }

  handleFullProfileClose() {
   this.setState({ fullprofileOpen: false});
  }


  render() {
    const {profileDetails, userLanguage, user, fullprofile, cmsData} = this.props;
    let date = new Date(profileDetails.feedProjectUpatedAt);
    date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    // Filter out the match with this `profileId` and unbox it (always a single elem array)
    return (
      <Grid className="no-vertical-margin no-vertical-padding">
        <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter">
         <div id={'general-Information'}className={'profile-card general-info'}>
            {profileDetails.posted === 'blogfeeds' && <Grid centered>
                <Grid.Row className="no-vertical-padding">
                    <Grid.Column computer={12}>
                      <div dangerouslySetInnerHTML={{__html: profileDetails.blogText}} className="heading-blog" />
                  </Grid.Column>
                  <Grid.Column computer={12}>
                    <h3>{profileDetails.blogKeywords}</h3>
                  </Grid.Column>
                    <Grid.Column computer={12}>
                    <h3 className="date-style">{date}</h3>
                  </Grid.Column>
                  <Grid.Column computer={12}>
                     <a href={profileDetails.blogLink.url}> <Image src={profileDetails.blogImage.url} fluid className="feed-image-padding" /> </a>
                  </Grid.Column>
                   <Grid.Column computer={12}>
                      <div dangerouslySetInnerHTML={{__html: profileDetails.blogData}} className="feed-data" />
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>}
              </div>
            </Grid.Column>
      </Grid>
    );
  }
}


function mapStateToProps(state) {
 return {
    user: state.user.userObj
 };
}

const Match = connect(
  mapStateToProps,
  {saveMatch, fetchMatches, updateProfiles, fetchSearches, addNotification, updateTargetProfiles, matchesUpdate, fetchProjects}
)(BlogLatestProfiles);

export default Match;
