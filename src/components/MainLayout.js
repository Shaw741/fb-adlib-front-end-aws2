import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import { Routes } from "react-router-dom";
// import { Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Addlibrarydatabase from "../pages/AdlibraryDatabase";
import SavedAds from "../pages/SavedAds";
import ContactSupport from "../pages/ContactSupport";
import AccountSettings from "../pages/AccountSettings";
import AdDeatailsTabs from "../pages/adDetails/AdDetailsTabs";
import { useDispatch } from "react-redux";
import { loadMediaStart } from "../redux/ducks/mediaAds";
import { loadSubscriptionStart } from "../redux/ducks/subscription";
// import { loadSavedAdsStart } from "../redux/ducks/saveAds";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomSidebar } from "../components/CustomSidebar";
import { loadAccountSettingsStart } from "./../redux/ducks/accountSettings";
import Payment from "../pages/Plans"
import { loadSavedAdsClientSideStart, loadSavedAdsStart } from "../redux/ducks/saveAds_clientSide";
import { useSelector } from "react-redux";
import { getSetCatSatus } from "../redux/ducks/filtered_Data";
import ActiveSubScription from "../ActiveSubScription";
import InActiveSubScription from "../InActiveSubScription";
import { CircularProgress } from "@mui/material";
// import { Route } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainLayout = () => {
  const dispatch = useDispatch();
  // const { savedAds } = useSelector((state) => state.savedAds);
  const { loading } = useSelector((state) => state.subscriptionData);
  const [isOpen, setIsOpen] = React.useState(true);

  useEffect(() => {
    console.log("???????????????????????????????????????????????????????????")
    dispatch(loadSubscriptionStart());
    dispatch(loadMediaStart());
    dispatch(loadSavedAdsStart());    
    dispatch(loadAccountSettingsStart());
    dispatch(getSetCatSatus());
    console.log("???????????????????????????????????????????????????????????")
  },[]);

  // useEffect(()=>{
  //   dispatch(loadSavedAdsClientSideStart(savedAds))
  // },[dispatch, savedAds])
  
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomSidebar isOpen={isOpen} />
        <CustomAppBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box component="main" sx={{ flexGrow: 1, paddingLeft:4 }}>
          <DrawerHeader />
          { loading ? <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:"100%",
            }}
          >
            <CircularProgress
              style={{
                position: "relative",
                opacity: 1,
                zIndex: 1,
                visibility: loading  ? "visible" : "hidden",
              }}
            />
          </Box> :
          <Switch>
            <Route exact path="/" element={<ActiveSubScription><Addlibrarydatabase /></ActiveSubScription>} />
            <Route exact path="/savedAds" element={<ActiveSubScription><SavedAds /></ActiveSubScription>} />
            <Route exact path="/contactSupport" element={<ContactSupport />} />
            <Route
              exact
              path="/accountSettings"
              element={<AccountSettings />}
            />
            <Route
              exact
              path="/adDeatails/:adsId/*"
              element={<ActiveSubScription><AdDeatailsTabs /></ActiveSubScription>}
            />
            <Route exact path="/plans" element={<InActiveSubScription><Payment /></InActiveSubScription>} />
          </Switch>}
        </Box>
      </Box>
    </>
  );
};
export default MainLayout;
