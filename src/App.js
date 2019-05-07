import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router } from 'react-router-dom'
import axios from 'axios';
//import { connect } from 'react-redux';
import routes from './routes';

import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';

export default class App extends Component {
  render() {
    return(
      <Router>
        <div className='App'>
          <Header />
          <Dashboard />
          {/* {routes} */}
        </div>
      </Router>
    )
  }
}

//export default connect(state => ({ user: state.user }))(App);
