import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { Grid } from "@material-ui/core";
import {
  Box,
  Input,  
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ThumbNailBox from "./ThumbNailBox";
import { useSkipInitialEffect } from "../utils/customHooks";
import * as allAdsPeramsDuck from "../redux/ducks/allAdsPerams";
import {
  clearCashedPageData,
  laodCashedPageData,
  loadFilteredAdsStart,
  setCurrentPaginationIndex,
} from "../redux/ducks/filteredAds";
import emptyImg from "../assets/empty.svg";

const AdsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();  
  const theme = useTheme();

  const filteredAds = useSelector((state) => state.filteredAds);
  const allAdsPerams = useSelector((state) => state.allAdsPerams);
  const [queryObject, setQueryObject] = useState({});
  const MobileScreenOnly = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    window.scrollTo(0, filteredAds.postionOfPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useSkipInitialEffect(() => {
    const queryObject = {
      startdate: allAdsPerams?.appliedFilters?.StartRunningDate?.startdate,
      enddate: allAdsPerams?.appliedFilters?.StartRunningDate?.enddate,
      adcount:
        allAdsPerams?.appliedFilters?.AdCount?.chipText !== ""
          ? [
              allAdsPerams?.appliedFilters?.AdCount?.min,
              allAdsPerams?.appliedFilters?.AdCount?.max,
            ]
          : [],
      adstatus: allAdsPerams?.appliedFilters?.AdStatus?.selectedValue,
      fb_likes:
        allAdsPerams?.appliedFilters?.FacebookLikes?.chipText?.length !== 0
          ? [
              allAdsPerams?.appliedFilters?.FacebookLikes?.min,
              allAdsPerams?.appliedFilters?.FacebookLikes?.max,
            ]
          : [],
      insta_followers:
        allAdsPerams?.appliedFilters?.InstagramFollowers?.chipText !== ""
          ? [
              allAdsPerams?.appliedFilters?.InstagramFollowers?.min,
              allAdsPerams?.appliedFilters?.InstagramFollowers?.max,
            ]
          : [],
      media_type: allAdsPerams?.appliedFilters?.MediaType?.selectedValue,
      cta_status: allAdsPerams?.appliedFilters?.ButtonStatus?.selectedValue,

      sort_by:
        allAdsPerams?.sortFilter?.type?.selectedValue === "true" ||
        allAdsPerams?.sortFilter?.type?.selectedValue === "false"
          ? ""
          : allAdsPerams?.sortFilter?.type?.selectedValue,

      increaseCount:
        allAdsPerams?.sortFilter?.type?.selectedValue === "true" ||
        allAdsPerams?.sortFilter?.type?.selectedValue === "false"
          ? allAdsPerams?.sortFilter?.type?.selectedValue
          : null,

      order_by:
        allAdsPerams?.sortFilter?.type?.selectedValue === "true" ||
        allAdsPerams?.sortFilter?.type?.selectedValue === "false"
          ? ""
          : allAdsPerams?.sortFilter?.order?.selectedValue,

      keywords: allAdsPerams?.searchBarData.length
        ? allAdsPerams?.searchType === "Ad Text"
          ? allAdsPerams?.searchBarData.split(" ")
          : null
        : null,

      phrase: allAdsPerams?.searchBarData.length
        ? allAdsPerams?.searchType === "Exact Phrase"
          ? allAdsPerams?.searchBarData.split(",")
          : null
        : null,
    };
    setQueryObject(queryObject);
  }, [
    allAdsPerams.appliedFilters,
    allAdsPerams.sortFilter,
    allAdsPerams.pageIndex,
    allAdsPerams.searchBarData,
  ]);

  useSkipInitialEffect(() => {
    if (
      Object.keys(filteredAds?.filterData).includes(
        allAdsPerams?.pageIndex.toString()
      )
    ) {
      dispatch(laodCashedPageData(filteredAds?.paginationIndex));
    } else {
      dispatch(
        loadFilteredAdsStart({
          ...queryObject,
          page_index: filteredAds?.paginationIndex,
          number_of_pagead: process.env.REACT_APP_NO_OF_ADS_PER_PAGE,
        })
      );
    }
  }, [dispatch, queryObject]);

  useSkipInitialEffect(() => {
    if (allAdsPerams.searchBarData.length > 0) {
      location.pathname === "/" && dispatch(clearCashedPageData());
      setQueryObject({
        ...queryObject,
        keywords: allAdsPerams?.searchBarData.length
          ? allAdsPerams?.searchType === "Ad Text"
            ? allAdsPerams?.searchBarData.split(" ")
            : null
          : null,

        phrase: allAdsPerams?.searchBarData.length
          ? allAdsPerams?.searchType === "Exact Phrase"
            ? allAdsPerams?.searchBarData.split(",")
            : null
          : null,
      });
    }
  }, [dispatch, allAdsPerams.searchType, allAdsPerams.searchBarData]);  
 
  return (
    <>
      {filteredAds?.loading && filteredAds?.filteredAds.length === 0 ? (
        <Box
          className="loader"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <FadeLoader
            color="#00BFFF"
            cssOverride={{ top: "0px", marginTop: "35px" }}
          />
        </Box>
      ) : (
        <Grid
          item
          sx={{
            width: "90%",
          }}
        >
          <Grid
            container
            sx={{
              marginTop: "5px",
              width: "100%",
            }}
          >
            {filteredAds?.filteredAds?.length !== 0 &&
              filteredAds?.filteredAds?.map((ads, index) => (
                <ThumbNailBox adInfo={ads} index={index} key={index} />
              ))}
            {filteredAds?.filteredAds?.length === 0 &&
              filteredAds?.loading === false && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Stack>
                    <img src={emptyImg} alt="" />
                    <Typography sx={{ color: "#808080" }}>
                      No Records Found
                    </Typography>
                  </Stack>
                </Box>
              )}
          </Grid>
        </Grid>
      )}
      <Box
        sx={{
          width: "100%",
          marginBottom: 5,
          marginTop: 5,
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {(allAdsPerams.pageIndex !== 0 || !filteredAds?.loading) && (
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            lg={6}
            xs={12}
            md={9}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}                       
          >
            <Pagination
              count={filteredAds?.totalPages}
              size={"large"}
              page={filteredAds?.paginationIndex + 1}
              onChange={(e, p) => {
                window.history.pushState(
                  {},
                  "",
                  `http://localhost:3000/page=${p}`
                );
                dispatch(setCurrentPaginationIndex(p - 1));
                dispatch(allAdsPeramsDuck.setDatabasePageIndex(p - 1));
              }}
            />
          </Grid>

          <Grid
            item
            lg={2}
            md={3}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop:2,
              marginTop:MobileScreenOnly?"20px":"0px"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "auto" }}>
              <Typography sx={{ width: "auto", marginRight: 1 }}>
                {"Go to"}
              </Typography>
              <Input
                sx={{
                  background: "white",
                  borderRadius: 1,
                  maxWidth: "40%",
                  border: 1,
                  borderColor: "#EBEBEB",
                  pl: 1,
                  p: 1,
                  height: "45px",
                }}
                placeholder="Page No."
                type="number"
                disableUnderline={true}
                onKeyUp={(e) => {
                  console.log("enter");
                  if (e.key === "Enter") {
                    window.history.pushState(
                      {},
                      "",
                      `http://localhost:3000/page=${e.currentTarget.value}`
                    );
                    console.log("enter--", e.currentTarget.value);
                    dispatch(
                      setCurrentPaginationIndex(e.currentTarget.value - 1)
                    );
                    dispatch(
                      allAdsPeramsDuck.setDatabasePageIndex(
                        e.currentTarget.value.trim() - 1
                      )
                    );
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
        )} 
      </Box>
    </>
  );
};

export default AdsList;
