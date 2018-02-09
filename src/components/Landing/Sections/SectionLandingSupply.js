import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import strings from '../../util/language';
import supplyLine from 'images/line-3.svg';
import supplyIndustry from 'images/supplyIndustry.svg';
import contactSupply from 'images/contactSupply.svg';
import customerImage from 'images/customerImage.svg';
import searchLine from 'images/line.svg';
import reputation from 'images/reputation.svg';
import {Link} from 'react-router';
import arrow from 'images/path_2-3.svg';
import Scrollchor from 'react-scrollchor';


const SectionLandingSupply = () => (
  <Grid centered textAlign="center" id="supply-digital">
    <Grid.Column computer={12} textAlign="center">
      <h1 className="h1-blue">
        {strings.supplyDigitalHeading}
      </h1>
      <h4 className="h4-subheading">
        {strings.supplyDigitalSubHeading1} <strong>{strings.supplyDigitalSubHeading2}</strong> {strings.supplyDigitalSubHeading3}
      </h4>
    </Grid.Column>
    <Grid.Column computer={12} textAlign="center">
      <Grid centered textAlign="center" columns={12}>
        <Grid.Column mobile={12} tablet={6} computer={2} className="card-grey" textAlign="center">
          <Image src={customerImage} alt="customerImage" />
          <h4>{strings.supplyDigitalFirstMainDescription}</h4>
          <div className="landing-line" />
          <p>{strings.supplyDigitalFirstSubDescription}</p>
        </Grid.Column>
        <Grid.Column mobile={12} tablet={6} computer={2} className="card-grey" textAlign="center">
          <Image src={contactSupply} alt="contactSupply" />
          <h4>{strings.supplyDigitalSecondMainDescription}</h4>
          <div className="landing-line" />
          <p>{strings.supplyDigitalSecondSubDescription}</p>
        </Grid.Column>
        <Grid.Column mobile={12} tablet={6} computer={2} className="card-grey" textAlign="center">
          <Image src={reputation} alt="reputation" />
          <h4>{strings.supplyDigitalThirdMainDescription}</h4>
          <div className="landing-line" />
          <p>{strings.supplyDigitalThirdSubDescription}</p>
        </Grid.Column>
        <Grid.Column mobile={12} tablet={6} computer={2} className="card-grey" textAlign="center">
          <Image src={supplyIndustry} alt="supplyIndustry" />
          <h4>{strings.supplyDigitalForthMainDescription}</h4>
          <div className="landing-line" />
          <p>{strings.supplyDigitalForthSubDescription}</p>
        </Grid.Column>
        <Scrollchor to="#howit-works" animate={{offset: -50, duration: 500}} className="landing-section-arrow">
          <Image src={arrow} alt="arrow" />
        </Scrollchor>
      </Grid>
    </Grid.Column>

  </Grid>
);


export default SectionLandingSupply;
