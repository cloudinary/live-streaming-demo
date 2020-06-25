import React from 'react';
import {inject, observer} from 'mobx-react';
import './UploadedImage.css'

/**
 * Shows an image from store, with option to remove it from the store
 * @param url - url of image to show
 * @param store
 * @return {*}
 * @constructor
 */
const UploadedImage = ({url, store}) => {
  return (
    <div className="uploaded-image" style={{backgroundImage: `url(${url})`}}>
      <div className="float-right">
        <button onClick={store.delUploadedImage}>X</button>
      </div>
    </div>
  );
}

export default inject('store')(observer(UploadedImage));