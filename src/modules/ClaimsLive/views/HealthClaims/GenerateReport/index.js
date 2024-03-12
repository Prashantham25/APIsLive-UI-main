import React from "react";
import { Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

import MDDatePicker from "../../../../../components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";

function GenerateReport() {
  return (
    <MDBox>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography>Generate/Download Bank File</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                input={{ label: "From Date" }}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                input={{ label: "To Date" }}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton>SEARCH</MDButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default GenerateReport;
