// AddToCart.js
import React from 'react';
import './style.css';


const AddToCart = () => {

  return (
    <div className="addToCartContainer">
      <h2>Add to Cart</h2>
      {/* Product details */}
      <div className="productDetails">
        <img src="product-image.jpg" alt="Product" />
        <div className="details">
          <h3>Product Name</h3>
          <p>Description lorem ipsum dolor sit amet.</p>
          <p>$19.99</p>
        </div>
      </div>

      {/* Quantity input */}
      <div className="quantityInput">
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
      </div>

      {/* Add to Cart button */}
      <button className="addToCartButton" >Add to Cart</button>
      
    </div>
  );
};

export default AddToCart;
