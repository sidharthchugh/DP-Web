import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StickyContainer} from 'react-sticky';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import FeedCard from '../components/Feed/FeedCard';
import '../styles/components/profilecard';
import { Grid, Container } from 'semantic-ui-react';
import { Card, Icon, Image } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import strings from '../components/util/language';
import { withRouter } from 'react-router';
import { Timeline, Follow } from 'react-twitter-widgets';
import { isDirty } from 'redux-form';

const CardExampleCard = ({category}) => (
  <Card href={'/category/' + category}>
    <Image src="http://placehold.it/270x270/" />
    <Card.Content header={category} />
    <Card.Content description="Define your Roadmap & get ready for change" />
  </Card>
);

class Ecosystem extends Component {

  constructor(props) {
    super(props);
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  componentWillMount() {
    const {userLanguage} = this.props;
    if (userLanguage === 'German') {
      strings.setLanguage('de');
    } else {
      strings.setLanguage('en');
    }
    this.setState({});
  }

  routerWillLeave(nextLocation) {
      const self = this;
      // return false to prevent a transition w/o prompting the user,
      // or return a string to allow the user to decide:
      for (const key in self.props.dirty) {
        if (self.props.dirty[key]) {
          return 'Your work is not saved! Are you sure you want to leave?';
        }
      }
  }

  render() {
    const {userLanguage} = this.props;
    return (
      <Grid className="common-background profile-page overflow-page">
        <Grid.Column computer={12}>
          <Grid container>

            <Grid.Column computer={12}>
              <ProfileHeader userLanguage={userLanguage} />
            </Grid.Column>

            <Grid.Column tablet={12} computer={9}>
              <Card.Group itemsPerRow={3}>
                <CardExampleCard category="IoT Sensors" />
                <CardExampleCard category="IoT Sensors" />
                <CardExampleCard category="IoT Sensors" />
                <CardExampleCard category="IoT Sensors" />
                <CardExampleCard category="Consulting" />
                <CardExampleCard category="Consulting" />
                <CardExampleCard category="Consulting" />
                <CardExampleCard category="Consulting" />
                <CardExampleCard category="Consulting" />
              </Card.Group>
            </Grid.Column>

            <Grid.Column tablet={12} computer={3} textAlign="center">
              <div className="profile-page-right-sidebar">
                <ProfilePageRightSidebar userLanguage={userLanguage} strings={strings} />
              </div>
            </Grid.Column>

          </Grid>
        </Grid.Column>
      </Grid>
      );
   }
}

Ecosystem = withRouter(Ecosystem);

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    userLanguage: state.user.userObj.language,
    dirty: {
      /* Profile Forms */
      general: isDirty('GeneralInformation')(state),
      company: isDirty('CompanyDescription')(state),
      product: isDirty('Product')(state),
      reference: isDirty('Reference')(state),
      reputation: isDirty('Reputation')(state)
    }
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Ecosystem);
