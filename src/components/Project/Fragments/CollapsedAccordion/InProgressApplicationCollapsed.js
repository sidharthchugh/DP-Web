import React from 'react';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import strings from 'components/util/language.js';
import { Grid, Button } from 'semantic-ui-react';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingLogo from '../../../Reusable/MatchingLogo';
import dummyProfile from '../../Dummy/dummyReceivedApplications.js';
import MatchingContact from '../../../Reusable/MatchingContact';
import {toggleProjectsEdit} from 'actions/projects';
import MatchingProfile from '../../../Reusable/MatchingProfile';
import MatchLogo from '../../../Reusable/MatchLogo';
import editIcon from 'images/edit-icon.png';
import CollapsedApplicationProjectDetails from './CollapsedApplicationProjectDetails.js';


const InProgressApplicationCollapsed = (props) => {
  const {project, userLanguage, isProgress, user, sections} = props;
  
  function toggleEdit(section) {
    const {toggleProjectsEdit} = props;
    props.toggleProjectsEdit(section);
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={12} className="match-summary">
          <Grid centered>
            <Grid.Row>
              <Grid.Column computer={4}>
                <div className="heading3">
                  <MatchingProfile userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} companyName={isProgress.companyName.typeValues} />
                </div>
              </Grid.Column>
              <Grid.Column computer={4} className="received-app-date">
                {isProgress.headquarters.typeValues && <p className="p-secondary"><FontAwesome name="map-marker" />{isProgress.headquarters.typeValues}</p>}
              </Grid.Column>
              <Grid.Column computer={4} textAlign="right">
                <Button className="button-4 button-4--grey" onClick={props.withdrawApplication}>
                  <FontAwesome name="minus-circle" />
                  {strings.withdrawApplication}
                </Button>
              </Grid.Column>
              <Grid.Column mobile={12} tablet={1} computer={1} className="no-gutter" textAlign="left" style={{paddingTop: '0px'}}>
                <MatchLogo logoURI={isProgress.logoURI} userLanguage={userLanguage} user={user} profileId={isProgress.profileId} searchType={'projectSearch'} className={'match-logoadjust'} companyName={isProgress.companyName.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={11} computer={9} textAlign="justified">
                <MatchField name="description" label={strings.matchdescription} field={isProgress.companyDescription.typeValues} />
              </Grid.Column>
              <Grid.Column mobile={12} tablet={12} computer={2} verticalAlign="middle" textAlign="right">
                <div className="container-saved-match-buttons">
                  <Grid>
                    <Grid.Column mobile={8} computer={12} textAlign="right">
                  <div style={{paddingTop: '0px'}} className={'profile-card no-gutter no-shadow' + (sections.projectsApplication.editable ? ' edit-mode' : '')}>
                    <div className="edit-save-wrapper">
                      <a className="edit-button-project collapse-projectApplication projectinProgress" onClick={() => toggleEdit('projectsApplication')}>
                        <img src={editIcon} role="presentation" /> edit
                      </a>
                      <div className="save-cancel-project-button collapse-projectApplication projectinProgress">
                        <Button className="button-small button-small--grey" type="button" onClick={() => toggleEdit('projectsApplication')}>cancel</Button>
                        <Button className="button-small" type="submit" onClick={() => toggleEdit('projectsApplication')} form={'projectsApplicationForm'} >save</Button>
                      </div>
                    </div>
                    </div>
                    </Grid.Column>
                  </Grid>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {
              isProgress.matchedProjects && isProgress.matchedProjects.map((item) => {
                return (
                  <CollapsedApplicationProjectDetails
                project={item}
                userLanguage={userLanguage}
          />);
            })
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};



function mapStateToProps(state) {
  return {
   };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {toggleProjectsEdit})(InProgressApplicationCollapsed);
