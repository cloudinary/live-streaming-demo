import React from 'react';
import {inject, observer} from 'mobx-react';
import {Col} from 'reactstrap';
import {Page, Share, Loader} from '../../Components';
import {Title, Url, Stream} from './Partials';

const Invite = class extends React.Component {
  componentDidMount() {
    this.props.store.initLiveStream(this.props.location.pathname);
  }

  render() {
    const {store} = this.props;
    const {url, errorStr: error, loading} = store;

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
      <Page className="text-white">
        <Title/>
        <Url url={url}/>
        <Share url={url} className="mt-20"/>
        <Stream {...this.props} />
      </Page>
    );
  }
};

export default inject('store')(observer(Invite));
