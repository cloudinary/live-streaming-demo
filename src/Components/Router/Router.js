import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import posed, { PoseGroup } from 'react-pose';
import {
  MainPage,
  InvitePage,
  VideoPlayerPage,
  VideoRecorderPage,
  DonePage
} from '../../Pages';

const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 }
});

const Routes = routerProps => {
  return (
    <Switch location={routerProps.location}>
      <Route
        exact
        path="/"
        render={props => <MainPage {...props} {...routerProps} />}
        key="home"
      />
      <Route
        path="/invite"
        render={props => <InvitePage {...props} {...routerProps} />}
        key="invite"
      />
      <Route
        path="/videorecorder"
        render={props => <VideoRecorderPage {...props} {...routerProps} />}
        key="videorecorder"
      />
      <Route
        path="/videoplayer/:publicId"
        render={props => <VideoPlayerPage {...props} {...routerProps} />}
        key="videoplayer"
      />
      <Route
        path="/done"
        render={props => <DonePage {...props} {...routerProps} />}
        key="done"
      />
      <Route
        path="/:other"
        render={props => <MainPage {...props} {...routerProps} />}
        key="other"
      />
    </Switch>
  );
};

const Router = props => {
  const { startedAtMainPage } = props.store;
  const {history} = props;
  const basename = window.location.href.includes('/live') ? '/live' : '/'
  return (
    <BrowserRouter history={history} basename={basename}>
      <Route
        render={({ location }) => {
          const { pathname } = location;

          //redirect to main page if we're not livestriming or playing a video.
          if (!startedAtMainPage && !(pathname === '/' || pathname === basename+'/') && !pathname.includes('/videoplayer/')) {
           return <Redirect to="/"/>
          }

          return (
            <PoseGroup>
              <RoutesContainer key={location.pathname + location.key}>
                <Routes
                  {...props}
                  location={location}
                />
              </RoutesContainer>
            </PoseGroup>
          );
        }}
      />
    </BrowserRouter>
  );
};

export default inject('store')(observer(Router));
