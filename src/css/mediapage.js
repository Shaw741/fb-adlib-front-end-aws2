import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inputField: {
    border: "2px solid #EBEBEB",
    borderRadius: "10px",
    paddingLeft: "16px",
    height: "43px",
  },
  avtar: {
    backgroundColor: "#00CBFF",
    width: "34px",
    height: "34px",
    padding: "10px",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  multilineinput: {
    border: "2px solid #EBEBEB",
    borderRadius: "10px",
    height: "264px",
    paddingLeft: "16px !important",
  },
  AdsImageVideo: {
    width: "100%",
    height: "auto",
    padding: "0",
    margin: "0",
    overflowY: "none",
    outline: "none",
  },
}));

export default useStyles;
