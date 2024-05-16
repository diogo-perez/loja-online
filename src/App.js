import React from "react";
import './App.css';
import RoutesApp from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
      <ToastContainer autoClose={3500} />
    </BrowserRouter>
  );
}

export default App;
