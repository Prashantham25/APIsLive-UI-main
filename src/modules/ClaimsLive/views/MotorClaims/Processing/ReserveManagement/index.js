import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import ReserveDetails from "./ReserveDetails";
import Reinsurance from "./Reinsurance";
import RiTransaction from "./RiTransaction";
import RemaningReserve from "./RemaningReserve";

function ReserveManagement() {
  const AccordionItems = [
    {
      label: "Reserve Details",
      content: <ReserveDetails />,
      value: 2,
      visible: true,
    },
    {
      label: "Reinsurance Financial Summary",
      content: <Reinsurance />,
      value: 3,
      visible: true,
    },
    {
      label: "RI Transaction Log",
      content: <RiTransaction />,
      value: 4,
      visible: true,
    },
  ];
  return (
    <MDBox sx={{ mt: 4 }}>
      <RemaningReserve />
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
export default ReserveManagement;
