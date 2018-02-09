import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { dismissMessage } from '../actions/messages';
import '../styles/components/message';

const Message = ({style, text}) => (
  <div
    className={('message', [style, {show: text && text.length > 0}])}
      onClick={dismissMessage}
    >{text}</div>
);

Message.propTypes = {
  style: PropTypes.string,
  text: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps, { dismissMessage })(Message);
