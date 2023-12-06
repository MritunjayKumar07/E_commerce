import React from 'react'
import { MirchMasalaProduct } from '../../server/Api_MirchMasalaProduct';
import image from '../../assets/images/products/pizza.svg'
import { Link } from 'react-router-dom';

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
                                MirchMasalaProduct.filter(product => product.spacel === category),
                                4
                            ).map((row, rowIndex) => (
                                <div key={rowIndex} className="showcase-container">
                                    {row.map(product => (
                                        <Link to={`/Product/${product.id} `} key={product.id} className="showcase">
                                            <a href="#" className="showcase-img-box">
                                                <img
                                                    src={image}
                                                    alt={product.title}
                                                    className="showcase-img"
                                                    width="70"
                                                    height="90"
                                                />
                                            </a>
                                            <div className="showcase-content">
                                                <a href="#">
                                                    <h4 className="showcase-title">{product.name}</h4>
                                                </a>
                                                <a href="#" className="showcase-category">
                                                    {product.title}
                                                </a>
                                                <div className="price-box">
                                                    <p className="price">{product.discountedPrice}</p>
                                                    <del>{product.originalPrice}</del>
                                                </div>
                                            </div>
                                        </Link>
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
