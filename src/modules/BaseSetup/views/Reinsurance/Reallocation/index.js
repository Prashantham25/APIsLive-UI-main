import React from "react";

import { Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "../../../../../components/MDBox/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import MDButton from "../../../../../components/MDButton/index";

function Reallocation() {
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Policy Number" />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton>Search</MDButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default Reallocation;
