import React from 'react';
import {Page, Loader} from '../../Components';
import Env from '../../Utils/Env';
import queryString from 'query-string';
import {transformationRaw} from '../../Utils/Transformations';
window.ga('send', 'pageview');

//create Cloudinary object
const cld = window.cloudinary.Cloudinary.new({
  cloud_name: Env.CLOUD_NAME
});

const VideoPlayer = class extends React.Component {
  constructor(props) {
    super(props);
    this.transformations = queryString.parse(this.props.location.search);
    this.publicId = this.props.match.params.publicId;
    this.state = {};
    this.player = null;
    this.handlingError = false;
    this.handleError = this.handleError.bind(this);
    this.addSource = this.addSource.bind(this);
    this.reloadIfStalled = this.reloadIfStalled.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.end = this.end.bind(this);
    this.ended = false;
    this.videoRef = React.createRef();
  }

  handleError() {
    if (!this.ended) {
      this.addSource();
      this.handlingError = false;
    }
  }

  pause(){
    this.paused = true;
  }

  play(){
    this.paused = false;
  }

  end(){
    this.ended = true;
  }

  /**
   * Handles a situation where player looks like it's loading
   * but actually not, so we force a reload by adding a new source.
   */
  reloadIfStalled(){
    const {paused, ended} = this;
    if (!ended) {
      const videoData = this.player.videojs.cache_;
      const {currentTime, duration} = videoData;
      const videoState = `${currentTime}/${duration}`;
      const isStalled = (!paused && this.prevVideoState && this.prevVideoState === videoState);
      if  (isStalled){
        this.addSource(true, currentTime);
      }
      this.prevVideoState = videoState;
    }
  }

  //when player is ready
  addSource(play = true, currentTime) {
    const {player, publicId, transformations, videoRef} = this;
    this.player = player
      .source(publicId, {
        sourceTypes: ['hls'],
        format: 'm3u8',
        type: Env.UPLOAD_TYPE,
        raw_transformation: transformationRaw(transformations)
      });
    if (play) {
      player.videojs.load();
      //player.play();
    }
    if (currentTime) {
      videoRef.current.currentTime = currentTime;
    }
  };

  componentDidMount() {
    const {addSource, reloadIfStalled, play, pause,end, handlingError, handleError} = this;
    //create player
    const player = this.player = cld.videoPlayer(
      'video-player', //video.current,
      {
        fluid: true,
        videojs: {
          html5: {
            hls: {overrideNative: true},
            nativeAudioTracks: false,
            nativeVideoTracks: false
          },
          loadingSpinner: false
        },
        /**
         * To enable Google Analytics uncomment this code
         * and include the Google Analytics code snippet in your page
         */
        analytics: {
          events: ['play', 'pause', 'ended', {type: 'percentsplayed', percents: [10, 40, 70, 90]}, 'error']
        },
        posterOptions: {
          publicId: 'live-video-streaming'
        }
      },
      () => {
        const intervalId = setInterval(() => {
          if (!this.state.playerReady) {
            addSource();
          } else {
            reloadIfStalled();
          }
        }, 1000);
        this.setState({intervalId: intervalId});
      }
    );

    player.on('pause', pause);

    player.on('play', play);

    player.on('ended', end);

    player.on('error', () => {
      if (!handlingError) {
        this.timeoutId = setTimeout(handleError, 2000);
      }
    });

    player.on('loadedmetadata', () => {
      this.setState({playerReady: true});
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    clearInterval(this.state.intervalId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {ended, player} = this;

    if (!ended && player) {
      player.mute();
      player.play();
    }
  }


  render() {
    const video = this.videoRef;
    const playerReady = this.state.playerReady;
    const className =
      'cld-video-player vjs-16-9 ' + playerReady ? '' : 'hidden';
    return (
      <Page>
        {!playerReady && (
          <Page absolute>
            <Loader text="Hang on a second. We’re loading the video stream you requested."/>
          </Page>
        )}
        <div className="video-container-outer">
          <div className="center relative">
            <video
              ref={video}
              id="video-player"
              className={className}
              controls={playerReady}
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

export default VideoPlayer;
