import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Footer from '../components/Reusable/Footer';
import { contactDetails} from '../actions/contact';
import { addNotification } from '../actions/notification';
import ImprintCard from '../components/Contact/ImprintCard';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import ContactHeader from '../components/Reusable/ContactHeader';
import { Grid, Container } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import '../styles/components/contact';
import strings from '../components/util/language';


class Imprint extends Component {

  constructor(props) {
   super(props);
   this.shiftLanguage = this.shiftLanguage.bind(this);
  }

 shiftLanguage(lang) {
   strings.setLanguage(lang);
   this.setState({});
 }
  render() {
  const {contactDetails, addNotification, reset, user} = this.props; //eslint-disable-line
  return (
    <Grid className="common-background invitePartner-pag overflow-page">
      <Grid.Row>
        <Container fluid>
          <Grid.Column computer={12} style={user.authenticated === false ? {backgroundColor: 'white', marginBottom: '17px'} : {marginBottom: '0px'}}>
            <Grid container>
              <Grid.Column computer={12}>
                {user.authenticated === true && <ProfileHeader userLanguage={user.userObj && user.userObj.language ? user.userObj.language : user.language} />}
              </Grid.Column>
            </Grid>
            {user.authenticated === false && <ContactHeader language={this.shiftLanguage} />}
          </Grid.Column>
          <Grid container>
            <Grid.Row />
            <Grid.Column tablet={12} computer={9} className="no-gutter imprint-footer">
              <ImprintCard
                 contactDetails={contactDetails}
                 addNotification={addNotification}
                 reset={reset}
                 userLanguage={user.userObj && user.userObj.language ? user.userObj.language : user.language}
                 />
            </Grid.Column>
            {user.authenticated === true && <Grid.Column tablet={12} computer={3} textAlign="center">
              <div className="profile-page-right-sidebar">
               <ProfilePageRightSidebar userLanguage={user.userObj && user.userObj.language ? user.userObj.language : user.language} strings={strings} />
             </div>
            </Grid.Column>}
          </Grid>
          {user.authenticated === false && <Footer userLanguage={user.userObj && user.userObj.language ? user.userObj.language : user.language} />}
        </Container>
      </Grid.Row>
    </Grid>
    );
}
}

Imprint.propTypes = {
  contactDetails: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
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
export default connect(mapStateToProps, {contactDetails, addNotification, reset})(Imprint);
