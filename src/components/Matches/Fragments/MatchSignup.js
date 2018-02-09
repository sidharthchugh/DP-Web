import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addNotification } from '../../../actions/notification';
import MatchingLogo from '../../Reusable/MatchingLogo';
import MatchField from './MatchField';
import {updateProfiles, updateTargetProfiles} from 'actions/profiles';
import {fetchProjects} from 'actions/projects';
import ProductMatchSpecifics from './MatchTypes/ProductMatchSpecifics';
import ProjectMatchSpecifics from './MatchTypes/ProjectMatchSpecifics';
import {fetchMatches, saveMatch, matchesUpdate, saveScoreMatch, updateScoreMatch} from '../../../actions/matches';
import {fetchSearches, fetchSearchSignup} from '../../../actions/searches';
import strings from '../../../components/util/language';
import MatchingProfile from '../../Reusable/MatchingProfile';
import MatchLogo from '../../Reusable/MatchLogo';
import FullProfileCard from '../FullProfileCard';
import TooltipWrapper from 'components/util/TooltipWrapper';
import MatchContactCard from '../MatchContactCard';
import ProjectMatchExpanded from './Expanded/ProjectMatchExpanded';
import { Grid, Button, Modal, Icon } from 'semantic-ui-react';
import crypto from 'crypto';
import FontAwesome from 'react-fontawesome';
import Scrollchor from 'react-scrollchor';

class MatchComponent extends React.Component {

  constructor(props) {
    super(props);
    this.saveMatches = this.saveMatches.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
    this.handleFullProfileOpen = this.handleFullProfileOpen.bind(this);
    this.handleFullProfileClose = this.handleFullProfileClose.bind(this);
    this.handleContactOpen = this.handleContactOpen.bind(this);
    this.handleContactClose = this.handleContactClose.bind(this);
    this.apply = this.apply.bind(this);
    this.state = { fullprofileOpen: false};
    this.state = { contactmodalOpen: false};
    this.state = { apply: false};
    this.saveProject = this.saveProject.bind(this);
    this.submitProject = this.submitProject.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
  }

