import React from 'react';
import { Spinner, Container, Row, Col } from 'reactstrap';


const Loader = ({text, absolute}) => {
  return (
      <Container className={"h-100 text-white"} style={absolute ? {position:"absolute"}: {}}>
        <Row className="loader-container justify-content-center align-items-center text-center" />
        <Row className="justify-content-center align-items-center">
          <Col mx={12} className="text-center">
          <Spinner className="spinner-size" color="light"/>
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

export default Loader;
