import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { teamValidateEmail} from '../actions/invites';
import { addNotification } from '../actions/notification';
import CenteredLogo from '../components/Landing/CenteredLogo';
import Footer from '../components/Reusable/Footer';
import ValidateOrResetCard from '../components/Landing/ValidateOrResetCard';
import '../styles/components/validateresetemail.css';

const ValidateTeamMember = (props) => {
  const {teamValidateEmail, addNotification} = props; //eslint-disable-line
  return (
    <section className="authentication-action overflow-page">
      <CenteredLogo />
      <ValidateOrResetCard
         isTeamValid
         teamToken={props.params.teamToken}
         teamValidateEmail={teamValidateEmail}
         addNotification={addNotification}
         />
      <Footer />
    </section>
    );
};

ValidateTeamMember.propTypes = {
  teamValidateEmail: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps() {
  return {};
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {teamValidateEmail, addNotification})(ValidateTeamMember);
