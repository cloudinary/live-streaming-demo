import React from 'react';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Slideshow from '@material-ui/icons/Slideshow';
import Vignette from '@material-ui/icons/Vignette';
import BlurOn from '@material-ui/icons/BlurOn';
import Videocam from '@material-ui/icons/Videocam';
import Share from '@material-ui/icons/Share';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';

const icons = {
  CloudUpload,
  Slideshow,
  Vignette,
  BlurOn,
  Videocam,
  Share,
  PlayCircleOutline
};

const Icon = ({ className, name }) => {
    console.log("tag name:", name);
  const Tag = icons[name];
  return <Tag className={className || 'svg-icons'} />;
};

export default Icon;
