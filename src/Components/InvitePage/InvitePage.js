import React from 'react';
import { Page } from '../Components';
import { Link } from 'react-router-dom';
import initLS from 'cloudinary-live-stream';

import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import './InvitePage.css';

const CLD_API_HOST = 'api.cloudinary.com';
const CLD_RES_HOST = 'res.cloudinary.com';
const CLD_WEB_RTC_HOST = 'webrtc-api.cloudinary.com';
const CLOUD_NAME = 'demo-live';
const UPLOAD_PRESET = 'live-stream';
const UPLOAD_PRESET_OPENER = 'live-opener';
const CLOUD_NAME_IMAGES = CLOUD_NAME;
const UPLOAD_PRESET_IMAGES = 'images';
const UPLOAD_WIDGET_PREFIX = 'https://widget.cloudinary.com';
const UPLOAD_TYPE = 'upload';

export default class InvitePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET
    };
    this.liveStream = {};
    this.videoRef = React.createRef();
    this.updateLiveStream = this.updateLiveStream.bind(this);
  }

  componentWillUnmount() {
    //destroy livestream
  }

  componentDidMount() {
    this.initLiveStream({ ...this.state });
  }

  updateLiveStream(liveStream, publicId, url) {
    this.props.updateLiveStream({liveStream, publicId, url});
  }

  // call initLiveStream with the configuration parameters:
  initLiveStream({ cloudName, uploadPreset }) {
    let updateLiveStream = this.updateLiveStream;
    let liveStream;
    let video = this.videoRef.current;
    console.log('initlivestream, video ref:', video);
    initLS({
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      debug: 'all',
      hlsTarget: true,
      fileTarget: true,
      events: {
        start: function(args) {
          // user code
          console.log('JANUS START !!! args:', args);
        },
        stop: function(args) {
          // user code
          console.log('JANUS STOP !!!');
        },
        error: function(error) {
          // user code
          console.log('JANUS ERROR !!!:', error);
        },
        local_stream: function(stream) {
          // user code, typically attaching the stream to a video view:
          console.log('JASNUS LOCAL_STREAM !!!, stream:', stream);
          liveStream.attach(video, stream);
        }
      }
    }).then(result => {
      // keep handle to instance to start/stop streaming
      liveStream = result;

      // Extract public id and url from result (publish the url for people to watch the stream):
      let publicId = result.response.public_id;
      let url = result.response.secure_url;

      // start the streaming:
      this.updateLiveStream(liveStream, publicId, url);
    });
  }

  render() {
    const video = this.videoRef;
    console.log('video ref:', video);
    return (
      <Page>
        <h1 className="whitecolor">Invite Page</h1>
        <Link to="/">Home</Link>
        <div className="video-wrapper">
          <video
            ref={video}
            className="video"
            id="video"
            autoPlay
            muted="muted"
            playsInline
          />
        </div>
        <button onClick={() => this.stop()}>stop</button>
      </Page>
    );
  }
}
