import React, { Component} from 'react';
import InviteTeamForm from './Forms/InviteTeamForm';
import {Grid} from 'semantic-ui-react';

class InviteTeamCard extends Component {

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
    const { inviteTeam, addNotification, reset } = this.props;
    inviteTeam(values)
    .then((response) => {
      if (response.payload.status === 200) {
        addNotification('Invite Send Successfully', 'success', 'tc');
        reset('InviteTeamForm');
      } else if (response.payload.status !== 200 && response.payload.status !== 401) {
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
        <h2 className="inviteTeam-content-header">{userLanguage === 'German' ? 'Mitarbeiter einladen' : 'Invite Team Members'}</h2>
        <div className="sub-heading">{userLanguage === 'German' ? 'Geben Sie die Kontaktdetails Ihrer Partner-Unternehmen ein. Nutzen Sie die Möglichkeit Referenzen auszutauschen, Kontakt zu pflegen und neue Projekte zu entdecken.' : 'Enter the contact details of your team members. They will receive a message with a sign up link that connects them to your organization'}</div>
        <InviteTeamForm
              onSubmit={this.sendInviteFrom}
              language={userLanguage}
              />
      </Grid.Column>
    </Grid>
  );
  }
}

export default InviteTeamCard;
