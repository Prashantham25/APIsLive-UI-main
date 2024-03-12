import React, { useEffect, useState } from "react";
import { Grid, Card, Divider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { getRequest } from "core/clients/axiosclient";
import { useLocation } from "react-router-dom";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

function Failurepage() {
  const [PaymentDetails, setPaymentDetails] = useState({
    PaymentRefNo: "",
  });
  const { search } = useLocation();
  console.log("PaymentDetails", PaymentDetails);
  const [paydetails, setpaydetails] = useState({
    transID: "",
    paidAmount: "",
    KYCNo: "",
  });
  useEffect(async () => {
    const PaymentRefNo = new URLSearchParams(search).get("TXNID");
    setPaymentDetails((prevState) => ({
      ...prevState,
      PaymentRefNo,
    }));
    if (PaymentRefNo !== null) {
      const paydetail = await (
        await getRequest(`Policy/GetPolicyDetailsByTransactionID?TransactionID=${PaymentRefNo}`)
      ).data;

      paydetails.paidAmount = parseInt(paydetail.paidAmount, 10) / 100;
      paydetails.transID = paydetail.transID;

      console.log("paydetails", paydetail);
      console.log("policyNo", paydetail.policyNo);
      setpaydetails({ ...paydetails });
    }
  }, []);
  return (
    <Card sx={{ backgroundColor: "#CEEBFF", display: "flex" }}>
      <MDBox sx={{ display: "flex", justifyContent: "center" }} p={5}>
        <MDBox width="30%">
          <Card>
            <Grid container spacing={3} p={2} sx={{ textAlign: "center" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <CancelIcon color="error" fontSize="large" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography color="error">Payment Failed</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography>Transaction No : {paydetails.transID}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography>KYC No : </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Divider sx={{ borderStyle: "dashed", color: "#03a9f4" }} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography>Amount to be Paid : रु {paydetails.paidAmount}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDButton>Retry Payment</MDButton>
              </Grid>
            </Grid>
          </Card>
        </MDBox>
      </MDBox>
    </Card>
  );
}
export default Failurepage;
