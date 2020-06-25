import React from 'react';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Slideshow from '@material-ui/icons/Slideshow';
import Vignette from '@material-ui/icons/Vignette';
import BlurOn from '@material-ui/icons/BlurOn';
import Videocam from '@material-ui/icons/Videocam';
import Share from '@material-ui/icons/Share';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import 'font-awesome/css/font-awesome.min.css';

const icons = {
  CloudUpload,
  Slideshow,
  Vignette,
  BlurOn,
  Videocam,
  Share,
  PlayCircleOutline
};

const FontAwesomeIcon = ({name}) => <i className={"icon fa fa-" + name}/>;

const MaterialIcon = ({name, className}) => {
  const MaterialComponent = icons[name];
  return MaterialComponent ? <MaterialComponent className={className}/> : null;
};

/**
 * Returns a material-ui icon with given name, fallback to a font-awesome icon
 * @param className - passed to the material-ui icon
 * @param name - of wanted icon
 * @return {*} material-ui icon or font-awesome icon
 * @constructor
 */
const Icon = ({className = 'svg-icons', name = ""}) => {
  const isFontAwesome = name && !icons[name];

  if (isFontAwesome) {
    return <FontAwesomeIcon name={name}/>;
  }

  return <MaterialIcon name={name} className={className}/>;
};

export default Icon;
