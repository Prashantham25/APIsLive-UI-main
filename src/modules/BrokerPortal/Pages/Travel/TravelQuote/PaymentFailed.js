import React from "react";
import Card from "@mui/material/Card";
import { Divider, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SBI from "assets/images/BrokerPortal/Travel/SBIGeneral.png";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDAvatar from "../../../../../components/MDAvatar";
import MDButton from "../../../../../components/MDButton";

function PaymentFailed() {
  return (
    <MDBox
      px={1}
      sx={{
        m: 5,
        mt: 10,
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
          }}
        >
          <Grid container spacing={2} p={2} sx={{ textAlign: "center" }}>
            <Grid justifyContent="center" item xs={12} sx={{ textAlign: "center" }}>
              <MDBox
                // align="center"

                mt={4}
                sx={{ background: "white", width: "415px", height: "442px" }}
              >
                <Grid item align="center" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDAvatar src={SBI} size="xxl" variant="square" sx={{ width: 200, height: 60 }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <CancelIcon sx={{ fontSize: "70px !important", color: "#e53935" }} />
                </Grid>

                <MDTypography variant="h6" sx={{ fontSize: "2rem", color: "#e53935" }}>
                  Payment Failed
                </MDTypography>

                <Divider sx={{ color: "#000000" }} />
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="body" sx={{ fontSize: "1rem" }}>
                      Transaction No : 1498562156
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Amount to be Paid : ₹ 14,337
                    </MDTypography>
                    <MDButton>Retry Payment</MDButton>
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

export default PaymentFailed;
