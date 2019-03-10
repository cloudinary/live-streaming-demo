import React from 'react';
import { Row, Col } from 'reactstrap';
import { Page, NavButton, LiveIndicator } from '../../Components';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-spinner';
import Env from '../../Utils/Env';

//import '../../../node_modules/cloudinary-video-player/dist/cld-video-player.min.css';

const VideoPlayerPage = class extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      playerReady: false
    };
  }

  start() {
    //this.props.store.startLiveStream(this.videoRef.current);
  }

  stop() {
    //this.props.store.stopLiveStream();
  }

  componentDidMount() {
    this.setPlayer();
  }

  setPlayer() {
    const addSourceAndPlay = () => {
      //const qs = createObjFromURI();

      player
        .source(this.publicId, {
          sourceTypes: ['hls'],
          format: 'm3u8',
          type: Env.UPLOAD_TYPE
          //,raw_transformation: transformationRaw(qs)
        })
        .play();
    };

    const cld = window.cloudinary.Cloudinary.new({
      cloud_name: Env.CLOUD_NAME
      //secure: true
    });

    const player = cld.videoPlayer(
      'video',
      {
        fluid: true,
        videojs: {
          html5: {
            hls: { overrideNative: true },
            nativeAudioTracks: false,
            nativeVideoTracks: false
          }
        },
        /*
        analytics: {
          events: ['play', 'pause', 'playerload', 'fullscreenchange']
        },
        */
        posterOptions: {
          publicId: 'live-video-streaming'
        }
      },
      () => {
        addSourceAndPlay();
      }
    );

    player.on('loadedmetadata', () => {
      console.log('loadedmetadata');
      player.play();
      this.setState({ playerReady: true });
    });

    player.on('error', () => console.log('error'));

    // store intervalId in the state so it can be accessed later:
    const intervalId = setInterval(() => {
      if (!this.state.playerReady) {
        addSourceAndPlay();
      } else {
        clearInterval(this.state.intervalId);
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  render() {
    if (!this.state.playerReady) {
      return (
        <Page>
          <Row>
            <Col mx={12} className="text-center">
              <Loader type="TailSpin" color="white" />
            </Col>
          </Row>
        </Page>
      );
    }

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
            <video ref={video} id="video" controls autoplay playsinline muted className="cld-video-player"/>
          </Col>
          <Col xs="12" />
        </Row>
      </Page>
    );
  }
};

/*
             <video
              ref={video}
              id="video"
              controls
              muted
              className="cld-video-player cld-video-player-skin-dark"
              data-cld-public-id={this.publicId}
              autoPlay
              playsInline
            />

 */


/*
          <CloudinaryContext cloudName={CLOUD_NAME}>
          <Video publicId={publicId} fallbackContent="Your browser does not support HTML5 video tags.">
  <Transformation controls="true"/>
</Video>
            </CloudinaryContext>

*/

export default inject('store')(observer(VideoPlayerPage));
