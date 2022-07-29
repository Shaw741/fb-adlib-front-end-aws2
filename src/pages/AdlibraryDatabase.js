import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  // InputBase,
  Popover,
  Radio,
  RadioGroup,
  // Slider,
  // Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import "react-datepicker/dist/react-datepicker.css";
import Arrowdown from "../assets/Arrowdown.svg";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ThumbNailBox from "../components/ThumbNailBox";
import {
  applyallfilters,
  // clearSingleFilteredDataStart,
  FilterAfterSearchStart,
  loadFilteredDataStart,
  // putFilteredDataStart,
  // putFilteredDataStart,
  searchStart,
  SortvalueStart,
} from "../redux/ducks/filtered_Data";
import EditableLabel from "react-simple-editlabel";
import { EditText } from "react-edit-text";
import BackTotopbutton from "../pages/Backtotopbutton";
import AllFilters from "../components/AllFilters";
import SortFilter from "../components/SortFilter";
import Mychart from "../components/Graph";
import {
  // clearSingleFilteredDataStart,
  loadMediaStart,
} from "../redux/ducks/mediaAds";
import InfiniteScroll from "react-infinite-scroll-component";
import { clearSingleFilteredDataStart } from "../redux/ducks/appliedFilterData";
import { FadeLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
// import { clearSingleFilteredDataStart } from "../redux/ducks/filterData";
// import MyGraph from "../components/Graph";

// import { escapeRegExp } from "@mui/x-data-grid/utils/utils";

const useStyles = makeStyles((theme) => ({
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
    // fontWeight: 500,
    // fontSize: "18px",
    // lineHeight: "24px",
    // color: "#2B2F42",
    // marginTop: "8px",
    // marginBottom: "18px",
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

  AdsImageVideo: {
    width: "100%",
    height: "auto",
    padding: "0",
    margin: "0",
    overflowY: "none",
    outline: "none",
  },
  DropDownArrow: {
    marginLeft: theme.spacing(1),
  },
  shareicon: {
    marginLeft: theme.spacing(5),
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
    justifyContent: "space-evenly",
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

const Addlibrarydatabase = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const {
    search_loading,
    allMediaAdsData,
    loading,
    page_index,
    postionYoffset,
  } = useSelector((state) => state.allMediaAds);

  const {
    // search_loading,
    // allMediaAdsData,
    // allMediaAds,
    // loading,
    appliedFilters,
    maxRanger,
    // page_index,
    sortFilter,
    searchType,
    searchBarData,
    // postionYoffset,
  } = useSelector((state) => state.appliedFilterData);

  const { savedIds } = useSelector((state) => state.savedclienads);

  const fetchData = () => {
    dispatch(
      loadMediaStart({
        page_index: page_index + 1,
        startdate: appliedFilters?.StartRunningDate?.startdate,
        enddate: appliedFilters?.StartRunningDate?.enddate,
        adcount:
          appliedFilters?.AdCount?.min > maxRanger.AdCount.min ||
          appliedFilters?.AdCount?.max < maxRanger.AdCount.max
            ? [appliedFilters?.AdCount?.min, appliedFilters?.AdCount?.max]
            : [],
        adstatus: appliedFilters?.AdStatus?.status,
        fb_likes:
          appliedFilters?.FacebookLikes?.min > maxRanger.FacebookLikes.min ||
          appliedFilters?.FacebookLikes?.max < maxRanger.FacebookLikes.max
            ? [
                appliedFilters?.FacebookLikes?.min,
                appliedFilters?.FacebookLikes?.max,
              ]
            : [],
        insta_followers:
          appliedFilters?.InstragramLike?.min > maxRanger.InstragramLike.min ||
          appliedFilters?.InstragramLike?.max < maxRanger.InstragramLike.max
            ? [
                appliedFilters?.InstragramLike?.min,
                appliedFilters?.InstragramLike?.max,
              ]
            : [],
        media_type: appliedFilters?.MediaType?.selectedData,
        cta_status: appliedFilters?.PurchaseType?.selctedButton,

        //   sort_by:sortFilter?.type,
        //       order_by:sortFilter?.order,
        // increaseCount: null,

        sort_by:
          sortFilter?.type === "true" || sortFilter?.type === "false"
            ? ""
            : sortFilter.type,
        order_by:
          sortFilter?.type === "true" || sortFilter?.type === "false"
            ? ""
            : sortFilter?.order,
        increaseCount:
          sortFilter?.type === "true" || sortFilter?.type === "false"
            ? sortFilter?.type
            : null,
        keywords:
          searchType === "All these words" ? searchBarData.split(" ") : [],
        phrase: searchType === "Exact Phrase" ? searchBarData.split(",") : [],
      })
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: postionYoffset,
      behavior: "smooth",
    });
  }, [postionYoffset]);
  console.log(allMediaAdsData?.length, "+++++++++++++++++++++++");

  useEffect(() => {
    // if (allMediaAdsData?.length) {
    //   dispatch(loadFilteredDataStart());
    // } else {
    //   dispatch(putFilteredDataStart({ data: allMediaAdsData }));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackTotopbutton />

      <Grid
        container
        sx={{
          paddingRight: "36px",
        }}
      >
        <Grid item xs={12}>
          <Box component="main">
            <Typography
              className={classes.titleHome}
              variant="h5"
              ml={1}
              sx={{ fontWeight: "bold",color:"#3A3D4B" }}
            >
              Adlibrary Database
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            border: "1px solid #EBEBEB",
            borderRadius: "15px",
            padding: "16px 36px",
            marginTop: 2,
          }}
        >
          <Box
            sx={{
              opacity: search_loading ? 0.5 : 1,
              disabled: search_loading ? true : false,
            }}
          >
            <AllFilters
              name={"AllAdsPage"}
              pageFilterInfo={appliedFilters}
              search={searchBarData}
              search_type={searchType}
              loading={loading}
              sortDetail={sortFilter}
              ranger={maxRanger}
            />
          </Box>

          <Grid container sx={{ marginTop: 1 }}>
            {Object.keys(appliedFilters).map((filter, index) => {
              return (
                appliedFilters[filter]["Message"] &&
                (console.log("cominnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn"),
                (
                  <Chip
                    key={index}
                    color="primary"
                    label={appliedFilters[filter]["Message"]}
                    deleteIcon={
                      <CloseIcon
                        style={{
                          color: "white",
                          backgroundColor: "#00CBFF",
                        }}
                      />
                    }
                    onDelete={() => {
                      const filters = Object(appliedFilters[filter]);
                      const AdsRemovedElement = {
                        MIN: "min",
                        MEDIATYPE: "selectedData",
                        STATUS: "status",
                        SELECTEDDATE: "StartRunningDate",
                      };
                      console.log(filter);

                      console.log(";;;;;;;;;;;;;;;");
                      const FilterRemoveData = [];
                      for (let dum in filters) {
                        console.log("dum" + dum);
                        console.log(dum, filters[dum]);
                        // console.log(typeof appliedFilters[filter][dum]);
                        FilterRemoveData[dum] =
                          typeof appliedFilters[filter][dum] === "number"
                            ? dum === AdsRemovedElement.MIN
                              ? 1
                              : filter === "FacebookLikes"
                              ? 100000
                              : filter === "InstragramLike"
                              ? 10000
                              : 1000
                            : typeof appliedFilters[filter][dum] === "string"
                            ? dum === AdsRemovedElement.MEDIATYPE
                              ? dum === AdsRemovedElement.STATUS
                                ? "Active"
                                : ""
                              : ""
                            : new Date();
                      }
                      // console.table(FilterRemoveData);
                      console.log(FilterRemoveData);
                      dispatch(
                        clearSingleFilteredDataStart({
                          name: filter,
                          data: FilterRemoveData,
                        })
                      );
                      // fetchData();
                    }}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#00CBFF",
                      // marginLeft: 1,
                      margin: 0.5,
                    }}
                  />
                ))
              );
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ marginTop: "10px" }}>
          <SortFilter
            loading={loading}
            sortDetail={sortFilter}
            pageFilterInfo={appliedFilters}
            ranger={maxRanger}
            name={"AllAdsPage"}
            search={searchBarData}
            search_type={searchType}
          />
        </Grid>

        <Grid item sx={{width:"100%"}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              visibility: loading && page_index === 0 ? "visible" : "hidden",
              // width: "100%",
            }}
          >
            <FadeLoader
              style={{
                position: "relative",
                opacity: 1,
                zIndex: 1,
                visibility: loading && page_index === 0 ? "visible" : "hidden",
                // marginTop: "250px",
              }}
              color="#00BFFF"
            />
          </Box>
          <InfiniteScroll
            dataLength={allMediaAdsData.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={
              <div
                style={{                  
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",width:"100%"
                }}
              >
                {loading?<h4>Loading...</h4>:null}
              </div>
            }
          >
            <Grid
              item
              sx={{
                opacity: page_index === 0 && loading ? 0.5 : 1,
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={3}
                sx={{
                  marginTop: "5px",
                  width: "100%",
                }}
              >
                {allMediaAdsData?.length !== 0 &&
                  allMediaAdsData?.map((ads, index) => (
                    <ThumbNailBox
                      adInfo={ads}
                      index={index}
                      deleteId={savedIds?.includes(ads.id) ? ads.id : false}
                      key={index}
                    />
                  ))}
                {allMediaAdsData?.length === 0 && loading === false && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography>No Result</Typography>
                  </Box>
                )}
              </Grid>
              {/* // )} */}
            </Grid>
          </InfiniteScroll>
        </Grid>
      </Grid>
      {/* </InfiniteScroll> */}
    </>
  );
};

export default Addlibrarydatabase;
