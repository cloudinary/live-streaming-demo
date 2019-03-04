import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { MainPage, InvitePage } from '../Components';

const RoutesContainer = posed.div({
  enter: { opacity: 1, delay: 300 },
  exit: { opacity: 0 }
});

const Routes = ({ location, updateStore, values }) => {
  return (
    <Switch location={location}>
      <Route
        exact
        path="/"
        render={props => <MainPage {...props} updateStore={updateStore} />}
        key="home"
      />
      <Route
        path="/invite"
        render={props => <InvitePage values={values} />}
        key="invite"
      />
      <Route
        path="/videoplayer"
        render={props => <VidePlayerPage values={values} />}
        key="videoplayer"
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
