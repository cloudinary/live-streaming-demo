import React, { Component } from 'react';
import { Router, Header } from './Components';

import './App.css';

const Footer = () => <div className="footer"></div>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateInvite = this.updateInvite.bind(this);
  }

  updateInvite(options){
    console.log("UPDATEING!!!!!!!!!!!!!!!!!!!!!!!!!!!!:", options);
    this.setState({...options});
  }

  render() {
    //const { routes, location } = this.props;
    return (
      <div id="app" className="bg app-container">
        <Header />
        <Router updateInvite={this.updateInvite} values={this.state}/>
        <Footer />
      </div>
    );
  }
}

export default App;
