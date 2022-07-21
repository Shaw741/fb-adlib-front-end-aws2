/* eslint-disable no-useless-computed-key */
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import {
  // createSavedAdsStart,
  // deleteSavedAdsStart,
} from "../redux/ducks/saveAds";
import Firstcard from "../assets/Firstcard.svg";
import Firstcardimg from "../assets/FirstCardImg.svg";
import Shareicon from "../assets/Shareicon.svg";
import Saveicon from "../assets/Saveicon.svg";
import Addgraph from "../assets/Addgraph.svg";
import StarFill from "../assets/StarFill.svg";
import {
  createSavedAdsClientSideStart,
  createSavedAdsStart,
  deleteSavedAdsClientSideStart,
  deleteSavedAdsClientSideSuccess,
  deleteSavedAdsStart,
} from "../redux/ducks/saveAds_clientSide";
import pauseButton from "../assets/pauseButton.svg";
import { srtPostionForScrollValueStart } from "../redux/ducks/filtered_Data";
import { SingleLineChart } from "./Graph";
import MyChart from "./MyChart";
import MyCharttt from "./linemy";

const useStyles = makeStyles((theme) => ({
  fixSizeImage: {
    // eslint-disable-next-line no-useless-computed-key
    // ['@media (min-width:780px)']:{height:"300px"},
    // eslint-disable-next-line no-useless-computed-key
    // ['@media (min-width:1000px)']:{height:"450px"}
    // @media screen and (min-width: 480px) {
    // .wrapper {
    //   background-color: light green;
    // }
  },
  title: {
    background:
      "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  titleHome: {
    // height: "37px !important",
    // width: "41px !important",
    // marginRight: "10px",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "24px",
    color: "#2B2F42",
  },
  subTitleHome: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "24px",
    color: "#2B2F42",
    marginTop: "8px",
    marginBottom: "18px",
  },
  addTextfilter: {
    padding: theme.spacing(1, 3),
    border: "1px solid #EBEBEB",
    borderRadius: "15px",
    marginTop: "10px",
  },
  addtextfilterButton: {
    padding: "4px 4px",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    border: "2px solid #EBEBEB",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  calenderfilter: {
    color: "#2B2F42",
    whiteSpace: "nowrap",
    border: "1px solid #EBEBEB",
    borderRadius: 3,
  },
  AdsImageSize: {
    // objectfit: "fill",
    // ['@media (min-width:400px)']:{height:"190px"},
    ["@media (min-width:780px)"]: { height: "290px" },
    ["@media (min-width:920px)"]: { height: "250px" },
    // ['@media (min-width:1080px)']:{height:"300px"},
    ["@media (min-width:1440px)"]: { height: "290px" },
    ["@media (min-width:1700px)"]: { height: "410px" },
    width: "100%",
    padding: "0",
    margin: "0",
    overflowY: "none",
    outline: "none",
  },
  AdsImage: {
    width: "100%",
    height: "230px",
    objectFit: "fill",
    padding: "0",
    margin: "0",
    overflowY: "none",
    outline: "none",
  },
  AdsVideo: {
    width: "100%",
    objectFit: "cover",
    // objectfit: "fill",
    // height: "auto",
    padding: "0",
    margin: "0",
    overflowY: "none",
    outline: "none",
  },
  DropDownArrow: {
    marginLeft: theme.spacing(1),
  },
  shareicon: {
    marginLeft: theme.spacing(3),
    cursor: "pointer",
  },
  saveicon: {
    marginLeft: theme.spacing(2),
    cursor: "pointer",
  },
  AdsText: {
    display: "inlineBlock",
    fontWeight: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden !important",
    textOverflow: "ellipsis",
  },
  Addheader: {
    display: "flex",
    padding: "6px",
    whiteSpace: "nowrap",
  },
  AddFooter: {
    display: "flex",
    flexWrap: "wrap",
    whiteSpace: "nowrap",
  },
  FilterBox: {
    color: "#2B2F42",
    whiteSpace: "nowrap",
    border: "1px solid #EBEBEB",
    borderRadius: "10px",
    marginRight: "14px",
    marginTop: "22px",
  },
}));

