import React from 'react';
import {inject, observer} from 'mobx-react';
import {Col} from 'reactstrap';
import {Page, Share, Loader, VideoPreview} from '../../Components';
import {Title, Url, Stream} from './Partials';
import {Streamer} from '@cloudinary/js-streaming';

/**
 * Invite page
 * Shows pending stream locally with option to share it before starting the stream.
 */
class Invite extends React.Component {
  constructor(props){
    super(props);
    this.state = {videoRef: React.createRef(), isMobile: window.innerWidth < 400};
  }

  resize = ()=> {
    const isMobile = window.innerWidth < 400;
    if (isMobile !== this.state.isMobile){
      this.setState({isMobile});
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.props.store.initLS(this.props.location.pathname);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.videoRef && this.state.videoRef.current) {
      const streamer = new Streamer(this.state.videoRef.current);
      streamer.attachCamera();
    }
  }

  render() {
    const {store} = this.props;
    const {url, errorStr: error, loading} = store;
    const {isMobile} = this.state;

    if (loading) {
      return (
        <Page>
          <Loader text="Initializing the live streaming session..."/>
        </Page>
      );
    }

    if (error) {
      return (
        <Page className="text-white">
          <Col xs="12" className="text-center">
            <p>{error+""}</p>
          </Col>
        </Page>
      );
    }

    return (
      <Page className="text-white text-center">
        <Title/>
        <Url url={url}/>
        <Share url={url} className={isMobile ? "mt-10" : "mt-20"}/>
        <VideoPreview key="video-preview-component" innerRef={this.state.videoRef} isMobile={isMobile}/>
        <Stream {...this.props} />
      </Page>
    );
  }
}

export default inject('store')(observer((Invite)));
