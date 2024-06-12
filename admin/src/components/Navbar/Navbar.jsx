/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../../../admin/src/assets/assets";
import { useStores } from "../../contexts/storeContext";
import { useNavigate, NavLink } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import axios from "axios";

function Navbar({ setShowLogin }) {
  const [user, setUser] = useState({});
  const { url, token, setToken, image, setImage } = useStores();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    fetchList();
  }, [token, image]);

  if (!token)
    return (
      <p>
        You are not eligible to access this page, If you are an admin please
        login properly to access this page
      </p>
    );

  return (
    <div className="navbar">
      {user.image ? (
        <img
          src={`${url}/images/` + user.image}
          className="profile-icon"
          alt="user-photo"
        />
      ) : (
        <img src="user-pic.png" className="profile-icon" alt="user-photo" />
      )}

      <div className="navbar-profile">
        <img src="kal.png" className="profile-icon" alt="" />
        <ul className="nav-profile-dropdown">
          <li onClick={logout}>
            <IoLogOutOutline size={27} />
            <p>Logout</p>
          </li>
          <NavLink to="/edit">
            <IoLogOutOutline size={27} />
            <p>profile</p>
          </NavLink>
          <li>
            <MdOutlineLightMode size={25} />
            <p>theme</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
