import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {Sticky} from 'react-sticky';
import UUID from 'node-uuid';
import editIcon from 'images/edit-icon.png';
import {FieldArray} from 'redux-form';
import renderMultiSection from 'components/renderFields/renderMultiSection';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import ReputationSection from '../Sections/Reputation';
import ProfileModel from 'components/util/FrontendModel';
import FontAwesome from 'react-fontawesome';
import { Grid, Button } from 'semantic-ui-react';
import 'styles/components/profile/profilePageGenerals.css';


class Reputation extends Component {  //eslint-disable-line

  /*
 * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
 * properties on the constructor
 * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
 */
   constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.addReference = this.addReference.bind(this);
  }

  // Add a new reference
  addReference() {
    const {profileDetails} = this.props;
    const new_reference = {};
     const new_references = [];
    for (let i = 0; i < profileDetails.references.length; i++) {
      new_references.push(profileDetails.references[i]);
    }
    new_references.push(new_reference);
    const values = {...profileDetails, references: new_references };
    this.props.saveReferences(values, profileDetails);
    this.toggleEdit('references', true);
  }

  // Edit and Save Mode for Profile Page
  toggleEdit(section, edit_on) {
    this.props.toggleProfileEdit(section, edit_on);
  }

  render() {
    const {handleSubmit, sections, profileDetails, userLanguage, strings, fullprofile} = this.props;
    const languagePref = userLanguage === 'German';
    const stickyProps = {
      style: {
        transform: 'none',
        zIndex: 99,
        position: 'absolute',
        width: '100%'}, // ensure btn is always on top
      // stickyStyle: {top: '19.962vh'},
      // topOffset: -165
    };

    let tooltipOff = false;
   if (fullprofile) {
     tooltipOff = true;
   }

    return (
            <Grid className="no-vertical-margin no-vertical-padding">
        <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter">
          <form onSubmit={handleSubmit} className="reputation-form">
            <div id={'reputation'}className={'profile-card reputation' + (sections.reputation.editable && !fullprofile ? ' edit-mode' : '')}>
              <CollapsibleCardWrapper title={languagePref ? 'Reputation' : 'Reputation'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Hier können Sie ihre Qualitätsmerkmale hinzufügen. Ihre Partner und Kunden können diese bestätigen und helfen Ihnen so, ihre Reputation sichtbar zu machen.' : 'Add Quality Dimensions and Functions that you perform. Your partners and customers can confirm those to help you build a credible reputation'}>
                <Sticky
                  style={stickyProps.style}
                >
                  <div className="edit-save-wrapper">
                    {!fullprofile && <a className="edit-collapsed-button collapse-edit save-cancel-edit-button-gen" onClick={() => this.toggleEdit('reputation')}>
                      <img src={editIcon} role="presentation" /> {strings.edit}
                    </a>}
                    <div className="save-cancel-collapsed-button collapse-edit save-cancel-edit-button-gen">
                      <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('reputation')}>{strings.cancel}</Button>
                      <Button className="button-small" type="button" onClick={handleSubmit(values => this.props.saveProfile(values, profileDetails, 'reputation'))}>{strings.save}</Button>
                    </div>
                  </div>
                </Sticky>
                <Grid className="profile-card-grid-content">
                  <Grid.Column mobile={12} tablet={12} className="no-vertical-padding no-gutter">

                    {/* OrgaBizLegal Sub Section */}
                    <ProfileModel
                      sectionName={ReputationSection}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      tooltipOff={tooltipOff}
                      responsive={{
                        mobile: 12,
                        tablet: 6,
                        computer: 4,
                        largeScreen: 4,
                        widescreen: 4
                      }} />

                  </Grid.Column>
                </Grid>
              </CollapsibleCardWrapper>
            </div>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
Reputation = reduxForm({
  form: 'Reputation'// ,  // a unique identifier for this form
})(Reputation);

Reputation = connect(
  (state, ownProps) => ({
    initialValues: ownProps.profileDetails,
    enableReinitialize: true
  })
)(Reputation);

export default Reputation;
