import React from 'react';
import { Row, Col } from 'reactstrap';
import { Page, NavButton, LiveIndicator } from '../../Components';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-spinner';

//import '../../../node_modules/cloudinary-video-player/dist/cld-video-player.min.css';

const CLOUD_NAME = 'demo-live';
const UPLOAD_TYPE = 'upload';

const transformationRaw = (transformations = []) => {
  let trans = ['x_0'];

  /*
  transformations.forEach(t => {) {
      if(TRANSFORMATIONS[name]) { 
          trans.push(TRANSFORMATIONS[name](value));
      }
  }) 
      
  return trans.join("/");
  */
};

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

    /*
    this.cld = null;
    this.player = null;
    let player = this.player;
    let cld = this.cld

    cld = window.cloudinary.Cloudinary.new({
      cloud_name: CLOUD_NAME
    });

    player = cld.videoPlayer(
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
        posterOptions: {
          publicId: 'live-video-streaming'
        }
      }
    );
    player
    .source(this.publicId, {
      sourceTypes: ['hls'],
      format: 'm3u8',
      type: UPLOAD_TYPE
      //,raw_transformation: transformationRaw(qs)
    })
    //.play();
    */
  }

  setPlayer() {
    let firstLoad = true;
    let muteBtnRender = false;
    //const muteBtn = $(`<i class="mute-btn-additional position-absolute material-icons md-24">volume_off</i>`);

    const addSourceAndPlay = () => {
      //const qs = createObjFromURI();

      player
        .source(this.publicId, {
          sourceTypes: ['hls'],
          format: 'm3u8',
          type: UPLOAD_TYPE
          //,raw_transformation: transformationRaw(qs)
        })
        .play();
    };

    /*
    const addMuteButton = () => {
      muteBtn.appendTo(player.el());

      muteBtnRender = true;
      muteBtn.click(() => {
        if (player.isMuted()) {
          player.unmute();
          muteBtn.text('volume_up');
        } else {
          player.mute();
          muteBtn.text('volume_off');
        }
      });
    };
    */

    const cld = window.cloudinary.Cloudinary.new({
      cloud_name: CLOUD_NAME,
      secure: true
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

    /*
          player.on("volumechange", () => {
              if(!player.isMuted()) {
                  muteBtn.text("volume_up");
              } else {
                  muteBtn.text("volume_off");
              }
          })
  
        
          player.on("loadedmetadata", () => {
              console.log("loadedmetadata");
              playerReady = true;
              $router.show(VIEW_VIEWER);
              player.play();
  
              if(!muteBtnRender) {
                  addMuteButton();
              }
          })
          */

    // player.on("play", () => console.log("play") );
    // player.on("abort", () => console.log("abort") );
    // player.on("canplay", () => console.log("canplay") );
    // player.on("canplaythrough", () => console.log("canplaythrough") );
    // player.on("ended", () => console.log("ended") );
    // player.on("loadeddata", () => console.log("loadeddata") );
    // player.on("loadstart", () => console.log("loadstart") );
    // player.on("progress", () => console.log("progress") );
    // player.on("stalled", () => console.log("stalled") );
    // player.on("suspend", () => console.log("suspend") );
    // player.on("waiting", () => console.log("waiting") );
    // player.on("volumechange", () => console.log("volumechange") );
    // player.on("stop",  () => console.log("stop") );
    // player.on("pause", () => console.log("pause") );
    player.on('error', () => console.log('error'));

    /*
          this.show = () => {
              super.show();
              if(firstLoad) {
                  $router.show(VIEW_PROGRESS).text("Hang on a second. We’re loading the video stream you requested.");
                  firstLoad = false;
              }
              
          }
          */

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
