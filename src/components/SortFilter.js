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
import React, { useEffect, useState } from "react";
import Arrowdown from "../assets/Arrowdown.svg";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PageNameEnum } from "../utils/enums";
import * as allAdsPeramsDuck from "../redux/ducks/allAdsPerams";
import * as savedAdsPeramsDuck from "../redux/ducks/savedAdsPerams";

const useStyles = makeStyles((theme) => ({
  DropDownArrow: {
    marginLeft: theme.spacing(1),
  },
}));
function SortFilter(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pageName, setPageName] = useState("");
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

  const allAdsPerams = useSelector((state) => state.allAdsPerams);
  const savedAdsPerams = useSelector((state) => state.savedAdsPerams);

  const [sortByAnchorel, setSortByAnchorel] = React.useState(null);
  const openSortByAnchorel = Boolean(sortByAnchorel);

  const handleChangeSortType = (event, newValue) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeSortFilters({
            key: "type",
            value: {
              selectedValue: newValue,
            },
          })
        : savedAdsPeramsDuck.changeSavedSortFilters({
            key: "type",
            value: {
              selectedValue: newValue,
            },
          })
    );
  };

  const handleChangeAceOrDes = (event, newValue) => {
    dispatch(
      pageName === PageNameEnum.AdlibraryDatabase
        ? allAdsPeramsDuck.changeSortFilters({
            key: "order",
            value: {
              selectedValue: newValue,
            },
          })
        : savedAdsPeramsDuck.changeSavedSortFilters({
            key: "order",
            value: {
              selectedValue: newValue,
            },
          })
    );
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
              aria-labelledby="sort-selector-label"
              name="sort-selector"
              value={
                pageName === PageNameEnum.AdlibraryDatabase
                  ? allAdsPerams?.sortFilter?.type?.selectedValue
                  : savedAdsPerams?.sortFilter?.type?.selectedValue
              }
              onChange={handleChangeSortType}
            >
              <FormControlLabel
                value="startDate"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Started running date"
              />
              <FormControlLabel
                value="lastUpdatedTime"
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
              aria-labelledby="order-selector-label"
              name="order-selector"
              value={
                pageName === PageNameEnum.AdlibraryDatabase
                  ? allAdsPerams?.sortFilter?.order?.selectedValue
                  : savedAdsPerams?.sortFilter?.order?.selectedValue
              }
              onChange={handleChangeAceOrDes}
            >
              <FormControlLabel
                disabled={
                  pageName === PageNameEnum.AdlibraryDatabase
                  ? 
                  ((allAdsPerams?.sortFilter?.type?.selectedValue === "false" ||
                  allAdsPerams?.sortFilter?.type?.selectedValue === "true"
                  ) ? true : false)
                  : ((savedAdsPerams?.sortFilter?.type?.selectedValue === "false" ||
                  savedAdsPerams?.sortFilter?.type?.selectedValue === "true"
                  ) ? true : false)
                }
                value="asc"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Ascending"
              />
              <FormControlLabel
                disabled={
                  pageName === PageNameEnum.AdlibraryDatabase
                  ? 
                  ((allAdsPerams?.sortFilter?.type?.selectedValue === "false" ||
                  allAdsPerams?.sortFilter?.type?.selectedValue === "true"
                  ) ? true : false)
                  : ((savedAdsPerams?.sortFilter?.type?.selectedValue === "false" ||
                  savedAdsPerams?.sortFilter?.type?.selectedValue === "true"
                  ) ? true : false)
                }
                value="desc"
                control={<Radio style={{ color: "#00CBFF" }} />}
                label="Descending"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
}

export default SortFilter;
