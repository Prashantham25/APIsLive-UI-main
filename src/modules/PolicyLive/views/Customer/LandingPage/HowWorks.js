import { Grid } from "@mui/material";

import WorkImg1 from "assets/images/BrokerPortal/Work1.png";
import WorkImg2 from "assets/images/BrokerPortal/Work2.png";
import WorkImg3 from "assets/images/BrokerPortal/Work3.png";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";

export default function HowWorks() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h2" textAlign="center">
          How it works?
        </MDTypography>
      </Grid>
      {[WorkImg1, WorkImg2, WorkImg3].map((x) => (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDBox component="img" src={x} />
          </MDBox>
        </Grid>
      ))}
      {[WorkImg1, WorkImg2, WorkImg3].map(() => (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h5">Fill in Your Details</MDTypography>
          <MDTypography>
            Fill in your details and get insurance policy premium quotes from top-rated insurers
            instantly.
          </MDTypography>
        </Grid>
      ))}
    </Grid>
  );
}
