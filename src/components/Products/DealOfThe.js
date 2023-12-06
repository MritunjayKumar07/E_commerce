import React, { useState } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Deal } from '../../server/DealOfDay'


export default function DealOfThe() {
    const [value, setValue] = useState(Deal.sold);

    return (
        <>
            {Deal.map((item) => (
                <div className="showcase-container" key={item.id}>
                    <div className="showcase">
                        <div className="showcase-banner">
                            <img src={item.images[0]} alt={item.title} className="showcase-img" />
                        </div>

                        <div className="showcase-content">
                            <div className="showcase-rating">
                                {[...Array(5)].map((star, index) => (
                                    <span key={index}>
                                        {index + 1 <= item.rating ? <FaStar /> : index + 0.5 === item.rating ? <FaStarHalfAlt /> : <FaRegStar />}
                                    </span>
                                ))}
                            </div>

                            <h3 className="showcase-title">
                                <a href="#" className="showcase-title">{item.name}</a>
                            </h3>
                            <h4 className="showcase-title">
                                <a href="#" className="showcase-title">{item.title}</a>
                            </h4>

                            <p className="showcase-desc">{item.description}</p>

                            <div className="price-box">
                                <p className="price">${item.originalPrice}</p>
                                <del>${item.discountedPrice}</del>
                            </div>

                            <button className="add-cart-btn">add to cart</button>

                            <div className="showcase-status">
                                <div className="wrapper">

                                    <p> already sold: <b>{item.sold}</b> </p>
                                    <p> available: <b>{item.available}</b> </p>
                                </div>
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    step={5}
                                    value={item.sold}
                                    readOnly
                                    className="custom-slider-dealDay"
                                />
                            </div>

                            <div className="countdown-box">
                                <p className="countdown-desc">Hurry Up! Offer ends in:</p>
                                <div className="countdown">
                                    {Object.entries(item.countdown).map(([unit, value]) => (
                                        <div className="countdown-content" key={unit}>
                                            <p className="display-number">{value}</p>
                                            <p className="display-text">{unit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
