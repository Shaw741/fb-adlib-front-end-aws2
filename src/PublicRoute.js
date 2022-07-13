import React from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "./utils/auth";

const PublicRoute = ({ children }) => {
  return !checkAuth() ? children : <Navigate to="/" />;
};

export default PublicRoute;
