import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import ClaimHealthMatrix from "./ClaimHealthMatrix";
import ClaimFinancials from "./ClaimFinancials";
import ClaimHistoryContent from "./ClaimHistoryContent";

function ClaimSummary() {
  const AccordionItems = [
    {
      label: "Claim Health Matrix ",
      content: <ClaimHealthMatrix />,
      value: 1,
      visible: true,
    },
    {
      label: "Claim Financials ",
      content: <ClaimFinancials />,
      value: 2,
      visible: true,
    },
    {
      label: "Claim History ",
      content: <ClaimHistoryContent />,
      value: 3,
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

export default ClaimSummary;
