import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Grid, InputBase } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { contactSupport } from "../services";
import useStyles from "../css/mediapage";

const ContactSupport = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    const response = await contactSupport({
      name: data.firstName,
      email: data.email,
      message: data.Message,
    });
    if (response.success) {
      navigate("/");
    }
  };

  return (
    <>
      <Box
        clone
        style={{ alignItems: "center", justifyContent: "center" }}
        margin={5}
      >
        <Typography fontSize={{ lg: 25, md: 25, sm: 25 }}>
          <b>Contact Support</b>
        </Typography>

        <Box
          width={{ lg: "60%", md: "90%", sm: "90%" }}
          border={0.5}
          borderRadius={5}
          borderColor="#ebebeb"
        >
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Grid item xs={10} container spacing={2} margin={2}>
              <Grid xs={6} sm={6} lg={6} item>
                <InputBase
                  className={classes.inputField}
                  label="outlined"
                  variant="outlined"
                  placeholder="Name"
                  error
                  name="firstName"
                  fullWidth
                  {...register("firstName", {
                    required: "FirstName is required",
                  })}
                />
                {errors.firstName?.message && (
                  <p style={{ color: "red" }}>Last name is required.</p>
                )}
              </Grid>

              <Grid xs={6} sm={6} lg={6} item>
                <InputBase
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
                  <p style={{ color: "red" }}>Email is required.</p>
                )}
              </Grid>

              <Grid xs={12} item>
                <InputBase
                  className={classes.multilineinput}
                  label="outlined"
                  variant="outlined"
                  {...register("Message", { required: "Message is required" })}
                  fullWidth
                  placeholder="Message"
                  multiline
                  rows={10}
                  name="Message"
                />
                {errors.Message?.message && (
                  <p style={{ color: "red" }}>Message is required.</p>
                )}
              </Grid>

              <Grid
                container
                style={{ display: "flex", justifyContent: "right" }}
                item
              >
                <Box justifyContent={"right "}>
                  <Button
                    type="Submit"
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: 50, backgroundColor: "#00CBFF" }}
                  >
                    <Typography fontSize={{ lg: 15, md: 13, sm: 13 }}>
                      Submit
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
