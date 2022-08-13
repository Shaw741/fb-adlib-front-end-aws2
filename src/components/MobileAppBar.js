import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import settings from "../assets/settings.svg";
import logout from "../assets/Logout.svg";
import contactUs from "../assets/contactUs.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import useStyles from "../css/mediapage";
import { logoutUser } from "../services";
import { Drawer } from "@material-ui/core";
import MobileDrawer from "./Mobiledrawer";
import fbEyelogo from "../assets/eye_logo.svg";

const drawerWidth = 276;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "100%",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#fff",
  ...(open && {
    marginLeft: drawerWidth,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
// const styles = {
//     drawerPaper: {
//       width: '100%',
//     },
//   };
function MobileAppBar() {
  const classes = useStyles();
  const { accountSettings } = useSelector((state) => state.accountSettings);
  const [isOpen, setIsOpen] = React.useState(false);
//   const [setIsOpen, setIsMenuOptionActive] = React.useState("");

  const MenuListOptios = [
    { name: "Account Setings", icon: settings, url: "/accountSettings" },
    { name: "Contact Support", icon: contactUs, url: "/contactSupport" },
    { name: "Logout", icon: logout, url: "/auth/login" },
  ];
  const [isMenuOptionActive, setIsMenuOptionActive] = React.useState("");
  const navigate = useNavigate();
  const [anchoerEL, setAnchoerEL] = React.useState();
  const handleOpenMenu = (e) => {
    setAnchoerEL(e.currentTarget);
  };
  const userLogout = async () => {
    logoutUser().then(
      (data) => {
        localStorage.setItem("is_alive", false);
        handleCloseMenu();
        navigate("/auth/login");
      },
      (error) => {
        handleCloseMenu();
      }
    );
  };
  const handleCloseMenu = () => {
    setAnchoerEL(null);
  };
  useEffect(() => {
    setIsMenuOptionActive(window.location.pathname);
    // const favicon = getFaviconEl();
    // console.log("login", favicon);
    // favicon.href = "Rectangleeye.png";
  }, []);
  return (
    <>
      <AppBar open={isOpen}>
        <Toolbar sx={{ ml: -1 }}>
          <Stack
            direction={"row"}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            
            }}
          >
            <Stack>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                style={{  cursor:"pointer"}}
                onClick={() => {
                  isOpen ? setIsOpen(()=>false) : setIsOpen(()=>true);
                }}
                // edge="start"
              >
                <svg width={0} height={0}>
                  <linearGradient id="linearColors" x1={0} y1={1} x2={1} y2={0}>
                    <stop offset={0.1} stopColor="#B5EDFF" />
                    <stop offset={0.3} stopColor="#00CBFF" />
                    <stop offset={0.9} stopColor="#6721FF" />
                  </linearGradient>
                </svg>
                <MenuIcon
                  sx={{ fill: "url(#linearColors)", fontSize: "35px" }}
                />
              </IconButton>
              <Drawer PaperProps={{ style: { width: "100%" } }}
                
                //   anchor={anchor}
                open={isOpen}
                //   onClose={toggleDrawer(anchor, false)}
              >
                <MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
              </Drawer>
            </Stack>
            <Stack>
            <Box sx={{ marginRight: "8px" }}>
              <img
                alt="small-logo"
                src={fbEyelogo}
                onClick={() => navigate("/auth/login")}
                style={{ cursor: "pointer" ,width:"50px", verticalAlign:"bottom"}}
              />
            </Box>
            </Stack>
            <Stack>
              <Stack direction={"row"} spacing={2}>
                <Box
                  className={classes.avtar}
                  onClick={handleOpenMenu}
                  sx={{ cursor: "pointer" }}
                >
                  <PersonIcon />
                </Box>

                <Stack
                  className={classes.profileItem}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Menu
                    id="menu"
                    anchorEl={anchoerEL}
                    open={Boolean(anchoerEL)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      style: {
                        marginTop: 13,
                        maxHeight: 40 * 6,
                        width: "auto", //"35ch",
                        background: "white",
                      },
                    }}
                  >
                    <Box marginLeft={3} marginTop={1} marginBottom={1}>
                      <Typography>
                        <b>
                          {accountSettings &&
                            `${accountSettings?.first_name} ${accountSettings?.last_name}`}
                        </b>
                      </Typography>
                      <Typography>
                        {accountSettings && accountSettings?.email}
                      </Typography>
                    </Box>
                    <Divider />

                    {MenuListOptios.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            if (item.name === "Logout") {
                              userLogout();
                            } else {
                              handleCloseMenu();
                              navigate(item.url);
                            }
                            setIsMenuOptionActive(window.location.pathname);
                          }}
                          style={{
                            background:
                              isMenuOptionActive === item.url
                                ? "#ebebeb"
                                : "white",
                          }}
                        >
                          <img
                            src={item.icon}
                            alt="img1"
                            style={{ height: "15px", width: "15px" }}
                          />
                          <Typography marginLeft={1}>{item.name}</Typography>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
        <Divider />
      </AppBar>
    </>
  );
}

export default MobileAppBar;
