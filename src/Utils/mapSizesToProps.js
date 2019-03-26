/**
 * To be used with withSizes(mapSizesToProps)(Component);
 */
export default ({ height }) => {
  return {
    isMobile: height < 500
  }
};