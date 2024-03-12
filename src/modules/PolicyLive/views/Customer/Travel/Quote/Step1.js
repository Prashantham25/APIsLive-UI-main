import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { Grid } from "@mui/material";
import MDInput from "../../../../../../components/MDInput";
import TermsCondition from "../../data/components/TermsCondition";

function Step1({ handleNext }) {
  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography>Tell us your destination and how many members are traveling to</MDTypography>
      </Grid>
      <Grid item xs={6} md={6} lg={6} xl={6} xxl={6}>
        <MDInput variant="standard" label="Policy Type" />
      </Grid>
      <Grid item xs={6} md={6} lg={6} xl={6} xxl={6}>
        <MDInput variant="standard" label="No of Travelers" />
      </Grid>
      <Grid item xs={6} md={6} lg={6} xl={6} xxl={6}>
        <MDInput variant="standard" label="Geography" />
      </Grid>
      <Grid item xs={6} md={6} lg={6} xl={6} xxl={6}>
        <MDInput variant="standard" label="List Of Destination" />
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
        <TermsCondition />
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox sx={{ display: "flex", justifyContent: "right" }}>
          <MDButton onClick={handleNext} variant="contained">
            Proceed
          </MDButton>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default Step1;
