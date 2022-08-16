import { makeStyles } from "@material-ui/core";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  Popover,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Arrowdown from "../assets/Arrowdown.svg";
import { useDispatch, useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { EditText } from "react-edit-text";
import * as allAdsPeramsDuck from "../redux/ducks/allAdsPerams";
import * as savedAdsPeramsDuck from "../redux/ducks/savedAdsPerams";
import { PageNameEnum } from "../utils/enums";
import { useLocation } from "react-router-dom";
import GradientButton from "react-linear-gradient-button";
import filter from "../assets/filter.svg";
import ResetButton from "./ResetButton";

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
  DropDownArrow2: {
    marginLeft: theme.spacing(8),
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
  searchBtn: {
    "&:hover": {
      border: "none !important",
    },
  },
  filterBtn: {
    "&:hover": {
      border: "1px solid #EBEBEB !important",
    },
  },
}));

function AllFilters(props) {
  const [pageName, setPageName] = useState("");
  const [searchBarValue, setSearchBarValue] = useState("");
  const theme = useTheme();
  
  const ShowFilterWithClearButton = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageName(PageNameEnum.AdlibraryDatabase);
        break;
      case "/savedAds":
        setPageName(PageNameEnum.SavedAds);
        break;
      default:
        setPageName("");
    }
  }, [location.pathname]);

  const { buttonTypes } = useSelector((state) => state.buttonTypes);

  const allAdsPerams = useSelector((state) => state.allAdsPerams);
  const savedAdsPerams = useSelector((state) => state.savedAdsPerams);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [rangeanchorel, setrangeAnchorEl] = React.useState(null);
  const addcounteropen = Boolean(rangeanchorel);
  const [mediaTypeAnchorel, setMediaTypeAnchorel] = React.useState(null);
  const openMediaTypeAnchorel = Boolean(mediaTypeAnchorel);
  const [adStatusAnchorel, setAdStatusAnchorel] = React.useState(null);
  const openAdStatusAnchorel = Boolean(adStatusAnchorel);
  const [facebookLikeanchorel, setFacebookLikeAnchorEl] = React.useState(null);
  const openFaceboolLike = Boolean(facebookLikeanchorel);
  const [instragramFolloweranchorel, setInstragramFollowerAnchorEl] =
    React.useState(null);
  const openInstragramFollower = Boolean(instragramFolloweranchorel);
  const [ButtonTypeanchorel, setButtonTypeAnchorEl] = React.useState(null);
  const openButtonType = Boolean(ButtonTypeanchorel);
  const [seachTypeanchorel, setSeachTypeAnchorEl] = React.useState(null);
  const openSearchType = Boolean(seachTypeanchorel);

  const [rangeAdcountValue, setRangeAdcountValue] = useState({
    min: allAdsPerams?.appliedFilters?.AdCount?.min,
    max: allAdsPerams?.appliedFilters?.AdCount?.max,
  });
  const [rangeFacebookValue, setRangeFacebookValue] = useState({
    min: allAdsPerams?.appliedFilters?.FacebookLikes?.min,
    max: allAdsPerams?.appliedFilters?.FacebookLikes?.max,
  });
  const [rangeInstragramValue, setRangeInstragramValue] = useState({
    min: allAdsPerams?.appliedFilters?.InstagramFollowers?.min,
    max: allAdsPerams?.appliedFilters?.InstagramFollowers?.max,
  });

  const [savedPageRangeAdcountValue, setSavedPageRangeAdcountValue] = useState({
    min: savedAdsPerams?.appliedFilters?.AdCount?.min,
    max: savedAdsPerams?.appliedFilters?.AdCount?.max,
  });
  const [savedPageRangeFacebookValue, setSavedPageRangeFacebookValue] =
    useState({
      min: savedAdsPerams?.appliedFilters?.FacebookLikes?.min,
      max: savedAdsPerams?.appliedFilters?.FacebookLikes?.max,
    });

  const [savedPageRangeInstragramValue, setSavedPageRangeInstragramValue] =
    useState({
      min: savedAdsPerams?.appliedFilters?.InstagramFollowers?.min,
      max: savedAdsPerams?.appliedFilters?.InstagramFollowers?.max,
    });

  useEffect(() => {
    setSearchBarValue(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPerams?.searchBarData
        : savedAdsPerams?.searchBarData
    );
  }, [pageName, allAdsPerams?.searchBarData, savedAdsPerams?.searchBarData]);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleAdsCountChange = (newValue, isReset) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeAppliedFilters({
            key: "AdCount",
            value: {
              // componentName: pageName,
              min: newValue[0],
              max: newValue[1],
              chipText: `Ad Count : ${newValue[0]}-${newValue[1]}`,
              isApplied: isReset ? false : true,
            },
          })
        : savedAdsPeramsDuck.changeSavedAppliedFilters({
            key: "AdCount",
            value: {
              // componentName: pageName,
              min: newValue[0],
              max: newValue[1],
              chipText: `Ad Count : ${newValue[0]}-${newValue[1]}`,
              isApplied: isReset ? false : true,
            },
          })
    );
  };

  const handleChangeStatus = (newValue, isReset) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeAppliedFilters({
            key: "AdStatus",
            value: {
              selectedValue: newValue,
              chipText: `Ad status : ${newValue}`,
              isApplied: isReset ? false : true,
            },
          })
        : savedAdsPeramsDuck.changeSavedAppliedFilters({
            key: "AdStatus",
            value: {
              // componentName: pageName,
              selectedValue: newValue,
              chipText: `Ad status : ${newValue}`,
              isApplied: isReset ? false : true,
            },
          })
    );
  };

  const handleFacebookLikesChange = (newValue, isReset) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeAppliedFilters({
            key: "FacebookLikes",
            value: {
              // componentName: pageName,
              min: newValue[0],
              max: newValue[1],
              chipText: `FacebookLike Page Likes: ${newValue[0]}-${newValue[1]}`,
              isApplied: isReset ? false : true,
            },
          })
        : savedAdsPeramsDuck.changeSavedAppliedFilters({
            key: "FacebookLikes",
            value: {
              // componentName: pageName,
              min: newValue[0],
              max: newValue[1],
              chipText: `FacebookLike Page Followers: ${newValue[0]}-${newValue[1]}`,
              isApplied: isReset ? false : true,
            },
          })
    );
  };

  const handleInstagramFollowersChange = (newValue, isReset) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeAppliedFilters({
            key: "InstagramFollowers",
            value: {
              // componentName: pageName,
              min: newValue[0],
              max: newValue[1],
              chipText: `Instagram Page Followers : ${newValue[0]}-${newValue[1]}`,
              isApplied: isReset ? false : true,
            },
          })
        : savedAdsPeramsDuck.changeSavedAppliedFilters({
            key: "InstagramFollowers",
            value: {
              // componentName: pageName,
              min: newValue[0],
              max: newValue[1],
              chipText: `Instagram Page Followers : ${newValue[0]}-${newValue[1]}`,
              isApplied: isReset ? false : true,
            },
          })
    );
  };

  const handleMediaTypechange = (newValue, isReset) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeAppliedFilters({
            key: "MediaType",
            value: {
              selectedValue: newValue,
              chipText: `Media Type : ${newValue}`,
              isApplied: isReset ? false : true,
            },
          })
        : savedAdsPeramsDuck.changeSavedAppliedFilters({
            key: "MediaType",
            value: {
              selectedValue: newValue,
              chipText: `Media Type : ${newValue}`,
              isApplied: isReset ? false : true,
            },
          })
    );
  };

  const handleButtonType = (newValue, isReset) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeAppliedFilters({
            key: "ButtonStatus",
            value: {
              selectedValue: newValue,
              chipText: `Button Text : ${newValue}`,
              isApplied: isReset ? false : true,
            },
          })
        : savedAdsPeramsDuck.changeSavedAppliedFilters({
            key: "ButtonStatus",
            value: {
              selectedValue: newValue,
              chipText: `Button Text : ${newValue}`,
              isApplied: isReset ? false : true,
            },
          })
    );
  };

  const handleChangeSearchType = (newValue) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeSearchType({
            key: "searchType",
            value: newValue,
          })
        : savedAdsPeramsDuck.changeSavedSearchType({
            key: "searchType",
            value: newValue,
          })
    );
  };

  const handleChangeSearchBar = (newValue) => {
    console.log("6666", newValue);
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeSearchBarData({
            key: "searchBarData",
            value: newValue,
          })
        : savedAdsPeramsDuck.changeSavedSearchBarData({
            key: "searchBarData",
            value: newValue,
          })
    );
  };

  const handleStartDateChange = (newValue) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeAppliedFilters({
            key: "StartRunningDate",
            value: {
              startdate: format(newValue.selection.startDate, "yyyy-MM-dd"),
              enddate: format(newValue.selection.endDate, "yyyy-MM-dd"),
              chipText: `Running Date ${format(
                newValue.selection.startDate,
                "yyyy-MM-dd"
              )} to ${format(newValue.selection.endDate, "yyyy-MM-dd")}`,
              isApplied: true,
            },
          })
        : savedAdsPeramsDuck.changeSavedAppliedFilters({
            key: "StartRunningDate",
            value: {
              startdate: format(newValue.selection.startDate, "yyyy-MM-dd"),
              enddate: format(newValue.selection.endDate, "yyyy-MM-dd"),
              chipText: `Running Date ${format(
                newValue.selection.startDate,
                "yyyy-MM-dd"
              )} to ${format(newValue.selection.endDate, "yyyy-MM-dd")}`,
              isApplied: true,
            },
          })
    );
  };

  useEffect(() => {
    allAdsPerams?.appliedFilters?.AdCount?.chipText === "" &&
      setRangeAdcountValue({
        min: 1,
        max: 1000,
      });
    allAdsPerams?.appliedFilters?.FacebookLikes?.chipText === "" &&
      setRangeFacebookValue({
        min: 1,
        max: 100000,
      });

    allAdsPerams?.appliedFilters?.InstagramFollowers?.chipText === "" &&
      setRangeInstragramValue({
        min: 1,
        max: 100000,
      });

    savedAdsPerams?.appliedFilters?.AdCount?.chipText === "" &&
      setSavedPageRangeAdcountValue({
        min: 1,
        max: 1000,
      });

    savedAdsPerams?.appliedFilters?.FacebookLikes?.chipText === "" &&
      setSavedPageRangeFacebookValue({
        min: 1,
        max: 100000,
      });

    savedAdsPerams?.appliedFilters?.InstagramFollowers?.chipText === "" &&
      setSavedPageRangeInstragramValue({
        min: 1,
        max: 100000,
      });
  }, [
    allAdsPerams?.appliedFilters?.AdCount?.chipText,
    allAdsPerams?.appliedFilters?.FacebookLikes?.chipText,
    allAdsPerams?.appliedFilters?.InstagramFollowers?.chipText,
    savedAdsPerams?.appliedFilters?.AdCount?.chipText,
    savedAdsPerams?.appliedFilters?.FacebookLikes?.chipText,
    savedAdsPerams?.appliedFilters?.InstagramFollowers?.chipText,
  ]);
  return (
    <>
      <Stack
        direction={"row"}
        // container
        sx={{ border: "1px solid #EBEBEB", borderRadius: 2 }}
      >
        <Grid item sx={{ display: "flex" }}>
          {/* Select Search Type Start  */}

          <Button
            onClick={(event) => {
              setSeachTypeAnchorEl(event.currentTarget);
            }}
            size="large"
            variant="outlined"
            disableElevation
            disableRipple
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "none",
            }}
            className={classes.searchBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
              {pageName === PageNameEnum.AdlibraryDatabase
                ? allAdsPerams?.searchType
                : savedAdsPerams?.searchType}
            </Typography>
          </Button>
          <Popover
            anchorEl={seachTypeanchorel}
            add={openSearchType ? "simple-popover" : undefined}
            onClose={() => {
              setSeachTypeAnchorEl(null);
            }}
            open={openSearchType}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ width: "190px" }}>
              <FormControl sx={{ padding: "10px" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.searchType
                      : savedAdsPerams?.searchType
                  }
                  onChange={(e) => {
                    handleChangeSearchType(e.target.value);
                    setSeachTypeAnchorEl(null);
                  }}
                >
                  <FormControlLabel
                    value="All these words"
                    control={<Radio style={{ color: "#00CBFF" }} />}
                    label="All these words"
                  />
                  <FormControlLabel
                    value="Exact Phrase"
                    control={<Radio style={{ color: "#00CBFF" }} />}
                    label="Exact Phrase"
                  />
                </RadioGroup>
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <Button
                    // disabled={props.loading}
                    variant="outlined"
                    sx={{
                      borderRadius: 50,
                      textTransform: "none",
                      fontWeight: 600,
                      borderColor: "#00CBFF",
                      color: "#00CBFF",
                      height: "35px",
                      width: "80px",
                      borderWidth: 2,
                    }}
                    className={classes.filterBtn}
                    onClick={(e) => {
                      handleChangeSearchType("All these words");
                      setSeachTypeAnchorEl(null);
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Popover>
          {/* Select Search Type End  */}

          <Divider orientation="vertical" sx={{ marginLeft: "auto" }} />
        </Grid>

        {/* Searchbar Start  */}
        {/* <Box sx={{ marginLeft: "21px",justifyContent:"bottom", alignItems:"end" ,width:"100%"}}> */}
        <InputBase
          value={searchBarValue}
          fullWidth
          placeholder="Search"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleChangeSearchBar(e.currentTarget.value);
            }
            if (e.target.value.length === 0) {
              // console.log("6666",e.target.value.length)
              handleChangeSearchBar("");
            }
          }}
          onChange={(e) => {
            console.log("6666 searcgh ", searchBarValue);
            setSearchBarValue(e.currentTarget.value);
          }}
          size="large"
          sx={{ paddingLeft: "15px" }}
        />
        {/* </Box> */}
        {/* Searchbar End  */}
      </Stack>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item lg={11} md={12} sm={12} xs={12}>
          {/* Date Filter Start */}
          <Button
            // disabled={props.loading}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            size="large"
            variant="outlined"
            disableElevation
            disableRipple
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
              "@media (max-width: 450px)": {
                width: "100%",
              },
            }}
            className={classes.filterBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
              Started Running Date{" "}
            </Typography>
          </Button>
          <Popover
            anchorEl={anchorEl}
            open={open}
            add={open ? "simple-popover" : undefined}
            onClose={() => {
              // callFilters();
              setAnchorEl(null);
            }}
            transformOrigin={{
              horizontal: "left",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom",
            }}
          >
            <DateRange
              id="datepicker"
              onChange={(item) => {
                handleStartDateChange(item);
                setRange([item.selection]);
              }}
              // style={{ color:"black"}}
              // backgroundColor="pink"
              rangeColors={["#00CBFF"]}
              editableDateInputs={false}
              ranges={range}
              months={1}
              direction="horizontal"
              className="calendarElement"
            />
          </Popover>
          {/* Date Filter End */}

          {/* Ad Count Filter Start */}
          <Button
            // disabled={props.loading}
            onClick={(e) => setrangeAnchorEl(e.currentTarget)}
            variant="outlined"
            size="large"
            disableElevation
            disableRipple
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
              cursor: "pointer",
              "@media (max-width: 450px)": {
                width: "100%",
              },
            }}
            className={classes.filterBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
              {" "}
              Ad count{" "}
            </Typography>
          </Button>
          <Popover
            open={addcounteropen}
            anchorEl={rangeanchorel}
            onClose={() => {
              // callFilters();
              setrangeAnchorEl(null);
            }}
            add={open ? "simple-popover" : undefined}
            transformOrigin={{
              horizontal: ShowFilterWithClearButton?"center":"left",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: ShowFilterWithClearButton?"center":"left",
              vertical: "bottom",
            }}
          >
            <Box
              sx={{
                margin: 2,
                width: "210px",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                direction={"column"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Stack direction={"row"} spacing={1}>
                    <Typography>From</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      defaultValue={
                        pageName === PageNameEnum.AdlibraryDatabase
                          ? rangeAdcountValue.min.toString()
                          : savedPageRangeAdcountValue.min.toString()
                      }
                      onSave={(e) => {
                        if (Number(e.value) !== e.previousValue) {
                          if (pageName === PageNameEnum.AdlibraryDatabase) {
                            setRangeAdcountValue({
                              min: Number(e.value),
                              max: rangeAdcountValue.max,
                            });
                          } else {
                            setSavedPageRangeAdcountValue({
                              min: Number(e.value),
                              max: savedPageRangeAdcountValue.max,
                            });
                          }

                          handleAdsCountChange([
                            Number(e.value),
                            pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.appliedFilters?.AdCount?.max
                              : savedAdsPerams?.appliedFilters?.AdCount?.max,
                          ]);
                        }
                      }}
                    />

                    <Typography>to</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      defaultValue={
                        pageName === PageNameEnum.AdlibraryDatabase
                          ? rangeAdcountValue.max.toString()
                          : savedPageRangeAdcountValue.max.toString()
                      }
                      onSave={(e) => {
                        if (Number(e.value) !== e.previousValue) {
                          if (pageName === PageNameEnum.AdlibraryDatabase) {
                            setRangeAdcountValue({
                              min: rangeAdcountValue.min,
                              max: Number(e.value),
                            });
                          } else {
                            setSavedPageRangeAdcountValue({
                              min: savedPageRangeAdcountValue.min,
                              max: Number(e.value),
                            });
                          }
                          if (
                            Number(e.value) >
                            (pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.maxRanger?.AdCount?.max
                              : savedAdsPerams?.maxRanger?.AdCount?.max)
                          ) {
                            dispatch(
                              pageName === PageNameEnum.AdlibraryDatabase
                                ? allAdsPeramsDuck.refixMinMaxRange({
                                    key: "AdCount",
                                    value: {
                                      max: Number(e.value),
                                    },
                                  })
                                : savedAdsPeramsDuck.refixSavedMinMaxRange({
                                    key: "AdCount",
                                    value: {
                                      max: Number(e.value),
                                    },
                                  })
                            );
                          }
                          handleAdsCountChange([
                            pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.appliedFilters?.AdCount?.min
                              : savedAdsPerams?.appliedFilters?.AdCount?.min,
                            Number(e.value),
                          ]);
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Slider
                  id="adcount"
                  size="small"
                  value={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? [rangeAdcountValue.min, rangeAdcountValue.max]
                      : [
                          savedPageRangeAdcountValue.min,
                          savedPageRangeAdcountValue.max,
                        ]
                    // [rangeAdcountValue.min, rangeAdcountValue.max]
                    // pageName === PageNameEnum.AdlibraryDatabase
                    //   ? [
                    //       allAdsPerams?.appliedFilters?.AdCount?.min,
                    //       allAdsPerams?.appliedFilters?.AdCount?.max,
                    //     ]
                    //   : [
                    //       savedAdsPerams?.appliedFilters?.AdCount?.min,
                    //       savedAdsPerams?.appliedFilters?.AdCount?.max,
                    //     ]
                  }
                  min={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.maxRanger?.AdCount?.min
                      : savedAdsPerams?.maxRanger?.AdCount?.min
                  }
                  max={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.maxRanger?.AdCount?.max
                      : savedAdsPerams?.maxRanger?.AdCount?.max
                  }
                  sx={{ color: "#00CBFF" }}
                  onChangeCommitted={(e) => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? handleAdsCountChange([
                          rangeAdcountValue.min,
                          rangeAdcountValue.max,
                        ])
                      : handleAdsCountChange([
                          savedPageRangeAdcountValue.min,
                          savedPageRangeAdcountValue.max,
                        ]);
                  }}
                  onChange={(e) => {
                    if (pageName === PageNameEnum.AdlibraryDatabase) {
                      setRangeAdcountValue({
                        min: e.target.value[0],
                        max: e.target.value[1],
                      });
                    } else {
                      setSavedPageRangeAdcountValue({
                        min: e.target.value[0],
                        max: e.target.value[1],
                      });
                    }
                  }}
                  // onChange={(e) => handleAdsCountChange(e.target.value)}
                />                
                <ResetButton onResetFunction={()=>{
                   pageName === PageNameEnum.AdlibraryDatabase
                   ? setRangeAdcountValue({
                       min: 1,
                       max: allAdsPerams?.maxRanger?.AdCount?.max,
                     })
                   : setSavedPageRangeAdcountValue({
                       min: 1,
                       max: savedAdsPerams?.maxRanger?.AdCount?.max,
                     });
                 handleAdsCountChange([1, 1000], true);
                 setrangeAnchorEl(null);
                }}/>
                {/* <GradientButton
                  gradient={[
                    "rgba(103, 33, 255, 1)",
                    "rgba(0, 203, 255, 1)",
                    "rgba(181, 237, 255, 1)",
                  ]}
                  onClick={() => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeAdcountValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.AdCount?.max,
                        })
                      : setSavedPageRangeAdcountValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.AdCount?.max,
                        });
                    handleAdsCountChange([1, 1000], true);
                    setrangeAnchorEl(null);
                  }}
                  style={{
                    fontWeight: 600,
                    color: "#00CBFF",
                    textTransform: "none",
                  }}
                  borderWidth={3}
                >
                  <Typography
                    paddingLeft={1}
                    paddingRight={1}
                    style={{
                      textTransform: "none",
                      color: "url(#linearColors)",
                    }}
                    variant="p"
                  >
                    Reset
                  </Typography>
                </GradientButton> */}

                {/* <Button
                  // disabled={props.loading}
                  variant="outlined"
                  sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "#00CBFF",
                    color: "#00CBFF",
                    borderWidth: 2,
                  }}
                  className={classes.filterBtn}
                  onClick={() => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeAdcountValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.AdCount?.max,
                        })
                      : setSavedPageRangeAdcountValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.AdCount?.max,
                        });
                    handleAdsCountChange([1, 1000], true);
                    setrangeAnchorEl(null);
                  }}
                >
                  Reset
                </Button> */}
              </Stack>
            </Box>
          </Popover>
          {/* Ad Count Filter End */}

          {/* Ad Status Filter Start */}
          <Button
            // disabled={props.loading}
            variant="outlined"
            onClick={(e) => setAdStatusAnchorel(e.currentTarget)}
            size="large"
            disableElevation
            disableRipple
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
              "@media (max-width: 450px)": {
                width: "100%",
              },
            }}
            className={classes.filterBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
              {" "}
              Ad status{" "}
            </Typography>
          </Button>
          <Popover
            anchorEl={adStatusAnchorel}
            add={openAdStatusAnchorel ? "simple-popover" : undefined}
            onClose={() => {
              // callFilters();
              setAdStatusAnchorel(null);
            }}
            open={openAdStatusAnchorel}
            transformOrigin={{
              vertical: "top",
              horizontal: ShowFilterWithClearButton?"center":"left",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: ShowFilterWithClearButton?"center":"left",
            }}
          >
            <Box sx={{ width: "190px" }}>
              <FormControl sx={{ padding: "10px" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.appliedFilters?.AdStatus?.selectedValue
                      : savedAdsPerams?.appliedFilters?.AdStatus?.selectedValue
                  }
                  onChange={(e) => {
                    handleChangeStatus(e.target.value);
                    setAdStatusAnchorel(null);
                  }}
                >
                  <FormControlLabel
                    value="Active"
                    control={<Radio style={{ color: "#00CBFF" }} />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="Inactive"
                    control={<Radio style={{ color: "#00CBFF" }} />}
                    label="Inactive"
                  />
                </RadioGroup>
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <ResetButton onResetFunction={()=>{
                    handleChangeStatus("", true);
                    setAdStatusAnchorel(null);
                  }}/>
                  {/* <GradientButton
                    gradient={[
                      "rgba(103, 33, 255, 1)",
                      "rgba(0, 203, 255, 1)",
                      "rgba(181, 237, 255, 1)",
                    ]}
                    onClick={(e) => {
                      handleChangeStatus("", true);
                      setAdStatusAnchorel(null);
                    }}
                    style={{
                      fontWeight: 600,
                      color: "#00CBFF",
                      textTransform: "none",
                    }}
                    borderWidth={3}
                  >
                    <Typography
                      paddingLeft={1}
                      paddingRight={1}
                      style={{
                        textTransform: "none",
                        color: "url(#linearColors)",
                      }}
                      variant="p"
                    >
                      Reset
                    </Typography>
                  </GradientButton> */}

                  {/* <Button
                    // disabled={props.loading}
                    variant="outlined"
                    sx={{
                      borderRadius: 50,
                      fontWeight: 600,
                      borderColor: "#00CBFF",
                      textTransform: "none",
                      color: "#00CBFF",
                      height: "35px",
                      width: "80px",
                      borderWidth: 2,
                    }}
                    className={classes.filterBtn}
                    onClick={(e) => {
                      handleChangeStatus("", true);
                      setAdStatusAnchorel(null);
                    }}
                  >
                    Reset
                  </Button> */}
                </Box>
              </FormControl>
            </Box>
          </Popover>
          {/* Ad Status Filter End */}

          {/* Facebook Likes Filter Start */}
          <Button
            // disabled={props.loading}
            variant="outlined"
            onClick={(e) => setFacebookLikeAnchorEl(e.currentTarget)}
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
              "@media (max-width: 450px)": {
                width: "100%",
              },
            }}
            className={classes.filterBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
              {" "}
              Facebook Page Likes
            </Typography>
          </Button>
          <Popover
            open={openFaceboolLike}
            anchorEl={facebookLikeanchorel}
            add={openFaceboolLike ? "simple-popover" : undefined}
            onClose={() => {
              // callFilters();
              setFacebookLikeAnchorEl(null);
            }}
            transformOrigin={{
              horizontal: ShowFilterWithClearButton?"center":"left",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: ShowFilterWithClearButton?"center":"left",
              vertical: "bottom",
            }}
          >
            <Box
              sx={{
                margin: 2,
                width: "210px",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                direction={"column"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Stack direction={"row"} spacing={1}>
                    <Typography>From</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      defaultValue={
                        pageName === PageNameEnum.AdlibraryDatabase
                          ? rangeFacebookValue.min.toString()
                          : savedPageRangeFacebookValue.min.toString()

                        // pageName === PageNameEnum.AdlibraryDatabase
                        //   ? allAdsPerams?.appliedFilters?.FacebookLikes?.min.toString()
                        //   : savedAdsPerams?.appliedFilters?.FacebookLikes?.min.toString()
                      }
                      onSave={(e) => {
                        if (Number(e.value) !== e.previousValue) {
                          if (pageName === PageNameEnum.AdlibraryDatabase) {
                            setRangeFacebookValue({
                              min: Number(e.value),
                              max: rangeFacebookValue.max,
                            });
                          } else {
                            setSavedPageRangeFacebookValue({
                              min: Number(e.value),
                              max: savedPageRangeFacebookValue.max,
                            });
                          }

                          handleFacebookLikesChange([
                            Number(e.value),
                            pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.appliedFilters?.FacebookLikes?.max
                              : savedAdsPerams?.appliedFilters?.FacebookLikes
                                  ?.max,
                          ]);
                        }
                      }}
                    />

                    <Typography>to</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      defaultValue={
                        pageName === PageNameEnum.AdlibraryDatabase
                          ? rangeFacebookValue.max.toString()
                          : savedPageRangeFacebookValue.max.toString()
                        // pageName === PageNameEnum.AdlibraryDatabase
                        //   ? allAdsPerams?.appliedFilters?.FacebookLikes?.max.toString()
                        //   : savedAdsPerams?.appliedFilters?.FacebookLikes?.max.toString()
                      }
                      onSave={(e) => {
                        if (Number(e.value) !== e.previousValue) {
                          if (pageName === PageNameEnum.AdlibraryDatabase) {
                            setRangeFacebookValue({
                              min: rangeFacebookValue.min,
                              max: Number(e.value),
                            });
                          } else {
                            setSavedPageRangeFacebookValue({
                              min: savedPageRangeFacebookValue.min,
                              max: Number(e.value),
                            });
                          }

                          if (
                            Number(e.value) >
                            (pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.appliedFilters?.FacebookLikes?.max
                              : savedAdsPerams?.appliedFilters?.FacebookLikes
                                  ?.max)
                          ) {
                            dispatch(
                              pageName === PageNameEnum.AdlibraryDatabase
                                ? allAdsPeramsDuck.refixMinMaxRange({
                                    key: "FacebookLikes",
                                    value: {
                                      max: Number(e.value),
                                    },
                                  })
                                : savedAdsPeramsDuck.refixSavedMinMaxRange({
                                    key: "FacebookLikes",
                                    value: {
                                      max: Number(e.value),
                                    },
                                  })
                            );
                          }
                          handleFacebookLikesChange([
                            pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.appliedFilters?.FacebookLikes?.min
                              : savedAdsPerams?.appliedFilters?.FacebookLikes
                                  ?.min,
                            Number(e.value),
                          ]);
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Slider
                  id="facebook"
                  size="small"
                  value={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? [rangeFacebookValue.min, rangeFacebookValue.max]
                      : [
                          savedPageRangeFacebookValue.min,
                          savedPageRangeFacebookValue.max,
                        ]
                    // pageName === PageNameEnum.AdlibraryDatabase
                    //   ? [
                    //       allAdsPerams?.appliedFilters?.FacebookLikes?.min,
                    //       allAdsPerams?.appliedFilters?.FacebookLikes?.max,
                    //     ]
                    //   : [
                    //       savedAdsPerams?.appliedFilters?.FacebookLikes?.min,
                    //       savedAdsPerams?.appliedFilters?.FacebookLikes?.max,
                    //     ]
                  }
                  min={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.maxRanger?.FacebookLikes?.min
                      : savedAdsPerams?.maxRanger?.FacebookLikes?.min
                  }
                  max={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.maxRanger?.FacebookLikes?.max
                      : savedAdsPerams?.maxRanger?.FacebookLikes?.max
                  }
                  sx={{ color: "#00CBFF" }}
                  onChangeCommitted={(e) => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? handleFacebookLikesChange([
                          rangeFacebookValue.min,
                          rangeFacebookValue.max,
                        ])
                      : handleFacebookLikesChange([
                          savedPageRangeFacebookValue.min,
                          savedPageRangeFacebookValue.max,
                        ]);
                  }}
                  onChange={(e) => {
                    if (pageName === PageNameEnum.AdlibraryDatabase) {
                      setRangeFacebookValue({
                        min: e.target.value[0],
                        max: e.target.value[1],
                      });
                    } else {
                      setSavedPageRangeFacebookValue({
                        min: e.target.value[0],
                        max: e.target.value[1],
                      });
                    }

                    // handleFacebookLikesChange(e.target.value)
                  }}
                />
                <ResetButton onResetFunction={()=>{ pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeFacebookValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.FacebookLikes?.max,
                        })
                      : setSavedPageRangeFacebookValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.FacebookLikes?.max,
                        });

                    handleFacebookLikesChange([1, 100000], true);
                    setFacebookLikeAnchorEl(null);}}/>
                {/* <GradientButton
                  gradient={[
                    "rgba(103, 33, 255, 1)",
                    "rgba(0, 203, 255, 1)",
                    "rgba(181, 237, 255, 1)",
                  ]}
                  onClick={() => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeFacebookValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.FacebookLikes?.max,
                        })
                      : setSavedPageRangeFacebookValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.FacebookLikes?.max,
                        });

                    handleFacebookLikesChange([1, 100000], true);
                    setFacebookLikeAnchorEl(null);
                  }}
                  style={{
                    fontWeight: 600,
                    color: "#00CBFF",
                    textTransform: "none",
                  }}
                  borderWidth={3}
                >
                  <Typography
                    paddingLeft={1}
                    paddingRight={1}
                    style={{
                      textTransform: "none",
                      color: "url(#linearColors)",
                    }}
                    variant="p"
                  >
                    Reset
                  </Typography>
                </GradientButton> */}
                {/* <Button
                  // disabled={props.loading}
                  variant="outlined"
                  sx={{
                    borderRadius: 50,
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "#00CBFF",
                    color: "#00CBFF",
                    borderWidth: 2,
                  }}
                  className={classes.filterBtn}
                  onClick={() => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeFacebookValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.FacebookLikes?.max,
                        })
                      : setSavedPageRangeFacebookValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.FacebookLikes?.max,
                        });

                    handleFacebookLikesChange([1, 100000], true);
                    setFacebookLikeAnchorEl(null);
                  }}
                >
                  Reset
                </Button> */}
              </Stack>
            </Box>
          </Popover>
          {/* Facebook Likes Filter End */}

          {/* Instagram Likes Filter Start */}
          <Button
            // disabled={props.loading}
            variant="outlined"
            onClick={(e) => setInstragramFollowerAnchorEl(e.currentTarget)}
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
              "@media (max-width: 450px)": {
                width: "100%",
              },
            }}
            className={classes.filterBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
              {" "}
              Instagram Page Followers{" "}
            </Typography>
          </Button>
          <Popover
            open={openInstragramFollower}
            anchorEl={instragramFolloweranchorel}
            add={openInstragramFollower ? "simple-popover" : undefined}
            onClose={() => {
              // callFilters();
              setInstragramFollowerAnchorEl(null);
            }}
            transformOrigin={{
              horizontal: ShowFilterWithClearButton?"center":"left",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: ShowFilterWithClearButton?"center":"left",
              vertical: "bottom",
            }}
          >
            <Box
              sx={{
                margin: 2,
                width: "210px",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                direction={"column"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Stack direction={"row"} spacing={1}>
                    <Typography>From</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      // width="30px"

                      defaultValue={
                        pageName === PageNameEnum.AdlibraryDatabase
                          ? rangeInstragramValue.min.toString()
                          : savedPageRangeInstragramValue.min.toString()
                        // pageName === PageNameEnum.AdlibraryDatabase
                        //   ? allAdsPerams?.appliedFilters?.InstagramFollowers?.min.toString()
                        //   : savedAdsPerams?.appliedFilters?.InstagramFollowers?.min.toString()
                      }
                      onSave={(e) => {
                        if (Number(e.value) !== e.previousValue) {
                          if (pageName === PageNameEnum.AdlibraryDatabase) {
                            setRangeInstragramValue({
                              min: Number(e.value),
                              max: rangeInstragramValue.max,
                            });
                          } else {
                            setSavedPageRangeInstragramValue({
                              min: Number(e.value),
                              max: savedPageRangeInstragramValue.max,
                            });
                          }

                          handleInstagramFollowersChange([
                            Number(e.value),
                            pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.appliedFilters?.InstagramFollowers
                                  ?.max
                              : savedAdsPerams?.appliedFilters
                                  ?.InstagramFollowers?.max,
                          ]);
                        }
                      }}
                    />

                    <Typography>to</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      // width="30px"

                      defaultValue={
                        pageName === PageNameEnum.AdlibraryDatabase
                          ? rangeInstragramValue.max.toString()
                          : savedPageRangeInstragramValue.max.toString()
                        // pageName === PageNameEnum.AdlibraryDatabase
                        //   ? allAdsPerams?.appliedFilters?.InstagramFollowers?.max.toString()
                        //   : savedAdsPerams?.appliedFilters?.InstagramFollowers?.max.toString()
                      }
                      onSave={(e) => {
                        if (Number(e.value) !== e.previousValue) {
                          if (pageName === PageNameEnum.AdlibraryDatabase) {
                            setRangeInstragramValue({
                              min: rangeInstragramValue.min,
                              max: Number(e.value),
                            });
                          } else {
                            setSavedPageRangeInstragramValue({
                              min: savedPageRangeInstragramValue.min,
                              max: Number(e.value),
                            });
                          }

                          if (
                            Number(e.value) >
                            (pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.maxRanger?.InstagramFollowers?.max
                              : savedAdsPerams?.maxRanger?.InstagramFollowers
                                  ?.max)
                          ) {
                            dispatch(
                              pageName === PageNameEnum.AdlibraryDatabase
                                ? allAdsPeramsDuck.refixMinMaxRange({
                                    key: "InstagramFollowers",
                                    value: {
                                      max: Number(e.value),
                                    },
                                  })
                                : savedAdsPeramsDuck.refixSavedMinMaxRange({
                                    key: "InstagramFollowers",
                                    value: {
                                      max: Number(e.value),
                                    },
                                  })
                            );
                          }
                          handleInstagramFollowersChange([
                            pageName === PageNameEnum.AdlibraryDatabase
                              ? allAdsPerams?.appliedFilters?.InstagramFollowers
                                  ?.min
                              : savedAdsPerams?.appliedFilters
                                  ?.InstagramFollowers?.min,
                            Number(e.value),
                          ]);
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Slider
                  id="instragram"
                  size="small"
                  value={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? [rangeInstragramValue.min, rangeInstragramValue.max]
                      : [
                          savedPageRangeInstragramValue.min,
                          savedPageRangeInstragramValue.max,
                        ]

                    // pageName === PageNameEnum.AdlibraryDatabase
                    //   ? [
                    //       allAdsPerams?.appliedFilters?.InstagramFollowers?.min,
                    //       allAdsPerams?.appliedFilters?.InstagramFollowers?.max,
                    //     ]
                    //   : [
                    //       savedAdsPerams?.appliedFilters?.InstagramFollowers
                    //         ?.min,
                    //       savedAdsPerams?.appliedFilters?.InstagramFollowers
                    //         ?.max,
                    //     ]
                  }
                  min={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.maxRanger?.InstagramFollowers?.min
                      : savedAdsPerams?.maxRanger?.InstagramFollowers?.min
                  }
                  max={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.maxRanger?.InstagramFollowers?.max
                      : savedAdsPerams?.maxRanger?.InstagramFollowers?.max
                  }
                  sx={{ color: "#00CBFF" }}
                  onChangeCommitted={(e) => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? handleInstagramFollowersChange([
                          rangeInstragramValue.min,
                          rangeInstragramValue.max,
                        ])
                      : handleInstagramFollowersChange([
                          savedPageRangeInstragramValue.min,
                          savedPageRangeInstragramValue.max,
                        ]);
                  }}
                  onChange={(e) => {
                    if (pageName === PageNameEnum.AdlibraryDatabase) {
                      setRangeInstragramValue({
                        min: e.target.value[0],
                        max: e.target.value[1],
                      });
                    } else {
                      setSavedPageRangeInstragramValue({
                        min: e.target.value[0],
                        max: e.target.value[1],
                      });
                    }
                    // handleInstagramFollowersChange(e.target.value)
                  }}
                />
                <ResetButton onResetFunction={()=>{ pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeInstragramValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.InstagramFollowers?.max,
                        })
                      : setSavedPageRangeInstragramValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.InstagramFollowers
                            ?.max,
                        });
                    handleInstagramFollowersChange([1, 10000], true);
                    setInstragramFollowerAnchorEl(null);}}/>

                <GradientButton
                  gradient={[
                    "rgba(103, 33, 255, 1)",
                    "rgba(0, 203, 255, 1)",
                    "rgba(181, 237, 255, 1)",
                  ]}
                  onClick={() => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeInstragramValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.InstagramFollowers?.max,
                        })
                      : setSavedPageRangeInstragramValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.InstagramFollowers
                            ?.max,
                        });
                    handleInstagramFollowersChange([1, 10000], true);
                    setInstragramFollowerAnchorEl(null);
                  }}
                  style={{
                    fontWeight: 600,
                    color: "#00CBFF",
                    textTransform: "none",
                  }}
                  borderWidth={3}
                >
                  <Typography
                    paddingLeft={1}
                    paddingRight={1}
                    style={{
                      textTransform: "none",
                      color: "url(#linearColors)",
                    }}
                    variant="p"
                  >
                    Reset
                  </Typography>
                </GradientButton>

                {/* <Button
                  // disabled={props.loading}
                  variant="outlined"
                  sx={{
                    borderRadius: 50,
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "#00CBFF",
                    color: "#00CBFF",
                    borderWidth: 2,
                  }}
                  className={classes.filterBtn}
                  onClick={() => {
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? setRangeInstragramValue({
                          min: 1,
                          max: allAdsPerams?.maxRanger?.InstagramFollowers?.max,
                        })
                      : setSavedPageRangeInstragramValue({
                          min: 1,
                          max: savedAdsPerams?.maxRanger?.InstagramFollowers
                            ?.max,
                        });
                    handleInstagramFollowersChange([1, 10000], true);
                    setInstragramFollowerAnchorEl(null);
                  }}
                >
                  Reset
                </Button> */}
              </Stack>
            </Box>
          </Popover>
          {/* Instagram Likes Filter End */}

          {/* Media Type Filter Start */}
          <Button
            variant="outlined"
            onClick={(e) => setMediaTypeAnchorel(e.currentTarget)}
            disableElevation
            disableRipple
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
              "@media (max-width: 450px)": {
                width: "100%",
              },
            }}
            className={classes.filterBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
            size="large"
          >
            <Typography noWrap textTransform="capitalize">
              Media Type
            </Typography>
          </Button>
          <Popover
            anchorEl={mediaTypeAnchorel}
            add={openMediaTypeAnchorel ? "simple-popover" : undefined}
            onClose={() => {
              setMediaTypeAnchorel(null);
            }}
            open={openMediaTypeAnchorel}
            transformOrigin={{
              vertical: "top",
              horizontal: ShowFilterWithClearButton?"center":"left",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: ShowFilterWithClearButton?"center":"left",
            }}
          >
            <Box sx={{ width: "190px" }}>
              <FormControl sx={{ padding: "10px" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.appliedFilters?.MediaType?.selectedValue
                      : savedAdsPerams?.appliedFilters?.MediaType?.selectedValue
                  }
                  onChange={(e) => {
                    handleMediaTypechange(e.target.value);
                    setMediaTypeAnchorel(null);
                  }}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio style={{ color: "#00CBFF" }} />}
                    label="Video or Photo"
                  />
                  <FormControlLabel
                    value="video"
                    control={<Radio style={{ color: "#00CBFF" }} />}
                    label="Video"
                  />
                  <FormControlLabel
                    value="image"
                    control={<Radio style={{ color: "#00CBFF" }} />}
                    label="Photo"
                  />
                </RadioGroup>
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <GradientButton
                    gradient={[
                      "rgba(103, 33, 255, 1)",
                      "rgba(0, 203, 255, 1)",
                      "rgba(181, 237, 255, 1)",
                    ]}
                    onClick={() => {
                      handleMediaTypechange("", true);
                      setMediaTypeAnchorel(null);
                    }}
                    style={{
                      fontWeight: 600,
                      color: "#00CBFF",
                      textTransform: "none",
                    }}
                    borderWidth={3}
                  >
                    <Typography
                      paddingLeft={1}
                      paddingRight={1}
                      style={{
                        textTransform: "none",
                        color: "url(#linearColors)",
                      }}
                      variant="p"
                    >
                      Reset
                    </Typography>
                  </GradientButton>
                  {/* <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 50,
                      fontWeight: 600,
                      textTransform: "none",
                      borderColor: "#00CBFF",
                      color: "#00CBFF",
                      height: "35px",
                      width: "80px",
                      borderWidth: 2,
                    }}
                    className={classes.filterBtn}
                    onClick={() => {
                      handleMediaTypechange("", true);
                      setMediaTypeAnchorel(null);
                    }}
                  >
                    Reset
                  </Button> */}
                </Box>
              </FormControl>
            </Box>
          </Popover>
          {/* Media Type Filter End */}

          {/* Button Filter Start */}
          <Button
            variant="outlined"
            onClick={(e) => setButtonTypeAnchorEl(e.currentTarget)}
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
              "@media (max-width: 450px)": {
                width: "100%",
              },
            }}
            className={classes.filterBtn}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
              Button
            </Typography>
          </Button>
          <Popover
            anchorEl={ButtonTypeanchorel}
            add={openButtonType ? "simple-popover" : undefined}
            onClose={() => {
              setButtonTypeAnchorEl(null);
            }}
            open={openButtonType}
            transformOrigin={{
              vertical: "top",
              horizontal: ShowFilterWithClearButton?"center":"left",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: ShowFilterWithClearButton?"center":"left",
            }}
          >
            <Box sx={{ width: "170px" }}>
              <FormControl sx={{ padding: "10px" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={
                    pageName === PageNameEnum.AdlibraryDatabase
                      ? allAdsPerams?.appliedFilters?.ButtonStatus
                          ?.selectedValue
                      : savedAdsPerams?.appliedFilters?.ButtonStatus
                          ?.selectedValue
                  }
                  onChange={(e) => {
                    handleButtonType(e.target.value);
                    setButtonTypeAnchorEl(null);
                  }}
                >
                  {buttonTypes.map((value) => {
                    return (
                      <FormControlLabel
                        key={value}
                        value={`${value}`}
                        control={<Radio style={{ color: "#00CBFF" }} />}
                        label={`${value}`}
                      />
                    );
                  })}
                </RadioGroup>
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <GradientButton
                    gradient={[
                      "rgba(103, 33, 255, 1)",
                      "rgba(0, 203, 255, 1)",
                      "rgba(181, 237, 255, 1)",
                    ]}
                    onClick={() => {
                      handleButtonType("", true);
                      setButtonTypeAnchorEl(null);
                    }}
                    style={{
                      fontWeight: 600,
                      color: "#00CBFF",
                      textTransform: "none",
                    }}
                    borderWidth={3}
                  >
                    <Typography
                      paddingLeft={1}
                      paddingRight={1}
                      style={{
                        textTransform: "none",
                        color: "url(#linearColors)",
                      }}
                      variant="p"
                    >
                      Reset
                    </Typography>
                  </GradientButton>

                  {/* <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 50,
                      fontWeight: 600,
                      textTransform: "none",
                      borderColor: "#00CBFF",
                      color: "#00CBFF",
                      height: "35px",
                      width: "80px",
                      borderWidth: 2,
                    }}
                    className={classes.filterBtn}
                    onClick={() => {
                      handleButtonType("", true);
                      setButtonTypeAnchorEl(null);
                    }}
                  >
                    Reset
                  </Button> */}
                </Box>
              </FormControl>
            </Box>
          </Popover>
          {/* Button Filter End */}
        </Grid>

        {/* Reset Filter Start */}
        <Grid item lg={1} md={12} sm={12} xs={12} justifyContent="flex-end">
          <Box
            sx={{
              display: "flex",
              // justifyContent: "end",
              // alignItems: "end",
              // "@media (max-width: 450px)": {
                marginTop: ShowFilterWithClearButton ?2:"",
                justifyContent: ShowFilterWithClearButton ?"center":"end",
                alignItems: ShowFilterWithClearButton ?"center":"end",
              // },
            }}
          >
            {/* <Grid container> */}
            {/* <Grid item sx={{ marginTop: "23px" }}> */}
            <GradientButton 
              gradient={[
                "rgba(103, 33, 255, 1)",
                "rgba(0, 203, 255, 1)",
                "rgba(181, 237, 255, 1)",
              ]}
              onClick={() => {
                if (pageName === PageNameEnum.AdlibraryDatabase) {
                  dispatch(allAdsPeramsDuck.clearFilterData());
                } else {
                  dispatch(savedAdsPeramsDuck.clearSavedFilterData());
                }
              }}
              style={{
                 width:ShowFilterWithClearButton?"40%":"",//{xs:"40%",sm:"40%",lg:"auto",md:"auto"},
                
                fontWeight: 600, 
                // height: "40px",                 
                color: "#00CBFF",
                textTransform: "none",                
              }}
              borderWidth={3}
            >
              <Typography
                paddingLeft={1}
                paddingRight={1}
                style={{
                  textTransform: "none",
                  color: "url(#linearColors)",
                }}
                variant="p"
              >
                Clear
              </Typography>
            </GradientButton>
            {(window.location.pathname === `/savedAds`&& ShowFilterWithClearButton) && <Button
              sx={{
                background:
                  " linear-gradient(243.18deg, #B5EDFF 0%, #00CBFF 28.65%, #6721FF 85.94%)",
                color: "white",
                borderRadius: 30,
                width: "40%",
                height: "40px",
                marginLeft:1,
                visibility:{xs:"visible",lg:"hidden",md:"hidden",sm:"hidden"},
                // visibility: {
                //   xs:
                //     window.location.pathname === `/savedAds`
                //       ? "visible"
                //       : "hidden",
                //   lg: "hidden",
                // },
              }}
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
                  props.setFilterActivate(false);
                }}
              />
            </Button>}
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </Grid>
        {/* Reset Filter End */}
      </Grid>
    </>
  );
}

export default AllFilters;
