import {
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useState } from "react";
//   import MDButton from "../../../../../../components/MDButton";
//   import { Grid } from "@mui/material";
import DeliveryOrder from "./DeliveryOrder";
import WorkOrder from "./WorkOrder";

function RenderSection({ section }) {
  return (
    <div>
      {(() => {
        switch (section) {
          case "DeliveryOrder":
            return <DeliveryOrder />;
          case "WorkOrder":
            return <WorkOrder />;
          default:
            return "";
        }
      })()}
    </div>
  );
}

function WorkDeliveryOder() {
  const [rvalue, setRvalue] = useState("k");
  const handleRadio = (e) => {
    setRvalue(e.target.value);
    console.log("radio", rvalue);
  };
  return (
    <MDBox>
      <AccordionSummary sx={{ borderBottom: 1, borderColor: "primary.main" }}>
        <MDTypography color="primary">Work Order/Delivery Order</MDTypography>
      </AccordionSummary>
      <MDBox>
        <AccordionDetails>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <RadioGroup row onChange={handleRadio} value={rvalue}>
              <FormControlLabel value="DeliveryOrder" control={<Radio />} label="Delivery Order" />
              <FormControlLabel value="WorkOrder" control={<Radio />} label="Work Order" />
            </RadioGroup>
          </Stack>
        </AccordionDetails>
        <RenderSection section={rvalue} />
      </MDBox>
    </MDBox>
  );
}
export default WorkDeliveryOder;
