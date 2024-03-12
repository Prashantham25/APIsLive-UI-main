import { Grid } from "@mui/material";
import PersonalizedImg from "assets/images/BrokerPortal/Personalized.png";

import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

export default function GetQuote() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDBox component="img" src={PersonalizedImg} width="100%" />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h2">Get personalized quotes in 5 minutes</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>
              Answer a few questions and we&apos;ll provide accurate real-time quotes.
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton variant="outlined">Get Quotes</MDButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
