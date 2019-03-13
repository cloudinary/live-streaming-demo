import { types, getSnapshot, applySnapshot } from 'mobx-state-tree';
import initLS from 'cloudinary-live-stream';
import { getShareUrl } from '../Utils/Routing';

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

const getLiveStreamInitOptions = (self, liveStream) => {
  return Object.assign({}, self.targets, {
    cloudName: CLOUD_NAME,
    uploadPreset: self.transformations.includes('intro')
      ? UPLOAD_PRESET_OPENER
      : UPLOAD_PRESET,
    debug: 'all',
    events: {
      /*
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
    }
    ,
    */
      local_stream: function(stream) {
        //attaching the stream to a video view:
        liveStream.attach(self.videoRef, stream);
      }
    }
  });
};

const Input = types.model({
  value: types.optional(types.string, ''),
  placeholder: types.optional(types.string, '')
});

const Option = types
  .model({
    name: types.optional(types.string, ''),
    value: types.maybe(types.frozen({})),
    enabled: types.optional(types.boolean, false),
    label: types.optional(types.string, ''),
    logo: types.optional(types.string, ''),
    info: types.optional(types.string, ''),
    url: types.maybe(Input)
  })
  .actions(self => ({
    toggle() {
      self.enabled = !self.enabled;
    },
    setValue(v) {
      self.value = v;
    },
    setEnabled(v) {
      self.enabled = v;
    }
  }))
  .views(self => ({
    get checkbox() {
      return Object.assign(
        {},
        { ...self, checked: self.enabled, action: 'toggleEffect' }
      );
    },
    get radio() {
      return Object.assign(
        {},
        { ...self, checked: self.enabled, action: 'toggleSocial' }
      );
    }
  }));

const MainStore = types
  .model('MainStore', {
    startedAtMainPage: types.optional(types.boolean, false),
    needRestart: types.optional(types.boolean, false),
    title: types.maybe(Input),
    effects: types.array(Option),
    socials: types.array(Option),
    videoRef: types.maybe(types.frozen({})),
    url: types.maybe(types.string),
    publicId: types.maybe(types.string),
    error: types.maybe(types.frozen({})),
    loading: types.optional(types.boolean, true)
  })
  .actions(self => {
    let liveStream = null;
    let initialSnapshot;

    const getLiveStreamInitOptions = () => {
      return Object.assign({}, self.targets, {
        cloudName: CLOUD_NAME,
        uploadPreset: self.transformations.find(t=>t.name==='intro')
          ? UPLOAD_PRESET_OPENER
          : UPLOAD_PRESET,
        debug: 'all',
        events: {
          /*
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
        }
        ,
        */
          local_stream: function(stream) {
            //attaching the stream to a video view:
            liveStream.attach(self.videoRef, stream);
          }
        }
      });
    };
    

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
      self.effects.find(e => e.name == name).toggle();
      console.log('toggled', self.effects.find(e => e.name == name).enabled);
    }

    function setEffectValue(name, value) {
      self.effects.find(e => e.name == name).setValue(value);
    }

    function setUploadedImage(image) {
      self.effects.find(e => e.name == 'logo').setValue(image);
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
        self.setURL(getShareUrl(ls.response.public_id, self.transformations.filter(trans=>trans.name !== 'intro'), pathname));
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
      }
    }

    return {
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
  })
  .views(self => ({
    get uploadedImage() {
      return self.effects.find(e => e.name == 'logo').value;
    },
    get errorStr() {
      if (!self.error) {
        return '';
      }
      const errorJson = JSON.stringify(self.error);
      return errorJson === '{}' ? '' : errorJson;
    },
    get transformations() {
      let transformations = [];
      self.effects.forEach(({ name, value, enabled }) => {
        if (enabled) {
          if (name === 'logo') {
            if (value && value.publicId) {
              transformations.push({ name, value: value.publicId });
            }
          } else {
            transformations.push({ name, value: true });
          }
        }
      });
      return transformations;
    },
    get targets() {
      let targets = {
        hlsTarget: true,
        fileTarget: true
      };

      let selectedSocialMedia = self.socials.filter(e => e.enabled);
      if (selectedSocialMedia.value) {
        targets[selectedSocialMedia.name + 'Uri'] = selectedSocialMedia.value;
      }
      return targets;
    }
  }));

export default MainStore.create({
  title: { placeholder: 'My live video', value: 'My live video' },
  effects: [
    {
      name: 'logo',
      value: {},
      label: 'Add your logo',
      logo: 'CloudUpload',
      enabled: false
    },
    {
      name: 'intro',
      value: {},
      label: 'Add intro animation',
      logo: 'Slideshow',
      enabled: false
    },
    {
      name: 'vignette',
      value: {},
      label: 'Apply vignette border',
      logo: 'Vignette',
      enabled: false
    },
    {
      name: 'blur',
      value: {},
      label: 'Blur your video',
      logo: 'BlurOn',
      enabled: false
    }
  ],
  socials: [
    {
      name: 'social',
      value: {},
      label: 'None',
      logo: '',
      enabled: true
    },
    {
      name: 'social',
      value: {},
      label: 'Facebook',
      logo: 'facebook',
      enabled: false,
      info:
        'Enter the Server URL and Stream Key separated by a slash (/), available from the Facebook Create Live Stream page.',
      url: { placeholder: 'rtmp://', value: '' }
    },
    {
      name: 'social',
      value: {},
      label: 'Youtube',
      logo: 'youtube',
      enabled: false,
      info:
        'Enter the Server URL and Stream Key separated with a slash (/), available from your YouTube Live Dashboard.',
      url: { placeholder: 'rtmp://', value: '' }
    }
  ]
});
