import React from 'react';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import '../../App.css';

import PaypalCheckoutButton from '../payment/PaypalCheckoutButton';

const ProductCard = (props, index) => {
    const  product  = props.product;

    const order = {
        customer: product.creator._id,
        total: product.price,
        items: [
          {
            sku: '001',
            name: product.title,
            price: product.price,
            quantity: 1,
            currency: 'USD'
          }
        ],
      };

    return(
        <div className="card-container">
            {/* <img src="" alt="" /> */}
            <div className="desc">
                <h2>
                    <Link to={`/buy-product/${product._id}`}>
                        { product.title }
                    </Link>
                </h2>
                <h3>Price: $ { product.price }</h3>
                {/* <hr /> <br /> */}
                <PaypalCheckoutButton order={order} />
                {/* <p>
                    <Link to={`/buy-product/${product._id}`}>
                        Buy
                    </Link>
                </p> */}
            </div>
        </div>
    )
};

export default ProductCard;