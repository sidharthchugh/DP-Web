import React from 'react';
import FontAwesome from 'react-fontawesome';
import strings from 'components/util/language.js';
import { Grid, Button } from 'semantic-ui-react';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingLogo from '../../../Reusable/MatchingLogo';
import MatchingContact from '../../../Reusable/MatchingContact';
import MatchLogo from '../../../Reusable/MatchLogo';
import MatchingProfile from '../../../Reusable/MatchingProfile';

const ReceivedApplicationCollapsed = (props) => {
  const {matchingProfile, userLanguage, receivedApplication, isProgress, user} = props;
  let date = new Date(isProgress.createdAt);
  date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={12} className="match-summary">
          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={6} computer={4}>
                <div className="heading3">
                  <MatchingProfile userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} companyName={isProgress.currentcompanyName.typeValues} />
                </div>
              </Grid.Column>
              <Grid.Column mobile={6} computer={2}>
               {isProgress.currentheadquarters.typeValues && <FontAwesome name="map-marker" />}
                {isProgress.currentheadquarters.typeValues}
              </Grid.Column>
              <Grid.Column mobile={6} computer={3}>
                <span className="received-app-date">Date Applied: {date}</span>
              </Grid.Column>
              <Grid.Column mobile={6} computer={3} textAlign="right">
                <Button className="button-4 button-4--grey" onClick={props.skippedApplication}>
                  <FontAwesome name="minus-circle" />
                  {strings.skipBotton}
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{paddingTop: '0px'}}>
              <Grid.Column mobile={3} tablet={1} computer={1} textAlign="center">
                <MatchLogo logoURI={isProgress.logoURI} userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'}className={'match-logoadjust'} companyName={isProgress.currentcompanyName.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={11} computer={9}>
                <div className="wrapper-description">
                  <MatchField name="description" label={strings.matchdescription} field={isProgress.currentcompanyDescription.typeValues} />
                </div>
              </Grid.Column>
              <Grid.Column mobile={12} tablet={12} computer={2} textAlign="center">
                <div className="container-saved-match-buttons">
                  <Grid verticalAlign="middle">
                    <Grid.Row>
                      <Grid.Column mobile={3} computer={12} textAlign="right" className="no-vertical-padding">
                        <MatchingContact userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} />
                      </Grid.Column>
                      <Grid.Column mobile={6} computer={12} textAlign="right" className="no-vertical-padding">
                        <Button className="button-small" onClick={props.acceptedApplication}>
                          {strings.acceptButton}
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={12} tablet={6} computer={6} className="match-summary--key-facts" >
                <MatchField
                className="no-gutter match-summary--key-fact"
                name={strings.matchIndustry}
                field={isProgress.currentindustry.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={6} computer={6} className="match-summary--key-facts">
                <MatchField
                className="no-gutter match-summary--key-fact"
                name={strings.projectCompanySector}
                field={isProgress.currentsector.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={12} computer={12} className="match-summary--key-facts">
                <h3 className="heading3">{strings.application}</h3>
                <MatchField
                  className="no-gutter match-summary--key-fact"
                  name={strings.solution}
                  field={isProgress.solution.typeValues}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};


export default ReceivedApplicationCollapsed;
