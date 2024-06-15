import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import { StoreProvider } from "./contexts/storeContext";

import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/Myorder/MyOrders";
import EditProfile from "./pages/EditProfile/EditProfile";
import RatingPage from "./pages/RatingPage/RatingPage";
import Contact from "./pages/Contact/Contact";

import styled, { ThemeProvider } from "styled-components";
import { backgroundColor, textColor } from "./theme";

const Container = styled.div`
  background-color: ${backgroundColor};
  color: ${textColor};
  transition: all 0.3s linear;
`;

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <StoreProvider>
        <ThemeProvider theme={{ mode: theme }}>
          <Container>
            {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
            <div className="app">
              <Navbar
                setShowLogin={setShowLogin}
                toggleTheme={toggleTheme}
                theme={theme}
              />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<PlaceOrder />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/edit" element={<EditProfile />} />
                <Route path="/rating" element={<RatingPage />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
          </Container>
        </ThemeProvider>
      </StoreProvider>
      <Footer />
    </>
  );
}

export default App;
