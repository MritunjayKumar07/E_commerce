import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeaderTop() {
  const [isUserName, setIsUserName] = useState("");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    if (userData && userData.username) {
      const userName = `${userData.username.split("_")[0]} ${
        userData.username.split("_")[1]
      }`;
      setIsUserName(userName);
    } else {
      setIsUserName(null);
    }
  });

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
          {/* <select name="currency">
            <option value="rupee">Login/SignUp</option>
          </select> */}
          {/* <h5>Login / SignUp</h5> */}
          {isUserName ? (
            <select name="currency" onChange={handleLogout}>
              <option value="Login/Signup">
                <h5 style={{ color: "#000", textTransform: "capitalize" }}>
                  Hello {isUserName}
                </h5>
              </option>
              <option value="Logout">
                <h5 style={{ color: "#000", textTransform: "capitalize" }}>
                  Logout
                </h5>
              </option>
            </select>
          ) : (
            <Link to={"/LoginSignup"}>
              <h5 style={{ color: "#000" }}>Login / SignUp ➔</h5>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
