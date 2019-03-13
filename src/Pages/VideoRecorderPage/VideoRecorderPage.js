import React from 'react';
import { Row, Col } from 'reactstrap';
import { Page, NavButton, LiveIndicator } from '../../Components';
import { inject, observer } from 'mobx-react';

import './VideoRecorderPage.css';

const VideoRecorderPage = class extends React.Component {
  constructor(props) {
    super(props);
    if (!props.store.url) {
      props.history.push('/');
    }

    this.videoRef = React.createRef();
    this.startLiveStream = this.startLiveStream.bind(this);
    this.stopLiveStream = this.stopLiveStream.bind(this);
  }

  startLiveStream() {
    this.props.store.startLiveStream(this.videoRef.current);
  }

  stopLiveStream() {
    this.props.store.stopLiveStream();
  }

  componentDidMount() {   
    this.startLiveStream();
  }

  render() {
    const stop = this.stopLiveStream;
    const { history, values } = this.props;
    const video = this.videoRef;
    return (
      <Page>
          <Col xs={12} className="center">
            <LiveIndicator />
          </Col>
          <Col xs={12} className="center">
            <video
              ref={video}
              className="video"
              id="video"
              autoPlay
              muted="muted"
              playsInline
            />
          </Col>
            <Col xs={12} className="center button-bottom">
              <NavButton
                cls="stop"
                color="white"
                bgColor="rgb(250,138,33)"
                doBefore={stop}
                to="/done"
                history={history}
              >
                &#9632;
              </NavButton>
            </Col>
      </Page>
    );
  }
};

export default inject('store')(observer(VideoRecorderPage));
