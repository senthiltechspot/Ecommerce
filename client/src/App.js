import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import "./App.css";
import AdminCategory from "./Components/DashBoardComp/AdminCategory";
import AdminProduct from "./Components/DashBoardComp/AdminProduct";
import AdminOrder from "./Components/DashBoardComp/AdminOrder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/products" element={<ProductList />} />
            <Route exact path="/products/:id" element={<ProductDetail />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
            {/* <Route exact path="/admin-dashboard/category" element={<AdminCategory />} />
            <Route exact path="/admin-dashboard/product" element={<AdminProduct />} />
            <Route exact path="/admin-dashboard/orders" element={<AdminOrder />} /> */}

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
