import { Grid, Icon } from "@mui/material";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

function Summary({ handleNext, handleBack }) {
  const OnNext = () => {
    handleNext();
  };
  const OnBack = () => {
    handleBack();
  };
  return (
    <MDBox sx={{ bgcolor: "#bbdefb" }} p={3}>
      <Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ mt: "3rem", fontSize: "1.5rem" }}>
            Please check the details and proceed for plans
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
            Basic Details
          </MDTypography>
          <Icon sx={{ cursor: "pointer" }}>edit</Icon>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
            Location Details(Pincode)
          </MDTypography>
          <Icon sx={{ cursor: "pointer" }}>edit</Icon>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
            Medical Details
          </MDTypography>
          <Icon sx={{ cursor: "pointer" }}>edit</Icon>
        </Grid>
      </Grid>
      <MDBox sx={{ mt: "2rem" }}>
        <Grid container justifyContent="space-between">
          <MDButton onClick={OnBack} variant="outlined" color="info">
            Back
          </MDButton>
          <MDButton
            onClick={OnNext}
            variant="contained"
            color="info"
            // disabled={LPolicyDto.InsurableItem[0].RiskItems.length === 0}
          >
            Proceed
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
export default Summary;
