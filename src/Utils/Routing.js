/**
 * Convert params to query string params
 * @param {array} params - to convert
 * @return {string}
 */
const paramsToQueryString = (params = []) => {
  let result = params.length ? '?' : "";
  params.forEach((param, i) => {
    result += `${param.name}=${param.value}`;
    if (i < params.length - 1) {
      result += `&`;
    }
  });

  return result;
};

/**
 * Get Home Url relative to give pathname
 * @param pathname - current location's pathname
 * @return {string}
 */
export const getHomeUrl = (pathname) => {
  const url = `${window.location.href.replace(
    pathname,
    ''
  )}`;
  return url.endsWith('/') ? url : url + '/';
};

/**
 * Generates url to share the video stream
 * @param publicId - video asset id
 * @param params - query params to add to share url
 * @param pathname - current location's pathname
 * @return {string}
 */
export const getShareUrl = (publicId, params, pathname) => {
  return `${getHomeUrl(pathname)}videoplayer/${publicId}/${paramsToQueryString(params)}`;
};

/**
 * Get PUBLIC_URL that is defined in index.html
 * @return {string}
 */
export const getBaseName = () => process.env.PUBLIC_URL;