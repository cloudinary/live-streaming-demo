import React from 'react';
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

export default class ViedoePlayerPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.startLiveStream = this.startLiveStream.bind(this);
    this.stop = this.stop.bind(this);
  }

  startLiveStream() {
    const { liveStream, publicId } = this.props.values;
    liveStream.start(publicId);
    //this.setState(state => state);
  }

  stop() {
    const { liveStream } = this.props.values;
    liveStream.stop();
  }

  render() {
    return (
      <div>
        <div className="video-wrapper">
          <video
            ref={video}
            className="video"
            id="video"
            autoPlay
            muted="muted"
            playsInline
          />
        </div>
        <button onClick={() => this.stop()}>stop</button>
      </div>
    );
  }
}
