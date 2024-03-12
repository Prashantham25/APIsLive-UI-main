import * as React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MDTypography from "components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import DataBaseBind from "../../data/DataBaseBind";

const { Card, Grid, Autocomplete } = require("@mui/material");

function IllustrationConfig(handleChange) {
  return (
    <Card sx={{ height: "30rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3" color="primary">
            Illustration Configuration
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="Parameter Group Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            options={DataBaseBind.RateName}
            onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Illustration config" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            options={DataBaseBind.RateName}
            onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Illustration Formula" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <AddCircleIcon fontSize="large" />
        </Grid>
      </Grid>
    </Card>
  );
}

export default IllustrationConfig;
