import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import LoginPopup from "./pages/LoginPopup/LoginPopup";
import Category from "./pages/Category/Category";
import { StoreProvider } from "./contexts/storeContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import CatList from "./pages/CategoryList/CatList";
import Users from "./pages/Users/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import FeedBack from "./pages/FeedBack/FeedBack";
import Message from "./pages/Message/Message";
import EditProfile from "./pages/EditProfile/EditProfile";
import Edit from "./pages/Edit/Edit";
const url = "http://localhost:4000";
function App() {
  const [showLogin, setShowLogin] = useState(false);
  console.log(showLogin);
  return (
    <div>
      <StoreProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPopup />} />
        </Routes>

        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/home" element={<Dashboard url={url} />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/category" element={<Category url={url} />} />
            <Route path="/catlist" element={<CatList url={url} />} />
            <Route path="/users" element={<Users url={url} />} />
            <Route path="/Feedback" element={<FeedBack url={url} />} />
            <Route path="/messages" element={<Message url={url} />} />
            <Route path="/edit" element={<EditProfile />} />
            <Route path="/edit-list" element={<Edit />} />
          </Routes>
        </div>
      </StoreProvider>
    </div>
  );
}

export default App;