   componentWillMount() {
    const {profiles} = this.props;
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

  apply() {
   this.setState({ apply: true});
  }


   updateMatch(searchId, searchType, currentMatch, buttonStatus) {
    const {matchId} = this.props;
     this.props.matchesUpdate(searchId, searchType, currentMatch, matchId, buttonStatus)
     .then((response) => {
       if (response.payload && response.payload.status === 200) {
         if (buttonStatus) {
            this.props.addNotification('Keyword Count Match Updated', 'success', 'tc');
         } else {
           this.props.addNotification(strings.saveMatchNotify, 'success', 'tc');
         }
            return this.props.fetchSearchSignup({searchId: matchId}).then(action =>
             this.props.fetchMatches(action.payload.data)
           );
       }
     });
   }

    saveMatches(searchId, searchType, currentMatch, buttonStatus) {
     const {matchId} = this.props;
     this.props.saveMatch(searchId, searchType, currentMatch, matchId)
     .then((response) => {
       if (response.payload && response.payload.status === 200) {
         if (!buttonStatus) {
            this.updateMatch(searchId, searchType, currentMatch);
         } else if (buttonStatus) {
              this.updateMatch(searchId, searchType, currentMatch, buttonStatus);
         } else {
           this.props.addNotification(strings.saveMatchNotify, 'success', 'tc');
            return this.props.fetchSearchSignup({searchId: matchId}).then(action =>
             this.props.fetchMatches(action.payload.data)
           );
         }
       }
     });
   }

    randomObjectId() {
        return crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
    }

  // Send Values To Database
  saveProject(values, profileId, matchedProjects, matchingProfile, searchId, searchType, currentMatch, Status, generateProjectId) {
    const {updateProfiles, addNotification, profiles} = this.props;
    if (!generateProjectId) {
        generateProjectId = this.randomObjectId();
    }
    const projectStatus = Object.assign(values, {projectApplyStatus: Status,
      profileId: matchingProfile.elasticId,
      matchedProjects,
            companyName: matchingProfile.companyName,
      companyDescription: matchingProfile.companyDescription,
            headquarters: matchingProfile.headquarters,
      industry: matchingProfile.industry,
            sector: matchingProfile.sector,
      organizationType: matchingProfile.organizationType,
            logoURI: matchingProfile.logoURI,
            currentcompanyName: profiles.companyName,
      currentcompanyDescription: profiles.companyDescription,
            currentheadquarters: profiles.headquarters,
      currentindustry: profiles.industry,
            currentsector: profiles.sector,
      currentorganizationType: profiles.organizationType,
            currentlogoURI: profiles.logoURI,
            projectId: generateProjectId,
       });
    const updatedValue = { $push: { projectsApplication: projectStatus } };
    updateProfiles({updatedValue})
    .then((response) => {
      if (response.payload && response.payload.status === 200) {
         this.setState({ apply: false});
         this.saveMatches(searchId, searchType, currentMatch);
      }
    });
  }

  // Send Values To Database
  submitProject(values, profileId, matchedProjects, matchingProfile, searchId, searchType, currentMatch) {
    const {updateTargetProfiles, addNotification, user, profiles} = this.props;
    const generateProjectId = this.randomObjectId();
   const projectReceivedStatus = Object.assign(values, {projectApplyStatus: 'Received',
profileId: user.userId,
   matchedProjects,
companyName: matchingProfile.companyName,
companyDescription: matchingProfile.companyDescription,
    headquarters: matchingProfile.headquarters,
industry: matchingProfile.industry,
     sector: matchingProfile.sector,
organizationType: matchingProfile.organizationType,
     logoURI: matchingProfile.logoURI,
       currentcompanyName: profiles.companyName,
currentcompanyDescription: profiles.companyDescription,
       currentheadquarters: profiles.headquarters,
currentindustry: profiles.industry,
       currentsector: profiles.sector,
currentorganizationType: profiles.organizationType,
       currentlogoURI: profiles.logoURI,
        projectId: generateProjectId,
        createdAt: Date.now()});
   const updatedReceivedValues = { $push: { projectsApplication: projectReceivedStatus } };
    updateTargetProfiles({updatedReceivedValues, profileId})
    .then((response) => {
         if (response.payload.status === 200) {
        this.setState({ apply: false});
        this.saveProject(values, profileId, matchedProjects, matchingProfile, searchId, searchType, currentMatch, 'Submitted', generateProjectId);
        this.saveMatches(searchId, searchType, currentMatch);
    }
    });
  }

  cancelForm() {
   this.setState({ apply: false});
  }

  render() {
    const {matchingProfile, matchNo, matches, searchType, searchId, userLanguage, isLast, user, search} = this.props;
    // Filter out the match with this `profileId` and unbox it (always a single elem array)
    const currentMatch = matches.filter(match => match.profileId === matchingProfile.elasticId)[0];
    // Filter the products listed with this profile according to matched product IDs
    const matchedProducts = matchingProfile.products.filter(product => {
       return matches.filter(match => match.productIds[0] === product.elasticId)[0];
       }
      );

    const matchedProjects = matchingProfile.projects.filter(project => {
       return matches.filter(match => match.projectIds[0] === project.elasticId)[0];
       }
      );
    return (
      <Grid>
        {(currentMatch.matchStatus === 'matchResult' || currentMatch.matchStatus === 'matchVerified') &&
          <Grid.Row>
            <Grid.Column computer={12} className="match-summary">
              <Grid centered>
                <Grid.Row className="no-vertical-padding">
                  <Grid.Column computer={12}>
                     {matchNo !== 1 && <div className="profileSection profileSection--semantic matches-section" />}
                    <div className="match-summary--title">
                      elasticId : {matchingProfile.elasticId}
                    </div>
                      <div className="match-summary--title">
                      company status : {matchingProfile.companyStatus}
                    </div>
                    <div className="match-summary--title">
                      <MatchingProfile userLanguage={userLanguage} user={user} profileId={matchingProfile.elasticId} searchType={'projectSearch'} companyName={matchingProfile.companyName.typeValues} />
                    </div>
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={1} computer={1} className="no-gutter match-logo" textAlign="left">
                    <MatchLogo logoURI={matchingProfile.logoURI} userLanguage={userLanguage} user={user} profileId={matchingProfile.elasticId} searchType={'projectSearch'} companyName={matchingProfile.companyName.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={12} computer={7}>
                    <MatchField name="description" className="shiftDe" label={strings.matchdescription} field={matchingProfile.companyDescription.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={1} computer={1}>
                    <TooltipWrapper name={'Batch Certificate'} tooltip={userLanguage === 'German' ? 'Verifizierte Unternehmen wurden von unseren Analysten überprüft und haben persönlichen Kontakt mit uns gehabt, um ihre Produkte zu positionieren.' : 'Verified companies have been reviewed by our analysts and had personal contact to review their product offering.'}>
                      {matchingProfile.companyStatus === 'Active' && <FontAwesome name="certificate" size={'2x'} style={{ color: '#8EDD65' }} />}
                    </TooltipWrapper>
                    <button onClick={() => this.saveMatches(searchId, searchType, currentMatch, 'plus')}><Icon name={'plus'} /></button>
                    <button onClick={() => this.saveMatches(searchId, searchType, currentMatch, 'minus')}><Icon name={'minus'} /></button>
                  </Grid.Column>
                  <Grid.Column mobile={6} tablet={12} computer={1} className="no-gutter">
                    <div className="score">
                      <p className="match-score-number">
                        {currentMatch.keywordMatchCount}
                      </p>
                      <p className="match-score-text">
                        Match-Score
                      </p>
                    </div>
                  </Grid.Column>
                  {(searchType === 'partnerSearch' || searchType === 'partnerDetailSearch' || searchType === 'productSearch' || searchType === 'productDetailSearch') && <Grid.Column mobile={6} tablet={12} computer={2} className="no-gutter">
                    <div className="container-saved-match-buttons">
                      {currentMatch.matchStatus === 'matchResult' && <Button
                         className="button-small save-matches"
                        onClick={() => this.saveMatches(searchId, searchType, currentMatch)}>
                        {strings.verifyMatchButton}
                      </Button>}
                      {currentMatch.matchStatus === 'matchVerified' && <Button
                         className="save-matches"
                        onClick={() => this.saveMatches(searchId, searchType, currentMatch, 'UnVerify')}>
                        Unverify
                      </Button>}
                    </div>
                  </Grid.Column>}
                  {searchType === 'projectDetailSearch' && <Grid.Column mobile={6} tablet={12} computer={2} className="no-gutter">
                    <div className="container-saved-match-buttons">
                      {currentMatch.matchStatus === 'matchResult' && <Button
                         className="button-small save-matches"
                        onClick={() => this.saveMatches(searchId, searchType, currentMatch)}>
                        {strings.verifyMatchButton}
                      </Button>}
                    </div>
                  </Grid.Column>}
                  {searchType === 'startupSearch' && <Grid.Column mobile={6} tablet={12} computer={2} className="no-gutter">
                    <div className="container-saved-match-buttons">
                      <Modal
                      trigger={<Button onClick={this.handleContactOpen} className="button-small btn-contact-match">{strings.contactButton}</Button>} open={this.state.contactmodalOpen}
                        onClose={this.handleContactClose} closeIcon="close">
                        <Modal.Description>
                          <MatchContactCard userLanguage={userLanguage} matchingProfile={matchingProfile} searchType={searchType} user={user} />
                        </Modal.Description>
                        <Modal.Actions>
                          <Button button className="button-small cancel-matches" onClick={this.handleContactClose}>
                            {strings.closeButton}
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </div>
                  </Grid.Column>}
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts">
                    <MatchField
                    className="match-summary--key-fact"
                    name={strings.matchHeadquarters}
                    field={matchingProfile.headquarters.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts">
                    <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchIndustry}
                    field={matchingProfile.industry.typeValues} />
                  </Grid.Column>
                  <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts">
                    <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchbusinessType}
                    field={matchingProfile.businessType.typeValues} />
                  </Grid.Column>
                  {searchType === 'startupSearch' && <Grid.Column mobile={12} tablet={12} computer={12} className="match-summary--key-facts">
                    <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchinvestmentStage}
                    field={matchingProfile.investmentStage.typeValues} />
                  </Grid.Column>}
                </Grid.Row>
              </Grid>
              <div className="match-summary--specifics">
                {searchType !== 'projectSearch' && matchedProducts.map((matchedProduct, i) =>
                  <ProductMatchSpecifics key={'matchedProduct-' + i} matchedProduct={matchedProduct} searchType={searchType} userLanguage={userLanguage} />
              )}
                {searchType === 'projectSearch' && matchedProjects.map((matchedProject, i) =>
                  <ProjectMatchSpecifics key={'matchedProject-' + i} matchedProject={matchedProject} userLanguage={userLanguage} />
              )}
              </div>
              {this.state.apply && <ProjectMatchExpanded userLanguage={userLanguage} matchingProfile={matchingProfile} saveButton={values => this.saveProject(values, matchingProfile.elasticId, matchedProjects, matchingProfile, searchId, searchType, currentMatch, 'Saved')} submitButton={values => this.submitProject(values, matchingProfile.elasticId, matchedProjects, matchingProfile, searchId, searchType, currentMatch)} cancelButton={this.cancelForm} />}
            </Grid.Column>
          </Grid.Row>
          }
        {/* {this.props.sidebarM === 'true' && matchedProducts.map((matchedProduct, i) =>
          <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter" key={'matchedProduct-' + i}>
            <div className="saved-card">
              <div className="search-details">
                <Scrollchor to={'projectName'} className="project-sidebar" animate={{offset: -58, duration: 500}} />
              </div>
            </div>
          </Grid.Column>
               )}*/}
      </Grid>
    );
  }
}

MatchComponent.propTypes = {
  matchingProfile: PropTypes.object.isRequired,
  matches: PropTypes.array
};

function mapStateToProps(state) {
 return {
    profiles: state.projects.profiles,
    user: state.user.userObj
 };
}

const Match = connect(
  mapStateToProps,
  {saveMatch, fetchMatches, updateProfiles, fetchSearches, fetchSearchSignup, addNotification, updateTargetProfiles, matchesUpdate, fetchProjects}
)(MatchComponent);

export default Match;
