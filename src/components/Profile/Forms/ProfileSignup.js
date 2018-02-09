import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchProfileSignup, updateProfiles} from 'actions/profiles';
import {cmsDetail} from 'actions/cms';
import difference from 'rus-diff';
import CompanyDescription from './CompanyDescription';
import GeneralInformation from './GeneralInformation';
import Reference from './Reference';
import Reputation from './Reputation';
import Product from './Product';
import strings from 'components/util/language';
import { Grid } from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';

class ProfileCard extends Component {
  constructor(props) {
    super(props);
      this.state = { registered: false};
  }

  componentWillMount() {
    const {cmsData} = this.props;
      if (!cmsData.cmsData) {
        this.props.cmsDetail();
      }
  }


  render() {
    const {toggleProfileEdit, sections, targetProfile, fullprofile, cmsData, profileDetails, logoURI, userLanguage, strings, matchLogo, profileSignUp} = this.props;
    return (
      <Grid centered>
        {this.props.sidebar !== 'true' &&
        <Grid.Column mobile={12} tablet={12} computer={12}>
          <CompanyDescription
            logoURI={targetProfile.logoURI}
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            companyName={this.saveCompany}
            profileDetails={fullprofile || targetProfile}
            userLanguage={userLanguage}
            strings={strings}
            matchLogo={matchLogo}
            profileSignUp={profileSignUp}
            fullprofile
          />
          <GeneralInformation
             toggleProfileEdit={toggleProfileEdit}
             sections={sections}
             onSubmit={this.saveProfile}
             saveProfile={this.saveProfile}
             profileDetails={fullprofile || targetProfile}
             userLanguage={userLanguage}
             strings={strings}
             cmsData={cmsData}
             profileSignUp={profileSignUp}
             fullprofile
           />
          <Product
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            productName={this.saveProduct}
            profileDetails={fullprofile || targetProfile}
            userLanguage={userLanguage}
            strings={strings}
            cmsData={cmsData}
            profileSignUp={profileSignUp}
            fullprofile
          />
          <Reference
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            onSubmit={this.saveProfile}
            saveProfile={this.saveProfile}
            saveReferences={this.saveProfile}
            profileDetails={fullprofile || targetProfile}
            userLanguage={userLanguage}
            strings={strings}
            profileSignUp={profileSignUp}
            fullprofile
          />
          <Reputation
            toggleProfileEdit={toggleProfileEdit}
            sections={sections}
            onSubmit={this.saveProfile}
            saveProfile={this.saveProfile}
            saveReferences={this.saveProfile}
            profileDetails={fullprofile || targetProfile}
            userLanguage={userLanguage}
            strings={strings}
            profileSignUp={profileSignUp}
            fullprofile={fullprofile}
          />
        </Grid.Column>}
      </Grid>
     );
  }
}

// ProfileCard.propTypes = {
//   updateProfiles: PropTypes.func.isRequired,
// };

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     targetProfile: state.profile.targetProfile,
     sections: state.profile.sections,
     cmsData: state.cms.cmsData
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {fetchProfileSignup, cmsDetail})(ProfileCard);
