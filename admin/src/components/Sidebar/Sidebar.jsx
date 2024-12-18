import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlinePlus,
  HiOutlineListBullet,
  HiOutlineGift,
} from "react-icons/hi2";
import { HiOutlineViewGridAdd, HiOutlineViewGrid } from "react-icons/hi";
import { useStores } from "../../contexts/storeContext";

function Sidebar() {
  const { token } = useStores();
  if (!token) return;
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/home" className="sidebar-option">
          <HiOutlineHome size={20} color="rgb(37 99 235)" />

          <p>OVERVIEW</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <HiOutlinePlus size={20} color="rgb(37 99 235)" />

          <p>ADD ITEMS</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <HiOutlineListBullet size={20} color="rgb(37 99 235)" />

          <p>List items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <HiOutlineGift size={20} color="rgb(37 99 235)" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/category" className="sidebar-option">
          <HiOutlineViewGridAdd size={20} color="rgb(37 99 235)" />
          <p>Add menu</p>
        </NavLink>
        <NavLink to="/catlist" className="sidebar-option">
          <HiOutlineViewGrid size={20} color="rgb(37 99 235)" />
          <p>List menu</p>
        </NavLink>
        <NavLink to="/users" className="sidebar-option">
          <HiOutlineUsers size={20} color="rgb(37 99 235)" />

          <p>Users</p>
        </NavLink>
        <NavLink to="/feedback" className="sidebar-option">
          <HiOutlineUsers size={20} color="rgb(37 99 235)" />

          <p>Feedback</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