const ThumbNailBox = ({ adInfo, index, deleteId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const history = useHistory();
  return (
    <Grid item lg={3} md={4} xs={5} key={index}>
      <Stack
        sx={{          
          border: "2px solid #F6F6FB",
          padding: "10px",
          justifyContent:"space-between"
        }}
      >
        <Box className={classes.Addheader}>
          <Box
            sx={{
              border: 1,
              // width: "35px",
              borderRadius: "50%",
              borderColor: "#EBEBEB",
              // borderColor: "black",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              src={adInfo?.pageInfo?.logo}
              aria-label="FirstCard"
              sx={{ width: 27, height: 27 }}
            ></Avatar>
          </Box>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "16px",
              lineHeight: "24px",
              color: "#2B2F42",
              marginRight: "12px",
              paddingLeft: "10px",
              //  fontWeight: "bold"
            }}
          >
            {adInfo?.pageInfo?.name}
          </Typography>
          <Typography
            noWrap
            sx={{
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "24px",
              color: "#2B2F42",
              opacity: 0.6,
              marginRight: "12px",
            }}
          >
            {`(${Intl.NumberFormat().format(
              adInfo?.pageInfo?.platforms[0]?.likes
            )} likes)`}
          </Typography>
        </Box>
        {/* <Box style={{ maxHeight:"400px"}}> */}
        <div style={{ height: "300px" }}>
          {adInfo.adMediaType === "video" ? (
            //   <ReactSimpleVideoPlayer
            //   url={adInfo?.bucketMediaURL}
            //   poster={adInfo?.thumbBucketUrl}
            //   className={classes.AdsImageVideo}
            //   controls
            //   autosize
            // />
            <video
              src={adInfo.bucketMediaURL}
              poster={adInfo?.thumbBucketUrl}
              style={{ height: "300px" }}
              // style={{
              //   backgroundImage:
              //     pauseButton,
              //   backgroundRepeat: 'no-repeat',
              //   backgroundPosition: 'center'
              // }}
              // style={{ maxHeight: "200px" }}
              //  style={{ maxHeight:"320px"}}
              autoPlay={false}
              className={classes.AdsVideo}
              controls
            />
          ) : adInfo?.adMediaType === "image" ? (
            <img
              src={adInfo?.bucketMediaURL}
              alt="thumbnail"
              style={{ height: "300px" }}
              className={classes.AdsImage}
            />
          ) : (
            <img
              src={Firstcardimg}
              alt="thumbnail"
              className={classes.AdsImage}
            />
          )}
        </div>

        <Grid container sx={{ padding: "4px" }}>
          <Grid item sm={9} md={9} lg={9} >
            {/* <Box
              className={classes.AddFooter}
              style={{ alignItems: "baseline" }}
            > */}
              <Stack direction={"column"}>
                <Stack direction={"row"}>
                  {/* <Typography sx={{ textDecoration: 'underline', }}>{adInfo.status}</Typography> */}
                  {adInfo.status === "Active" ? (
                    <Typography>{adInfo.status}</Typography>
                  ) : (
                    <Typography sx={{ color: "red" }}>
                      {adInfo.status}
                    </Typography>
                  )}
                  <Tooltip title="Redirect to shop link">
                    <img
                      src={Shareicon}
                      alt="Shareicon"
                      className={classes.shareicon}
                      onClick={(e) => {
                        console.log(adInfo?.purchaseURL);
                        // e.preventDefault();
                        window.open(adInfo?.purchaseURL, "_blank", "");
                        // window.location.target="_blank"
                        // window.location.href=adInfo?.purchaseURL;
                      }}
                    />
                  </Tooltip>
                  {deleteId ? (
                    <img
                      src={StarFill}
                      alt="StarFill"
                      className={classes.saveicon}
                      onClick={() => {
                        // dispatch(deleteSavedAdsClientSideStart(adInfo));
                        dispatch(deleteSavedAdsStart({ ad: adInfo?.id }));
                      }}
                    />
                  ) : (
                    <img
                      src={Saveicon}
                      alt="Saveicon"
                      className={classes.saveicon}
                      onClick={async () => {
                        // dispatch(createSavedAdsClientSideStart(adInfo));
                        await dispatch(createSavedAdsStart({ ad: adInfo.id }));
                      }}
                    />
                  )}
                </Stack>
                
                  <Typography color="#c0c0c0" className={classes.AdsText} noWrap>
                    Started Running : {adInfo.startDate}
                  </Typography>
                  {/* <Grid> */}
                  <Typography color="#2B2F42" className={classes.AdsText} noWrap>
                    {adInfo.headline}
                  </Typography>
                  {/* </Grid> */}
                </Stack>
              {/* </Stack> */}
            {/* </Box> */}
          </Grid>
          <Grid
            item
            sm={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#00CBFF",
                display: "grid",
                width: "52px",
                height: "51px",
                padding: "5px 10px 10px",
              }}
            >
              <span
                style={{
                  fontSize: "25px",
                  lineHeight: "24px",
                  padding: "2px",
                  fontWeight: "700",
                }}
              >
                {adInfo.noOfCopyAds}
              </span>
              <span style={{ fontSize: "10px", margin: "auto" }}>Ads</span>
            </Avatar>
          </Grid>
        </Grid>

        
        <Box sx={{ marginTop: "20px", marginBottom: "20px" , height:"100px"}}>
          {/* <SingleLineChart chartData={adInfo?.history}/> */}
          {/* <MyChart chartData={adInfo?.history} dataBoxVisiblity={false} axisVisiblity={false} fillType={"line"} graphHeight={"100px"}/> */}
          <MyCharttt
            chartData={adInfo?.history}
            dataBoxVisiblity={false}
            axisVisiblity={false}
            graphHeight={"100px"}
          />
          {/* <img
            src={Addgraph}
            alt="addgraph"
            className={classes.AdsImageVideo}
          /> */}
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: "17px",
            background:
              "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
            // minwidth:"350px",
            textTransform: "none",
          }}
          onClick={() => {
            dispatch(srtPostionForScrollValueStart(window.pageYOffset));
            history.push(`/adDeatails/${adInfo.adID}`);
          }}
        >
          <b>See Details</b>
        </Button>
      </Stack>
    </Grid>
  );
};

export default ThumbNailBox;
