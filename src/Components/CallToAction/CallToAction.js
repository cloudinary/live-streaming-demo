import React from 'react';
import { Icon } from '../Components';
import { Col, Row } from 'reactstrap';

//const CallToAction = class extends React.Component{
const CallToAction = props => {
  const { icon, text, topAction, onClick } = props;
  const className = 'call-to-action ' + (topAction ? 'call-to-action-top' : '');
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

export default CallToAction;
