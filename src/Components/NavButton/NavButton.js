import React from 'react';
import { Button } from 'reactstrap';
import { Col, Row } from 'reactstrap';

export default ({
  color,
  bgColor,
  cls,
  history,
  to,
  type = 'button',
  children,
  doBefore
}) => {
  const style = {};
  if (color) {
    style.color = color;
  }

  if (bgColor) {
    style.backgroundColor = bgColor;
  }
  return (
<Col xs="12" className="button-bottom">
      <Row className="justify-content-center align-items-center">
      <Button
      style={style}
      color={color || 'primary'}
      className={'navbutton ' + cls}
      type={type}
      onClick={() => {
        if (doBefore) {
          doBefore();
        }
        history.push(to);
      }}
    >
      {children}
    </Button>
      </Row>
    </Col>
  );
};
