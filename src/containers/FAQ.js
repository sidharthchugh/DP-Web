import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Footer from '../components/Reusable/Footer';
import Header from '../components/Reusable/Header';
import {connect} from 'react-redux';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import '../styles/components/legal';
import ContactHeader from '../components/Reusable/ContactHeader';
import digitalPartnerLogo from '../images/digitalPartnerLogo.png';
import strings from '../components/util/language';
import {Grid, Container, accordion} from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';

class FreAQ extends Component {

  constructor(props) {
   super(props);
   this.shiftLanguage = this.shiftLanguage.bind(this);
  }

 shiftLanguage(lang) {
   strings.setLanguage(lang);
   this.setState({});
 }

render() {
  const {user, userLanguage} = this.props;
  return (
    <Grid className="common-background contact-page overflow-page">
      <Grid.Row style={user.authenticated === false ? {backgroundColor: 'white', marginBottom: '17px'} : {marginBottom: '0px'}}>
        <Grid.Column computer={12}>
          <Grid container>
            <Grid.Column computer={12} >
              {user.authenticated === true && <ProfileHeader userLanguage={user.userObj.language} />}
            </Grid.Column>
          </Grid>
          {user.authenticated === false && <ContactHeader language={this.shiftLanguage} />}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column tablet={12} computer={12}>
          <Grid container>
            <Grid.Column tablet={12} computer={user.authenticated === false ? 12 : 9} className="no-gutter" textAlign="justify">
              <Grid container className={user.authenticated === false ? '' : 'pullUp'}>
                {/* <div className="ui styled accordion">
                  <div className="title">
                    <i className="dropdown icon" />
                    Why are all values in English?
                   </div>
                  <div className="content">
                    <p className="transition hidden">
                      <span className="transition hidden">
                        <br />
                     A. We are finding technology providers for you across Europe and globally. Therefore, we encourage you to fill your company profile in English,
                        given that it gives you access to a larger set of matches. Be aware that especially in the Startup/Tech-Scene, most companies have an international
                        team and speak English as a company language.<br />
                        <br />
                     B. At the same time, we aim to match you with customers across regions. Therefore, English is our go-to language.<br />
                        <br />
                      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
                      Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser
                      Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.<br />
                        <br />
                      </span>
                    </p>
                  </div>
                  <div className="title">
                    <i className="dropdown icon" />
                    What kinds of dogs are there?
                  </div>
                  <div className="content">
                    <p className="transition hidden">There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
                  </div>
                  <div className="title active">
                    <i className="dropdown icon" />
                    How do you acquire a dog?
                  </div>
                  <div className="content active">
                    <p className="transition visible">Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.</p>
                    <p className="transition visible">A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.</p>
                  </div>
                </div>*/}
                <p className="LegalLandingPage-privacy_Policy___Dat">
                    Frequently Asked Questions
                  </p>
                <p className="LegalLandingPage-datenschutz_Die_Betr">
                  <span className="FAQh">
                      Why should I sign up?
                  </span>
                  <span className="FAQp">
                    <br />
                   Creating a profile on Digital Partners allows you to share new project ideas
                    and co-create with companies from all over the world. You will receive access to our network,
                   enabling you to search for the perfect strategic partner for your organization.<br />
                    <br />
                  </span>
                  <span className="FAQh">
                      Why should I create a Company Profile?
                  </span>
                  <span className="FAQp">
                    <br />
                   When you create a company profile you are added to our network,
                   and will be discoverable by other companies and investors. Profiles can also be taken into account
                   when conducting searches, adding another level of certainty and accuracy to your matches.<br />
                    <br />
                  </span>
                  {/* <span className="heading">
                      How does it work?
                    </span>
                  <span>
                    <br />
                    Begin by creating a company profile, so other companies will find you when searching your product or service.<br />
                    <br />
                     You can input potential future projects, and allow other companies to apply to assist you with their products or services. <br />
                    <br />
                  </span>*/}
                  <span className="FAQh">
                    Do I need to fill in all profile fields?
                    </span>
                  <span className="FAQp">
                    <br />
                       No, you are not required to fill in all (or even most!) of the fields, but we recommend 
                       that you fill in as many as possible in order to have the best match quality.<br />
                    <br />
                  </span>
                  <span className="FAQh">
                      What if I do not know the meaning of a certain field?
                    </span>
                  <span className="FAQp">
                    <br />
                    When you hover over each field with your mouse you should be able
                    to see a tooltip that provides a simple explanation of each field.<br />
                    <br />
                  </span>
                  <span className="FAQh">
                      How do I navigate through Digital Partners?
                    </span>
                  <span className="FAQp">
                    <br />
                       After signing up, you will be directed to your Company Profile page, 
                       which is the core of your company’s presence on Digital Partners. From the Company Profile page, you can use the navigation bar at the top of your screen to switch between the News Feed, 
                       the Projects page, and the Search and Matches pages.<br />
                    <br />
                  </span>
                  <span className="FAQh">
                      What are Projects?
                    </span>
                  <span className="FAQp">
                    <br />
                       On Digital Partners, Projects are publicly visible descriptions of initiatives within your organization.
                       To create a Project, you can click Projects in Digital Partners’ navigation bar, and select Add a New Project.<br />
                    <br />
                  </span>
                  <span className="FAQh">
                      How do I conduct a Search?
                    </span>
                  <span className="FAQp">
                    <br />
                      To conduct a search, or manage your past searches, go to the
                      Search page using the navigation bar. To begin a new search,
                      select a Search Scenario, and then fill in any fields relevant to your search requirements.
                      If you consider a certain field to be absolutely critical, you can check the “K.O.” box for that field, and any matches you see will be guaranteed to meet that requirement.
                      You can manage your Saved Searches in the box to the right of your screen.<br />
                    <br />
                  </span>
                  <span className="FAQh">
                     How can I see my Matches?<br />
                  </span>
                  <span className="FAQp">
                     After you conduct a search, it may take a while for matches
                    to be generated and verified, and in some cases our consultants may manually check the matches to ensure their accuracy! 
                     After this verification process, you will receive an email notification
                     alerting you that you have available matches, and can browse them easily on the Matches page. <br />
                    <br />
                  </span>
                  <span className="FAQh">
                      Why should I trust Digital Partners with my company information?
                    </span>
                  <span className="FAQp">
                    <br />
                       In addition to our HTTPS and SSL protections, we take very careful steps to ensure the security of your data.
                       Our database is located in Germany, and we therefore adhere to strict German privacy regulations. <br />
                    <br />
                  </span>
                  <span className="FAQh">
                      What if I am unsure how to describe my company, project, product, or search?
                    </span>
                  <span className="FAQp">
                    <br />
                       Try your best, and our search algorithm will take care of the rest! However,
                       if you would like support defining any of these categories, feel free to reach out to us directly.<br />
                    <br />
                  </span>
                  <span className="FAQh">
                      What if I cannot find a field or category to accurately describe my company or product?
                    </span>
                  <span className="FAQp">
                    <br />
                     If this is the case, please feel free to contact us! We are still growing and adapting our database, and your feedback on how to improve is extremely valuable to us.
                    <br />
                    <br />
                  </span>
                  <span className="FAQh">
                      Why is everything written in English?
                    </span>
                  <span className="FAQp">
                    <br />
                       Digital Partners connects you with technology suppliers from around the world,
                       therefore to reach the widest range of potential matches we encourage you to fill out your profile in English. Be aware that in the tech community - 
                       especially amongst startups, most companies have international teams and use English internally. <br />
                    <br />
                  </span>
                    <span className="FAQh">
                      How can I receive individual support?
                    </span>
                  <span className="FAQp">
                    <br />
                       Feel free to contact us directly by phone or email at any time! <br />
                  </span>
                </p>
              </Grid>
            </Grid.Column>
            {user.authenticated === true && <Grid.Column tablet={12} computer={3} textAlign="center">
              <div className="profile-page-right-sidebar">
                <ProfilePageRightSidebar userLanguage={userLanguage} strings={strings} />
              </div>
              </Grid.Column>}
          </Grid>
          {user.authenticated === false && <Footer userLanguage={userLanguage} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
}

FreAQ.propTypes = {
  user: PropTypes.object,
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
      user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(FreAQ);
