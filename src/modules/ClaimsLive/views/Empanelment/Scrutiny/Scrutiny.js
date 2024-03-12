import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ApplicationScrutiny from "./ApplicationScrutiny";

function EmpApplicationScrutiny() {
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Application Scrutiny
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <ApplicationScrutiny />
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default EmpApplicationScrutiny;
