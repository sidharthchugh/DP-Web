import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip, Origin as TooltipOrigin} from 'redux-tooltip';
import { Grid } from 'semantic-ui-react';


const TooltipWrapper = (props) => {
  // If the tooltip is empty string (default),
  // we simply return the wrapped element(s)
  if (props.tooltip === '') {
    return props.children;
  }

  let hide_tooltip = false;
  if (typeof (window) !== 'undefined') {
    if (window.innerWidth < 995) {
        hide_tooltip = true;
    }
  }

  return (

    <div key={props.name}>

      <TooltipOrigin name={props.name}>
        {props.children}
      </TooltipOrigin>
      {
        !props.tooltipOff && <Tooltip auto={false} className={hide_tooltip ? 'hidden' : 'redux-tooltip--customised'} place="right" name={props.name}>
          <span style={{textDecoration: 'underline'}}>Tooltip:</span>
          <br />
          {props.tooltip}
        </Tooltip>}
    </div>

  );
};


export default TooltipWrapper;
