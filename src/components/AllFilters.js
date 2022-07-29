// export default AllFilters
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Arrowdown from "../assets/Arrowdown.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  // AdCountvalueStart,
  applyallfilters,
  // ButtonTypevalueStart,
  // chnageSearchType,
  // clearFilteredDataStart,
  // datevalueStart,
  EmptySearchValueStart,
  FilterAfterSearchStart,
  // MediaTypevalueStart,
  // rangerefixMinMaxSiler,
  // searchPhraseStart,
  // searchStart,
  SortvalueStart,
  // statusValueStart,
} from "../redux/ducks/filtered_Data";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { addDays } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import EditableLabel from "react-simple-editlabel";
import {
  applySavedAdsallfilters,
  EmptySavedSearchValueStart,
  loadSavedAdsStart,
  // SavedAdsAdCountvalueStart,
  SavedAdsButtonTypevalueStart,
  savedAdschnageSearchType,
  SavedAdsclearFilteredDataStart,
  SavedAdsdatevalueStart,
  SavedAdsFilterAfterSearchStart,
  SavedAdsMediaTypevalueStart,
  SavedAdssearchStart,
  SavedAdssearchValueStart,
  // SavedAdsstatusValueStart,
  savedSearchPhraseStart,
  // savedShnageSearchType,
} from "../redux/ducks/saveAds_clientSide";
import { EditText } from "react-edit-text";
import {
  // AdCountvalueStart,
  // ButtonTypevalueStart,
  // chnageSearchType,
  // clearFilteredDataStart,
  // datevalueStart,
  // AdCountvalueStart,
  // ButtonTypevalueStart,
  // chnageSearchType,
  // clearFilteredDataStart,
  loadMediaStart,
  // MediaTypevalueStart,
  // rangerefixMinMaxSiler,
  // savedShnageSearchType,
  // searchPhraseStart,
  // searchStart,
  // statusValueStart,
  // MediaTypevalueStart,
  // // rangerefixMinMaxSiler,
  // savedShnageSearchType,
  // searchPhraseStart,
  // searchStart,
  // statusValueStart,
} from "../redux/ducks/mediaAds";
import {
  AdCountvalueStart,
  ButtonTypevalueStart,
  chnageSearchType,
  clearFilteredDataStart,
  datevalueStart,
  MediaTypevalueStart,
  rangerefixMinMaxSiler,
  savedShnageSearchType,
  searchPhraseStart,
  searchStart,
  statusValueStart,
} from "../redux/ducks/appliedFilterData";
import {
  savedAdCountvalueStart,
  savedButtonTypevalueStart,
  savedchnageSearchType,
  savedclearFilteredDataStart,
  saveddatevalueStart,
  savedMediaTypevalueStart,
  savedrangerefixMinMaxSiler,
  savedsearchStart,
  savedstatusValueStart,
} from "../redux/ducks/saveAppliedFilters";
// import { AdCountvalueStart, clearFilteredDataStart, MediaTypevalueStart, rangerefixMinMaxSiler, searchStart, statusValueStart } from "../redux/ducks/filterData";

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
}));

