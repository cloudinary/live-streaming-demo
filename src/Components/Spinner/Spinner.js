import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Loader from 'react-loader-spinner';

const Spinner = ({text, absolute}) => {
  return (
      <Container className="h-100 text-white" style={absolute ? {position:"absolute"}: {}}>
        <Row style={{ height: '100px  ' }} />
        <Row className="justify-content-center align-items-center">
          <Col mx={12} className="text-center">
            <Loader type="TailSpin" color="white" />
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col mx={12} className="text-center">
            <h6>{text}</h6>
          </Col>
        </Row>
      </Container>
  );
};

export default Spinner;
