import React from "react";
import { TextareaAutosize, Grid } from "@mui/material";
import MDBox from "../../../../../components/MDBox";

import { useDataController } from "../../../../BrokerPortal/context";

function GeneratePolicyJson() {
  const [controller] = useDataController();
  const { ProductJson } = controller;

  return (
    <MDBox>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <TextareaAutosize
          minRows={5}
          style={{
            width: "800px",
            border: "0.1px solid #ada5a5 ",
            height: "auto",
            overflow: "auto",
            resize: "none",
            padding: "8px",
          }}
          label="Policy Json"
          value={ProductJson.policyJson}
        />
      </Grid>
    </MDBox>
  );
}
export default GeneratePolicyJson;
