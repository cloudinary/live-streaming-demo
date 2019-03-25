import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { getBaseName } from './Utils/Routing';
import { RoutesAnimator } from './Components';



import './App.css';

/**
 * App contains a router that switches between pages.
 */
const App = props => (
  <div id="app" className="bg app-container">
    <BrowserRouter history={props.history} basename={getBaseName()}>
      <Route component={RoutesAnimator} />
    </BrowserRouter>
  </div>
);
export default App;
