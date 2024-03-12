import React from "react";
import { Grid } from "@mui/material";
import MDInput from "../../../../../components/MDInput";

function ProviderArea() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="
        Hospital Total Area(in sq.feet)"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="
        Hospital  Floor Area(in sq.feet)"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="
        Area Alloted to IPD(in sq.feet)"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="
      Area Alloted to OPD(in sq.feet)"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDInput
          label="
     Number of Consultation rooms for OPD"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="
        OPD Timing"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="
        Total number of beds in Provider"
        />
      </Grid>
    </Grid>
  );
}

export default ProviderArea;
