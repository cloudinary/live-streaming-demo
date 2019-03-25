import { getSnapshot, applySnapshot } from 'mobx-state-tree';
import initLS from 'cloudinary-live-stream';
import { getShareUrl } from '../Utils/Routing';
import Env from '../Utils/Env';

const { CLOUD_NAME, UPLOAD_PRESET, UPLOAD_PRESET_OPENER } = Env;

export default self => {
  let liveStream = null;
  let initialSnapshot;

  const getLiveStreamInitOptions = () => {
    return Object.assign({}, self.targets, {
      cloudName: CLOUD_NAME,

      uploadPreset: self.transformations.find(t => t.name === 'intro')
        ? UPLOAD_PRESET_OPENER
        : UPLOAD_PRESET,
      debug: 'all',
      events: {
        start: function(args) {
          //console.log('start', args);
          self.setLiveStreamStatus('start');
        },
        stop: function(args) {
          //console.log('stop', args);
          self.setLiveStreamStatus('stop');
        },
        error: function(error) {
          //console.log('error', error);
        },
        local_stream: function(stream) {
          //attaching the stream to a video view:
          liveStream.attach(self.videoRef, stream);
        }
      }
    });
  };

  function setLiveStreamStatus(status){
    self.liveStreamStatus = status;
  }

  function afterCreate() {
    initialSnapshot = getSnapshot(self);
  }

  function resetStore() {
    applySnapshot(self, initialSnapshot); // set store to default
  }

  function setStartedAtMainPage(val = true) {
    self.startedAtMainPage = val;
  }

  function setInputValue(name, value, model) {
    if (model) {
      self[model].find(e => e.label === name).setValue(value);
    } else {
      self[name].value = value;
    }
  }

  function toggleEffect(name) {
    self.effects.find(e => e.name === name).toggle();
  }

  function setEffectValue(name, value) {
    self.effects.find(e => e.name === name).setValue(value);
  }

  function setUploadedImage(image) {
    self.effects.find(e => e.name === 'logo').setValue(image);
  }

  function delUploadedImage() {
    setUploadedImage({});
  }

  function toggleSocial(label) {
    self.socials.forEach(e => {
      e.setEnabled(e.label === label);
    });
  }

  function setLoading(loading) {
    self.loading = loading;
  }

  function setLiveStream(err, ls, pathname) {
    if (err) {
      self.setError(err);
    } else {
      liveStream = ls;
      self.setURL(
        getShareUrl(
          ls.response.public_id,
          self.transformations.filter(trans => trans.name !== 'intro'),
          pathname
        )
      );
      self.setPublicId(ls.response.public_id);
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

  function initLiveStream(pathname) {
    self.setLoading(true);

    initLS(getLiveStreamInitOptions())
      .then(newLiveStream => {
        self.setLiveStream(null, newLiveStream, pathname);
      })
      .catch(err => {
        self.setLiveStream(err);
      });
  }

  function startLiveStream(videoRef) {
    //Flag for Main Page to request a fresh store
    self.needRestart = true;

    if (liveStream) {
      self.setVideoRef(videoRef);
      liveStream.start(self.publicId);
    }
  }

  function stopLiveStream() {
    if (liveStream) {
      liveStream.stop();
      self.setLiveStreamStatus('stopping');
    }
  }

  return {
    setLiveStreamStatus,
    afterCreate,
    resetStore,
    setStartedAtMainPage,
    setLiveStream,
    initLiveStream,
    setVideoRef,
    startLiveStream,
    stopLiveStream,
    setPublicId,
    setURL,
    setError,
    setLoading,
    setInputValue,
    toggleEffect,
    setEffectValue,
    toggleSocial,
    setUploadedImage,
    delUploadedImage
  };
};
