import React from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "./utils/auth";

const PrivateRoute = ({ children }) => {
  return checkAuth() ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;

