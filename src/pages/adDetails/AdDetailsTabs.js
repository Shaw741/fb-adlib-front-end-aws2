import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import AllAds from "./AllAds";
import AdDeatails from "./adDeatails";
import { useDispatch, useSelector } from "react-redux";
import { loadSubAllMediaStart } from "../../redux/ducks/subAllAds";
import LeftArrow from "../../assets/LeftArrow.svg";
function AdDeatailsTabs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adID = useParams();

  const { allMediaAdsData } = useSelector((state) => state.allMediaAds);
  const { subAllMedia } = useSelector((state) => state.subAllMedia);
  // const { subAllMedia, loading } = useSelector((state) => state.subAllMedia);

  const adDetailsTabs = {
    ADOVERVIEW: "Ad Overview",
    ALLADS: "All Ads",
  };
  const [isActiveTab, setIsActiveTab] = useState(adDetailsTabs.ADOVERVIEW);
  const { state } = useLocation();

  useEffect(() => {
    if (window.location.pathname === `/adDeatails/${adID.adsId}`) {
      setIsActiveTab(adDetailsTabs.ADOVERVIEW);
    } else {
      setIsActiveTab(adDetailsTabs.ALLADS);
    }
  });
  useEffect(() => {    
    // if (allMediaAdsData) {      
      console.log("1112" +  subAllMedia[0]?.pageInfo?.name+ state.singleAds?.pageInfo?.name)
      if(subAllMedia[0]?.pageInfo?.name !== state.singleAds?.pageInfo?.name) 
        dispatch(loadSubAllMediaStart({ ad_name: state.SingleAds?.pageInfo?.name }));//}
      
    // }
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: 2,
          typography: "body1",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          onClick={() => {
            navigate("/",{ state: { call: false } });
          }}
          sx={{ cursor: "pointer" }}
        >
          <Stack direction={"row"}>
            <Box sx={{ marginRight: "12px" }}>
              <img src={LeftArrow} aria-label="FirstCard" />
            </Box>
            <Typography>
              <b>Search Results</b>
            </Typography>
          </Stack>
        </Box>
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
                navigate("",{ state: {SingleAds: state.SingleAds } });
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
                navigate("allAds",{ state: { SingleAds: state.SingleAds } });
              }}
            >
              All Ads
            </Button>
          </Stack>
        </Box>
      </Box>
      <Routes>
        <Route
          exact
          path=""
          element={<AdDeatails ThumbnailData={state.SingleAds} />}
        />
        <Route exact path="allAds" element={<AllAds />} />
      </Routes>
    </>
  );
}

export default AdDeatailsTabs;
