import React, { useEffect, useState } from "react";

import { Grid, Typography, Card, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {
  useLocation,
  //  useNavigate
} from "react-router-dom";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import MDTypography from "components/MDTypography";

import sucImg from "assets/images/Nepal/PaymentSuccess.png";
import PageLayout from "examples/LayoutContainers/PageLayout";

import Navbar from "../../../../Login/Layouts/Navbar/index";
import {
  GetPolicyDetailsByTransactionID,
  GetProposalByNumber,
  GetTemplatePayload,
  // SavepolicyWFStatus,
  // UpdateWorkflowStatus,
  // SendNotification,
  // EventCommunicationExecution,
} from "./Apis";

function B2CPaymentSuccess() {
  const [PaymentDetails, setPaymentDetails] = useState({
    PaymentRefNo: "",
  });
  const { search } = useLocation();
  //   const navigate = useNavigate();
  console.log("PaymentDetails", PaymentDetails);

  const [details1, setdetails1] = useState({
    policyNumber: "",
    ReceiptNumber: "",
    VATNumber: "",
    PolicyStartDate: "",
    PolicyEndDate: "",
    KYCNumber: "",
    Class: "",
    PremiumType: "",
    Department: "",
    Product: "",
  });
  console.log(details1);

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };

  useEffect(async () => {
    const PaymentRefNo = new URLSearchParams(search).get("TXNID");
    setPaymentDetails((prevState) => ({
      ...prevState,
      PaymentRefNo,
    }));
    if (PaymentRefNo !== null) {
      const res = await GetPolicyDetailsByTransactionID(PaymentRefNo);
      const res1 = await GetProposalByNumber(res.data.proposalNumber);
      console.log(res, res1, 123123);

      const Startdate = res1.data[0].policyDetails.PolicyStartDate;
      // details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      const [day1, month1, year1] = Startdate.split("/");

      if (day1 < 10 && month1 > 9) {
        const StartDate = `${day1.padStart(2, "0")}/${month1}/${year1}`;
        const startdate = StartDate.split("/");
        details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      }
      if (day1 < 10 && month1 < 10) {
        const StartDate = `${day1.padStart(2, "0")}/${month1.padStart(2, "0")}/${year1}`;
        const startdate = StartDate.split("/");
        details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      }
      if (day1 > 9 && month1 < 10) {
        const StartDate = `${day1}/${month1.padStart(2, "0")}/${year1}`;
        const startdate = StartDate.split("/");
        details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      }
      if (day1 > 9 && month1 > 9) {
        const StartDate = `${day1}/${month1}/${year1}`;
        const startdate = StartDate.split("/");
        details1.PolicyStartDate = `${startdate[1]}/${startdate[0]}/${startdate[2]}`;
      }

      details1.ReceiptNumber = res.data.transID;
      //   let Email = "";
      // if (res1.data[0].policyDetails.InsurableItem[0].RiskItems[0].KYCDetails !== undefined) {
      //   details1.VATNumber =
      //     res1.data[0].policyDetails.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails.VATNumber;
      //   // Email =
      //   //   res1.data[0].policyDetails.InsurableItem[0].RiskItems[0].KYCDetails.InsuredDetails
      //   //     .EmailAddress;
      // }
      details1.policyNumber = res.data.policyNo;
      const Enddate = res1.data[0].policyDetails.PolicyEndDate;
      const [day, month, year] = Enddate.split("/");

      if (day < 10 && month > 9) {
        const EndDate = `${day.padStart(2, "0")}/${month}/${year}`;
        const enddate = EndDate.split("/");
        details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      }
      if (day < 10 && month < 10) {
        const EndDate = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
        const enddate = EndDate.split("/");
        details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      }
      if (day > 9 && month < 10) {
        const EndDate = `${day}/${month.padStart(2, "0")}/${year}`;
        const enddate = EndDate.split("/");
        details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      }
      if (day > 9 && month > 9) {
        const EndDate = `${day}/${month}/${year}`;
        const enddate = EndDate.split("/");
        details1.PolicyEndDate = `${enddate[1]}/${enddate[0]}/${enddate[2]}`;
      }
      details1.Class = res1.data[0].policyDetails.Class;
      details1.KYCNumber = res1.data[0].policyDetails.KYCNo;
      details1.ReceiptNumber = res1.data[0].policyDetails.ReceiptNo;
      details1.VATNumber = res1.data[0].policyDetails.TaxInvoiceNo;
      details1.PremiumType = res1.data[0].policyDetails.PremiumType;
      details1.Department = res1.data[0].policyDetails.Department;
      details1.Product = res1.data[0].policyDetails.Product;
      setdetails1({ ...details1 });

      // if (res1.data[0].policyDetails.Department === "Motor") {
      //   Email =
      //     res1.data[0].policyDetails.ProposerDetails["Email ID"] === undefined
      //       ? res1.data[0].policyDetails.ProposerDetails.EmailId
      //       : res1.data[0].policyDetails.ProposerDetails["Email ID"];
      // }
      // if (res1.data[0].policyDetails.Department === "Agriculture") {
      //   Email = res1.data[0].policyDetails.ProposerDetails["Email ID"];
      // }
      // if (res1.data[0].policyDetails.Department === "Property Insurance") {
      //   Email = res1.data[0].policyDetails.ProposerDetails["Email ID"];
      // }
      //   if (Email && Email !== "") {
      //     let Class = "";
      //     if (res1.data[0].policyDetails.PremiumType === "Normal") {
      //       // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //       //   Class = res1.data[0].policyDetails.Class === "MotorCycle" ? 176 : 177;
      //       // }
      //       if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //         Class = 215;
      //       }
      //       if (
      //         localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      //         process.env.REACT_APP_EnvId === "1"
      //       ) {
      //         Class = 224;
      //       }
      //     }
      //     if (res1.data[0].policyDetails.PremiumType === "Short Period") {
      //       // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //       //   Class = 179;
      //       // }
      //       if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //         Class = 215;
      //       }
      //       if (
      //         localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      //         process.env.REACT_APP_EnvId === "1"
      //       ) {
      //         Class = 224;
      //       }
      //     }
      //     if (res1.data[0].policyDetails.Department === "Agriculture") {
      //       if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //         Class = 191;
      //       }
      //       if (
      //         localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      //         process.env.REACT_APP_EnvId === "1"
      //       ) {
      //         Class = 204;
      //       }
      //     }
      //     if (res1.data[0].policyDetails.Department === "Property Insurance") {
      //       if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //         Class = 194;
      //       }
      //       if (
      //         localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      //         process.env.REACT_APP_EnvId === "1"
      //       ) {
      //         Class = "";
      //       }
      //     }
      //     const a = {
      //       proposalNo: "",
      //       policyNo: res.data.policyNo,
      //       transactionId: "",
      //       customerId: "",
      //       key: res.data.policyNo,
      //       keyType: "BGRProposal",
      //       communicationId: Class,
      //       referenceId: 62,
      //       ICPDF: false,
      //       ISDMS: false,
      //     };
      //     await SendNotification(res.data.policyNo, Email, a);
      //   }
      // }
      //   const smsobj = {
      //     communicationId: 182,
      //     keyType: "BrokerPortalPolicy",
      //     key: res.data.policyNo,
      //     stakeHolderDetails: [
      //       {
      //         communicationType: "SMS",
      //         stakeholderCode: "CUS",
      //         communicationValue: "",
      //       },
      //     ],
      //   };
      //   await EventCommunicationExecution(smsobj);

      //   const a = {
      //     Stage: "Proposal",
      //     Status: "306",
      //     WorkFlowType: "Agent",
      //     wfstageStatusId: "308",
      //     workFlowId: "81",
      //   };
      //   await SavepolicyWFStatus(res.data.proposalNumber, a);

      //   const wfID = localStorage.getItem("wfIDforNepal");
      //   if (wfID !== null) {
      //     await UpdateWorkflowStatus(wfID, 253).then(() => {
      //       localStorage.removeItem("wfIDforNepal");
      //     });
      //   }
    }
  }, []);
  const onPolicyDownClick = async () => {
    // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //   Class = 216;
    // }
    const downloadDTO = {
      key: details1.policyNumber,
      keyValue: "",
      templateKey: "",
      templateId: 325,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, details1.policyNumber);
        // setBackDropFlag((prev) => ({ ...prev, onPolicyDownClick: false }));
      }
    });
  };
  const onReceiptClick = async () => {
    const downloadDTO = {
      key: details1.policyNumber,
      keyValue: "",
      templateKey: "",
      templateId: 326,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, details1.policyNumber);
        // setBackDropFlag((prev) => ({ ...prev, onReceiptClick: false }));
      }
    });
  };
  return (
    <Card>
      <Navbar />
      <PageLayout>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox component="img" src={sucImg} width="80%" height="90%" marginTop="4rem" />
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
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center" color="green">
                      Your Payment is Successfully
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center" color="green">
                      Please find the Policy Details below
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center" color="#3630A9">
                  Policy Details
                </Typography>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={6}>
                <MDBox>
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
                </MDBox>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3} />

              <Grid item xs={6}>
                <Stack direction="row" justifyContent="space-between">
                  <MDButton
                    variant="contained"
                    style={{ backgroundColor: "#3630A9", color: "white" }}
                    startIcon={<DownloadIcon />}
                    onClick={onReceiptClick}
                  >
                    Receipt & Tax Invoice
                  </MDButton>
                  <MDButton
                    variant="contained"
                    style={{ backgroundColor: "#3630A9", color: "white" }}
                    startIcon={<DownloadIcon />}
                    onClick={onPolicyDownClick}
                  >
                    Policy
                  </MDButton>
                </Stack>
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </Grid>
        </Grid>
      </PageLayout>
    </Card>
  );
}
export default B2CPaymentSuccess;
