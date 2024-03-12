// import React, { useState } from "react";
import {
  Grid,
  // Card, FormControl, FormControlLabel, Radio, RadioGroup
} from "@mui/material";
import MDInput from "../../../../../components/MDInput";
// import MDTypography from "../../../../../components/MDTypography";

function Edit() {
  return (
    <Grid container p={2} spacing={2}>
      <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="MapperName" />
      </Grid>
    </Grid>
  );
}
export default Edit;
