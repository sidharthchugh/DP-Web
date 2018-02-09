import React from 'react';
import {Link} from 'react-router';
import centeredLogo from 'images/centeredLogo.png';
import {Grid} from 'semantic-ui-react';

const CenteredLogo = () => {
  return (
    <header>
      <Grid centered>
        <Grid.Column computer={12} textAlign="center">
          <Link to="/"><img src={centeredLogo} /></Link>
        </Grid.Column>
      </Grid>
    </header>
  );
};

export default CenteredLogo;
