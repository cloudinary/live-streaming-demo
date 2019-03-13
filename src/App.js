import React, { Component } from 'react';
import { Router, Header } from './Components';

import './App.css';

const Footer = () => <div className="footer"></div>;

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="app" className="bg app-container">
        <Header />
        <Router />
        <Footer />
      </div>
    );
  }
}

export default App;
