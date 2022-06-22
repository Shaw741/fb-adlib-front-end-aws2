import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import appLogo from "../assets/appLogo.svg";
import libraryicon from "../assets/Vector.svg";
import staricon from "../assets/Vectora.svg";
import contact from "../assets/contact.svg";
import logout from "../assets/Logout.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Stack } from "@mui/material";
import { logoutUser } from "../services";

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: "Neue Haas Grotesk Display Pro",
    fontStyle: "normal !important",
    fontWeight: "900 !important",
    fontSize: "24px !important",
    lineHeight: "31px !important",
    background:
      "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
  },
  logo: {
    height: "25px !important",
    width: "46px !important",
    marginRight: "8px",
  },

  selectedMenu: {
    background:
      "linear-gradient(270deg, rgba(0, 203, 255, 0.5) 0%, rgba(0, 203, 255, 0.03) 100%)",
    borderRadius: "30px",
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sideBarMenuItems = {
  ADLIBSDATABASE: "Adlibrary Database",
  SAVEDADS: "Saved Ads",
  SUPPORT: "Contact Support",
  LOGOUT: "Log Out",
};

export const CustomSidebar = ({ isOpen }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    sideBarMenuItems.ADLIBSDATABASE
  );

  const userLogout = async () => {
    const res = await logoutUser();
    if (res.success && res?.data?.data) {
      localStorage.clear();
      navigate("/Login");
    }
  };

  useEffect(() => {
    if (window.location.pathname === `/ContactSupport`) {
      setSelectedMenuItem(sideBarMenuItems.SUPPORT);
    } else if (window.location.pathname === `/`) {
      setSelectedMenuItem(sideBarMenuItems.ADLIBSDATABASE);
    } else if (window.location.pathname === `/savedAds`) {
      setSelectedMenuItem(sideBarMenuItems.SAVEDADS);
    } else {
      setSelectedMenuItem("");
    }
  });
  return (
    <>
      <Drawer variant="permanent" open={isOpen}>
        <Stack sx={{ height: "100%" }}>
          <Box
            sx={{
              marginTop: "42px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Stack
              direction={"row"}
              sx={{
                paddingTop: "20px",
                paddingBottom: "20px",
                alignItems: "center",
                marginLeft: "12px",
              }}
            >
              <img alt="logo" src={appLogo} className={classes.logo} />
              <Typography
                edge="start"
                className={classes.title}
                component="div"
              >
                Eye of Ecom
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{ marginTop: "72px", cursor: "pointer" }}
            className={
              selectedMenuItem === sideBarMenuItems.ADLIBSDATABASE
                ? classes.selectedMenu
                : ""
            }
            onClick={() => {
              setSelectedMenuItem(sideBarMenuItems.ADLIBSDATABASE);
              navigate("/");
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                paddingTop: "20px",
                paddingBottom: "20px",
                marginLeft: "20px",
              }}
            >
              <img alt="libraryicon" src={libraryicon} />
              <Typography sx={{ marginLeft: "26px" }}>
                Adilbrary Database
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              marginTop: "6px",
              cursor: "pointer",
            }}
            className={
              selectedMenuItem === sideBarMenuItems.SAVEDADS
                ? classes.selectedMenu
                : ""
            }
            onClick={() => {
              setSelectedMenuItem(sideBarMenuItems.SAVEDADS);
              navigate("/savedAds");
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                paddingTop: "20px",
                paddingBottom: "20px",
                marginLeft: "20px",
              }}
            >
              <img alt="staricon" src={staricon} sx={{ marginLeft: "20px" }} />
              <Typography sx={{ marginLeft: "26px" }}>Saved Ads</Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              marginTop: "auto",
              cursor: "pointer",
            }}
            className={
              selectedMenuItem === sideBarMenuItems.SUPPORT
                ? classes.selectedMenu
                : ""
            }
            onClick={() => {
              setSelectedMenuItem(sideBarMenuItems.SUPPORT);
              navigate("/ContactSupport");
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                paddingTop: "20px",
                paddingBottom: "20px",
                marginLeft: "20px",
              }}
            >
              <img alt="contact support" src={contact} />
              <Typography sx={{ marginLeft: "26px" }}>
                Contact Support
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              marginTop: "3px",
              display: "flex",
              marginBottom: "60px",
              cursor: "pointer",
            }}
            className={
              selectedMenuItem === sideBarMenuItems.LOGOUT
                ? classes.selectedMenu
                : ""
            }
            onClick={() => {
              setSelectedMenuItem(sideBarMenuItems.LOGOUT);
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                paddingTop: "20px",
                paddingBottom: "20px",
                marginLeft: "20px",
              }}
              onClick={userLogout}
            >
              <img alt="Logout" src={logout} width="17px" />
              <Typography sx={{ marginLeft: "26px" }}>Log Out</Typography>
            </Stack>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
};
