import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { contactDetails} from '../actions/contact';
import { addNotification } from '../actions/notification';
import ProjectContactCard from '../components/Contact/ProjectContactCard';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import Footer from '../components/Reusable/Footer';
import Header from '../components/Reusable/Header';
import ContactHeader from '../components/Reusable/ContactHeader';
import '../styles/components/landing-contact';
import strings from '../components/util/language';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';
import {Grid, Container} from 'semantic-ui-react';


class ProjectContact extends Component {

  constructor(props) {
   super(props);
   this.shiftLanguage = this.shiftLanguage.bind(this);
   this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

 shiftLanguage(lang) {
   strings.setLanguage(lang);
   this.setState({});
 }

 routerWillLeave(nextLocation) {
     const self = this;
     // return false to prevent a transition w/o prompting the user,
     // or return a string to allow the user to decide:
     for (const key in self.props.dirty) {
       if (self.props.dirty[key]) {
         return 'Your work is not saved! Are you sure you want to leave?';
       }
     }
 }

render() {
  const {contactDetails, addNotification, reset, user, userLanguage} = this.props; //eslint-disable-line
  return (
    <Grid className="contact-header profile-page overflow-page">
      <Grid.Row>
        <Grid.Column computer={12} style={{backgroundColor: 'white', marginBottom: '17px'}}>
          <Grid container>
            <Grid.Column computer={12}>
              {user.authenticated === true && <ProfileHeader userLanguage={user.userObj.language} />}
            </Grid.Column>
          </Grid>
          {user.authenticated === false && <ContactHeader language={this.shiftLanguage} />}
        </Grid.Column>
        <Grid.Column computer={12}>
          <Grid>
            <Grid.Column tablet={12} computer={12} className="no-gutter">
              <Grid container>
                <ProjectContactCard
                   userLanguage={userLanguage}
                   contactDetails={contactDetails}
                   addNotification={addNotification}
                   reset={reset}
                   />
              </Grid>
            </Grid.Column>
          </Grid>
          <Footer language={user.language} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
  }
}

ProjectContact.propTypes = {
  user: PropTypes.object,
  contactDetails: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user,
    dirty: {
      /* Contact Forms */
      contactForm: isDirty('ContactForm')(state)
    }
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {contactDetails, addNotification, reset})(ProjectContact);
