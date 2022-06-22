import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";

import ThumbNailBox from "../components/ThumbNailBox";
import { loadSavedAdsStart } from "../redux/ducks/saveAds";

// const useStyles = makeStyles((theme) => ({
//   title: {
//     background:
//       "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//   },
//   titleimage: {
//     height: "37px !important",
//     width: "41px !important",
//     marginRight: "10px",
//   },
//   addTextfilter: {
//     padding: theme.spacing(1, 3),
//     border: "1px solid #EBEBEB",
//     borderRadius: "15px",
//     marginTop: "10px",
//   },
//   addtextfilterButton: {
//     padding: "4px 4px",
//     borderRadius: 10,
//     display: "flex",
//     justifyContent: "space-between",
//     border: "2px solid #EBEBEB",
//   },
//   divider: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   calenderfilter: {
//     color: "#2B2F42",
//     whiteSpace: "nowrap",
//     border: "1px solid #EBEBEB",
//     borderRadius: 3,
//   },
//   staricon: {
//     marginLeft: "20px",
//     cursor: "pointer",
//   },
//   libraryimg: {
//     marginLeft: "20px",
//   },
//   img: {
//     width: "100%",
//     height: "auto",
//     padding: "0",
//     margin: "0",
//     overflowY: "none",
//     outline: "none",
//   },
//   Arrow: {
//     marginLeft: theme.spacing(1),
//   },
//   shareicon: {
//     marginLeft: theme.spacing(5),
//   },
//   saveicon: {
//     marginLeft: theme.spacing(2),
//   },
//   addinfo: {
//     display: "inlineBlock",
//     fontWeight: "16px",
//     whiteSpace: "nowrap",
//     overflow: "hidden !important",
//     textOverflow: "ellipsis",
//   },
//   sedetails: {
//     background:
//       "linear-gradient(270deg, #B5EDFF 0%, #00CBFF 29.96%, #6721FF 89.87%, #C8BDFF 104.58%)",
//     float: "right",
//   },
// }));

const SavedAds = () => {
  const dispatch = useDispatch();

  const { savedAds } = useSelector((state) => state.savedAds);
  const { allMediaAds } = useSelector((state) => state.allMediaAds);

  const [savedAdsData, setSavedAdsData] = useState([]);

  useEffect(() => {
    dispatch(loadSavedAdsStart());
  }, [dispatch]);
  useEffect(() => {
    setSavedAdsData((pre) => []);

    for (let i = 0; i < savedAds.length; i++) {
      for (let j = 0; j < allMediaAds.length; j++) {
        if (savedAds[i].ad === allMediaAds[j].adID) {
          setSavedAdsData((pre) => [
            ...pre,
            { deleteId: savedAds[i].id, data: allMediaAds[j] },
          ]);
        }
      }
    }
  }, [allMediaAds, savedAds]);

  return (
    <Grid container spacing={2} sx={{ marginTop: "10px" }}>
      {savedAdsData.map((ads, index) => (
        <ThumbNailBox
          adInfo={ads.data}
          index={index}
          key={index}
          deleteId={ads.deleteId}
        />
      ))}
    </Grid>
  );
};

export default SavedAds;
