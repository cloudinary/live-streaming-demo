import React from 'react';
import { inject, observer } from 'mobx-react';
import { Page, Share, IconButton } from '../../Components';


import {
  Modal,
  ModalBody,
  Col,
  Button
} from 'reactstrap';
import withSizes from "react-sizes";
import mapSizesToProps from '../../Utils/mapSizesToProps';

const Done = class extends React.Component {
  constructor(props) {
    super(props);
    if (!props.store.url) {
      props.history.push('/');
    }

    this.state={
      showShareModal:false
    }

    this.toggleShareModal = this.toggleShareModal.bind(this);
    this.redirectToPlayer = this.redirectToPlayer.bind(this);
    this.redirectToMain = this.redirectToMain.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  toggleShareModal(){
    this.setState(prevState => ({
      showShareModal: !prevState.showShareModal
    }));
  }

  redirectToPlayer(){
    const { history } = this.props;
    const {url} = this.props.store;
    const shareUrlArray = url.split('/');
    history.push('/'+shareUrlArray.slice(shareUrlArray.indexOf('videoplayer')).join('/'));
  }

  redirectToMain(){
    const { history } = this.props;
    history.push('/');
  }

  signUp(){
    window.open(
      'https://cloudinary.com/users/register/free',
      '_blank'
    );
  }

  render() {
    const {title, url} = this.props.store;
    const {isMobile} = this.props;
    return (
      <Page className="text-white">
        <Col xs={12} className="text-center h-100">
          <h6 className="text-orange pt-10">{title.value}</h6>
          <h6 className="mb-20">Live Stream Ended</h6>

          <IconButton topAction icon="Share" text="Share" onClick={this.toggleShareModal}/>
          <Modal isOpen={this.state.showShareModal} toggle={this.toggleShareModal} contentClassName="modal-share">
          <ModalBody>
            <Share url={url}/>
          </ModalBody>
        </Modal>

          <IconButton icon="PlayCircleOutline" text="Watch Again" onClick={this.redirectToPlayer}/>
          <IconButton icon="Videocam" text="New Stream" onClick={this.redirectToMain}/>

          <div className={isMobile ? "col-12 sign-up-container-mobile" : "sign-up-container"}>
          <Col xs={12}>
          <div className="cloudinary-logo-with-text"></div>
          </Col>
          <Col xs={12}>
          <div className="mb-10">Read more @ Cloudinary</div>

          <div><Button id="stop-button" className="button-orange bold" onClick={this.signUp}>SIGN UP FOR FREE</Button></div>
          </Col>
          </div>
        </Col>
      </Page>
    );
  }
};

export default inject('store')(observer(withSizes(mapSizesToProps)(Done)));
