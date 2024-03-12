import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";

function PolicySummary() {
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", mt: 3, background: "#CEEBFF" }}
      fullwidth
    >
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
                  sx={{ my: "2rem", fontSize: "1rem", textAlign: "center", widht: "100%" }}
                >
                  {" "}
                </MDTypography>
                <Grid container spacing={3} ml={5} mt={2} pb={10}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                      Amount Paid &nbsp;&nbsp; :
                    </MDTypography>
                    <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                      Payment Mode &nbsp;&nbsp;:
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={4} sx={{ mt: "2rem" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" sx={{ fontSize: "1.8rem", color: "#000000" }}>
                Thank You !
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                Policy Number :
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                Customer Name :
              </MDTypography>
            </Grid>

            <Grid item md={3}>
              <MDButton
                display="flex"
                sx={{
                  maxHeight: "1.5rem",

                  fontSize: "0.5rem",
                  width: "8rem",
                  mr: "0rem",
                  borderRadius: "0rem",
                }}
              >
                Download Proposal
              </MDButton>
            </Grid>
            <Grid item md={3}>
              <MDButton
                display="flex"
                sx={{
                  maxHeight: "1.5rem",
                  width: "8rem",
                  fontSize: "0.5rem",
                  ml: "2rem",
                  borderRadius: "0rem",
                }}
              >
                Download Policy
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PolicySummary;
