import React from "react";
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
import billing from "../assets/billing.svg";
import contactUs from "../assets/contactUs.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useStyles from "../css/mediapage";
import { drawerWidth } from "../variable";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: `calc(100% - calc(${theme.spacing(7)} + 1px))`,
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
  console.log("isOpen from child: ", isOpen);
  const classes = useStyles();
  const handleDrawerOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  const MenuListOptios = [
    { name: "Account Setings", icon: settings },
    { name: "Billing", icon: billing },
    { name: "Contact Support", icon: contactUs },
    { name: "Logout", icon: billing },
  ];
  const [isMenuOptionActive, setIsMenuOptionActive] = React.useState("");
  const navigate = useNavigate();
  const [anchoerEL, setAnchoerEL] = React.useState();
  const handleOpenMenu = (e) => {
    console.log("first,", e.currentTarget);
    setAnchoerEL(e.currentTarget);
  };
  const handleCloseMenu = (e) => {
    setAnchoerEL(null);
  };
  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack
            direction={"row"}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Stack>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
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
                <Box className={classes.avtar}>
                  <PersonIcon />
                </Box>

                <Stack
                  direction={"row"}
                  // onClick={handleOpenMenu}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                  spacing={2}
                >
                  <Typography
                    sx={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "18px",
                      lineHeight: "24px",
                      color: "#2B2F42",
                    }}
                  >
                    Jeans Beans
                  </Typography>
                  <Box
                    className={classes.avtar}
                    sx={{ borderRadius: "4px", width: "16px", height: "16px" }}
                  >
                    <ArrowDropDownIcon
                      onClick={handleOpenMenu}
                      // onClose={handleCloseMenu}
                    />
                  </Box>

                  <Menu
                    id="menu"
                    anchorEl={anchoerEL}
                    open={Boolean(anchoerEL)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      style: {
                        marginTop: 13,
                        maxHeight: 40 * 6,
                        width: "35ch",
                        background: "#ebebeb",
                      },
                    }}
                  >
                    <Box marginLeft={3} marginTop={1} marginBottom={1}>
                      <Typography>
                        <b>JeansBeans</b>
                      </Typography>
                      <Typography>JeansBeans@gmail.com</Typography>
                    </Box>
                    <Divider />

                    {MenuListOptios.map((item, index) => {
                      // console.log(item.name.replace(' ',''));
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            navigate(item.name.replace(" ", ""));
                            handleCloseMenu();
                            setIsMenuOptionActive(item.name);
                          }}
                          style={{
                            background:
                              isMenuOptionActive === item.name
                                ? "white"
                                : "#ebebeb",
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
