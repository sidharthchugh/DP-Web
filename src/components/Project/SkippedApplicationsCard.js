import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import strings from 'components/util/language';
import SkippedApplication from './Fragments/SkippedApplication.js';
import { addNotification } from 'actions/notification';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';

class SkippedApplicationsCard extends Component {
  render() {
    const { userLanguage, projectApplication } = this.props;
    const skippedproject = projectApplication && projectApplication.filter((statusSkipped) => {
    return statusSkipped.projectApplyStatus === 'Skipped';
  });
    return (
      <div>
        {skippedproject && skippedproject.length > 0 &&
        <div className="card-white">
          <CollapsibleCardWrapper title={'Skipped Applications'} secondLevel>
            {
            projectApplication && projectApplication.map((item) => {
              return (
             item.projectApplyStatus === 'Skipped' &&
             <SkippedApplication
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
    profiles: state.profile.profiles,
    sections: state.projects.sections
  };
}

export default connect(mapStateToProps, { addNotification })(
  SkippedApplicationsCard
);
