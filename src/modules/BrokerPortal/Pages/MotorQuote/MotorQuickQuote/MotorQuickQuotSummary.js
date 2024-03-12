import { Card, Grid, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function MotorQuickQuoteSummary({ dto, onProceed2, onEdit }) {
  return (
    <Card sx={{ borderRadius: 0, background: "rgba(144, 202, 249, 0.2)", px: "2rem" }}>
      <Grid container spacing={3} p={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" justifyContent="space-between">
            <MDTypography variant="h5">
              Please check your vehicle details and proceed for plans
            </MDTypography>
            <MDButton variant="outlined" onClick={onEdit}>
              Edit
            </MDButton>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ color: "#CA0000" }}>
            Vehicle Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Vehicle Type</MDTypography>
          <MDTypography variant="body1">{dto.Vehicle}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Vehicle Category</MDTypography>
          <MDTypography variant="body1">{dto.VehicleCatogery}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Vehicle Subclass</MDTypography>
          <MDTypography variant="body1">{dto.CarrierType}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Brand</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.Make}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Model</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.Model}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Variant</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.Variant}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Seating capacity</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.SeatingCapacity}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Fuel Type</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.FuelType}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6"> Manufacturing year</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.YearOfManufacture}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6"> Registration Date</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.RegistrationDate}</MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Cubic Capacity (cc)</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.CubicCapacity}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">City &amp; RTO (cc)</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.RTO}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Registration Number</MDTypography>
          <MDTypography variant="body1">{dto.VehicleDetails.RegistrationNumber}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ color: "#CA0000" }}>
            Previous Insurance Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6"> Company Name</MDTypography>
          <MDTypography variant="body1">
            {dto.PreviousPolicyDetails.PreviousPolicyInsurerName}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6"> Policy Number</MDTypography>
          <MDTypography variant="body1">
            {dto.PreviousPolicyDetails.previousPolicyNumber}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Policy Type</MDTypography>
          <MDTypography variant="body1">
            {dto.PreviousPolicyDetails.previousPolicyTypeValue}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Expiry Date</MDTypography>
          <MDTypography variant="body1">
            {dto.PreviousPolicyDetails.previousPolicyExpiryDate}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <MDButton onClick={onProceed2}>Proceed</MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

export default MotorQuickQuoteSummary;
