import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Grid, Segment, Container, Image, Button} from 'semantic-ui-react';
import { signIn, signUp, toggleLoginMode, toggleForgetMode, forgotPassword} from 'actions/users';
import LoginOrRegisterCard from 'components/Landing/Sections/LoginOrRegisterCard';
import strings from '../../util/language';
import {Link} from 'react-router';
import {notify} from 'actions/users';
import Scrollchor from 'react-scrollchor';
import { addNotification } from 'actions/notification';
import arrowwhite from 'images/arrow-white.svg';
import landingpageImage from 'images/landing-page-background.png';
import landingpageImageTablet from 'images/home_slider_tablet.png';
import landingpageImageMobile from 'images/puzzling.jpg';
import logoLine from 'images/line-7.svg';
import Comming_Soon from 'images/Comming_soon.png';
import 'styles/components/footer';
import footerLogo from 'images/Digital_Partners_Signet_vertical.png';
import facebookLogo from 'images/facebookLogo.png';
import twitterLogo from 'images/twitterLogo.png';
import linkedinLogo from 'images/linkedinLogo.png';
import xingLogo from 'images/xingLogo.png';
import angelLogo from 'images/angelLogo.png';
import InlineCss from 'react-inline-css';
import FontAwesome from 'react-fontawesome';
import CommingSoonForm from '../Forms/CommingSoonForm';


class CommingSoonSignup extends Component {

  constructor(props) {
    super(props);
      this.notifyme = this.notifyme.bind(this);
      this.state = { registered: false};
  }

  handleRegistered() {
    this.setState({ registered: true});
  }

