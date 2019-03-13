import React from 'react';
import { inject, observer } from 'mobx-react';
import { Page, Share, Loader } from '../../Components';
import { Row } from 'reactstrap';
import { Title, Url, Stream } from './Partials';
import { getPath } from '../../Utils/Routing';

import './InvitePage.css';

/*
const InvitePage = class extends React.Component {
  constructor(props) {
    super(props);
    if (!props.store.url) {
      props.history.push('/');
    }
  }
*/

const InvitePage = class extends React.Component {
  componentDidMount() {
    this.props.store.initLiveStream();
  }

  render() {
    const { store } = this.props;
    const error = store.errorStr;

    if (store.loading) {
      return (
        <Page>
          <Loader text="Initializing the live streaming session..." />
        </Page>
      );
    }

    const path = getPath(this.props.store.publicId, this.props.location);
    return (
      <Page className="text-white">
        <Title />
        <Url url={path} />
        <Share url={path} className="mt-20" />
        <Row className="justify-content-center align-items-center">
          <p>{error}</p>
        </Row>
        <Stream {...this.props} />
      </Page>
    );
  }
};

export default inject('store')(observer(InvitePage));
