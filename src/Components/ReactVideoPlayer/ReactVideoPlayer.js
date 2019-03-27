
import React, { Component } from 'react';
import cloudinary from 'cloudinary-core';
import cloudinaryVideoPlayer from 'cloudinary-video-player'; // eslint-disable-line

import "cloudinary-video-player/dist/cld-video-player.css";

class App extends Component {

  componentDidMount() {
    const cloudinaryCore = new cloudinary.Cloudinary({
      cloud_name: this.props.cloudName || 'demo'
    });

    const player = cloudinaryCore.videoPlayer(
      this.props.id || 'cld-video-player', {
        ...this.props.config
      }
    );

    player.width(this.props.width || 600);

    player.source(this.props.source);

    player.on('error', (err)=>{console.log('error: ', err); player.source(this.props.source).play();});
  }

  render() {
    return (
      <video
        id={this.props.id || "cld-video-player"}
        controls={this.props.controls}
        muted={this.props.muted}
        autoPlay
      />
    );
  }
}

export default App;