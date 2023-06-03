import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AlertDetailsProvider from "./UseContext/AlertContext";
import CartProvider from "./UseContext/CartContext";

ReactDOM.render(
  <AlertDetailsProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AlertDetailsProvider>,
  document.getElementById("root")
);
