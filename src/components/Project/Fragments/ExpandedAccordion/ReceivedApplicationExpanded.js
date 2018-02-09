import React from 'react';
import FontAwesome from 'react-fontawesome';
import strings from 'components/util/language.js';
import { Grid, Button } from 'semantic-ui-react';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingLogo from '../../../Reusable/MatchingLogo';


const ReceivedApplicationExpanded = (props) => {
  const {matchingProfile, userLanguage, receivedApplication, isProgress} = props;
  return (
    <Grid className="match-summary">
      <Grid.Column mobile={12} tablet={6} computer={6} className="match-summary--key-facts">
        <MatchField
          className="no-gutter match-summary--key-fact"
          name={strings.appTechRecommendation}
          field={isProgress.techRecommendation.typeValues}
        />
      </Grid.Column>
      <Grid.Column mobile={12} tablet={6} computer={6} className="match-summary--key-facts">
        <MatchField
          className="no-gutter match-summary--key-fact"
          name={strings.appPricingIndication}
          field={isProgress.pricingIndication.typeValues}
        />
      </Grid.Column>
      <Grid.Column mobile={12} tablet={6} computer={6} className="match-summary--key-facts">
        <MatchField
          className="no-gutter match-summary--key-fact"
          name={strings.appTimeLineIndication}
          field={isProgress.timelineIndication.typeValues}
        />
      </Grid.Column>
      <Grid.Column mobile={12} tablet={6} computer={6} className="match-summary--key-facts">
        <MatchField
          className="no-gutter match-summary--key-fact"
          name={strings.appReferencesExperience}
          field={isProgress.referencesExperience.typeValues}
        />
      </Grid.Column>
    </Grid>
  );
};


export default ReceivedApplicationExpanded;
