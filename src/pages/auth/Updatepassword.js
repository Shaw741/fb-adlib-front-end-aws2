import fbaddlogo from "../../assets/fbaddlogo.png";
import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { themeLight, globalStyles } from "../../css/globalcss";
import { CssBaseline } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import {  useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services";
import queryString from "query-string";

const Updatepassword = () => {
  const global = globalStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const navigate = useNavigate()
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
  const { search } = useLocation();
  const value = queryString.parse(search);
  const token = value.token;
  const resetpassword = async (data) => {
    setLoading(true);
    console.log("getTkn", token);
    try {
      console.log("getTkn11", token);
      console.log("password",data.password)
      const res = await resetPassword({
        token: token,
        password: data.password,
      });
      console.log("+++",res)
      setLoading(true);
      if (res.data.message === "Password updated") {
        setErrormessage("Password successfull Updated");
        setLoading(false);
      }else if(res.data.message==="Token is not valid"){
        setLoading(false)
        // setErrormessage("error ocour")
      }
    } catch {
      setLoading(false);
    }
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
                <Box mt={2} width="85%" ml={4}>
                  {errormessage && (
                    <Alert severity="success">
                      {errormessage}{" "}
                      <b
                        style={{ marginLeft: "100px",cursor: "pointer",}}
                        onClick={() => navigate("/auth/login")}
                      >
                        Go To Login
                      </b>{" "}
                    </Alert>
                  )}
                </Box>
                <Box style={{ padding: "30px 45px" }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Update password
                  </Typography>
                  <form style={{ paddingTop: "36px" }}>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        {...register("password", {
                          required:
                            "Please enter a valid min 6 charcter password",
                          pattern: {
                            value: /[a-zA-Z]+/,
                          },
                        })}
                      />
                      <Typography variant="inherit" color="red" p={0.5}>
                        {errors.password?.message}
                      </Typography>
                      <Grid item xs={12} mt={2}>
                        <FormControl
                          sx={{ mr: 1, width: "100%" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Confirm Password
                          </InputLabel>
                          <OutlinedInput
                            placeholder="Confirm Password"
                            variant="outlined"
                            fullWidth
                            required
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            {...register("confirm_password", {
                              validate: (value) => {
                                const { password } = getValues();
                                return (
                                  password === value ||
                                  "Passwords does not match!"
                                );
                              },
                            })}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {values.showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="confirm Password"
                          />
                        </FormControl>
                        <Typography variant="inherit" color="red" p={0.8}>
                          {errors.confirm_password?.message}
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
                    onClick={handleSubmit(resetpassword)}
                  >
                    {loading ? (
                      <CircularProgress
                        size={36}
                        style={{ color: "#F6F6FB" }}
                      />
                    ) : (
                      "Update password"
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

export default Updatepassword;