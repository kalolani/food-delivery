/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-scroll";
import { NavLink, useNavigate } from "react-router-dom";
import { useStores } from "../../contexts/storeContext";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { cartItem, getTotalCartAmount, token, setToken, cartNumber } =
    useStores();

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <NavLink to="/">
          <img src={assets.logo} alt="" className="logo" />
        </NavLink>
      </div>
      <ul className="navbar-menu">
        <Link
          to="/"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <Link
          to="menu"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </Link>
        <Link
          to="food-display"
          spy={true}
          smooth={true}
          offset={-10}
          duration={500}
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          dishes
        </Link>
        <Link
          to="footer"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          contact
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="navbar-logo" />

        <div className="navbar-search-icon">
          <NavLink to="/cart">
            <img src="cart-1.png" className="cart" alt="" />
          </NavLink>

          <div className={getTotalCartAmount() > 0 ? "dot" : ""}>
            {" "}
            <p className="cartNumber"> {cartNumber}</p>
          </div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src="user-profile.png" className="profile-icon" alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
