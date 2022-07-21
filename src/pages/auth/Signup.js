import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
  CardContent,
  Grid,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUp } from "../../services/index";
import { themeLight, globalStyles } from "../../css/globalcss";
import { CssBaseline } from "@material-ui/core";
import { registerValidationSchema } from "./../../utils/validationSchemas";
import fbaddlogo from "../../assets/fbaddlogo.png"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useHistory } from "react-router-dom";
const Signup = () => {
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
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
  const submitsigninform = async (data) => {
    setLoading(true);
    try {
      const response = await signUp(data);
      if (response.data.message === "Password is too short") {
        setLoading(false)
        setErrormessage("Password is too short")
      }
      else if (response.data.message === "User already exist") {
        setLoading(false)
        setErrormessage("The email address is already in used")
      } else if (response.success) {
        history.push("/auth/login");
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
              <img alt="logo" src={fbaddlogo} className={global.logo} />
              <form
                onSubmit={handleSubmit(submitsigninform)}
              >
                <Box style={{ padding: "18px 61px" }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Create a free account
                  </Typography>

                  <Typography className={global.alreadyaccount} pt={1}>
                    Already have an account?{" "}
                    <span
                      style={{ color: "#00CBFF", cursor: "pointer", marginLeft: "5px" }}
                      onClick={() => history.push("/auth/login")}
                    >
                      Sign in
                    </span>
                    <Box mt={2}>
                      {errormessage === "The email address is already in used" ?
                        (< Box mt={2}>
                          {errormessage && <Alert severity="error" >{errormessage}</Alert>}
                        </Box>) :
                        (<Box mt={2}>
                          {errormessage && <Alert severity="error" >{errormessage}</Alert>}
                        </Box>)
                      }
                    </Box>
                  </Typography>
                  <Grid container spacing={2} pt={4} >
                    <Grid xs={12} item>
                      <TextField
                        placeholder="Enter first name"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        name="first_name"
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        placeholder="Enter last name"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        placeholder="Email address"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        {...register("email")}
                        error={errors.email ? true : false}
                      />
                      <Typography
                        variant="inherit"
                        color="textSecondary"
                        p={0.5}
                      >
                        {errors.email?.message}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl sx={{ mr: 1, width: '100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password"  error={errors.password ? true : false}>Password</InputLabel>
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
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Controller
                            control={control}
                            name="acceptTerms"
                            defaultValue="false"
                            inputRef={register()}
                            render={({ field: { onChange } }) => (
                              <Checkbox
                                style={{ color: "#00CBFF" }}
                                onChange={(e) => onChange(e.target.checked)}
                              />
                            )}
                          />
                        }
                        label={
                          <Typography
                            color={errors.acceptTerms ? "error" : "inherit"}
                            className={global.termsandcondition}
                          >
                            I agree to the
                            <Typography component={'span'} style={{ color: "#00CBFF" }}>   Terms of service </Typography>
                            {""}and {""}
                            <Typography component={'span'} style={{ color: "#00CBFF" }}>
                              Privacy Policy
                            </Typography>
                          </Typography>
                        }
                      />
                      <br />
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
                    onClick={handleSubmit(submitsigninform)}
                  >
                    {loading ? (
                      <CircularProgress size={36} style={{ color: "#F6F6FB" }} />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Signup;
