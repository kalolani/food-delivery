/* eslint-disable no-unused-vars */
import "./Navbar.css";
import { assets } from "../../../../admin/src/assets/assets";
import { useStores } from "../../contexts/storeContext";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
function Navbar({ setShowLogin }) {
  const { token, setToken } = useStores();
  const navigate = useNavigate();

  if (!token)
    return (
      <p>
        You are not eligible to access this page, If you are an admin please
        login properly to access this page
      </p>
    );

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" alt="" />

      <div className="navbar-profile">
        <img src="kal.png" className="profile-icon" alt="" />
        <ul className="nav-profile-dropdown">
          <li onClick={logout}>
            <IoLogOutOutline size={27} />
            <p>Logout</p>
          </li>
          <li onClick={logout}>
            <IoLogOutOutline size={27} />
            <p>profile</p>
          </li>
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
