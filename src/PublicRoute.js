import React from "react";
import {  Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkAuth } from "./utils/auth";

const PublicRoute = ({ children }) => {
  // const { isAlive } = useSelector((state) => state.isAliveData);
  // return !isAlive ? children : <Navigate to="/" />;
  return !checkAuth() ? children : <Redirect to="/" />;
};

export default PublicRoute;
