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

class FeedLatestProfiles extends React.Component {

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
    let date = new Date(profileDetails.feedProjectUpdatedAt);
    date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    console.log(date, 'test');
    return (
      <Grid className="no-vertical-margin no-vertical-padding">
        <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter">
         <div id={'general-Information'}className={'profile-card general-info'} key={this.props.index}>
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
              {profileDetails.posted !== 'blogfeeds' &&  <Grid centered>
                <Grid.Row className="no-vertical-padding">
                  <Grid.Column computer={12}>
                    <h3 className='newsFeedMatchCompName'>{profileDetails.companyName.typeValues} {profileDetails.posted === 'products' ? 'created a product' : 'posted a project'} </h3>
                    <div className="match-summary--title">
                      <MatchingProfile userLanguage={userLanguage} user={user} profileId={profileDetails.elasticId} searchType={'projectSearch'} companyName={profileDetails.companyName.typeValues} />
                    </div>
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={1} computer={1} className="no-gutter match-logo" textAlign="left">
                    <MatchLogo logoURI={profileDetails.logoURI} userLanguage={userLanguage} user={user} profileId={profileDetails.elasticId} className={'match-feed'} searchType={'projectSearch'} companyName={profileDetails.companyName.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={12} computer={9}>
                    <MatchField name="description" className="shiftDe description-style" label={strings.matchdescription} field={profileDetails.companyDescription.typeValues} />
                  </Grid.Column>
                   <Grid.Column mobile={6} tablet={12} computer={2} className="no-gutter">
                    <div className="container-saved-match-buttons">
                      <Modal
                      trigger={<Button onClick={this.handleContactOpen} className="button-small btn-contact-match">{strings.contactButton}</Button>} open={this.state.contactmodalOpen}
                        onClose={this.handleContactClose} closeIcon="close">
                        <Modal.Description>
                          <MatchContactCard userLanguage={userLanguage} matchingProfile={profileDetails} searchType={'ProductSearch'} user={user} />
                        </Modal.Description>
                        <Modal.Actions>
                          <Button button className="button-small cancel-matches" onClick={this.handleContactClose}>
                            {strings.closeButton}
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts">
                    <MatchField
                    className="match-summary--key-fact"
                    name={strings.matchHeadquarters}
                    field={profileDetails.headquarters.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts">
                    <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchIndustry}
                    field={profileDetails.industry.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts">
                    <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchbusinessType}
                    field={profileDetails.businessType.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={12} computer={12} className="match-summary--key-facts">
                    <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchinvestmentStage}
                    field={profileDetails.investmentStage.typeValues} />
                  </Grid.Column>
                </Grid.Row>
                <div className="match-summary--specifics">
                 <div className="move-to-right-product">
                  {profileDetails.posted === 'products' && profileDetails.products.map((matchedProduct, i) =>
                    <ProductMatchSpecifics key={'matchedProduct-' + i} matchedProduct={matchedProduct} searchType={'ProductSearch'} userLanguage={userLanguage} />
                )} </div>
                 <div className="move-to-right-project">
                  {profileDetails.posted === 'projects' && profileDetails.projects.map((matchedProject, i) =>
                    <ProjectMatchSpecifics key={'matchedProject-' + i} matchedProject={matchedProject} userLanguage={userLanguage} />
                )} </div>
              </div>
              </Grid>}
              </div>
            </Grid.Column>
      </Grid>
    );
  }
}


function mapStateToProps(state) {
 return {
    user: state.user.userObj,
    emailId: state.user.userObj.email
 };
}

const Match = connect(
  mapStateToProps,
  {saveMatch, fetchMatches, updateProfiles, fetchSearches, addNotification, updateTargetProfiles, matchesUpdate, fetchProjects}
)(FeedLatestProfiles);

export default Match;
