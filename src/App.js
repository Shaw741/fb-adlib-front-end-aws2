import React, { useEffect } from "react";
import {   useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagenotfound from "./components/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "./components/MainLayout";
import Login from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Signup from "./pages/auth/Signup";
import PublicRoute from "./PublicRoute";
import './App.scss'
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
// import { loadIsAliveStart } from "./redux/ducks/session";
// import {
//   Box,
//   CircularProgress,
// } from "@mui/material";

const App = () => {
  // const dispatch = useDispatch();

  // const { loading } = useSelector((state) => state.isAliveData);

  // useEffect(() => {
  //   dispatch(loadIsAliveStart());
  // }, []);
  
  return (
    <>
      <Switch>
        {/* Public Routes */}
        <Route path="/auth/login" exact element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/auth/register" exact element={<PublicRoute><Signup /></PublicRoute>} />
        <Route
          path="/auth/forgot-password"
          exact
          element={<PublicRoute><ForgetPassword /></PublicRoute>}
        />

        {/* Private Routes */}
        {/* <Route
          exact
          path="/*"
          element={
            <PrivateRoute>
              <MainLayout />
             </PrivateRoute>
          }
        />  */}
 <PrivateRoute path="/" component={MainLayout} />
        {/* unknown Routes */}
        {/* <Route  path="*" element={<Pagenotfound />} /> */}
      </Switch>
      
    </>
  );
};
export default App;
