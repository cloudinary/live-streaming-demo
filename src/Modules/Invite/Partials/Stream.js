import React from 'react';
import { Col } from 'reactstrap';
import { NavButton, Icon } from '../../../Components';
import withSizes from "react-sizes";
import mapSizesToProps from '../../../Utils/mapSizesToProps';

const Stream = ({ history, isMobile }) => {
  return (
    <div className={isMobile ? "col-12 mt-150" : ""}>
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
    </div>
  );
};

//export default Stream;

export default withSizes(mapSizesToProps)(Stream);
