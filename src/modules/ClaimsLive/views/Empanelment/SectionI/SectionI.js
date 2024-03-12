import React from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SelfDeclaration from "./SelfDeclaration";

function EmpSectionI() {
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Self Declaration
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <SelfDeclaration />
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default EmpSectionI;
