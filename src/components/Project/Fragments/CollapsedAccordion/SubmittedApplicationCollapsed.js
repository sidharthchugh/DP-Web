import React from 'react';
import FontAwesome from 'react-fontawesome';
import strings from 'components/util/language.js';
import { Grid, Button } from 'semantic-ui-react';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingLogo from '../../../Reusable/MatchingLogo';
import dummyProfile from '../../Dummy/dummyReceivedApplications.js';
import MatchingContact from '../../../Reusable/MatchingContact';
import MatchingProfile from '../../../Reusable/MatchingProfile';
import MatchLogo from '../../../Reusable/MatchLogo';
import CollapsedApplicationProjectDetails from './CollapsedApplicationProjectDetails.js';


const SubmittedApplicationCollapsed = (props) => {
  const {project, userLanguage, isProgress, user} = props;
  let date = new Date(isProgress.createdAt);
date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={12} className="match-summary">
          <Grid centered>
            <Grid.Row>
              <Grid.Column computer={4}>
                <div className="heading3">
                  <MatchingProfile userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} companyName={isProgress.companyName.typeValues} />
                </div>
              </Grid.Column>
              <Grid.Column mobile={6} computer={2}>
                <div className="mobile hidden">
                  {isProgress.headquarters.typeValues && <FontAwesome name="map-marker" />}
                  {isProgress.headquarters.typeValues}
                </div>
              </Grid.Column>
              <Grid.Column mobile={6} computer={3}>
                <span className="received-app-date">Date Applied: {date}</span>
              </Grid.Column>
              <Grid.Column mobile={6} computer={3} textAlign="right">
                <Button className="button-4 button-4--grey" onClick={props.withdrawApplication}>
                  <FontAwesome name="minus-circle" />
                  {strings.withdrawApplication}
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={12} tablet={1} computer={1} className="no-gutter" textAlign="left">
                <MatchLogo logoURI={isProgress.logoURI} userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} className={'match-logoadjust'} companyName={isProgress.companyName.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={11} computer={9} textAlign="justified">
                <MatchField name="description" label={strings.matchdescription} field={isProgress.companyDescription.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={6} tablet={12} computer={2}>
                <div className="container-saved-match-buttons">
                  <Grid>
                    <Grid.Column mobile={9} tablet={12} computer={12} textAlign="right">
                      <MatchingContact userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} />
                    </Grid.Column>
                  </Grid>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {
              isProgress.matchedProjects && isProgress.matchedProjects.map((item) => {
                return (
                  <CollapsedApplicationProjectDetails
               project={item}
                userLanguage={userLanguage}
          />);
            })
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};


export default SubmittedApplicationCollapsed;
