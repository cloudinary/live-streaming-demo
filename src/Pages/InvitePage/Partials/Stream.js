import React from 'react';
import { Col, Row } from 'reactstrap';
import { NavButton, Icon } from '../../../Components';

const Stream = ({ history }) => {
  return (
    <Col xs="12" className="button-bottom">
      <Row className="justify-content-center align-items-center bottom-text center">
        <hr />
        <div className="w-100">
          <p className="text-small">
            Clicking the button below will start your streaming session. Are you
            ready to go live?
          </p>
        </div>
        <NavButton to="/videorecorder" history={history}>
          <Icon name={'Videocam'} />
          Start Streaming
        </NavButton>
      </Row>
    </Col>
  );
};

export default Stream;

/*
<Col xs={12} className="center bottom-div">
      <Col xs={12} className="button-bottom">
      <hr />
        <p className="text-small">
          Clicking the button below will start your streaming session. Are you
          ready to go live?
        </p>
      <NavButton to="/videorecorder" history={history}>
        <Icon name={'Videocam'} />
        Start Streaming
      </NavButton>
      </Col>
    </Col>



    
*/
