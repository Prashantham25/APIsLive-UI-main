import { useState, useEffect } from "react";
import { Paper, Grid, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import CarFrame from "assets/images/BrokerPortal/Summary.png";
import BikeFrame from "assets/images/BrokerPortal/BikeQuote.png";
import PCVFrame from "assets/images/BrokerPortal/PCV/Frame.png";
import GCVFrame from "assets/images/BrokerPortal/GCV/Frame.png";

function Summary({ handleNext, policyDto, setPolicyDto, setLoader }) {
  const lPolicyDto = policyDto;
  const [imgSrc, setImgSrc] = useState("");
  const onProceed = async () => {
    // const id = policyDto.InsurableItem[0].RiskItems[0].VariantId;

    // lPolicyDto.InsurableItem[0].RiskItems[0].MakeId = id;
    // lPolicyDto.InsurableItem[0].RiskItems[0].MakeValue = id;
    // lPolicyDto.InsurableItem[0].RiskItems[0].ModelId = id;
    // lPolicyDto.InsurableItem[0].RiskItems[0].ModelValue = id;

    setPolicyDto({ ...lPolicyDto });
    handleNext();
  };
  useEffect(() => {
    setLoader(true);
    if (policyDto.VehicleTypeValue === "PvtCar") setImgSrc(CarFrame);
    if (policyDto.VehicleTypeValue === "TW") setImgSrc(BikeFrame);
    if (policyDto.VehicleTypeValue === "PCV") setImgSrc(PCVFrame);
    if (policyDto.VehicleTypeValue === "GCV") setImgSrc(GCVFrame);
    setLoader(false);
  }, []);

  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDBox component="img" src={imgSrc} width="100%" height="100%" />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
        <Paper elevation={24} sx={{ borderRadius: 0, background: "#eeeeee" }}>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" justifyContent="space-between">
                <MDTypography variant="h5">
                  Please check your vehicle details and proceed for plans
                </MDTypography>
                {/* <MDButton variant="outlined" onClick={onEdit}>
              Edit
            </MDButton> */}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5" sx={{ color: "#CA0000" }}>
                Vehicle Details
              </MDTypography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Vehicle Type</MDTypography>
          <MDTypography variant="body1">{policyDto.Vehicle}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Vehicle Category</MDTypography>
          <MDTypography variant="body1">{policyDto.VehicleCatogery}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Vehicle Subclass</MDTypography>
          <MDTypography variant="body1">{policyDto.CarrierType}</MDTypography>
        </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6">Brand</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].Make}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6">Model</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].Model}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6">Variant</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].Variant}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6">Seating capacity</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].SeatingCapacity}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6">Fuel Type</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].FuelType}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6"> Manufacturing year</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].YearOfManufacture}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6"> Registration Date</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].RegistrationDate}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6">Cubic Capacity (cc)</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].CubicCapacity}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6">City &amp; RTO (cc)</MDTypography>
              <MDTypography variant="body1">
                {policyDto.InsurableItem[0].RiskItems[0].RTOValue}
              </MDTypography>
            </Grid>
            {/*  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Registration Number</MDTypography>
          <MDTypography variant="body1">{policyDto.InsurableItem[0].RiskItems[0].RegistrationNumber}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ color: "#CA0000" }}>
            Previous Insurance Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6"> Company Name</MDTypography>
          <MDTypography variant="body1">
            {policyDto.PreviousPolicyDetails.PreviousPolicyInsurerName}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6"> Policy Number</MDTypography>
          <MDTypography variant="body1">
            {policyDto.PreviousPolicyDetails.previousPolicyNumber}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Policy Type</MDTypography>
          <MDTypography variant="body1">
            {policyDto.PreviousPolicyDetails.previousPolicyTypeValue}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography variant="h6">Expiry Date</MDTypography>
          <MDTypography variant="body1">
            {policyDto.PreviousPolicyDetails.previousPolicyExpiryDate}
          </MDTypography>
        </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                <MDButton onClick={onProceed} variant="outlined">
                  Proceed
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Summary;
