import React from "react";
import { Grid, Container, Card } from "@mui/material";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";

function PremiumBreakup({ FinalPremiumData }) {
  return (
    // <MDBox pt={3} height="60rem" sx={{ backgroundColor: "#b0e0e6" }}>
    //   <Container>
    //     <Stack spacing={0.1}>
    //       <br />
    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>Details</MDTypography>
    //         </Grid>

    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
    //             Premium
    //           </MDTypography>
    //         </Grid>
    //       </Grid>

    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000" }}>Base Premium</MDTypography>
    //         </Grid>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
    //             {FinalPremiumData === "" ? "" : FinalPremiumData.BasicPremium}
    //           </MDTypography>
    //         </Grid>
    //       </Grid>

    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000" }}>Discount/Loading (%) </MDTypography>
    //         </Grid>

    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
    //             {FinalPremiumData === "" ? "" : FinalPremiumData.Discount}
    //           </MDTypography>
    //         </Grid>
    //       </Grid>

    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000" }}>Gross premium</MDTypography>
    //         </Grid>

    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
    //             {FinalPremiumData === "" ? "" : FinalPremiumData.GrossPremium}
    //           </MDTypography>
    //         </Grid>
    //       </Grid>

    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000" }}>CGST</MDTypography>
    //         </Grid>

    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
    //             {FinalPremiumData === "" ? "" : FinalPremiumData.TaxDetails[0].Amount}
    //           </MDTypography>
    //         </Grid>
    //       </Grid>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000" }}>SGST</MDTypography>
    //         </Grid>

    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
    //             {FinalPremiumData === "" ? "" : FinalPremiumData.TaxDetails[1].Amount}
    //           </MDTypography>
    //         </Grid>
    //       </Grid>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000" }}>IGST</MDTypography>
    //         </Grid>

    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", textAlign: "right" }}>
    //             {FinalPremiumData === "" ? "" : FinalPremiumData.TaxDetails[2].Amount}
    //           </MDTypography>
    //         </Grid>
    //       </Grid>

    //       <Grid container spacing={3}>
    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
    //           <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
    //             Total Premium including all Tax
    //           </MDTypography>
    //         </Grid>

    //         <Grid item xs={12} sm={12} md={4} lg={4} xl={2} xxl={2}>
    //           <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
    //             {FinalPremiumData === "" ? "" : FinalPremiumData.TotalPremium}
    //           </MDTypography>
    //         </Grid>
    //       </Grid>
    //     </Stack>
    //   </Container>
    // </MDBox>

    <Card>
      <MDBox m={4}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                  Payment Details
                </MDTypography>
              </Grid>
            </Grid>

            <Grid item md={5} lg={5} xl={5} xxl={5} mt={4}>
              <MDBox>
                <Card sx={{ background: "#e6e6e6" }}>
                  <Grid container spacing={2} p={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Basic Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {FinalPremiumData === "" ? "" : FinalPremiumData.BasicPremium}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Discount
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {FinalPremiumData === "" ? "" : FinalPremiumData.Discount}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Gross Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {FinalPremiumData === "" ? "" : FinalPremiumData.GrossPremium}
                      </MDTypography>
                    </Grid>

                    <>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          IGST
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {FinalPremiumData === "" ? "" : FinalPremiumData.TaxDetails[2].Amount}
                        </MDTypography>
                      </Grid>
                    </>

                    <>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          CGST
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {FinalPremiumData === "" ? "" : FinalPremiumData.TaxDetails[0].Amount}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          SGST
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {FinalPremiumData === "" ? "" : FinalPremiumData.TaxDetails[1].Amount}
                        </MDTypography>
                      </Grid>
                    </>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                        Total Premium including all Tax
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {FinalPremiumData === "" ? "" : FinalPremiumData.TotalPremium}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </Container>
      </MDBox>
    </Card>
  );
}

export default PremiumBreakup;
