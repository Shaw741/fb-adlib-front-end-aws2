import React from "react";
import {  Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ActiveSubScription = ({ children }) => {
  const { status } = useSelector((state) => state.subscriptionData?.data);
  return status === "active" ? children : <Redirect to="/plans" />;
};

export default ActiveSubScription;