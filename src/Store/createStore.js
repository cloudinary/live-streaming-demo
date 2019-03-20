import store from './store';
export default () =>
  store.create({
    liveStreamStatus: 'none',
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
        value: '',
        label: 'Blur your video',
        logo: 'BlurOn',
        enabled: false
      }
    ],
    socials: [
      {
        name: 'social',
        value: '',
        label: 'None',
        logo: '',
        enabled: true
      },
      {
        name: 'social',
        value: '',
        label: 'Facebook',
        logo: 'facebook',
        enabled: false,
        info:
          'Enter the Server URL and Stream Key separated by a slash (/), available from the Facebook Create Live Stream page.',
        url: { placeholder: 'rtmp://', value: '' }
      },
      {
        name: 'social',
        value: '',
        label: 'Youtube',
        logo: 'youtube',
        enabled: false,
        info:
          'Enter the Server URL and Stream Key separated with a slash (/), available from your YouTube Live Dashboard.',
        url: { placeholder: 'rtmp://', value: '' }
      }
    ]
  });
