import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import {connect} from 'react-redux';
import strings from 'components/util/language.js';
import MatchContactCard from 'components/Matches/MatchContactCard';
import FullProfileCard from 'components/Matches/FullProfileCard';
import {fetchTargetProfiles} from 'actions/projects';
import MatchingLogo from './MatchingLogo';

class MatchLogo extends Component {
  constructor(props) {
    super(props);
    this.handleFullProfileOpen = this.handleFullProfileOpen.bind(this);
    this.handleFullProfileClose = this.handleFullProfileClose.bind(this);
    this.state = { fullprofileOpen: false};
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

  handleFullProfileOpen() {
   this.setState({ fullprofileOpen: true});
  }

 handleFullProfileClose() {
   this.setState({ fullprofileOpen: false});
  }
  render() {
    const {profileId,userLanguage, searchType, user,companyName, logoURI} = this.props;
    return (
    <Modal
      trigger={<div onClick={this.handleFullProfileOpen}> <MatchingLogo logoURI={logoURI} className={this.props.className} /> </div>} open={this.state.fullprofileOpen}
      onClose={this.handleFullProfileClose} closeIcon="close">
        <Modal.Description>
          <FullProfileCard fullprofile={this.state.matchingProfile} matchLogo={this.state.matchingProfile.logoURI} />
        </Modal.Description>
        <Modal.Actions>
          <Button button className="button-small cancel-matches" onClick={this.handleFullProfileClose}>
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
export default connect(mapStateToProps, {fetchTargetProfiles})(MatchLogo);
