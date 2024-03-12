import React from "react";
import { Grid } from "@mui/material";
import MDButton from "../../../../../../components/MDButton";

function CommunicationDetails() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton>Email</MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton>SMS</MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton>Letter</MDButton>
      </Grid>
    </Grid>
  );
}

export default CommunicationDetails;
