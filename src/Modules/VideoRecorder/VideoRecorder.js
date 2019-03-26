import React from 'react';
import {Col} from 'reactstrap';
import {Page, NavButton, LiveIndicator, Loader} from '../../Components';
import {inject, observer} from 'mobx-react';

import './VideoRecorder.css';

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
        const {history, store} = this.props;
        const started = (store.liveStreamStatus === 'start');
        const {error} = store;
        const videoRef = this.videoRef;
        const outerContainerClassName = "video-container-outer " + (started ? "" : "hidden");
        return (
            <Page>
                {!started && (
                    <Page absolute className="text-center">
                        <Loader text="Hang on a second. We’re starting the video stream."/>
                    </Page>
                )}
                {error && (
                  <Page absolute className="text-center">
                      <p>error</p>
                  </Page>
                )}
                <Col xs={12} className="center text-center">
                    <LiveIndicator/>
                </Col>
                <div className={outerContainerClassName}>
                    <div className="center relative">
                        <video
                            ref={videoRef}
                            className="cld-video-recorder"
                            id="video"
                            autoPlay
                            muted="muted"
                            playsInline
                        >
                        </video>
                    </div>
                </div>
                {!!started && (
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
                )}
            </Page>
        );
    }
};

export default inject('store')(observer(VideoRecorderPage));
