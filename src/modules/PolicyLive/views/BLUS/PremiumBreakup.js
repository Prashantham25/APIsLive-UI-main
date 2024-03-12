import React, { useState } from "react";
import { Grid, Card, Backdrop, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../../../components/MDButton";
import { postRequest } from "../../../../core/clients/axiosclient";
import { SendSMS } from "./data";
// import MDButton from "../../../../components/MDButton";

function PremiumBreakup({ ratingData, PolicyDto, handleNext, handleBack }) {
  console.log("ratingData", ratingData);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  const [loading, setLoading] = useState(false);
  // const formatter1 = new Intl.NumberFormat("en-IN", {
  //   maximumFractionDigits: 0,
  //   style: "currency",
  //   currency: "INR",
  // });

  const handleShareQuote = async () => {
    const jsonValue = {
      communicationId: PolicyDto.SubProduct === "BLUS" ? 209 : 210,
      keyType: "BGRQuote",
      key: PolicyDto["Quotation No"],
      stakeHolderDetails: [
        {
          communicationType: "Email",
          stakeholderCode: "CUS",
          communicationValue: PolicyDto.QuoteEmail,
        },
      ],
    };
    await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    link.click();
  };

  const handleDownloadQuote = async () => {
    const downloadDTO = {
      key: PolicyDto["Quotation No"],
      templateId: PolicyDto.SubProduct === "BLUS" ? 208 : 209,
      referenceId: "",
    };

    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, PolicyDto["Quotation No"]);
      }
    });
  };

  const onNext = async () => {
    setLoading(true);
    handleShareQuote();
    handleDownloadQuote();
    const Message = `Dear Customer,Based on your requirements, ${PolicyDto.ProductName} Policy Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
    await SendSMS("usgi", PolicyDto.QuoteMobileNo, Message).then((smsResp) => {
      console.log("1234567890", smsResp);
    });
    handleNext();
  };

  return (
    <MDBox pt={3}>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ background: "#E5E4E2", borderRadius: "0px" }}>
            <Grid
              container
              spacing={1}
              p={3}
              sx={{ backgroundColor: "#b0e0e6", justifyContent: "center" }}
            >
              <Grid item xs={6} sm={6} md={6}>
                <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>Details</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} alignItems="left">
                <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>Premium</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
                  Net premium
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} alignItems="right">
                <MDTypography sx={{ color: "#000000" }}>
                  {formatter.format(PolicyDto.PremiumDetails["Net Premium"])}
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>CGST</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} alignItems="left">
                <MDTypography sx={{ color: "#000000" }}>
                  {formatter.format(PolicyDto.PremiumDetails.CGST)}
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>SGST</MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} alignItems="left">
                <MDTypography sx={{ color: "#000000" }}>
                  {formatter.format(PolicyDto.PremiumDetails.SGST)}
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
                  Total Premium
                </MDTypography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} alignItems="left">
                <MDTypography sx={{ color: "#000000" }}>
                  {formatter.format(PolicyDto.PremiumDetails["Total with Tax"])}
                </MDTypography>
              </Grid>
            </Grid>
          </Card>
          <Grid container justifyContent="space-between" sx={{ mt: "10px" }}>
            <MDButton
              color="primary"
              variant="outlined"
              sx={{ ml: "-10px" }}
              onClick={handleDownloadQuote}
            >
              Download Quote
            </MDButton>
            <MDButton color="primary" variant="outlined" onClick={handleShareQuote}>
              Share Quote
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <MDButton
          color="primary"
          variant="outlined"
          onClick={handleBack}
          sx={{ ml: "3rem", mt: "1rem", mb: "2rem" }}
          startIcon={<ArrowBack />}
        >
          Back
        </MDButton>
        <MDButton
          color="primary"
          variant="contained"
          onClick={onNext}
          sx={{ mt: "1rem", mb: "2rem" }}
        >
          Proceed
        </MDButton>
      </Grid>
    </MDBox>
  );
}

export default PremiumBreakup;
