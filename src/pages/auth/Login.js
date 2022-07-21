import fbaddlogo from "../../assets/fbaddlogo.png"
import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import { login } from "../../services/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { themeLight, globalStyles } from "../../css/globalcss";
import { loginvalidationSchema } from "./../../utils/validationSchemas";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Login = () => {
  const global = globalStyles();
  // const navigate = useNavigate();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("")
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginvalidationSchema),
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submitLoginform = (data) => {
    setLoading(true);
    login(data).then((res) => {
      localStorage.setItem("is_alive", true);
      history.push("/");
    }, (error) => {
      localStorage.setItem("is_alive", false);
      setLoading(false);
      const res = login(data)
      if (res.error === "User does not exist with us") {
        console.log("bdshfskfusdjfkjk")
        setErrormessage("User does not exist with us")
      }
      if (res.error === "true")
        console.log("bdshfskfusdjfkjk")
      setErrormessage("Invalid email or password")
    })
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
                <Box style={{ padding: "30px 45px" }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Log in
                  </Typography>

                  <Typography pt={1}>
                    Don't have an account ?{" "}
                    <span
                      onClick={() => history.push("/auth/register")}
                      style={{ color: "#00CBFF", cursor: "pointer" }}
                    >
                      Register
                    </span>
                  </Typography>
                  <Box mt={2}>
                    {errormessage && <Alert severity="error" >{errormessage}</Alert>}
                  </Box>
                  <form style={{ paddingTop: "36px" }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          type="email"
                          placeholder="Email adderss"
                          label="Email"
                          variant="outlined"
                          fullWidth
                          required
                          {...register("email")}
                          error={errors.email ? true : false}
                        />
                        <Grid item xs={12}>
                          <Typography
                            variant="inherit"
                            color="textSecondary"
                            p={0.8}
                          >
                            {errors.email?.message}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} display="flex">
                        <Box
                          onClick={() => history.push("/auth/forgot-password")}
                          sx={{ marginLeft: "auto" }}
                        >
                          <Typography
                            style={{ color: "#00CBFF", cursor: "pointer" }}
                          >
                            {" "}
                            Forgot Password?{" "}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl sx={{ mr: 1, width: '100%' }} variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-password" error={errors.password ? true : false}>Password</InputLabel>
                          <OutlinedInput
                            placeholder="Password"
                            variant="outlined"
                            fullWidth
                            required
                            {...register("password")}
                            error={errors.password ? true : false}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword  ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </FormControl>
                        <Typography
                          variant="inherit"
                          color="textSecondary"
                          p={0.8}
                        >
                          {errors.password?.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    className={global.Crateaccountbutton}
                    sx={{
                      borderRadius: "14px",
                      textTransform: "none",
                      fontSize: "20px",
                    }}
                    onClick={handleSubmit(submitLoginform)}
                  >
                    {loading ? (
                      <CircularProgress size={36} style={{ color: "#F6F6FB" }} />
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Login;
