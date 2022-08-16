import { Button } from "@mui/material";

import React from "react";

function ResetButton(props) {
  return (
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
      onClick={props.onResetFunction}
    >
      Reset
    </Button>
  );
}

export default ResetButton;
