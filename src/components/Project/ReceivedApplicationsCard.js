import React, { Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import difference from 'rus-diff';
import { addNotification } from 'actions/notification';
import ReceivedApplication from './Fragments/ReceivedApplication';
import Project from './Forms/Project';
import AcceptedApplicationsCard from './AcceptedApplicationsCard.js';
import strings from 'components/util/language';
import { Grid } from 'semantic-ui-react';
import 'styles/components/projects.css';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import dummyAddedProjects from './Dummy/dummyProjects.js';

class ReceivedApplicationsCard extends Component {

  /* View Full Profile */
  /* View Company Profile */

  render() {
    const {userLanguage, projectApplication} = this.props;
    const project = dummyAddedProjects[0];
    return (
      <div id="recievedApps" className="card-white">
        <CollapsibleCardWrapper title={strings.receivedApplication} >
          {
              projectApplication && projectApplication.map((item) => {
                return (
               item.projectApplyStatus === 'Received' &&

                 <ReceivedApplication
                  userLanguage={userLanguage}
                  isProgress={item}
                />
                );
            })
          }
        </CollapsibleCardWrapper>
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
export default connect(mapStateToProps, { addNotification })(ReceivedApplicationsCard);
