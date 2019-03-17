import React from 'react';
import { Col, Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'reactstrap';
import {TextInput} from '../../../Components';
const Url = ({ url }) => {
  return (
    <React.Fragment>
      <Col xs={12}>
      <div className="mt-40">
        <p>URL</p>
        <div className="border-bottom-orange">
        <TextInput className="input-orange" defaultValue={url} type="text"/>
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
