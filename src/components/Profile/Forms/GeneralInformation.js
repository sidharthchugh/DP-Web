import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import {Link} from 'react-router';
import {Sticky} from 'react-sticky';
import editIcon from 'images/edit-icon.png';
import { Grid, Button } from 'semantic-ui-react';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import TooltipWrapper from 'components/util/TooltipWrapper';
import {OrgaBizLegal} from '../Sections/OrgaBizLegal';
import {HQCountryHome} from '../Sections/HQCountryHome';
import {AddressYearFTE} from '../Sections/AddressYearFTE';
import MiViTeamOther from '../Sections/MiViTeamOther';
import TeamMemb from '../Sections/TeamMemb';
import BiRel from '../Sections/BiRel';
import BMCKey from '../Sections/BMCKey';
import {FinancialData} from '../Sections/FinancialData';
import {DigitalizationStatus} from '../Sections/DigitalizationStatus';
import ContactDetails from '../Sections/ContactDetails';
import OtherBusinessRelationship from '../Sections/OtherBusinessRelationship';
import OtherWebPresense from '../Sections/OtherWebPresense';
import ProfileModel from 'components/util/FrontendModel';
import 'styles/components/profilecard.css';

// FIXME: Make one Component for all Sub Section

class GeneralInformation extends Component {

  /*
 * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
 * properties on the constructor
 * Read more here: https://facebook.github.io/react/blog/2014/01/27/react-v0.13.0-beta-1.html#es6-classes
 */
   constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // Edit and Save Mode for Profile Page
   toggleEdit(section) {
    this.props.toggleProfileEdit(section);
   }

