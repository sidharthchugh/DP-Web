import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addNotification } from '../../../actions/notification';
import MatchingLogo from '../../Reusable/MatchingLogo';
import MatchField from './MatchField';
import ProductMatchSpecifics from './MatchTypes/ProductMatchSpecifics';
import strings from '../../../components/util/language';
import FullProfileCard from '../FullProfileCard';
import MatchContactCard from '../MatchContactCard';
import MatchLogo from '../../Reusable/MatchLogo';
import MatchingProfile from '../../Reusable/MatchingProfile';
import { Grid, Button, Icon, Modal } from 'semantic-ui-react';
import TooltipWrapper from 'components/util/TooltipWrapper';
import FontAwesome from 'react-fontawesome';

class MatchComponent extends React.Component {


  constructor(props) {
    super(props);
    this.handleProfileOpen = this.handleProfileOpen.bind(this);
    this.handleProfileClose = this.handleProfileClose.bind(this);
    this.handleContactOpen = this.handleContactOpen.bind(this);
    this.handleContactClose = this.handleContactClose.bind(this);
    this.state = { profilemodalOpen: false};
    this.state = { contactmodalOpen: false};
  }

  handleProfileOpen() {
   this.setState({ profilemodalOpen: true});
  }

  handleContactOpen() {
   this.setState({ contactmodalOpen: true});
  }

  handleProfileClose() {
   this.setState({ profilemodalOpen: false});
  }

  handleContactClose() {
   this.setState({ contactmodalOpen: false});
  }

  render() {
    const {matchingProfile, matchNo, matches, searchType, searchId, userLanguage, user, isLast} = this.props;
    // Filter out the match with this `profileId` and unbox it (always a single elem array)
    const currentMatch = matches.filter(match => match.profileId === matchingProfile.elasticId)[0];
    // Filter the products listed with this profile according to matched product IDs
    const matchedProducts = matchingProfile.products.filter(product => {
       return matches.filter(match => match.matchStatus && match.productIds[0] === product.elasticId)[0];
       }
      );

    let date = new Date(currentMatch.matchedAt);
    date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const companyEmail = matchingProfile.companyEmail.typeValues !== '' ? matchingProfile.companyEmail.typeValues + '?cc=info@digitapartners.io' : 'info@digitapartners.io';
    const email = 'mailto:' + companyEmail;
    return (
      <Grid>
        {currentMatch.matchStatus === 'matchSaved' &&
        <Grid.Row>
          <Grid.Column computer={12} className="match-summary">
            <Grid centered>
              <Grid.Row className="no-vertical-padding">
                <Grid.Column mobile={12} computer={9}>
                  <div className="match-summary--title">
                    <MatchingProfile userLanguage={userLanguage} user={user} profileId={matchingProfile.elasticId} searchType={searchType} companyName={matchingProfile.companyName.typeValues} />
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} computer={3} textAlign="right">
                  <span className="saveMatch-date">{date}</span>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column mobile={12} tablet={1} computer={1} className="no-gutter match-logo" textAlign="left">
                  <MatchLogo logoURI={matchingProfile.logoURI} userLanguage={userLanguage} user={user} profileId={matchingProfile.elasticId} searchType={searchType} companyName={matchingProfile.companyName.typeValues} />
                </Grid.Column>
                <Grid.Column mobile={12} tablet={12} computer={7}>
                  <MatchField name="description" label={strings.matchdescription} field={matchingProfile.companyDescription.typeValues} />
                </Grid.Column>
                <Grid.Column mobile={12} tablet={1} computer={1}>
                  <TooltipWrapper name={'Batch Certificate'} tooltip={userLanguage === 'German' ? 'Verifizierte Unternehmen wurden von unseren Analysten überprüft und haben persönlichen Kontakt mit uns gehabt, um ihre Produkte zu positionieren.' : 'Verified companies have been reviewed by our analysts and had personal contact to review their product offering.'}>
                    {matchingProfile.companyStatus === 'Active' && <div className="batch-sign"><FontAwesome name="certificate" size={'2x'} style={{ color: '#8EDD65' }} /></div>}
                  </TooltipWrapper>
                </Grid.Column>
                <Grid.Column mobile={6} tablet={12} computer={1} className="no-gutter">
                  <div className="saveMatch-score">
                    <p className="match-score-number">
                      {currentMatch.keywordMatchCount}
                    </p>
                    <p className="match-score-text">
                      Match-Score
                    </p>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={8} computer={2} className="container-saved-match-buttons" >
                  <div>
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
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column mobile={12} tablet={4} computer={4} textAlign="left">
                  <MatchField
                    className="match-summary--key-fact"
                    name={strings.matchHeadquarters}
                    field={matchingProfile.headquarters.typeValues}
                  />
                </Grid.Column>
                <Grid.Column mobile={12} tablet={4} computer={4} textAlign="left">
                  <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchIndustry}
                    field={matchingProfile.industry.typeValues}
                  />
                </Grid.Column>
                <Grid.Column mobile={12} tablet={4} computer={4} textAlign="left">
                  <MatchField
                    className="no-gutter match-summary--key-fact"
                    name={strings.matchbusinessType}
                    field={matchingProfile.businessType.typeValues}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="match-summary--specifics">
              {matchedProducts.map((matchedProduct, i) =>
                <ProductMatchSpecifics key={'matchedProduct-' + i} matchedProduct={matchedProduct} userLanguage={userLanguage} />
                )}
            </div>
            {!isLast && <div className="profileSection profileSection--semantic" />}
          </Grid.Column>
        </Grid.Row>
        }
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
   user: state.user.userObj
 };
}

const Match = connect(
  mapStateToProps,
  {addNotification}
)(MatchComponent);

export default Match;
