import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Button, Stack, Avatar } from "@mui/material";
import Firstcard from "../../assets/Firstcard.svg";
import LargePageLogo from "../../assets/largePageLogo.svg";
import Firsrcardimg from "../../assets/FirstCardImg.svg";
import facebook from "../../assets/facebook.svg";
import instragram from "../../assets/instragram.svg";
import { Mychart, SingleLineChart } from "../../components/Graph";
import MyChart from "../../components/MyChart";
import { DummyChart } from "../../components/DummyChart";
import MyCharttt from "../../components/linemy";


function AdDeatails({ ThumbnailData }) {
  const classes = useStyles();
  console.log(ThumbnailData?.history);
  console.log(
    "pppppppppppppppppppppppppppppppppp)))))))))))))))))))))))))))))))))ppppppppppppppp"
  );
  return (
    <>
      <Grid container sx={{ marginTop: "36px" }}>
        <Grid item xs={12} lg={4} md={4} sm={12}>
          <Box sx={{ border: "4.97421px solid #F6F6FB" }}>
            <Stack>
              <Box
                sx={{ display: "flex", marginTop: "13px", marginLeft: "20px" }}
              >
                <Box
                  sx={{
                    border: 2,
                    borderRadius: "50%",
                    borderColor: "#EBEBEB",
                    // borderColor: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <img src={Firstcard} aria-label="Add" /> */}
                  <Avatar
                    src={ThumbnailData?.pageInfo?.logo}
                    aria-label="FirstCard"
                    // style={{ width: "100%", height: "100%" }}
                    style={{ width: "30px", height: "30px" }}
                    // sx={{ width: 27, height: 27 }}
                  ></Avatar>
                  {/* <img
                    src={ThumbnailData?.pageInfo?.logo}
                    aria-label="FirstCard"
                    style={{ width: "25px" }}
                  /> */}
                </Box>
                <Typography
                variant="h6"
                  style={{
                    // fontWeight: 500,
                    // fontSize: "19px",
                    marginLeft: "8px",
                    lineHeight: "30px",
                    color: "#2B2F42",
                    fontWeight: "bold" 
                  }}
                >
                  <b>{ThumbnailData?.pageInfo?.name
                    ? ThumbnailData.pageInfo?.name
                    : " "}</b>
                </Typography>
              </Box>

              <Box sx={{marginLeft:2,marginRight:2 , }}>
                <Typography
                  // variant="span"
                  sx={{
                    fontWeight: 500,
                    // fontSize: "18px",
                    lineHeight: "27px",
                    letterSpacing: "0.03em",
                    color: "#2B2F42",
                    margin: "10px 12px 10px 15px",
                  }}
                >
                  {ThumbnailData?.adDescription
                    ? ThumbnailData.adDescription
                    : " "}
                </Typography>
              </Box>

              <Box sx={{marginLeft:"5px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                {ThumbnailData?.adMediaType === "video" ? (
                  <video
                    poster={ThumbnailData?.thumbBucketUrl}
                    //{ThumbnailData?.thumbBucketUrl}
                    // paused
                    src={ThumbnailData?.bucketMediaURL}
                    // autoPlay
                    controls
                    className={classes.AdsImageVideo}
                  />
                ) : ThumbnailData?.adMediaType === "image" ? (
                  <img
                    src={ThumbnailData?.bucketMediaURL}
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
              <Box sx={{ marginRight: 2 ,marginTop:1}}>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <Typography
                        sx={{
                          lineHeight: "23px",
                          letterSpacing: "0.035em",
                          color: "#2B2F42",
                          opacity: 0.6,
                        }}
                        noWrap
                      >
                      <b>  {ThumbnailData?.displayURL
                          ? ThumbnailData.displayURL.replace("HTTPS://","")
                          : " "}</b>
                      </Typography>
                      <Typography
                        style={{
                          fontWeight: 500,
                          lineHeight: "30px",
                          letterSpacing: "0.035em",
                          color: "#2B2F42",
                          fontWeight: "bold" 
                        }}
                      >
                        {/* Solar Cardinal Wind Chime Light */}
                        {ThumbnailData?.headline ? ThumbnailData.headline : " "}
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
                        {ThumbnailData?.purchaseDescription
                          ? ThumbnailData.purchaseDescription
                          : " "}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
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
                        {ThumbnailData?.noOfCopyAds
                          ? ThumbnailData.noOfCopyAds
                          : " "}
                      </span>
                      <span style={{ fontSize: "10px", margin: "auto" }}>
                        Ads
                      </span>
                    </Avatar>
                  </Grid>
                </Grid>
              </Box>
              <Grid container justifyContent="flex-end">
                <Button
                  style={{
                    background:
                      "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
                    borderRadius: 18,
                    textTransform: "none",
                    width: "156px",
                    height: "31px",
                    color: "white",
                    marginBottom: "15px",
                    marginRight: "15px",
                    marginTop: "10px",
                  }}
                  onClick={() => {
                    window.open(ThumbnailData?.purchaseURL, "_blank", "");
                  }}
                >
                  <Typography  variant="h6" fontStyle={{ color: "white" }} noWrap>
                    {/* Shop Now */}
                    <b>{ThumbnailData?.ctaStatus}</b>
                  </Typography>
                </Button>
              </Grid>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} md={8} sm={12} p={4}>
          <Box>
            <Grid container sx={{ justifyContent: "space-around" }}>
              <Button
                style={{
                  background: "#00CBFF",
                  borderRadius: 30,
                  fontSize: "18px",
                  textTransform: "none",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
                // disabled={ThumbnailData?.adMediaType === "image" ? false : true}
              >
                <a
                  href={ThumbnailData?.thumbBucketUrl}
                  style={{ textDecoration: "none", color: "white" }}
                  download
                  // disabled={
                  //   ThumbnailData?.adMediaType === "image" ? false : true
                  // }
                >
                  {" "}
                  Download Thumbnail
                </a>
              </Button>
              <Button
                style={{
                  background: "#00CBFF",
                  borderRadius: 30,
                  fontSize: "18px",
                  textTransform: "none",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
                disabled={ThumbnailData?.adMediaType === "video" ? false : true}
              >
                <a
                  href={ThumbnailData?.bucketMediaURL}
                  style={{ textDecoration: "none", color: "white" }}
                  download
                >
                  {" "}
                  Download Video
                </a>
              </Button>
            </Grid>
            <Grid
              container
              sx={{ justifyContent: "space-around", marginTop: "40px" }}
            >
              <Stack sx={{ alignItems: "center" }}>
                <Typography className={classes.textdeco}>Ad Status</Typography>
                <Typography className={classes.textdeco}>
                  <b> {ThumbnailData?.status ? ThumbnailData.status : " "}</b>
                </Typography>
              </Stack>
              <Stack sx={{ alignItems: "center" }}>
                <Typography className={classes.textdeco}>
                  Started Running On
                </Typography>
                <Typography className={classes.textdeco}>
                  <b>
                    {" "}
                    {ThumbnailData?.startDate ? ThumbnailData.startDate : " "}
                  </b>
                </Typography>
                <Typography className={classes.textdeco}>
                  <b> 3 Days</b>
                </Typography>
              </Stack>
              <Stack sx={{ alignItems: "center" }}>
                <Typography className={classes.textdeco}>Placements</Typography>
                {ThumbnailData?.platforms.map((ads, index) => (
                  <Typography className={classes.textdeco} key={index}>
                    {" "}
                    <b>{ads}</b>
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                flexWrap: "nowrap",
              }}
            >
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "60px",
                }}
                spacing={2}
              >
                <Typography style={{ fontWeight: 600 }} noWrap>
                  {/* Best Solar Lighting */}
                  {ThumbnailData?.pageInfo?.name}
                </Typography>
                <Box
                  sx={{
                    width: "112px",
                    height: "112px",
                    border: 2,
                    borderRadius: "50%",
                    borderColor: "#EBEBEB",
                    // borderColor: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <img src={LargePageLogo} aria-label="Add" /> */}
                  <Avatar
                    src={ThumbnailData?.pageInfo?.logo}
                    aria-label="FirstCard"
                    style={{ width: "100%", height: "100%" }}
                    // sx={{ width: 27, height: 27 }}
                  ></Avatar>
                  {/* <img
                    src={ThumbnailData?.pageInfo?.logo}
                    aria-label="FirstCard"
                    style={{ width: "100%" }}
                  /> */}
                </Box>
              </Stack>
              <Stack style={{ justifyContent: "center", marginTop: "36px" }}>
                {ThumbnailData?.pageInfo?.platforms.map((socialMedia) => {
                  return (
                    <Stack
                      direction={"row"}
                      sx={{
                        marginBottom: "16px",
                        // justifyContent: "center",
                        // alignItems: "center",
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
                
              </Stack>
            </Grid>
            <Grid>
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
               

                <Grid container >
                  <Grid item xs={12} lg={12} sm={12}>
                    <MyChart chartData={ThumbnailData?.history} dataBoxVisiblity={false} axisVisiblity={true} fillType={"area"} graphHeight={350}/>
                  </Grid>
                </Grid>
               
              </Stack>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default AdDeatails;

const useStyles = makeStyles(() => ({
  AdsImageVideo: {
    objectFit: "fill",
    // resizeMode: "Startch",
    height: "420px",
    width: "95%",
  },
  AdsImage:{
    width: "95%",
    // width:"100%",
  height:"400px",
    objectFit: 'fill',  
    padding: "0",
    margin: "0",
    // overflowY: "none",
    // outline: "none",
  },
}));
