import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Firstcardimg from "../assets/FirstCardImg.svg";
import Shareicon from "../assets/Shareicon.svg";
import Saveicon from "../assets/Saveicon.svg";
import StarFill from "../assets/StarFill.svg";
import MyChart from "./linemy";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShowMoreText from "react-show-more-text";
import {
  addToSavedAdsFilterLocalStart,
  removesavedFilteredAdLocal,
  setPostionForSavedPageToScrollValueStart,
} from "../redux/ducks/filteredSavedAds";
import {
  addSavedAdsIdsLocal,
  addToSavedAdsStart,
  removeFromSavedAdsStart,
  removeSavedAdsIdsLocal,
} from "../redux/ducks/savedAdsManager";
import { setPostionForScrollValueStart } from "../redux/ducks/filteredAds";
import { setPostionForSubAllAdsToScrollValueStart } from "../redux/ducks/subAllAds";
import AccessTime from "@mui/icons-material/AccessTime";
import { ButtonThemeColor } from "../Golbal_variable";

const useStyles = makeStyles((theme) => ({
  title: {
    background:
      "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  titleHome: {
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
    // ["@media (min-width:780px)"]: { height: "290px" },
    // ["@media (min-width:920px)"]: { height: "250px" },
    // ["@media (min-width:1440px)"]: { height: "290px" },
    // ["@media (min-width:1700px)"]: { height: "410px" },
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
    padding: "0",
    margin: "0",
    overflowY: "none",
    outline: "none",
  },
  DropDownArrow: {
    marginLeft: theme.spacing(1),
  },
  shareicon: {
    marginLeft: theme.spacing(1),
    cursor: "pointer",
  },
  saveicon: {
    marginLeft: theme.spacing(1),
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

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <Typography variant="p" className="text" style={{fontSize:"15px"}}>
        {isReadMore ? text.slice(0, 150) : text}
        {text.length >=150 && <Typography
          variant="h7"
          style={{ color: "#72E2FF", cursor: "pointer" }}
          onClick={toggleReadMore}
          className="read-or-hide"
        >
          {isReadMore ? "...Read more" : " Show less"}
        </Typography>}
      </Typography>
    </>
  );
};

const ThumbNailBox = ({ adInfo, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const smallScreenPointOnly = useMediaQuery(theme.breakpoints.only("xs"));

  const [queryObject, setQueryObject] = useState({});

  const savedAdsManager = useSelector((state) => state.savedAdsManager);
  const savedAdsPerams = useSelector((state) => state.savedAdsPerams);

  useEffect(() => {
    const queryObject = {
      startdate: savedAdsPerams?.appliedFilters?.StartRunningDate?.startdate,
      enddate: savedAdsPerams?.appliedFilters?.StartRunningDate?.enddate,
      adcount:
        savedAdsPerams?.appliedFilters?.AdCount?.min >
          savedAdsPerams?.maxRanger.AdCount?.min ||
        savedAdsPerams?.appliedFilters?.AdCount?.max <
          savedAdsPerams?.maxRanger.AdCount?.max
          ? [
              savedAdsPerams?.appliedFilters?.AdCount?.min,
              savedAdsPerams?.appliedFilters?.AdCount?.max,
            ]
          : [],
      adstatus: savedAdsPerams?.appliedFilters?.AdStatus?.status?.selectedValue,
      fb_likes:
        savedAdsPerams?.appliedFilters?.FacebookLikes?.min >
          savedAdsPerams?.maxRanger.FacebookLikes?.min ||
        savedAdsPerams?.appliedFilters?.FacebookLikes?.max <
          savedAdsPerams?.maxRanger.FacebookLikes?.max
          ? [
              savedAdsPerams?.appliedFilters?.FacebookLikes?.min,
              savedAdsPerams?.appliedFilters?.FacebookLikes?.max,
            ]
          : [],
      insta_followers:
        savedAdsPerams?.appliedFilters?.InstragramLike?.min >
          savedAdsPerams?.maxRanger.InstragramLike?.min ||
        savedAdsPerams?.appliedFilters?.InstragramLike?.max <
          savedAdsPerams?.maxRanger.InstragramLike?.max
          ? [
              savedAdsPerams?.appliedFilters?.InstragramLike?.min,
              savedAdsPerams?.appliedFilters?.InstragramLike?.max,
            ]
          : [],
      media_type: savedAdsPerams?.appliedFilters?.MediaType?.selectedValue,
      cta_status: savedAdsPerams?.appliedFilters?.ButtonStatus?.selectedValue,

      sort_by:
        savedAdsPerams?.sortFilter?.type?.selectedValue === "true" ||
        savedAdsPerams?.sortFilter?.type?.selectedValue === "false"
          ? ""
          : savedAdsPerams?.sortFilter?.type?.selectedValue,

      increaseCount:
        savedAdsPerams?.sortFilter?.type?.selectedValue === "true" ||
        savedAdsPerams?.sortFilter?.type?.selectedValue === "false"
          ? savedAdsPerams?.sortFilter?.type?.selectedValue
          : null,

      order_by:
        savedAdsPerams?.sortFilter?.type?.selectedValue === "true" ||
        savedAdsPerams?.sortFilter?.type?.selectedValue === "false"
          ? ""
          : savedAdsPerams?.sortFilter?.order?.selectedValue,

      keywords:
        savedAdsPerams?.searchType === "All these words"
          ? savedAdsPerams?.searchBarData.split(" ")
          : [],

      phrase:
        savedAdsPerams?.searchType === "Exact Phrase"
          ? savedAdsPerams?.searchBarData.split(",")
          : [],
    };
    setQueryObject(queryObject);
  }, [savedAdsPerams]);

  return (
    <Grid item xl={3} lg={4} md={6} sm={6} xs={12} key={index} sx={{ p:{lg:1,md:1,sm:1,xs:"0px"}, pb:{xs:3}}}>
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow: "none",
          border: "1px solid #EBEBEB",
          
        }}
      >
        <Stack
          sx={{
            // padding: "10px",
            paddingLeft:"20px",
            paddingTop:"10px",
            paddingRight:"20px",
            paddingBottom:"14px",
            justifyContent: "space-between",
           
          }}
        >
          <Box className={classes.Addheader}>
            <Box
              sx={{
                border: 1,
                borderRadius: "50%",
                borderColor: "#EBEBEB",
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
              }}
              noWrap
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
          {/* <Box height={(adInfo?.adDescription.length <=150) ? "80px":"auto"} sx={{lineHeight:"20px"}}>
            <ShowMoreText lines={3} expanded={false} expandByClick={true} keepNewLines="true">
            
            {adInfo?.adDescription ? adInfo.adDescription : " "}
            </ShowMoreText>
          </Box> */}
          <Box  height={(adInfo?.adDescription.length <=150) ? "80px":"auto"}>
            <Typography
              sx={{
                fontWeight: 500,
                lineHeight: "20px",
                letterSpacing: "0.03em",
                color: "#2B2F42",
                // lineHeight:1
                // margin: "10px 12px 10px 15px",
              }}
            >              
              <ReadMore>
                {adInfo?.adDescription ? adInfo.adDescription : " "}
              </ReadMore>
            </Typography>
          </Box>
          <div style={{ height: "300px" , marginTop:"4px"}}>
            {adInfo.adMediaType === "video" ? (
              <video
                src={adInfo.bucketMediaURL}
                poster={adInfo?.thumbBucketUrl}
                style={{ height: "300px" }}
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
            <Grid item xs={9} sm={10} md={10} lg={10}>
              <Grid container>
                <Grid item marginRight={"15px"}>
                  {adInfo.status === "Active" ? (
                    <Typography sx={{ textDecoration: "underline",
                    paddingBottom: "4px",
                    borderBottomWidth:"3px",
                    // borderBottomColor:"red"
                    }} variant="p">
                      {adInfo.status}
                    </Typography>
                  ) : (
                    <Typography sx={{ color: "red" }}>
                      {adInfo.status}
                    </Typography>
                  )}
                </Grid>
                <Grid item marginRight={"10px"}>
                  {/* <Tooltip title="Redirect to shop link"> */}
                  <img
                    src={Shareicon}
                    alt="Shareicon"
                    className={classes.shareicon}
                    onClick={(e) => {
                      console.log(adInfo?.purchaseURL);
                      window.open(adInfo?.purchaseURL, "_blank", "");
                    }}
                  />
                  {/* </Tooltip> */}
                  <img
                    src={
                      savedAdsManager.savedAdsIds.includes(adInfo?.id)
                        ? StarFill
                        : Saveicon
                    }
                    alt="saved-icon"
                    className={classes.saveicon}
                    onClick={() => {
                      if (savedAdsManager.savedAdsIds.includes(adInfo?.id)) {
                        dispatch(removesavedFilteredAdLocal(adInfo));
                        dispatch(removeSavedAdsIdsLocal(adInfo.id));
                        dispatch(removeFromSavedAdsStart({ ad: adInfo?.id }));
                      } else {
                        dispatch(addSavedAdsIdsLocal(adInfo.id));
                        dispatch(addToSavedAdsStart({ ad: adInfo.id }));
                        dispatch(
                          addToSavedAdsFilterLocalStart({
                            ...queryObject,
                            adId: adInfo.id,
                          })
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <Stack direction={"row"}>
                    <AccessTime style={{ color: "#80828E", width: "20px" }} />
                    <Typography color={"#80828E"} marginLeft="4px">
                      {Math.floor(
                        Math.abs(
                          (new Date(adInfo?.startDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 3600 * 24)
                        )
                      )}{" "}
                      Days
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            
              <Typography color="#80828E" className={classes.AdsText} noWrap>
                Started Running : {adInfo.startDate}
              </Typography>
              <Typography color="#2B2F42" className={classes.AdsText} noWrap>
                {adInfo.headline}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sm={2}
              sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
              }}
            >
              <Avatar
                sx={{
                  background:ButtonThemeColor,
                    // "linear-gradient(45deg, #00CBFF 0%, #72E2FF 100%)",
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

          {/* <Grid container sx={{ padding: "4px" }}>
            <Grid item sm={9} md={9} lg={9}>
              <Stack direction={"column"}>
                <Stack direction={"row"}>
                  {adInfo.status === "Active" ? (
                    <Typography sx={{ textDecoration: "underline" }}>
                      {adInfo.status}
                    </Typography>
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
                        window.open(adInfo?.purchaseURL, "_blank", "");
                      }}
                    />
                  </Tooltip>
                  <img
                    src={
                      savedAdsManager.savedAdsIds.includes(adInfo?.id)
                        ? StarFill
                        : Saveicon
                    }
                    alt="saved-icon"
                    className={classes.saveicon}
                    onClick={() => {
                      if (savedAdsManager.savedAdsIds.includes(adInfo?.id)) {
                        dispatch(removesavedFilteredAdLocal(adInfo));
                        dispatch(removeSavedAdsIdsLocal(adInfo.id));
                        dispatch(removeFromSavedAdsStart({ ad: adInfo?.id }));
                      } else {
                        dispatch(addSavedAdsIdsLocal(adInfo.id));
                        dispatch(addToSavedAdsStart({ ad: adInfo.id }));
                        dispatch(
                          addToSavedAdsFilterLocalStart({
                            ...queryObject,
                            adId: adInfo.id,
                          })
                        );
                      }
                    }}
                  />
                  <Stack direction={"row"} marginLeft="10px">
                    <AccessTime style={{ color: "grey", width: "20px" }} />
                    <Typography color={"#C4C4C4"} marginLeft="4px">
                      {Math.floor(
                        Math.abs(
                          (new Date(adInfo?.startDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 3600 * 24)
                        )
                      )}{" "}
                      Days
                    </Typography>
                  </Stack>
                </Stack>

                <Typography color="#c0c0c0" className={classes.AdsText} noWrap>
                  Started Running : {adInfo.startDate}
                </Typography>
                <Typography color="#2B2F42" className={classes.AdsText} noWrap>
                  {adInfo.headline}
                </Typography>
              </Stack>
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
                  background:
                    "linear-gradient(45deg, #00CBFF 0%, #72E2FF 100%)",
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
          </Grid> */}
<Grid container>
                    <Grid item xs={12} lg={12} sm={12}>
                      {/* <AreaLineGraph /> */}
{/* <CustomizedView /> */}
{/* <AreaLineGraph /> */}
                      <MyChart
                        chartData={adInfo?.history}
                        dataBoxVisiblity={false}
                        axisVisiblity={false}
                        fillType={"area"}
                        graphHeight={100}
                      />
                    </Grid>
                    </Grid>

{/* <MyChart
              chartData={adInfo?.history}
              dataBoxVisiblity={false}
              axisVisiblity={false}
              graphHeight={"100px"}
            /> */}


          {/* <Box sx={{ height: "100px" }}>
          
          </Box> */}
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: "17px",
              background:ButtonThemeColor,
              // background:
              //   "linear-gradient(243.18deg, #B5EDFF 0%, #00CBFF 28.65%, #6721FF 85.94%)",
              textTransform: "none",
            }}
            onClick={() => {
              window.location.pathname === "/" &&
                dispatch(setPostionForScrollValueStart(window.pageYOffset));

              window.location.pathname.split("/").includes("allAds") &&
                dispatch(
                  setPostionForSubAllAdsToScrollValueStart(window.pageYOffset)
                );

              window.location.pathname.split("/").includes("savedAds") &&
                dispatch(
                  setPostionForSavedPageToScrollValueStart(window.pageYOffset)
                );

              navigate(`/adDeatails/${adInfo.id}`, {
                state: {
                  fromPage: window.location.pathname
                    .split("/")
                    .includes("savedAds")
                    ? "/savedAds"
                    : "/",
                },
              });
            }}
          >
            <b>See Details</b>
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export default ThumbNailBox;
