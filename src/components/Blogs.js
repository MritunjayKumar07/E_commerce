import React from 'react'
import { Blog } from '../server/ApiBlog'

export default function Blogs() {
    return (
        <div className="blog">

            <div className="container">

                <div className="blog-container has-scrollbar">
                    {Blog.map((item, index) => (
                        item.Blog_img && (
                            <div className="blog-card" key={index}>
                                <a href="#">
                                    <img src={item.Blog_img} alt={item.Blog_Img_Alt} width="300" className="blog-banner" />
                                </a>
                                <div className="blog-content">
                                    <a href="#" className="blog-category">{item.Blog_Category}</a>
                                    <a href="#">
                                        <h3 className="blog-title">{item.Blog_Title}</h3>
                                    </a>
                                    <p className="blog-meta">
                                        By <cite>{item.Blog_Meta}</cite> / <time datetime="2022-04-06">{item.DateTime}</time>
                                    </p>
                                </div>
                            </div>
                        )
                    ))}
                </div>

            </div>

        </div>
    )
}
