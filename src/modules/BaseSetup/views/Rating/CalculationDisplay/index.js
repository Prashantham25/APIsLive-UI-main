import * as React from "react";
import MDTypography from "components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";

const { Card, Grid, Stack } = require("@mui/material");

function CalculationDisplay() {
  return (
    <Card sx={{ height: "30rem" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
        <MDTypography variant="h3" color="primary">
          Calculation Display
        </MDTypography>
        <Stack direction="row" spacing={2} mt={2}>
          <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDDatePicker input={{ label: "Start Date" }} />
          </Grid>

          <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDDatePicker input={{ label: "End Date" }} />
          </Grid>
        </Stack>
        <Stack justifyContent="right" direction="row">
          <MDButton variant="contained">SEARCH</MDButton>
        </Stack>
      </Grid>
    </Card>
  );
}

export default CalculationDisplay;
