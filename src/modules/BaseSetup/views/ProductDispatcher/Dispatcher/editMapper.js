import React from "react";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

const { Grid, Stack, Autocomplete } = require("@mui/material");

function EditMapper({ entity, urlpathName, moduleId }) {
  return (
    <MDBox>
      <Stack justifyContent="center" direction="row">
        <MDTypography variant="h6" color="primary">
          Edit Mapper Details
        </MDTypography>
      </Stack>

      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            options={entity}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Select Object Mapper" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="targetParameterId"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            options={moduleId.filter((item) => urlpathName === item.methodName)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput {...params} label="Mapper Source Parameter" required />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Mapper Target Parameter"
            // value={dispatcherObject.dispatcherTaskName}
            // onChange={(e) =>
            //   setdispatcherObject({ ...dispatcherObject, dispatcherTaskName: e.target.value })
            // }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton>Update</MDButton>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default EditMapper;
