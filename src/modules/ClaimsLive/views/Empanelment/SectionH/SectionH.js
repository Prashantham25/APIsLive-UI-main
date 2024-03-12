import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Provider from "./Provider";

function EmpSectionH() {
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Provider Registration Certificate issued by Relevent Authority
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Provider />
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default EmpSectionH;
