import { React } from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import CancelIcon from "@mui/icons-material/Cancel";

function PaymentFailure() {
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 7, background: "#ccf2ff" }}
      fullwidth
    >
      <Grid container justifyContent="center">
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
                  minHeight: "15rem",
                }}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={6}>
                  <CancelIcon color="error" fontSize="large" />
                </Grid>

                <MDTypography
                  variant="h6"
                  sx={{
                    mt: "2rem",
                    fontSize: "1.25rem",
                    textAlign: "center",
                    widht: "100%",
                    color: "#ff1a1a",
                  }}
                >
                  {" "}
                  Payment Failed
                </MDTypography>
                <Grid container spacing={2} ml={5} mt={16} pb={8}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                      Transaction No:
                    </MDTypography>
                    <MDTypography sx={{ fontSize: "1rem", mt: "1rem" }}>
                      Amount to be Paid:
                    </MDTypography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <MDButton sx={{ mt: "1rem" }}>RETRY PAYMENT</MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PaymentFailure;
