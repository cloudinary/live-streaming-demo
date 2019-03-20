import React from 'react';

import { Col, Row } from 'reactstrap';

import './Page.css';

export default ({ className = '', children, absolute }) => {
  if (absolute) {
    return (
      <Row
        noGutters
        className="h-100 w-100"
        style={{
          position: 'absolute',
          boxSizing: 'content-box'
        }}
      >
        <Col xs={12} className="w-100 h-100" style={{ padding: 0, margin: 0 }}>
          <div className="bg-blur" />
          <div className="bg-opacity">{children}</div>
        </Col>
      </Row>
    );
  }
  return (
    <Row
      noGutters
      className={'height-full ' + className}
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
    </Row>
  );
};
