const TRANSFORMATIONS = {
  blur: () => 'e_blur',
  logo: logo => `l_${logo},w_100,g_north_west,x_10,y_10`,
  vignette: () => 'e_vignette:60'
};

const toNameValuePairs = obj => {
  const keys = Object.keys(obj);
  if (keys && keys.length) {
    return keys.map(key => {
      return { name: key, value: obj[key] };
    });
  }
  return [];
};

const transformationRaw = transformations => {
  const rawTransformations = ['x_0'];

  toNameValuePairs(transformations).forEach(({ name, value }) => {
    if (TRANSFORMATIONS[name]) {
      rawTransformations.push(TRANSFORMATIONS[name](value));
    }
  });

  return rawTransformations.join('/');
};

export { transformationRaw };
