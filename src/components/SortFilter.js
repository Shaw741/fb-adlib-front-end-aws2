import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Typography, 
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Arrowdown from "../assets/Arrowdown.svg";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
// import {
//   applyallfilters,
//   applysortingfilters,
//   fluctuatedDataEnd,
//   // SetSortOrdervalueStart,
//   SortvalueStart,
// } from "../redux/ducks/filtered_Data";
import {
  applySavedAdsallfilters,
  loadSavedAdsStart,
  SavedAdsSetSortOrdervalueStart,
  SavedAdsSortvalueStart,
  SavedfluctuatedDataEnd,
} from "../redux/ducks/saveAds_clientSide";
import { loadMediaStart } from "../redux/ducks/mediaAds";
import { SetSortOrdervalueStart } from "../redux/ducks/appliedFilterData";
import { savedSetSortOrdervalueStart } from "../redux/ducks/saveAppliedFilters";
// import { SetSortOrdervalueStart } from "../redux/ducks/filterData";

const useStyles = makeStyles((theme) => ({
  DropDownArrow: {
    marginLeft: theme.spacing(1),
  },
}));
function SortFilter(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sortByAnchorel, setSortByAnchorel] = React.useState(null);
  const openSortByAnchorel = Boolean(sortByAnchorel);

  // const { sortFilter } = useSelector((state) => state.appliedFilterData);
  // const { sortFilter } = useSelector((state) => state.saveFilterData);
  const callFilters = () => {
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
            props.search_type === "All these words"
              ? "props.search" ==="" ? props.search.split(" ")
              : null:null,
              
          phrase:
            props.search_type === "Exact Phrase" ? "props.search" ==="" ? props.search.split(",") : null :null,
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
          props.search_type === "All these words"
            ? props.search.split(" ")
            : "",
        phrase:
          props.search_type === "Exact Phrase" ? props.search.split(",") : "",
        })
      );
    }
  };
  useEffect(() => {    
    // if(props.loading===false)
    callFilters();
  }, [ props.sortDetail]);
  const handleChangeSortType = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(
        SetSortOrdervalueStart({
          name: "type",
          data: newValue,
          componentName: props.name,
        })
      );
    } else if (props.name === "SavedPage") {
      dispatch(
        savedSetSortOrdervalueStart({
          name: "type",
          data: newValue,
          componentName: props.name,
        })
      );
      

      
    }
  };
  const handleChangeAceOrDes = (event, newValue) => {
    if (props.name === "AllAdsPage") {
      dispatch(
        SetSortOrdervalueStart({
          name: "order",
          data: newValue,
          componentName: props.name,
        })
      );      
    } else if (props.name === "SavedPage") {
      dispatch(
        savedSetSortOrdervalueStart({
          name: "order",
          data: newValue,
          componentName: props.name,
        })
      );    
    }
    
  };

  return (
    <>
      {/* <Grid container justifyContent="flex-end">
       <Box> */}
      <Button
        // disabled={props.loading}
        onClick={(event) => {
          setSortByAnchorel(event.currentTarget);
        }}
        size="large"
        // variant="outlined"
        disableElevation
        disableRipple
        sx={{
          color: "#2B2F42",
          whiteSpace: "nowrap",
          border: "1px solid white",
          borderRadius: "10px",
          marginRight: "14px",
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
          {/* {sortedDetail || "sort by"} */}
          Sort by
        </Typography>
      </Button>
      <Popover
        anchorEl={sortByAnchorel}
        open={openSortByAnchorel}
        add={openSortByAnchorel ? "simple-popover" : undefined}
        onClose={() => {
          // callFilters();
          setSortByAnchorel(null);
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
        <Box>
          <FormControl sx={{ padding: "10px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={props.sortDetail.type}
              onChange={handleChangeSortType}
            >
              <FormControlLabel
                value="startDate"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Started running date"
              />
              <FormControlLabel
                value="lastUpdatedDate"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Recently updated"
              />
              <FormControlLabel
                value="pageInfo.platforms.likes"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Page likes"
              />
              <FormControlLabel
                value="noOfCopyAds"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Ad count total"
              />
              <FormControlLabel
                value="true"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Ad count increase"
              />
              <FormControlLabel
                value="false"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Ad count decrease"
              />
            </RadioGroup>
          </FormControl>
          <Divider />
          <FormControl sx={{ padding: "10px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={props.sortDetail.order}
              onChange={handleChangeAceOrDes}
            >
              <FormControlLabel
                disabled={
                  props.sortDetail.type === "false" ||
                  props.sortDetail.type === "true"
                    ? true
                    : false
                }
                value="asc"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Ascending"
              />
              <FormControlLabel
                disabled={
                  props.sortDetail.type === "false" ||
                  props.sortDetail.type === "true"
                    ? true
                    : false
                }
                value="desc"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Descending"
              />
            </RadioGroup>
          </FormControl>

          {/* <Box
                  display={"flex"}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 50,
                      fontWeight: 600,
                      borderColor: "#00CBFF",
                      color: "#00CBFF",
                      height: "35px",
                      width: "80px",
                      borderWidth: 2,
                    }}
                  >
                    Reset
                  </Button>
                </Box> */}
        </Box>
      </Popover>
      {/* </Box>
     </Grid> */}
    </>
  );
}

export default SortFilter;
