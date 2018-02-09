import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language.js';
import MatchContactCard from 'components/Matches/MatchContactCard';
import {fetchTargetProfiles} from 'actions/projects';

class MatchingContact extends Component {
  constructor(props) {
    super(props);
    this.handleContactOpen = this.handleContactOpen.bind(this);
    this.handleContactClose = this.handleContactClose.bind(this);
    this.state = { fullProjectOpen: false};
    this.state = { contactmodalOpen: false};
    this.state = { matchingProfile: ''};
  }

 componentWillMount() {
 const {fetchTargetProfiles,profileId} = this.props;
   fetchTargetProfiles({profileId:profileId})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ matchingProfile: response.payload.data});
      }
    });
 }

  handleContactOpen() {
    this.setState({ contactmodalOpen: true});
  }

  handleContactClose() {
   this.setState({ contactmodalOpen: false});
  }

  render() {
    const {profileId,userLanguage, searchType, user} = this.props;
    return (
   <Modal
    trigger={<Button onClick={this.handleContactOpen} className="button-small btn-contact-match">{strings.contactButton}</Button>} open={this.state.contactmodalOpen}
      onClose={this.handleContactClose} closeIcon="close">
      <Modal.Description>
        <MatchContactCard userLanguage={userLanguage} matchingProfile={this.state.matchingProfile} searchType={searchType} user={user} />
      </Modal.Description>
      <Modal.Actions>
        <Button button className="button-small cancel-matches" onClick={this.handleContactClose}>
          {strings.closeButton}
        </Button>
      </Modal.Actions>
      </Modal>
    );
  }
}



// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     targetProfiles: state.projects.targetProfile,
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {fetchTargetProfiles})(MatchingContact);
