import React from 'react'
import {connect} from 'react-redux';
import { Dropdown } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';
import CopyToClipboard from 'react-copy-to-clipboard';
import { addNotification } from 'actions/notification';
import '../../styles/components/sharinglink';

const ellipsis = <FontAwesome name="ellipsis-h"  style={{color: '#ff6d6a'}}  />
const linkDesign = <FontAwesome name="link" />

class SharingLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {copied:false}
    this.onCopy = this.onCopy.bind(this);
  } 
  onCopy() {
    this.setState({copied: true});
    this.props.addNotification(this.props.notify, 'success', 'tc');
  }
  render() {
    return (
      <div>
        <CopyToClipboard text={this.props.projectLink}> 
          <Dropdown text= {ellipsis} >
            <Dropdown.Menu>
            <Dropdown.Item text=' Share link' onClick={this.onCopy} icon = {linkDesign} />
            </Dropdown.Menu>
          </Dropdown>
        </CopyToClipboard>
      </div>
    );
  }
}
function mapStateToProps() {
  return {
  };
}
export default connect(mapStateToProps, {addNotification})(SharingLink);