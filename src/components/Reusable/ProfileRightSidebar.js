import React from 'react';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import '../../styles/components/profilerightsidebar.css';
import strings from '../util/language';
import { Grid } from 'semantic-ui-react';
import InlineCss from 'react-inline-css';
const webchat = require('!raw!../../styles/components/webchat.css');

const ProfilePageRightSidebar = (props) => {
    return (
      <Grid>
        <Grid.Column computer={12} className="support">
          <Link to="support" activeClassName="activeSupport" className="inactiveSupport"><FontAwesome name="comments" /> Support</Link>
        </Grid.Column>
        <Grid.Column computer={12} className="footer-links">
          <ul>
            <li><a href="https://angel.co/digitalpartner-io" target='_blank'>{strings.headerAboutUs}</a></li>
            <li><a href="https://angel.co/digitalpartner-io" target='_blank'>Jobs</a></li>
            <li><Link to="/imprint"><span>{strings.imprint}</span></Link></li>
            <li><Link to="/legal"><span>{strings.legal}</span></Link></li>
            <li><Link to="/contact"><span>Contact</span></Link></li>
            <li><Link to="/faq"><span>FAQ</span></Link></li>
          </ul>
        </Grid.Column>
        <InlineCss stylesheet={webchat} />
      </Grid>
    );
  };

export default ProfilePageRightSidebar;
