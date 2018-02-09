import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StickyContainer} from 'react-sticky';
import {Link} from 'react-router';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import ProjectSignupCard from '../components/Project/ProjectSignupCard';
import ContactHeader from '../components/Reusable/ContactHeader';
import '../styles/components/projects.css';
import {toggleLoginMode} from 'actions/users';
import { Grid, Container, Button } from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';
import strings from '../components/util/language';
import Footer from '../components/Reusable/Footer';
import { withRouter } from 'react-router';
import { isDirty } from 'redux-form';

class ProjectSignup extends Component {

  constructor(props) {
    super(props);
    this.shiftLanguage = this.shiftLanguage.bind(this);
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

   shiftLanguage(lang) {
   strings.setLanguage(lang);
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
    const {user: { isLogin }, userLanguage, user} = this.props;
    return (
    <Grid className="contact-header common-background invitePartner-pag overflow-page">
        <Grid.Row>
          <Container fluid>
            <Grid.Column computer={12} style={{backgroundColor: 'white', marginBottom: '17px'}}>
               <ContactHeader language={this.shiftLanguage} projectId={this.props.params.projectId} />
              </Grid.Column>
            <Grid container>
                <Grid.Row />
                <Grid.Column tablet={12} computer={9} className="no-gutter">
                <ProjectSignupCard userLanguage={userLanguage} strings={strings} projectId={this.props.params.projectId} />
              </Grid.Column>
                   <Grid.Row className="signup-projectfooter">
                    <Link to={`/landing/${this.props.params.projectId}#authentication`}>
                      <Button className="nav-button" id="signup-header" onClick={isLogin ? this.props.toggleLoginMode : null}>{strings.headerSignup}</Button>
                    </Link>
                    <div className="signup-project">or</div>
                     <Link to={`/landing/${this.props.params.projectId}#authentication`}>
                        <Button className="nav-button" id="login-header" onClick={isLogin ? null : this.props.toggleLoginMode}>{strings.headerLogin}</Button>
                      </Link>
                    <div className="signup-project">to apply for this project</div>
                    </Grid.Row>
                </Grid>
              <Footer userLanguage={user.userObj && user.userObj.language ? user.userObj.language : user.language} />
          </Container>
        </Grid.Row>
      </Grid>
      );
   }
}

ProjectSignup = withRouter(ProjectSignup);

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user,
    dirty: {
      /* Profile Forms */
      general: isDirty('GeneralInformation')(state),
      company: isDirty('CompanyDescription')(state),
      product: isDirty('Product')(state),
      reference: isDirty('Reference')(state),
    }
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {toggleLoginMode})(ProjectSignup);
