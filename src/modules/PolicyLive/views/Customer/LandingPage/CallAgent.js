import { Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";

import CallAgentImg from "assets/images/BrokerPortal/CallAgent.png";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

export default function CallAgent() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h2">Call our Agent</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>
              Whether you just prefer a friendly voice or need more information, our licensed agents
              are ready to help you save.
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton startIcon={<PhoneIcon />} variant="outlined">
              +91 900 000 0000
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
        <MDBox component="img" src={CallAgentImg} width="95%" />
      </Grid>
    </Grid>
  );
}
