import React from 'react';
import { inject, observer } from 'mobx-react';
import { Page } from '../../Components';
import { Title, Url, Share, Stream } from './Partials';

import './InvitePage.css';

const InvitePage = class extends React.Component {
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
    return (
      <Page className="text-white">
      <Title/>
      <Url url={this.getPath()}/>
      <Share url={this.getPath()}/>
      <Stream {...this.props}/>
      </Page>
    );
  }
};

export default inject('store')(observer(InvitePage));

/*
      <Url url={this.getPath()}/>
      <Share url={this.getPath()}/>
      <Stream {...this.props}/>


        <Col xs={12} className="center title-top">
          <h4>Invite people to watch your live stream</h4>
        </Col>
        <Col xs={12} className="center">
        <hr />
        </Col>

        
        <Col xs={12}>
          <p>URL</p>
          <div className="border-bottom-orange">
            <p className="text-orange push-down">{this.getPath()}</p>
          </div>
        </Col>
          <Col xs={12} className="center">
            <CopyToClipboard text={this.getPath()}>
              <Button>Copy link to clipboard</Button>
            </CopyToClipboard>
          </Col>

          <Col xs={12} className="center">
          <div className="space-above">
            <hr />
            <p className="text-small">
              Clicking the button below will start your streaming session. Are
              you ready to go live?
            </p>
            <NavButton to="/videorecorder" history={history}>
              Start Streaming
            </NavButton>
          </div>
          </Col>
      </Page>

*/
