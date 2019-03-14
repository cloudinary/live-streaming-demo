import React from 'react';
import { Row, Col } from 'reactstrap';
import { Page, Loader } from '../../Components';
import { inject, observer } from 'mobx-react';
import Env from '../../Utils/Env';
import queryString from 'query-string';
import { transformationRaw } from '../../Utils/Transformations';

const VideoPlayerPage = class extends React.Component {
  constructor(props) {
    super(props);
    //this.getSource = this.getSource.bind(this);
    this.transformations = queryString.parse(this.props.location.search);
    this.publicId = this.props.match.params.publicId;
    console.log(this.publicId);
    this.videoRef = React.createRef();
    this.state = {};
  }

  /*
  getSource(type) {
    const publicId = 'x_0/' + this.props.match.params.publicId;
    return `https://res.cloudinary.com/${
      Env.CLOUD_NAME
    }/video/upload/${publicId}.${type}`;
  }
  */

  componentDidMount() {
    const video = this.videoRef;
    const {publicId, transformations} = this;
    console.log('publicId:', publicId);

    //when player is ready
    const addSource = () => {
      return player.source(publicId, {
        sourceTypes: ['hls'],
        format: 'm3u8',
        type: Env.UPLOAD_TYPE,
        raw_transformation: transformationRaw(transformations)
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
         * and include the Google Analytics code snippet in your page
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
      player.mute();
      player.play();
      this.setState({ playerReady: true });
    });

    const intervalId = setInterval(() => {
      if (!this.state.playerReady) {
        addSource();
      } else {
        clearInterval(this.state.intervalId);
        player.mute();
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  render() {
    const video = this.videoRef;
    const playerReady = this.state.playerReady;

    return (
      <Page>
        <div className="video-container-outer">
        <div xs={12} className="center relative">
        {!playerReady && (
            <Page absolute>
              <Loader text="Hang on a second. We’re loading the video stream you requested." />
            </Page>
          )}
            <video
              ref={video}
              className="cld-video-player"
              controls
              autoPlay
              playsInline
              muted
            />
          </div>
          </div>
      </Page>
    );
  }
};

export default inject('store')(observer(VideoPlayerPage));

/*


      <Page>
        <Row className="justify-content-center align-items-center mg-0">
        {!playerReady && (
            <Page absolute>
              <Loader text="Hang on a second. We’re loading the video stream you requested." />
            </Page>
          )}
          <Col xs={12} className="mt-20 center video-container">
            <video
              ref={video}
              className="cld-video-player"
              controls
              autoPlay
              playsInline
              muted
            />
          </Col>
        </Row>
      </Page>


*/
