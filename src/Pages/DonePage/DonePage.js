import React from 'react';
import { inject, observer } from 'mobx-react';
import { Page, Share, CallToAction } from '../../Components';
import { getPath } from '../../Utils/Routing';


import {
  Modal,
  ModalBody,
  Col,
  Button
} from 'reactstrap';

const DonePage = class extends React.Component {
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
    const {publicId} = this.props.store;
    history.push('/videoplayer/'+publicId);
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
    const {store, location} = this.props;
    const { title, publicId} = store;
    const path = getPath(publicId, location);
    return (
      <Page className="text-white">
        <Col xs={12} className="center h-100">
          <h6 className="text-orange pt-10">{title.value}</h6>
          <h6 className="mb-20">Live Stream Ended</h6>

          <CallToAction topAction icon="Share" text="Share" onClick={this.toggleShareModal}/>
          <Modal isOpen={this.state.showShareModal} toggle={this.toggleShareModal} contentClassName="modal-share">
          <ModalBody>
            <Share url={path}/>
          </ModalBody>
        </Modal>

          <CallToAction icon="PlayCircleOutline" text="Watch Again" onClick={this.redirectToPlayer}/>
          <CallToAction icon="Videocam" text="New Stream" onClick={this.redirectToMain}/>
          
          <div className="sign-up-container">
          <Col xs={12} className="center">
          <div className="cloudinary-logo-with-text"></div>
          </Col>
          <Col xs={12} className="center">
          <div className="mb-10">Read more @ Cloudinary</div>
          
          <Button id="stop-button" className="button-orange bold" onClick={this.signUp}>SING UP FOR FREE</Button>
          </Col>   
          </div>
        </Col>
      </Page>
    );
  }
};

export default inject('store')(observer(DonePage));
