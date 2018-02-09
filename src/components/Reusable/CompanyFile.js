import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {addNotification} from 'actions/notification';
import {deleteFile, updateFileRequest, updateFileSuccess, toggleProjectsEdit, updateFileFail, toggleLoaded} from 'actions/projects';
import strings from 'components/util/language';
import {Button, Modal} from 'semantic-ui-react';
import Spinner from 'react-spinkit';
import imageExists from 'image-exists';
import TooltipWrapper from 'components/util/TooltipWrapper';

const fileSpecs = {
  fileTypes: '.doc, .docx, .pdf',
  maxSize: 2097152, // 2MB in bytes
  maxSizeString: '10MB'
};
// 'DOCX/DOC/PDF/ODT'

export const CDN_PREFIX = 'https://digital-4197.kxcdn.com/projectFile/'; // add to FTP

export class CompanyFileComponent extends React.Component {
  constructor(props) {
    super(props);
     this.state = {

        };
    this.onChoose = this.onChoose.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {projectfileURI} = this.props;
    // logoURI just got filled -> adding company logo was successful
    // logoURI went back to empty string -> show "Deletion successful" notify
    if (projectfileURI && !nextProps.projectfileURI) {
      this.props.addNotification('The project file was successfully deleted!', 'success', 'tc');
    }
  }

    // Edit and Save Mode for Project Page
  toggleEdit(section, edit_on) {
    this.props.toggleProjectsEdit(section, edit_on);
  }

  // NOTE only way to submit the file properly to the server is via jQuery AJAX at the moment,
  // since we can't have a `multipart-data` <form> inside the ProfileForm <form>.
  onDrop(acceptedFiles) {
    const {toggleLoaded} = this.props;
      const projectfile = acceptedFiles[0];
      this.props.updateFileRequest();
      const formData = new FormData();
      formData.append('projectfile', projectfile);
      this.props.addNotification(
        'You have succesfully uploaded a file',
        'success',
        'tc'
      );
      $.ajax({
        url: '/account/projectfileUpdate',
        type: 'POST',
        headers: {projectIndex: this.props.index, type: projectfile.type},
        processData: false,
        contentType: false,
        dataType: 'json',
        data: formData
      })
      .done((data) => {
        const test = CDN_PREFIX + data.projects[this.props.index].projectfileURI;
        this.toggleEdit('projectName' + this.props.index);
        window.location.reload(1);
       imageExists(test, (exists) => {
        if (exists) {
          this.props.updateFileSuccess(data);
        } else {
        toggleLoaded();
        setTimeout(() => {
          toggleLoaded();
          this.props.updateFileSuccess(data);
        }, 8000);
        }
      });
      })
      .fail(err => this.props.updateFileFail(err));
    }


// this.props.updateFileSuccess(data);
  onChoose() {
    // `open()` triggers `onDrop` once file has been chosen.
    this.dropzone.open();
  }

  onDelete() {
    const confirmedDelete = confirm('Are you sure you want to delete the project file?');
    if (confirmedDelete) this.props.deleteFile(this.props.profiles);// all the file
  }

  render() {
    const {profiles, editable, loadedState, toggleLoaded, userLanguage} = this.props;
    const profileServer = (projectfileURILink) => {
      return CDN_PREFIX + projectfileURILink;
    };
    // console.log(profiles);

    return (
      <div style={{marginLeft: '50rem', marginBottom: '-2.5rem', marginTop: '2rem'}}>
        <div className="dropzone">
          <Dropzone
          style={{}}
          ref={dropzone => this.dropzone = dropzone}
          multiple={false}
          accept={fileSpecs.fileTypes}
          onDrop={this.onDrop}
         />
          <TooltipWrapper name="projectFile" tooltip={userLanguage === 'German' ? 'Dateien zur Projektbewerbung hochladen' : 'Upload a file about your project.'}>
            {!loadedState && <a href={profileServer(profiles.projects[this.props.index].projectfileURI)} download className={(editable ? 'company-file--img-edit' : 'company-file--file')} className="mobile hidden profile-label" >Project File</a>}
          </TooltipWrapper>
        </div>
        {editable ?
          (<div>
            <Button
              type="button"
              className="company-logo--btn"
              onClick={this.onChoose}
            >
              {strings.chooseFile}
            </Button>
            <Button
                type="button"
                className="company-logo--btn"
                style={{display: 'block'}}
                onClick={this.onDelete}
              >
                Delete file
              </Button>
          </div>)
        : null}
      </div>
    );
  }
}

CompanyFileComponent.propTypes = {
  // projectfileURI: PropTypes.string.isRequired,
  className: PropTypes.string,
  // loaded: PropTypes.bool.isRequired,
  toggleLoaded: PropTypes.func.isRequired
};


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
  return {
    profiles: state.projects.profiles,
    // loaded: state.projects.loaded
  };
};

const CompanyFile = connect(
  mapStateToProps,
  {deleteFile, updateFileRequest, updateFileSuccess, toggleProjectsEdit, updateFileFail, toggleLoaded, addNotification}
)(CompanyFileComponent);
export default CompanyFile;
