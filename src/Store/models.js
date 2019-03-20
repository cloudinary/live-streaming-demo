import {types} from 'mobx-state-tree';

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
        {...self, checked: self.enabled, action: 'toggleEffect'}
      );
    },
    get radio() {
      return Object.assign(
        {},
        {...self, checked: self.enabled, action: 'toggleSocial'}
      );
    }
  }));

const MainStore = {
  liveStreamStatus: types.optional(types.string, 'none'),
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
};
export {MainStore};
