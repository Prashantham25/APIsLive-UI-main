import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Repair from "./Repair";
import InvoiceDetails from "./InvoiceDetails";
// import HospitalCashcover from "./HospitalCashcover";
// import Ambulancecover from "./Ambulancecover";
// import MedicalExpenses from "./MedicalExpenses";
// import OutstandingLoan from "./OutstandingLoan";
import Assessment from "./AssessmentSheet";

function RepairLoss() {
  const AccordionItems = [
    {
      label: "Vehicle Damage Assessment",
      content: <Repair />,
      value: 1,
      visible: true,
    },
    {
      label: "Assessment Sheet",
      content: <Assessment />,
      value: 2,
      visible: true,
    },
    {
      label: "Summarized Reports",
      content: <InvoiceDetails />,
      value: 3,
      visible: true,
    },
    // {
    //   label: "Hospital Cash Cover",
    //   content: <HospitalCashcover />,
    //   value: 3,
    //   visible: true,
    // },
    // {
    //   label: "Ambulance Charges",
    //   content: <Ambulancecover />,
    //   value: 4,
    //   visible: true,
    // },
    // {
    //   label: "Medical expenses reimbursement",
    //   content: <MedicalExpenses />,
    //   value: 5,
    //   visible: true,
    // },
    // {
    //   label: "Outstanding loan cover",
    //   content: <OutstandingLoan />,
    //   value: 6,
    //   visible: true,
    // },
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
export default RepairLoss;
