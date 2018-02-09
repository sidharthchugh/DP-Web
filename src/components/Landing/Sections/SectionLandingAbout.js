import React from 'react';
import strings from '../../util/language';
import {Grid, Image, Button} from 'semantic-ui-react';
import davidImage from 'images/group-4.png';
import sidharthImage from 'images/group-5.png';
import twitter from 'images/bitmap.png';
import linkedIn from 'images/bitmap-1.png';
import xing from 'images/bitmap-2.png';
import logoLine from 'images/line-7.svg';
import footerImage from 'images/group_46.svg';
import logo_eu from 'images/logo_eu.png';
import logo_exist from 'images/logo_exist.png';
import logo_fu from 'images/logo_fu.png';
import logo_esf from 'images/logo_esf.png';
import logo_min from 'images/logo_min.png';


const SectionLandingAbout = () => (
  <Grid textAlign="center" id="about-us">
    <Grid.Column computer={12} textAlign="center">
      <h1 className="h1-red">
        {strings.headerAboutUs}
      </h1>
      <h4 className="h4-subheading">
        {strings.aboutusSubHeading}
      </h4>
    </Grid.Column>
    <Grid.Column computer={12} textAlign="center">
      <Grid centered textAlign="center" centered container>
        <Grid.Column mobile={12} tablet={8} computer={4} className="card-team" textAlign="center">
          <Image src={davidImage} alt="Ask Sidharth"  />
          <h4>David Hamel</h4>
          <span>Co-Founder & CEO</span>
          <div>
            <Image src={logoLine} alt="line" />
            <a href="https://twitter.com/_DavidHamel">
              <Image src={twitter} alt="twitter" />
            </a>
            <a href="https://www.linkedin.com/in/david-hamel-11baa841/">
              <Image src={linkedIn} alt="linkedIn" />
            </a>
            <a href="https://www.xing.com/profile/David_Hamel2?sc_o=da980_e">
              <Image src={xing} alt="xing" />
            </a>
            <Image src={logoLine} alt="logoLine" />
          </div>
          <p>
            {strings.positionCEO}
          </p>
        </Grid.Column>
        <Grid.Column mobile={12} tablet={8} computer={4} className="card-team" textAlign="center">
          <Image src={sidharthImage} alt="Ask David" />
          <h4>Sidharth Chugh</h4>
          <span>Co-Founder & CTO</span>
          <div>
            <Image src={logoLine} />
            <a href="https://twitter.com/chughsidharth">
              <Image src={twitter} alt="twitter" />
            </a>
            <a href="https://www.linkedin.com/in/sidharthchugh/">
              <Image src={linkedIn} alt="linkedIn" />
            </a>
            <a href="https://www.xing.com/profile/Sidharth_Chugh?sc_o=mxb_p">
              <Image src={xing} alt="xing" />
            </a>
            <Image src={logoLine} alt="logoLine" />
          </div>
          <p>
            {strings.positionCTO}
          </p>
        </Grid.Column>
      </Grid>
    </Grid.Column>
    <Grid.Column mobile={12} tablet={12} computer={12} textAlign="center">
      <Grid centered>
        <Grid.Row>
          <Grid.Column largeScreen={12} widescreen={12} only="large screen" textAlign="center">
            <Image src={footerImage} alt="footerImage" style={{margin: 'auto'}} />
          </Grid.Column>
          <Grid.Column computer={9} only="computer" textAlign="center">
            <Image src={footerImage} alt="footerImage" style={{margin: 'auto'}} />
          </Grid.Column>
          <Grid.Column mobile={12} only="tablet mobile">
            <Grid centered>
              <Grid.Column mobile={12} tablet={6} textAlign="center" >
                <Image src={logo_exist} alt="logo_exist" className="landing-page-logo" />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={6} textAlign="center" >
                <Image src={logo_min} alt="logo_min" className="landing-page-logo" />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={6} textAlign="center">
                <Image src={logo_esf} alt="logo_esf" className="landing-page-logo" />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={6} textAlign="center" >
                <Image src={logo_eu} alt="logo_eu" className="landing-page-logo" />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={6} textAlign="center" >
                <Image src={logo_fu} alt="logo_fu" className="landing-page-logo" />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
  </Grid>
);


export default SectionLandingAbout;
