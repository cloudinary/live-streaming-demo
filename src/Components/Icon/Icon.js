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

const Icon = ({ className='svg-icons', name="", fontAwesome=false }) => {
  if (fontAwesome){
    return (<i className={"icon fa fa-"+name}></i>);
  }
  const Tag = icons[name];
  if (Tag){
  return (<Tag className={className} />);
  }
  return null;
};

export default Icon;
