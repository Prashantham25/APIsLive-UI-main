import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SuccessfullDialog({ handleClose, open, jsonValue, orderID }) {
  return (
    <Dialog open={open}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button onClick={handleClose}>X</Button>
        </Grid>
      </Grid>
      <DialogTitle sx={{ textAlign: "center" }}>Selected Plan</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ p: 2, textAlign: "center" }}>
          <CheckCircleIcon sx={{ fontSize: "60px !important" }} />
          <p style={{ color: "#27AE60" }}>
            <strong>Recharge Successfull</strong>
          </p>
          <p>
            Your Vodafone Top-up for {jsonValue.ProposalData["Mobile Number"]} was successfully
            recharged
          </p>
          <p>Order ID: {orderID}</p>
          <p>
            <strong>You are covered for 25 OMR worth of Mobile damage cover</strong> <br />
            <small>
              (Policy Document containing the coverage details will be mailed to your registered
              Email address)
            </small>
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="center">
          <Grid item>
            <Button onClick={handleClose}>Go to Home</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
