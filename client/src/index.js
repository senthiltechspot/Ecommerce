import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import IndexProvider from "./UseContext/IndexProvider";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <IndexProvider>
    <App />
  </IndexProvider>
);
