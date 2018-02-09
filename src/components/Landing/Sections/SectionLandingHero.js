import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import strings from '../../util/language';
import {Link} from 'react-router';
import Scrollchor from 'react-scrollchor';
import arrowwhite from 'images/arrow-white.svg';
import landingpageImage from 'images/landing-page-background.png';
import landingpageImageTablet from 'images/home_slider_tablet.png';
import landingpageImageMobile from 'images/puzzling.jpg';
import logoLine from 'images/line-7.svg';
import logo_viessmann from 'images/Viessmann-logo.png';
import logo_bauer from 'images/Logo_Bauer-und-Boecker_dunkel.png';
import logo_b2bpay from 'images/b2b-dark-small.png';
import logo_pioneer from 'images/pioneer2017.png';


const SectionLandingHero = (props) => {
  const {isLogin} = props;
  return (
    <Grid>
      <Grid.Column computer={12}>
        <Grid centered id="landing-hero">
          <Grid.Column computer={12} largeScreen={12} widescreen={12} tablet={12} className="mobile hidden no-side-padding">
            <video id="background-video" loop autoPlay>
              <source src={'https://prismic-io.s3.amazonaws.com/digitalpartners-web%2Fd7e6b765-ffaa-447b-9256-1e4e47ce5acf_puzzling.mp4'} type="video/mp4" />
              <source src={'https://prismic-io.s3.amazonaws.com/digitalpartners-web%2Fb79743e4-7d4b-4708-8ea3-9e4c6b8404e0_puzzling.ogv'} type="video/ogv" />
                Your browser does not support the video tag.
         </video>
          </Grid.Column>
          <Grid.Column mobile={12} only="mobile" className="no-side-padding">
            <img src={landingpageImageMobile} />
          </Grid.Column>
          <Grid.Column computer={12} className="layer" id="landing-slide-layer">
            <h2>{strings.headingDescription}</h2>
            <h4>{strings.secondHeadingDescription}</h4>
            <Grid.Column computer={4} largeScreen={4} widescreen={4} tablet={4} className="mobile hidden live" textAlign="center">
              <Image className="live-at logo_pioneer" src={logo_pioneer} alt="pioneer" style={{margin: 'auto'}} />
              <h4 className="live-at live-matching">We are live-matching you @Pioneers17!</h4>
            </Grid.Column>
            <Scrollchor to="authentication" animate={{offset: -105, duration: 500}}>
              <Button className="button-normal center-button" onClick={isLogin ? toggleLoginMode : null}>{strings.centerButton}</Button>
            </Scrollchor>
            <h3 className="center-project">{strings.projectLPfirst} <Link to="contact"><u>{strings.projectLPSecond}</u></Link> {strings.projectLPThird} </h3>
          </Grid.Column>
          <Grid.Column computer={12} className="layer" id="extra-slide-layer">
            <Grid centered>
              <Grid.Row>
                <Grid.Column computer={11} largeScreen={11} widescreen={11} tablet={11} mobile={11} textAlign="left">
                  <h2 className="our-part">{strings.ourPartners}</h2>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column computer={4} largeScreen={4} widescreen={4} tablet={4} className="mobile hidden" textAlign="center">
                  <Image src={logo_viessmann} alt="viessmann" style={{margin: 'auto'}} />
                </Grid.Column>
                <Grid.Column computer={4} largeScreen={4} widescreen={4} tablet={4} className="mobile hidden" textAlign="center">
                  <Image src={logo_bauer} alt="Bauer" style={{margin: 'auto'}} />
                </Grid.Column>
                <Grid.Column computer={4} largeScreen={4} widescreen={4} tablet={4} className="mobile hidden" textAlign="center">
                  <Image src={logo_b2bpay} alt="b2bpay" style={{margin: 'auto'}} />
                </Grid.Column>
                <Grid.Column mobile={12} only="mobile">
                  <Grid centered>
                    <Grid.Column mobile={7} textAlign="center" >
                      <Image src={logo_viessmann} alt="viessmann" className="landing-page-logo" />
                    </Grid.Column>
                    <Grid.Column mobile={7} textAlign="center" >
                      <Image src={logo_bauer} alt="Bauer" className="landing-page-logo" />
                    </Grid.Column>
                    <Grid.Column mobile={7} textAlign="center">
                      <Image src={logo_b2bpay} alt="b2bpay" className="landing-page-logo" />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
        <Scrollchor to="#use-case" animate={{offset: -70, duration: 500}} className="landing-section-arrow">
          <Image src={arrowwhite} />
        </Scrollchor>
      </Grid.Column>
    </Grid>
  );
};


export default SectionLandingHero;
