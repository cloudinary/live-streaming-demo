import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import createStore from './Store/createStore';

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const store = createStore();

/**
 * Our live streaming demo app starting point.
 * Provides a store to the App component.
 */
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);