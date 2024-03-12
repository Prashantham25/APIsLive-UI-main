import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Grid, Icon, Backdrop, CircularProgress } from "@mui/material";
import swal from "sweetalert2";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import {
  GetPolicyDetailsByNumber,
  UpdateOrderDetails,
  UpdatePaymentDetailsByProposalNo,
} from "./Apis";
import { GenericApi, GetPolicy } from "../Products/Magma/data/index";

function MagmaOnlineSuccess() {
  const Payload = {
    key: "",
    keyValue: "",
    templateKey: "",
    templateId: 164,
    requestData: "",
    referenceId: "",
    communicationId: 0,
  };
  const currencyFormat = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const location = useLocation();
  console.log("location", location.state.PolicyNo);
  console.log("orderbey", location.state.orderID);
  const finalResult = location.state.PolicyNo;
  const [policyNumber, setPolicyNumber] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const PolicyDetails = await GetPolicyDetailsByNumber(finalResult.PolicyNo);
    console.log("Number", PolicyDetails);
    setPolicyNumber(PolicyDetails);
    const Amount = PolicyDetails.data.TotalPremium;
    const requestAPi = {
      amount: Amount,
      orderID: location.state.orderID,
      status: "Success",
    };
    const UpdateOrder = await UpdateOrderDetails(requestAPi);
    console.log("statusUpload", UpdateOrder);
    const onlineJson = {
      paymentId: 0,
      policyId: 0,
      paidAmount: PolicyDetails.data.TotalPremium,
      txnType: "Online",
      remarks: "",
      status: "Completed",
      createdDate: "",
      updatedDate: "",
      createdBy: "",
      refNo: "",
      txnId: "",
      paymentResponse: "",
      transactionNumber: PolicyDetails.data.ProposalNo,
    };
    UpdatePaymentDetailsByProposalNo(PolicyDetails.data.ProposalNo, onlineJson);
    const Notification = GenericApi(
      "MagmaHospiCash01",
      "Magma_HospiCashNotification",
      PolicyDetails.data
    );
    console.log("Notification", Notification);
    if (Notification !== undefined) {
      setLoading(false);
      swal.fire({
        icon: "success",
        text: "Mail is sent successfully",
      });
    } else {
      setLoading(false);
    }
  }, []);
  // console.log("StatusUpdate", amount);
  console.log("1212", policyNumber);
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };
  const handleDownloadPolicy = async () => {
    Payload.key = location.state.PolicyNo.id;
    const policy = await GetPolicy(Payload);
    console.log("polidownload1", policy);
    generateFile(policy.data, location.state.PolicyNo.id);
  };
  const OnEmail = () => {
    setLoading(true);
    GenericApi("MagmaHospiCash01", "Magma_HospiCashNotification", policyNumber.data).then((res) => {
      console.log("email", res);
      if (res.status === 1) {
        setLoading(false);
        swal.fire({
          icon: "success",
          text: "Mail is sent successfully",
        });
      }
    });
  };
  return (
    <Card
      position="absolute"
      // sx={{ borderRadius: "0.3rem", mt: 3, background: " #EEEEEE" }}
      sx={{
        borderRadius: "0.3rem",
        m: 2,
        background: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      fullwidth
    >
      <Card
        position="absolute"
        // sx={{ borderRadius: "0.3rem", mt: 3, background: " #EEEEEE" }}
        sx={{
          borderRadius: "0.3rem",
          m: 2,
          background: "#EEEEEE",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 1300,
          pb: 3,
        }}
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
                    minHeight: "30rem",
                  }}
                >
                  <MDButton
                    size="large"
                    variant="outlined"
                    color="white"
                    iconOnly
                    circular
                    sx={{ mt: "1.5rem", background: "#c6444b" }}
                  >
                    <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                  </MDButton>
                  <MDTypography
                    variant="h6"
                    sx={{
                      fontSize: "1.35rem",
                      textAlign: "center",
                      color: "#000000",
                      mt: 5,
                    }}
                  >
                    Payment Details <p>Saved Successfully</p>
                  </MDTypography>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Transaction Number :
                      {finalResult?.TargetObject?.paymentDetailsDTO?.transactionNo
                        ? finalResult.TargetObject.paymentDetailsDTO.transactionNo
                        : ""}
                    </MDTypography>
                  </Grid>

                  <Grid container spacing={2} ml={5} mt={15}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem", ml: "0rem", fontWeight: "bold" }}>
                        Amount Paid &nbsp;&nbsp;:{" "}
                      </MDTypography>

                      <MDTypography
                        sx={{ fontSize: "1rem", ml: "0rem", fontWeight: "bold", mt: 2 }}
                      >
                        Payment Mode &nbsp;&nbsp;:{" "}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                        ₹
                        {currencyFormat.format(
                          policyNumber && policyNumber?.data && policyNumber?.data?.TotalPremium
                        )
                          ? currencyFormat.format(policyNumber?.data?.TotalPremium)
                          : ""}
                      </MDTypography>
                      <MDTypography sx={{ fontSize: "1rem", fontWeight: "bold", mt: 2 }}>
                        {finalResult?.TargetObject?.paymentDetailsDTO?.paymentSource
                          ? finalResult.TargetObject.paymentDetailsDTO.paymentSource
                          : ""}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Grid container spacing={4} sx={{ mt: "2rem" }} justifyContent="center">
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1.9rem", color: "#000000", ml: 10 }}>
                  Here is Your COI
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000", ml: 10 }}>
                  COI No :{" "}
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {policyNumber && policyNumber.data && policyNumber.data.PolicyNo
                      ? policyNumber.data.PolicyNo
                      : ""}
                  </b>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000", ml: 10 }}>
                  Master Policy No :{" "}
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {policyNumber &&
                    policyNumber.data.PartnerDetails &&
                    policyNumber.data.PartnerDetails.masterPolicyNo
                      ? policyNumber.data.PartnerDetails.masterPolicyNo
                      : ""}
                  </b>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000", ml: 10 }}>
                  Master Policy Holder Name :{" "}
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {policyNumber &&
                    policyNumber.data.PartnerDetails &&
                    policyNumber.data.MasterPolicyHolderName
                      ? policyNumber.data.MasterPolicyHolderName
                      : ""}
                  </b>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000", ml: 10 }}>
                  Proposer Name :{" "}
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {policyNumber &&
                    policyNumber.data &&
                    policyNumber.data.ProposerDetails &&
                    policyNumber.data.ProposerDetails.Name
                      ? policyNumber.data.ProposerDetails.Name
                      : ""}
                  </b>
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography sx={{ fontSize: "1rem", color: "#000000", ml: 10 }}>
                  No of Insured Members :{" "}
                  <b style={{ float: "right", marginRight: "100px" }}>
                    {policyNumber &&
                    policyNumber.data &&
                    policyNumber.data.InsurableItem[0] &&
                    policyNumber.data.InsurableItem[0].RiskItems &&
                    policyNumber.data.InsurableItem[0].RiskItems.length > 0
                      ? policyNumber.data.InsurableItem[0].RiskItems.reduce(
                          (total, currentItem) => total + parseInt(currentItem.NoOfLives || 0, 10),
                          0
                        )
                      : "0"}
                  </b>
                </MDTypography>
              </Grid>
              <Grid item md={2.5} mt={1}>
                <MDButton
                  display="flex"
                  variant="contained"
                  sx={{ justifyContent: "flex-end", whiteSpace: "nowrap", background: "#c6444b" }}
                  onClick={OnEmail}
                >
                  Email COI
                </MDButton>
                <Backdrop
                  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={loading}
                >
                  <CircularProgress />
                </Backdrop>
              </Grid>
              <Grid item md={2.5} mt={1}>
                <MDButton
                  display="flex"
                  variant="contained"
                  sx={{ justifyContent: "flex-end", whiteSpace: "nowrap", background: "#c6444b" }}
                  onClick={handleDownloadPolicy}
                >
                  Download COI
                </MDButton>
              </Grid>
              {/* <Grid item md={3}>
                <MDButton
                  variant="outlined"
                  display="flex"
                  sx={{ color: "#E41D25" }}
                //   onClick={handleHome}
                >
                  Go To Home
                </MDButton>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Card>
  );
}
export default MagmaOnlineSuccess;
