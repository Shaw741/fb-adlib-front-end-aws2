import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { contactSupport } from "../services";
import useStyles from "../css/mediapage";
import { ButtonThemeColor } from "../Golbal_variable";

const ContactSupport = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const savebutton = useMediaQuery(theme.breakpoints.up("sm"));
  const [resendmessage, setResendmessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    setLoading(true);
    console.table("Contact Support Form Data :", data);
    const response = await contactSupport(data);
    console.log(response.data.message);
    setResendmessage(response.data.message);
    if (!response.success) {
      setResendmessage("Email send Successfully");
      setLoading(false);
    } else {
      setLoading(false);
      // navigate("/");
    }
  };

  return (
    <>
      <Box
        clone
        sx={{
          alignItems: "center",
          justifyContent: "center",
          disabled: loading ? true : false,
          marginTop:2,
          // marginLeft:"35px",
          // width:{lg:"80%",md:"90%",sm:"90%",xs:"99%"},
          marginLeft: { xs: "15px", sm: "35px", md: "30px", lg: "40px" },
          marginRight: { xs:"15px", sm: 0, md: 0, lg: "40px" },
        }}
      >
        <Typography
          className={classes.titleHome}
          variant="h5"
          ml={1}
          sx={{ fontWeight: "bold", color: "#3A3D4B" }}
        >
          <b>Contact Support</b>
        </Typography>

        <Box
          sx={{
            opacity: loading ? 0.5 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          width={{ lg: "70%", md: "90%", sm: "90%" }}
          border={0.5}
          borderRadius={5}
          marginTop={3}
          borderColor="#ebebeb"
        >
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid              
              xs={11}
              container
              spacing={2}
              sx={{ margin: { xs: "-5px", sm: "10px", md: "8px", lg: "8px" }, }}
            >
              <Grid xs={12} sm={6} lg={6} item >
                <InputBase
                  disabled={loading ? true : false}
                  className={classes.inputField}
                  label="outlined"
                  variant="outlined"
                  placeholder="Name"
                  error
                  name="name"
                  fullWidth
                  {...register("name", {
                    required: "FirstName is required",
                  })}
                />
                {errors.name?.message && (
                  <span style={{ color: "#00CBFF" }}>*Name is required</span>
                )}
              </Grid>

              <Grid xs={12} sm={6} lg={6} item>
                <InputBase
                  disabled={loading ? true : false}
                  className={classes.inputField}
                  type="email"
                  label="outlined"
                  variant="outlined"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  fullWidth
                  placeholder="Email"
                  name="email"
                />
                {errors.email?.message && (
                  <span style={{ color: "#00CBFF" }}>*Email is required.</span>
                )}
              </Grid>

              <Grid xs={12} item>
                <InputBase
                  disabled={loading ? true : false}
                  className={classes.multilineinput}
                  label="outlined"
                  variant="outlined"
                  {...register("message", { required: "Message is required" })}
                  fullWidth
                  placeholder="Message"
                  multiline
                  rows={10}
                  name="message"
                />
                {errors.message?.message && (
                  <span style={{ color: "#00CBFF" }}>
                    *Message is required.
                  </span>
                )}
              </Grid>
              {resendmessage === "Email sent" && (
                <Grid item xs={12}>
                  <Alert severity="success">Email send successfully</Alert>
                </Grid>
              )}
              <Grid
                container
                style={{
                  display: "flex",
                  justifyContent: savebutton ? "right" : "center",
                }}
                item
              >
                <Box p={2.5}>
                  <Button
                    type="Submit"
                    variant="contained"
                    color="primary"
                    className={classes.sendbutton}
                    sx={{
                      borderRadius: "15px",
                      background:ButtonThemeColor,
                        // "linear-gradient(243.18deg, #B5EDFF 0%, #00CBFF 28.65%, #6721FF 85.94%)",
                      width: {
                        xs: "232px",
                        sm: "120px",
                        md: "120px",
                        lg: "120px",
                      },
                    }}
                  >
                    <Typography
                      fontSize={{ lg: 15, md: 13, sm: 13 }}
                      sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                      {loading ? (
                        <CircularProgress
                          size="1.5rem"
                          sx={{
                            color: "white",
                          }}
                        />
                      ) : (
                        <>Send</>
                      )}
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ContactSupport;
