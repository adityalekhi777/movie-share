import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <AuthProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </AuthProvider>
  </BrowserRouter>
);
