import React, {Component} from 'react';
import { connect } from 'react-redux';
import 'styles/components/register';
import {Grid} from 'semantic-ui-react';
import PostAuthentication from './../PostAuthentication';
import RegisterForm from './../Forms/RegisterForm';
import ForgotForm from './../Forms/ForgotForm';
import LoginForm from './../Forms/LoginForm';
import strings from '../../util/language';
import Scrollchor from 'react-scrollchor';

let lang;

class LoginOrRegisterCard extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */

  constructor(props) {
    super(props);
      this.login = this.login.bind(this);
      this.signup = this.signup.bind(this);
      this.forgot = this.forgot.bind(this);
      this.handleRegistered = this.handleRegistered.bind(this);
      this.state = { registered: false};
  }

  handleRegistered() {
    this.setState({ registered: true});
  }

  // When User Click on Login then perform authentification
  login(values) {
    const { signIn, addNotification, projectId } = this.props;
    const credentials = {
     email: values.email,
     password: values.password
   };

  if (projectId) credentials.projectId = projectId;

   signIn(credentials)
   .then((response) => {
       if (response.payload && response.payload.status === 200) {
         if (response.payload.request.response.message) {
           addNotification(response.payload.request.response.message, 'success', 'tc');
         }
         // Dirty Hack
         window.location = '/profile';
       }
   });
  }

  // When user Signup Save values to database and send email
  signup(values) {
    const { signUp, addNotification, user, projectId, claimprofileId } = this.props;
    if (user.language) {
       lang = user.language;
    } else {
      const langMode = strings.getLanguage();
      if (langMode === 'de') {
        lang = 'German';
      } else {
        lang = 'English';
      }
    }
    const credentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      position: values.position,
      email: values.email,
      password: values.password,
      language: lang,
      role: values.role,
      userCompany: values.userCompany,
      userPhone: values.userPhone
    };

    if (projectId) credentials.projectId = projectId;
    if (claimprofileId) credentials.claimprofileId = claimprofileId;
    signUp(credentials)
    .then((response) => {
      if (response.payload && response.payload.status === 200) {
          this.setState({ registered: true});
        if (response.payload.request.response.message) {
           addNotification(response.payload.request.response.message, 'success', 'tc');
        }
      }
    });
  }

  // When user Forget Password
  forgot(values) {
    const { forgotPassword, addNotification } = this.props;
    const credentials = {
     email: values.email
   };

   forgotPassword(credentials)
   .then((response) => {
     if (response.payload && response.payload.status === 200) {
       if (response.payload.request.response.message) {
          addNotification(response.payload.request.response.message, 'success', 'tc');
       }
     }
   });
  }

  renderForm(language) {
    const { user: { isLogin, isForget }, toggleLoginMode, toggleForgetMode} = this.props;
    const {registered} = this.state;
    if (isLogin && !isForget) {
      return (
        <Grid centered container>
          <Grid.Column mobile={12} tablet={10} computer={8} largeScreen={6} widescreen={4} textAlign="center">
            <h3>{strings.headerLogin}:</h3>
            <LoginForm
              onSubmit={this.login}
              language={language}
            />
            <div className="landing-botton-secondary">
              <Scrollchor to="authentication" animate={{offset: -108, duration: 500}}>
                <button className="button-small alternative-link button-login"
                        onClick={this.props.user.isLogin ? this.props.toggleLoginMode : null}>{strings.loginNoAccount}</button>
              </Scrollchor>
            </div>
            <div className="landing-botton-secondary">
              <button className="button-small alternative-link button-login" onClick={toggleForgetMode}>{strings.signupForgetPassword}</button>
            </div>
          </Grid.Column>
        </Grid>
      );
    } else if (isForget) {
      return (
        <Grid centered container>
          <Grid.Column mobile={12} tablet={12} computer={10} largeScreen={8} widescreen={6} textAlign="center">
            {!this.state.registered && <div>
              <h3 >{strings.recover}:</h3>
              <ForgotForm onSubmit={this.forgot} onRegistered={this.handleRegistered} language={language} />
              <div className="landing-botton-secondary">
                <button className="alternative-link button-login" onClick={toggleForgetMode}>{strings.headerLogin}</button>
              </div>
            </div>}
            {this.state.registered && <PostAuthentication type="forgotpassword" />}
          </Grid.Column>
        </Grid>
      );
    }
    return (
      <Grid centered container>
        <Grid.Column mobile={12} tablet={12} computer={10} largeScreen={8} widescreen={6} textAlign="center" >
          {!registered && <div>
            <h3>{strings.headerSignup}:</h3>
            <RegisterForm onSubmit={this.signup} language={language} />
            {/* <div className="landing-botton-secondary">
              <button className="alternative-link button-login" onClick={toggleLoginMode}>{strings.headerLogin}</button>
            </div> */}
            <div className="landing-botton-secondary">
              <Scrollchor to="authentication" animate={{offset: -108, duration: 500}}>
                <button className="button-small alternative-link button-login"
                        onClick={this.props.user.isLogin ? null : this.props.toggleLoginMode}>{strings.signupAlreadySignedUp}</button>
              </Scrollchor>
            </div>
          </div>}
          {registered && <PostAuthentication type="signup" />}
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    const {user} = this.props;
    return (
      <Grid centered textAlign="center" id="landing-login-register">
        <Grid.Column
          tablet={12}
          computer={10}
          widescreen={8}
          largeScreen={6}
          id="authentication"
          textAlign="center">
          {this.renderForm(user.language)}
        </Grid.Column>
      </Grid>
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
export default connect(mapStateToProps)(LoginOrRegisterCard);
