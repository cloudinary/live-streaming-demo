const paramsToQueryString = (params=[]) => {
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

export const getHomeUrl = (pathname) => {
  const url = `${window.location.href.replace(
    pathname,
    ''
  )}`;
  return url.endsWith('/') ? url : url+'/';
};

export const getBaseName = ()=>window.location.href.includes('/react-video-live-demo') ? '/react-video-live-demo' : '/';