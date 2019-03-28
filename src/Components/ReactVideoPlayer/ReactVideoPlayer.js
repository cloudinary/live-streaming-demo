import React, {Component, Fragment} from 'react';
import cloudinary from 'cloudinary-core';
import cloudinaryVideoPlayer from 'cloudinary-video-player'; // eslint-disable-line
import {Loader} from '../Components';
import "cloudinary-video-player/dist/cld-video-player.css";

class ReactVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.errorHandler = this.errorHandler.bind(this);
    this.loadedMetaData = this.loadedMetaData.bind(this);
    this.reTry = this.reTry.bind(this);
    this.startMuted = this.startMuted.bind(this);
    this.player = null;
    this.state = {
      isReady: false
    }
  }

  componentDidMount() {
    const cloudinaryCore = new cloudinary.Cloudinary({
      cloud_name: this.props.cloudName || 'demo'
    });

    const player = this.player = cloudinaryCore.videoPlayer(
      this.props.id || 'cld-video-player', {
        ...this.props.config
      }
    );

    player.source(this.props.source);

    player.on('error', this.errorHandler);

    //for autoplay on safari
    player.on('ready', this.startMuted);

    player.on('loadedmetadata', this.loadedMetaData);

  }

  reTry(){
    this.player.source(this.props.source);
    this.player.mute();
  }

  startMuted(){
    const isChrome = !!window.chrome && !!window.chrome.webstore;
    if (!isChrome) {
      this.player.mute();
      this.player.play();
    }
  }

  timedRetry(){
    setTimeout(this.reTry, 1000);
  }

  errorHandler() {
    this.setState({isReady: false},this.timedRetry);
  }

  loadedMetaData() {
    this.player.mute();
    this.setState({isReady: true});
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextState.isReady;
  }

  render() {
    const {isReady} = this.state;
    const videoClassName = (isReady ? '' : 'hidden-video-container');
    return (
      <Fragment>
        {!isReady && <Loader absolute text="Hang on a second. We’re loading the video stream you requested."/>}
        <div className={videoClassName}>
          <video
            id={this.props.id || "cld-video-player"}
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