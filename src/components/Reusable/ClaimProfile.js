import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {addNotification} from 'actions/notification';
import {deleteLogo, updateLogoRequest, updateLogoSuccess, updateLogoFail, toggleLoaded} from 'actions/profiles';
import logoPlaceholder from 'images/factory-holder.jpg';
import strings from 'components/util/language';
import {Button, Modal} from 'semantic-ui-react';
import imageExists from 'image-exists';
import Spinner from 'react-spinkit';
import Cropper from 'rc-cropper';


export class ClaimProfileComponent extends React.Component {

  render() {
    return (
      <div className={'company-logo--container ' + this.props.className} >
        <h1>This and that</h1>
      </div>
    );
}
  }

    export default ClaimProfileComponent;
