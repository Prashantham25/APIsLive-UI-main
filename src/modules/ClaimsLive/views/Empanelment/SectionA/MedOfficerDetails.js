import { Grid } from "@mui/material";
import MDInput from "components/MDInput";

function MedOfficerDetails() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Name of the Cheif Medical Officer" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Qualification " />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Name of Medical Superintendent" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Qualification" />
      </Grid>
    </Grid>
  );
}

export default MedOfficerDetails;
