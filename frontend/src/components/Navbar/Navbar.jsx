/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { useStores } from "../../contexts/storeContext";
function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { cartItem } = useStores();
  console.log(cartItem);

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
            <img src={assets.basket_icon} alt="" />
          </NavLink>

          <div className="dot"></div>
        </div>

        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
}

export default Navbar;
