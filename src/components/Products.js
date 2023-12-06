import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";

import { getProduct } from '../server/api';
import ProductMinimal from './Products/ProductMinimal';
import ShowcaseContainer from './Products/ShowcaseContainer';
import DealOfThe from './Products/DealOfThe';
import MainProduct from './Products/MainProduct';
import SideBar from './Products/SideBar';

export default function Products() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
        setProductData(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="product-container">

      <div className="container">

        <div className="sidebar  has-scrollbar" data-mobile-menu>

          <div className="sidebar-category">
            <div className="sidebar-top">
              <h2 className="sidebar-title">Category</h2>
              <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                <IoIosCloseCircle />
              </button>
            </div>
            <SideBar />
          </div>

          <div className="product-showcase">
            <h3 className="showcase-heading">best sellers</h3>
            <div className="showcase-wrapper">
              <div className="showcase-container">
                <ShowcaseContainer />
              </div>
            </div>
          </div>
        </div>

        <div className="product-box">
          {/*- PRODUCT MINIMAL-*/}
          <div className="product-minimal">
            <ProductMinimal />
          </div>

          {/* - PRODUCT FEATURED-*/}

          <div className="product-featured">
            <h2 className="title">Deal of the day</h2>
            <div className="showcase-wrapper has-scrollbar">
              <DealOfThe />
            </div>
          </div>
          {/*- PRODUCT GRID*/}
          <MainProduct />

        </div>

      </div>

    </div>
  )
}
