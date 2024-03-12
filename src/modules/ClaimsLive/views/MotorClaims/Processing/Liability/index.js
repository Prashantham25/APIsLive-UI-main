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
import TotalLoss from "./TotalLoss";
import CashLoss from "./CashLoss";
import RepairLoss from "./RepairLoss";

function RenderSection({ section }) {
  return (
    <div>
      {(() => {
        switch (section) {
          case "TotalLoss":
            return <TotalLoss />;
          case "CashLoss":
            return <CashLoss />;
          case "RepairLoss":
            return <RepairLoss />;
          default:
            return <div>default</div>;
        }
      })()}
    </div>
  );
}

function Liability() {
  const [rvalue, setRvalue] = useState("RepairLoss");
  const handleRadio = (e) => {
    setRvalue(e.target.value);
    console.log("radio", rvalue);
  };
  return (
    <MDBox>
      <AccordionSummary sx={{ borderBottom: 1, borderColor: "primary.main" }}>
        <MDTypography color="primary">Type of Loss</MDTypography>
      </AccordionSummary>
      <MDBox>
        <AccordionDetails>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <RadioGroup row onChange={handleRadio} value={rvalue}>
              <FormControlLabel value="RepairLoss" control={<Radio />} label="Repair Loss" />
              <FormControlLabel value="CashLoss" control={<Radio />} label="Cash Loss" />
              <FormControlLabel value="TotalLoss" control={<Radio />} label="Total Loss" />
            </RadioGroup>
          </Stack>
        </AccordionDetails>
        <RenderSection section={rvalue} />
      </MDBox>
    </MDBox>
  );
}
export default Liability;
