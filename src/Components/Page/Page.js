import React from 'react';

import { Col } from 'reactstrap';

import './Page.css';

export default React.forwardRef(({ className='', children, absolute }, ref) => {
  if (absolute) {
    return (
      <div
        ref={ref}
        className="row no-gutters h-100 w-100"
        style={{
          position: 'absolute',
          boxSizing: 'content-box'
        }}
      >
        <Col xs={12} className="w-100 h-100" style={{ padding: 0, margin: 0 }}>
          <div className="bg-blur" />
          <div className="bg-opacity">{children}</div>
        </Col>
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={'row no-gutters height-full ' + className}
    >
      <Col
        md={10}
        lg={8}
        xl={6}
        className="offset-md-1 offset-lg-2 offset-xl-3 no-gutters"
      >
        <div className="bg-blur" />
        <div className="bg-opacity">{children}</div>
      </Col>
    </div>
  );
});
