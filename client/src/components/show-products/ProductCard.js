import React from 'react';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import '../../App.css';

const ProductCard = (props, index) => {
    const  product  = props.product;

    return(
        <div className="card-container">
            {/* <img src="" alt="" /> */}
            <div className="desc">
                <h1>
                    <Link to={`/buy-product/${product._id}`}>
                        { product.title }
                    </Link>
                </h1>
                <h3>Price: $ { product.price }</h3>
                <hr /> <br />
                <button>Buy Product</button>
            </div>
        </div>
    )
};

export default ProductCard;