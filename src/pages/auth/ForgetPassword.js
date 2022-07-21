import fbaddlogo from "../../assets/fbaddlogo.png"
import React, { useState, useEffect } from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Backtologin from "../../assets/Backtologinicon.svg";
import { useHistory, useNavigate } from "react-router-dom";
import { forgotPassword, isAlive } from "../../services/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { themeLight, globalStyles } from "../../css/globalcss";
import { CssBaseline } from "@material-ui/core";
import { forgetvalidationSchema } from "./../../utils/validationSchemas";
const useStyles = makeStyles(() => ({
  Backtologinbutton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "32px",
  },
}));

const ForgetPassword = () => {
  const classes = useStyles();
  const global = globalStyles();
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetvalidationSchema),
  });

  const forgetPassword = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    const response = await forgotPassword(formData);
    if (response.success) {
      setLoading(false);
    }
  };

  const getAlive = async () => {
    const res = await isAlive();
    if (res.success && res?.data?.data) {
      if (res?.data?.data?.is_alive === true) {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    getAlive();
  }, []);

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
          <Grid>
            <Card
              style={{
                maxWidth: 632,
                padding: "20px 5px",
                margin: "0 auto",
                backgroundColor: "#F6F6FB",
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <img alt="logo" src={fbaddlogo} className={global.logo} />
                <Box style={{ padding: "30px 32px" }}>
                  <Grid container spacing={2}>
                    <Grid xs={12} item>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Forget Password?
                      </Typography>
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        type="email"
                        placeholder="Enter email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        {...register("email")}
                        error={errors.email ? true : false}
                      />
                      <Typography variant="inherit" color="textSecondary" p={1}>
                        {errors.email?.message}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: "14px",
                      textTransform: "none",
                      fontSize: "20px",
                    }}
                    className={global.Crateaccountbutton}
                    onClick={handleSubmit(forgetPassword)}
                  >
                    {loading ? (
                      <CircularProgress style={{ color: "#F6F6FB" }} />
                    ) : (
                      "Forget Password"
                    )}
                  </Button>
                </Box>
                <Box className={classes.Backtologinbutton}>
                  <img
                    src={Backtologin}
                    className={classes.BackToLogInArrow}
                    style={{ marginRight: "10px" }}
                    alt="bactologin"
                  />
                  <Typography
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    onClick={() => history.push("/auth/login")}
                  >
                    Back to log in
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Grid>
    </MuiThemeProvider>
  );
};

export default ForgetPassword;
