import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect admin routes
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check for token in localStorage

  if (!isAuthenticated) {
    // Redirect to login if no valid token is found
    return <Navigate to="/admin-login" />;
  }

  // Render the admin route if the user is authenticated
  return element;
};

export default PrivateRoute;
