import React, { Component } from 'react';
import '../../App.css';

import AuthContext from '../../context/auth-context';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `
    };

    fetch('http://localhost:8082/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign In to your account
                </p>
                <form noValidate onSubmit={this.submitHandler}>

                  <div className="form-group">
                    <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        id="email"
                        ref={this.emailEl}
                     />
                  </div>
                  <div className="form-group">
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        id="password"
                        ref={this.passwordEl}
                     />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-dark btn-block mt-4">Submit</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      );


  }
}

export default AuthPage;