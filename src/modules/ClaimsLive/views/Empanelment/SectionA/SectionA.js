// import { useState } from "react";
// import MDTabs from "modules/PolicyLive/components/Tabs";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ProviderDetails from "./ProviderDetails";
import InsDeskDetails from "./InsDeskDetails";
import MedOfficerDetails from "./MedOfficerDetails";
import ProviderRegistrationDetails from "./ProviderRegistrationDetails";
import AccrediDetails from "./AccrediDetails";
import OwnershipDetails from "./OwnershipDetails";

// function EmpSectionA() {
//   const [value, setValue] = useState(0);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const tabs = [
//     {
//       label: "Provider Details",
//       content: <ProviderDetails />,
//       value: 11,
//     },
//     {
//       label: "Insurance Desk Details",
//       content: <InsDeskDetails />,
//       value: 12,
//     },
//     {
//       label: "Medical Officer Details",
//       content: "Item 3",
//       value: 13,
//     },
//     {
//       label: "Registration Details",
//       content: "Item 4",
//       value: 14,
//     },
//     {
//       label: "Accreditation Details",
//       content: "Item 5",
//       value: 15,
//     },
//     {
//       label: "Ownership Details",
//       content: "Item 5",
//       value: 16,
//     },
//   ];

//   return <MDTabs tabsList={tabs} onChange={handleChange} value={value} />;
// }

function EmpSectionA() {
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Provider Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <ProviderDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Insurance Desk Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <InsDeskDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Medical Officer Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <MedOfficerDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Provider Registration Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <ProviderRegistrationDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Accreditation Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <AccrediDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Ownership And Administrative Head Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <OwnershipDetails />
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default EmpSectionA;
