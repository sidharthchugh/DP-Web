import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {addNotification} from './../../actions/notification';
import {deleteLogo, updateLogoRequest, updateLogoSuccess, updateLogoFail} from './../../actions/profiles';
import logoPlaceholder from 'images/factory-holder.jpg';
import strings from '../util/language';

const fileSpecs = {
  fileTypes: 'image/jpeg,image/png',
  maxSize: 2097152, // 2MB in bytes
  maxSizeString: '2MB'
};

export const CDN_PREFIX = 'https://digital-4197.kxcdn.com/companylogos/';

export class MatchingLogoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onChoose = this.onChoose.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {logoURI} = this.props;
    // logoURI just got filled -> adding company logo was successful
    // logoURI went back to empty string -> show "Deletion successful" notif
    if (logoURI && !nextProps.logoURI) {
      this.props.addNotification('The company logo was successfully deleted!', 'success', 'tc');
    }
  }

  // NOTE only way to submit the file properly to the server is via jQuery AJAX at the moment,
  // since we can't have a `multipart-data` <form> inside the ProfileForm <form>.
  onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length !== 0) {
      this.props.addNotification(
        `Upload failed: Your chosen file exceeded the file size limit of ${fileSpecs.maxSizeString}.`,
        'error',
        'tc'
      );
    } else {
      const logo = acceptedFiles[0];
      this.props.updateLogoRequest();
      const formData = new FormData();
      formData.append('logo', logo);
      $.ajax({
        url: '/account/logoUpdate',
        type: 'POST',
        processData: false,
        contentType: false,
        dataType: 'json',
        data: formData
      })
      .done(data => this.props.updateLogoSuccess(data))
      .fail(err => this.props.updateLogoFail(err));
    }
  }

  onChoose() {
    // `open()` triggers `onDrop` once file has been chosen.
    this.dropzone.open();
  }

  onDelete() {
    const confirmedDelete = confirm('Are you sure you want to delete the company logo?');
    if (confirmedDelete) this.props.deleteLogo(this.props.logoURI);
  }

  render() {
    const {logoURI, editable} = this.props;
    return (
      <div className={'company-logo--container ' + this.props.className}>
        <img className={'company-logo--img'} src={logoURI ? CDN_PREFIX + logoURI : logoPlaceholder} alt="Company logos" />
      </div>
    );
  }
}

MatchingLogoComponent.propTypes = {
  className: PropTypes.string
};


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
  return {
    editable: state.profile.sections.company.editable
  };
};

const MatchingLogo = connect(
  mapStateToProps,
  {deleteLogo, updateLogoRequest, updateLogoSuccess, updateLogoFail, addNotification}
)(MatchingLogoComponent);
export default MatchingLogo;
