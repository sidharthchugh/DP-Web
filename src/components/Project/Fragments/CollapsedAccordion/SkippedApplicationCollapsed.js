import React from 'react';
import FontAwesome from 'react-fontawesome';
import strings from 'components/util/language';
import { Grid, Button } from 'semantic-ui-react';
import MatchingLogo from '../../../Reusable/MatchingLogo';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingContact from '../../../Reusable/MatchingContact';
import MatchLogo from '../../../Reusable/MatchLogo';
import MatchingProfile from '../../../Reusable/MatchingProfile';


const SkippedApplicationCollapsed = (props) => {
  const {userLanguage, matchingProfile, isProgress, user} = props;
  return (
    <Grid>
      <Grid.Column mobile={12} tablet={1} computer={1}>
        <MatchLogo logoURI={isProgress.logoURI} userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} className={'match-logoadjust'} companyName={isProgress.currentcompanyName.typeValues} />
      </Grid.Column>
      <Grid.Column mobile={12} computer={9}>
        <div className="wrapper-description">
          <MatchingProfile userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} companyName={isProgress.currentcompanyName.typeValues} />
          <p className="p-description">
            {isProgress.currentcompanyDescription.typeValues}
          </p>
        </div>
      </Grid.Column>
      <Grid.Column mobile={12} computer={2} textAlign="center" verticalAlign="bottom">
        <Button className="button-small" onClick={props.acceptedApplication}>
          {strings.acceptButton}
        </Button>
        <MatchingContact userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} />
      </Grid.Column>
    </Grid>
  );
};


export default SkippedApplicationCollapsed;
