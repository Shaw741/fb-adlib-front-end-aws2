import React from "react";
// import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  Redirect } from "react-router-dom";
// import { Redirect } from "react-router";

const InActiveSubScription = ({ children }) => {
  const { status } = useSelector((state) => state.subscriptionData?.data);
  return status !== "active" ? children : <Redirect to="/plans" />;
};

export default InActiveSubScription;