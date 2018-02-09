import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactForm from './Forms/ContactForm';
import strings from '../util/language';
import {Grid, Button} from 'semantic-ui-react';

class ContactCard extends Component {

  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
      this.sendContactForm = this.sendContactForm.bind(this);
  }

  // Send Values To Database
  sendContactForm(values) {
    const { contactDetails, addNotification, reset } = this.props;
    contactDetails(values)
    .then((response) => {
      if (response.payload.status === 200) {
        addNotification('Contact Send Successfully', 'success', 'tc');
        reset('ContactForm');
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
  const {user, userLanguage} = this.props;
  return (
    <Grid container>
      <Grid.Column computer={12} className="profile-card extended-card card-generic contact-page-card">
        {!user.userObj && <h2 className="contact-content-header">{user.language === 'German' ? 'Kontakt' : 'Contact'}</h2>}
        {user.userObj && <h2 className="contact-content-header">{user.userObj.language === 'German' ? 'Kontakt' : 'Contact'}</h2>}
        <Grid>
          <Grid.Column computer={12}>
            <ContactForm onSubmit={this.sendContactForm} />
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  );
  }
}

ContactCard.propTypes = {
  user: PropTypes.object
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
export default connect(mapStateToProps)(ContactCard);
