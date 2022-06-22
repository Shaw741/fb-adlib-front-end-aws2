import { Button, Grid, InputBase, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import viss from "../assets/viss.svg";
import { useSelector, useDispatch } from "react-redux";
import { updateAccountSettingsStart } from "../redux/ducks/accountSettings";

const useStyles = makeStyles(() => ({
  inputField: {
    border: "2px solid #EBEBEB",
    borderRadius: "10px",
    // height: "43px",
    paddingLeft: "16px",
    // width: "43px",//{ md: "43px", sm: "43px" ,lg:"43px"},
    height: "43px", //{ md: "43px", sm: "43px" ,lg:"43px"},
  },
}));

function AccountSettings() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountSettings } = useSelector((state) => state.accountSettings);

  const {
    register: personalFormRegister,
    handleSubmit: personalFormHandleSubmit,
    formState: { personalFormErrors },
    setValue: personalFormSetValue,
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  const {
    register: securityFormRegister,
    handleSubmit: securityFormHandleSubmit,
    formState: { securityFormErrors },
    setValue: securityFormSetValue,
  } = useForm({
    defaultValues: {
      c_password: "",
      n_password: "",
    },
  });

  useEffect(() => {
    console.log("accountSettings ::", accountSettings);
    personalFormSetValue("first_name", accountSettings.first_name);
    personalFormSetValue("last_name", accountSettings.last_name);
  }, [accountSettings, personalFormSetValue]);

  // const fields = ["first_name", "last_name"];
  // const getname = async () => {
  //   const res = await getName();
  //   // fields.forEach((field) => setValue(field, res.first_name));
  //   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
  //   console.log(res.data.first_name);
  //   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");

  //   if (res) {
  //     setValue(fields[0], res.data.first_name);
  //     setValue(fields[1], res.data.last_name);
  //   }
  // };

  // useEffect(() => {
  //   getname();
  // }, []);

  // const onFormChangeNameSubmit = async (data) => {
  //   console.log("-----------------------", data);

  //   const response = await changeName({
  //     first_name: data?.first_name,
  //     last_name: data?.last_name,
  //   });

  //   if (!response.success) {
  //     console.log(response.message.response.data.message);
  //     errors.currentPassword.message = "password not mached";
  //   } else {
  //     console.log(response);
  //   }
  // };

  const onPersonalFormSubmit = async (data) => {
    console.table("onPersonalFormSubmit data:", data);
    console.table("onPersonalFormSubmit data:", data);
    dispatch(updateAccountSettingsStart({ data, id: accountSettings?.id }));
    // const response = await changePassword({
    //   c_password: data?.currentpassword,
    //   n_password: data?.newpassword,
    // });

    // if (!response.success) {
    //   console.log(response.message.response.data.message);
    // } else {
    //   console.log(response);
    //   errors.currentPassword.message = "password not mached";
    //   navigate("/");
    // }
  };

  const onSecurityFormSubmit = async (data) => {
    console.table("onSecurityFormSubmit data:", data);
    dispatch(updateAccountSettingsStart({ data, id: accountSettings?.id }));
    // const response = await changePassword({
    //   c_password: data?.currentpassword,
    //   n_password: data?.newpassword,
    // });

    // if (!response.success) {
    //   console.log(response.message.response.data.message);
    // } else {
    //   console.log(response);
    //   errors.currentPassword.message = "password not mached";
    //   navigate("/");
    // }
  };

  return (
    <>
      <Stack marginLeft={5}>
        <Typography variant="h5">
          <b>Account Settings</b>
        </Typography>

        <Stack width="80%" direction={"column"} marginTop={8}>
          <Box>
            <Typography variant="h6">Personal Information</Typography>
            <Box
              border={0.5}
              borderRadius={5}
              borderColor="#EBEBEB"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction={"column"}
                width="90%"
                marginTop={3}
                marginBottom={3}
              >
                <form onSubmit={personalFormHandleSubmit(onPersonalFormSubmit)}>
                  <Stack direction={"row"} spacing={2}>
                    <Stack direction={"column"} width="50%">
                      <Typography>First Name</Typography>
                      <InputBase
                        className={classes.inputField}
                        label="outlined"
                        variant="outlined"
                        placeholder="firstname"
                        {...personalFormRegister("first_name", {
                          required: "firstname is required",
                        })}
                        name="first_name"
                        fullWidth
                      />
                      {personalFormErrors?.first_name?.message && (
                        <p style={{ color: "red" }}>Firstname is required.</p>
                      )}
                    </Stack>
                    <Stack direction={"column"} width="50%">
                      <Typography>Last Name</Typography>

                      <InputBase
                        className={classes.inputField}
                        label="outlined"
                        variant="outlined"
                        placeholder="lastname"
                        {...personalFormRegister("last_name", {
                          required: "lastname is required",
                        })}
                        name="last_name"
                        fullWidth
                      />
                      {personalFormErrors?.last_name?.message && (
                        <p style={{ color: "red" }}>Lastname is required.</p>
                      )}
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} marginTop={2}>
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
                          style={{
                            borderRadius: 50,
                            backgroundColor: "#00CBFF",
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Box>

          <Box marginTop={5}>
            <Typography variant="h6">Security</Typography>
            <Box
              border={0.5}
              borderRadius={5}
              borderColor="#EBEBEB"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction={"column"}
                width="90%"
                marginTop={3}
                marginBottom={3}
              >
                <form onSubmit={securityFormHandleSubmit(onSecurityFormSubmit)}>
                  <Stack direction={"row"} spacing={2}>
                    <Stack direction={"column"} width="50%">
                      <Typography>Current Password</Typography>
                      <InputBase
                        className={classes.inputField}
                        label="outlined"
                        variant="outlined"
                        placeholder="Type in your current password"
                        name="currentPassword"
                        {...securityFormRegister("c_password", {
                          required: "currentpassword is required",
                        })}
                        fullWidth
                      />
                      {securityFormErrors?.currentpassword?.message && (
                        <p style={{ color: "red" }}>
                          Current password is required.
                        </p>
                      )}
                    </Stack>
                    <Stack direction={"column"} width="50%">
                      <Typography>New Password</Typography>
                      <InputBase
                        className={classes.inputField}
                        label="outlined"
                        variant="outlined"
                        name="newPassword"
                        placeholder="Type in your new password"
                        {...securityFormRegister("n_password", {
                          required: "newpassword is required",
                        })}
                        fullWidth
                      />
                      {securityFormErrors?.newpassword?.message && (
                        <p style={{ color: "red" }}>
                          New password is required.
                        </p>
                      )}
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} marginTop={2}>
                    {/* <Button variant="contained">submit</Button> */}
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
          </Box>

          <Box marginTop={5}>
            <Typography variant="h6">Billing</Typography>
            <Box
              border={0.5}
              borderRadius={5}
              borderColor="#EBEBEB"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction={"column"}
                width="90%"
                marginTop={3}
                marginBottom={3}
              >
                <Stack
                  direction={"row"}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Stack direction={"row"} spacing={10}>
                    <Stack direction={"column"}>
                      {/* <FaCcVisa /> */}

                      <Typography>Payment method</Typography>
                      {/* <TextField label="current password"/> */}
                    </Stack>
                    <Stack direction={"column"}>
                      <Stack direction={"row"}>
                        <Typography>
                          <img
                            src={viss}
                            alt="img1"
                            style={{ height: "20px", width: "30px" }}
                          />
                        </Typography>
                        <Typography style={{ marginLeft: 3 }}>
                          <b>Visa ending in 4436</b>
                        </Typography>
                      </Stack>

                      {/* <TextField label="New password" /> */}
                    </Stack>
                  </Stack>
                  <Stack direction={"row"}>
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
                          style={{
                            borderRadius: 50,
                            backgroundColor: "#00CBFF",
                          }}
                        >
                          Change Payment Method
                        </Button>
                      </Box>
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Box marginTop={5}>
            <Typography variant="h6">Subscription</Typography>
            <Box
              border={0.5}
              borderRadius={5}
              borderColor="#EBEBEB"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction={"column"}
                width="90%"
                marginTop={3}
                marginBottom={3}
              >
                <Stack
                  direction={"row"}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Stack direction={"column"}>
                    <Typography variant="h6">
                      Subscription Status:
                      {/* <Box fontWeight="bold" > */}
                      <b>true</b>
                      {/* </Box> */}
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography>
                      Plan:<b>PRO</b>
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
                    <Typography>
                      Next Renew:<b>May 20,2022</b>
                    </Typography>
                  </Stack>
                  <Stack direction={"column"}>
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
                          style={{
                            borderRadius: 50,
                            backgroundColor: "#00CBFF",
                          }}
                        >
                          Change Payment Method
                        </Button>
                      </Box>
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
export default AccountSettings;
