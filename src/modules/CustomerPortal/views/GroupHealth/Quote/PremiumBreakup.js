import React from "react";
import { Grid, Stack, Container, CircularProgress, Backdrop } from "@mui/material";
// import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography/";

function PremiumBreakup({ PolicyDto, premiumData, qFlag }) {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  return (
    <div>
      <Grid alignContent="center">
        <MDTypography color="primary" sx={{ fontWeight: "bold" }} ml={55} mt={5}>
          Premium Summary
        </MDTypography>
      </Grid>
      <MDBox
        p={0}
        height="400px"
        width="600px"
        sx={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
        ml={30}
        mb={3}
        mt={2}
      >
        <Container>
          <Stack spacing={0.2} ml={10} mr={-15}>
            <br />
            {PolicyDto.PremiumDetail.TotalPremium === "" ? (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={qFlag}
              >
                <CircularProgress />
              </Backdrop>
            ) : (
              <>
                {/* <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>Details</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                      Premium
                    </MDTypography>
                  </Grid>
                </Grid> */}
                {/* <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
                    <MDTypography sx={{ color: "#000000" }}>Net premium</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
                   
                    {ratingData.BasicPremium}
                  </Grid>
                </Grid> */}
                <Grid container spacing={2}>
                  <Grid item xs={8} sm={8} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Base premium</MDTypography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={3} lg={3} xl={3} xxl={3}>
                    {/* <MDTypography sx={{ color: "#000000", textAlign: "right" }}>₹ 67,027</MDTypography> */}
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.TotalDiscount} */}
                      {formatter.format(PolicyDto.PremiumDetail.BasicPremium)}
                      {/* {PolicyDto.PlanSumInsured} */}
                    </MDTypography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Age Loading</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.GrossPremium} */}
                      {formatter.format(premiumData.ageLoading)}
                    </MDTypography>
                  </Grid>
                </Grid>
                {/* <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography sx={{ color: "#000000" }}>Premium with Loading</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                  </MDTypography>
                </Grid>
              </Grid> */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Family Discount</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.SGST} */}
                      {formatter.format(PolicyDto.PremiumDetail.Discount)}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Kerala Cess</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.IGST} */}
                      {formatter.format(premiumData.keralaCess)}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>GST</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                      {/* {ratingData.TotalPremium} */}
                      {formatter.format(PolicyDto.PremiumDetail.TaxAmount)}
                    </MDTypography>
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Payment1 handleNext={handleNext} handlePaymentChange={handlePaymentChange} />
                    </Grid> */}
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
                      Final Premium
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                      {/* {ratingData.TotalPremium} */}
                      {formatter.format(PolicyDto.PremiumDetail.TotalPremium)}
                    </MDTypography>
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Payment1 handleNext={handleNext} handlePaymentChange={handlePaymentChange} />
                    </Grid> */}
                </Grid>
              </>
            )}
          </Stack>
        </Container>
      </MDBox>
    </div>
  );
}

export default PremiumBreakup;
