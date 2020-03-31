import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthContext from './context/auth-context';
import './App.css';

// import AuthPage from './components/auth/Auth';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import MainNavigation from './components/layout/MainNavigation';
import Navbar from './components/layout/Navbar';
// import ProductsPage from './components/products/ProductsPage';
import CreateProduct from './components/create-product/CreateProduct';
import ShowProducts from './components/show-products/ShowProducts';


class App extends Component {
  state = {
    token: null,
    userId: null,
    userRole: null,
  };

  login = (token, userId, userRole, tokenExpiration) => {
    this.setState({ token: token, userId: userId, userRole: userRole });
  };

  logout = () => {
    this.setState({ token: null, userId: null, userRole: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              userRole: this.state.userRole,
              login: this.login,
              logout: this.logout
            }}
          >
            <Navbar />
            <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/products" exact />}


                {this.state.token && <Redirect from="/register" to="/products" exact />}
                {this.state.token && <Redirect from="/login" to="/products" exact />}

                {!this.state.token && <Redirect from="/" to="/register" exact />}
                {!this.state.token && (<Route path="/register" component={Register} />)}
                {!this.state.token && (<Route path="/login" component={Login} />)}

                {(!this.state.token || this.state.userRole !== "Business") && <Redirect from="/create-product" to="/register" exact />}
                {(this.state.token && this.state.userRole === 'Business') && (<Route path="/create-product" component={CreateProduct} />)}

                <Route path="/products" component={ShowProducts} />
                {!this.state.token && <Redirect to="/register" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;