import React from 'react';
import { Page, NavButton } from '../../Components';
import { inject, observer } from 'mobx-react';
import { Title, Effects, Social } from './Partials';
import './Home.css';
window.ga('send', 'pageview');

/**
 * Home page
 * Displays options for starting a new video stream.
 */
class Home extends React.Component {
  componentDidMount() {
    this.props.store.setStartedAtMainPage();
    if (this.props.store.needRestart) {
      this.props.store.resetStore();
    }
  }

  render() {
    const { history } = this.props;

    return (
      <Page>
        <Title />
        <Effects />
        <Social />
        <NavButton cls="button-round" to="/invite" history={history}>
          →
        </NavButton>
      </Page>
    );
  }
}

export default inject('store')(observer(Home));
