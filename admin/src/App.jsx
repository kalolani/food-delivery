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
import { useState, useEffect } from "react";
import CatList from "./pages/CategoryList/CatList";
import Users from "./pages/Users/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import FeedBack from "./pages/FeedBack/FeedBack";
import Message from "./pages/Message/Message";
import EditProfile from "./pages/EditProfile/EditProfile";
import Edit from "./pages/Edit/Edit";

import styled, { ThemeProvider } from "styled-components";
import { backgroundColor, textColor } from "./theme";
import Category_edit from "./pages/Category-edit/Category-edit";

const Container = styled.div`
  background-color: ${backgroundColor};
  color: ${textColor};
  transition: all 0.3s linear;
`;

const url = "http://localhost:4000";
function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <StoreProvider>
        <ThemeProvider theme={{ mode: theme }}>
          <Container>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<LoginPopup />} />
            </Routes>

            <Navbar toggleTheme={toggleTheme} theme={theme} />
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
                <Route path="/edit-menu" element={<Category_edit />} />
              </Routes>
            </div>
          </Container>
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
