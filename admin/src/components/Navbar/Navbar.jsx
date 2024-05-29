import "./Navbar.css";
import { assets } from "../../../../admin/src/assets/assets";
import { useStores } from "../../contexts/storeContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { token, setShowLogin, logout } = useStores();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" alt="" />
      {!token ? (
        <button onClick={() => setShowLogin(true)}>sign in</button>
      ) : (
        <div className="navbar-profile">
          <img src="kal.png" className="profile-icon" alt="" />
          <ul className="nav-profile-dropdown">
            <hr />
            <li onClick={logout}>
              <img src={assets.logout_icon} alt="" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
