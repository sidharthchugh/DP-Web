/*
 * @author Ben
 *
 * This component wraps its children with a collapsible `div` to abstract away
 * the show/hide logic for a collapsible card.
 */

import React, {PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import TooltipWrapper from './TooltipWrapper';
import {Grid} from 'semantic-ui-react';

export default class CollapsibleCardWrapperExpanded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState((prevState) => {
      return {collapsed: !prevState.collapsed};
    });
  }

  componentWillMount() {
    if (this.props.defaultCollapsed) {
      this.setState((prevState) => {
        return {collapsed: true};
      });
    }
  }

  render() {
    const {collapsed} = this.state;
    return (
      <Grid>
        <Grid.Row onClick={this.toggleCollapsed}>
          {this.props.collapsedContent}
        </Grid.Row>
        <Grid.Row style={collapsed ? {display: 'none'} : {display: 'block'}}>
          {this.props.collapsedContent}
        </Grid.Row>
      </Grid>
    );
  }
}

CollapsibleCardWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};
