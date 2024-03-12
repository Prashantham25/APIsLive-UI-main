import { Grid } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MDBox from "../../components/MDBox";

function ClaimIntemated() {
  return (
    <MDBox sx={{ height: 400 }}>
      <Grid container justifyContent="center">
        <Grid item>
          <strong>Claim Intimated Successfully</strong>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item>
          <CheckCircleIcon sx={{ fontSize: "60px !important" }} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item sx={{ textAlign: "center" }}>
          <p>Your Mobile device damage cover claim is submitted for processing.</p>

          <p>Claim intimation No: 1234567890</p>

          <p>You will get the credit directly to your account as soon it is processed</p>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default ClaimIntemated;
