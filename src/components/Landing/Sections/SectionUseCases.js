import React from 'react';
import {Grid, Image, Container, Button} from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';
import MachL from '../../../images/MachineLearning.png';
import Enterprise from '../../../images/Enterprise.png';
import VReality from '../../../images/VR.png';
import strings from '../../util/language';
import ideate from 'images/ideate.svg';
import searchLine from 'images/line.svg';
import realize from 'images/realize.svg';
import searchCompare from 'images/searchCompare.svg';
import {Link} from 'react-router';
import arrowwhite from 'images/arrow-white.svg';


const SectionLandingUseCases = (props) => {
      return (
        <Grid centered textAlign="center" id="use-case" >
          <Grid.Column computer={12} textAlign="center" className="pullUps">
            <h1 className="h1-red">
              {strings.useCasesHeading}
            </h1>
            <h4 className="h4-subheading">
              {strings.useCasesHeading1}
            </h4>
          </Grid.Column>
          <Grid.Column computer={12} textAlign="center" className="pullUpss">
            <Grid className="extra-height">
              <Grid.Column largeScreen={12} only="large screen" className="no-side-padding">
                <div className="usecaseBack">
                  {/* <Image src={searchDigitalImage} fluid />*/}
                </div>
              </Grid.Column>
              <Grid.Column widescreen={12} only="widescreen" className="no-side-padding">
                <div className="usecaseBack">
                  {/* <Image src={searchDigitalImage} fluid />*/}
                </div>
              </Grid.Column>
              <Grid.Column computer={12} only="computer" className="no-side-padding">
                <div className="usecaseBack">
                  {/* <Image src={searchDigitalImage} fluid />*/}
                </div>
              </Grid.Column>
              <Grid.Column tablet={12} only="tablet" className="no-side-padding">
                <div className="usecaseBack">
                  {/* <Image src={searchDigitalImageTablet} fluid />*/}
                </div>
              </Grid.Column>
              <Grid.Column mobile={12} only="mobile" className="no-side-padding">
                <div className="usecaseBack">
                  {/* <Image src={searchDigitalImageTablet} fluid />*/}
                </div>
              </Grid.Column >
              <Grid className="layer-search " centered textAlign="center">
                <Grid.Column mobile={12} tablet={12} computer={3} textAlign="center">
                  <div className="ui centered card shadow pullLeft">
                    <div className="content">
                      <h3 className="cardHeader">{strings.useCasesCard1Header}</h3>
                    </div>
                    <div className="image">
                      <img src={MachL} alt="MacingLearning" />
                    </div>
                    <div className="content cardSize">
                      <h3 className="cardTitle">{strings.useCasesCard1Title}</h3>
                      <p className="cardBody">{strings.useCasesCard1Body}</p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={12} computer={3} textAlign="center">
                  <div className="ui centered card shadow pullLeft pullUppy">
                    <div className="content">
                      <h3 className="cardHeader">{strings.useCasesCard2Header}</h3>
                    </div>
                    <div className="image Eimage">
                      <img src={Enterprise} alt="Enterprise" />
                    </div>
                    <div className="content cardSize">
                      <h3 className="cardTitle">{strings.useCasesCard2Title}</h3>
                      <p className="cardBody">{strings.useCasesCard2Body}</p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={12} computer={3} textAlign="center">
                  <div className="ui centered card shadow pullLeft pullUppyy">
                    <div className="content">
                      <h3 className="cardHeaderVR">{strings.useCasesCard3Header}</h3>
                    </div>
                    <div className="image VRimage">
                      <img src={VReality} alt="Virtual Reality" />
                    </div>
                    <div className="content cardSize">
                      <h3 className="cardTitle">{strings.useCasesCard3Title}</h3>
                      <p className="cardBody">{strings.useCasesCard3Body}</p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={12} computer={4} className="mobile hidden tablet hidden" textAlign="center">
                  <div className="centery">
                    <h1 className="h1-red-number">
                    36+
                  </h1>
                    <h4 className="h4-subheading-use">
                    Partnerships created
                  </h4>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={12} computer={4} className="mobile hidden tablet hidden" textAlign="center">
                  <div className="centeryy">
                    <h1 className="h1-red-number">
                    9,500+
                  </h1>
                    <h4 className="h4-subheading-use">
                    Technology Suppliers
                  </h4>
                  </div>
                </Grid.Column>
              </Grid>
            </Grid>
          </Grid.Column>
          <Scrollchor to="#our-tech" animate={{offset: -70, duration: 500}} className="landing-section-arrow arrr">
            <Image src={arrowwhite} alt="arrowwhite" />
          </Scrollchor>
        </Grid>
    );
};


export default SectionLandingUseCases;
