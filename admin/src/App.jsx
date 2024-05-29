import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import LoginPopup from "./pages/LoginPopup/LoginPopup";
import { StoreProvider } from "./contexts/storeContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
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
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </StoreProvider>
    </div>
  );
}

export default App;
