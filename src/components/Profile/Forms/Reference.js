import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {Sticky} from 'react-sticky';
import UUID from 'node-uuid';
import editIcon from 'images/edit-icon.png';
import {FieldArray} from 'redux-form';
import renderMultiSection from 'components/renderFields/renderMultiSection';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import References from '../Sections/References';
import ReferencesProject from '../Sections/ReferencesProject';
import ProfileModel from 'components/util/FrontendModel';
import FontAwesome from 'react-fontawesome';
import { Grid, Button } from 'semantic-ui-react';
import 'styles/components/profile/profilePageGenerals.css';


class Reference extends Component {  //eslint-disable-line

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
          <form onSubmit={handleSubmit} className="references-form" >
            <div id={'reference'} className={'profile-card references lastCard-generic' + (sections.references.editable && !fullprofile ? ' edit-label' : '')}>
              <CollapsibleCardWrapper title={languagePref ? 'Referenzen' : 'References'}>
                <Grid>
                  <Grid.Column computer={12} className="no-gutter">
                    <Sticky
                      style={stickyProps.style}

                    >
                      <div className="edit-save-wrapper">
                        {!fullprofile && <a className="edit-button collapse-edit save-cancel-edit-button-reference" onClick={() => this.toggleEdit('references')}>
                          <img src={editIcon} role="presentation" /> {strings.edit}
                        </a>}
                        <div className="save-cancel-button collapse-edit save-cancel-edit-button-reference">
                          <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('references')}>{strings.cancel}</Button>
                          <Button className="button-small" type="submit" onClick={handleSubmit(values => this.props.saveProfile(values, profileDetails, 'references'))}>{strings.save}</Button>
                        </div>
                      </div>
                    </Sticky>
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column computer={12} className="no-gutter section-margin references">
                    {/* Product Sub Section */}
                    {profileDetails.references && profileDetails.references.map(member =>
                      <div key={UUID.v4()} className="specialSection">
                        <ProfileModel
                          specialSection
                          sectionName={References.references}
                          profileDetails={member}
                          userLanguage={userLanguage}
                          tooltipOff={tooltipOff}
                          columns={5} />
                          <div key={UUID.v4()} className="specialSection">
                            <ProfileModel
                              reference
                              specialSection
                              sectionName={ReferencesProject}
                              profileDetails={member.projectPartners}
                              userLanguage={userLanguage}
                              tooltipOff={tooltipOff}
                              columns={5} />
                          </div>
                      
                        <div className="profileSection" />
                      </div>
                        )}
                    <div className="add-input">
                      <FieldArray
                        name="references"
                        referenceSpecial={ReferencesProject}
                        component={renderMultiSection}
                        sectionColumns={5}
                        arrayName={strings.addReference}
                        removeName={strings.removeReference}
                        sectionName={References.references}
                        multiSectionColumns={'column-collaborators'}
                        arrayClassName={'column-collaborators'}
                        profileDetails={profileDetails}
                        userLanguage={userLanguage}
                        tooltipOff={tooltipOff}
                        responsive={{
                          mobile: 12,
                          tablet: 5,
                          computer: 5,
                          largeScreen: 5,
                          widescreen: 5
                        }}
                        />
                    </div>
                    {!fullprofile && <div className="add-array">
                      <FontAwesome name="plus-circle" />
                      <a className="button-2" type="button" onClick={this.addReference}>{strings.addReference}</a>
                    </div>}
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
Reference = reduxForm({
  form: 'Reference'// ,  // a unique identifier for this form
})(Reference);

Reference = connect(
  (state, ownProps) => ({
    initialValues: ownProps.profileDetails,
    enableReinitialize: true
  })
)(Reference);

export default Reference;
