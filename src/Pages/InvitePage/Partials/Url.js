import React from 'react';
import { Col, Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'reactstrap';

const Url = ({ url }) => {
  return (
    <Row>
      <Col xs={12}>
        <p>URL</p>
        <div className="border-bottom-orange">
          <p className="text-orange push-down">{url}</p>
        </div>
      </Col>
      <Col xs={12} className="center">
        <CopyToClipboard text={url}>
          <Button>Copy link to clipboard</Button>
        </CopyToClipboard>
      </Col>
    </Row>
  );
};

export default Url;
