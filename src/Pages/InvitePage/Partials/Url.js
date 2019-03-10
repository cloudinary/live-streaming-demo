import React from 'react';
import { Col, Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'reactstrap';

const Url = ({ url }) => {
  return (
    <React.Fragment>
      <Col xs={12}>
      <div className="mt-40">
        <p>URL</p>
        <div className="border-bottom-orange">
          <p className="text-orange push-down">{url}</p>
        </div>
        </div>
      </Col>
      <Col xs={12} className="center">
        <CopyToClipboard text={url} className="mt-20 mb-20">
          <Button>Copy link to clipboard</Button>
        </CopyToClipboard>
      </Col>
      </React.Fragment>
  );
};

export default Url;
