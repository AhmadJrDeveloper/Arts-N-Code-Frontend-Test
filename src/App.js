import React from "react";
import AppRouter from "./AppRouter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <AppRouter />
    </div>
  );
};

export default App;
