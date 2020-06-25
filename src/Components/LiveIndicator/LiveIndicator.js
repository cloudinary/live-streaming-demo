import React from 'react';
import './LiveIndicator.css';

/**
 * Flashes a "(*) Live" indicator
 * @param circleColor
 * @param textColor
 * @return {*}
 */
export default ({circleColor = "rgb(250,138,33)", textColor = "white"}) => {
  return (
    <div className="center" style={{color: textColor}}>
        <span className="live-indicator">
          <span className="flash-it" style={{color: circleColor}}>
            &#9679;
          </span>
          Live
        </span>
    </div>
  );
}
