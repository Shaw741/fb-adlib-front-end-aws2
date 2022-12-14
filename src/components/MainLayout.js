import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomSidebar } from "../components/CustomSidebar";
import Addlibrarydatabase from "../pages/AdlibraryDatabase";
import SavedAds from "../pages/SavedAds";
import ContactSupport from "../pages/ContactSupport";
import AccountSettings from "../pages/AccountSettings";
import AdDeatailsTabs from "../pages/adDetails/AdDetailsTabs";
import Payment from "../pages/Plans";
import { loadSubscriptionStart } from "../redux/ducks/subscription";
import { loadAccountSettingsStart } from "./../redux/ducks/accountSettings";
import { loadFilteredAdsStart } from "../redux/ducks/filteredAds";
import { getButtonTypes } from "../redux/ducks/buttonType";
import { loadsavedFilteredAdsStart } from "../redux/ducks/filteredSavedAds";
import ActiveSubScription from "../ActiveSubScription";
import InActiveSubScription from "../InActiveSubScription";
import MobileAppBar from "./MobileAppBar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainLayout = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.subscriptionData);
  const [isOpen, setIsOpen] = React.useState(true);
  const theme = useTheme();
  let { id } = useParams()
  const showhidedrawer = useMediaQuery(theme.breakpoints.down("md"));  

  useEffect(() => {
    console.log("909- id in route in main layout",id,window.location.pathname.split("=")[1])
    dispatch(loadSubscriptionStart());
    dispatch(
      loadFilteredAdsStart({
        page_index: window.location.pathname.split("=")[1]-1 || 0,
        sort_by: "lastUpdatedTime",
        order_by: "asc",
        number_of_pagead: process.env.REACT_APP_NO_OF_ADS_PER_PAGE,
      })
    );
    dispatch(
      loadsavedFilteredAdsStart({
        // page_index:window.location.pathname.split("=")[1]-1 || 0,
        sort_by: "lastUpdatedTime",
        order_by: "asc",
        number_of_pagead: process.env.REACT_APP_NO_OF_ADS_PER_PAGE,
      })
    );
    dispatch(loadAccountSettingsStart());
    dispatch(getButtonTypes());
  }, [dispatch]);

  return (
    <>
      <Box display={showhidedrawer ? "" : "flex"}>
        <CssBaseline />
        {showhidedrawer ? (
          <MobileAppBar />
        ) : (
          <>
            <CustomSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <CustomAppBar />
          </>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            //  paddingLeft: 2
          }}
        >
          <DrawerHeader />
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <FadeLoader
                style={{
                  position: "relative",
                  opacity: 1,
                  zIndex: 1,
                  visibility: loading ? "visible" : "hidden",
                  marginTop: "250px",
                }}
                color="#00BFFF"
              />
            </Box>
          ) : (
            <Routes>
              <Route
                exact
                path="/page=:id"
                element={
                  <ActiveSubScription>
                    <Addlibrarydatabase />
                  </ActiveSubScription>
                }
              />
              <Route
                exact
                path="/savedAds/page=:page"
                element={
                  <ActiveSubScription>
                    <SavedAds />
                  </ActiveSubScription>
                }
              />
              <Route
                exact
                path="/contactSupport"
                element={<ContactSupport />}
              />
              <Route
                exact
                path="/accountSettings"
                element={<AccountSettings />}
              />
              <Route
                exact
                path="/adDeatails/:adId/*"
                element={
                  <ActiveSubScription>
                    <AdDeatailsTabs />
                  </ActiveSubScription>
                }
              />
              <Route
                exact
                path="/plans"
                element={
                  <InActiveSubScription>
                    <Payment />
                  </InActiveSubScription>
                }
              />
            </Routes>
          )}
        </Box>
      </Box>
    </>
  );
};
export default MainLayout;
