import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StickyContainer} from 'react-sticky';
import ContactHeader from '../components/Reusable/ContactHeader';
import BlogCard from '../components/Blog/BlogCard';
import '../styles/components/profilecard';
import { Grid, Container } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import strings from '../components/util/language';
import { Timeline, Follow } from 'react-twitter-widgets';
import Footer from '../components/Reusable/Footer';

class Blog extends Component {

  componentWillMount() {
    const {userLanguage} = this.props;
    if (userLanguage === 'German') {
      strings.setLanguage('de');
    } else {
      strings.setLanguage('en');
    }
    this.setState({});
  }

  render() {
    const {user} = this.props;
    return (
       <Grid className="contact-header common-background invitePartner-pag overflow-page">
        <Grid.Row>
          <Container fluid>
            <Grid.Column computer={12} style={{backgroundColor: 'white', marginBottom: '17px'}}>
              <ContactHeader language={this.shiftLanguage} />
            </Grid.Column>
            <Grid container>
              <Grid.Row />
              <Grid.Column tablet={12} computer={9} className="no-gutter">
                <StickyContainer>
                  <BlogCard userLanguage={user.userObj && user.userObj.language ? user.userObj.language : user.language} strings={strings} />
                </StickyContainer>
              </Grid.Column>
               <Grid.Column tablet={12} computer={3} textAlign="center">
              <div className="twitter_blog_feeds mobile hidden">
                <Timeline
                 dataSource={{
                sourceType: 'profile',
                screenName: 'DigiPartners_io',
              }}
              options={{
                username: 'DigiPartners_io',
                height: '400'
              }} />
                <Follow username="DigiPartners_io" />
              </div>
            </Grid.Column>
            </Grid>
            <Footer userLanguage={user.userObj && user.userObj.language ? user.userObj.language : user.language} />
          </Container>
        </Grid.Row>
      </Grid>
      );
   }
}


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
   user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Blog);
