import React from 'react';
import {Grid, Image, Container, Button} from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';
import searchDigitalImage from 'images/women_thinking_680.png';
import searchDigitalImageTablet from 'images/search_tablet.png';
import strings from '../../util/language';
import ideate from 'images/ideate.svg';
import searchLine from 'images/line.svg';
import realize from 'images/realize.svg';
import searchCompare from 'images/searchCompare.svg';
import {Link} from 'react-router';
import arrowwhite from 'images/arrow-white.svg';


const SectionLandingSearch = (props) => {
      return (
        <Grid centered textAlign="center" id="search-digital">
          <Grid.Column computer={12} textAlign="center">
            <h1 className="h1-red">
              {strings.searchDigitalHeading}
            </h1>
            <h4 className="h4-subheading">
              {strings.searchDigitalSubHeading1} <strong> {strings.searchDigitalSubHeading2} </strong> {strings.searchDigitalSubHeading3}
            </h4>
          </Grid.Column>
          <Grid.Column computer={12} textAlign="center">
            <Grid>
              <Grid.Column largeScreen={12} only="large screen" className="no-side-padding">
                <Image src={searchDigitalImage} alt="searchDigitalImage" fluid />
              </Grid.Column>
              <Grid.Column widescreen={12} only="widescreen" className="no-side-padding">
                <Image src={searchDigitalImage} alt="searchDigitalImage" fluid />
              </Grid.Column>
              <Grid.Column computer={12} only="computer" className="no-side-padding">
                <Image src={searchDigitalImage} alt="searchDigitalImage" fluid />
              </Grid.Column>
              <Grid.Column tablet={12} only="tablet" className="no-side-padding">
                <Image src={searchDigitalImageTablet} alt="searchDigitalImage" fluid />
              </Grid.Column>
              <Grid.Column mobile={12} only="mobile" className="no-side-padding">
                <Image src={searchDigitalImageTablet} alt="searchDigitalImage" fluid />
              </Grid.Column >
              <Grid className="layer-search" centered textAlign="center">
                <Grid.Column mobile={12} tablet={12} computer={3} className="card-grey1" textAlign="center">
                  <Image src={ideate} alt="ideate" />
                  <h4>{strings.searchFirstMainDescription}</h4>
                  <div className="landing-line" />
                  <p>{strings.searchFirstSubDescription}</p>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={12} computer={3} className="card-grey1" textAlign="center">
                  <Image src={searchCompare} alt="searchCompare" />
                  <h4>{strings.searchSecondMainDescription}</h4>
                  <div className="landing-line" />
                  <p>{strings.searchSecondSubDescription}</p>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={12} computer={3} className="card-grey1" textAlign="center">
                  <Image src={realize} alt="realize" />
                  <h4>{strings.searchThirdMainDescription}</h4>
                  <div className="landing-line" />
                  <p>{strings.searchThirdSubDescription}</p>
                </Grid.Column>
              </Grid>
            </Grid>
          </Grid.Column>
          <Scrollchor to="#supply-digital" animate={{offset: -50, duration: 500}} className="landing-section-arrow">
            <Image src={arrowwhite} alt="arrowwhite" />
          </Scrollchor>
        </Grid>
    );
};


export default SectionLandingSearch;
