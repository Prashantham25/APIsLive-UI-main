import React from "react";
import { Grid, Stack, Container } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PremiumBreakup({ ratingData }) {
  console.log("ratingData123", ratingData);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  return (
    <MDBox p={3} sx={{ backgroundColor: "#b0e0e6" }}>
      <Container>
        <Stack spacing={0.1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>Details</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                Premium
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000" }}>Basic premium</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.BasicPremium)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000" }}>Discount</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.Discount)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000" }}>Gross Premium</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.GrossPremium)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000" }}>Tax Amount</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.TaxAmount)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000" }}>CGST</MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.TaxDetails[0].Amount)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000" }}>SGST</MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.TaxDetails[1].Amount)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000" }}>IGST</MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.TaxDetails[2].Amount)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
              <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
                Total Premium
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                {formatter.format(ratingData.premiumDetail.TotalPremium)}
              </MDTypography>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </MDBox>
  );
}

export default PremiumBreakup;
