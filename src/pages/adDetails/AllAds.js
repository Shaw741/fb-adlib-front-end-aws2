import React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
// import { loadSubAllMediaStart } from "../../redux/ducks/subAllAds";
import ThumbNailBox from "../../components/ThumbNailBox";

const AllAds = ({ AdsName }) => {
  const { subAllMedia, loading } = useSelector((state) => state.subAllMedia);
  const { savedIds } = useSelector((state) => state.savedclienads);
  

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress
          style={{
            position: "relative",
            top: 50,
            left: 40,
            opacity: 1,
            zIndex: 1,
            visibility: loading ? "visible" : "hidden",
          }}
        />
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "10px",
          opacity: loading ? 0.5 : 1,
          disabled: loading ? true : false,
        }}
      >
        {subAllMedia?.map((ads, index) => (
                   
                    <ThumbNailBox adInfo={ads} index={index} key={index}  deleteId={savedIds?.includes(ads.id) ? ads.id : false}/>
        ))}
      </Grid>
    </>
  );
};

export default AllAds;
