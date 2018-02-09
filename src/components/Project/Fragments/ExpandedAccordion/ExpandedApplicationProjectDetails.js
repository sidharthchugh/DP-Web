import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { Grid, Button } from 'semantic-ui-react';
import strings from 'components/util/language.js';
import MatchField from '../../../Matches/Fragments/MatchField';
import MatchingLogo from '../../../Reusable/MatchingLogo';
import ProjectSection from '../../Sections/ProjectSection';


const RenderProductField = (props) => {
  const {section, sectionField, sectionFieldValue} = props;
  const label = userLanguage == "English" ? section[sectionField].englishLabel : section[sectionField].germanLabel;
  return(
    <MatchField
    className="no-gutter match-summary--key-fact"
    name={label}
    field={sectionFieldValue} />
  )
}

class ExpandedApplicationProjectDetails extends Component{
  render() {
    const {project, userLanguage} = this.props;
    const projectInfo = ProjectSection.projectInfoSubSection;
    const labelProjectName = userLanguage == "English" ? projectInfo.projectName.englishLabel : projectInfo.projectName.germanLabel;
    const labelProjectDescription = userLanguage == "English" ? projectInfo.projectDescription.englishLabel : projectInfo.projectDescription.germanLabel;
    const labelProjectType = userLanguage == "English" ? projectInfo.projectType.englishLabel : projectInfo.projectType.germanLabel;
    const labelProjectTechField = userLanguage == "English" ? projectInfo.projectTechField.englishLabel : projectInfo.projectTechField.germanLabel;
    const labelProjectAppDeadline = userLanguage == "English" ? projectInfo.projectAppDeadline.englishLabel : projectInfo.projectAppDeadline.germanLabel;
    /* Project Class Involved */
    const labelProjectProdClassInvolved = userLanguage == "English" ? projectInfo.projectAppDeadline.englishLabel : projectInfo.projectAppDeadline.germanLabel;
    return(
      <Grid>
        <Grid.Column mobile={12} tablet={12} computer={12} className="match-summary--key-facts no-vertical-padding">
          <MatchField
          className="no-gutter match-summary--key-fact"
          name={labelProjectDescription}
          field={project.projectDescription.typeValues} />
        </Grid.Column>
      </Grid>
    )
  }
}


export default ExpandedApplicationProjectDetails;
