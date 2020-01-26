import React from 'react';

const VideoPreview = ({ innerRef, isMobile}) => {
  const videoStyle = {
    marginTop: isMobile ? '5px' : '15px',
    height: isMobile ? "15vh" : "30vh",
    display: 'inline-block'
  };

  return (
    <div key="video-preview-div">
    <video key="video-preview" autoPlay playsInline muted="muted" ref={innerRef} style={videoStyle}/>
    </div>
  );
};

export default VideoPreview;
