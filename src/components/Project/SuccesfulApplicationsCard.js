import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import difference from 'rus-diff';
import { addNotification } from 'actions/notification';
import SuccessfulApplication from './Fragments/SuccessfulApplication.js';
import Project from './Forms/Project';
import strings from 'components/util/language';
import { Grid } from 'semantic-ui-react';
import 'styles/components/projects.css';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import FontAwesome from 'react-fontawesome';


class SuccessfulApplicationsCard extends Component {
  render() {
    const {userLanguage, projectApplication} = this.props;
    const successfulproject = projectApplication && projectApplication.filter((statusSuccessful) => {
     return statusSuccessful.projectApplyStatus === 'Successful';
   });
    return (
      <div>
        {successfulproject && successfulproject.length > 0 &&
        <div className="card-white">
          <CollapsibleCardWrapper title={strings.successfulApplications} secondLevel>
            {
           projectApplication && projectApplication.map((item) => {
             return (
            item.projectApplyStatus === 'Successful' &&
            <SuccessfulApplication
               userLanguage={userLanguage}
               isProgress={item}
             />);
         })
       }
          </CollapsibleCardWrapper>
        </div>}
      </div>
     );
  }
}

/*
ReceivedApplicationsCard.propTypes = {
  updateProjects: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  toggleProjectsEdit: PropTypes.func.isRequired
};*/


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
     profiles: state.profile.profiles,
     sections: state.projects.sections
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { addNotification })(SuccessfulApplicationsCard);
