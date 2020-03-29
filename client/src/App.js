import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';

// import AuthPage from './components/auth/Auth';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import MainNavigation from './components/layout/MainNavigation';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/register" exact />
              <Route path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route path="/product" component={null} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;