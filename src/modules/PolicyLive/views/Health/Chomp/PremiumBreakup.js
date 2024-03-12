import React from "react";
import { Grid, Stack, Container, CircularProgress, Backdrop } from "@mui/material";
// import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography/";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import MDButton from "../../../../../components/MDButton";

function PremiumBreakup({ ratingData, qFlag, PolicyIssueDto }) {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  return (
    <div>
      <Grid alignContent="center">
        <MDTypography color="primary" sx={{ fontWeight: "bold" }} ml={60} mt={5}>
          Policy Summary
        </MDTypography>
      </Grid>
      <MDBox
        p={0}
        height="400px"
        width="600px"
        sx={{ backgroundColor: "rgba(217, 217, 217, 0.2)" }}
        ml={35}
        mb={3}
        mt={2}
      >
        <Container>
          <Stack spacing={0.2} ml={10} mr={-15}>
            <br />
            {PolicyIssueDto.Amount === "" ? (
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
                    <MDTypography sx={{ color: "#000000", ml: 1 }}>Sum Insured</MDTypography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right", ml: 1 }}>
                      {" "}
                      {formatter.format(ratingData.MemberSumInsuredDetails[0].SumInsured)}
                    </MDTypography>{" "}
                  </Grid>{" "}
                </Grid>
                {/* <Grid container spacing={2}>
                  <Grid item xs={8} sm={8} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Sum Insured</MDTypography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={3} lg={3} xl={3} xxl={3}>
                    {/* <MDTypography sx={{ color: "#000000", textAlign: "right" }}>₹ 67,027</MDTypography> */}
                {/* <MDTypography sx={{ color: "#000000", textAlign: "right" }}> */}
                {/* {ratingData.TotalDiscount} */}
                {/* {formatter.format(ratingData.MemberSumInsuredDetails[0].SumInsured)} */}
                {/* {PolicyDto.PlanSumInsured} */}
                {/* </MDTypography> */}
                {/* </Grid> */}
                {/* </Grid> */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Basic Premium</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.GrossPremium} */}
                      {formatter.format(ratingData.GrossPremium)}
                    </MDTypography>
                  </Grid>
                </Grid>
                {/* <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Discount/Loading</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.CGST} */}
                {/* % {ratingData.TotalDiscount} */}
                {/* </MDTypography> */}
                {/* </Grid> */}
                {/* </Grid> */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>TAX(18%)</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.IGST} */}
                      {formatter.format(ratingData.IGST)}
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000" }}>Gross Premium</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
                      {/* {ratingData.SGST} */}
                      {formatter.format(ratingData.TotalPremium)}
                    </MDTypography>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
                      Total Premium
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                      {formatter.format(ratingData.TotalPremium)}
                    </MDTypography>
                  </Grid>
                </Grid>

                {/* <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
                      Total Premium
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                      {/* {ratingData.TotalPremium} */}
                {/* {formatter.format(ratingData.TotalPremium)} */}
                {/* </MDTypography> */}
                {/* </Grid> */}
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Payment1 handleNext={handleNext} handlePaymentChange={handlePaymentChange} />
                  </Grid> */}
                {/* </Grid> */}
              </>
            )}
            {/* <Grid container spacing={3}>
            <>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Stack direction="row" spacing={2}>
                  <FormLabel sx={{ color: "#000000" }}>E-mail Quote</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Stack direction="row" spacing={2}>
                  <FormLabel sx={{ color: "#000000" }}>SMS/WhatsApp Quote</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      value="Yes"
                      control={
                        <Radio
                          sx={{
                            color: pink[200],
                          }}
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Stack>
              </Grid>
            </>
          </Grid> */}
          </Stack>
        </Container>
      </MDBox>
    </div>
  );
}

export default PremiumBreakup;