  notifyme(values) {
   const {notify, addNotification} = this.props;

   notify({email: values.notifyme})
   .then((response) => {
     if (response.payload && response.payload.status === 200) {
         this.setState({ registered: true});
       if (response.payload.request.response.message) {
          addNotification(response.payload.request.response.message, 'success', 'tc');
       }
     }
   });
  }


render() {
  const {signIn, signUp, toggleLoginMode, addNotification, toggleForgetMode, forgotPassword, showMessage,user} = this.props; //eslint-disable-line
  return (
    <div>
     <Segment className="mainPage-firstSection">
      <Container className="mainPage-container">
       <Grid.Column computer={12} className="layer" id="landing-slide-layer">
       <LoginOrRegisterCard
           signIn={signIn}
           signUp={signUp}
           addNotification={addNotification}
           toggleLoginMode={toggleLoginMode}
           toggleForgetMode={toggleForgetMode}
           forgotPassword={forgotPassword} />
       </Grid.Column>
       </Container>
    </Segment>


    <Segment className="mainPage-secondSection">
    <Container className="mainPage-container">
    <Grid.Column computer={12} className="layer" id="extra-slide-layer">
    <Grid centered textAlign="center" id="landing-footer">{/*
      <Grid.Column computer={12}>
         <Grid verticalAlign="middle" textAlign="center" className="footer-align">
            <Grid.Column computer={3} tablet={6} verticalAlign="middle" textAlign="center" className="extra-padding">
             <Image src={footerLogo} />
           </Grid.Column>
           <Grid.Column computer={3} tablet={12} stretched verticalAlign="middle" textAlign="center" className="contact-align">
              <p>DigitalPartners Gmbh</p>
              <p>Prenzlauer Alle 216</p>
              <p>D-10405 Berlin Germany</p>
              <br />
              <p>David.Hamel@DigitalPartners.io</p>
              <p>+49 (0)1769 824 4076 </p>
              <br />
              <br />
              <br />
              <p>Made with <FontAwesome name="heart" style={{color: 'white', fontSize: '38px'}} /> in Berlin </p>
            </Grid.Column>
            <Grid.Column computer={2} tablet={12} stretched verticalAlign="middle" textAlign="center" className="footer-padding">
            <Link to="/contact">
            <p >{strings.footerContact}</p>
            </Link>
            <Link to="/blog">
            <p>Blog</p>
            </Link>
            <a target="_blank" href="https://angel.co/digitalpartner-io/jobs">
              <p>{strings.footerAboutUs}</p>
            </a>
          </Grid.Column>
            <Grid.Column computer={2} tablet={12} stretched verticalAlign="middle" textAlign="center" className="imprint-padding">
            <Link to="/imprint">
              <p >{strings.footerImprint}</p>
            </Link>
            <a target="_blank" href="https://angel.co/digitalpartner-io/jobs">
              <p>{strings.footerAboutUs}</p>
            </a>
            <Link to="/legal">
              <p>{strings.footerLegal}</p>
            </Link>
            <Link to="/faq">
              <p>FAQ</p>
            </Link>
          </Grid.Column>
            <Grid.Column computer={2} tablet={12} stretched className="extra-padding">
              <div>
                <a href="https://www.facebook.com/digitalpartners.io" className="image-footer-social">
                  <FontAwesome name="facebook-official" style={{color: 'white', fontSize: '38px'}} />
                </a>
                <a href="https://www.linkedin.com/company-beta/17986704/" className="image-footer-social">
                  <FontAwesome name="linkedin" style={{color: 'white', fontSize: '38px'}} />
                </a>
                <a href="https://twitter.com/DigiPartners_io" className="image-footer-social">
                  <FontAwesome name="twitter" style={{color: 'white', fontSize: '38px'}} />
                </a>
              </div>
            </Grid.Column>
          </Grid>
      </Grid.Column>    */}
         </Grid>
         </Grid.Column>
    </Container>
    </Segment>


    </div>
    // <Grid>
    //   <Grid.Column computer={12}>
    //     <Grid centered id="landing-hero" className={'landingpage-bgimage'}>
    //     <Grid.Column computer={12} className="layer" id="landing-logo">
    //          <Image src={footerLogo} />
    //       </Grid.Column>
    //       <Grid.Column computer={12} className="layer" id="landing-slide-layer">
    //          <h2>{strings.headingDescription}</h2>
    //         <h4>{strings.secondHeadingDescription}</h4>
    //         {!this.state.registered && <CommingSoonForm onSubmit={this.notifyme} />}
    //         {this.state.registered && <h3> Email </h3>}
    //       </Grid.Column>
    //       <Grid.Column computer={12} className="layer" id="extra-slide-layer">
    //       <Grid centered textAlign="center" id="container-footer">
    //       <Grid.Column computer={12}>
    //         <Grid verticalAlign="middle" textAlign="center" className="footer-align">
    //           <Grid.Column computer={4} tablet={6} verticalAlign="middle" textAlign="center" className="logo-footer">
    //             <Image src={footerLogo} />
    //           </Grid.Column>
    //           <Grid.Column computer={4} tablet={12} stretched verticalAlign="middle" textAlign="center" className="contact-align">
    //             <p>DigitalPartners Gmbh</p>
    //             <p>Prenzlauer Alle 216</p>
    //             <p>D-10405 Berlin Germany</p>
    //             <br />
    //             <br />
    //             <p>Hello@DigitalPartners.io</p>
    //             <br />
    //             <br />
    //             <p>Made with in Berlin</p>
    //           </Grid.Column>
    //           <Grid.Column computer={4} tablet={12} stretched>
    //             <div>
    //               <a href="https://www.facebook.com/digitalpartners.io" className="image-footer-social">
    //                 <FontAwesome name="facebook-official" style={{color: 'white', fontSize: '38px'}} />
    //               </a>
    //               <a href="https://www.linkedin.com/company-beta/17986704/" className="image-footer-social">
    //                 <FontAwesome name="linkedin" style={{color: 'white', fontSize: '38px'}} />
    //               </a>
    //               <a href="https://twitter.com/DigiPartners_io" className="image-footer-social">
    //                 <FontAwesome name="twitter" style={{color: 'white', fontSize: '38px'}} />
    //               </a>
    //             </div>
    //           </Grid.Column>
    //         </Grid>
    //       </Grid.Column>
    //       </Grid>
    //       </Grid.Column>
    //     </Grid>
    //   </Grid.Column>
    // </Grid>
  );
}
}


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
      user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, {notify, signIn, signUp, toggleLoginMode, toggleForgetMode, forgotPassword, addNotification})(CommingSoonSignup);
