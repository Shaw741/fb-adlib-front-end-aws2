import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import Addlibrarydatabase from "../pages/AdlibraryDatabase";
import SavedAds from "../pages/SavedAds";
import ContactSupport from "../pages/ContactSupport";
import AccountSettings from "../pages/AccountSettings";
import AdDeatailsTabs from "../pages/adDetails/AdDetailsTabs";
import { loadSubscriptionStart } from "../redux/ducks/subscription";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomSidebar } from "../components/CustomSidebar";
import { loadAccountSettingsStart } from "./../redux/ducks/accountSettings";
import Payment from "../pages/Plans";
import ActiveSubScription from "../ActiveSubScription";
import InActiveSubScription from "../InActiveSubScription";
import { loadFilteredAdsStart } from "../redux/ducks/filteredAds";
import { loadsavedFilteredAdsStart } from "../redux/ducks/filteredSavedAds";
import { getButtonTypes } from "../redux/ducks/buttonType";
import { loadSavedAdsIdsLocal } from "../redux/ducks/savedAdsManager";
import MobileAppBar from "./MobileAppBar";
import Drawer from "./Mobiledrawer";
import { useMediaQuery , useTheme} from "@mui/material";

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
  // const [windowWidth, setWindowWidth] = React.useState(0);
  // const [windowWidth, setWindowWidth] = React.useState(0);
  const theme = useTheme();

  const showhidedrawer = useMediaQuery(theme.breakpoints.down("md"));
  const filteredAds = useSelector((state) => state.filteredAds);

  useEffect(() => {
    dispatch(loadSubscriptionStart());
    dispatch(
      loadFilteredAdsStart({
        page_index: 0,
        sort_by: "lastUpdatedTime",
        order_by: "asc",
        number_of_pagead:12
      })
    );
    dispatch(
      loadsavedFilteredAdsStart(
        // page_index: 0,
        // sort_by: "lastUpdatedTime",
        // order_by: "asc",
        // number_of_pagead: 2,
      )
    );
    
    dispatch(loadAccountSettingsStart());
    dispatch(getButtonTypes());
  }, [dispatch]);

// useEffect(()=>{
//   setWindowWidth(window.innerWidth)
//   console.log("000", windowWidth)
// },[window.innerWidth])

  return (
    <>
      <Box display={showhidedrawer?"":"flex"}>
      <CssBaseline />
        {
          showhidedrawer ? <MobileAppBar /> :
          (
            <>
              <CustomSidebar isOpen={isOpen} />
              <CustomAppBar isOpen={isOpen} setIsOpen={setIsOpen} />
            </>
          )
         } 
        

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
                path="/"
                element={
                  <ActiveSubScription>
                    <Addlibrarydatabase />
                  </ActiveSubScription>
                }
              />
              <Route
                exact
                path="/savedAds"
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
