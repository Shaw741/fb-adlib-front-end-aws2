import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllAds from "./AllAds";
import AdDeatails from "./adDeatails";

function AdDeatailsTabs() {
  const navigate = useNavigate();
  const adDetailsTabs = {
    ADOVERVIEW: "Ad Overview",
    ALLADS: "All Ads",
  };
  const [isActiveTab, setIsActiveTab] = useState(adDetailsTabs.ADOVERVIEW);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <Button
              disableRipple
              sx={{
                borderBottom: isActiveTab === "Ad Overview" ? 2 : 0,
                height: "20px",
                borderRadius: 0,
                borderColor: "#2B2F42",
                color: "#2B2F42",
              }}
              onClick={() => {
                setIsActiveTab(adDetailsTabs.ADOVERVIEW);
                navigate("");
              }}
            >
              Ad Overview
            </Button>
            <Button
              disableRipple
              sx={{
                borderBottom: isActiveTab === "All Ads" ? 2 : 0,
                height: "20px",
                borderRadius: 0,
                borderColor: "#2B2F42",
                color: "#2B2F42",
              }}
              onClick={() => {
                setIsActiveTab(adDetailsTabs.ALLADS);
                navigate("allAds");
              }}
            >
              All Ads
            </Button>
          </Stack>
        </Box>
      </Box>
      <Routes>
        <Route exact path="" element={<AdDeatails />} />
        <Route exact path="allAds" element={<AllAds />} />
      </Routes>
    </>
  );
}

export default AdDeatailsTabs;
