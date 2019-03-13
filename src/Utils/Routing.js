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

export const getShareUrl = (publicId, params, pathname) => {
  return `${window.location.href.replace(
    pathname,
    ''
  )}/videoplayer/${publicId}/${paramsToQueryString(params)}`;
};

export const getHomeUrl = () => {
  return window.location.href.split("/").slice(0,5).join("/");
};
