import * as React from "react";
import MDTypography from "components/MDTypography";
import DataBaseBind from "../../data/DataBaseBind";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";

const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

function IllustrationResult(handleChange) {
  return (
    <Card sx={{ height: "40rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3" color="primary">
            Illustration Result
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={DataBaseBind.RateName}
            onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Rate Name" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker input={{ label: "From" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker input={{ label: "To" }} />
        </Grid>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h4" color="Secondary">
            Input Parameters
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Rate Parameter Name" variant="outlined" />
        </Grid>
      </Grid>
      <Stack justifyContent="right" direction="row" p={2}>
        <MDButton variant="contained">Execute</MDButton>
      </Stack>
    </Card>
  );
}

export default IllustrationResult;
