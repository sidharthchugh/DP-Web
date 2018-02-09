import React from 'react';
import {Link} from 'react-router';
import '../../styles/components/footer';
import footerLogo from '../../images/digitalPartner_logo.png';
import facebookLogo from '../../images/facebookLogo.png';
import twitterLogo from '../../images/twitterLogo.png';
import linkedinLogo from '../../images/linkedinLogo.png';
import xingLogo from '../../images/xingLogo.png';
import angelLogo from '../../images/angelLogo.png';
import strings from '../util/language';
import { Grid, Image } from 'semantic-ui-react';
const webchat = require('!raw!../../styles/components/webchat.css');
import InlineCss from 'react-inline-css';
import FontAwesome from 'react-fontawesome';

const Footer = () => {
  return (
    <Grid centered textAlign="center" id="container-footer">
      <Grid.Column computer={12}>
        <Grid verticalAlign="middle" textAlign="center" className="footer-align">
          <Grid.Column computer={3} tablet={6} verticalAlign="middle" textAlign="center" className="logo-footer">
            <Image src={footerLogo} />
          </Grid.Column>
          <Grid.Column computer={1} tablet={12} stretched verticalAlign="middle" textAlign="center">
            <p>© 2017</p>
          </Grid.Column>
          <Grid.Column computer={2} tablet={12} stretched verticalAlign="middle" textAlign="center" className="contact-align">
            <Link to="/contact">
              <p >{strings.footerContact}</p>
            </Link>
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
          {/* <Grid.Column computer={1} tablet={12} stretched verticalAlign="middle" textAlign="center">
            <a href="https://angel.co/digitalpartner-io">
              {strings.footerAboutUs}
            </a>
          </Grid.Column>
          <Grid.Column computer={1} tablet={12} stretched verticalAlign="middle" textAlign="center">
            <Link to="legal">
              {strings.footerLegal}
            </Link>
          </Grid.Column>*/}
          <Grid.Column computer={2} tablet={12} stretched verticalAlign="middle" textAlign="center" className="reach-align">
            <p>{strings.reachOut}</p>
            <p style={{marginTop: '-15px'}}><FontAwesome name="phone" style={{font: 'normal normal normal 16px/1 FontAwesome', marginRight: '8px' }} />{strings.phoneReach}</p>
          </Grid.Column>
          <Grid.Column computer={4} tablet={12} stretched>
            <div>
              <a href="https://www.facebook.com/digitalpartners.io" className="image-footer-social">
                <FontAwesome name="facebook-official" style={{color: 'white', fontSize: '38px'}} />
              </a>
              <a href="https://twitter.com/DigiPartners_io" className="image-footer-social">
                <FontAwesome name="twitter" style={{color: 'white', fontSize: '38px'}} />
              </a>
              <a href="https://www.linkedin.com/company-beta/17986704/" className="image-footer-social">
                <FontAwesome name="linkedin" style={{color: 'white', fontSize: '38px'}} />
              </a>
              <a href="https://www.xing.com/companies/digitalpartners.io" className="image-footer-social">
                <FontAwesome name="xing" style={{color: 'white', fontSize: '38px'}} />
              </a>
              <a href="https://angel.co/digitalpartner-io" className="image-footer-social">
                <FontAwesome name="angellist" style={{color: 'white', fontSize: '38px'}} />
              </a>
            </div>
          </Grid.Column>
        </Grid>
      </Grid.Column>
      <InlineCss stylesheet={webchat} />
    </Grid>
  );
};


export default Footer;
