import React, {Component, Fragment} from 'react';
import cloudinary from 'cloudinary-core';
import cloudinaryVideoPlayer from 'cloudinary-video-player'; // eslint-disable-line
import {Loader} from '../Components';
import "cloudinary-video-player/dist/cld-video-player.css";

const LOADING_MESSAGE = "Hang on a second. We’re loading the video stream you requested.";

/**
 * Wraps Cloudinary Video Player
 * Shows a loading message until player is ready
 * Retries when playback fails (stream recording might not be ready yet)
 */
class ReactVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      isReady: false
    }
  }

  reTry = () => {
    this.player.source(this.props.source);
    this.player.mute();
  };

  startMuted = () => {
    this.player.mute();
    this.player.play();
  };

  timedRetry = () => {
    setTimeout(this.reTry, 1000);
  };

  errorHandler = () => {
    this.setState({isReady: false}, this.timedRetry);
  };

  onLoadedMetaData = () => {
    this.player.mute();
    this.setState({isReady: true});
  };

  componentDidMount() {
    const {errorHandler, startMuted, onLoadedMetaData} = this;
    const {cloudName, id, config, source} = this.props;
    const cloudinaryCore = new cloudinary.Cloudinary({
      cloud_name: cloudName || 'demo'
    });

    const player = this.player = cloudinaryCore.videoPlayer(
      id || 'cld-video-player', {...config}
    );

    player.source(source);

    player.on('error', errorHandler);

    //for autoplay on safari
    player.on('ready', startMuted);

    player.on('loadedmetadata', onLoadedMetaData);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isReady;
  }

  render() {
    const {isReady} = this.state;
    const id = this.props.id || "cld-video-player";
    const videoClassName = (isReady ? '' : 'hidden-video-container');
    return (
      <Fragment>
        {!isReady && <Loader absolute text={LOADING_MESSAGE}/>}
        <div className={videoClassName}>
          <video
            id={id}
            autoPlay
            muted
            controls
            playsInline
          />
        </div>
      </Fragment>
    );
  }
}

export default ReactVideoPlayer;