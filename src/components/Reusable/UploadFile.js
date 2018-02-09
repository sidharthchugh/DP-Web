import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {deleteProjectApplicationFile} from 'actions/projects';

const fileSpecs = {
  fileTypes: '.doc, .docx, .pdf'
};
export const CDN_PREFIX = 'https://digital-4197.kxcdn.com/projectFile/'; // add to FTP
const paperClip = <FontAwesome name="paperclip" />;

class UploadFile extends React.Component {
  constructor() {
    super();
    this.state = { acceptedFiles: [], upload: false};
    this.onChoose = this.onChoose.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onDelete = this.onDelete.bind(this);
  }

	onDrop(acceptedFiles) {
		this.setState({
      acceptedFiles
    });
		const {deleteProjectApplicationFile, projectfileApplicationURI, toggleLoaded} = this.props;
		const projectfile = acceptedFiles[0];
		const formData = new FormData();
		formData.append('projectfile', projectfile);
		$.ajax({
			url: '/account/projectfileApplicationUpdate',
			type: 'POST',
			headers: {type: projectfile.type},
			processData: false,
			contentType: false,
			dataType: 'json',
			data: formData
		})
		.done((data) => {
      // console.log(data.projectsApplication, 'test');
      const test = CDN_PREFIX + data.projectsApplication.projectfileApplicationURI;
		});
	}

	onChoose() {
		// `open()` triggers `onDrop` once file has been chosen.
		this.dropzone.open();
    this.setState({upload: true});
	}

	onDelete() {
		// var fileToSend = this.state.acceptedFiles
		// fileToSend = fileToSend[0].name
		const {deleteProjectApplicationFile, projectfileApplicationURI} = this.props;
		const confirmedDelete = confirm('Are you sure you want to delete the project file?');
		this.setState({upload: false});
		if (confirmedDelete) this.props.deleteProjectApplicationFile(projectfileApplicationURI);// all the file
	}
  render() {
     const {projectfileApplicationURI, loadedState, project} = this.props;
     const profileServer = (projectfileURILink) => {
      return CDN_PREFIX + projectfileURILink;
    };

		  return (
  <div>
    <Dropzone
						style={{}}
						multiple={false}
						accept={fileSpecs.fileTypes}
						ref={dropzone => this.dropzone = dropzone}
						onDrop={this.onDrop}
					/>
    {/* {loadedState && <Spinner spinnerName="three-bounce" />}  */}
    <div className="text-upload">Upload Attachments</div>
    <button
						type="button"
						className="upload-button"
						onClick={this.onChoose}
					>
					Choose File
					</button>
    <button
						type="button"
						className="upload-button"
						style={{display: 'block'}}
						onClick={this.onDelete}
					>
					Delete file
					</button>
    <div className>
      {
							this.state.upload ?
							 this.state.acceptedFiles.map(f => <div className="align"><a href={profileServer(projectfileApplicationURI)} download >{paperClip} {f.name}</a></div>)
							: <div className="align-div">No file Selected </div>
						}
    </div>
  </div>
		);
  }
}
// { !loadedState && <a href={profileServer(profiles.projects[this.props.index].projectfileURI)} download className={(editable ? 'company-file--img-edit' : 'company-file--file')} className="mobile hidden profile-label" >{paperClip} {f.name}</a>; }
UploadFile.propTypes = {
	projectfileApplicationURI: PropTypes.string.isRequired,
	deleteProjectApplicationFile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    projectfileApplicationURI: state.projects.projectfileApplicationURI
  };
}

export default connect(mapStateToProps, {deleteProjectApplicationFile})(UploadFile);
