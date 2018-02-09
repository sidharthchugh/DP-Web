import React from 'react';
import {Grid, Image, Container, Button} from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';
import MachL from '../../../images/MachineLearning.png';
import Kompany from '../../../images/Kompnay.png';
import Innoctecs from '../../../images/Innoctecs.png';
import Deckard from '../../../images/deckardI.png';
import Waat from '../../../images/WAAT.png';
import BBlogo from '../../../images/BBlogo.png';
import relayr from '../../../images/relayr.png';
import Ruhrbotics from '../../../images/Ruhrbotics.png';
import Xapix from '../../../images/xapix.png';
import strings from '../../util/language';
import ideate from 'images/ideate.svg';
import searchLine from 'images/line.svg';
import realize from 'images/realize.svg';
import searchCompare from 'images/searchCompare.svg';
import {Link} from 'react-router';
import arrowwhite from 'images/arrow-white.svg';


const SectionTech = (props) => {
      return (
        <Grid centered textAlign="center" id="our-tech" >
          <Grid.Column computer={12} textAlign="center" className="pullUps">
            <h1 className="h1-blue">
              {strings.techHeader}
            </h1>
            <h4 className="h4-subheading">
              {strings.techHeader1}
            </h4>
          </Grid.Column>
          <Grid.Column computer={12} textAlign="center" className="pullUpz">
            <Grid className="extra-heightT">
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
                <Grid.Column mobile={12} tablet={4} computer={2} textAlign="center">
                  <div className="content">
                    <h3 className="cardHeaderT">Industrial IoT</h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="http://www.ruhrbotics.de/">
                      <img className="sizeMattersRB" alt="Ruhrbotics" src={Ruhrbotics} />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="http://www.ruhrbotics.de/">Ruhrbotics</a></h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="https://relayr.io/en/">
                      <img className="sizeMattersR" alt="relayr" src={relayr} />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="https://relayr.io/en/">Relayr</a></h3>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={4} computer={2} textAlign="center">
                  <div className="content">
                    <h3 className="cardHeaderTF">FinTech</h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="https://www.kompany.de">
                      <img className="sizeMatters" alt="Kompany" src={Kompany} />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="https://www.kompany.de">Kompany</a></h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="https://www.buchhaltungsbutler.de/">
                      <img className="sizeMattersB" src={BBlogo} alt="Buchhaltungs Butler" />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="https://www.buchhaltungsbutler.de/">Buchhaltungs Butler</a></h3>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={4} computer={2} textAlign="center">
                  <div className="content">
                    <h3 className="cardHeaderTA">Enterprise Software</h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="http://www.innotec-solutions.de/">
                      <img className="sizeMattersI" alt="InnoTecS" src={Innoctecs} />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="http://www.innotec-solutions.de/">InnoTecS</a></h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="http://waat.eu/">
                      <img className="sizeMattersW" src={Waat} alt="Waat.eu" />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="http://waat.eu/">Waat.eu</a></h3>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={12} tablet={4} computer={2} textAlign="center">
                  <div className="content">
                    <h3 className="cardHeaderTE">Developer Tools</h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="http://deckard.ai/">
                      <img className="sizeMattersD" src={Deckard} alt="Deckard" />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="http://deckard.ai/">Deckard.ai</a></h3>
                  </div>
                  <div className="image">
                    <a target="_blank" href="https://www.xapix.io/">
                      <img className="sizeMattersX" src={Xapix} alt="Xapix" />
                    </a>
                  </div>
                  <div className="content cardSize">
                    <h3><a className="cardTitleT" target="_blank" href="https://www.xapix.io/">Xapix.io</a></h3>
                  </div>
                </Grid.Column>
              </Grid>
            </Grid>
          </Grid.Column>
          <Scrollchor to="#search-digital" animate={{offset: -60, duration: 500}} className="landing-section-arrowT">
            <Image src={arrowwhite} alt="arrowwhite" />
          </Scrollchor>
        </Grid>
    );
};


export default SectionTech;
