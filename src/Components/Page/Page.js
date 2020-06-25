import React from 'react';
import {Col} from 'reactstrap';
import './Page.css';

/**
 * Wrapper for each page of this app, renders
 * @param {boolean} absolute - should position of wrapper div be absolute
 * @param {string} className - will be passed to underlying div element
 * @param {*} children - will be passed as content of underlying div element
 * @param {*} ref - will be forwarded to underlying div element
 */
export default React.forwardRef(({absolute, children, className = ''}, ref) => {
  const divProps = {
    ref,
    className: `row no-gutters ${absolute ? 'h-100 w-100 absolute context-box' : 'height-full'} ${className}`
  };

  const colProps = absolute ? {
    xs: 12,
    className: "w-100 h-100 no-padding no-margin"
  } : {
    md: 10,
    lg: 8,
    xl: 6,
    className: "offset-md-1 offset-lg-2 offset-xl-3 no-gutters"
  };

  return (
    <div {...divProps}>
      <Col {...colProps}>
        <div className="bg-blur"/>
        <div className="bg-opacity">{children}</div>
      </Col>
    </div>
  );
});

