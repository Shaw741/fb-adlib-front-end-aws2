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
import { useHistory, useNavigate } from "react-router-dom";
import settings from "../assets/settings.svg";
import logout from "../assets/Logout.svg";
import contactUs from "../assets/contactUs.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import useStyles from "../css/mediapage";
import { logoutUser } from "../services";

const drawerWidth = 276;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: `calc(100% - calc(${theme.spacing(7)} + 20px))`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#fff",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const CustomAppBar = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();
  const { accountSettings } = useSelector((state) => state.accountSettings);

  const MenuListOptios = [
    { name: "Account Setings", icon: settings, url: "/accountSettings" },
    { name: "Contact Support", icon: contactUs, url: "/contactSupport" },
    { name: "Logout", icon: logout, url: "/auth/login" }
  ];
  const [isMenuOptionActive, setIsMenuOptionActive] = React.useState("");
  // const navigate = useNavigate();
  const history = useHistory();
  const [anchoerEL, setAnchoerEL] = React.useState();
  const handleOpenMenu = (e) => {
    setAnchoerEL(e.currentTarget);
  };
  useEffect(() => {
    console.log(window.location.pathname);
    console.log("}}}}}}}}}}}");
  });
  const userLogout = async () => {
    logoutUser().then((data)=>{
      // dispatch(setIsAlive(false));
      localStorage.setItem("is_alive", false);
      handleCloseMenu();
      history.push("/auth/login");
      
    }, (error)=>{
      handleCloseMenu();
      console.log("Error While LogOut", error)
    });
  };
  const handleCloseMenu = (e) => {
    setAnchoerEL(null);
  };
  useEffect(() => {
    setIsMenuOptionActive(window.location.pathname);
  }, []);
  return (
    <>
      <AppBar open={isOpen}>
        <Toolbar>
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
                onClick={() => {
                  !isOpen ? setIsOpen(true) : setIsOpen(false);
                }}
                edge="start"
                sx={{
                  color: "#00CBFF",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
            <Stack>
              <Stack direction={"row"} spacing={2}>
                <Box className={classes.avtar}>
                  <NotificationsIcon />
                </Box>
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
                  <Box
                    onClick={handleOpenMenu}
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Typography
                      sx={{
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "24px",
                        color: "#2B2F42",
                        marginRight: "16px",
                      }}
                    >
                      {accountSettings &&
                        `${accountSettings?.first_name} ${accountSettings?.last_name}`}
                    </Typography>
                    <Box
                      className={classes.avtar}
                      sx={{
                        borderRadius: "4px",
                        width: "16px",
                        height: "16px",
                      }}
                    >
                      <ArrowDropDownIcon />
                    </Box>
                  </Box>

                  <Menu
                    id="menu"
                    anchorEl={anchoerEL}
                    open={Boolean(anchoerEL)}
                    onClose={handleCloseMenu}
                    // onClick={userLogout}
                    PaperProps={{
                      style: {
                        marginTop: 13,
                        maxHeight: 40 * 6,
                        width: "35ch",
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
                            }else{
                              handleCloseMenu();
                              history.push(item.url);
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
      </AppBar>
      ;
    </>
  );
};
