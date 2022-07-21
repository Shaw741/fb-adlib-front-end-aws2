import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {  useHistory, useParams } from "react-router-dom";
import AllAds from "./AllAds";
import AdDeatails from "./adDeatails";
import { useDispatch, useSelector } from "react-redux";
import { loadSubAllMediaStart } from "../../redux/ducks/subAllAds";
import LeftArrow from "../../assets/LeftArrow.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function AdDeatailsTabs() {
  // const navigate = useNavigate();
  const history = useHistory();
  const dispatch = useDispatch();
  // const history = useHistory();
  // const { itemId, otherParam } = route.params;
  // const { state } = useLocation();
  console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\?????????????");
  // console.log(state.adName);
  console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
  const adID = useParams();

  const { allMediaAds } = useSelector((state) => state.allMediaAds);
  const { subAllMedia } = useSelector((state) => state.subAllMedia);
  console.log(adID);
  console.log("11111111111111111");
  console.log(subAllMedia[0]?.pageInfo?.name);
  console.log("11111111111111111");

  const adDetailsTabs = {
    ADOVERVIEW: "Ad Overview",
    ALLADS: "All Ads",
  };
  const [isActiveTab, setIsActiveTab] = useState(adDetailsTabs.ADOVERVIEW);
  const [adDetail, setAdDetail] = useState();
  useEffect(() => {
    if (window.location.pathname === `/adDeatails/${adID.adsId}`) {
      setIsActiveTab(adDetailsTabs.ADOVERVIEW);
    } else {
      setIsActiveTab(adDetailsTabs.ALLADS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  useEffect(() => {
    if (allMediaAds) {
      console.log("comin------------------");
      console.log(allMediaAds[1]?.all_ads);
      // eslint-disable-next-line array-callback-return
      const singleAds = allMediaAds[1]?.all_ads.find((ad) => {
        if (ad.adID === adID.adsId) {
          return ad;
        }
      });

      setAdDetail(() => singleAds);
      console.log(singleAds);
      console.log();
      if (subAllMedia[0]?.pageInfo?.name === singleAds?.pageInfo?.name) {
        console.log("dont callllllllllllllllllllllllll");
      } else {
        dispatch(loadSubAllMediaStart({ ad_name: singleAds?.pageInfo?.name }));
      }
    }
  }, [allMediaAds, adID.adsId, adDetail, subAllMedia, dispatch]);

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
            // history.goBack();
            history.push("/");
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
                history.push("");
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
                history.push("allAds");
              }}
            >
              All Ads
            </Button>
          </Stack>
        </Box>
      </Box>
      <Router>
        <Route
          exact
          path=""
          element={<AdDeatails ThumbnailData={adDetail} />}
        />
        <Route exact path="allAds" element={<AllAds />} />
      </Router>
    </>
  );
}

export default AdDeatailsTabs;
