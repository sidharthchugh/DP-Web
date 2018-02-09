import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NotificationContainer from '../containers/Notification';
import '../styles/common/semantic.min.css';
import '../styles/common/globals.css';
import '../styles/main.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { isDirty } from 'redux-form';
/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
  */
class App extends Component {

  componentWillMount() {
    const self = this;
    /* Display notification if user reloads page */
    if (typeof (window) !== 'undefined') {
    function alertUnsaved(e) {
      for (const key in self.props.dirty) {
        if (self.props.dirty[key]) {
          const confirmationMessage = 'It looks like you have been editing something. '
                        + 'If you leave before saving, your changes will be lost.';

          (e || window.event).returnValue = confirmationMessage; // Gecko + IE
          return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
        }
      }
    }
    // Attaching Event to Browser
    window.addEventListener('popstate', alertUnsaved);
    window.addEventListener('beforeunload', alertUnsaved);
    }
  }


  render() {
    const {children} = this.props;
    return (
      <section className="app">
        <NotificationContainer />
        {children}
      </section>
    );
  }


}


App.propTypes = {
  addNotification: PropTypes.func.isRequired,
};

// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     dirty: {
       /* Profile Forms */
       general: isDirty('GeneralInformation')(state),
       company: isDirty('CompanyDescription')(state),
       product: isDirty('Product')(state),
       reference: isDirty('Reference')(state),
       /* Search Forms */
       strategicPartnerDetailSearch: isDirty('StrategicPartnerDetailSearch')(state),
       productServiceSearch: isDirty('ProductServiceSearch')(state),
       /* Settings Form */
       settingsFrom: isDirty('SettingsForm')(state),
       /* Support Form */
       supportForm: isDirty('SupportForm')(state),
       /* Contact Form */
       contactForm: isDirty('ContactForm')(state),
       /* Invite Partner Form */
       invitePartnerForm: isDirty('InvitePartnerForm')(state),
       /* Invite Team Form */
       inviteTeamForm: isDirty('InviteTeamForm')(state)
     }
  };
}


App.propTypes = {
  children: PropTypes.object
};


export default connect(mapStateToProps)(App);