function AllFilters(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const {  } = useSelector((state) => state.allMediaAds);
  const { appliedFilters,ctaStatus } = useSelector((state) => state.appliedFilterData);

  const { SavedAppliedFilters } = useSelector((state) => state.saveFilterData);

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

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const counterIncremten = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(
        AdCountvalueStart({
          name: "AdCount",
          min: newValue[0],
          max: newValue[1],
          Message: `Ad Count: ${newValue[0]}-${newValue[1]}`,
        })
      );
    }
    if (props.name === "SavedPage") {
      dispatch(
        savedAdCountvalueStart({
          name: "AdCount",
          min: newValue[0],
          max: newValue[1],
          Message: `Ad Count: ${newValue[0]}-${newValue[1]}`,
        })
      );
    }
  };

  const handleChangeStatus = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(
        statusValueStart({
          name: "AdStatus",
          componentName: props.name,
          status: newValue,
          Message: `Ad Status:${newValue}`,
        })
      );
    } else if (props.name === "SavedPage") {
      dispatch(
        savedstatusValueStart({
          name: "AdStatus",
          status: newValue,
          Message: `Ad Status:${newValue}`,
        })
      );
    }
  };
  const FacebookLikesIncremten = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(
        AdCountvalueStart({
          name: "FacebookLikes",
          min: newValue[0],
          max: newValue[1],
          Message: `Facebook Page likes: ${newValue[0]}-${newValue[1]}`,
        })
      );
    } else if (props.name === "SavedPage") {
      dispatch(
        savedAdCountvalueStart({
          name: "FacebookLikes",
          min: newValue[0],
          max: newValue[1],
          Message: `Facebook Page likes: ${newValue[0]}-${newValue[1]}`,
        })
      );
    }
  };
  const InstragramFollowerIncremten = (event, newValue) => {
    console.log(newValue);
    console.log("11111111111111111@@@@@@@@@@@@@@@@@@@@@@@@");
    if (props.name === "AllAdsPage") {
      dispatch(
        AdCountvalueStart({
          name: "InstragramLike",
          min: newValue[0],
          max: newValue[1],
          Message: `Instragram Page likes: ${newValue[0]}-${newValue[1]}`,
        })
      );
    } else if (props.name === "SavedPage") {
      dispatch(
        savedAdCountvalueStart({
          name: "InstragramLike",
          min: newValue[0],
          max: newValue[1],
          Message: `Instragram Page likes: ${newValue[0]}-${newValue[1]}`,
        })
      );
    }
  };
  const handlechange = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(
        MediaTypevalueStart({
          name: "MediaType",
          selectedData: newValue,
          Message: `MediaType : ${newValue}`,
        })
      );
    } else if (props.name === "SavedPage") {
      dispatch(
        savedMediaTypevalueStart({
          name: "MediaType",
          // componentName: props.name,
          selectedData: newValue,
          Message: `MediaType : ${newValue}`,
        })
      );
    }
  };
  const handleButtonType = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(
        ButtonTypevalueStart({
          name: "PurchaseType",
          // componentName: props.name,
          selctedButton: newValue,
          Message: `Button : ${newValue}`,
        })
      );
    } else if (props.name === "SavedPage") {
      dispatch(
        savedButtonTypevalueStart({
          name: "PurchaseType",
          // componentName: props.name,
          selctedButton: newValue,
          Message: `Button : ${newValue}`,
        })
      );
    }
  };

  const handleChangeSearchType = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(chnageSearchType(newValue));
    } else if (props.name === "SavedPage") {
      dispatch(savedchnageSearchType(newValue));
    }
  };

  useEffect(() => {
    // if(props.loading === false || appliedFilters.StartRunningDate.enddate)
     callFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters, SavedAppliedFilters]);

  const callFilters = () => {
    // console.log("111",searchbar , media);
    if (props.name === "AllAdsPage") {
      dispatch(
        loadMediaStart({
          page_index: 0,
          startdate: props.pageFilterInfo?.StartRunningDate?.startdate,
          enddate: props.pageFilterInfo?.StartRunningDate?.enddate,
          adcount:
            props.pageFilterInfo?.AdCount?.min > props.ranger.AdCount.min ||
            props.pageFilterInfo?.AdCount?.max < props.ranger.AdCount.max
              ? [
                  props.pageFilterInfo?.AdCount?.min,
                  props.pageFilterInfo?.AdCount?.max,
                ]
              : [],
          adstatus: props?.pageFilterInfo?.AdStatus?.status,
          fb_likes:
            props.pageFilterInfo?.FacebookLikes?.min >
              props.ranger.FacebookLikes.min ||
            props.pageFilterInfo?.FacebookLikes?.max <
              props.ranger.FacebookLikes.max
              ? [
                  props.pageFilterInfo?.FacebookLikes?.min,
                  props.pageFilterInfo?.FacebookLikes?.max,
                ]
              : [],
          insta_followers:
            props.pageFilterInfo?.InstragramLike?.min >
              props.ranger.InstragramLike.min ||
            props.pageFilterInfo?.InstragramLike?.max <
              props.ranger.InstragramLike.max
              ? [
                  props.pageFilterInfo?.InstragramLike?.min,
                  props.pageFilterInfo?.InstragramLike?.max,
                ]
              : [],
          media_type: props?.pageFilterInfo?.MediaType?.selectedData,
          cta_status: props?.pageFilterInfo?.PurchaseType?.selctedButton,
          sort_by:
            props?.sortDetail?.type === "true" ||
            props?.sortDetail?.type === "false"
              ? ""
              : props?.sortDetail?.type,
          order_by:
            props?.sortDetail?.type === "true" ||
            props?.sortDetail?.type === "false"
              ? ""
              : props?.sortDetail?.order,
          increaseCount:
            props?.sortDetail?.type === "true" ||
            props?.sortDetail?.type === "false"
              ? props?.sortDetail?.type
              : null,
          keywords:
            props?.search_type === "All these words"
              ? props?.search!==""?props?.search.split(" "):null //document.getElementById("searchbar").value.split(" ")
              : null,

          phrase:
            props.search_type === "Exact Phrase"
              ? props?.search!==""? props?.search.split(","):null //document.getElementById("searchbar").value.split(",")
              : null,
        })
      );
    } else if (props.name === "SavedPage") {
      dispatch(
        loadSavedAdsStart({
          page_index: 0,
          startdate: props.pageFilterInfo?.StartRunningDate?.startdate,
          enddate: props.pageFilterInfo?.StartRunningDate?.enddate,
          adcount:
            props.pageFilterInfo?.AdCount?.min > props.ranger.AdCount.min ||
            props.pageFilterInfo?.AdCount?.max < props.ranger.AdCount.max
              ? [
                  props.pageFilterInfo?.AdCount?.min,
                  props.pageFilterInfo?.AdCount?.max,
                ]
              : [],
          adstatus: props?.pageFilterInfo?.AdStatus?.status,
          fb_likes:
            props.pageFilterInfo?.FacebookLikes?.min >
              props.ranger.FacebookLikes.min ||
            props.pageFilterInfo?.FacebookLikes?.max <
              props.ranger.FacebookLikes.max
              ? [
                  props.pageFilterInfo?.FacebookLikes?.min,
                  props.pageFilterInfo?.FacebookLikes?.max,
                ]
              : [],
          insta_followers:
            props.pageFilterInfo?.InstragramLike?.min >
              props.ranger.InstragramLike.min ||
            props.pageFilterInfo?.InstragramLike?.max <
              props.ranger.InstragramLike.max
              ? [
                  props.pageFilterInfo?.InstragramLike?.min,
                  props.pageFilterInfo?.InstragramLike?.max,
                ]
              : [],
          media_type: props?.pageFilterInfo?.MediaType?.selectedData,
          cta_status: props?.pageFilterInfo?.PurchaseType?.selctedButton,
          sort_by:
            props?.sortDetail?.type === "true" ||
            props?.sortDetail?.type === "false"
              ? ""
              : props?.sortDetail?.type,
          order_by:
            props?.sortDetail?.type === "true" ||
            props?.sortDetail?.type === "false"
              ? ""
              : props?.sortDetail?.order,
          increaseCount:
            props?.sortDetail?.type === "true" ||
            props?.sortDetail?.type === "false"
              ? props?.sortDetail?.type
              : null,
              keywords:
            props?.search_type === "All these words"
              ? props?.search!==""?props?.search.split(" "):null //document.getElementById("searchbar").value.split(" ")
              : null,

          phrase:
            props.search_type === "Exact Phrase"
              ? props?.search!==""? props?.search.split(","):null //document.getElementById("searchbar").value.split(",")
              : null,
          // keywords:
          //   props?.search_type === "All these words"
          //     ? document.getElementById("searchbar").value ==="" ? props?.search.split(" "):null //document.getElementById("searchbar").value.split(" ")
          //     : null,

          // phrase:
          //   props.search_type === "Exact Phrase"
          //     ? document.getElementById("searchbar").value ==="" ?props?.search.split(","):null //document.getElementById("searchbar").value.split(",")
          //     : null,
        })
      );
    }
  };

  return (
    <>
      <Grid
        container
        sx={{ border: "2px solid #EBEBEB", borderRadius: "10px" }}
      >
        <Grid item  sx={{ display: "flex" }}>
          {/* <Box sx={{ width: "100%", marginRight: "21px" }}> */}
            {/* <Stack direction={"row"} > */}
            <Button
            // disabled={props.loading}
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
              border: "1px solid #EBEBEB",
              // borderRadius: "10px",
              // marginRight: "14px",
              // marginTop: "22px",
            }}
            // className={classes.FilterBox}
            endIcon={
              <img
                alt="arrowdown"
                src={Arrowdown}
                className={classes.DropDownArrow}
              />
            }
          >
            <Typography noWrap textTransform="capitalize">
            {props.search_type}
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
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={props?.search_type}
                      onChange={handleChangeSearchType}
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
                        onClick={() => {
                          if (props.name === "AllAdsPage") {
                            dispatch(chnageSearchType("All these words"));
                          } else if (props.name === "SavedPage") {
                            dispatch(savedShnageSearchType("All these words"));
                          }
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </Popover>
            {/* </Stack> */}
          {/* </Box> */}
          <Divider orientation="vertical" sx={{ marginLeft: "auto" }} />
        </Grid>
        <Grid item >
          <Box sx={{ marginLeft: "21px" }}>
            <InputBase
              defaultValue={props.search}
              fullWidth
              onKeyUp={(e) => {
                if (props.name === "AllAdsPage") {
                  console.log("come in-=-----------");
                  if (e.key === "Enter") {
                    dispatch(
                      searchStart({
                        data: e.currentTarget.value,
                      })
                    );
                  }
                  // if (e.target.value.length === 0) {
                  //   dispatch(
                  //     searchStart({
                  //       data: "",
                  //     })
                  //   );
                  // }
                } else if (props.name === "SavedPage") {
                  if (e.key === "Enter") {
                    dispatch(
                      savedsearchStart({
                        data: e.currentTarget.value,
                      })
                    );
                  }
                  // if (e.target.value.length === 0) {
                  //   dispatch(
                  //     savedsearchStart({
                  //       data: "",
                  //     })
                  //   );
                  // }
                }
              }}
              margin="dense"
              size="large"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={11} md={11}>
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
            }}
            // className={classes.FilterBox}
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
              onClick={(item) => {

                if (props.name === "AllAdsPage") {
                  dispatch(
                    datevalueStart({
                      name: "StartRunningDate",
                      startdate: format(item.selection.startDate, "yyyy-MM-dd"),
                      enddate: format(item.selection.endDate, "yyyy-MM-dd"),
                      Message: `running date ${format(
                        item.selection.startDate,
                        "yyyy-MM-dd"
                      )} to ${format(item.selection.endDate, "yyyy-MM-dd")}`,
                    })
                  );
                } else if (props.name === "SavedPage") {
                  dispatch(
                    saveddatevalueStart({
                      name: "StartRunningDate",
                      startdate: format(item.selection.startDate, "yyyy-MM-dd"),
                      enddate: format(item.selection.endDate, "yyyy-MM-dd"),
                      Message: `running date ${format(
                        item.selection.startDate,
                        "yyyy-MM-dd"
                      )} to ${format(item.selection.endDate, "yyyy-MM-dd")}`,
                      // componentName: props.name,
                    })
                  );
                }

                setRange([item.selection]);
              }}
              onChange={(item) => {
                console.log(item);
                if (props.name === "AllAdsPage") {
                  // setPreValue(true);
                  dispatch(
                    datevalueStart({
                      name: "StartRunningDate",
                      startdate: format(item.selection.startDate, "yyyy-MM-dd"),
                      enddate: format(item.selection.endDate, "yyyy-MM-dd"),
                      Message: `running date ${format(
                        item.selection.startDate,
                        "yyyy-MM-dd"
                      )} to ${format(item.selection.endDate, "yyyy-MM-dd")}`,
                    })
                  );
                  // callFilters();
                } else {
                  dispatch(
                    saveddatevalueStart({
                      name: "StartRunningDate",
                      startdate: format(item.selection.startDate, "yyyy-MM-dd"),
                      enddate: format(item.selection.endDate, "yyyy-MM-dd"),
                      Message: `running date ${format(
                        item.selection.startDate,
                        "yyyy-MM-dd"
                      )} to ${format(item.selection.endDate, "yyyy-MM-dd")}`,
                    })
                  );
                }

                setRange([item.selection]);
              }}
              editableDateInputs={false}
              ranges={range}
              months={1}
              direction="horizontal"
              className="calendarElement"
            />
          </Popover>

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
            }}
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
              horizontal: "left",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "left",
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

                      defaultValue={props?.pageFilterInfo?.AdCount?.min.toString()}
                      onSave={(e) => {
                        console.log(e);
                        console.log("==============================");
                        if (Number(e.value) !== e.previousValue) {
                          if (props.name === "AllAdsPage") {
                            dispatch(
                              AdCountvalueStart({
                                name: "AdCount",
                                min: Number(e.value),
                                max: props?.pageFilterInfo?.AdCount?.max,
                                Message: `Ad Count: ${e.value}-${props?.pageFilterInfo?.AdCount?.max}`,
                              })
                            );
                          } else if (props.name === "SavedPage") {
                            dispatch(
                              savedAdCountvalueStart({
                                name: "AdCount",
                                min: Number(e.value),
                                max: props?.pageFilterInfo?.AdCount?.max,
                                Message: `Ad Count: ${e.value}-${props?.pageFilterInfo?.AdCount?.max}`,
                              })
                            );
                          }
                        }
                      }}
                    />

                    <Typography>to</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      // width="30px"

                      defaultValue={props?.pageFilterInfo?.AdCount?.max.toString()}
                      onSave={(e) => {
                        console.log(e);
                        console.log("==============================");
                        if (Number(e.value) !== e.previousValue) {
                          if (props.name === "AllAdsPage") {
                            if (Number(e.value) > props?.ranger?.AdCount?.max) {
                              dispatch(
                                rangerefixMinMaxSiler({
                                  name: "AdCount",
                                  // min: 1,
                                  max: Number(e.value),
                                })
                              );
                            }
                            dispatch(
                              AdCountvalueStart({
                                name: "AdCount",
                                // componentName: props.name,
                                min: props?.pageFilterInfo?.AdCount?.min,
                                max: Number(e.value),
                                Message: `Ad Count: ${props?.pageFilterInfo?.AdCount?.min}-${e.value}`,
                              })
                            );
                          }
                          if (props.name === "SavedPage") {
                            if (Number(e.value) > props?.ranger?.AdCount?.max) {
                              dispatch(
                                savedrangerefixMinMaxSiler({
                                  name: "AdCount",
                                  max: Number(e.value),
                                })
                              );
                            }
                            dispatch(
                              savedAdCountvalueStart({
                                name: "AdCount",
                                // componentName: props.name,
                                min: props?.pageFilterInfo?.AdCount?.min,
                                max: Number(e.value),
                                Message: `Ad Count: ${props?.pageFilterInfo?.AdCount?.min}-${e.value}`,
                              })
                            );
                          }
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Slider
                  id="adcount"
                  size="small"
                  value={[
                    props.pageFilterInfo?.AdCount?.min,
                    props.pageFilterInfo?.AdCount?.max,
                  ]}
                  min={props?.ranger?.AdCount?.min}
                  max={props.ranger?.AdCount?.max}
                  sx={{ color: "#00CBFF" }}
                  onChange={counterIncremten}
                />
                <Button
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
                  onClick={() => {
                    if (props.name === "AllAdsPage") {
                      dispatch(
                        AdCountvalueStart({
                          name: "AdCount",
                          // componentName: props.name,
                          min: 1,
                          max: 1000,
                          Message: "",
                        })
                      );
                    } else if (props.name === "SavedPage") {
                      dispatch(
                        savedAdCountvalueStart({
                          name: "AdCount",
                          // componentName: props.name,
                          min: 1,
                          max: 1000,
                          Message: "",
                        })
                      );
                    }

                    setrangeAnchorEl(null);
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Popover>

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
            }}
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
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={props?.pageFilterInfo?.AdStatus?.status}
                  onChange={handleChangeStatus}
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
                  <Button
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
                    onClick={() => {
                      if (props.name === "AllAdsPage") {
                        dispatch(
                          statusValueStart({
                            name: "AdStatus",
                            // componentName: props.name,
                            status: "",
                            Message: "",
                          })
                        );
                        // callFilters();
                      } else if (props.name === "SavedPage") {
                        dispatch(
                          savedstatusValueStart({
                            name: "AdStatus",
                            // componentName: props.name,
                            status: "",
                            Message: "",
                          })
                        );
                        // callFilters();
                      }
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Popover>

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
            }}
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
              horizontal: "left",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "left",
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

                      defaultValue={props?.pageFilterInfo?.FacebookLikes?.min.toString()}
                      onSave={(e) => {
                        if (Number(e.value) !== e.previousValue) {
                          if (props.name === "AllAdsPage") {
                            dispatch(
                              AdCountvalueStart({
                                name: "FacebookLikes",
                                min: Number(e.value),
                                max: props?.pageFilterInfo?.FacebookLikes?.max,
                                Message: `FacebookLikes: ${e.value}-${props?.pageFilterInfo?.FacebookLikes?.max}`,
                              })
                            );
                          } else if (props.name === "SavedPage") {
                            dispatch(
                              savedAdCountvalueStart({
                                name: "FacebookLikes",
                                min: Number(e.value),
                                max: props?.pageFilterInfo?.FacebookLikes?.max,
                                Message: `Facebook Likes page: ${e.value}-${props?.pageFilterInfo?.FacebookLikes?.max}`,
                              })
                            );
                          }
                        }
                      }}
                    />

                    <Typography>to</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      // width="30px"

                      defaultValue={props?.pageFilterInfo?.FacebookLikes?.max.toString()}
                      onSave={(e) => {
                        console.log(e);
                        console.log("==============================");
                        if (Number(e.value) !== e.previousValue) {
                          if (props.name === "AllAdsPage") {
                            if (
                              Number(e.value) >
                              props?.ranger?.FacebookLikes?.max
                            ) {
                              dispatch(
                                rangerefixMinMaxSiler({
                                  name: "FacebookLikes",
                                  // min: 1,
                                  max: Number(e.value),
                                })
                              );
                            }
                            dispatch(
                              AdCountvalueStart({
                                name: "FacebookLikes",
                                min: props?.pageFilterInfo?.FacebookLikes?.min,
                                max: Number(e.value),
                                Message: `FacebookLikes : ${props?.pageFilterInfo?.FacebookLikes?.min}-${e.value}`,
                              })
                            );
                          } else if (props.name === "SavedPage") {
                            if (
                              Number(e.value) >
                              props?.ranger?.FacebookLikes?.max
                            ) {
                              dispatch(
                                savedrangerefixMinMaxSiler({
                                  name: "FacebookLikes",
                                  max: Number(e.value),
                                })
                              );
                            }

                            dispatch(
                              savedAdCountvalueStart({
                                name: "FacebookLikes",
                                min: props?.pageFilterInfo?.FacebookLikes?.min,
                                max: Number(e.value),
                                Message: `FacebookLikes : ${props?.pageFilterInfo?.FacebookLikes?.min}-${e.value}`,
                              })
                            );
                          }
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Slider
                  id="facebook"
                  size="small"
                  value={[
                    props?.pageFilterInfo?.FacebookLikes?.min,
                    props?.pageFilterInfo?.FacebookLikes?.max,
                  ]}
                  min={props?.ranger?.FacebookLikes?.min}
                  max={props?.ranger?.FacebookLikes?.max}
                  sx={{ color: "#00CBFF" }}
                  onChange={FacebookLikesIncremten}
                />
                <Button
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
                  onClick={() => {
                    if (props.name === "AllAdsPage") {
                      dispatch(
                        AdCountvalueStart({
                          name: "FacebookLikes",
                          componentName: props.name,
                          min: 1,
                          max: 100000,
                          Message: "",
                        })
                      );
                      // callFilters();
                    } else if (props.name === "SavedPage") {
                      dispatch(
                        savedAdCountvalueStart({
                          name: "FacebookLikes",
                          // componentName: props.name,
                          min: 1,
                          max: 100000,
                          Message: "",
                        })
                      );
                      // callFilters();
                    }

                    setFacebookLikeAnchorEl(null);
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Popover>

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
            }}
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
              horizontal: "left",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "left",
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

                      defaultValue={props?.pageFilterInfo?.InstragramLike?.min.toString()}
                      onSave={(e) => {
                        console.log(e);
                        console.log("==============================");
                        if (Number(e.value) !== e.previousValue) {
                          if (props.name === "AllAdsPage") {
                            dispatch(
                              AdCountvalueStart({
                                name: "InstragramLike",
                                // componentName: props.name,
                                min: Number(e.value),
                                max: props?.pageFilterInfo?.InstragramLike?.max,
                                Message: `InstragramLike: ${e.value}-${props?.pageFilterInfo?.InstragramLike?.max}`,
                              })
                            );
                          } else if (props.name === "SavedPage") {
                            dispatch(
                              savedAdCountvalueStart({
                                name: "InstragramLike",
                                // componentName: props.name,
                                min: Number(e.value),
                                max: props?.pageFilterInfo?.InstragramLike?.max,
                                Message: `InstragramLike: ${e.value}-${props?.pageFilterInfo?.InstragramLike?.max}`,
                              })
                            );
                          }
                        }
                      }}
                    />

                    <Typography>to</Typography>
                    <EditText
                      id="minRange"
                      type="number"
                      style={{ maxWidth: "100px" }}
                      // width="30px"

                      defaultValue={props?.pageFilterInfo?.InstragramLike?.max.toString()}
                      onSave={(e) => {
                        console.log(e);
                        console.log("==============================");
                        if (Number(e.value) !== e.previousValue) {
                          if (props.name === "AllAdsPage") {
                            if (
                              Number(e.value) > props.ranger.InstragramLike.max
                            ) {
                              dispatch(
                                rangerefixMinMaxSiler({
                                  name: "InstragramLike",
                                  // min: 1,
                                  max: Number(e.value),
                                })
                              );
                            }
                            dispatch(
                              AdCountvalueStart({
                                name: "InstragramLike",
                                // componentName: props.name,
                                min: props?.pageFilterInfo?.InstragramLike?.min,
                                max: Number(e.value),
                                Message: `InstragramLike: ${props?.pageFilterInfo?.InstragramLike?.min}-${e.value}`,
                              })
                            );
                          } else if (props.name === "SavedPage") {
                            if (
                              Number(e.value) > props.ranger.InstragramLike.max
                            ) {
                              dispatch(
                                savedrangerefixMinMaxSiler({
                                  name: "InstragramLike",
                                  max: Number(e.value),
                                })
                              );
                            }
                            dispatch(
                              savedAdCountvalueStart({
                                name: "InstragramLike",
                                min: props?.pageFilterInfo?.InstragramLike?.min,
                                max: Number(e.value),
                                Message: `InstragramLike: ${props?.pageFilterInfo?.InstragramLike?.min}-${e.value}`,
                              })
                            );
                          }
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Slider
                  id="instragram"
                  size="small"
                  value={[
                    props?.pageFilterInfo?.InstragramLike?.min,
                    props?.pageFilterInfo?.InstragramLike?.max,
                  ]}
                  min={props?.ranger?.InstragramLike?.min}
                  max={props.ranger.InstragramLike.max}
                  sx={{ color: "#00CBFF" }}
                  onChange={InstragramFollowerIncremten}
                />
                <Button
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
                  onClick={() => {
                    if (props.name === "AllAdsPage") {
                      dispatch(
                        AdCountvalueStart({
                          name: "InstragramLike",
                          // componentName: props.name,
                          min: 1,
                          max: 10000,
                          Message: "",
                        })
                      );
                      // callFilters();
                    } else if (props.name === "SavedPage") {
                      dispatch(
                        savedAdCountvalueStart({
                          name: "InstragramLike",
                          min: 1,
                          max: 10000,
                          Message: "",
                        })
                      );
                    }

                    setInstragramFollowerAnchorEl(null);
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </Box>
          </Popover>

          <Button
            // disabled={props.loading}
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
            }}
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
              {" "}
              Media Type{" "}
            </Typography>
          </Button>
          <Popover
            anchorEl={mediaTypeAnchorel}
            add={openMediaTypeAnchorel ? "simple-popover" : undefined}
            onClose={() => {
              // callFilters();
              setMediaTypeAnchorel(null);
            }}
            open={openMediaTypeAnchorel}
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
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={props?.pageFilterInfo?.MediaType?.selectedData}
                  onChange={handlechange}
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
                    label="photo"
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
                      fontWeight: 600,
                      textTransform: "none",
                      borderColor: "#00CBFF",
                      color: "#00CBFF",
                      height: "35px",
                      width: "80px",
                      borderWidth: 2,
                    }}
                    onClick={() => {
                      if (props.name === "AllAdsPage") {
                        dispatch(
                          MediaTypevalueStart({
                            name: "MediaType",
                            selectedData: "",
                            Message: "",
                          })
                        );
                      } else if (props.name === "SavedPage") {
                        dispatch(
                          savedMediaTypevalueStart({
                            name: "MediaType",
                            selectedData: "",
                            Message: "",
                          })
                        );
                      }

                      setMediaTypeAnchorel(null);
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Popover>

          <Button
            // disabled={props.loading}
            variant="outlined"
            onClick={(e) => setButtonTypeAnchorEl(e.currentTarget)}
            sx={{
              color: "#2B2F42",
              whiteSpace: "nowrap",
              border: "1px solid #EBEBEB",
              borderRadius: "10px",
              marginRight: "14px",
              marginTop: "22px",
            }}
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
              Button{" "}
            </Typography>
          </Button>
          <Popover
            anchorEl={ButtonTypeanchorel}
            add={openButtonType ? "simple-popover" : undefined}
            onClose={() => {
              // callFilters();
              setButtonTypeAnchorEl(null);
            }}
            open={openButtonType}
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
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={props?.pageFilterInfo?.PurchaseType?.selctedButton}
                  onChange={handleButtonType}
                >
                  {ctaStatus.map((value) => {
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
              </FormControl>
            </Box>
          </Popover>
        </Grid>
        <Grid item lg={1} md={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container>
              <Grid item sx={{ marginTop: "23px" }}>
                <Button
                  // disabled={props.loading}
                  variant="outlined"
                  style={{
                    // background: "#00CBFF",
                    borderRadius: 50,
                    fontWeight: 600,
                    borderColor: "#00CBFF",
                    color: "#00CBFF",
                    height: "35px",
                    width: "80px",
                    borderWidth: 2,
                    textTransform: "none",
                    // letterSpacing:"1px"
                  }}
                  onClick={() => {
                    const emptyFilter = {};
                    console.log("00000000000000000000000000000");
                    // console.log(appliedFilters);
                    console.log("1111111111111111111111111111111111111111");
                    if (props.name === "AllAdsPage") {
                      console.log("first");
                      dispatch(
                        clearFilteredDataStart({
                          StartRunningDate: {
                            startdate: "",
                            enddate: "",
                            Message: "",
                          },
                          AdStatus: { status: "", Message: "" },
                          AdCount: { min: 1, max: 1000, Message: "" },
                          FacebookLikes: { min: 1, max: 100000, Message: "" },
                          InstragramLike: { min: 1, max: 10000, Message: "" },
                          MediaType: { selectedData: "", Message: "" },
                          PurchaseType: { selctedButton: "", Message: "" },
                        })
                      );
                      console.log("first1");

                      // await callFilters();
                      console.log("first2");
                    } else if (props.name === "SavedPage") {
                      dispatch(
                        savedclearFilteredDataStart({
                          StartRunningDate: {
                            startdate: "",
                            enddate: "",
                            Message: "",
                          },
                          AdStatus: { status: "", Message: "" },
                          AdCount: { min: 1, max: 1000, Message: "" },
                          FacebookLikes: { min: 1, max: 100000, Message: "" },
                          InstragramLike: { min: 1, max: 10000, Message: "" },
                          MediaType: {
                            selectedData: "",
                            Message: "",
                          },
                          PurchaseType: { selctedButton: "", Message: "" },
                        })
                      );
                    }
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default AllFilters;
