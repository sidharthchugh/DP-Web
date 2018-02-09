import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toggleLoginMode} from 'actions/users';
import {Grid, Image, Container, Button} from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';
import Header from 'components/Reusable/Header';
import footerImage from 'images/group_46.svg';
import davidImage from 'images/group-4.png';
import sidharthImage from 'images/group-5.png';
import logoLine from 'images/line-7.svg';
import twitter from 'images/bitmap.png';
import linkedIn from 'images/bitmap-1.png';
import xing from 'images/bitmap-2.png';
import arrow from 'images/path_2-3.svg';
import arrowwhite from 'images/arrow-white.svg';
import pricingBulletShape1 from 'images/combined_Shape.svg';
import pricingBulletShape2 from 'images/combined_Shape-1.svg';
import pricingBulletShape3 from 'images/combined_Shape-2.svg';
import howitWorksImage from 'images/group_20.svg';
import customerImage from 'images/stroke_268___Stroke_269___Stroke_270.svg';
import supplyLine from 'images/line-3.svg';
import supplyIndustry from 'images/group-3.svg';
import contactSupply from 'images/group_16.svg';
import reputation from 'images/group_Copy.svg';
import landingpageImage from 'images/landing-page-background.png';
import searchDigitalImage from 'images/women_thinking_680.png';
import ideate from 'images/group.svg';
import searchCompare from 'images/group-1.svg';
import realize from 'images/group-2.svg';
import searchLine from 'images/line.svg';
import strings from '../util/language';

class LandingBody extends Component {

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
      <section className="landing-page">
        <Header language={this.shiftLanguage} />
      </section>
    );
  }
}

LandingBody.propTypes = {
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
export default connect(mapStateToProps, {toggleLoginMode})(LandingBody);