  render() {
    const {handleSubmit, sections, profileDetails, userLanguage, strings, fullprofile, hasIndustry, hasSector, hasSubSector, cmsData} = this.props;
    const languagePref = userLanguage === 'German';
    const stickyProps = {
      style: {
        transform: 'none',
        zIndex: 99,
        position: 'absolute',
        width: '100%'
      } // ensure btn is always on top
    };

   let tooltipOff = false;
   if (fullprofile) {
     tooltipOff = true;
   }

    return (
      <Grid className="no-vertical-margin no-vertical-padding">
        <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter">
          <form onSubmit={handleSubmit} className="generalInfo-form">
            <div id={'general-Information'}className={'profile-card general-info' + (sections.generalInformation.editable && !fullprofile ? ' edit-mode' : '')}>
              <CollapsibleCardWrapper title={languagePref ? 'Allgemeine Informationen' : 'General Information'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Ein ausführliches Profil hilft uns, Ihnen die richtigen Partner vorzuschlagen.' : 'Detail your company profile in order to obtain the best matches for your company. Note that some fields may not be relevant to your business model.'}>
                <Sticky
                  style={stickyProps.style}
                >
                  <div className="edit-save-wrapper">
                    {!fullprofile && <a className="edit-collapsed-button collapse-edit save-cancel-edit-button-gen" onClick={() => this.toggleEdit('generalInformation')}>
                      <img src={editIcon} role="presentation" /> {strings.edit}
                    </a>}
                    <div className="save-cancel-collapsed-button collapse-edit save-cancel-edit-button-gen">
                      <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('generalInformation')}>{strings.cancel}</Button>
                      <Button className="button-small" type="button" onClick={handleSubmit(values => this.props.saveProfile(values, profileDetails, 'generalInformation'))}>{strings.save}</Button>
                    </div>
                  </div>
                </Sticky>
                <Grid className="profile-card-grid-content">
                  <Grid.Column mobile={12} tablet={12} className="no-vertical-padding no-gutter">

                    {/* OrgaBizLegal Sub Section */}
                    <ProfileModel
                      sectionName={OrgaBizLegal(cmsData)}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      conditional={Object.assign({}, {hasIndustry}, {hasSector}, {hasSubSector})}
                      tooltipOff={tooltipOff}
                      responsive={{
                        mobile: 12,
                        tablet: 6,
                        computer: 4,
                        largeScreen: 4,
                        widescreen: 4
                      }} />

                    {/* HQCountryHome Sub Section */}

                    <ProfileModel
                    sectionName={HQCountryHome(cmsData)}
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

                    {/* AddressYearFTE Sub Section */}

                    <ProfileModel
                    sectionName={AddressYearFTE(cmsData)}
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

                    {/* MiViTeamOther Sub Section */}

                    <ProfileModel
                    sectionName={MiViTeamOther}
                    profileDetails={profileDetails}
                    userLanguage={userLanguage}
                    tooltipOff={tooltipOff}
                    responsive={{
                      mobile: 12,
                      tablet: 12,
                      computer: 4,
                      largeScreen: 4,
                      widescreen: 4
                    }} />
                    <div className="profileSection" />

                    {/* TeamMemb Sub Section */}
                    <TooltipWrapper name={'Team Members'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Hier können sie wichtige Mitarbeiter und Partner des Unternehmens aufführen' : ''}>
                      <h4 id={'team-Members'}>{languagePref ? 'Mitarbeiter' : 'Team Members'}</h4>
                    </TooltipWrapper>
                    <Sticky
                  style={stickyProps.style}
                >
                      <div className="edit-save-wrapper">
                        {!fullprofile && <a className="edit-button collapse-edit save-cancel-edit-button-financial" onClick={() => this.toggleEdit('generalInformation')}>
                          <img src={editIcon} role="presentation" /> {strings.edit}
                        </a>}
                        <div className="save-cancel-button collapse-edit save-cancel-edit-button-financial">
                          <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('generalInformation')}>{strings.cancel}</Button>
                          <Button className="button-small" type="button" onClick={handleSubmit(values => this.props.saveProfile(values, profileDetails, 'generalInformation'))}>{strings.save}</Button>
                        </div>
                      </div>
                    </Sticky>
                    <ProfileModel
                      sectionName={TeamMemb}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      multiSectionColumns={'column-collaborators'}
                      arrayClassName={'column-collaborators'}
                      tooltipOff={tooltipOff}
                      responsive={{
                        mobile: 12,
                        tablet: 12,
                        computer: 12,
                        largeScreen: 12,
                        widescreen: 12
                      }} />

                    {!fullprofile && <Grid>
                      <Grid.Column computer={12}>
                        <Link to="inviteTeam">
                          <Button className="button-normal collaborators">{strings.inviteTeam}</Button>
                        </Link>
                      </Grid.Column>
                    </Grid>}

                    <div className="profileSection" />

                    {/* BiRel Sub Section */}

                    <TooltipWrapper name={'Business Relationships'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Verbinden Sie sich mit Ihren Geschäftspartnern, um Referenzen auszutauschen und Reputation aufzubauen.' : 'Connect to your customers and partners to exchange references and build visible reputation!'}>
                      <h4 id={'BiRel'}>{languagePref ? 'Geschäftsbeziehungen' : 'Business Relationships'}</h4>
                    </TooltipWrapper>
                    <ProfileModel
                      sectionName={BiRel}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      tooltipOff={tooltipOff}
                      multiSectionColumns={'column-business-relationships-label'}
                      arrayClassName={'column-business-relationships-field'}
                      responsive={{
                        mobile: 12,
                        tablet: 12,
                        computer: 4,
                        largeScreen: 4,
                        widescreen: 4
                      }} />
                    {/* OtherBusiness Relationship Sub Section */}
                    <ProfileModel
                        sectionName={OtherBusinessRelationship}
                        profileDetails={profileDetails}
                        multiSectionColumns={'column-business-relationships-label'}
                        arrayClassName={'column-business-relationships-field-other'}
                        userLanguage={userLanguage}
                        tooltipOff={tooltipOff}
                        responsive={{
                          mobile: 12,
                          tablet: 12,
                          computer: 10,
                          largeScreen: 10,
                          widescreen: 10
                        }} />

                    {!fullprofile && <Grid>
                      <Grid.Column computer={12}>
                        <Link to="invitePartner">
                          <Button className="button-normal collaborators">{strings.invitePartners}</Button>
                        </Link>
                      </Grid.Column>
                    </Grid>}

                    <div className="profileSection" />

                    {/* BMCKey Sub Section */}
                    <TooltipWrapper name={'Business Model Canvas'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Das Business Model Canvas fasst die wichtigsten Aspekte ihres Geschäftsmodells zusammen. Dies hilft uns, relevante Lösungen, Projekte und Partner für ihren individuellen Fall zu finden.' : 'The Business Model Canvas is a concise way to understand a business model. It helps us recommending you the most relevant solutions, projects and partners to your individual case'}>
                      <h4 id={'BMC'}>Business Model Canvas</h4>
                    </TooltipWrapper>
                    <Sticky
                  style={stickyProps.style}
                >
                      <div className="edit-save-wrapper">
                        {!fullprofile && <a className="edit-button collapse-edit save-cancel-edit-button-BMC" onClick={() => this.toggleEdit('generalInformation')}>
                          <img src={editIcon} role="presentation" /> {strings.edit}
                        </a>}
                        <div className="save-cancel-button collapse-edit save-cancel-edit-button-BMC">
                          <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('generalInformation')}>{strings.cancel}</Button>
                          <Button className="button-small" type="button" onClick={handleSubmit(values => this.props.saveProfile(values, profileDetails, 'generalInformation'))}>{strings.save}</Button>
                        </div>
                      </div>
                    </Sticky>


                    <ProfileModel
                      sectionName={BMCKey}
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

                    <div className="profileSection" />

                    {/* Financial Data Sub Section */}
                    <h4 id={'FinancialData'}>{languagePref ? 'Finanzkennzahlen' : 'Financial Data'}</h4>

                    <Sticky
                  style={stickyProps.style}
                >
                      <div className="edit-save-wrapper">
                        {!fullprofile && <a className="edit-button collapse-edit save-cancel-edit-button-financial" onClick={() => this.toggleEdit('generalInformation')}>
                          <img src={editIcon} role="presentation" /> {strings.edit}
                        </a>}
                        <div className="save-cancel-button collapse-edit save-cancel-edit-button-financial">
                          <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('generalInformation')}>{strings.cancel}</Button>
                         <Button className="button-small" type="button" onClick={handleSubmit(values => this.props.saveProfile(values, profileDetails, 'generalInformation'))}>{strings.save}</Button>
                        </div>
                      </div>
                    </Sticky>
                    <ProfileModel
                      sectionName={FinancialData(cmsData)}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      tooltipOff={tooltipOff}
                      responsive={{
                        mobile: 12,
                        tablet: 12,
                        computer: 4,
                        largeScreen: 4,
                        widescreen: 4
                      }} />

                    <div className="profileSection" />

                    {/* Digitilization Status Sub Section */}

                    <TooltipWrapper name={'Digitilization Status'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Das Digitalisierungsstadium hilft uns zu verstehen, wie weit Sie in unterschiedlichen Bereichen bereits digitale Lösungen verwenden bzw. benötigen könnten' : 'We aim to understand in how far you already use digital technologies at different steps in your value chain'}>
                      <h4 id={'DigitalizationStatus'}>{languagePref ? 'Digitalisierungsstadium' : 'Digitilization Status'}</h4>
                    </TooltipWrapper>
                    <ProfileModel
                    tooltipOff={tooltipOff}
                      sectionName={DigitalizationStatus(cmsData)}
                      profileDetails={profileDetails}
                      multiSectionColumns={'column-collaborators'}
                      arrayClassName={'column-collaborators'}
                      userLanguage={userLanguage}
                      responsive={{
                        mobile: 12,
                        tablet: 12,
                        computer: 12,
                        largeScreen: 12,
                        widescreen: 12
                      }}
                    />

                    <div className="profileSection" />

                    {/* Contact Details Sub Section */}
                    <TooltipWrapper name={'Contact Details'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Machen Sie es ihren potenziellen Partnern einfach, mit Ihnen in Kontakt zu treten' : 'Make it easy for potential partners to get in touch with you!'}>
                      <h4 id={'ContactDetails'}>{languagePref ? 'Kontaktdetails' : 'Contact Details'}</h4>
                    </TooltipWrapper>
                    <ProfileModel
                    tooltipOff={tooltipOff}
                      sectionName={ContactDetails}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      responsive={{
                        mobile: 12,
                        tablet: 12,
                        computer: 4,
                        largeScreen: 4,
                        widescreen: 4
                      }}
                    />

                    {/* Other Web Presense Sub Section */}

                    <ProfileModel
                    tooltipOff={tooltipOff}
                    sectionName={OtherWebPresense}
                    profileDetails={profileDetails}
                    multiSectionColumns={'column-business-relationships-label'}
                    arrayClassName={'column-business-relationships-field'}
                    userLanguage={userLanguage}
                    responsive={{
                      mobile: 12,
                      tablet: 12,
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
GeneralInformation = reduxForm({
  form: 'GeneralInformation'// ,  // a unique identifier for this form
})(GeneralInformation);


// Decorate with connect to read form values
GeneralInformation = connect(
  (state, ownProps) => {
    // can select values individually
    const selector = formValueSelector(ownProps.form || 'GeneralInformation');
    const hasIndustry = selector(state, 'industry');
    const hasSector = selector(state, 'sector');
    const hasSubSector = selector(state, 'subSector');
    return {
      hasIndustry,
      hasSector,
      hasSubSector,
      initialValues: ownProps.profileDetails,
      enableReinitialize: true
    };
  }
)(GeneralInformation);


export default GeneralInformation;
