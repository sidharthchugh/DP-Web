import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {toggleLoginMode, germanLanguage, englishLanguage} from 'actions/users';
import { Button } from 'semantic-ui-react';
import digitalPartnerLogo from 'images/digitalPartnerLogo.png';
import strings from '../util/language';
import { Grid, Dropdown } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
import 'styles/components/header.css';


class MobileHeaderLink extends Component {
  render() {
    return (
      <Link to={this.props.link.scrollTo}>
        <Button className="nav-button-mobile">{this.props.link.textContent}</Button>
      </Link>
    );
  }
}


class MobileHeaderTrigger extends Component {
  render() {
    const {languageChange} = this.props;
    return (
      <div id="mobile-header-landing">
        <FontAwesome size="2x" name="bars" />
        <img className="logo" src={digitalPartnerLogo} role="presentation" />
      </div>
    );
  }
}


class MobileHeaderLinksContainer extends Component {
  render() {
    const {languageChange, projectId} = this.props;
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
      <Grid verticalAlign="middle">
        <Grid.Column mobile={9} tablet={10} computer={10} className="no-gutter">
          <Dropdown icon={<MobileHeaderTrigger languageChange={languageChange} />} id="mobile-dropdown-landing">
            <Dropdown.Menu>
              {mobileLinks}
              {mobileLinks2}
            {!this.props.claim && <Link to={projectId ? `/landing/${projectId}/#authentication` : '/#authentication'}>
              <Button className="nav-button" id={this.props.claim ? "login-header" : "signup-header"} onClick={this.props.isLogin ? this.props.toggleLoginMode : null}>{this.props.claim ? 'Claim Profile' : strings.headerSignup}</Button>
            </Link>}
            {!this.props.claim && <Link to={projectId ? `/landing/${projectId}/#authentication` : '/#authentication'}>
              <Button className="nav-button" id="login-header" onClick={this.props.isLogin ? null : this.props.toggleLoginMode}>{strings.headerLogin}</Button>
            </Link>}
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
        <Grid.Column mobile={3} tablet={2} computer={2} textAlign="left" verticalAlign="middle" className="no-gutter">
          <Button className="nav-button" onClick={() => this.props.languageChange('de')} id="language">DE</Button>
          <Button className="nav-button" onClick={() => this.props.languageChange('en')} id="language">EN</Button>
        </Grid.Column>
      </Grid>
    );
  }
}


