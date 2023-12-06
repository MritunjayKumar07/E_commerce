import React from 'react';
import { MirchMasalaProduct } from '../server/Api_MirchMasalaProduct';
import { Link } from 'react-router-dom';

export default function Category() {
  const categoryInfo = {};

  MirchMasalaProduct.forEach((product) => {
    product.category.forEach((category) => {
      if (!categoryInfo[category]) {
        categoryInfo[category] = {
          count: 1,
          id:product.id,
          image: product.images[0],
        };
      } else {
        categoryInfo[category].count++;
      }
    });
  });


  return (
    <div className="category">
      <div className="container">
        <div className="category-item-container has-scrollbar">
          {/* Iterate through the categories and display them */}
          {Object.keys(categoryInfo).map((categoryName) => (
            <Link to={`/ProductCard/${categoryName} `} className="category-item" key={categoryName}>
              <div className="category-img-box">
                <img
                  src={categoryInfo[categoryName].image}
                  alt={categoryName}
                  width="30"
                />
              </div>
              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">{categoryName}</h3>
                  <p className="category-item-amount">
                    {categoryInfo[categoryName].count} items
                  </p>
                </div>
                <a href="#" className="category-btn">
                  See all
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
