import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchProfiles, updateProfiles, toggleProfileEdit} from 'actions/profiles';
import {cmsDetail} from 'actions/cms';
import difference from 'rus-diff';
import { addNotification } from 'actions/notification';
import CompanyDescription from './Forms/CompanyDescription';
import GeneralInformation from './Forms/GeneralInformation';
import Reference from './Forms/Reference';
import Reputation from './Forms/Reputation';
import Product from './Forms/Product';
import strings from 'components/util/language';
import { Grid } from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';
import {ENV} from '../../../server/config/appConfig';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
      this.saveProfile = this.saveProfile.bind(this);
      this.saveProduct = this.saveProduct.bind(this);
      this.saveCompany = this.saveCompany.bind(this);
     this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentWillMount() {
    const {profiles, user, cmsData} = this.props;
      if (!profiles.elasticId) {
        this.props.fetchProfiles();
      }
      if (!cmsData.cmsData) {
        this.props.cmsDetail();
      }
  }

   toggleEdit(section, edit_on) {
    this.props.toggleProfileEdit(section, edit_on);
  }
  // // save the data of product with the save button not submitting till the name is filled out.
   saveProduct(values, index, addProductIndex, addedProduct) {
    const { updateProfiles, addNotification, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
     if (addedProduct) values.feedProductUpdatedAt = Date.now();
    const updatedValue = difference.diff(profiles, values);
    if (!addProductIndex && values.products[index].productName.typeValues === '') {
        addNotification(strings.productName, 'warning', 'tc');
      } else {
    updateProfiles({updatedValue, addedProduct})
    .then((response) => {
       if (response.payload.status === 200) {
        this.setState({ registered: true});
        this.toggleEdit('productName' + index);
        addNotification(strings.profileupdateNotify, 'success', 'tc');
        }
     });
    }
  }

 saveCompany(values, hasCompanyName) {
    const { updateProfiles, addNotification, user, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    let linkName;
    if (ENV === 'development') {
      linkName = 'http://localhost:3000/profile/' + profiles.elasticId;
    } else {
        linkName = 'https://digitalpartners.io/profile/' + profiles.elasticId;
    }
    values.profileLinkName = linkName;
    const updatedValue = difference.diff(profiles, values);
    if (hasCompanyName.typeValues === '') {
        addNotification(strings.productName, 'warning', 'tc');
      } else {
    updateProfiles({updatedValue})
    .then((response) => {
       if (response.payload.status === 200) {
        this.setState({ registered: true});
        this.toggleEdit('company');
        addNotification(strings.profileupdateNotify, 'success', 'tc');
        }
     });
    }
  }

  // Send Values To Database
  saveProfile(values, profileDetails, generalInformation) {
    const { updateProfiles, addNotification, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    const updatedValue = difference.diff(profiles, values);
   updateProfiles({updatedValue, searchProfileId: values.elasticId})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
         if (generalInformation === 'generalInformation') this.toggleEdit('generalInformation');
         if (generalInformation === 'references') this.toggleEdit('references');
        if (generalInformation === 'reputation') this.toggleEdit('reputation');
        addNotification(strings.profileupdateNotify, 'success', 'tc');
      }
    });
  }

  render() {
    const {toggleProfileEdit, sections, profiles, fullprofile, cmsData, profileDetails, logoURI, userLanguage, strings, matchLogo, profileSignUp} = this.props;
    return (
      <Grid centered>
        {this.props.sidebar !== 'true' &&
        <Grid.Column mobile={12} tablet={12} computer={12}>
          <CompanyDescription
            logoURI={logoURI}
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            companyName={this.saveCompany}
            profileDetails={fullprofile || profiles}
            userLanguage={userLanguage}
            strings={strings}
            matchLogo={matchLogo}
            profileSignUp={profileSignUp}
            fullprofile={fullprofile}
          />
          <GeneralInformation
             toggleProfileEdit={toggleProfileEdit}
             sections={sections}
             onSubmit={this.saveProfile}
             saveProfile={this.saveProfile}
             profileDetails={fullprofile || profiles}
             userLanguage={userLanguage}
             strings={strings}
             cmsData={cmsData}
             profileSignUp={profileSignUp}
             fullprofile={fullprofile}
           />
          <Product
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            productName={this.saveProduct}
            profileDetails={fullprofile || profiles}
            userLanguage={userLanguage}
            strings={strings}
            cmsData={cmsData}
            profileSignUp={profileSignUp}
            fullprofile={fullprofile}
          />
          <Reference
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            onSubmit={this.saveProfile}
            saveProfile={this.saveProfile}
            saveReferences={this.saveProfile}
            profileDetails={fullprofile || profiles}
            userLanguage={userLanguage}
            strings={strings}
            profileSignUp={profileSignUp}
            fullprofile={fullprofile}
          />
          <Reputation
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            onSubmit={this.saveProfile}
            saveProfile={this.saveProfile}
            saveReferences={this.saveProfile}
            profileDetails={fullprofile || profiles}
            userLanguage={userLanguage}
            strings={strings}
            profileSignUp={profileSignUp}
            fullprofile={fullprofile}
          />
        </Grid.Column>}
        {this.props.sidebar === 'true' &&
        <Grid>
          <Grid.Column computer={12} className="card-generic mobile hidden tablet hidden nav">
            <div id="profile">
              <h3 className="sidebar-headertitle">My Company</h3>
              <Scrollchor to={'general-Information'} animate={{offset: -30, duration: 500}}>
                <h3 className="sidebar-header1">General Information</h3>
              </Scrollchor>
              <ul>
                <Scrollchor to={'team-Members'} animate={{offset: -30, duration: 500}}>
                  <li className="sidebar-header2 lid">Team Members</li>
                </Scrollchor>
                <Scrollchor to={'BiRel'} animate={{offset: -30, duration: 500}}>
                  <li className="sidebar-header2 lid">Business Relationships</li>
                </Scrollchor>
                <Scrollchor to={'BMC'} animate={{offset: -30, duration: 500}}>
                  <li className="sidebar-header2 lid">Business Model Canvas</li>
                </Scrollchor>
                <Scrollchor to={'FinancialData'} animate={{offset: -30, duration: 500}}>
                  <li className="sidebar-header2 lid">Financial Data</li>
                </Scrollchor>
                <Scrollchor to={'DigitalizationStatus'} animate={{offset: -30, duration: 500}}>
                  <li className="sidebar-header2 lid">Digitilization Status</li>
                </Scrollchor>
                <Scrollchor to={'ContactDetails'} animate={{offset: -30, duration: 500}}>
                  <li className="sidebar-header2 lid">Contact Details</li>
                </Scrollchor>
              </ul>
              <Product
                sidebarP={'true'}
                profileDetails={profiles}
                userLanguage={userLanguage}
                strings={strings}
              />
              <Scrollchor to={'reference'} animate={{offset: -58, duration: 500}}>
                <h3 className="sidebar-header1 sidebar-header1M">Reference</h3>
              </Scrollchor>
               <Scrollchor to={'reputation'} animate={{offset: -58, duration: 500}}>
                <h3 className="sidebar-header1 sidebar-header1M">Reputation</h3>
              </Scrollchor>
            </div>
          </Grid.Column>
        </Grid>}
      </Grid>
     );
  }
}

ProfileCard.propTypes = {
  updateProfiles: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleProfileEdit: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     user: state.user.userObj,
     logoURI: state.profile.logoURI,
     profiles: state.profile.profiles,
     sections: state.profile.sections,
     cmsData: state.cms.cmsData
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {fetchProfiles, updateProfiles, addNotification, cmsDetail, toggleProfileEdit})(ProfileCard);
