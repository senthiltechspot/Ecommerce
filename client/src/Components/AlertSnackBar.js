import { Alert, AlertTitle, Snackbar } from "@mui/material";
import React from "react";

const AlertSnackBar = ({ Message, AlertType, OpenAlert, setOpenAlert }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <Snackbar open={OpenAlert} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={AlertType} sx={{ width: "100%" }}>
        <AlertTitle>{AlertType}</AlertTitle>
        {Message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackBar;
