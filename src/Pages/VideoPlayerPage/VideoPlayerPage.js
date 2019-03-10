import React from 'react';
import { Row, Col } from 'reactstrap';
import { Page, NavButton, LiveIndicator, Spinner } from '../../Components';
import { inject, observer } from 'mobx-react';
import Env from '../../Utils/Env';

const VideoPlayerPage = class extends React.Component {
  constructor(props) {
    super(props);
    this.getSource = this.getSource.bind(this);
    this.publicId = this.props.match.params.publicId;
    this.videoRef = React.createRef();
    this.state = {};
  }

  getSource(type) {
    const publicId = 'x_0/' + this.props.match.params.publicId;
    return `https://res.cloudinary.com/${
      Env.CLOUD_NAME
    }/video/upload/${publicId}.${type}`;
  }

  componentDidMount() {
    const video = this.videoRef;

    //when player is ready
    const addSource = () => {
      return player.source(this.publicId, {
        sourceTypes: ['hls'],
        format: 'm3u8',
        type: Env.UPLOAD_TYPE
        //,raw_transformation: transformationRaw(qs)
      });
    };

    //create Cloudinary object
    const cld = window.cloudinary.Cloudinary.new({
      cloud_name: Env.CLOUD_NAME
    });

    //create player
    const player = cld.videoPlayer(
      video.current,
      {
        fluid: true,
        videojs: {
          html5: {
            hls: { overrideNative: true },
            nativeAudioTracks: false,
            nativeVideoTracks: false
          }
        },
        /**
         * To enable Google Analytics uncomment this code
         * and include the Include the Google Analytics code snippet in your page code snippet in your page
         * 
         * analytics: {
         *  events: ['play', 'pause', 'ended', { type: 'percentsplayed', percents: [10, 40, 70, 90] }, 'error']
         * },
         */

        posterOptions: {
          publicId: 'live-video-streaming'
        }
      },
      () => {
        addSource();
      }
    );

    player.on('error', () => console.log('error'));

    player.on('loadedmetadata', () => {
      console.log('loadedmetadata');
      player.play();
      this.setState({ playerReady: true });
    });

    const intervalId = setInterval(() => {
      if (!this.state.playerReady) {
        addSource();
      } else {
        clearInterval(this.state.intervalId);
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  render() {
    const video = this.videoRef;
    const playerReady = this.state.playerReady;

    return (
      <Page>
        <Row>
          <Col xs="12" className="mt-20 center">
            <video
              ref={video}
              className="cld-video-player"
              controls
              autoPlay
              playsInline
              muted
            />
          </Col>
          {!playerReady && (
            <Page absolute>
              <Spinner text="Hang on a second. We’re loading the video stream you requested." />
            </Page>
          )}
        </Row>
      </Page>
    );
  }
};

export default inject('store')(observer(VideoPlayerPage));
