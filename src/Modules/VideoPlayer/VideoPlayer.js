import React from 'react';
import {Page, ReactVideoPlayer} from '../../Components';
import Env from '../../Utils/Env';
import queryString from 'query-string';
import {transformationRaw} from '../../Utils/Transformations';
import withSizes from 'react-sizes'
import mapSizesToProps from '../../Utils/mapSizesToProps';

window.ga('send', 'pageview');

const VideoPlayer = class extends React.Component {
  constructor(props) {
    super(props);
    this.transformations = queryString.parse(this.props.location.search);
    this.publicId = this.props.match.params.publicId;
    this.getPlayerConfig = this.getPlayerConfig.bind(this);
  }

  getPlayerConfig() {
    return {
      cloudName: Env.CLOUD_NAME,
      id: 'video-player',
      muted: true,
      config: {
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
      source: {
        publicId: this.publicId,
        info: {
          title: "Cloudinary Live Streaming Demo",
          subtitle: "Using Cloudinary Video Player"
        },
        sourceTypes: ['hls'],
        format: 'm3u8',
        type: Env.UPLOAD_TYPE,
        raw_transformation: transformationRaw(this.transformations)
      }
    };
  }

  render() {
    const playerConfig = this.getPlayerConfig();
    return (
      <Page>
        <ReactVideoPlayer
          {...playerConfig}
        />
      </Page>
    );
  }
};

export default withSizes(mapSizesToProps)(VideoPlayer);

