import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import posed, { PoseGroup } from 'react-pose';
import { PageWrapper, Routes } from '../Components';
import { getBaseName } from '../../Utils/Routing';

// Fade in/out on route change
const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 }
});

/**
 * Adds fadein/fadeout animation for each route.
 * @param store
 * @param location
 * @return {*}
 * @constructor
 */
const RoutesAnimator = ({ store, location }) => {
  const { startedAtMainPage } = store;
  const { pathname } = location;
  const redirectToMain =
    !startedAtMainPage &&
    !(pathname === '/' || pathname === getBaseName() + '/') &&
    !pathname.includes('/videoplayer/');

  //redirect to home page if we're not live-streaming or playing a video.
  return redirectToMain ? (
    <Redirect to="/" />
  ) : (
    <PageWrapper>
      <PoseGroup>
        <RoutesContainer key={location.pathname + location.key}>
          <Routes location={location} />
        </RoutesContainer>
      </PoseGroup>
    </PageWrapper>
  );
};

export default inject('store')(observer(withRouter(RoutesAnimator)));
