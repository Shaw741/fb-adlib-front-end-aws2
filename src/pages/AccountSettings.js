import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import viss from "../assets/viss.svg";
import PersonalInfo from "./PersonalInfo";
import Passwordchanged from "./Passwordchanged";

function AccountSetings() {
  return (
    <>
      <Stack marginLeft={5}>
        <Typography variant="h5">
          <b>Account Settings</b>
        </Typography>

        <Stack width="80%" direction={"column"} marginTop={8}>
          <PersonalInfo />

          <Passwordchanged />

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
                      <Typography>Payment method</Typography>
                    </Stack>
                    <Stack direction={"column"}>
                      <Stack direction={"row"}>
                        <Typography>
                          <img
                            src={viss}
                            alt="viss"
                            style={{ height: "20px", width: "30px" }}
                          />
                        </Typography>
                        <Typography style={{ marginLeft: 3 }}>
                          <b>Visa ending in 4436</b>
                        </Typography>
                      </Stack>
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
                      <b>true</b>
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

export default AccountSetings;
