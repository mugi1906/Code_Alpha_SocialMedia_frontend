import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";
import "./styles/variables.css";
import "./styles/animations.css";
import "./styles/App.css";

import App from "./App";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>

        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
        />

      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);