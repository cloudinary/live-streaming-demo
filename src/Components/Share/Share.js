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

const Share = ({ url, className = '' }) => {
  return (
    <Col xs={12} className={className}>
      <Row className="justify-content-center align-items-center">
        <EmailShareButton
          url={url}
          subject="Join my live video broadcast: 'My live video' @cloudinary live streaming"
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <TwitterShareButton
          url={url}
          title="Join my live video broadcast: 'My live video' @cloudinary live streaming"
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <FacebookShareButton
          url={url}
          quote="Join my live video broadcast: 'My live video' @cloudinary live streaming"
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          title="Join my live video broadcast: 'My live video' @cloudinary live streaming"
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <WhatsappShareButton
          url={url}
          title="Join my live video broadcast: 'My live video' @cloudinary live streaming"
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </Row>
    </Col>
  );
};

export default Share;
