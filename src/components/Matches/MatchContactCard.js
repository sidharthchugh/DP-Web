import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {contactMatch} from 'actions/matches';
import {contactProjects} from 'actions/projects';
import { addNotification } from 'actions/notification';
import { Grid, Image } from 'semantic-ui-react';
import 'styles/components/matches';
import { withRouter } from 'react-router';
import { isDirty, reset } from 'redux-form';
import MatchContactForm from './Forms/MatchContactForm';

class ContactCard extends Component {

  constructor(props) {
    super(props);
    this.sendContactFrom = this.sendContactFrom.bind(this);
  }

  // Send Values To Database
  sendContactFrom(values) {
    const { contactMatch,contactProjects, addNotification, reset, matchingProfile, searchType, user } = this.props;
    values.searchType = searchType;
    values.senderFirstName = user.firstName;
    values.senderLastName = user.lastName;
    values.emailaddress = user.email;

    const matchValues = Object.assign({}, values, matchingProfile);
    if (searchType === 'projectSearch') {
    contactProjects(matchValues)
    .then((response) => {
      if (response.payload.status === 200) {
        addNotification('Contact Request Send Successfully', 'success', 'tc');
        reset('MatchContactForm');
      } else {
        addNotification(
          'Sorry, there was an error while submitting your request. Please try again',
          'error',
          'tc'
        );
      }
    });
    } else {
    contactMatch(matchValues)
    .then((response) => {
      if (response.payload.status === 200) {
        addNotification('Contact Request Send Successfully', 'success', 'tc');
        reset('MatchContactForm');
      } else {
        addNotification(
          'Sorry, there was an error while submitting your request. Please try again',
          'error',
          'tc'
        );
      }
    });
    }
  }

  render() {
    const {userLanguage, matchingProfile} = this.props; //eslint-disable-line
    return (
      <section className="invitePartner-page matchContacts">
        <Grid centered>
          <Grid.Column computer={8}>
            <h2 className="invitePartner-content-header">{userLanguage === 'German' ? 'Kontakt' : 'Contact'}</h2>
            <Grid>
              <Grid.Column computer={6} className="sub-heading">
                {userLanguage === 'German' ? 'Schicken Sie eine Nachricht an ' + matchingProfile.companyName.typeValues : 'Send a message to ' + matchingProfile.companyName.typeValues}
              </Grid.Column>
              <Grid.Column computer={6}>
                <Image src={matchingProfile.logoURI !== '' ? 'https://digital-4197.kxcdn.com/companylogos/' + matchingProfile.logoURI : null} size="mini" />
              </Grid.Column>
            </Grid>
            <MatchContactForm onSubmit={this.sendContactFrom} />
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}

ContactCard.propTypes = {
  addNotification: PropTypes.func.isRequired
};


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    userLanguage: state.user.userObj.language,
    dirty: {
      MatchContactForm: isDirty('MatchContactForm')(state)
    }
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {contactMatch, contactProjects, addNotification, reset})(ContactCard);
