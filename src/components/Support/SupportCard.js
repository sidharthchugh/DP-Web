import React, { Component} from 'react';
import SupportForm from './Forms/SupportForm';
import strings from '../util/language';
import {Grid, Button} from 'semantic-ui-react';

class SupportCard extends Component {

  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
      this.sendSupportForm = this.sendSupportForm.bind(this);
  }

  // Send Values To Database
  sendSupportForm(values) {
    const { supportDetails, addNotification, reset } = this.props;
    supportDetails(values)
    .then((response) => {
      if (response.payload.status === 200) {
        addNotification('Support Request Sent Successfully', 'success', 'tc');
        reset('SupportForm');
      } else {
        addNotification(
          'Sorry, there was an error while submitting your request. Please try again',
          'error',
          'tc'
        );
      }
    });
  }

  render() {
  const {userLanguage} = this.props;
  return (
    <Grid container>
      <Grid.Column computer={12} className="profile-card extended-card card-generic">
        <h2 className="inviteTeam-content-header">Support</h2>
        <div className="sub-heading">{userLanguage === 'German' ? 'Wie können wir Ihnen helfen?' : 'How can we help you?'}</div>
        <SupportForm
          onSubmit={this.sendInviteFrom}
          language={userLanguage}
          />
      </Grid.Column>
    </Grid>
  );
  }
}

export default SupportCard;
