import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import '../../styles/components/profileheader';
import {fetchProfiles} from '../../actions/profiles';
import digitalPartnerLogo from '../../images/centeredLogo.png';
import settingsIcon from '../../images/settings-icon.png';
import {CDN_PREFIX} from './CompanyLogo';
import strings from '../util/language';
import FontAwesome from 'react-fontawesome';
import { Dropdown } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';
import logoPlaceholder from '../../images/factory-holder.jpg';


class MobileHeaderLink extends Component {
  render() {
    return (
      <Grid.Column>
        <Link to={this.props.link.linkTo} activeClassName={this.props.link.activeClassName} className={this.props.link.mobileClassName}>
          <FontAwesome
             name={this.props.link.iconName}
             className="header-icon"
             size="2x"
           />
        </Link>
      </Grid.Column>
    );
  }
}


class MobileHeaderLinksContainer extends Component {
  render() {
    const mobileLinks = this.props.links.map((link, index) => (
      <MobileHeaderLink
        key={index}
        link={link}
      />
    ));
    return (
      <Grid columns={11} centered>
        <Grid.Column mobile={4} width={4} className="profile-container-logo" textAlign="left">
          <img className="logo-header-profile-mobile" src={digitalPartnerLogo} role="presentation" />
        </Grid.Column>
        {mobileLinks}
        <MobileHeaderLink link={this.props.link_settings} />
        <Grid.Column>
          {this.props.logoURI ?
            <div className="container-profile-logo-user">
              <Link to="profile">
                <img
                  src={CDN_PREFIX + this.props.logoURI}
                  className="profile-logo-user"
                  alt="User avatar"
                />
              </Link>
            </div>
          : null
        }
        </Grid.Column>
      </Grid>
    );
  }
}


class DesktopHeaderLink extends Component {
  render() {
    return (
      <div className="header-container-link">
        <Link to={this.props.link.linkTo} activeClassName={this.props.link.activeClassName} className={this.props.link.className}>
          {this.props.link.iconName
            ? <FontAwesome name={this.props.link.iconName} className="header-icon" />
            : nul3
          }
          {this.props.link.textContent}
        </Link>
      </div>
    );
  }
}


class DesktopHeaderLinksContainer extends Component {
  render() {
    const desktopHeaderLinks = this.props.links.map((link, index) => (
      <DesktopHeaderLink
        key={index}
        link={link}
      />
    ));
    const {logoURI} = this.props;
    return (
      <Grid>
        <Grid.Column computer={2} textAlign="left" className="no-gutter">
          <Link to="/">
            <img className="logo" src={digitalPartnerLogo} role="presentation" />
          </Link>
        </Grid.Column>
        <Grid.Column computer={10} textAlign="right" className="no-gutter">
          {desktopHeaderLinks}
        </Grid.Column>
      </Grid>
    );
  }
}


const ProfileHeaderRight = props => (
  <Grid.Column
    only={props.only}
    mobile={props.responsive.mobile}
    tablet={props.responsive.tablet}
    computer={props.responsive.computer}
    largeScreen={props.responsive.largeScreen}
    widescreen={props.responsive.widescreen}
    className={'side-padding-null'}>
    <Grid centered>
      <Grid.Column computer={12} textAlign="right" className="no-gutter">
        <DesktopHeaderLink
            link={props.link_settings}
          />
        {props.logoURI ?
          <div className="container-profile-logo-user">
            <Link to="profile">
              <img
                    src={CDN_PREFIX + props.logoURI}
                    className="profile-logo-user"
                    alt="User avatar"
                  />
            </Link>
          </div>
            : null
          }
      </Grid.Column>
    </Grid>
  </Grid.Column>
);


class AdminHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowWidth: (typeof window !== 'undefined') ? window.innerWidth : undefined,
        mobileNavVisible: false
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
      // this.props.fetchProfiles();
  }

  /* Avoid memory leaks */
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  render() {
    const links = [
      {
        linkTo: '/profile',
        activeClassName: 'activeHeader',
        className: 'btn-header',
        mobileClassName: 'btn-header-mobile mobilemarg',
        iconName: 'home',
        textContent: strings.webAppNav1
      },

      {
        linkTo: '/projects',
        activeClassName: 'activeHeader',
        className: 'btn-header',
        mobileClassName: 'btn-header-mobile mobilemarg1',
        iconName: 'suitcase',
        textContent: strings.webAppNav5
      },
      {
        linkTo: '/search',
        activeClassName: 'activeHeader',
        className: 'btn-header',
        mobileClassName: 'btn-header-mobile mobilemarg2',
        iconName: 'search',
        textContent: strings.webAppNav2
      },
      {
        linkTo: '/matches',
        activeClassName: 'activeHeader',
        className: 'btn-header',
        mobileClassName: 'btn-header-mobile mobilemarg3',
        iconName: 'bullseye',
        textContent: strings.webAppNav3
      },
    ];
    const link_settings = {
      linkTo: '/settings',
      activeClassName: 'activeHeader',
      className: 'btn-header-settings',
      mobileClassName: 'btn-header-mobile',
      iconName: 'cog',
      textContent: strings.webAppNav4
    };
    const {logoURI, userLanguage} = this.props;
    let linksContainer;
    if (userLanguage === 'German') {
        strings.setLanguage('de');
    } else {
        strings.setLanguage('en');
    }
    if (this.state.windowWidth <= 991) {
      linksContainer = (<MobileHeaderLinksContainer
                        logoURI={logoURI}
                        links={links}
                        link_settings={link_settings} />);
    } else {
      linksContainer = <DesktopHeaderLinksContainer logoURI={logoURI} links={links} />;
    }
    return (
      <Grid centered className="container-header-profile">
        <Grid.Row>
          <Grid.Column largeScreen={9} computer={9} tablet={12} textAlign="right">
            {linksContainer}
          </Grid.Column>
          <ProfileHeaderRight
              logoURI={this.props.logoURI}
              link_settings={link_settings}
              only="large screen"
              responsive={{
                mobile: null,
                tablet: null,
                computer: null,
                largeScreen: 3,
                widescreen: 3,
              }}
             />
          <ProfileHeaderRight
             logoURI={this.props.logoURI}
             link_settings={link_settings}
             only="computer"
             responsive={{
               mobile: null,
               tablet: null,
               computer: 3,
               largeScreen: null,
               widescreen: null,
             }}
            />
        </Grid.Row>
      </Grid>
    );
  }
}


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
  return {
   };
};

export default connect(mapStateToProps, {fetchProfiles})(AdminHeaderContainer);
