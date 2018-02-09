import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleLoginMode} from 'actions/users';
import {Grid, Image, Container, Button} from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';
import LPHeader from 'components/Reusable/LPHeader';
import arrow from 'images/path_2-3.svg';
import arrowwhite from 'images/arrow-white.svg';
import reputation from 'images/group_Copy.svg';
import CommingSoon from './Sections/CommingSoon';
import loader from 'images/loader.gif';
import strings from '../util/language';
import {Link} from 'react-router';
import searchLine from 'images/line.svg';
import SectionLandingHero from './Sections/SectionLandingHero';
import SectionLandingSearch from './Sections/SectionLandingSearch';
import SectionLandingSupply from './Sections/SectionLandingSupply';
import SectionLandingHow from './Sections/SectionLandingHow';
import SectionLandingPricing from './Sections/SectionLandingPricing';
import SectionLandingAbout from './Sections/SectionLandingAbout';
import SectionLandingUseCases from './Sections/SectionUseCases';
import SectionTech from './Sections/SectionTechnologies';


class LandingCard extends Component {

  constructor(props) {
   super(props);
   this.shiftLanguage = this.shiftLanguage.bind(this);
 }

 shiftLanguage(lang) {
   strings.setLanguage(lang);
   this.setState({});
 }

  render() {
    const {user: { isLogin }, toggleLoginMode} = this.props;
    return (
<div>
          <LPHeader language={this.shiftLanguage} />
          {/* <SectionLandingHero /> */}
          <CommingSoon />
          {/* <SectionLandingUseCases />
          <SectionTech />
          <SectionLandingSearch />
          <SectionLandingSupply />
          <SectionLandingHow />
          <SectionLandingPricing />
          <SectionLandingAbout /> */}
          </div>
    );
  }
}

LandingCard.propTypes = {
  user: PropTypes.object,
  toggleLoginMode: PropTypes.func.isRequired
};

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
export default connect(mapStateToProps, {toggleLoginMode})(LandingCard);
