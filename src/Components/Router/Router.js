import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { MainPage, InvitePage, VideoPlayerPage, VideoRecorderPage, DonePage } from '../Components';

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
        render={props => <VideoPlayerPage {...routerProps} {...props} />}
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

export default props => {
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => (
          <PoseGroup>
            <RoutesContainer key={location.pathname + location.key}>
              <Routes location={location} {...props} />
            </RoutesContainer>
          </PoseGroup>
        )}
      />
    </BrowserRouter>
  );
};
