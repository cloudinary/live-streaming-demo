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

const MESSAGE = "Join my live video broadcast: 'My live video' @cloudinary live streaming";

/**
 * Displays a list of share buttons
 * @param url - link to share
 * @param className - class of underlying div element
 * @return {*}
 * @constructor
 */
const Share = ({ url, className = '' }) => {
  return (
    <Col xs={12} className={className}>
      <Row className="justify-content-center align-items-center">
        <EmailShareButton
          url={url}
          subject={MESSAGE}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <TwitterShareButton
          url={url}
          title={MESSAGE}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <FacebookShareButton
          url={url}
          quote={MESSAGE}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          title={MESSAGE}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <WhatsappShareButton
          url={url}
          title={MESSAGE}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </Row>
    </Col>
  );
};

export default Share;
