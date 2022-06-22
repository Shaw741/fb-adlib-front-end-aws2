import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomSidebar } from "../components/CustomSidebar";
import { styled } from "@mui/material/styles";
import Addlibrarydatabase from "../pages/AdlibraryDatabase";
import SavedAds from "../pages/SavedAds";
import ContactSupport from "../pages/ContactSupport";
import AccountSetings from "../pages/AccountSettings";
import AdDeatailsTabs from "../pages/adDetails/AdDetailsTabs";
import { useDispatch } from "react-redux";
import { loadMediaStart } from "../redux/ducks/mediaAds";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const MainLayout = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    console.log("isOpen from Parent: ", isOpen);
  }, [isOpen]);

  useEffect(() => {
    dispatch(loadMediaStart());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomSidebar isOpen={isOpen} />
        <CustomAppBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route exact path="/" element={<Addlibrarydatabase />} />
            <Route exact path="/savedAds" element={<SavedAds />} />
            <Route exact path="/contactSupport" element={<ContactSupport />} />
            <Route exact path="/accountSetings" element={<AccountSetings />} />
            <Route
              exact
              path="/adDeatails/:adsId/*"
              element={<AdDeatailsTabs />}
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
};
export default MainLayout;
