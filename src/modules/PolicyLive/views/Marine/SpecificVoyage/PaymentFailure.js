import React from "react";
import Card from "@mui/material/Card";
import { Divider, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
// import MDButton from "../../../../components/MDButton";

function PaymentFailure() {
  return (
    <MDBox
      px={1}
      xs={12}
      s={12}
      md={6}
      l={6}
      sx={{
        m: 5,
        mt: 10,
        width: "50%",
      }}
    >
      <Card sx={{ mt: 3 }}>
        <MDBox
          sx={{
            background: "#CEEBFF",
            px: "2rem",
            pb: "2rem",
            m: 4,
            mt: 6,
            textAlign: "center",
            width: "90%",
          }}
        >
          <Grid container spacing={2} p={2} sx={{ textAlign: "center" }}>
            <Grid justifyContent="center" item xs={12} sx={{ textAlign: "center" }}>
              <MDBox
                // align="center"

                mt={4}
                sx={{ background: "white", width: "90%", height: "442px" }}
              >
                <Grid justifyContent="center" item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <CancelIcon sx={{ fontSize: "70px !important", color: "#e53935" }} />
                </Grid>

                <MDTypography variant="h6" sx={{ fontSize: "2rem", color: "#e53935" }}>
                  Payment Failed
                </MDTypography>

                <Divider sx={{ color: "#000000" }} />
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="body" sx={{ fontSize: "1rem" }}>
                      Transaction No : *******
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Amount to be Paid : ₹ *****
                    </MDTypography>
                    {/* <MDButton onclick={}>Retry Payment</MDButton> */}
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default PaymentFailure;
