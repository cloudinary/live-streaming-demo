import { types } from 'mobx-state-tree';
import initLS from 'cloudinary-live-stream';
import { Checkbox } from '@material-ui/core';

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
    logo: types.optional(types.string, '')
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

    function setInputValue(inputName, value) {
      self[inputName].value = value;
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
    }
  }))
  .views(self => ({
    //return an array of needed transformations and effects
    get transformations() {
      let effects = self.effects.filter(e => e.enabled);
      let socials = self.socials.filter(e => e.enabled);
      return effects.concat(socials);
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
      enabled: false
    },
    {
      name: 'social',
      value: {},
      label: 'Youtube',
      logo: 'youtube',
      enabled: false
    }
  ]

  /*
            />
          </Col>
          <Col xs={6}>
          { store.effects.logo && store.effects.logo.enabled ?
          <Button className="bg-light text-black">Upload</Button> : null}
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <CheckBox
          name="intro"
          label="Add intro animation"
          Logo={() => <Slideshow className="svg-icons" />}
          checked={isEnabled(store, 'intro')}
          action="toggleEffect"
        />
      </Col>
      <Col xs="12">
        <CheckBox
          name="vignette"
          label="Apply vignette border"
          Logo={() => <Vignette className="svg-icons" />}
          checked={isEnabled(store, 'vignette')}
          action="toggleEffect"
        />
      </Col>
      <Col xs="12">
        <CheckBox
          name="blur"
          label="Blur your video"
          Logo={() => <BlurOn className="svg-icons" />}
          checked={isEnabled(store, 'blur')}
          action="toggleEffect"
        />
      </Col>


*/
});
