import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import editIcon from 'images/edit-icon.png';
import {Sticky} from 'react-sticky';
import { Grid, Button } from 'semantic-ui-react';
import CompanyLogo from 'components/Reusable/CompanyLogo';
import ShortCompDescr from '../Sections/ShortCompDescr';
import CompLogo from '../Sections/CompLogo';
import MatchingLogo from 'components/Reusable/MatchingLogo';
import SharingLink from '../../Reusable/SharingLink';
import ProfileModel from 'components/util/FrontendModel';

class CompanyDescription extends Component {

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
  }

  // Edit and Save Mode for Profile Page
   toggleEdit(section) {
    this.props.toggleProfileEdit(section);
   }

  render() {
    const {handleSubmit, sections, profileDetails, logoURI, userLanguage, strings, fullprofile, matchLogo, hasCompanyDescription} = this.props;
   let tooltipOff = false;

   if (fullprofile) {
     tooltipOff = true;
   }

    return (
      <Grid id={fullprofile ? 'profile-company-description fullprofile-noheader' : 'profile-company-description'}>
        <Grid.Column computer={12} className="no-gutter">
          <form onSubmit={handleSubmit}>
            <div id={'my-Company'}className={'profile-card company-info' + (sections.company.editable && !fullprofile ? ' edit-mode' : '')}>
              {sections.company.showDiv && <div className={userLanguage === 'German' ? 'company-share-german' : 'company-share'} >
                <SharingLink notify={'Profile Link Copied'} projectLink={profileDetails.profileLinkName ? profileDetails.profileLinkName : ''} />
              </div>}
              {!fullprofile && <a className="edit-button move-down" onClick={() => this.toggleEdit('company')}>
                <img src={editIcon} role="presentation" /> {strings.edit}
              </a>}
              <div className="save-cancel-button save-cancel-button-company comp-cancel-save-edit company-cancel-save">
                <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('company')}>{strings.cancel}</Button>
                <Button className="button-small button" type="button" onClick={handleSubmit(values => this.props.companyName(values, hasCompanyDescription, profileDetails))}>{strings.save}</Button>
              </div>
              <Grid centered>
                <Grid.Column mobile={12} tablet={12} computer={12} className={'company-description-move'}>
                  {/* Company Logo*/}
                  {!matchLogo && matchLogo === undefined && <CompanyLogo logoURI={logoURI} editable={sections.company.editable} userLanguage={userLanguage} />}
                  {(matchLogo || matchLogo === '') && <MatchingLogo logoURI={matchLogo} editable={sections.company.editable} userLanguage={userLanguage} />}
                  {/* Comp-Logo Sub Section */}
                  <ProfileModel
                      sectionName={CompLogo}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      tooltipOff={tooltipOff}
                      responsive={{
                        mobile: 12,
                        tablet: 12,
                        computer: 6,
                        largeScreen: 6,
                        widescreen: 6
                      }}
                      />
                  {/* ShortCompDescr Sub Section */}
                  <ProfileModel
                      sectionName={ShortCompDescr}
                      profileDetails={profileDetails}
                      userLanguage={userLanguage}
                      tooltipOff={tooltipOff}
                      responsive={{
                        mobile: 12,
                        tablet: 12,
                        computer: 12,
                        largeScreen: 12,
                        widescreen: 12
                      }}
                      />
                  {/* Company Status */}
                  {this.props.admin && <div>
                     <div className="profile-label">COMPANY STATUS</div>
                     <div className="profile-value">{profileDetails.companyStatus}</div>
                     <div className="profile-label">ELASTIC ID</div>
                     <div className="profile-value">{profileDetails.elasticId}</div>
                   </div>
                   }
                </Grid.Column>
              </Grid>
            </div>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
CompanyDescription = reduxForm({
  form: 'CompanyDescription'// ,  // a unique identifier for this form
})(CompanyDescription);


// Decorate with connect to read form values
 // <-- same as form name
CompanyDescription = connect(
  (state, ownProps) => {
    // can select values individually
    const selector = formValueSelector(ownProps.form || 'CompanyDescription');
   const hasCompanyDescription = selector(state, 'companyName');
    return {
     hasCompanyDescription,
      initialValues: ownProps.profileDetails,
      enableReinitialize: true
    };
  }
)(CompanyDescription);


export default CompanyDescription;
