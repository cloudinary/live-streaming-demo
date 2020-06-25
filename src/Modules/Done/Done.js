import React, {Component, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {Page, Share, IconButton} from '../../Components';
import {Modal, ModalBody, Col, Button} from 'reactstrap';
import withSizes from "react-sizes";
import mapSizesToProps from '../../Utils/mapSizesToProps';

/**
 * This page is shown when streaming is over.
 * Displays 4 buttons: Share / Watch Again / New Video / Sign Up
 */
class Done extends Component {
  constructor(props) {
    super(props);
    if (!props.store.url) {
      props.history.push('/');
    }

    this.state = {
      showShareModal: false
    };
  }

  toggleShareModal = () => {
    this.setState(prevState => ({
      showShareModal: !prevState.showShareModal
    }));
  };

  redirectToPlayer = () => {
    const {history} = this.props;
    const {url} = this.props.store;
    const shareUrlArray = url.split('/');
    history.push('/' + shareUrlArray.slice(shareUrlArray.indexOf('videoplayer')).join('/'));
  };

  redirectToMain = () => {
    const {history} = this.props;
    history.push('/');
  };

  signUp = () => {
    window.open(
      'https://cloudinary.com/users/register/free',
      '_blank'
    );
  };

  ShareButton = () => {
    const {toggleShareModal} = this;
    const {showShareModal} = this.state;
    const {url} = this.props.store;

    return (
      <Fragment>
        <IconButton topBorder icon="Share" text="Share" onClick={toggleShareModal}/>
        <Modal isOpen={showShareModal} toggle={toggleShareModal} contentClassName="modal-share">
          <ModalBody>
            <Share url={url}/>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  };

  WatchAgainButton = () => (
    <IconButton icon="PlayCircleOutline" text="Watch Again" onClick={this.redirectToPlayer}/>
  );

  NewStreamButton = () => (
    <IconButton icon="Videocam" text="New Stream" onClick={this.redirectToMain}/>
  );

  SignUpButton = () => {
    const {isMobile} = this.props;

    return (
      <div className={isMobile ? "col-12 sign-up-container-mobile" : "sign-up-container"}>
        <Col xs={12}>
          <div className="cloudinary-logo-with-text"/>
        </Col>
        <Col xs={12}>
          <div className="mb-10">Read more @ Cloudinary</div>

          <div><Button id="stop-button" className="button-orange bold" onClick={this.signUp}>SIGN UP FOR
            FREE</Button></div>
        </Col>
      </div>
    );
  };

  render() {
    const {title} = this.props.store;
    const {ShareButton, WatchAgainButton, NewStreamButton, SignUpButton} = this;

    return (
      <Page className="text-white">
        <Col xs={12} className="text-center h-100">
          <h6 className="text-orange pt-10">{title.value}</h6>
          <h6 className="mb-20">Live Stream Ended</h6>
          <ShareButton/>
          <WatchAgainButton/>
          <NewStreamButton/>
          <SignUpButton/>
        </Col>
      </Page>
    );
  }
}

export default inject('store')(observer(withSizes(mapSizesToProps)(Done)));
