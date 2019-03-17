import React from 'react';
import { inject, observer } from 'mobx-react';
import { Page, Share, Loader } from '../../Components';
import { Row, Col } from 'reactstrap';
import { Title, Url, Stream } from './Partials';

const Invite = class extends React.Component {
  componentDidMount() {
    this.props.store.initLiveStream(this.props.location.pathname);
  }

  render() {
    const { store } = this.props;
    const { url, errorStr: error} = store;

    if (store.loading) {
      return (
        <Page>
          <Loader text="Initializing the live streaming session..." />
        </Page>
      );
    }

    return (
      <Page className="text-white">
        <Title />
        <Url url={url} />
        <Share url={url} className="mt-20" />
        <Col xs="12" className="button-bottom">
        <Row className="">
          <p>{error}</p>
        </Row>
        </Col>
        <Stream {...this.props} />
      </Page>
    );
  }
};

export default inject('store')(observer(Invite));
