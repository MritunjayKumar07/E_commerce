import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo/logo.png";
import {
  FaSearch,
  FaTimes,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaHome,
  FaGripVertical,
} from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import HeaderTop from "./Header/HeaderTop";
import { MenuCategories } from "../server/ApiMenu";
import { MirchMasalaProduct } from "../server/Api_MirchMasalaProduct";
import { Link, useNavigate } from "react-router-dom";
import DilogBox from "./DilogBox";

const Search = ({ products, closeDialog }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setIsOpen(query ? true : false);

    const results = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.title.toLowerCase().includes(query) ||
        product.spacel.toLowerCase().includes(query) ||
        product.category.some((cat) => cat.toLowerCase().includes(query)) ||
        product.keyWords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        ) ||
        product.originalPrice.toString().includes(query) ||
        product.discountedPrice.toString().includes(query)
      );
    });

    setSearchResults(results);
  };

  return (
    <div className="header-search-container">
      <input
        type="text"
        placeholder="Search it..."
        className="search-field"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      />
      {isOpen ? (
        <ul
          className="search_dilog"
          style={{
            zIndex: 9999,
            position: "absolute",
            marginTop: 15,
            marginBottom: 15,
            background: "#fff",
            width: "100%",
            borderRadius: 15,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#000",
            padding: 10,
          }}
        >
          <div
            style={{
              background: "#000",
              color: "#fff",
              display: "flex",
              borderRadius: 15,
              paddingRight: 10,
              alignItems: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            <input
              type="text"
              placeholder="Search it..."
              className="search-field"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ background: "#000", color: "#fff", border: "none", }}
            />{" "}
            <FaSearch
              style={{
                fontSize: 22,
                cursor: "pointer",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            />
            <FaTimes
              style={{ fontSize: 22, cursor: "pointer" }}
              onClick={() => {
                setIsOpen(false);
                setSearchQuery("");
                closeDialog(); // Call closeDialog function passed as prop
              }}
            />
          </div>

          {searchResults.map((result) => (
            <li key={result.id}>
              <Link
                onClick={() => {
                  setIsOpen(false);
                  closeDialog();
                }}
                to={`/ProductDetail/${result.id}`}
                key={result.id}
                className="showcase"
                style={{
                  margin: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <img
                  src={logo}
                  alt={result.title}
                  width="95"
                  height="90"
                  style={{
                    marginRight: "20px",
                    borderRadius: "4px",
                  }}
                />
                <div>
                  <a href="#">
                    <h4 style={{ marginBottom: "5px", color: "#000" }}>
                      {result.name}
                    </h4>
                  </a>
                  <p href="#">{result.title}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p style={{ fontWeight: "bold", color: "#4caf50" }}>
                      {result.discountedPrice}
                    </p>
                    <del style={{ color: "#757575" }}>
                      {result.originalPrice}
                    </del>
                  </div>
                </div>
              </Link>
              {/* Add other fields you want to display */}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default function Header() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogName, setisDialogName] = useState("");
  const [heart, setHeart] = useState(0);
  const [bagCount, setBagCount] = useState(0);
  const navigate = useNavigate();

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const handleMenuTitleClick = (title) => {
    const filteredProduct = title
      ? MirchMasalaProduct.filter((product) => product.name === title)
      : [];
    if (filteredProduct.length > 0) {
      const category = filteredProduct[0].category;
      navigate(`/Products/${category[0]}`);
    } else {
      console.error(`Product with name ${title} not found.`);
    }
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      const cartItems = await localStorage.getItem("MirchMasalaCart");
      const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
      setBagCount(parsedCartItems.length);
    };

    const fetchLikeHeart = async () => {
      const cartItems = await localStorage.getItem("MirchMasalaLikeCart");
      const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];
      setHeart(parsedCartItems.length);
    };

    fetchCartCount();
    fetchLikeHeart();
    const intervalId = setInterval(() => {
      fetchCartCount();
      fetchLikeHeart();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [heart, bagCount]);

  return (
    <>
      <header>
        <HeaderTop />
        <div className="header-main">
          <div className="container">
            <Link to="/" className="header-logo">
              <img src={logo} alt="Anon's logo" width="86" />
            </Link>
            <Search products={MirchMasalaProduct} closeDialog={closeDialog} />
            <div className="header-user-actions">
              <button
                className="action-btn"
                onClick={() => {
                  setisDialogName("Heart Bag");
                  openDialog();
                }}
              >
                <FaHeart fontSize={29} />
                {heart ? <span className="count">{heart}</span> : ""}
              </button>

              <button
                className="action-btn"
                onClick={() => {
                  setisDialogName("Shopping Bag");
                  openDialog();
                }}
              >
                <FaShoppingBag fontSize={29} />
                {bagCount ? <span className="count">{bagCount}</span> : ""}
              </button>

              <button
                className="action-btn"
                onClick={() => navigate("/UserDashboard")}
              >
                <FaUser fontSize={29} />
              </button>
            </div>
          </div>
        </div>
        <nav className="desktop-navigation-menu">
          <div className="container">
            <ul className="desktop-menu-category-list">
              {MenuCategories.map((category) => (
                <li key={category.id} className="menu-category">
                  <a
                    onClick={() => {
                      if (category.title === "Home") navigate(category.link);
                    }}
                    href="#"
                    className="menu-title"
                  >
                    {category.title}
                  </a>
                  {category.subcategories && (
                    <div className="dropdown-panel" style={{ width: "auto" }}>
                      {category.subcategories.map((subcategory) => (
                        <ul
                          key={subcategory.items[0].title}
                          className="dropdown-panel-list"
                          style={{ width: "auto" }}
                        >
                          <li className="menu-title">
                            <a href="#">{subcategory.items[0].title}</a>
                          </li>
                          {subcategory.items.map((item) => (
                            <li
                              key={item.title}
                              className="panel-list-item"
                              style={{ width: "auto" }}
                            >
                              {item.image ? (
                                <a href="#">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    width="250"
                                    height="119"
                                  />
                                </a>
                              ) : (
                                <a
                                  onClick={() =>
                                    handleMenuTitleClick(item.title)
                                  }
                                  style={{
                                    width: "auto",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer",
                                  }}
                                >
                                  {item.title}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mobile-bottom-navigation">
          <button className="action-btn" onClick={() => navigate("/")}>
            <FaHome />
          </button>
          <button
            className="action-btn"
            onClick={() => {
              setisDialogName("Shopping Bag");
              openDialog();
            }}
          >
            <FaShoppingBag />
            {bagCount ? <span className="count">{bagCount}</span> : ""}
          </button>
          <button
            className="action-btn"
            onClick={() => {
              setisDialogName("Heart Bag");
              openDialog();
            }}
          >
            <FaHeart />
            {heart ? <span className="count">{heart}</span> : ""}
          </button>
          <button
            className="action-btn"
            onClick={() => navigate("/UserDashboard")}
          >
            <FaUser />
            <span className="count">0</span>
          </button>
        </div>
      </header>
      <DilogBox
        isOpen={isDialogOpen}
        closeDialog={closeDialog}
        dilogName={isDialogName}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            lineHeight: 0.8,
          }}
        >
          <h2>{isDialogName}</h2>
          <GrClose
            onClick={closeDialog}
            style={{ cursor: "pointer", fontWeight: 900 }}
          />
        </div>
        <br />
        <hr />
      </DilogBox>
    </>
  );
}
