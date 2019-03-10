import React from 'react';
import { Col } from 'reactstrap';
import { NavButton, Icon } from '../../../Components';

const Stream = ({ history }) => {
  return (
    <Col xs={12} className="center">
      <div className="space-above">
        <hr />
        <p className="text-small">
          Clicking the button below will start your streaming session. Are you
          ready to go live?
        </p>
      </div>
      <NavButton to="/videorecorder" history={history}>
        <Icon name={'Videocam'} />
        Start Streaming
      </NavButton>
    </Col>
  );
};

export default Stream;

/*

        <NavButton to="/videorecorder" history={history}>
          Start Streaming
        </NavButton>


*/
