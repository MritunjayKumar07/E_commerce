import React from 'react';
import {categoryData} from '../server/ApiCategory';
export default function Category() {
  return (
    <div className="category">
      <div className="container">
        <div className="category-item-container has-scrollbar">
          {categoryData.map((category) => (
            <div className="category-item" key={category.id}>
              <div className="category-img-box">
                <img src={category.icon} alt={category.name} width="30" />
              </div>
              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">{category.name}</h3>
                  <p className="category-item-amount">({category.amount})</p>
                </div>
                <a href="#" className="category-btn">
                  Show all
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
