import React, {  useState } from "react";
import { Box, Button, Grid, InputBase, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { changePassword } from "../services";
import useStyles from "../css/mediapage";


const Passwordchanged = () => {
  const classes = useStyles();
  const [disMatchPassword, setDisMatchPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async (data) => {
    const response = await changePassword({
      c_password: data?.currentpassword,
      n_password: data?.newpassword,
    });
    if (!response.data.error) {
    
      setDisMatchPassword("");
    } else {
      setDisMatchPassword("current password should valid");
    }
  };
  const onError = (error) => console.log("error", error);
  
  return (
    <Box
      border={0.5}
      borderRadius={5}
      borderColor="#EBEBEB"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction={"column"} width="90%" marginTop={3} marginBottom={3}>
        <form onSubmit={handleSubmit(onFormSubmit, onError)}>
          <Stack direction={"row"} spacing={2}>
            <Stack direction={"column"} width="50%">
              <Typography>current password</Typography>
              <InputBase
                className={classes.inputField}
                label="outlined"
                variant="outlined"
                placeholder="Type in your current password"
                name="currentpassword"
                {...register("currentpassword", {
                  required: "currentpassword is required",
                })}
                fullWidth
              />
              {errors.currentpassword?.message && (
                <p style={{ color: "red" }}>current password is required.</p>
              )}
            </Stack>
            <Stack direction={"column"} width="50%">
              <Typography>New password</Typography>
              <InputBase
                className={classes.inputField}
                label="outlined"
                variant="outlined"
                name="newPassword"
                placeholder="Type in your new password"
                {...register("newpassword", {
                  required: "newpassword is required",
                })}
                fullWidth
              />
              {errors.newpassword?.message && (
                <p style={{ color: "red" }}>new password is required.</p>
              )}
            </Stack>
          </Stack>
          {disMatchPassword && (
            <p style={{ color: "red" }}>{disMatchPassword}</p>
          )}
          <Stack direction={"row"} marginTop={2}>
            <Grid
              container
              style={{ display: "flex", justifyContent: "right" }}
              item
            >
              <Box justifyContent={"right "}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: 50,
                    backgroundColor: "#00CBFF",
                  }}
                >
                  Change password
                </Button>
              </Box>
            </Grid>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default Passwordchanged;
