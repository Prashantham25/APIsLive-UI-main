import React from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";
import { Divider, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import MDAvatar from "../../../../../components/MDAvatar";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

function PaymentDetails() {
  return (
    <PageLayout>
      <BPNavbar />

      <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 5, mt: 10 }}>
        <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
          <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem", m: 4, mt: 6 }}>
            <Grid container spacing={2} textAlign="center" mt={1} ml={5}>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDBox sx={{ background: "white", align: "center" }}>
                  <MDBox ml={0}>
                    <CheckCircleIcon sx={{ fontSize: "70px !important", color: "success" }} />
                    <MDTypography variant="h6" color="success" sx={{ fontSize: "2rem" }}>
                      Payment Successful
                    </MDTypography>
                    <MDTypography variant="body" sx={{ fontSize: "1rem", mt: 2 }}>
                      Transaction No: 1498562156
                    </MDTypography>
                    <MDBox sx={{ mt: 7, mb: 7 }}>
                      <Divider />
                    </MDBox>
                    <Grid container spacing={3} mt={4}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          Amount Paid &nbsp;&nbsp;:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem" }}>₹ 14,337</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mb={7}>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          Payment Mode &nbsp;&nbsp;:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem" }}>Net banking</MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={3}>
                <MDTypography variant="h6" sx={{ fontSize: "2rem", textAlign: "start", ml: 19 }}>
                  Here is your Policy
                </MDTypography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={3}>
                    <MDAvatar src={CareLogo} size="xl" variant="square" sx={{ ml: 12 }} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={3}>
                    <MDTypography
                      variant="body1"
                      textAlign="right"
                      sx={{ fontSize: "1rem", color: "black" }}
                    >
                      Care Health Insurance(formerly Religare)
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                    <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "black" }}>
                      Plan Name
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "black" }}
                    >
                      Care Classic
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                    <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "black" }}>
                      Policy Numbers
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "black" }}
                    >
                      PB4453PG008320331
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                    <MDButton variant="outlined">Email</MDButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                    <MDButton sx={{ mr: -15 }}>Download Policy</MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </MDBox>
    </PageLayout>
  );
}
export default PaymentDetails;
