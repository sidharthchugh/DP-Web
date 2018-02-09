import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import strings from '../util/language.js';


class ProjectTitle extends Component {
  constructor(props) {
    super(props);
    this.handleFullProjectOpen = this.handleFullProjectOpen.bind(this);
    this.handleFullProjectClose = this.handleFullProjectClose.bind(this);
    this.state = { fullProjectOpen: false};
  }

  handleFullProjectOpen() {
   this.setState({ fullProjectOpen: true});
  }

  handleFullProjectClose() {
   this.setState({ fullProjectOpen: false});
  }
  render() {
    const {projectTitle} = this.props;
    return (
      <Modal
      trigger={<h2 className="heading3 title-project" onClick={this.handleFullProjectOpen}>{projectTitle}</h2>} open={this.state.fullProjectOpen}
      onClose={this.handleFullProjectClose} closeIcon="close">
        <Modal.Header />
        <Modal.Description>
          <h1>Project full</h1>
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


export default ProjectTitle;
