import React from 'react';
import {Button} from 'reactstrap';
import {Col, Row} from 'reactstrap';

/**
 * Navigation Button
 * @param {string} color - text color
 * @param {string} bgColor - background color
 * @param {string} cls - class name to pass down to internal <button>
 * @param {object} history - browser history to update on click
 * @param {string} to - navigate to, for example: '/done'
 * @param {string} type - element type, can be 'button' (default) or 'a'
 * @param children - rendered inside the internal button
 * @param {function} doBefore - function to run before navigating
 * @return {*}
 */
export default (
  {
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
            if (to) {
              history.push(to);
            }
          }}
        >
          {children}
        </Button>
      </Row>
    </Col>
  );
};
