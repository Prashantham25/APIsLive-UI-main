import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import BreExectutionResult from "./BreExecutionResult";
import BreTrggerLog from "./BreTriggerLog";
import RandomAudit from "./RandomAudit";

function ViewValidation() {
  const AccordionItems = [
    {
      label: "BRE Execution Result",
      content: <BreExectutionResult />,
      value: 1,
      visible: true,
    },
    {
      label: "BRE Trigger Details",
      content: <BreTrggerLog />,
      value: 2,
      visible: true,
    },
    {
      label: "Random Audit",
      content: <RandomAudit />,
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
export default ViewValidation;
