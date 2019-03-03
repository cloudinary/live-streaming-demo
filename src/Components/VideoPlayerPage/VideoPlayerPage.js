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
    this.state = { ...props.values };
    this.startLiveStream = this.startLiveStream.bind(this);
    this.stop = this.stop.bind(this);
  }

  startLiveStream() {
    const { liveStream, publicId } = this.state;
    liveStream.start(publicId);
    //this.setState(state => state);
  }

  stop() {
    const { liveStream } = this.state;
    liveStream.stop();
  }

  render() {
    return <div />;
  }
}
