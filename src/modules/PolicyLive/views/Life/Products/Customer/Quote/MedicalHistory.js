import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function MedicalHistory({ handleNext, handleBack }) {
  const OnNext = () => {
    handleNext();
  };
  const OnBack = () => {
    handleBack();
  };
  return (
    <MDBox>
      <MDTypography>Tell us your family Medical History</MDTypography>

      {/* <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ fontSize: "0.7rem" }}>
            Disclaimer: <span style={{ color: "#D90000" }}>You can add maximum of 4 children</span>
          </MDTypography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ fontSize: "0.7rem" }}>
            By clicking, I agree to *<span style={{ color: "#0071D9" }}>terms & conditions</span>{" "}
            and <span style={{ color: "#0071D9" }}>privacy policy.</span>
          </MDTypography>
        </Grid>
      </Grid> */}
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
export default MedicalHistory;
