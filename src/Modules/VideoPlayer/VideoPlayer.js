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
    this.waiting = false;
    this.ended = false;
    this.videoRef = React.createRef();
    this.addSource = this.addSource.bind(this);
    this.reloadIfStalled = this.reloadIfStalled.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.end = this.end.bind(this);
    this.wait = this.wait.bind(this);
    this.loadedData = this.loadedData.bind(this);
  }

  pause() {
    this.paused = true;
    this.waiting = false;
  }

  play() {
    this.paused = false;
    this.waiting = false;
  }

  end() {
    this.ended = true;
    this.waiting = false;
  }

  wait() {
    this.waiting = true;
  }

  loadedData() {
    this.waiting = false;
  }

  /**
   * Handles a situation where player looks like it's loading
   * but actually not, so we force a reload by adding a new source.
   */
  reloadIfStalled() {
    const {waiting, paused, ended, videoRef} = this;
    const {currentTime, duration} = videoRef.current;
    if (!paused && waiting && !(ended && currentTime === duration)) {
      this.addSource(videoRef.current.currentTime);
    }
  }

  addSource(currentTime) {
    this.waiting = false;
    const {player, publicId, transformations, videoRef} = this;
    this.player = player
      .source(publicId, {
        sourceTypes: ['hls'],
        format: 'm3u8',
        type: Env.UPLOAD_TYPE,
        raw_transformation: transformationRaw(transformations)
      });
    this.player.videojs.load();
    if (currentTime) {
      videoRef.current.currentTime = currentTime;
    }
  };

  componentDidMount() {
    const {addSource, reloadIfStalled, play, pause, wait, loadedData, end} = this;
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

    player.on('waiting', wait);

    player.on('loadeddata', loadedData);


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
