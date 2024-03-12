import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Icon from "@mui/material/Icon";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SBI from "assets/images/BrokerPortal/Travel/SBIGeneral.png";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import MDAvatar from "../../../../../components/MDAvatar";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import BPNavbar from "../../../Layouts/BPNavbar";
import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";

function paymentDetails() {
  return (
    <MDBox>
      <PageLayout>
        <BPNavbar />
        <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 5, mt: 10 }}>
          <Card sx={{ borderRadius: "0", mt: 3 }}>
            <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem", m: 4, mt: 6 }}>
              <Grid container spacing={2} mt={1} ml={5}>
                {/* <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  <MDBox sx={{ background: "white" }}>
                    <MDBox sx={{ textAlign: "center" }}>
                      <CheckCircleIcon sx={{ fontSize: "70px !important", color: "#00CA72" }} />
                      <MDTypography variant="h6" color="success" sx={{ fontSize: "2rem" }}>
                        Payment Successful
                      </MDTypography>
                      <MDTypography variant="body" sx={{ fontSize: "1rem", mt: 2 }}>
                        Transaction No&nbsp;&nbsp;: 1498562156
                      </MDTypography>
                    </MDBox>
                    <Divider sx={{ color: "#000000" }} />
                    <Grid container spacing={3} ml={5} mt={2} pb={10}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          Amount Paid &nbsp;&nbsp;:
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          Payment Mode &nbsp;&nbsp;:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem" }}>₹ 14,337</MDTypography>
                        <MDTypography sx={{ fontSize: "1rem" }}>Net banking</MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Grid> */}
                <Grid container>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Grid container justifyContent="center">
                      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                        <MDBox
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          xl={6}
                          xxl={6}
                          sx={{
                            m: "2rem",
                            display: "flex",
                            backgroundImage: `url(${PaySuccess})`,
                            backgroundSize: "cover",
                            flexDirection: "column",
                            backgroundPosition: "center",
                            textAlign: "center",
                            alignItems: "center",
                            minHeight: "20rem",
                          }}
                        >
                          <MDButton
                            size="large"
                            variant="outlined"
                            color="white"
                            iconOnly
                            circular
                            sx={{ mt: "1.5rem", background: "#00CA72" }}
                          >
                            <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                          </MDButton>
                          <MDTypography
                            variant="h6"
                            sx={{
                              mt: "2rem",
                              fontSize: "1.25rem",
                              textAlign: "center",
                              widht: "100%",
                              color: "#00CA72",
                            }}
                          >
                            {" "}
                            Payment Successful
                          </MDTypography>
                          <MDTypography
                            variant="h6"
                            sx={{
                              my: "2rem",
                              fontSize: "1rem",
                              textAlign: "center",
                              widht: "100%",
                            }}
                          >
                            {" "}
                          </MDTypography>
                          <Grid container spacing={1} ml={5} mt={2} pb={10}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                              <MDTypography sx={{ fontSize: "1rem" }}>
                                Amount Paid &nbsp;&nbsp;:
                              </MDTypography>
                              <MDTypography sx={{ fontSize: "1rem" }}>
                                Payment Mode &nbsp;&nbsp;:
                              </MDTypography>
                            </Grid>
                            <Grid item md={6} lg={6} xl={6} xxl={6}>
                              <MDTypography sx={{ fontSize: "1rem", textAlign: "left" }}>
                                ₹ 14,337
                              </MDTypography>
                              <MDTypography sx={{ fontSize: "1rem" }}>Net banking</MDTypography>
                            </Grid>
                          </Grid>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDBox>
                      <Grid container ml={3} spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDTypography variant="h6" sx={{ fontSize: "1.8rem", color: "#000000" }}>
                            Here is your Policies
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDAvatar
                            src={SBI}
                            size="xxl"
                            variant="square"
                            sx={{ width: 200, height: 60 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDTypography
                            variant="h6"
                            sx={{
                              fontSize: "1.5 rem",
                              color: "#000000",
                              textDecoration: "underline",
                            }}
                            display="inline"
                          >
                            Policy Numbers
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            Nanda Reddy
                          </MDTypography>
                        </Grid>{" "}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            PB4453PG008320331
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            Mahesh Reddy
                          </MDTypography>
                        </Grid>{" "}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            PB4453PG008320331
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            Manasa Makena
                          </MDTypography>
                        </Grid>{" "}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            PB4453PG008320331
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            Mani Sharma
                          </MDTypography>
                        </Grid>{" "}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                            PB4453PG008320331
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDButton
                            variant="outlined"
                            startIcon={<MailOutlineIcon fontSize="large" />}
                          >
                            Email
                          </MDButton>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={2}>
                          <MDButton sx={{ mr: -15 }}>Download Policy</MDButton>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
      </PageLayout>
    </MDBox>
  );
}
export default paymentDetails;
