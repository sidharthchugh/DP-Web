import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../actions/notification';

class NotificationContainer extends Component {

  componentWillReceiveProps(newProps) {
    const { message, level, position } = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level,
      position
    });
  }

  render() {
    return (
      <NotificationSystem ref={(c) => { this.notificationSystem = c; }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      addNotification
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
