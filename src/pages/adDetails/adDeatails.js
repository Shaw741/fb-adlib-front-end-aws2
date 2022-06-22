import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Firstcard from "../../assets/Firstcard.svg";
import LargePageLogo from "../../assets/largePageLogo.svg";
import Firsrcardimg from "../../assets/FirstCardImg.svg";
import facebook from "../../assets/facebook.svg";
import instragram from "../../assets/instragram.svg";

function AdDeatails() {
  const classes = useStyles();
  const adID = useParams();
  const { allMediaAds } = useSelector((state) => state.allMediaAds);
  const [adDetail, setAdDetail] = useState();

  useEffect(() => {
    if (allMediaAds) {
      const singleAds = allMediaAds.find((ad) => {
        if (ad.adID === adID.adsId) {
          return ad;
        }
      });

      setAdDetail(singleAds);
    }
  }, [allMediaAds, adID.adsId]);
  return (
    <>
      <Grid container sx={{ marginTop: "36px" }}>
        <Grid item xs={12} lg={4} md={4} sm={12}>
          <Box sx={{ border: "4.97421px solid #F6F6FB" }}>
            <Stack>
              <Box
                sx={{ display: "flex", marginTop: "13px", marginLeft: "26px" }}
              >
                <Box>
                  <img src={Firstcard} aria-label="Add" />
                </Box>
                <Typography
                  style={{
                    fontWeight: 500,
                    fontSize: "19px",
                    marginLeft: "8px",
                    lineHeight: "30px",
                    color: "#2B2F42",
                  }}
                >
                  {adDetail?.headline ? adDetail.headline : " "}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "27px",
                    letterSpacing: "0.03em",
                    color: "#2B2F42",
                    margin: "10px 12px 10px 26px",
                  }}
                >
                  {adDetail?.adDescription ? adDetail.adDescription : " "}
                </Typography>
              </Box>

              <Box sx={{ width: "98%", height: "20%" }}>
                {adDetail?.adMediaType === "video" ? (
                  <video
                    src={adDetail?.bucketMediaURL}
                    autoPlay
                    controls
                    className={classes.AdsImageVideo}
                  />
                ) : adDetail?.adMediaType === "image" ? (
                  <img
                    src={adDetail?.bucketMediaURL}
                    alt="img1"
                    className={classes.AdsImageVideo}
                  />
                ) : (
                  <img src={Firsrcardimg} alt="img1" className={classes.AdsImageVideo} />
                )}
              </Box>
              <Box>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <Box sx={{ paddingLeft: "26px" }}>
                      <Typography
                        sx={{
                          lineHeight: "23px",
                          letterSpacing: "0.035em",
                          color: "#2B2F42",
                          opacity: 0.6,
                        }}
                        noWrap
                      >
                        {adDetail?.headline ? adDetail.displayURL : " "}
                      </Typography>
                      <Typography
                        style={{
                          fontWeight: 500,
                          fontSize: "20px",
                          lineHeight: "30px",
                          letterSpacing: "0.035em",
                          color: "#2B2F42",
                        }}
                      >
                        Solar Cardinal Wind Chime Light
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
                        {adDetail?.purchaseDescription
                          ? adDetail.purchaseDescription
                          : " "}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        width: "55px",
                        height: "55px",
                        background: "#00CBFF",
                        borderRadius: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "6px",
                      }}
                    >
                      <Typography
                        variant="div"
                        sx={{
                          fontWeight: 600,
                          fontSize: "30px",
                          lineHeight: "24px",
                          color: "#F6F6FB",
                        }}
                      >
                        {adDetail?.noOfCopyAds ? adDetail.noOfCopyAds : " "}
                      </Typography>
                      <Typography
                        variant="div"
                        sx={{
                          fontWeight: 600,
                          fontSize: "10px",
                          lineHeight: "24px",
                          color: "#F6F6FB",
                        }}
                      >
                        Ads
                      </Typography>
                    </Box>
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
                    marginRight: "6px",
                  }}
                >
                  <Typography fontStyle={{ color: "white" }} noWrap>
                    Shop Now
                  </Typography>
                </Button>
              </Grid>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} md={8} sm={12}>
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
              >
                <a
                  href={adDetail?.bucketMediaURL}
                  style={{ textDecoration: "none", color: "white" }}
                  download
                  disabled={adDetail?.adMediaType === "image" ? true : false}
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
                disabled={adDetail?.adMediaType === "video" ? true : false}
              >
                <a
                  href={adDetail?.bucketMediaURL}
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
                  <b> {adDetail?.status ? adDetail.status : " "}</b>
                </Typography>
              </Stack>
              <Stack sx={{ alignItems: "center" }}>
                <Typography className={classes.textdeco}>
                  Started Running On
                </Typography>
                <Typography className={classes.textdeco}>
                  <b> {adDetail?.startDate ? adDetail.startDate : " "}</b>
                </Typography>
                <Typography className={classes.textdeco}>
                  <b> 3 Days</b>
                </Typography>
              </Stack>
              <Stack sx={{ alignItems: "center" }}>
                <Typography className={classes.textdeco}>Placements</Typography>
                {adDetail?.platforms.map((ads, index) => (
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
                marginTop: "75px",
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
                  Best Solar Lighting
                </Typography>
                <Box sx={{ width: "112px", height: "112px" }}>
                  <img src={LargePageLogo} aria-label="Add" />
                </Box>
              </Stack>
              <Stack style={{ justifyContent: "center", marginTop: "36px" }}>
                <Stack direction={"row"} sx={{ marginBottom: "16px" }}>
                  <Box sx={{ marginRight: "10px" }}>
                    <img src={facebook} aria-label="Add" />
                  </Box>
                  <Stack>
                    <Typography
                      style={{
                        fontFamily: "Neue Haas Grotesk Display Pro",
                      }}
                    >
                      @bestsolarlightingshop
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Neue Haas Grotesk Display Pro",
                      }}
                    >
                      21,619 likes • Retail company
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Box sx={{ marginRight: "10px" }}>
                    <img src={instragram} aria-label="Add" />
                  </Box>
                  <Stack>
                    <Typography
                      style={{
                        fontFamily: "Neue Haas Grotesk Display Pro",
                      }}
                    >
                      @bestsolarlightingshop
                    </Typography>
                    <Typography
                      style={{
                        fontFamily: "Neue Haas Grotesk Display Pro",
                      }}
                    >
                      21,619 likes • Retail company
                    </Typography>
                  </Stack>
                </Stack>
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
    objectFit: "contain",
    resizeMode: "Startch",
    height: "100%",
    width: "100%",
  },
}));
