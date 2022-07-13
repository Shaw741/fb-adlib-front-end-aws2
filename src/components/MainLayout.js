import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Addlibrarydatabase from "../pages/AdlibraryDatabase";
import SavedAds from "../pages/SavedAds";
import ContactSupport from "../pages/ContactSupport";
import AccountSettings from "../pages/AccountSettings";
import AdDeatailsTabs from "../pages/adDetails/AdDetailsTabs";
import { useDispatch } from "react-redux";
import { loadMediaStart } from "../redux/ducks/mediaAds";
import { loadSavedAdsStart } from "../redux/ducks/saveAds";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomSidebar } from "../components/CustomSidebar";
import { loadAccountSettingsStart } from "./../redux/ducks/accountSettings";
import Payment from "../pages/Payment"
import { loadSavedAdsClientSideStart } from "../redux/ducks/saveAds_clientSide";
import { useSelector } from "react-redux";
import { getSetCatSatus } from "../redux/ducks/filtered_Data";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainLayout = () => {
  const dispatch = useDispatch();
  const { savedAds } = useSelector((state) => state.savedAds);

  // const [isOpen, setIsOpen] = React.useState(false);
  
  
  const drawerOpenKey = 'drawerOpen';
  const defaultOpen = localStorage.getItem(drawerOpenKey) === 'true';
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  React.useEffect(() => {
    localStorage.setItem(drawerOpenKey, isOpen);
  }, [isOpen]);

  useEffect(() => {
    dispatch(loadMediaStart());
    dispatch(loadSavedAdsStart());    
    dispatch(loadAccountSettingsStart());
    dispatch(getSetCatSatus());
  }, [dispatch]);
useEffect(()=>{
  dispatch(loadSavedAdsClientSideStart(savedAds))
},[dispatch,savedAds])
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomSidebar isOpen={isOpen} />
        <CustomAppBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box component="main" sx={{ flexGrow: 1, paddingLeft:4 }}>
          <DrawerHeader />
          <Routes>
            <Route exact path="/" element={<Addlibrarydatabase />} />
            <Route exact path="/savedAds" element={<SavedAds />} />
            <Route exact path="/contactSupport" element={<ContactSupport />} />
            <Route
              exact
              path="/accountSettings"
              element={<AccountSettings />}
            />
            <Route
              exact
              path="/adDeatails/:adsId/*"
              element={<AdDeatailsTabs />}
            />
            <Route exact path="/payment" element={<Payment />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};
export default MainLayout;
