import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import LoginOrRegisterCard from 'components/Landing/Sections/LoginOrRegisterCard';
import { signIn, signUp, toggleLoginMode, toggleForgetMode, forgotPassword, germanLanguage, englishLanguage} from 'actions/users';
import { addNotification } from 'actions/notification';
import { Button, Modal } from 'semantic-ui-react';
import digitalPartnerLogo from 'images/Digital_Partners_Signet_vertical.png';
import Scrollchor from 'react-scrollchor';
import strings from '../util/language';
import { Grid, Dropdown } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
import '../../styles/components/header.css';


class MobileHeaderLink extends Component {
  render() {
    return (
      <Scrollchor to={this.props.link.scrollTo} animate={this.props.link.animate}>
        <Button className="nav-button-mobile">{this.props.link.textContent}</Button>
      </Scrollchor>
    );
  }
}


class MobileHeaderTrigger extends Component {
  render() {
    const {languageChange} = this.props;
    return (
      <div id="mobile-header-landing">
        <FontAwesome size="2x" name="bars" />
      </div>
    );
  }
}


class MobileHeaderLinksContainer extends Component {
  render() {
    const {languageChange} = this.props;
    const mobileLinks = this.props.links.Visible.map((link, index) => (
      <MobileHeaderLink
        key={index}
        link={link}
      />
    ));
     const mobileLinks2 = this.props.links.dropdown.map((link, index) => (
       <MobileHeaderLink
        key={index}
        link={link}
      />
     ));
    return (
      <Grid verticalAlign="middle" padded>
        <Grid.Column mobile={9} tablet={10} computer={11}>
          <Link onClick={event => {
            window.location.href = "/";
          }}>
            <img className="logo" src={digitalPartnerLogo} role="presentation" />
          </Link>
        </Grid.Column>

        <Grid.Column mobile={3} tablet={2} computer={1} textAlign='right'>
          <Dropdown icon={<MobileHeaderTrigger languageChange={languageChange} />} id="mobile-dropdown-landing">
            <Dropdown.Menu>
              <Scrollchor to="authentication" animate={{offset: -108, duration: 500}}>
                <Button className="lp-button" id="signup-header" onClick={this.props.isLogin ? this.props.toggleLoginMode : null}>{strings.headerSignup}</Button>
              </Scrollchor>
              <br />
              <Scrollchor to="authentication" animate={{offset: -108, duration: 500}}>
                <Button className="lp-button" id="login-header" onClick={this.props.isLogin ? null : this.props.toggleLoginMode}>{strings.headerLogin}</Button>
              </Scrollchor>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid>
    );
  }
}


class DesktopHeaderLink extends Component {
  render() {
    return (
      <Scrollchor to={this.props.link.scrollTo} animate={this.props.link.animate}>
        <Button className="nav-button" >{this.props.link.textContent}</Button>
      </Scrollchor>
    );
  }
}


class DesktopHeaderLinksContainer extends Component {
  render() {
    const desktopHeaderLinks = this.props.links.Visible.map((link, index) => (
      <DesktopHeaderLink
        key={index}
        link={link}
      />
    ));
    const desktopHeaderLinks2 = this.props.links.dropdown.map((link, index) => (
      <DesktopHeaderLink
        key={index}
        link={link}
      />
    ));
    return (
      <Grid centered padded verticalAlign="middle" textAlign="center" className="no-vertical-margin">
        <Grid.Column mobile={3} tablet={3} computer={6} largeScreen={6}>
          <Link onClick={event => {
            window.location.href = "/";
          }}>
            <img className="logo-header-landing" src={digitalPartnerLogo} role="presentation" />
          </Link>
        </Grid.Column>
        <Grid.Column textAlign="right" mobile={9} tablet={9} computer={6} largeScreen={6}>
          <div className="menu">
            <Link to="/login">
              <Button className="lp-button"
                      onClick={this.props.isLogin ? null : this.props.toggleLoginMode}>{strings.headerLogin}</Button>
            </Link>
            <Link to="/signup">
              <Button className="lp-button"
                      onClick={this.props.isLogin ? this.props.toggleLoginMode : null}>{strings.headerSignup}</Button>
            </Link>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}


class LandingHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowWidth: (typeof window !== 'undefined') ? window.innerWidth : undefined,
        mobileNavVisible: false
    };
    this.handleResize = this.handleResize.bind(this);
    this.languageChange = this.languageChange.bind(this);
  }

 languageChange(language) {
   const {germanLanguage, englishLanguage} = this.props;
   strings.setLanguage(language);
   if (language === 'de') {
     germanLanguage();
   } else {
     englishLanguage();
   }
 }

 handleResize() {
   this.setState({windowWidth: window.innerWidth});
 }

 componentDidMount() {
   if (typeof window !== 'undefined') {
     window.addEventListener('resize', this.handleResize);
   }
 }

 /* Avoid memory leaks */
 componentWillUnmount() {
   if (typeof window !== 'undefined') {
     window.removeEventListener('resize', this.handleResize);
   }
 }

 render() {
   let linksContainer;
   const {user: { isLogin }, toggleLoginMode} = this.props;
   const links = {
     Visible: [
      {
      scrollTo: '#our-tech',
      animate: {offset: -70, duration: 500},
      textContent: 'Contact',
      className: 'nav-item',
    }
     ],
    dropdown: [
      {
      scrollTo: '#search-digital',
      animate: {offset: -70, duration: 500},
      textContent: strings.headerSearch,
      className: 'nav-item',
    },
        {
     scrollTo: '#supply-digital',
     animate: {offset: -70, duration: 500},
     textContent: strings.headerSupply,
     className: 'nav-item',
   },
  {
    scrollTo: '#howit-works',
    animate: {offset: -70, duration: 500},
    textContent: strings.headerHowitWorks,
    className: 'nav-item',
   },
   {
    scrollTo: '#pricing',
    animate: {offset: -70, duration: 500},
    textContent: strings.headerPrice,
    className: 'nav-item',
   },
   {
    scrollTo: '#about-us',
    animate: {offset: -70, duration: 500},
    textContent: strings.headerAboutUs,
    className: 'nav-item',
   }
    ]
   };

   if (this.state.windowWidth <= 992) {
     linksContainer = (<MobileHeaderLinksContainer
                       isLogin={isLogin}
                       toggleLoginMode={toggleLoginMode}
                       links={links}
                       languageChange={this.languageChange}
                      />);
   } else {
     linksContainer = (<DesktopHeaderLinksContainer
                        isLogin={isLogin}
                        toggleLoginMode={toggleLoginMode}
                        links={links}
                        languageChange={this.languageChange}
                      />);
   }
   return (
     <header id="header-landing" className="top-bar landing-header">
       {linksContainer}
     </header>
   );
 }
}


LandingHeader.propTypes = {
   user: PropTypes.object,
   toggleLoginMode: PropTypes.func.isRequired,
   germanLanguage: PropTypes.func.isRequired,
   englishLanguage: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
      user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component classNameName passed to it
// Instead, it returns a new, connected component classNameName, for you to use.
export default connect(mapStateToProps, {toggleLoginMode, germanLanguage, englishLanguage})(LandingHeader);
