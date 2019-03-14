import React from 'react';
import './LiveIndicator.css';

export default ({circleColor="rgb(250,138,33)", textColor="white"}) => {
    return (
        <div className="center" style={{color:textColor}}>
        <span className="live-indicator">
        <span className="flashit" style={{color:circleColor}}>
        &#9679;
        </span>
        Live</span>
        </div>
    );
}
