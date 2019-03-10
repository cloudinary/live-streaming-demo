import React from 'react';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import posed, { PoseGroup } from 'react-pose';
import { MainPage, InvitePage, VideoPlayerPage, VideoRecorderPage, DonePage } from '../../Pages';

const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 }
});

const Routes = withRouter(routerProps => {
  const {pathname} = routerProps.location;
  const {url} = routerProps.store;

  if (!url && pathname !== '/' ) {
    routerProps.history.push('/');
    return null;
  }
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
});

const Router = props => {
  return (
    <BrowserRouter history={props.history}>
      <Route
        render={({ location }) => (
          <PoseGroup>
            <RoutesContainer key={location.pathname + location.key}>
              <Routes location={location} {...props} history={props.history} />
            </RoutesContainer>
          </PoseGroup>
        )}
      />
    </BrowserRouter>
  );
};

export default inject('store')(observer(Router));
