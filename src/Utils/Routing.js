export const getPath = (publicId, location) => {
  return `${window.location.href.replace(
    location.pathname,
    ''
  )}/videoplayer/${publicId}`;
};
