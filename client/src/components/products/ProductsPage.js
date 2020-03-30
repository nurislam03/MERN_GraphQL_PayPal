import React, { Component } from 'react';

import Modal from '../common/Modal/Modal';
import Spinner from '../common/Spinner/Spinner';
import Backdrop from '../common/Backdrop/Backdrop';

import ProductList from './ProductList';

import AuthContext from '../../context/auth-context';
import './ProductsPage.css';

class ProductsPage extends Component {
  state = {
    creating: false,
    products: [],
    isLoading: false,
    selectedProduct: null
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchProducts();
  }

  startCreateProductHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
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

    const product = { title, price, date };
    console.log(product);

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
        this.setState(prevState => {
          const updatedProducts = [...prevState.products];
          updatedProducts.push({
            _id: resData.data.createProduct._id,
            title: resData.data.createProduct.title,
            date: resData.data.createProduct.date,
            price: resData.data.createProduct.price,
            creator: {
              _id: this.context.userId
            }
          });
          return { products: updatedProducts };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false, selectedProduct: null });
  };

  fetchProducts() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            products {
              _id
              title
              date
              price
              creator {
                _id
                email
              }
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
        const products = resData.data.products;
        this.setState({ products: products, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  showDetailHandler = productId => {
    this.setState(prevState => {
      const selectedProduct = prevState.products.find(e => e._id === productId);
      return { selectedProduct: selectedProduct };
    });
  };

  bookProductHandler = () => {};

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedProduct) && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add New Product"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" id="date" ref={this.dateElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.state.selectedProduct && (
          <Modal
            title={this.state.selectedProduct.title}
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.bookProductHandler}
            confirmText="Book"
          >
            <h1>{this.state.selectedProduct.title}</h1>
            <h2>
              ${this.state.selectedProduct.price} -{' '}
              {new Date(this.state.selectedProduct.date).toLocaleDateString()}
            </h2>
          </Modal>
        )}
        {this.context.token && (
          <div className="products-control">
            <p>Add your own Product!</p>
            <button className="btn" onClick={this.startCreateProductHandler}>
              Create Product
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ProductList
            products={this.state.products}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ProductsPage;