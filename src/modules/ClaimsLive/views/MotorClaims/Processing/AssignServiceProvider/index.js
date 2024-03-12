import { useLocation } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import AssignSurveyor from "./AssignSurveyor";
import AssignWorkshop from "./AssignWorkshop";
import AssignOtherServiceProvider from "./AssignOtherServiceProvider";
import ReferInvestigation from "./ReferInvestigation";
import { UpdateWorkflowStatus } from "../../../../../Login/data/index";
import MDButton from "../../../../../../components/MDButton";

function AssignserviceProvider() {
  const Location = useLocation();
  const dataObj = {};
  const action = 197;
  const handleSubmit = async () => {
    const data = await UpdateWorkflowStatus(Location.state.value, action, dataObj);
    console.log(data);
  };
  const AccordionItems = [
    {
      label: "Assign Surveyor",
      content: <AssignSurveyor />,
      value: 1,
      visible: true,
    },
    {
      label: "Assign Workshop",
      content: <AssignWorkshop />,
      value: 1,
      visible: true,
    },
    {
      label: "Refer for Investigation",
      content: <ReferInvestigation />,
      value: 1,
      visible: true,
    },
    {
      label: "Assign Other Service Provider",
      content: <AssignOtherServiceProvider />,
      value: 1,
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
      <MDButton onClick={handleSubmit}>Submit</MDButton>
    </MDBox>
  );
}

export default AssignserviceProvider;
