import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Home,
    Invite,
    VideoPlayer,
    VideoRecorder,
    Done
  } from '../../Modules';

/**
 * Route switcher
 * @param location - route is chosen based on the location
 * @return {*} the component to render
 * @constructor
 */
const Routes = ({location}) => {
  return (
    <Switch location={location}>
        <Route
          exact
          path="/"
          key="home"
          component={Home}
        />
        <Route
          path="/invite"
          key="invite"
          component={Invite}
        />
        <Route
          path="/videorecorder"
          key="videorecorder"
          component={VideoRecorder}
        />
        <Route
          path="/videoplayer/:publicId"
          key="videoplayer"
          component={VideoPlayer}
        />
        <Route
          path="/done"
          key="done"
          component={Done}
        />
        <Route
          path="/:other"
          key="other"
          component={Home}
        />
      </Switch>
  );
};

export default Routes;