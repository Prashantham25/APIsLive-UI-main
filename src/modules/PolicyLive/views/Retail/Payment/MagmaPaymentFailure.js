import React from "react";
import { Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
// import { useLocation } from "react-router-dom";
// import {
//   useDataController,
//   // setGenericInfo,
//   // setGenericPolicyDto,
// } from "../../../../../BrokerPortal/context";
import CancelFilled from "assets/images/Nepal/CancelFilled.png";
// import Success from "assets/images/Nepal/Success.png";
import MDBox from "../../../../../components/MDBox";

export default function MagmaPaymentFailure() {
  // const location = useLocation();
  // const response = location.state.responsepay;
  // const [control, dispatch] = useDataController();
  // const { genericInfo } = control;

  // const response = {
  //   data: [{ paymentStatus: "Completed", InsuredName: "Hari" }],
  // };

  // console.log("Response Data in MagmaPaymentFailure", response);

  return (
    <Card position="absolute" sx={{ borderRadius: "1rem", m: 3, background: "#FFFFFF" }}>
      <Card
        position="absolute"
        sx={{ borderRadius: "0.3rem", m: 2, background: "#EEEEEE" }}
        fullwidth
      >
        <Grid container spacing={2} p={3}>
          {/* {response.data[0]?.paymentStatus === "Failure" && ( */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox
              sx={{
                display: "flex",
                backgroundImage: `url(${CancelFilled})`,
                backgroundSize: "contain", // Adjust as needed
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                textAlign: "center",
                alignItems: "center",
                minHeight: "60px", // Adjust height as needed
                minWidth: "60px", // Adjust width as needed
              }}
            />
            <MDTypography
              variant="h6"
              sx={{
                textAlign: "center",
                marginBottom: "20px", // Adding space after the text
              }}
            >
              Payment is Failed
            </MDTypography>
            <MDTypography variant="body1" textAlign="center">
              Hello,
              <br />
              We regret to inform you that your last payment request has failed.
              <br />
              For further assistance, you can reach out to your relationship manager / sales
              partner.
              <br />
              You may also connect with us on Toll-Free No. 1800-2663-202 or
              <br />
              Write to us at customercare@magma-hdi.com.
            </MDTypography>
          </Grid>
          {/* )}
          {response.data[0]?.paymentStatus === "Completed" && (
            // Completed
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox
                sx={{
                  display: "flex",
                  backgroundImage: `url(${Success})`,
                  backgroundSize: "contain", // Adjust as needed
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  textAlign: "center",
                  alignItems: "center",
                  minHeight: "150px", // Adjust height as needed
                  minWidth: "150px", // Adjust width as needed
                }}
              />
              <MDTypography
                variant="h6"
                sx={{
                  textAlign: "center",
                  marginBottom: "20px", // Adding space after the text
                }}
              >
                Payment is Completed
              </MDTypography>
              <MDTypography variant="body1" textAlign="center">
                Hello {response.data[0]?.InsuredName},
                <br />
                You have successfully completed the payment.
                <br />
                Please check your registered email for policy confirmation details.
              </MDTypography>
            </Grid>
          )}
          {response.data[0]?.paymentStatus === "Processing" && (
            // processing
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" textAlign="center">
                Hello {response.data[0]?.InsuredName},
                <br />
                Your payment is currently being processed.
                <br />
                Please wait. We will share a confirmation soon.
              </MDTypography>
            </Grid>
          )} */}
        </Grid>
      </Card>
    </Card>
  );
}
