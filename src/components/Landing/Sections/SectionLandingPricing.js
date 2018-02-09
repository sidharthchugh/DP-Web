import React from 'react';
import {Grid, Image} from 'semantic-ui-react';
import pricingBulletShape1 from 'images/combined_Shape.svg';
import pricingBulletShape2 from 'images/combined_Shape-1.svg';
import pricingBulletShape3 from 'images/combined_Shape-2.svg';
import strings from '../../util/language';
import arrow from 'images/path_2-3.svg';
import Scrollchor from 'react-scrollchor';


const SectionLandingPricing = () => (
  <Grid centered id="pricing" textAlign="center">
    <Grid.Column computer={12} textAlign="center">
      <h1 className="h1-blue">
        {strings.headerPrice}
      </h1>
      <h4 className="h4-subheading">
        {strings.pricingSubHeading}
      </h4>
    </Grid.Column>
    <Grid.Column mobile={14} computer={10} textAlign="center">
      <Grid centered textAlign="center" container>
        <Grid.Column computer={12} textAlign="left">
          <Image src={pricingBulletShape1} alt="pricingBulletShape1" />
          <h3>
            {strings.pricingFirstDescriptionOne}
            <strong>
              {strings.pricingFree}
            </strong>
            {strings.pricingFirstDescriptionTwo}
          </h3>
          <br />
          <br />
          <Image src={pricingBulletShape1} alt="pricingBulletShape1" />
          <h3>
            {strings.pricingSecondDescriptionOne}
          </h3>
        </Grid.Column>
      </Grid>
    </Grid.Column>
    <Grid.Column mobile={12} tablet={12} computer={10} textAlign="right">
      <a href="https://calendly.com/david-hamel/30min">{strings.demoButton}</a>
    </Grid.Column>
    <Grid.Column computer={12} textAlign="center">
      <Scrollchor to="about-us" animate={{offset: -50, duration: 500}} className="landing-section-arrow-inverted">
        <Image src={arrow} alt="arrow" />
      </Scrollchor>
    </Grid.Column>
  </Grid>
);


export default SectionLandingPricing;
