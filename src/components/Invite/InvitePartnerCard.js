import React, { Component} from 'react';
import InvitePartnerForm from './Forms/InvitePartnerForm';
import {Grid} from 'semantic-ui-react';

class InvitePartnerCard extends Component {

  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
      this.sendInviteFrom = this.sendInviteFrom.bind(this);
  }

  // Send Values To Database
  sendInviteFrom(values) {
    const { invitePartner, addNotification, reset } = this.props;
    invitePartner(values)
    .then((response) => {
      if (response.payload.status === 200) {
        addNotification('Invite Send Successfully', 'success', 'tc');
        reset('InvitePartnerForm');
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
        <h2 className="invitePartner-content-header">{userLanguage === 'German' ? 'Partner einladen' : 'Invite Partners'}</h2>
        <div className="sub-heading">{userLanguage === 'German' ? 'Geben Sie die Kontaktdetails Ihrer Partner-Unternehmen ein. Nutzen Sie die Möglichkeit Referenzen auszutauschen, Kontakt zu pflegen und neue Projekte zu entdecken.' : 'Enter the contact details of your partners. Your partners will receive a message with a sign up link and your personal message. Engage with them, network, exchange references and build trust!'}</div>
        <InvitePartnerForm
            onSubmit={this.sendInviteFrom} />
      </Grid.Column>
    </Grid>

  );
  }
}

export default InvitePartnerCard;
