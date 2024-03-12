import React, { useEffect, useState } from "react";
import { getRequest } from "core/clients/axiosclient";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Card, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import failureImg from "assets/images/Nepal/PaymentFailure.png";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import PayFailure from "assets/images/Nepal/CancelFilled.png";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Navbar from "../../../../Login/Layouts/Navbar/index";
import MDButton from "../../../../../components/MDButton";

function ViewModal({ view, setView }) {
  const navigate = useNavigate();
  const onClose = () => setView(false);
  const home = () => {
    navigate("/Nepal/B2Cpolicytype");
  };
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={view}
    >
      {/* <Slide direction="left" ouy in={viewPolicy}> */}
      <MDBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          padding: 6,
        }}
        p={4}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
              <ClearIcon onClick={onClose} />
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              Please be aware that the policy has not been bought yet,Your risk remains unprotected.
            </MDTypography>
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            justifyContent="center"
          >
            <MDButton onClick={home}>Ok</MDButton>
          </Grid>
        </Grid>
      </MDBox>
      {/* </Slide> */}
    </Modal>
  );
}

function B2CPaymentFailure() {
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
  const [view, setView] = useState(false);
  const navigate = useNavigate();

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
  const goToHome = () => {
    // navigate("/Nepal/B2Cpolicytype");
    setView(true);
  };
  const OnRetryPayment = () => {
    navigate(
      `https://apilivedev-secondary.z30.web.core.windows.net/Retail/PaymentLink?proposal=${paydetails.proposalNo}`
    );
  };
  return (
    <Card>
      <Navbar />
      <PageLayout>
        <ViewModal view={view} setView={setView} />

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox component="img" src={failureImg} width="80%" height="90%" marginTop="4rem" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            xxl={6}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={3} />
              <Grid item xs={6}>
                {/* <MDBox>
                  <Grid container justifyContent="center">
                    <Grid item xs={5.5}>
                      <MDTypography>Policy No</MDTypography>
                    </Grid>
                    <Grid item xs={1}>
                      <MDTypography>:</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>{details1.policyNumber}</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>Insured Name</MDTypography>
                    </Grid>
                    <Grid item xs={1}>
                      <MDTypography>:</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography />
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>KYC No</MDTypography>
                    </Grid>
                    <Grid item xs={1}>
                      <MDTypography>:</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>{details1.KYCNumber}</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>Receipt No</MDTypography>
                    </Grid>
                    <Grid item xs={1}>
                      <MDTypography>:</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>{details1.ReceiptNumber}</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>VAT Invoice No</MDTypography>
                    </Grid>
                    <Grid item xs={1}>
                      <MDTypography>:</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>{details1.VATNumber}</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>Policy Start Date</MDTypography>
                    </Grid>
                    <Grid item xs={1}>
                      <MDTypography>:</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>{details1.PolicyStartDate}</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>Policy End Date</MDTypography>
                    </Grid>
                    <Grid item xs={1}>
                      <MDTypography>:</MDTypography>
                    </Grid>
                    <Grid item xs={5.5}>
                      <MDTypography>{details1.PolicyEndDate}</MDTypography>
                    </Grid>
                  </Grid>
                </MDBox> */}
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
                    // backgroundColor: "red",
                  }}
                >
                  {/* <MDButton
                    size="large"
                    variant="outlined"
                    color="white"
                    iconOnly
                    circular
                    sx={{ mt: "1.5rem", background: "blue" }}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                  </MDButton> */}
                  <MDBox
                    component="img"
                    src={PayFailure}
                    width="20%"
                    height="20%"
                    marginTop="1.5rem"
                  />

                  <MDTypography
                    variant="h6"
                    sx={{
                      mt: "2rem",
                      fontSize: "1.25rem",
                      textAlign: "center",
                      widht: "100%",
                      color: "red",
                    }}
                  >
                    {" "}
                    Payment Failed
                  </MDTypography>
                  <MDTypography
                    variant="h6"
                    sx={{ my: "2rem", fontSize: "1rem", textAlign: "center", widht: "100%" }}
                  >
                    {" "}
                    Transaction No: {paydetails.transID}
                  </MDTypography>
                  <Grid container sx={{ my: "3rem" }} spacing={5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography
                        variant="body1"
                        sx={{ mt: "4rem", fontSize: "1rem", color: "#5F5F5F" }}
                      >
                        {" "}
                        Amount Paid : <b> रु {paydetails.paidAmount}</b>
                      </MDTypography>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography
                        textAlign="center"
                        variant="body1"
                        sx={{ mt: "4rem", fontSize: "1rem", color: "#5F5F5F" }}
                      >
                     
                      </MDTypography>
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDButton onClick={OnRetryPayment}> Retry Payment</MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
                {/* <MDBox
                  // align="center"

                  mt={4}
                  sx={{ background: "white", width: "415px", height: "442px" }}
                >
                  <Grid item align="center" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDAvatar
                      //   src={SBI}
                      size="xxl"
                      variant="square"
                      sx={{ width: 200, height: 60 }}
                    />
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
                </MDBox> */}
              </Grid>
              <Grid item xs={3} />
              <Grid container item xs={12} justifyContent="center">
                <MDButton variant="outlined" onClick={goToHome}>
                  Go To Home
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageLayout>
    </Card>
  );
}
export default B2CPaymentFailure;
