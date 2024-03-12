// import { Stack, Switch } from "@mui/material";
import MDTypography from "components/MDTypography";

const { default: MDBox } = require("components/MDBox");

function Addons() {
  // const addOnsList = [
  //   "Maternity Benefit",
  //   "Cover Pre-Existing Diseases",
  //   "Upgrade Room Rent Cappings",
  //   "Upgrade Pre/Post Hospitalization",
  // ];
  return (
    <MDBox pr={2}>
      <MDTypography variant="body1" color="primary">
        Recommended Add-ons
      </MDTypography>
      {/* {addOnsList.map((item) => (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <MDTypography variant="body2" fontWeight="regular" color="primary">
            {item}
          </MDTypography>
          <Switch color="primary" />
        </Stack>
      ))} */}
    </MDBox>
  );
}
export default Addons;
