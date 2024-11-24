import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewBusinesses from "./pages/ViewBusinesses";
import { Home } from "./pages/Home/Home";
import CustomMap from "./components/CustomModal";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import Types from "./components/Types";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import Businesses  from "./components/Businesses";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<ViewBusinesses />} />
        <Route path="/map" element={<CustomMap />} />
        <Route path="/admin-login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={<PrivateRoute element={<AdminDashboard />} />}
        >
          <Route
            path="businesses"
            element={<PrivateRoute element={<Businesses />} />}
          />
          <Route
            path="business-types"
            element={<PrivateRoute element={<Types />} />}
          />
          {/* <Route
            path="admins"
            element={<PrivateRoute element={<Admins />} />}
          /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
