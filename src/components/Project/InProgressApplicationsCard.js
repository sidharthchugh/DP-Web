
import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import difference from 'rus-diff';
import { addNotification } from 'actions/notification';
import InProgressApplication from './Fragments/InProgressApplication.js';
import Project from './Forms/Project';
import strings from 'components/util/language';
import { Grid } from 'semantic-ui-react';
import 'styles/components/projects.css';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';


class InProgressApplicationsCard extends Component {
  render() {
    const {userLanguage, projectApplication, sections} = this.props;
    const savedproject = projectApplication && projectApplication.filter((statusSaved) => {
      return statusSaved.projectApplyStatus === 'Saved';
    });
    return (
      <div>
        {savedproject && savedproject.length > 0 &&
        <div className="card-white">
          <CollapsibleCardWrapper title={strings.inProgressApplications} secondLevel>
            {
              projectApplication && projectApplication.map((item) => {
                return (
               item.projectApplyStatus === 'Saved' &&
               <InProgressApplication
                  userLanguage={userLanguage}
                  isProgress={item}
                  sections={sections}
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
export default connect(mapStateToProps, { addNotification })(InProgressApplicationsCard);
