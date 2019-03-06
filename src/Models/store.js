import { types } from 'mobx-state-tree';
import initLS from 'cloudinary-live-stream';

const CLD_API_HOST = 'api.cloudinary.com';
const CLD_RES_HOST = 'res.cloudinary.com';
const CLD_WEB_RTC_HOST = 'webrtc-api.cloudinary.com';
const CLOUD_NAME = 'demo-live';
const UPLOAD_PRESET = 'live-stream';
const UPLOAD_PRESET_OPENER = 'live-opener';
const CLOUD_NAME_IMAGES = CLOUD_NAME;
const UPLOAD_PRESET_IMAGES = 'images';
const UPLOAD_WIDGET_PREFIX = 'https://widget.cloudinary.com';
const UPLOAD_TYPE = 'upload';

const MainStore = types
  .model('MainStore', {
    title: types.maybe(types.string),
    videoRef: types.maybe(types.frozen({})),
    url: types.maybe(types.string),
    publicId: types.maybe(types.string),
    error: types.maybe(types.frozen({})),
    loading: types.optional(types.boolean, true)
  })
  .actions(self => {
    let liveStream = null;

    function setLoading(loading) {
      self.loading = loading;
    }

    function setLiveStream(ls, err) {
      if (err) {
        self.setError(err);
      } else {
        liveStream = ls;
        console.log('setting url');
        self.setURL(ls.response.url);
        console.log('setting public id');
        self.setPublicId(ls.response.public_id);
        console.log('LIVE STREAM: ', ls);
        self.setError(false);
      }
      self.setLoading(false);
    }

    function setError(err) {
      self.error = err;
    }

    function setURL(url) {
      self.url = url;
    }

    function setPublicId(pid) {
      self.publicId = pid;
    }

    function setVideoRef(vr) {
      self.videoRef = vr;
    }

    function initLiveStream() {
      self.setLoading(true);
      initLS({
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        debug: 'all',
        hlsTarget: true,
        fileTarget: true,
        events: {
          start: function(args) {
            // user code
            console.log('JANUS START !!! args:', args);
          },
          stop: function(args) {
            // user code
            console.log('JANUS STOP !!!');
          },
          error: function(error) {
            // user code
            console.log('JANUS ERROR !!!:', error);
          },
          local_stream: function(stream) {
            // user code, typically attaching the stream to a video view:
            console.log('JASNUS LOCAL_STREAM !!!, stream:', stream);
            liveStream.attach(self.videoRef, stream);
          }
        }
      })
        .then(newLiveStream => {
          console.log('setting live stream:', newLiveStream);
          self.setLiveStream(newLiveStream);
        })
        .catch(err => {
          console.log('and catching err ls:', err);
          self.setLiveStream(false, err);
        });
    }

    function startLiveStream(videoRef) {
      if (liveStream) {
      self.setVideoRef(videoRef);
      liveStream.start(self.publicId);
      }
    }

    function stopLiveStream() {
      if (liveStream) {
        liveStream.stop();
      }
    }

    return {
      setLiveStream,
      initLiveStream,
      setVideoRef,
      startLiveStream,
      stopLiveStream,
      setPublicId,
      setURL,
      setError,
      setLoading
    };
  });
/*
  .views(self => ({
    get publicId() {
      return self.liveStream.response.public_id;
    },
    get url() {
      return (self.liveStream && self.liveStream.response) ? self.liveStream.response.secure_url : "";
    }
  }));
  */

// call initLiveStream with the configuration parameters:

export default MainStore.create({ title: 'My live video' });
