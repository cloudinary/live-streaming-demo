import React from 'react';
import './LiveIndicator.css';

export default ({circleColor="rgb(250,138,33)", textColor="white"}) => {
    return (
        <div style={{color:textColor}}><span className="flashit" style={{color:circleColor}}>&#9679;</span>Live</div>
    );
}
