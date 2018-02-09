import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {cmsDetail} from 'actions/cms';
import {Link} from 'react-router';
import {fetchAdminProfiles, updateAdminProfiles, toggleProfileEdit, fetchProfiles, manualProfile, updateProfiles, realTimeProfile} from 'actions/profiles';
import difference from 'rus-diff';
import { addNotification } from 'actions/notification';
import CompanyDescription from './Forms/CompanyDescription';
import GeneralInformation from './Forms/GeneralInformation';
import Reference from './Forms/Reference';
import Product from './Forms/Product';
import { Grid, Button } from 'semantic-ui-react';
import ProfileSearch from './Forms/ProfileSearch';
import AdminHeader from 'components/Reusable/AdminHeader';
import ProfileCreate from './Forms/ProfileCreate';
import SettingsSearch from './Forms/SettingsSearch';
import SettingsAdminCard from 'components/Settings/SettingsAdminCard';
import RealTimeProfileSearch from './Forms/RealTimeProfileSearch';
import strings from 'components/util/language';
import {ENV} from '../../../server/config/appConfig';


class AdminProfileCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
      this.saveProfile = this.saveProfile.bind(this);
      this.searchProfile = this.searchProfile.bind(this);
      this.createProfile = this.createProfile.bind(this);
      this.searchUser = this.searchUser.bind(this);
      this.saveProduct = this.saveProduct.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
      this.saveCompany = this.saveCompany.bind(this);
      this.searchRealTimeProfile = this.searchRealTimeProfile.bind(this);
  }


  componentWillMount() {
    const {cmsData} = this.props;
      if (!cmsData.cmsData) {
        this.props.cmsDetail();
      }
   }

  toggleEdit(section, edit_on) {
    this.props.toggleProfileEdit(section, edit_on);
  }


  removeProduct(delete_id) {
     const {profileDetails} = this.props;
     const values = profileDetails;
     for (let i = 0; i < profileDetails.products.length; i++) {
       const product = profileDetails.products[i];
       if (product.elasticId == delete_id) {
         values.products.splice(i, 1);
       }
     }
  }

    searchRealTimeProfile(values) {
    const { realTimeProfile, addNotification, profiles, profileId} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    realTimeProfile({elasticSearch: values.elasticSearch})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
      } else {
        addNotification('No Profile Found', 'success', 'tc');
      }
    });
  }


  // Send Values To Database
  // Send Values To Database
  saveProfile(values, profileValue, generalInformation, elasticId) {
    const { updateProfiles, addNotification, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    const updatedValue = difference.diff(profileValue, values);
   updateProfiles({updatedValue, searchProfileId: values.elasticId})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
        this.toggleEdit('generalInformation');
        this.toggleEdit('references');
        this.searchRealTimeProfile({elasticSearch: values.elasticId});
        addNotification(strings.profileupdateNotify, 'success', 'tc');
      }
    });
  }
  // Send Values To Database
  createProfile(values) {
    const { updateAdminProfiles} = this.props;
   updateAdminProfiles({companyName: values.profileCreate.value})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
        addNotification(strings.profileupdateNotify, 'success', 'tc');
      }
    });
  }


    // Send Values To Database

  searchProfile(values) {
    const { manualProfile, addNotification, profiles, profileId} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    manualProfile({profileSearch: values.profileSearch.value})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
        addNotification('Profile Found', 'success', 'tc');
      } else if (response.payload.status === 300) {
        addNotification('No Profile Found', 'success', 'tc');
      }
    });
  }

     // Send Values To Database

  searchUser(values) {
    const { manualProfile, addNotification} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    manualProfile({userSearch: values.userSearch})
    .then((response) => {
      if (response.payload.status === 200) {
        this.setState({ registered: true});
        addNotification('User Found', 'success', 'tc');
      } else if (response.payload.status === 300) {
        addNotification('No User Found', 'success', 'tc');
      }
    });
  }


   saveProduct(values, index, addProductIndex, addedProduct, profileDetails) {
    const { updateProfiles, addNotification, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    const updatedValue = difference.diff(profileDetails, values);
    if (!addProductIndex && values.products[index].productName.typeValues === '') {
        addNotification(strings.productName, 'warning', 'tc');
      } else {
    updateProfiles({updatedValue, addedProduct, searchProfileId: values.elasticId})
    .then((response) => {
       if (response.payload.status === 200) {
        this.setState({ registered: true});
        this.toggleEdit('productName' + index);
        this.searchRealTimeProfile({elasticSearch: values.elasticId});
        addNotification(strings.profileupdateNotify, 'success', 'tc');
        }
     });
    }
  }

 saveCompany(values, hasCompanyName, profileValue) {
    const { updateProfiles, addNotification, profiles} = this.props;
    // Getting Differnce from Initial Values and Updated Values
    let linkName;
    if (ENV === 'development') {
      linkName = 'http://localhost:3000/profile/' + profiles.elasticId;
    } else {
        linkName = 'https://digitalpartners.io/profile/' + profiles.elasticId;
    }
    values.profileLinkName = linkName;
    const updatedValue = difference.diff(profileValue, values);
    if (hasCompanyName.typeValues === '') {
        addNotification(strings.productName, 'warning', 'tc');
      } else {
    updateProfiles({updatedValue, searchProfileId: values.elasticId})
    .then((response) => {
       if (response.payload.status === 200) {
        this.setState({ registered: true});
        this.toggleEdit('company');
        this.searchRealTimeProfile({elasticSearch: values.elasticId});
        addNotification(strings.profileupdateNotify, 'success', 'tc');
        }
     });
    }
  }

  render() {
    const {toggleProfileEdit, sections, profiles, users, cmsData, profileDetails, logoURI, userLanguage, strings} = this.props;
    return (
      <section>
        <Grid>
        <Grid.Column tablet={12} computer={3}>
        <ProfileSearch
          searchProfile={this.searchProfile}
          userLanguage={userLanguage}
          strings={strings}
        />
        </Grid.Column>
        <Grid.Column tablet={12} computer={3}>
         <ProfileCreate
          createProfile={this.createProfile}
          userLanguage={userLanguage}
          strings={strings}
        />
        </Grid.Column>
         <Grid.Column tablet={12} computer={3}>
        <RealTimeProfileSearch
          onSubmit={this.searchRealTimeProfile}
          userLanguage={userLanguage}
          strings={strings}
        />
        </Grid.Column>
        <Grid.Column tablet={12} computer={3}>
        <SettingsSearch
          searchUser={this.searchUser}
          userLanguage={userLanguage}
          strings={strings}
        />
        </Grid.Column>
        </Grid>

        {profiles.length > 0 && profiles.map((profile, index) =>
        <div className="manualData">
      {profile.companyStatus === 'Active' && <Grid>
        <Grid.Column computer={2}>
         <Button><Link to={`settings/${profile.elasticId}`}>Settings</Link></Button>
        </Grid.Column>
         <Grid.Column computer={2}>
         <Button><Link to={`projectadmin/${profile.elasticId}`}>Projects</Link></Button>
        </Grid.Column>
         <Grid.Column computer={2}>
         <Button><Link to={`search/${profile.elasticId}`}>Search</Link></Button>
        </Grid.Column>
         <Grid.Column computer={2}>
         <Button><Link to={`matches/${profile.elasticId}`}>Matches</Link></Button>
        </Grid.Column>
        </Grid>}
        <Grid>
        <Grid.Column tablet={12} computer={9}>
        <CompanyDescription
          logoURI={logoURI}
          form={'CompanyDescription' + index}
          toggleProfileEdit={toggleProfileEdit}
          sections={sections}
          companyName={this.saveCompany}
          onSubmit={this.saveProfile}
          profileDetails={profile}
          userLanguage={userLanguage}
          strings={strings}
          cmsData={cmsData}
          admin
        />
        <GeneralInformation
           toggleProfileEdit={toggleProfileEdit}
           form={'GeneralInformation' + index}
           sections={sections}
           onSubmit={this.saveProfile}
           saveProfile={this.saveProfile}
           profileDetails={profile}
           userLanguage={userLanguage}
           strings={strings}
          cmsData={cmsData}
         />
          <Product
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            form={'Products' + index}
            productName={this.saveProduct}
            profileDetails={profile}
            userLanguage={userLanguage}
            strings={strings}
            cmsData={cmsData}
          />
          <Reference
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            form={'Reference' + index}
            onSubmit={this.saveProfile}
            saveReferences={this.saveProfile}
            profileDetails={profile}
            saveProfile={this.saveProfile}
            userLanguage={userLanguage}
            strings={strings}
            cmsData={cmsData}
          />
       </Grid.Column>
       </Grid>
        </div>
        )}
      </section>
     );
  }
}

AdminProfileCard.propTypes = {
  updateAdminProfiles: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleProfileEdit: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     users: state.user.users,
     profiles: state.profile.profiles,
     sections: state.profile.sections,
     cmsData: state.cms.cmsData
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {fetchAdminProfiles, updateAdminProfiles, realTimeProfile, cmsDetail,addNotification, updateProfiles, fetchProfiles, manualProfile, toggleProfileEdit})(AdminProfileCard);
