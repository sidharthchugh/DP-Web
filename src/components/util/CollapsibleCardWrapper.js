/*
 * @author Ben
 *
 * This component wraps its children with a collapsible `div` to abstract away
 * the show/hide logic for a collapsible card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import TooltipWrapper from './TooltipWrapper';
import {Grid} from 'semantic-ui-react';

export default class CollapsibleCardWrapper extends React.Component {
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
    const {secondLevel} = this.props;
    return (
      <Grid className="collapsible-card no-vertical-margin no-vertical-padding">
        <Grid.Row className="no-vertical-padding">
          <Grid>
            <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter">
              <TooltipWrapper name={this.props.title} tooltipOff={this.props.tooltipOff} tooltip={this.props.tooltip ? this.props.tooltip : ''}>
                <h3 className={secondLevel ? 'collapsible-card--title heading2 collapse-heading' : 'collapsible-card--title heading1'} onClick={this.toggleCollapsed}>
                  {this.props.title}
                  <span>
                    <FontAwesome
                      name={collapsed ? 'chevron-right' : 'chevron-down'}
                      className="section-chevron"
                    />
                  </span>
                </h3>
              </TooltipWrapper>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row style={collapsed ? {display: 'none'} : {display: 'block'}}>
          {this.props.children}
        </Grid.Row>
      </Grid>
    );
  }
}

CollapsibleCardWrapper.propTypes = {
  title: PropTypes.string.isRequired
};
