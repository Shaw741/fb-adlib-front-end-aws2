import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return checkAuth() ? children : <Navigate to="/auth/login" />;
};
const checkAuth = () => {
  const token = localStorage.getItem("is_alive");
  return JSON.parse(token);
};
export default PrivateRoute;
