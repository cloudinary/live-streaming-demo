import React from 'react';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Slideshow from '@material-ui/icons/Slideshow';
import Vignette from '@material-ui/icons/Vignette';
import BlurOn from '@material-ui/icons/BlurOn';
import Videocam from '@material-ui/icons/Videocam';
import Check from '@material-ui/icons/Check';

const icons = {CloudUpload, Slideshow, Vignette, BlurOn, Videocam, Check};

const Icon = ({className, name}) => {
    const Tag = icons[name];
    return (<Tag className={className || "svg-icons"} />);
}

export default Icon;