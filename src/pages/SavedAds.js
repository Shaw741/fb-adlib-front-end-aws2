import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import filter from "../assets/filter.svg";
import { Box } from "@material-ui/core";
import BackTotopbutton from "../pages/Backtotopbutton";
import AllFilters from "../components/AllFilters";
import CloseIcon from "@mui/icons-material/Close";
import SortFilter from "../components/SortFilter";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ScrollToTop from "../utils/scrollToTop";
import FilterChips from "../components/FilterChips";
import SavedAdsList from "../components/SavedAdsList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  titleHome: {
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "24px",
    color: "#2B2F42",
  },
}));

const SavedAds = () => {
  const classes = useStyles();

  const [filterActivate, setFilterActivate] = React.useState(true);

  return (
    <>
      <ScrollToTop />
      <BackTotopbutton />
      <Grid
        container
        sx={{
          // paddingRight: "36px",
          width: "97%",
        }}
      >
        <Grid item xs={12}>
          <Box component="main">
            <Typography
              className={classes.titleHome}
              variant="h5"
              ml={2}
              sx={{
                fontWeight: "bold",
                color: "#3A3D4B",
                "@media (max-width: 450px)": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "15px",
                },
              }}
            >
              Saved Ads
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            paddingTop:1,
            "@media (max-width: 450px)": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          {filterActivate && (
            <Stack
              sx={{
                border: "1px solid #EBEBEB",
                borderRadius: "15px",
                padding: "16px 36px",
                marginTop: 2,
                width: "98%",
                margin:"auto"
              }}
            >
              <AllFilters setFilterActivate={setFilterActivate} />
              <FilterChips />
            </Stack>
          )}
          {!filterActivate && window.location.pathname === `/savedAds` && (
            <Button
              sx={{
                background:
                  "linear-gradient(243.18deg, #B5EDFF 0%, #00CBFF 28.65%, #6721FF 85.94%)",
                width: "85%",visibility:{xs:"visible",lg:"hidden",md:"hidden",sm:"hidden"},
                borderRadius: 3,
                height:"40px"
              }}
              onClick={()=>setFilterActivate(true)}
            >
              <img
                src={filter}
                alt="savedAds"
                style={{
                  width: "20px",
                  height: "20px",
                  float: "right",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setFilterActivate(true);
                }}
              />
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          justifyContent="flex-end"
          sx={{ marginTop: "10px", marginBottom: "15px" }}
        >
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
            spacing={1}
          >
            <Box sx={{ visibility: { xs: "hidden" ,sm:"visible",lg:"visible",md:"visible",},}}
              style={{
                background:
                  "linear-gradient(243.18deg, #B5EDFF 0%, #00CBFF 28.65%, #6721FF 85.94%)",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "2px",
                
              }}
            >
              {filterActivate ? (
                <img
                  src={filter}
                  alt="savedAds"
                  style={{
                    width: "20px",
                    height: "20px",
                    float: "right",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFilterActivate(false);
                  }}
                />
              ) : (
                <FilterAltOffIcon
                  style={{
                    width: "20px",
                    height: "20px",
                    float: "right",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => {
                    setFilterActivate(true);
                  }}
                />
              )}
            </Box>
            <Box>
              <SortFilter />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <SavedAdsList />
        </Grid>
      </Grid>
      {/* </Stack> */}
    </>
  );
};

export default SavedAds;
