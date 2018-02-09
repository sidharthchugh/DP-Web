import React from 'react';
import MatchField from '../MatchField';
import strings from '../../../../components/util/language';
import {Grid} from 'semantic-ui-react';

const ProjectMatchSpecifics = (props) => {
  const {matchedProject} = props;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={12} textAlign="left">
          <div className="label-generic match-summary--header-specific">
            Project: {matchedProject.projectName.typeValues}
          </div>
        </Grid.Column>
        <Grid.Column tablet={12} computer={4} textAlign="left">
          <MatchField
            className="match-summary--specific"
            name="digitalProductCategory"
            label="Product Classes involved"
            field={matchedProject.projectClass.typeValues}
          />
        </Grid.Column>
        <Grid.Column tablet={12} computer={4} textAlign="left">
          <MatchField
            className="match-summary--specific"
            name="valueProposition"
            label="Project Core Technologies"
            field={matchedProject.projectCoreTechnologies.typeValues}
          />
        </Grid.Column>
        <Grid.Column tablet={12} computer={4} textAlign="left">
          <MatchField
            className="match-summary--specific"
            name="uniqueSellingPoints"
            label="Technology application field"
            field={matchedProject.projectTechnologies.typeValues}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProjectMatchSpecifics;
