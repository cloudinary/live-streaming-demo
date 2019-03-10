import React from 'react';
import { inject, observer } from 'mobx-react';
import './UploadedImage.css'


const UploadedImage = (props) => {
        return (
            <div className="uploaded-image" style={{backgroundImage:`url(${props.url})`}}>
            <div className="float-right">
                <button onClick={props.store.delUploadedImage}>X</button>
            </div>
            </div>
        );
}

export default inject('store')(observer(UploadedImage));