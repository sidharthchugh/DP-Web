import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn, signUp, toggleLoginMode, toggleForgetMode, forgotPassword} from '../actions/users';
import { addNotification } from '../actions/notification';
import Header from '../components/Reusable/Header';
import '../styles/components/landingPage.css';
import '../styles/components/landingBody.css';
import SignupCard from '../components/Landing/SignupCard';
import LoginOrRegisterCard from '../components/Landing/Sections/LoginOrRegisterCard';
import Footer from '../components/Reusable/Footer';
import footerImage from '../images/strategic-business-relationships.png';
import strings from '../components/util/language';
import InlineCss from 'react-inline-css';
import { Grid, Image, Container, Button } from 'semantic-ui-react';


class Landing extends Component {
  constructor(props) {
    super(props);
    if (strings.getInterfaceLanguage() === 'de') {
       strings.setLanguage('de');
    } else {
        strings.setLanguage('en');
    }
    if (this.props.route.path === '/signup') this.props.user.isLogin = false;
    if (this.props.route.path === '/login') this.props.user.isLogin = true;
  }


  render() {
  const {signIn, signUp, toggleLoginMode, addNotification, toggleForgetMode, forgotPassword, showMessage,user} = this.props; //eslint-disable-line
  return (
    <div>
        <SignupCard
          toggleLoginMode={toggleLoginMode}
          />
        {/* <LoginOrRegisterCard
           signIn={signIn}
           signUp={signUp}
           projectId={this.props.params.projectId}
           claimprofileId={this.props.params.claimprofileId}
           addNotification={addNotification}
           toggleLoginMode={toggleLoginMode}
           toggleForgetMode={toggleForgetMode}
           forgotPassword={forgotPassword} /> */}
        {/* <Image fluid src={footerImage} />
        <Footer language={user.language} /> */}
        </div>
  );
 }
}

Landing.propTypes = {
  user: PropTypes.object,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired,
  toggleForgetMode: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
      user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {signIn, signUp, toggleLoginMode, toggleForgetMode, forgotPassword, addNotification})(Landing);
