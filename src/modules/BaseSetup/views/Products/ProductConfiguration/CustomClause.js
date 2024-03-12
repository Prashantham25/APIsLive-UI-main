import React from "react";
import { Grid, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";

import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";

function CustomClause({ cweMaster, customObj, id1, handleCustomClauses, pushClause }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
          <MDTypography variant="h6">Custom Clause</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
          <Autocomplete
            id="cwetypeId"
            value={id1}
            onChange={(e, value) => handleCustomClauses(e, value)}
            renderInput={(params) => <MDInput {...params} label="Select C/W/E" />}
            options={cweMaster}
            getOptionLabel={(option) => option.mValue}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
          <MDInput
            label="Type Name"
            name="typeName"
            value={customObj.typeName}
            onChange={(e) => handleCustomClauses(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
          <MDInput
            label="Description"
            name="description"
            value={customObj.description}
            onChange={(e) => handleCustomClauses(e)}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <MDButton color="primary" onClick={pushClause}>
          Add
        </MDButton>
      </Grid>
    </>
  );
}

export default CustomClause;
