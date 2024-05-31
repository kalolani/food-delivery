/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-scroll";
import { NavLink, useNavigate } from "react-router-dom";
import { useStores } from "../../contexts/storeContext";
import axios from "axios";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [loading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const {
    cartItem,
    getTotalCartAmount,
    token,
    setToken,
    cartNumber,
    url,
    image,
  } = useStores();
  console.log(cartNumber);

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${url}/api/image/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the correct token format
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(user);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    fetchList();
  }, [token, image]);

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
            {user.image ? (
              <img
                src={`${url}/images/` + user.image}
                className="profile-icon"
                alt="user-photo"
              />
            ) : (
              <img
                src="user-pic.png"
                className="profile-icon"
                alt="user-photo"
              />
            )}

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
              <hr />
              <li onClick={() => navigate("/edit")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="tomato"
                  className="profile"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <p>profile</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
