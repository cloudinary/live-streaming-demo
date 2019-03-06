import React from 'react';
import { Row, Col } from 'reactstrap';
import { Page, NavButton, LiveIndicator } from '../Components';
import { inject, observer } from 'mobx-react';

//import '../../../node_modules/cloudinary-video-player/dist/cld-video-player.min.css';

const CLOUD_NAME = 'demo-live';
const UPLOAD_TYPE = "upload";

const transformationRaw = (transformations = []) => {
  let trans = ["x_0"];
  
  /*
  transformations.forEach(t => {) {
      if(TRANSFORMATIONS[name]) { 
          trans.push(TRANSFORMATIONS[name](value));
      }
  }) 
      
  return trans.join("/");
  */
}

const VideoPlayerPage = class extends React.Component {
  constructor(props) {
    super(props);
    this.publicId = null;
    try {
      this.publicId = props.match.params.publicId;
    } catch (err) {
      props.history.push('/');      
    }

    this.videoRef = React.createRef();
  }

  start() {
    //this.props.store.startLiveStream(this.videoRef.current);
  }

  stop() {
    //this.props.store.stopLiveStream();
  }

  componentDidMount() {
    //this.startLiveStream();
    this.cld = window.cloudinary.Cloudinary.new({
      cloud_name: CLOUD_NAME,
      secure: true
    });
    this.player = this.cld.videoPlayer('video');
    this.player.source(this.publicId, { 
      sourceTypes: ['hls'], 
      format: "m3u8",
      type: UPLOAD_TYPE
      //,raw_transformation: transformationRaw(qs)
  })
  }

  render() {
    const stop = this.stop;
    const { history, values } = this.props;
    const { store } = this.props;
    const publicId = this.publicId;
    const video = this.videoRef;
    return (
      <Page>
        <Row>
          <Col xs="12">
            <LiveIndicator />
            <video
              ref={video}
              id="video"
              controls
              muted
              className="cld-video-player cld-video-player-skin-dark"
              data-cld-public-id="myvideo"
              autoPlay
              playsInline
            />
          </Col>
          <Col xs="12" />
        </Row>
      </Page>
    );
  }
};

/*
          <CloudinaryContext cloudName={CLOUD_NAME}>
          <Video publicId={publicId} fallbackContent="Your browser does not support HTML5 video tags.">
  <Transformation controls="true"/>
</Video>
            </CloudinaryContext>

*/

export default inject('store')(observer(VideoPlayerPage));
