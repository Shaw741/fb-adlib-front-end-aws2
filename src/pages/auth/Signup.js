import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import appLogo from "../../assets/appLogo.svg";
import { useNavigate } from "react-router-dom";
import { usermanager } from "../../services/index";

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState();
  const [lastname, setLasttname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const submitsigninform = async () => {
    const data = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
    };
    // setLoading(false)
    const response = await usermanager(data);
    if (response.success) {
      // setLoading(true)
      navigate("/auth/login");
    }
  };
  const gotoSigninpage = () => {
    navigate("/auth/login");
  };
  return (
    <MuiThemeProvider theme={themeLight}>
      <CssBaseline />
      <Grid container>
        <Box
          style={{
            width: "50%",
            justify: "center",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card
            style={{
              maxWidth: 722,
              padding: "20px 5px",
              margin: "0 auto",
              backgroundColor: "#F6F6FB",
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <Stack
                direction={"row"}
                sx={{ displayl: "flex", justifyContent: "center" }}
              >
                <img alt="logo" src={appLogo} className={classes.logo} />
                <Typography edge="start" className={classes.title}>
                  Eye of Ecom
                </Typography>
              </Stack>

              <Box style={{ padding: "30px 70px" }}>
                <Typography className={classes.signin}>
                  Create a free account
                </Typography>

                <Typography className={classes.alreadyaccount}>
                  Already Have an account?{" "}
                  <span
                    style={{ color: "#00CBFF", cursor: "pointer" }}
                    onClick={gotoSigninpage}
                  >
                    signin
                  </span>
                </Typography>
                <form style={{ paddingTop: "50px" }}>
                  <Grid container spacing={4}>
                    <Grid xs={12} item>
                      <TextField
                        placeholder="Enter first name"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        placeholder="Enter last name"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={(e) => setLasttname(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        placeholder="Enter email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Password"
                        label="Password(must be at least 6 charcters)"
                        variant="outlined"
                        fullWidth
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox style={{ color: "#00CBFF" }}></Checkbox>
                        }
                        label={
                          <Typography className={classes.termsandcondition}>
                            I agree to the{" "}
                            <span style={{ color: "#00CBFF" }}>
                              Terms of service
                            </span>{" "}
                            and{" "}
                            <span style={{ color: "#00CBFF" }}>
                              Privacy Policy
                            </span>
                          </Typography>
                        }
                      ></FormControlLabel>
                    </Grid>
                  </Grid>
                </form>
              </Box>
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: "14px" }}
                  className={classes.Crateaccountbutton}
                  onClick={submitsigninform}
                >
                  Create Account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Signup;

const themeLight = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          background:
            "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});
const useStyles = makeStyles(() => ({
  logo: {
    height: "37px !important",
    width: "65px !important",
    marginRight: "10px",
    marginTop: "4px",
  },
  title: {
    fontFamily: "Neue Haas Grotesk Display Pro",
    fontStyle: "normal !important",
    fontWeight: "900 !important",
    fontSize: "32.5271px !important",
    lineHeight: "43px !important",
    background:
      "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
  },
  signin: {
    fontWeight: 600,
    fontSize: "30px",
    lineHeight: "36px",
    color: "#2B2F42",
  },
  alreadyaccount: {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "19px",
    color: "#2B2F42",
    marginTop: "10px",
  },
  termsandcondition: {
    letterSpacing: "00.01px",
  },
  Crateaccountbutton: {
    background:
      "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
    fontFamily: "Neue Haas Grotesk Display Pro",
    fontSize: "22px",
    fontHeight: 600,
    lineHeight: "22px",
    letterSpacing: "0em",
    textAlign: "left",
    textTransform: "capitalize",
    color: "#F6F6FB",
    width: "60%",
  },
}));
