import React, {Component} from 'react';
import { connect } from 'react-redux';
import 'styles/components/register';
import LoginForm from './Forms/LoginForm';
import RegisterForm from './Forms/RegisterForm';
import ForgotForm from './Forms/ForgotForm';
import ResetPasswordForm from './Forms/ResetPasswordForm';
import strings from 'components/util/language';
import {Grid} from 'semantic-ui-react';

class ValidateOrResetCard extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */

  constructor(props) {
    super(props);
      this.reset = this.reset.bind(this);
      this.validate = this.validate.bind(this);
      this.validateTeamMembers = this.validateTeamMembers.bind(this);
      this.validatePartners = this.validatePartners.bind(this);
      this.forgot = this.forgot.bind(this);
      this.handleRegistered = this.handleRegistered.bind(this);
      this.state = { registered: false};
  }

  handleRegistered() {
    this.setState({ registered: true});
  }


  // Validate Team Email
  validateTeamMembers(values) {
    const { teamValidateEmail, addNotification, teamToken } = this.props;
    const credentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      position: values.position,
      email: values.email,
      password: values.password,
      teamToken
    };

    teamValidateEmail(credentials)
    .then((response) => {
      if (response.payload && response.payload.status === 200) {
        if (response.payload.request.response.message) {
           addNotification(response.payload.request.response.message, 'success', 'tc');
           // Dirty Hack
           window.location = '/profile';
        }
      }
    });
  }

  // Validate Partner Email
  validatePartners(values) {
    const { partnerValidateEmail, addNotification, partnerToken } = this.props;
    const credentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      position: values.position,
      email: values.email,
      password: values.password,
      partnerToken
    };

    partnerValidateEmail(credentials)
    .then((response) => {
      if (response.payload && response.payload.status === 200) {
        if (response.payload.request.response.message) {
           addNotification(response.payload.request.response.message, 'success', 'tc');
           // Dirty Hack
           window.location = '/profile';
        }
      }
    });
  }

  // Validate Email
  validate(values) {
    const { validateEmail, addNotification, token } = this.props;
    const credentials = {
      email: values.email,
      password: values.password,
      token
    };

    validateEmail(credentials)
    .then((response) => {
      if (response.payload && response.payload.status === 200) {
        if (response.payload.request.response.message) {
           addNotification(response.payload.request.response.message, 'success', 'tc');
           // Dirty Hack
           window.location = '/profile';
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

  // Reset Values for Password
  reset(values) {
    const { resetPassword, addNotification, resetToken } = this.props;
    const credentials = {
     password: values.password,
     resetToken
   };

   resetPassword(credentials)
   .then((response) => {
     if (response.payload && response.payload.status === 200) {
       if (response.payload.request.response.message) {
          addNotification(response.payload.request.response.message, 'success', 'tc');
         // Dirty Hack
         window.location = '/profile';
       }
     } else if (response.payload.status === 300) {
       if (response.payload.request.response.message) {
         addNotification(response.payload.request.response.message, 'success', 'tc');
       }
     }
   });
  }

  renderForm() {
    const { user: { isLogin, isForget }, toggleLoginMode, toggleForgetMode, resetPassword, resetValue, isValid, isTeamValid, isPartnerValid } = this.props; // eslint-disable-line
     if (isValid && !isForget) {
      return (
        <div>
          <h3>{strings.emailConfirmed}:</h3>
          <LoginForm
            onSubmit={this.validate}
            />
          <div className="landing-botton-secondary">
            <button className="alternative-link button-login" onClick={toggleForgetMode}> {strings.signupForgetPassword}</button>
          </div>
        </div>
      );
    } else if (isTeamValid) {
      return (
        <div>
          <h3>{strings.emailConfirmed}:</h3>
          <RegisterForm
            onSubmit={this.validateTeamMembers}
            />
        </div>
      );
    } else if (isPartnerValid) {
      return (
        <div>
          <h3>{strings.emailConfirmed}:</h3>
          <RegisterForm
            onSubmit={this.validatePartners}
            />
        </div>
      );
    } else if (isForget) {
      return (
        <Grid centered>
          <Grid.Column computer={12} textAlign="center">
            {!this.state.registered && <div>
              <h3>{strings.recover}:</h3>
              <ForgotForm onSubmit={this.forgot} onRegistered={this.handleRegistered} />
              <div className="landing-botton-secondary">
                <button className="alternative-link button-login" onClick={toggleForgetMode}>{strings.headerLogin}</button>
              </div>
            </div>}
            {this.state.registered && <div>Please Check your mail</div>}
          </Grid.Column>
        </Grid>
      );
    }
    return (
      <div>
        <h3>{strings.resetPassword}:</h3>
        <ResetPasswordForm
           onSubmit={this.reset}
         />
        <div className="landing-botton-secondary">
          <button className="alternative-link button-login" onClick={toggleForgetMode}> {strings.signupForgetPassword}</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <section className="validate">
        <Grid>
          <Grid.Row centered>
            <Grid.Column mobile={12} tablet={6} computer={3} textAlign="center">
              {this.renderForm()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
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
export default connect(mapStateToProps)(ValidateOrResetCard);
