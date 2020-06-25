import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'reactstrap';
import Env from '../../Utils/Env';
import { UploadedImage } from '../Components';

/**
 * Wrapper of Cloudinary's upload widget
 * Allows to upload an image to be used as video logo overlay
 * Shows an upload button, or the image if it was already uploaded.
 */
class UploadWidget extends React.Component {
  constructor(props) {
    super(props);
    this.uploadWidget = null;
  }

  componentDidMount(){
    this.uploadWidget = window.cloudinary.createUploadWidget(
        {
          singleUploadAutoClose: true,
          multiple: false,
          cloud_name: Env.CLOUD_NAME,
          upload_preset: Env.UPLOAD_PRESET_IMAGES
        },
        (error, result) => {
          if (result.event === 'success') {
            const url = result.info.thumbnail_url;
            const publicId = result.info.public_id;
            this.props.store.setUploadedImage({url, publicId});
          }
        }
      );
  }


  render() {
    const uploadedImage = this.props.store.uploadedImage;

    //image already uploaded so show image
    if (uploadedImage.url) {
        return <UploadedImage {...uploadedImage} />;
    }

    //no image so show upload button
    return (
      <Button
        className="bg-light text-black"
        onClick={() => this.uploadWidget.open()}
      >
        Upload
      </Button>
    );
  }
}

export default inject('store')(observer(UploadWidget));
