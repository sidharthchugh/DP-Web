import React, {Component} from 'react';
import {Grid, Image, Container, Button} from 'semantic-ui-react';
import strings from '../../util/language';
import howIconOne from 'images/how_1.png';
import howIconTwo from 'images/how_2.png';
import howIconThree from 'images/how_3.png';
import howIconFour from 'images/how_4.png';
import howIconFive from 'images/how_5.png';
import howArrow from 'images/icon_arrow.png';
import howitWorksImage from 'images/howitWorksImage.svg';
import Scrollchor from 'react-scrollchor';
import arrow from 'images/path_2-3.svg';


const SectionLandingHowSegment = (props) => {
  return (
    <Grid.Column mobile={12} tablet={12} computer={2} textAlign="center">
      <Grid centered >
        <Grid.Column tablet={12} only="tablet mobile" textAlign="center">
          <Image src={props.icon} alt="icon" className="howImage" />
        </Grid.Column>
        <Grid.Column tablet={12} textAlign="center">
          <span className="how-span" >{props.number}</span>
          <p className="how-p" >{props.description}</p>
        </Grid.Column>
        <Grid.Column tablet={12} only="tablet mobile" textAlign="center">
          {props.arrow ? <Image src={howArrow} className="howImage" /> : null}
        </Grid.Column>
      </Grid>
    </Grid.Column>
  );
};


class SectionLandingHow extends Component {
  render() {
    return (
      <Grid id="howit-works" textAlign="center" centered>
        <Grid.Column computer={12} textAlign="center">
          <h1 className="h1-red">
            {strings.howitWorksMainHeading}
          </h1>
          <h4 className="h4-subheading">
            {strings.howitWorksSubHeading1} <strong>{strings.howitWorksSubHeading2}</strong> {strings.howitWorksSubHeading3}
          </h4>
        </Grid.Column>
        <Grid.Column computer={10} textAlign="center" only="computer">
          <Image src={howitWorksImage} alt="howitWorksImage" fluid style={{margin: 'auto'}} />
        </Grid.Column>
        <Grid.Column largeScreen={10} textAlign="center" only="large screen">
          <Image src={howitWorksImage} alt="howitWorksImage" fluid style={{margin: 'auto'}} />
        </Grid.Column>
        <Grid.Column widescreen={8} textAlign="center" only="widescreen">
          <Image src={howitWorksImage} alt="howitWorksImage" fluid style={{margin: 'auto'}} />
        </Grid.Column>
        <Grid.Column tablet={12} computer={12} textAlign="center">
          <Grid centered textAlign="center">
            <SectionLandingHowSegment
              arrow
              icon={howIconOne}
              number={'1.'}
              description={strings.howitWorksFirstDescription}
              />
            <SectionLandingHowSegment
              arrow
              icon={howIconTwo}
              number={'2.'}
              description={strings.howitWorksSecondDescription}
              />
            <SectionLandingHowSegment
              arrow
              icon={howIconThree}
              number={'3.'}
              description={strings.howitWorksthirdDescription}
              />
            <SectionLandingHowSegment
              arrow
              icon={howIconFour}
              number={'4.'}
              description={strings.howitWorksfourthDescription}
              />
            <SectionLandingHowSegment
              arrow={false}
              icon={howIconFive}
              number={'5.'}
              description={strings.howitWorksfifthDescription}
              />
          </Grid>
          <Scrollchor to="pricing" animate={{offset: -50, duration: 500}} className="landing-section-arrow-inverted">
            <Image src={arrow} alt="arrow" />
          </Scrollchor>
        </Grid.Column>

      </Grid>
    );
  }
}

export default SectionLandingHow;
