import React, { Component } from 'react';
import { Router, Header } from './Components';

import './App.css';

const Footer = () => <div className="footer"></div>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveStream: null,
      publicId: null,
      url: null,
      
    };
    this.updateStore = this.updateStore.bind(this);
  }

  updateStore(options){
    this.setState({...options});
  }

  render() {
    //const { routes, location } = this.props;
    return (
      <div id="app" className="bg app-container">
        <Header />
        <Router updateStore={this.updateStore} values={this.state}/>
        <Footer />
      </div>
    );
  }
}

export default App;
