import React from 'react';
import { inject, observer } from 'mobx-react';
import { Page, Share } from '../../Components';
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

const InvitePage = props => {
  const path = getPath(props.store.publicId, props.location);
  return (
    <Page className="text-white">
      <Title />
      <Url url={path} />
      <Share url={path} className="mt-20"/>
      <Stream {...props} />
    </Page>
  );
};

export default inject('store')(observer(InvitePage));
