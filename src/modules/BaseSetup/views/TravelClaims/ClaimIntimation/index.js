import MDTypography from "components/MDTypography";

const { Card, Grid } = require("@mui/material");

function ClaimIntimation() {
  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Claim Intimation
          </MDTypography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ClaimIntimation;
