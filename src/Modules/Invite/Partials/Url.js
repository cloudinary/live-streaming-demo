import React from 'react';
import { Col } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'reactstrap';
import {TextInput} from '../../../Components';
const Url = ({ url }) => {
  const isMobile = window.innerWidth < 400;
  return (
    <React.Fragment>
      <Col xs={12}>
      <div className={isMobile ? "mt-20" :"mt-40"}>
        <p>URL</p>
        <div className={"border-bottom-orange " + isMobile ? "mb-10" : " mb-20"}>
        <TextInput className="input-orange" defaultValue={url} type="text"/>
        </div>
        </div>
      </Col>
      <Col xs={12} className="text-center">
        <CopyToClipboard text={url} className={isMobile ? "mt-10 mb-10" : "mt-20 mb-20"}>
          <Button>Copy link to clipboard</Button>
        </CopyToClipboard>
      </Col>
      </React.Fragment>
  );
};

export default Url;
