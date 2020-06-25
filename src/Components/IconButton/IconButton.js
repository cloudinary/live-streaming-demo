import React from 'react';
import {Icon} from '../Components';
import {Col, Row} from 'reactstrap';

/**
 *
 * @param {string} icon - name of icon to show
 * @param {string} text - label to show next to icon
 * @param {boolean} topBorder - add top border
 * @param {function} onClick
 * @return {*}
 * @constructor
 */
const IconButton = ({icon, text, topBorder, onClick}) => {
  const className = 'call-to-action ' + (topBorder ? 'call-to-action-border-top' : '');
  return (
    <Col xs={12} className={className} onClick={onClick}>
      <Row className="h-100">
        <span className="align-self-center">
          <Icon name={icon} className="svg-icons-big"/>
          {text}
        </span>
      </Row>
    </Col>
  );
};

export default IconButton;
