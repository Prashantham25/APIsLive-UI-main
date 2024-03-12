import MDTypography from "components/MDTypography";
import BaseSetupDataBind from "modules/BaseSetup/views/data/BaseSetupDataBind";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";

const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

function Execution({ handleChange }) {
  return (
    <Card sx={{ height: "35rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Communication Execution
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Range Type" /> */}
          <Autocomplete
            id="Event Type"
            name="Event Type"
            options={BaseSetupDataBind.RangeType}
            onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Event Type" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Sub Type" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="Range Type" /> */}
          <Autocomplete
            id="Key Type"
            name="Key Type"
            options={BaseSetupDataBind.RangeType}
            onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Key Type" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Key Value" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton>EXECUTE</MDButton>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Execution;
