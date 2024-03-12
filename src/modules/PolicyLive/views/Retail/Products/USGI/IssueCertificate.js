import { Grid, Stack } from "@mui/material";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";

export default function IssueCertificate({ dto }) {
  return (
    <MDBox>
      <Grid container spacing={4}>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}></Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Certificate Issued Successfully</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          COI No. :
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          Insured Name
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          {dto.PolicyNo}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          {dto.InsurableItem[0].RiskItems[0].Name}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row">
            <MDButton color="error" variant="outlined">
              Email COI
            </MDButton>
            <MDButton color="success">Download COI</MDButton>
            <MDButton color="error">Go To Home</MDButton>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
  );
}
