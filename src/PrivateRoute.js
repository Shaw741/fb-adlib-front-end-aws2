
import React from "react";
// import {  Redirect, Route } from "react-router-dom";
import { Route, useHistory } from "react-router-dom";
import { checkAuth } from "./utils/auth";
// import { useSelector } from "react-redux";
// import { checkAuth } from "./utils/auth";

const PrivateRoute = ({component: Component, ...rest}) => {
  // const navigate = useNavigate();
  const history = useHistory();
  console.log(Component)
  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
  return (
      <Route
          {...rest}
          render={(props) =>{
              return(checkAuth() ? (
                  <Component {...props} />
              ) : (
                  // <Redirect to={{pathname: "/"}}/>
                  history.push("/auth/login")
              ))
          }
          }
      />
  );
};
// const PrivateRoute = ({ children }) => {
  // const { isAlive } = useSelector((state) => state.isAliveData);
  // return isAlive ? children : <Navigate to="/auth/login" />;

  // console.log("5555555555555555555%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  // return checkAuth() ? children : <Navigate to="/auth/login" />;
// };

export default PrivateRoute;

