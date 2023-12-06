import React from 'react'
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

export default function HeaderTop() {
    return (
        <div className="header-top">
            <div className="container">
                <ul className="header-social-container">
                    <li>
                        <a href="#" className="social-link">
                            <FaFacebookF />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="social-link">
                            <FaTwitter />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="social-link">
                            <FaInstagram />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="social-link">
                            <FaLinkedinIn />
                        </a>
                    </li>
                </ul>
                <div className="header-alert-news">
                    <p>
                        <b>Free Shipping</b>
                        This Week Order Over - ₹555
                    </p>
                </div>
                <div className="header-top-actions">
                    <select name="currency">
                        <option value="rupee">RUPEE ₹</option>
                    </select>
                    <select name="language">
                        <option value="en-US">English</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
