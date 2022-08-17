import { Grid } from "@material-ui/core";
import ThumbNailBox from "./ThumbNailBox";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as savedAdsPeramsDuck from "../redux/ducks/savedAdsPerams";
import {
  loadMoresavedFilteredAdsStart,
  loadsavedFilteredAdsStart,
  setSavedCurrentPaginationAds,
  setSavedCurrentPaginationIndex,
} from "../redux/ducks/filteredSavedAds";
import { useSkipInitialEffect } from "../utils/customHooks";
import emptyImg from "../assets/empty.svg";
import { FadeLoader } from "react-spinners";
import { useEffect, useState } from "react";

const SavedAdsList = () => {
  const dispatch = useDispatch();
  const filteredSavedAds = useSelector((state) => state.filteredSavedAds);
  const { SavedCurrentPageStartPoint , SavedCurrentPageEndPoint,paginationIndex,SavedCurrentPage} = useSelector((state) => state.filteredSavedAds);
  const savedAdsPerams = useSelector((state) => state.savedAdsPerams);
  const [queryObject, setQueryObject] = useState({});
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(2);


  useEffect(() => {
    console.log("savedAdsPerams :", savedAdsPerams);
  }, [savedAdsPerams]);
 useEffect(()=>{
  console.log("101 start")
  SavedCurrentPage?.map((ads, index) => console.log("101",ads.id))
 })
  useSkipInitialEffect(()=>{
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
          savedAdsPerams?.searchBarData.length  ? savedAdsPerams?.searchType === "All these words"
            ? savedAdsPerams?.searchBarData.split(" ")
            : null:null,

        phrase:
        savedAdsPerams?.searchBarData.length  ? savedAdsPerams?.searchType === "Exact Phrase"
            ? savedAdsPerams?.searchBarData.split(",")
            : null:null,
            number_of_pagead: 2,
    };
    setQueryObject(queryObject);
  },[
    savedAdsPerams.appliedFilters,
    savedAdsPerams.sortFilter,
    savedAdsPerams.pageIndex,
  ])

  useSkipInitialEffect(() => {
    if (filteredSavedAds.filteredSavedAds.length === 0) {
      dispatch(loadsavedFilteredAdsStart({ ...queryObject, page_index: 0 }));
    } else {
      if (savedAdsPerams?.pageIndex > 0) {
        dispatch(
          loadMoresavedFilteredAdsStart({
            ...queryObject,
            page_index: savedAdsPerams?.pageIndex,
          })
        );
      } else {
        dispatch(loadsavedFilteredAdsStart({ ...queryObject, page_index: 0 }));
      }
    }
  }, [dispatch, queryObject]);

  useSkipInitialEffect(() => {
    if (savedAdsPerams.searchBarData.length > 0) {
      setQueryObject({
        ...queryObject,
        keywords:
        savedAdsPerams?.searchBarData.length  ? savedAdsPerams?.searchType === "All these words"
            ? savedAdsPerams?.searchBarData.split(" ")
            : null:null,

        phrase:
        savedAdsPerams?.searchBarData.length  ? savedAdsPerams?.searchType === "Exact Phrase"
            ? savedAdsPerams?.searchBarData.split(",")
            : null:null,
      });
    }
  }, [dispatch, savedAdsPerams.searchType, savedAdsPerams.searchBarData]);

  useEffect(()=>{
    window.scrollTo(0,filteredSavedAds.postionOfPage);
    dispatch(setSavedCurrentPaginationAds({start:0,end:4,currentPage:1}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Box>
      { filteredSavedAds?.loading && filteredSavedAds?.filteredSavedAds.length === 0 ?   <Box
            className="loader"
            style={{
              // opacity:0.5,
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
          </Box> : 
        <Grid
        item
        sx={{
          width: "100%",
        }}
      >
        <Grid
          container            
          sx={{
            marginTop: "5px",
            width: "100%",
          }}
        >
          {filteredSavedAds?.filteredSavedAds?.length !== 0 &&
            SavedCurrentPage.map((ads, index) => (
              <ThumbNailBox adInfo={ads} index={index} key={index} />
            ))}
          {filteredSavedAds?.filteredSavedAds?.length === 0 &&
            filteredSavedAds?.loading === false && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "100px",
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
      }
       <Pagination
          count={filteredSavedAds?.totalPages}
          size={"large"}           
          // page={paginationIndex}                    
          onChange={(e, p) => {
            console.log("101 ----p",p,"------------------- p-1",(p-1),"p+2",(p+2));
            if(p===1){
              dispatch(setSavedCurrentPaginationAds({start:0,end:4,currentPage:p}))
            }else
            {dispatch(setSavedCurrentPaginationAds({start:((p-1)*4),end:(p*4),currentPage:p}))}
            // setPageStart(()=>p+1)
            // setPageEnd(()=>p+3)
            //console.log("9909",e)
            // dispatch(setSavedCurrentPaginationIndex(p-1))
            // dispatch(
            //   loadMoresavedFilteredAdsStart({
            //     ...queryObject,
            //     page_index: p-1,
            //   })
            // );
            // dispatch(
            //   savedAdsPeramsDuck.setSavedAdsPageIndex(
            //     p - 1
            //   )
            // )
          }}/>
    </Box>
  );
};

export default SavedAdsList;
