import React from 'react';

import ProductItem from './ProductItem';
import './ProductList.css';

const productList = props => {
  const products = props.products.map(product => {
    return (
      <ProductItem
        key={product._id}
        productId={product._id}
        title={product.title}
        price={product.price}
        date={product.date}
        userId={product.authUserId}
        creatorId={product.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="product__list">{products}</ul>;
};

export default productList;