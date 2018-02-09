import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContactForm from './Forms/ContactForm';
import strings from '../util/language';
import {Grid, Button} from 'semantic-ui-react';

class ImprintCard extends Component {

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
      <Grid.Column computer={12} className="profile-card extended-card card-generic">
        {!user.userObj && <h2 className="contact-content-header">{user.language === 'German' ? 'Impressum' : 'Imprint'}</h2>}
        {user.userObj && <h2 className="contact-content-header">{user.userObj.language === 'German' ? 'Impressum' : 'Imprint'}</h2>}
        {/* <h3 className="small-12 columns sub-heading">Impressum - Angaben gem. § 5 TMG </h3>*/}
        {/* <p className="small-12 columns contact-heading">Betreiber & Kontakt:</p>*/}
        <p className="small-12 columns contact-info">
          <strong>Digital Partners Gesellschaft mit beschränkter Haftung (GmbH)</strong> <br />
          Prenzlauer Allee 216 <br />
          D-10405 Berlin <br /><br />
          <strong>{strings.ManageD}:</strong> David-Christian Hamel<br /><br />
          <strong>Email:</strong> <a href="mailto:info@digitalpartners.io">info@digitalpartners.io </a><br />
          <strong>{strings.imprintPhone}:</strong> +49 (0) 176 982 440 76 <br />
          <strong>Phone USA:</strong> +1 650 695 9347<br /><br />
          <strong>{strings.court}:</strong> Amtsgericht Charlottenburg<br />
          <strong>{strings.tradeRegNum}:</strong> HRB 187853 B<br />
          <strong>{strings.taxID}:</strong> DE312928502<br />
        </p>
      </Grid.Column>
    </Grid>
  );
  }
}

ImprintCard.propTypes = {
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
export default connect(mapStateToProps)(ImprintCard);
