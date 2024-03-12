import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Decision from "./Decision";
import { UpdateWorkflowStatus, GetAction } from "../../../../../Login/data/index";
import MDInput from "../../../../../../components/MDInput";
import MDButton from "../../../../../../components/MDButton";

function ClaimSettlement() {
  const [actionData, setActionData] = useState([]);
  const [action, setAction] = useState("");
  const Location = useLocation();
  const dataObj = {};
  useEffect(async () => {
    const data1 = await GetAction(Location.state.value2);
    console.log(data1);
    if (data1.status === 200) {
      setActionData(data1.data);
    }
  }, []);
  useEffect(() => {
    console.log("action", actionData);
  }, [actionData]);
  const handleAction = (e, value) => {
    setAction(value.actionId);
    console.log(action);
  };
  const handleSubmit = async () => {
    const data = await UpdateWorkflowStatus(Location.state.value, action, dataObj);
    console.log(data);
  };
  const AccordionItems = [
    {
      label: "Decision",
      content: <Decision />,
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
      <Autocomplete
        id="action"
        options={actionData}
        getOptionLabel={(option) => option.actionName}
        renderInput={(param) => <MDInput {...param} label="Action" />}
        onChange={(e, value) => handleAction(e, value)}
      />
      <MDButton onClick={handleSubmit}>Submit</MDButton>
    </MDBox>
  );
}

export default ClaimSettlement;
