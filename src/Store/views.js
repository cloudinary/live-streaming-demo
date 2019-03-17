export default self => ({
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
});
