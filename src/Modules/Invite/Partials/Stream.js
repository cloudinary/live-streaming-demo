import React from 'react';
import { Col, Row } from 'reactstrap';
import { NavButton, Icon } from '../../../Components';

const Stream = ({ history }) => {
  return (
    <React.Fragment>
        <Col xs={12} className="text-bottom center">
          <hr />
          <p className="text-small text-center">
            Clicking the button below will start your streaming session. Are you
            ready to go live?
          </p>
        </Col>
      <NavButton to="/videorecorder" history={history}>
        <Icon name={'Videocam'} />
        Start Streaming
      </NavButton>
    </React.Fragment>
  );
};

export default Stream;
