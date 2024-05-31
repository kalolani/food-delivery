import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import { StoreProvider } from "./contexts/storeContext";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/Myorder/MyOrders";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <StoreProvider>
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <div className="app">
          <Navbar setShowLogin={setShowLogin} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/edit" element={<EditProfile />} />
          </Routes>
        </div>
      </StoreProvider>
      <Footer />
    </>
  );
}

export default App;
