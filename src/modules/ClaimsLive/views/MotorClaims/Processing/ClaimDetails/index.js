import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Status from "./Status";
import ClaimDetailsSection from "./ClaimDetails";
import DriverDetails from "./DriverDetails";
import AdditionalDetails from "./AdditionalDetails";
import Underwriting from "./Underwriting";
import Referral from "./Refer";

function ClaimDetails() {
  const AccordionItems = [
    {
      label: "Status",
      content: <Status />,
      value: 1,
      visible: true,
    },
    {
      label: "Claim Details",
      content: <ClaimDetailsSection />,
      value: 2,
      visible: true,
    },
    {
      label: "Driver Details",
      content: <DriverDetails />,
      value: 3,
      visible: true,
    },
    {
      label: "Additional Details",
      content: <AdditionalDetails />,
      value: 4,
      visible: true,
    },
    {
      label: "Underwriting",
      content: <Underwriting />,
      value: 5,
      visible: true,
    },
    {
      label: "Refer to Investigator",
      content: <Referral />,
      value: 6,
      visible: true,
    },
  ];
  return (
    <MDBox>
      {AccordionItems.map((item) =>
        item.visible ? (
          <Accordion
            {...(item.value === 1 ? { defaultExpanded: true } : { defaultExpanded: false })}
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ borderBottom: 1, borderColor: "primary.main" }}
            >
              <MDTypography color="primary">{item.label}</MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>{item.content}</AccordionDetails>
          </Accordion>
        ) : null
      )}
    </MDBox>
  );
}
export default ClaimDetails;
