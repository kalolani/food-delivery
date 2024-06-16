/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import "./Navbar.css";
import { assets } from "../../../../admin/src/assets/assets";
import { useStores } from "../../contexts/storeContext";
import { useNavigate, NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineDarkMode } from "react-icons/md";
import axios from "axios";

function Navbar({ toggleTheme, theme }) {
  const [user, setUser] = useState({});
  const { url, token, setToken, image, setImage } = useStores();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(token);
  console.log(user);

  const fetchList = useCallback(async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Token being sent:", token);
      console.log("URL being called:", `${url}/api/image/list-admin`);

      const response = await axios.post(
        `${url}/api/image/list-admin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the correct token format
          },
        }
      );

      console.log("Response data:", response.data);
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log("Error: Data fetch was not successful");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else {
        console.error("Error making request:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, url]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    fetchList();
  }, [token, image, fetchList]);

  if (!token) {
    return (
      <p>
        You are not eligible to access this page. If you are an admin, please
        login properly to access this page.
      </p>
    );
  }

  return (
    <div className="navbar">
      <NavLink to="/home">
        <img src="dila-uni.png" alt="Logo" className="logo" />
      </NavLink>
      <div className="navbar-profile">
        {user?.image ? (
          <img
            src={`${url}/images/${user.image}`}
            className="profile-icon"
            alt="user-photo"
          />
        ) : (
          <img src="user-pic.png" className="profile-icon" alt="user-photo" />
        )}
        <ul className="admin-nav-profile-dropdown">
          <li onClick={logout}>
            <IoLogOutOutline size={27} />
            <p>Logout</p>
          </li>
          <NavLink to="/edit">
            <div className="admin-profile">
              <HiOutlineUserCircle size={27} />
              <p>Profile</p>
            </div>
          </NavLink>
          <li onClick={toggleTheme}>
            {/* <MdOutlineLightMode size={25} /> */}
            {theme === "light" ? (
              <MdOutlineLightMode size={25} />
            ) : (
              <MdOutlineDarkMode size={25} />
            )}

            <p>Theme</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
