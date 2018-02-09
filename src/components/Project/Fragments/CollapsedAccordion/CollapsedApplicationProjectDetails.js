import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { Grid, Button } from 'semantic-ui-react';
import strings from 'components/util/language.js';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingLogo from '../../../Reusable/MatchingLogo';
import {ProjectSection} from '../../Sections/ProjectSection';
import ProjectTitle from '../../../Reusable/ProjectTitle.js';


class CollapsedApplicationProjectDetails extends Component {
  render() {
    const {project, userLanguage, cmsData} = this.props;
    const projectSections = ProjectSection(cmsData);
    const projectInfo = projectSections.projectInfoSubSection;
    const labelProjectName = userLanguage == 'English' ? projectInfo.projectName.englishLabel : projectInfo.projectName.germanLabel;
    const labelProjectDescription = userLanguage == 'English' ? projectInfo.projectDescription.englishLabel : projectInfo.projectDescription.germanLabel;
    const labelProjectType = userLanguage == 'English' ? projectInfo.projectType.englishLabel : projectInfo.projectType.germanLabel;
    const labelProjectTechField = userLanguage == 'English' ? projectInfo.projectTechnologies.englishLabel : projectInfo.projectTechnologies.germanLabel;
    const labelProjectAppDeadline = userLanguage == 'English' ? projectInfo.projectAppDeadline.englishLabel : projectInfo.projectAppDeadline.germanLabel;
    return (
      <Grid>
        <Grid.Column computer={12} style={{paddingBottom: '0px'}}>
          <Grid>
            <Grid.Column computer={4}>
               <div className="heading3">
              {project.projectName.typeValues}
              </div>
            </Grid.Column>
            <Grid.Column computer={4}>
            {project.projectLocation.typeValues[0] && project.projectLocation.typeValues[0].value && <p className="p-secondary"><FontAwesome name="map-marker" />{project.projectLocation.typeValues[0].value}</p>}
            </Grid.Column>
            <Grid.Column computer={4}>
              <h3 className="match-summary--title heading3">
                <FontAwesome name="money" />
                <span style={{textTransform: 'none', paddingLeft: '10px', paddingRight: '10px', fontFamily: 'Catamaran'}}>max. €</span>
                {project.projectBudget.typeValues}
              </h3>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column mobile={12} tablet={12} computer={12} className="match-summary--key-facts no-vertical-padding">
          <MatchField
          className="no-gutter match-summary--key-fact"
          name={labelProjectDescription}
          field={project.projectDescription.typeValues} />
        </Grid.Column>
        <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts no-vertical-padding">
          <MatchField
          className="no-gutter match-summary--key-fact"
          name={labelProjectType}
          field={project.projectType.typeValues} />
        </Grid.Column>
        <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts no-vertical-padding">
          <MatchField
          className="no-gutter match-summary--key-fact"
          name={labelProjectTechField}
          field={project.projectTechnologies.typeValues} />
        </Grid.Column>
        <Grid.Column mobile={12} tablet={4} computer={4} className="match-summary--key-facts no-vertical-padding">
          <MatchField
          className="no-gutter match-summary--key-fact"
          name={labelProjectAppDeadline}
          field={project.projectAppDeadline.typeValues} />
        </Grid.Column>
      </Grid>
    );
  }
}


export default CollapsedApplicationProjectDetails;
