import React, {Component} from 'react';
import 'styles/components/postauthentication.css';
import postauthenticationemail from 'images/post-authentication-email.png';
import strings from 'components/util/language';
import {Grid} from 'semantic-ui-react';

export default class PostAuthentication extends Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(type) {
    if (type === 'forgotpassword') {
      return (
        <Grid.Column computer={12} textAlign="center">
          <img src={postauthenticationemail} alt="Email logo" />
          <div className="authentication-message">{strings.signupConfirmEmail}</div>
        </Grid.Column>
        );
    } else if (type === 'signup') {
      return (
        <Grid.Column computer={12} textAlign="center">
          <h3>{strings.signupThanks}</h3>
          <img src={postauthenticationemail} alt="Email logo" />
          <div className="authentication-message">{strings.signupConfirmEmail}</div>
        </Grid.Column>
      );
    }
  }

  render() {
    const {type} = this.props;
    return (
      <Grid centered className="post-authentication">
        {this.renderMessage(type)}
      </Grid>
    );
  }
}
