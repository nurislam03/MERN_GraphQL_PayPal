import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';


class CreateProduct extends Component {
    state = {
      creating: false,
      isLoading: false,
      selectedEvent: null
    };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
  }

  submitHandler = event => {
    event.preventDefault();
    // this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
          mutation {
            createProduct(productInput: {title: "${title}", price: ${price}, date: "${date}"}) {
              _id
              title
              date
              price
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
                <div className="create-product">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">Create Product</h1>
                      <p className="lead text-center">
                        Add New Product
                      </p>
                      <form noValidate onSubmit={this.submitHandler}>

                        <div className="form-group">
                          <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Product Titile"
                              id="title"
                              ref={this.titleElRef}
                           />
                        </div>
                        <div className="form-group">
                          <input
                              type="number"
                              className="form-control form-control-lg"
                              placeholder="Price"
                              id="price"
                              ref={this.priceElRef}
                           />
                        </div>

                        <div className="form-group">
                          <input
                              type="date"
                              className="form-control form-control-lg"
                              placeholder="Date"
                              id="date"
                              ref={this.dateElRef}
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

export default CreateProduct;