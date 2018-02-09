import React from 'react';
import FontAwesome from 'react-fontawesome';
import strings from 'components/util/language.js';
import { Grid, Button } from 'semantic-ui-react';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingLogo from '../../../Reusable/MatchingLogo';
import CollapsedApplicationProjectDetails from './CollapsedApplicationProjectDetails.js';
import dummyProfile from '../../Dummy/dummyReceivedApplications.js';
import MatchLogo from '../../../Reusable/MatchLogo';
import MatchingProfile from '../../../Reusable/MatchingProfile';


const RejectedApplicationCollapsed = (props) => {
  const {project, userLanguage, isProgress, user} = props;
  const matchingProfile = dummyProfile;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={12} className="match-summary" >
          <Grid centered>
            <Grid.Row>
              <Grid.Column computer={4}>
                <div className="heading3">
                  <MatchingProfile userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} companyName={isProgress.companyName.typeValues} />
                </div>
              </Grid.Column>
              <Grid.Column computer={4} className="received-app-date">
                <p className="p-secondary"><FontAwesome name="map-marker" />
                  {isProgress.headquarters.typeValues}</p>
              </Grid.Column>
              <Grid.Column computer={4} textAlign="right">
                <Button className="button-4 button-4--grey" onClick={props.widthdrawApplication}>
                  <FontAwesome name="minus-circle" />
                  {strings.delete}
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={12} tablet={1} computer={1} className="no-gutter" textAlign="left" style={{paddingTop: '0px'}}>
                <MatchLogo logoURI={isProgress.logoURI} userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} className={'match-logoadjust'} companyName={isProgress.companyName.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={11} computer={9} textAlign="justified">
                <MatchField name="description" label={strings.matchdescription} field={isProgress.companyDescription.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={6} tablet={12} computer={2} verticalAlign="middle" />
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


export default RejectedApplicationCollapsed;
