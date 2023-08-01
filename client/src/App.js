import React, { Component, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import "./App.css";
import About from "./Pages/About";
import { alertContext } from "./UseContext/AlertContext";
import { Backdrop, CircularProgress } from "@mui/material";
import AlertSnackBar from "./Components/AlertSnackBar";
import NavBar from "./Components/NavBar/NavBar";
import CategoryCards from "./Components/Home/CategoryCards/CategoryCards";

const App = () => {
  const value = useContext(alertContext);
  const { OpenAlert, setOpenAlert, Message, AlertType, openBackDrop } = value;
  return (
    <div className="App">
      <AlertSnackBar
        Message={Message}
        AlertType={AlertType}
        OpenAlert={OpenAlert}
        setOpenAlert={setOpenAlert}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Category" element={<CategoryCards />} />
          <Route exact path="/Category/:category" element={<ProductList />} />
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
          <Route exact path="/about-us" element={<About />} />
        </Routes>
      </BrowserRouter>
      <footer className="d-flex justify-content-center">
          <h6>
            © Designed and Developed by
            <a href="https://github.com/SenthilTechSpot"> SenthilTechSpot</a>
          </h6>
      </footer>
    </div>
  );
};

export default App;
