const paramsToQueryString = params => {
  if (!params || !params.length) {
    return '';
  }

  let result = '?';
  params.forEach((param, i) => {
    result += `${param.name}=${param.value}`;
    if (i < params.length - 1) {
      result += `&`;
    }
  });

  return result;
};

export const getPath = (publicId, params, pathname) => {
  return `${window.location.href.replace(
    pathname,
    ''
  )}/videoplayer/${publicId}/${paramsToQueryString(params)}`;
};
