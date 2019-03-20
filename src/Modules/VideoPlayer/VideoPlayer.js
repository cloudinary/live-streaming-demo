import React from 'react';
import {Page, Loader} from '../../Components';
import Env from '../../Utils/Env';
import queryString from 'query-string';
import {transformationRaw} from '../../Utils/Transformations';

//create Cloudinary object
const cld = window.cloudinary.Cloudinary.new({
  cloud_name: Env.CLOUD_NAME
});

const VideoPlayer = class extends React.Component {
  constructor(props) {
    super(props);
    //this.getSource = this.getSource.bind(this);
    this.transformations = queryString.parse(this.props.location.search);
    this.publicId = this.props.match.params.publicId;
    this.state = {};
    this.player = null;
  }

  componentDidMount() {
    const {publicId, transformations} = this;
    //when player is ready
    const addSource = () => {
      player
        .source(publicId, {
          sourceTypes: ['hls'],
          format: 'm3u8',
          type: Env.UPLOAD_TYPE,
          raw_transformation: transformationRaw(transformations)
        }).play();
    };

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
        addSource(player, publicId, transformations);
      }
    );

    player.on('error', () => console.log('video player error'));

    player.on('loadedmetadata', () => {
      this.setState({playerReady: true});
    });

    const intervalId = setInterval(() => {
      if (!this.state.playerReady) {
        addSource(player, publicId, transformations);
      } else {
        clearInterval(this.state.intervalId);
        player.mute();
      }
    }, 1000);
    this.setState({intervalId: intervalId});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {player} = this;
    if (player) {
      player.mute();
      player.play();
    }
  }

  render() {
    const playerReady = this.state.playerReady;
    const className =
      'cld-video-player vjs-16-9 ' + playerReady ? 'visible' : 'hidden';
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
