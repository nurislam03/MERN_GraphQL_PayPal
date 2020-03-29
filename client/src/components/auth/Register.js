import React, { Component } from 'react';
import '../../App.css';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.roleEl = React.createRef();
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
    const role = this.roleEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
        query: `
        mutation {
            createUser(userInput: {role: "${role}", email: "${email}", password: "${password}"}) {
            _id
            role
            email
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your account
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

                  <div className="form-group">
                    <select
                        type="role"
                        className="form-control form-control-lg"
                        placeholder="Role"
                        id="role"
                        ref={this.roleEl}
                      >
                       <option>Role</option>
                       <option>Business</option>
                       <option>User</option>
                    </select>
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