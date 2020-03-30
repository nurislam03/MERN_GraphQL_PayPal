import React from 'react';

import './ProductItem.css';

const productItem = props => (
  <li key={props.productId} className="products__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>
        ${props.price} - {new Date(props.date).toLocaleDateString()}
      </h2>
    </div>
    <div>
      {props.userId === props.creatorId ? (
        <p>Your the owner of this product.</p>
      ) : (
        <button className="btn" onClick={props.onDetail.bind(this, props.productId)}>
          View Details
        </button>
      )}
    </div>
  </li>
);

export default productItem;
