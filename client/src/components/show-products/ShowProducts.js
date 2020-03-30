import React, { Component } from 'react';
import AuthContext from '../../context/auth-context';
import Spinner from '../common/Spinner/Spinner';
import ProductCard from './ProductCard';

class ShowProducts extends Component {
    state = {
      products: [],
      isLoading: false,
      selectedProduct: null
    };
    // isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchProducts();
  }

//   constructor(props) {
//     super(props);
//     this.titleElRef = React.createRef();
//     this.priceElRef = React.createRef();
//     this.dateElRef = React.createRef();
//   }

//   switchModeHandler = () => {
//     this.setState({ creating: true });
//   };

fetchProducts() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            products {
              _id
              title
              price
              date
              creator {
                _id
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

  render() {
    return (
        <React.Fragment>
            {this.state.isLoading ? (
                <Spinner />
                ) : (
                <div className="ShowProducts">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <br />
                                <h2 className="display-4 text-center">List of Products</h2>
                            </div>
                        </div>


                        <div className= "list">
                            {/* return ( */}
                                <React.Fragment>
                                    {this.state.products.map((product, index) => (
                                        <ProductCard key={index} product={product} />
                                    ))}
                                </React.Fragment>
                            {/* ); */}
                        </div>

                    </div>
                </div>
            )}
        </React.Fragment>
      );


  }
}

export default ShowProducts;