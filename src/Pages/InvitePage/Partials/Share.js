import React from 'react';
import { Row, Col } from 'reactstrap';
import {
  EmailShareButton,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon
} from 'react-share';

const Share = ({ url }) => {
  return (
    <Col xs={12} className="mt-20">
    <Row className="justify-content-center align-items-center">
      <EmailShareButton url={url} >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <TwitterShareButton url={url} >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <FacebookShareButton url={url} >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton url={url} >
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      </Row>
    </Col>
  );
};

export default Share;
