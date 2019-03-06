import React from 'react';
import { Page, NavButton } from '../Components';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { inject, observer } from 'mobx-react';

import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

//import './DonePage.css';

const DonePage = class extends React.Component {
  constructor(props) {
    super(props);
    if (!props.store.url) {
      props.history.push('/');
    }

    this.getPath = this.getPath.bind(this);
  }

  getPath() {
    const { publicId } = this.props.store;
    let path = window.location.href.replace(this.props.location.pathname, '');
    path += `/videoplayer/${publicId}`;
    return path;
  }

  render() {
    const { publicId, url } = this.props.store;
    const { history } = this.props;
    return (
      <Page className="text-white">
        <Col xs={12} className="center title-top">
          <div>Video Title</div>
          <div>Live Stream Ended</div>
          <div>Share</div>
          <div>Watch Again</div>
          <div>
            <Link to="/">New Stream</Link></div>

          <div>Cloudinary Logo</div>
          <div>Read more @ Cloudinary</div>
          <div>SING UP FOR FREE BUTTON</div>
        </Col>
      </Page>
    );
  }
};

export default inject('store')(observer(DonePage));
