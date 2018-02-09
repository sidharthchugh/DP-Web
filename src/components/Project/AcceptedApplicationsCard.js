import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import strings from 'components/util/language';
import AcceptedApplication from './Fragments/AcceptedApplication.js';
import { addNotification } from 'actions/notification';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';

class AcceptedApplicationsCard extends Component {
  render() {
    const { userLanguage, projectApplication } = this.props;
    const acceptedproject = projectApplication && projectApplication.filter((statusAccepted) => {
      return statusAccepted.projectApplyStatus === 'Accepted';
  });
    return (
      <div>
        {acceptedproject && acceptedproject.length > 0 &&
        <div className="card-white">
          <CollapsibleCardWrapper title={'Accepted Applications'} secondLevel>
            {
            projectApplication && projectApplication.map((item) => {
              return (
             item.projectApplyStatus === 'Accepted' &&
             <AcceptedApplication
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

function mapStateToProps(state) {
  return {
    profiles: state.projects.profiles,
    sections: state.projects.sections
  };
}

export default connect(mapStateToProps, { addNotification })(
  AcceptedApplicationsCard
);