class DesktopHeaderLink extends Component {
  render() {
    return (
      <Link to={this.props.link.scrollTo}>
        <Button className="nav-button" >{this.props.link.textContent}</Button>
      </Link>
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
    const {projectId} = this.props;
    return (
      <Grid centered verticalAlign="middle" textAlign="center" className="no-vertical-margin">
        <Grid.Column textAlign="right" mobile={3} tablet={3} computer={3} largeScreen={2}>
          <Link to="/">
            <img className="logo-header-landing" src={digitalPartnerLogo} role="presentation" />
          </Link>
        </Grid.Column>
        <Grid.Column textAlign="center" mobile={9} tablet={9} computer={9} largeScreen={10}>
          <div className="menu">
            <Link to="/blog"><button className="ui button nav-button">Blog</button></Link>
            {desktopHeaderLinks}
            <Dropdown id="dropdown-landing">
              <Dropdown.Menu>
                <div id="header-landing">
                  {desktopHeaderLinks2}
                </div>
              </Dropdown.Menu>
            </Dropdown>
            {this.props.claim && projectId && <Link to={projectId ? `/claim/${projectId}/#authentication` : '/#authentication'}>
              <Button className="nav-button" id={this.props.claim ? "login-header" : "signup-header"} onClick={this.props.isLogin ? this.props.toggleLoginMode : null}>{this.props.claim ? 'Claim Profile' : strings.headerSignup}</Button>
            </Link>}
            {!this.props.claim && <Link to={projectId ? `/landing/${projectId}/#authentication` : '/#authentication'}>
              <Button className="nav-button" id={this.props.claim ? "login-header" : "signup-header"} onClick={this.props.isLogin ? this.props.toggleLoginMode : null}>{this.props.claim ? 'Claim Profile' : strings.headerSignup}</Button>
            </Link>}
            {!this.props.claim && <Link to={projectId ? `/landing/${projectId}/#authentication` : '/#authentication'}>
              <Button className="nav-button" id="login-header" onClick={this.props.isLogin ? null : this.props.toggleLoginMode}>{strings.headerLogin}</Button>
            </Link>}
            <Button className="nav-button" onClick={() => this.props.languageChange('de')} id="language">DE</Button>
            <Button className="nav-button" onClick={() => this.props.languageChange('en')} id="language">EN</Button>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}


class ContactHeader extends Component {
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

//  this() {
//    console.log(this.props.claim)
//  }

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
   const {user: { isLogin }, toggleLoginMode, projectId} = this.props;
   let links = [];

   if (projectId) {
     links = {
     Visible: [
    {
      scrollTo: `/landing/${projectId}/#use-case`,
      textContent: strings.useCasesHeading,
      className: 'nav-item',
    },
      {
      scrollTo: `/landing/${projectId}/#our-tech`,
      textContent: strings.techHeader,
      className: 'nav-item',
    },
   {
      scrollTo: `/landing/${projectId}/#search-digital`,
      textContent: strings.headerSearch,
      className: 'nav-item',
    }
     ],
    dropdown: [
    {
    scrollTo: `/landing/${projectId}/#supply-digital`,
     textContent: strings.headerSupply,
     className: 'nav-item',
   },
  {
    scrollTo: `/landing/${projectId}/#howit-works`,
    textContent: strings.headerHowitWorks,
    className: 'nav-item',
   },
   {
    scrollTo: `/landing/${projectId}/#pricing`,
    textContent: strings.headerPrice,
    className: 'nav-item',
   },
   {
    scrollTo: `/landing/${projectId}/#about-us`,
    textContent: strings.headerAboutUs,
    className: 'nav-item',
   }
    ]
   };
   } else {
      links = {
     Visible: [
    {
      scrollTo: '/#use-case',
      textContent: strings.useCasesHeading,
      className: 'nav-item',
    },
      {
      scrollTo: '/#our-tech',
      textContent: strings.techHeader,
      className: 'nav-item',
    }
     ],
    dropdown: [
      {
      scrollTo: '/#search-digital',
      textContent: strings.headerSearch,
      className: 'nav-item',
    },
        {
     scrollTo: '/#supply-digital',
     textContent: strings.headerSupply,
     className: 'nav-item',
   },
  {
    scrollTo: '/#howit-works',
    textContent: strings.headerHowitWorks,
    className: 'nav-item',
   },
   {
    scrollTo: '/#pricing',
    textContent: strings.headerPrice,
    className: 'nav-item',
   },
   {
    scrollTo: '/#about-us',

    textContent: strings.headerAboutUs,
    className: 'nav-item',
   }
    ]
   };
   }

   if (this.state.windowWidth <= 992) {
     linksContainer = (<MobileHeaderLinksContainer
                       isLogin={isLogin}
                       toggleLoginMode={toggleLoginMode}
                       links={links}
                       projectId={projectId}
                       claim={this.props.claim}
                       languageChange={this.languageChange}
                      />);
   } else {
     linksContainer = (<DesktopHeaderLinksContainer
                        isLogin={isLogin}
                        toggleLoginMode={toggleLoginMode}
                        links={links}
                         projectId={projectId}
                        claim={this.props.claim}
                        languageChange={this.languageChange}
                      />);
   }
   return (
     <Grid.Row>
       <Grid.Column computer={12}>
         {linksContainer}
       </Grid.Column>
     </Grid.Row>
   );
 }
}


ContactHeader.propTypes = {
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
export default connect(mapStateToProps, {toggleLoginMode, germanLanguage, englishLanguage})(ContactHeader);
