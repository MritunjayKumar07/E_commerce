import React from 'react'
import { ProductsApi } from '../../server/ApiProduct';

export default function ProductMinimal() {
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };
    return (
        <>
            {
                ['New Arrivals', 'Trending', 'Top Rated'].map((category, index) => (
                    <div key={index} className="product-showcase">
                        <h2 className="title">{category}</h2>
                        <div className="showcase-wrapper has-scrollbar">
                            {chunkArray(
                                ProductsApi.filter(product => product.title === category),
                                4
                            ).map((row, rowIndex) => (
                                <div key={rowIndex} className="showcase-container">
                                    {row.map(product => (
                                        <div key={product.id} className="showcase">
                                            <a href="#" className="showcase-img-box">
                                                <img
                                                    src={product.image}
                                                    alt={product.showcaseTitle}
                                                    className="showcase-img"
                                                    width="70"
                                                    height="90"
                                                />
                                            </a>
                                            <div className="showcase-content">
                                                <a href="#">
                                                    <h4 className="showcase-title">{product.showcaseTitle}</h4>
                                                </a>
                                                <a href="#" className="showcase-category">
                                                    {product.showcaseCategory}
                                                </a>
                                                <div className="price-box">
                                                    <p className="price">{product.price}</p>
                                                    <del>{product.del}</del>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
        </>
    )
}
