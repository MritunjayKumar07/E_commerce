import React from 'react';
import { Banner } from '../server/ApiBanner';

export default function Banners() {
    return (
        <>
            <div className="banner">
                <div className="container">
                    <div className="slider-container has-scrollbar">
                        {Banner.map((item, index) => (
                            // Check if the banner_img exists or not if yes then render.
                            item.banner_img && (
                                <div key={index} className="slider-item">
                                    <img src={item.banner_img} alt={item.banner_img_alt} className="banner-img" />
                                    <div className="banner-content">
                                        <p className="banner-subtitle">{item.banner_subtitle}</p>
                                        <h2 className="banner-title">{item.banner_title}</h2>
                                        <p className="banner-text">
                                            starting at &dollar; <b>{item.banner_text}</b>
                                        </p>
                                        <a href={item.link} className="banner-btn">
                                            {item.banner_btn}
                                        </a>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
