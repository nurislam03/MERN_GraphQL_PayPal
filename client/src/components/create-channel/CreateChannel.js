import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';

class CreateChannel extends Component {
    state = {
      creating: false,
      isLoading: false,
    };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.sandboxElRef = React.createRef();
  }

//   switchModeHandler = () => {
//     this.setState({ creating: true });
//   };

  submitHandler = event => {
    event.preventDefault();
    // this.setState({ creating: false });
    const sandbox = this.sandboxElRef.current.value;


    if (
      sandbox.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
          mutation {
            createPaymentChannel(paymentChannelInput: {sandbox: "${sandbox}"}) {
              _id
              sandbox
              user {
                _id
              }
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:8082/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
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
        return resData
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
        <React.Fragment>
            {this.context.token && (
                <div className="create-PaymentChannel">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">Add PayPal Business Channel</h1>
                      <p className="lead text-center">
                        Provide your paypal busines sandbox client id.
                      </p>
                      <form noValidate onSubmit={this.submitHandler}>

                        <div className="form-group">
                          <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Sandbox Client Id"
                              id="sandbox"
                              ref={this.sandboxElRef}
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
            )}
        </React.Fragment>
      );


  }
}

export default CreateChannel;