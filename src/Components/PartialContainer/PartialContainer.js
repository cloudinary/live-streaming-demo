import React from 'react';
import './PartialContainer.css';

const classes = (props) => {
    const {border, color} = props;
    let result = "";

    if (border){
        result += "border-bottom ";
    }
    if (borderColor){
        result += `border-${color}`;
    }

    return result;
}

export default (props) => {
    return (
    <div className={classes(props)}>
        {props.children}
    </div>);
}