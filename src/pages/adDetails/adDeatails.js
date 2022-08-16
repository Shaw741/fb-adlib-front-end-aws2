import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  Avatar,
  useMediaQuery,
  useTheme,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import Firsrcardimg from "../../assets/FirstCardImg.svg";
import facebook from "../../assets/facebook.svg";
import instragram from "../../assets/instragram.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadSingleAdDataClear,
  loadSingleAdDataStart,
} from "../../redux/ducks/singleAdsData";
import { FadeLoader } from "react-spinners";
import MyChart from "../../components/linemy";
import Download from "@mui/icons-material/Download";
import { ButtonThemeColor } from "../../Golbal_variable";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <Typography variant="p" className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <Typography
          variant="h7"
          style={{ color: "#72E2FF", cursor: "pointer" }}
          onClick={toggleReadMore}
          className="read-or-hide"
        >
          {isReadMore ? "...Read more" : " Show less"}
        </Typography>
      </Typography>
    </>
  );
};

function AdDeatails() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { adId } = useParams();
  const filteredAds = useSelector((state) => state.filteredAds);
  const subAllAds = useSelector((state) => state.subAllAds);
  const { filteredSavedAds } = useSelector((state) => state.filteredSavedAds);
  const { singleAdData, loading } = useSelector((state) => state.singleAdData);
  const theme = useTheme();

  const showGraph = useMediaQuery(theme.breakpoints.down("md"));
  const DownloadBUtton = useMediaQuery(theme.breakpoints.down("md"));
  const OnlyMdSizeScreen = useMediaQuery(theme.breakpoints.only("md"));
  
  // const theme = useTheme();
  const showgrid = useMediaQuery(theme.breakpoints.only("xs"));

  const [adDetail, setAdDetail] = useState();
  const [IsDrawerOpen, setIsDrawerOpen] = useState(true);

  window.scrollTo(
    {
      top: 0,
      behavior: "smooth",
    },
    []
  );
  useEffect(()=>{
    setIsDrawerOpen(()=>localStorage.getItem("IsDrawerOpen"))
    console.log("999  ---546 ",localStorage.getItem("IsDrawerOpen"),IsDrawerOpen,OnlyMdSizeScreen)
   
  
  })
  
  useEffect(() => {
    if (filteredAds.filteredAds.length > 0) {
      // filteredAds.filteredAds.find((ad) => ad.id === adId && ad) ||
      //   subAllAds.subAllAds.find((ad) => ad.id === adId && ad) ||
      //   filteredSavedAds?.find((ad) => ad.id === adId && ad);
      // eslint-disable-next-line array-callback-return
      let adTobeDisplay =
        filteredAds.filteredAds.find((ad) => {
          if (ad.id === adId) {
            return ad;
          }
        }) ||
        subAllAds.subAllAds.find((ad) => {
          if (ad.id === adId) {
            return ad;
          }
        }) ||
        filteredSavedAds?.find((ad) => {
          if (ad.id === adId) {
            return ad;
          }
        });
      setAdDetail(adTobeDisplay);

      if (!adTobeDisplay) {
        dispatch(loadSingleAdDataStart({ id: adId }));
      }
    }
  }, [dispatch, filteredAds, adId]);

  useEffect(() => {
    if (!adDetail && Object.keys(singleAdData).length) {
      setAdDetail(singleAdData);
      dispatch(loadSingleAdDataClear());
    }
  }, [singleAdData]);

  return (
    <>
      <Box
        className="loader"
        style={{
          opacity: loading ? 1 : 0,
          position: "absolute",
          top: "50%",
          left: "55%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <FadeLoader
          color="#00BFFF"
          cssOverride={{ top: "0px", marginTop: "35px" }}
        />
      </Box>
      {adDetail && (
        <Grid
          container
          sx={{
            marginTop: "36px",
            marginBottom:2,
            // width: "95% !important",
            margin: "auto",
            paddingTop: 1,
          }}
        >
            
          <Grid item xs={12} lg={4} md={5} sm={6} sx={{ width: "95% !important",}}>
            <Box
              sx={{
                border: "1px solid #EBEBEB",
                borderRadius: "10px",
                paddingLeft: 2,
                paddingRight: 1,
              }}
            >
              <Stack>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "13px",
                    // marginLeft: "20px",
                  }}
                >
                  <Box
                    sx={{
                      border: 2,
                      borderRadius: "50%",
                      borderColor: "#EBEBEB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={adDetail?.pageInfo?.logo}
                      aria-label="FirstCard"
                      style={{ width: "30px", height: "30px" }}
                    ></Avatar>
                  </Box>
                  <Typography
                    variant="h6"
                    style={{
                      marginLeft: "8px",
                      lineHeight: "30px",
                      color: "#2B2F42",
                      fontWeight: "bold",
                    }}
                  >
                    <b>
                      {adDetail?.pageInfo?.name ? adDetail.pageInfo?.name : " "}
                    </b>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    //marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,

                      lineHeight: "27px",
                      letterSpacing: "0.03em",
                      color: "#2B2F42",
                      paddingTop: 1,
                      // margin: "10px 12px 10px 15px",
                    }}
                  >
                    <ReadMore>
                      {adDetail?.adDescription ? adDetail.adDescription : " "}
                    </ReadMore>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginRight: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {adDetail?.adMediaType === "video" ? (
                    <video
                      poster={adDetail?.thumbBucketUrl}
                      src={adDetail?.bucketMediaURL}
                      controls
                      className={classes.AdsImageVideo}
                    />
                  ) : adDetail?.adMediaType === "image" ? (
                    <img
                      src={adDetail?.bucketMediaURL}
                      alt="img1"
                      className={classes.AdsImage}
                    />
                  ) : (
                    <img
                      src={Firsrcardimg}
                      alt="img1"
                      className={classes.AdsImage}
                    />
                  )}
                </Box>
                <Box sx={{ marginRight: 2, marginTop: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
                      <Box
                        sx={
                          {
                            //  paddingLeft: "20px"
                          }
                        }
                      >
                        <Typography
                          sx={{
                            lineHeight: "23px",
                            letterSpacing: "0.035em",
                            color: "#2B2F42",
                            opacity: 0.6,
                          }}
                          noWrap
                        >
                          <b>
                            {" "}
                            {adDetail?.displayURL
                              ? adDetail.displayURL.replace("HTTPS://", "")
                              : " "}
                          </b>
                        </Typography>
                        <Typography
                          style={{
                            lineHeight: "30px",
                            letterSpacing: "0.035em",
                            color: "#2B2F42",
                            fontWeight: "bold",
                          }}
                        >
                          {adDetail?.headline ? adDetail.headline : " "}
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 400,
                            fontSize: "17px",
                            lineHeight: "21px",
                            letterSpacing: "0.035em",
                            color: "#2B2F42",
                          }}
                        >
                          <ReadMore>
                            {adDetail?.purchaseDescription
                              ? adDetail.purchaseDescription
                              : " "}
                          </ReadMore>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                          {adDetail?.noOfCopyAds ? adDetail.noOfCopyAds : " "}
                        </span>
                        <span style={{ fontSize: "10px", margin: "auto" }}>
                          Ads
                        </span>
                      </Avatar>
                    </Grid>
                  </Grid>
                </Box>
                <Grid container justifyContent="flex-end" >
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Button
                    style={{
                      background:ButtonThemeColor,
                        // "linear-gradient(243.18deg, #B5EDFF 0%, #00CBFF 28.65%, #6721FF 85.94%)",
                      borderRadius: 18,
                      textTransform: "none",
                      width: "100%",//"156px",
                      height: "35px",
                      color: "white",
                      marginBottom: "15px",
                      marginRight: "15px",
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      window.open(adDetail?.purchaseURL, "_blank", "");
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontStyle={{ color: "white" }}
                      noWrap
                    >
                      <b>{adDetail?.ctaStatus}</b>
                    </Typography>
                  </Button>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Grid>
       
          <Grid item xs={12} lg={8} md={7} sm={6} p={2} sx={{ width: "95% !important",}}>
            {/* <Box> */}
            <Grid container>
              <Grid
                items
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    background:ButtonThemeColor,
                      // "linear-gradient(200deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
                    borderRadius: 30,
                    fontSize: "18px",
                    textTransform: "none",
                    paddingLeft: "25px",
                    paddingRight: "16px",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                  }}
                >
                  <a
                    href={adDetail?.thumbBucketUrl}
                    style={{ textDecoration: "none", color: "white" }}
                    download
                  >
                    {" "}
                    <FormControlLabel
                          control={
                            <Download />
                          }
                          label={
                            <Typography ml={0.5} sx={{ fontWeight: "bold" }}>
                              {" "}
                              Download Thumbnai
                            </Typography>
                          }
                        />

                    <FormControl>
                    {/* <Download />
                    <span>Download Thumbnail</span> */}
                    </FormControl>
                  </a>
                </Button>
              </Grid>
              <Grid
                items
                md={6}
                xs={12}
                sm={12}
                lg={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // "@media (max-width: 800px)": {
                    marginTop: (DownloadBUtton ) ?2:"",
                  // },
                }}
              >
                <Button
                  style={{
                    background:ButtonThemeColor,
                      // "linear-gradient(200deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
                    borderRadius: 30,
                    fontSize: "18px",
                    textTransform: "none",
                    paddingLeft: "25px",
                    paddingRight: "16px",
                  }}
                  disabled={adDetail?.adMediaType === "video" ? false : true}
                >
                  <a
                    href={adDetail?.bucketMediaURL}
                    style={{ textDecoration: "none", color: "white" }}
                    download
                  >
                    
                    <FormControlLabel
                          control={
                            <Download />
                          }
                          label={
                            <Typography ml={0.5} sx={{ fontWeight: "bold" }}>
                              {" "}
                              Download Video
                            </Typography>
                          }
                        />

                    <FormControl>
                      
                    </FormControl>
                    
                   
                  </a>
                </Button>
              </Grid>
            </Grid>

           
            <Grid
              container
              sx={{
                justifyContent: "space-around",
                marginTop: "40px",
                paddingTop: "0px",
              }}
            >
              <Grid
                item
                md={4}
                xs={4}
                sm={12}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  width: "99% !important",
                  // "@media (max-width: 800px)": {
                    marginTop: showGraph ? 2:"",
                  // },
                  
                }}
                direction="column"
              >
                <Typography className={classes.textdeco}>Ad Status:</Typography>
                <Typography className={classes.textdeco}>
                  <b> {adDetail?.status ? adDetail.status : " "}</b>
                </Typography>
              </Grid>
              <Grid
                item
                md={4}
                xs={4}
                sm={12}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: showGraph ? 2:"",
                  // "@media (max-width: 800px)": {
                  //   marginTop: 2,
                  // },
                  // "@media (max-width: 450px)": {
                  //   alignItems: "start",
                  // },
                }}
                direction="column"
              >
                <Typography className={classes.textdeco} noWrap>
                  Started Running:
                </Typography>
                <Typography className={classes.textdeco}>
                  <b> {adDetail?.startDate ? adDetail.startDate : " "}</b>
                </Typography>
                <Typography className={classes.textdeco}>
                  <b>
                    {" "}
                    {Math.floor(
                      Math.abs(
                        (new Date(adDetail?.startDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 3600 * 24)
                      )
                    )}
                    {" Days"}
                  </b>
                </Typography>
              </Grid>
              <Grid
                item
                md={4}
                xs={4}
                sm={12}
                lg={4}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: showGraph ? 2:"",
                  // "@media (max-width: 800px)": {
                  //   marginTop: 2,
                  // },
                  "@media (max-width: 450px)": {
                    // marginTop: 2,
                    // alignItems: "start",
                  },
                }}
                flexDirection="column"
              >
                <Typography className={classes.textdeco}>
                  Placements:
                </Typography>
                {adDetail?.platforms?.map((ads, index) => (
                  <Typography className={classes.textdeco} key={index} noWrap>
                    {" "}
                    <b>{ads}</b>
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: showGraph ? "50px" : "10px",
                
              }}
            >
              <Grid
                item
                xs={6}
                sm={3}
                md={5}
                lg={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginRight: "60px",
                  // flexWrap: "nowrap",
                }}
                direction={"column"}
                spacing={2}
              >
                <Typography
                  style={{ fontWeight: 600, fontSize: "20px" }}
                  noWrap
                >
                  {adDetail?.pageInfo?.name}
                </Typography>
                <Box
                  sx={{
                    width: "112px",
                    height: "112px",
                    border: 2,
                    borderRadius: "50%",
                    borderColor: "#EBEBEB",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={adDetail?.pageInfo?.logo}
                    aria-label="FirstCard"
                    style={{ width: "100%", height: "100%" }}
                  ></Avatar>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sm={12}
                md={6}
                lg={5}
                flexDirection="column"
                style={{
                  marginTop: "36px",
                  display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                  // "@media screen and (min-width: 800px)":
                  //   {
                  //     display: "flex",
                  //     alignItems: "center",
                  //     justifyContent: "center",
                  //   },
                }}
              >
                {adDetail?.pageInfo?.platforms.map((socialMedia, index) => {
                  return (
                    <Stack
                      key={index}
                      direction={"row"}
                      sx={{
                        marginBottom: "16px",
                      }}
                    >
                      <Box sx={{ marginRight: "10px" }}>
                        <img
                          src={
                            socialMedia.name === "Facebook"
                              ? facebook
                              : instragram
                          }
                          aria-label="Add"
                        />
                      </Box>
                      <Stack>
                        <Typography
                          style={{
                            fontFamily: "Neue Haas Grotesk Display Pro",
                          }}
                        >
                          {socialMedia?.other}
                        </Typography>
                        <Typography
                          style={{
                            fontFamily: "Neue Haas Grotesk Display Pro",
                          }}
                        >
                          {socialMedia.name === "Facebook"
                            ? socialMedia.likes + " likes • " + socialMedia.type
                            : socialMedia.followers +
                              " followers • " +
                              socialMedia.type}
                        </Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </Grid>
            </Grid>
            {!showGraph && (
              <Grid item xs={12} sm={12}>
                <Stack
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    
                  }}
                  direction="column"
                >
                  <Typography variant="h6">
                    <b>Ad Count Over 30 Days</b>
                  </Typography>

                  <Grid container>
                    <Grid item xs={12} lg={12} sm={12} sx={12}>
                      {/* <AreaLineGraph /> */}
                      {/* <CustomizedView /> */}
                      {/* <AreaLineGraph /> */}
                      <MyChart
                        chartData={adDetail?.history}
                        dataBoxVisiblity={false}
                        axisVisiblity={true}
                        fillType={"area"}
                        graphHeight={350}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            )}

            {/* </Box> */}
          </Grid>
          {showGraph && (
            <Grid item md={12} sm={12} xs={12} lg={0} sx={{ marginTop: 2 }}>
              <Stack
                sx={{
                  marginTop: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                direction="column"
              >
                <Typography variant="h6">
                  <b>Ad Count Over 30 Days</b>
                </Typography>

                <Grid container>
                  <Grid item xs={12} lg={12} sm={12}>
                    <MyChart
                      chartData={adDetail?.history}
                      dataBoxVisiblity={false}
                      axisVisiblity={true}
                      fillType={"area"}
                      graphHeight={350}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}

export default AdDeatails;

const useStyles = makeStyles(() => ({
  AdsImageVideo: {
    objectFit: "fill",
    height: "400px",
    width: "95%",
  },
  AdsImage: {
    width: "100%",
    height: "400px",
    objectFit: "fill",
    padding: "0",
    margin: "0",
  },
}));
