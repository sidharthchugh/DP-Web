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

const fileSpecs = {
  fileTypes: 'image/jpeg,image/png',
  maxSize: 2097152, // 2MB in bytes
  maxSizeString: '2MB'
};

export const CDN_PREFIX = 'https://digital-4197.kxcdn.com/companylogos/';

export class CompanyLogoComponent extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
            image2: '',
            image2Loaded: false,
        };
    this.handleFullProfileOpen = this.handleFullProfileOpen.bind(this);
    this.handleFullProfileClose = this.handleFullProfileClose.bind(this);
    this.onChoose = this.onChoose.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.crop = this.crop.bind(this);
    this.state = { open: false };
  }

  componentWillReceiveProps(nextProps) {
    const {logoURI} = this.props;
    // logoURI just got filled -> adding company logo was successful
    // logoURI went back to empty string -> show "Deletion successful" notify
    if (logoURI && !nextProps.logoURI) {
      this.props.addNotification('The company logo was successfully deleted!', 'success', 'tc');
    }
  }

  // NOTE only way to submit the file properly to the server is via jQuery AJAX at the moment,
  // since we can't have a `multipart-data` <form> inside the ProfileForm <form>.
  onDrop(acceptedFiles, rejectedFiles) {
    const {toggleLoaded} = this.props;
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
      .done((data) => {
        const test = CDN_PREFIX + data.logoURI;
       imageExists(test, (exists) => {
        if (exists) {
          this.props.updateLogoSuccess(data);
        } else {
         this.props.toggleLoaded();
        setTimeout(() => {
          this.props.toggleLoaded();
          this.props.updateLogoSuccess(data);
        }, 8000);
        }
      });
      })
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

  crop() {
    this.setState({ open: false });
    const canvas = this.refs.cropper.getCroppedCanvas();
    const url = canvas.toDataURL(); // image url
    const blob = canvas.toBlob((blob) => {
      // upload the blob or do anything else
      this.props.updateLogoRequest();
      const formData = new FormData();
      formData.append('logo', blob);
      $.ajax({
        url: '/account/logoUpdate',
        type: 'POST',
        processData: false,
        contentType: false,
        dataType: 'json',
        data: formData
      })
      .done((data) => {
        const test = CDN_PREFIX + data.logoURI;
       imageExists(test, (exists) => {
        if (exists) {
          this.props.updateLogoSuccess(data);
        } else {
        this.props.toggleLoaded();
        setTimeout(() => {
          this.props.toggleLoaded();
          this.props.updateLogoSuccess(data);
        }, 8000);
        }
      });
      })
      .fail(err => this.props.updateLogoFail(err));
  });
}
handleFullProfileOpen() {
  this.setState({ open: true });
 }

 handleFullProfileClose() {
  this.setState({ open: false });
 }

  render() {
    const {logoURI, editable, loadedState, toggleLoaded, url} = this.props;
    const options = {
      aspectRatio: 9 / 9,
    };
    const imageServer = (logoURI) => {
        return CDN_PREFIX + logoURI;
  };

    return (
      <div className={'company-logo--container ' + this.props.className}>
        <Dropzone
          style={{display: 'none'}}
          ref={dropzone => this.dropzone = dropzone}
          multiple={false}
          accept={fileSpecs.fileTypes}
          maxSize={fileSpecs.maxSize}
          onDrop={this.onDrop}
        />
        {!loadedState && <img className={(editable ? 'company-logo--img-edit' : 'company-logo--img')} src={logoURI ? imageServer(logoURI) : logoPlaceholder} alt="logo" />}
        {loadedState && <Spinner spinnerName="three-bounce" />}
        {editable ?
          (<div>
            <Modal
              trigger={<Button type="button" className="company-logo--btn " onClick={this.handleFullProfileOpen} style={{display: 'block'}}>{logoURI ? strings.changeFile : strings.chooseFile }</Button>} open={this.state.open}
              onClose={this.handleFullProfileClose} closeIcon="close" className="Modalshyt">
              <Modal.Header>{logoURI ? strings.cropFile : strings.uploadFile }</Modal.Header>
              <Modal.Content image className="cropCenter">
                <Cropper src={logoURI ? imageServer(logoURI) : logoPlaceholder} options={options} alt="Company logo" ref="cropper" id="image" />

              </Modal.Content>
              <Modal.Actions className="buttonsCrop">
                <button
                    type="button"
                    className="modal-button"
                    onClick={this.onChoose}
                  >
                  {logoURI ? strings.changeFile : strings.chooseFile }
                </button>
                <div>
                  {loadedState && <Spinner spinnerName="three-bounce" />}
                </div>
                <button type="button" className="company-logo--btn modal-button" style={{display: 'block'}} onClick={this.crop} actions={[{triggerClose: true}]}>Save</button>
              </Modal.Actions>
            </Modal>
            <Button
                type="button"
                className="company-logo--btn"
                style={{display: 'block'}}
                onClick={this.onDelete}
              >
                Delete file
              </Button>
            <span className="company-logo--text-help">
              (Please choose a <br /> square image; jpeg, <br />png; max. {fileSpecs.maxSizeString})
            </span>
          </div>)
        : null}
      </div>
    );
  }
}

CompanyLogoComponent.propTypes = {
  logoURI: PropTypes.string.isRequired,
  className: PropTypes.string,
  loaded: PropTypes.bool.isRequired,
  toggleLoaded: PropTypes.func.isRequired
};


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
  return {
    editable: state.profile.sections.company.editable,
    loadedState: state.profile.loadedState
  };
};

const CompanyLogo = connect(
  mapStateToProps,
  {deleteLogo, updateLogoRequest, updateLogoSuccess, updateLogoFail, toggleLoaded, addNotification}
)(CompanyLogoComponent);
export default CompanyLogo;
