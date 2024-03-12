// import React from "react";
import { useState, useEffect } from "react";

// import PageLayout from "examples/LayoutContainers/PageLayout";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";
import { Grid, CircularProgress, Icon, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { MailOutlined } from "@mui/icons-material";
import swal from "sweetalert";

import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import colors from "../../../../../assets/themes/bptheme/base/colors";

// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { } from "@mui/material";

// import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import MDAvatar from "../../../../../components/MDAvatar";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";

import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";
import { images } from "../../../context";
import { GetPaymentURL, GetPDF } from "../data/index";

function SendEmailModel({
  handlesendEmail,
  sendData,
  handleModalsendEmailClose,
  handleEmailsend,
  eLoading,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "56rem",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container justifyContent="flex-end">
          <ClearIcon onClick={handleModalsendEmailClose} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox component="img" src={CustDetail} width="100%" height="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ marginTop: "72px", margingLeft: "11px" }}
        >
          <MDTypography
            variant="body1"
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              color: "#000000",
              marginTop: "40px",
            }}
          >
            Enter the Email
          </MDTypography>

          <MDInput
            id="Email"
            value={sendData.Email}
            name="Email"
            onChange={handlesendEmail}
            // onBlur={handleValidate}
            label="Email"
          />
          {sendData.errorflag === true && sendData.Email === "" ? (
            <MDTypography
              sx={{
                fontSize: "0.9rem",
                color: "red",
                textAlign: "left",
                mr: "2.5rem",
              }}
            >
              This field is required
            </MDTypography>
          ) : null}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ marginRight: "27px", marginTop: "75px" }}
          >
            <Grid container justifyContent="flex-end">
              <MDBox sx={{ mt: "1rem", alignItems: "center", display: "flex" }}>
                <MDButton
                  onClick={() => {
                    handleEmailsend(sendData.Email);
                  }}
                  sx={{
                    fontSize: "0.7rem",
                  }}
                >
                  SEND EMAIL
                </MDButton>
                {eLoading && <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />}
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function downloadPDF(pdf, name) {
  console.log("PDF", pdf);
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = `${name}.pdf`;

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
  console.log(linkSource, "linkSource");
}
function Download({ transDetails }) {
  console.log("transDetails", transDetails);
  const { primary } = colors;
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eLoading, setELoading] = useState(false);

  const [Email, setEmail] = useState();
  console.log("customerid", transDetails.CustomerId);
  const pdfInput = {
    proposalNo: transDetails.proposalNo,
    policyNo: transDetails.policyNo,
    transactionId: transDetails.transID,
    customerId: transDetails.CustomerId,
    productID: transDetails.productID,
    partnerId: transDetails.partnerDetails.partnerId,
    baseProductId: transDetails.baseProductId,
  };

  const onClick = () => {
    setLoading(true);
    GetPDF(setPdf, pdfInput);
  };

  const [noOfTravel, setNoOfTravel] = useState();
  useEffect(() => {
    getRequest(`Policy/GetPolicyDetailsByNumber?policyNumber=${transDetails.policyNo}`).then(
      (result) => {
        console.log("result", result);
        if (result.status === 200) {
          setEmail(result.data.ProposerDetails.EmailId);
          setNoOfTravel(result.data.NOOfTravellingMembers);
        }
      }
    );
  }, []);
  console.log("pdf", pdf);
  console.log("noOfTravel", noOfTravel);
  useEffect(() => {
    if (pdf) {
      if (pdf.PdfUrl) {
        setLoading(false);
        window.location.href = pdf.PdfUrl;
      }
      if (pdf.PolicyBase64String) {
        setLoading(false);
        downloadPDF(pdf.PolicyBase64String, transDetails.policyNo);
      }
    }
  }, [pdf]);

  useEffect(() => {
    if (transDetails.policyNo && Email) {
      const emailDTO = {
        proposalNo: transDetails.proposalNo,
        policyNo: transDetails.policyNo,
        transactionId: transDetails.transID,
        customerId: transDetails.CustomerId,
        key: transDetails.policyNo,
        keyType: "",
        communicationId: 148,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      postRequest(
        `Policy/SendNotification?PolicyNumber=${transDetails.policyNo}&EmailId=${Email}`,
        emailDTO
      ).then((result) => {
        console.log("result", result);
      });
    }
  }, [transDetails.policyNo, Email]);

  const [sendData, setsendData] = useState({
    Email: "",
    errorflag: false,
  });
  const [modalSendEmailOpen, setSendModalEmailOpen] = useState(false);

  const handlesendEmail = (event) => {
    setsendData((prevState) => ({
      ...prevState,
      errorFlag: false,
      Email: event.target.value,
    }));
  };
  const handleModalSendEmailOpen = () => {
    sendData.Email = "";
    setSendModalEmailOpen(true);
  };
  const handleModalsendEmailClose = () => {
    sendData.Email = "";
    setSendModalEmailOpen(false);
  };
  const handleEmail = () => {
    handleModalSendEmailOpen();
  };
  const handleEmailsend = async (EmailId) => {
    // console.log("PolicyNumber", payDetails.PolicyNumber, EmailId);
    if (sendData.Email === "") {
      setsendData((prevState) => ({ ...prevState, errorflag: true }));
    } else {
      setsendData((prevState) => ({ ...prevState, errorflag: false }));
      setELoading(true);
      const emailDTO = {
        proposalNo: transDetails.proposalNo,
        policyNo: transDetails.policyNo,
        transactionId: transDetails.transID,
        customerId: transDetails.CustomerId,
        key: transDetails.policyNo,
        keyType: "",
        communicationId: 148,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      await postRequest(
        `Policy/SendNotification?PolicyNumber=${transDetails.policyNo}&EmailId=${EmailId}`,
        emailDTO
      ).then((result) => {
        console.log("result", result);
        if (result.status === 200) {
          handleModalsendEmailClose();
          swal({
            icon: "success",
            text: `Email sent successfully to ${EmailId}`,
          });
        }
      });
      setELoading(false);
    }
  };
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", mt: 3, background: "#CEEBFF" }}
      fullwidth
    >
      <Modal
        open={modalSendEmailOpen}
        // onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SendEmailModel
          handlesendEmail={handlesendEmail}
          sendData={sendData}
          eLoading={eLoading}
          handleModalsendEmailClose={handleModalsendEmailClose}
          handleEmailsend={handleEmailsend}
          // handleotpverify={handleotpverify}
        />
      </Modal>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          {/* <MDBox xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} textAlign="center" sx={{m:"2rem"}}> */}
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
                  minHeight: "22rem",
                }}
              >
                {/* <MDBox component="img" src={PaySuccess} /> */}

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
                  Transaction No: {transDetails.transID}
                </MDTypography>
                <Grid container sx={{ my: "3rem" }}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      variant="body1"
                      sx={{ mt: "4rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {" "}
                      Amount Paid{" "}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography
                      textAlign="center"
                      variant="body1"
                      sx={{ mt: "4rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      <b> ₹ {transDetails.paidAmount}</b>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      variant="body1"
                      sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      {" "}
                      Payment Mode{" "}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                    <MDTypography
                      textAlign="center"
                      variant="body1"
                      sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                    >
                      <b>{transDetails.paymentMode}</b>
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={2} sx={{ mt: "2rem" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="body1" mt={0} sx={{ fontSize: "1.9rem" }}>
                {" "}
                Here is your policy
              </MDTypography>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDBox display="flex" flexDirection="row" sx={{ mt: "1rem" }}>
                <FileDownloadOutlined sx={{ color: "#0071D9" }} />
                <MDTypography
                  variant="body1"
                  sx={{ fontSize: "1rem", color: "#0071D9", mx: "1rem" }}
                >
                  {" "}
                  Download Quote
                </MDTypography>
              </MDBox>
            </Grid> */}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mt: "1rem" }}>
                {" "}
                {/* {transDetails.companyName} */}
                Company Name
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDAvatar
                src={images[transDetails.partnerDetails.partnerName]}
                size="logo"
                variant="square"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mt: "1rem" }}>
                {" "}
                Policy Type
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem", mt: "1rem" }}>
                {" "}
                {transDetails.planType}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mt: "1rem" }}>
                {" "}
                No of Travelers
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem", mt: "1rem" }}>
                {" "}
                {noOfTravel}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mt: "1rem" }}>
                {" "}
                Policy No.
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem", mt: "1rem" }}>
                {" "}
                {transDetails.policyNo}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDButton
                color="white"
                sx={{
                  mt: "1rem",
                  background: "transparent",
                  border: 1,
                  color: `${primary.main}`,
                  fontSize: "small",
                }}
                // onClick={() => {
                //   handleEmail(paymentDetails.PolicyNumber, Email);
                // }}
                onClick={handleEmail}
              >
                <MailOutlined sx={{ mr: "0.5rem" }} /> EMail
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDBox sx={{ mt: "1rem", alignItems: "center", display: "flex" }}>
                <MDButton onClick={onClick} fullwidth>
                  Download Policy
                </MDButton>
                {loading && <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />}
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

function Failure({ transDetails }) {
  const [paymentData, setPaymentData] = useState();
  const buildForm = ({ action, params }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      console.log("element", key, params[key]);
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", params[key]);
      form.appendChild(input);
    });
    return form;
  };

  const post = (details) => {
    const formdata = {
      action: details.PaymentURL,
      params: details.InputJson,
    };
    const form = buildForm(formdata);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const retrypayment = () => {
    if (transDetails) {
      GetPaymentURL(
        transDetails.productID,
        transDetails.proposalNo,
        transDetails.baseProductId,
        transDetails.partnerDetails.partnerId,
        setPaymentData
      );
    }
  };

  useEffect(() => {
    if (paymentData) {
      if (paymentData.OutputResult.InputJson) {
        post(paymentData.OutputResult);
      } else {
        const paymentURL = paymentData.OutputResult.PaymentURL;
        window.location.href = paymentURL;
      }
    }
  }, [paymentData]);
  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", mt: 3, background: "#CEEBFF" }}
      fullwidth
    >
      <Grid container>
        {/* <MDBox xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} textAlign="center" sx={{m:"2rem"}}> */}
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
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
              {/* <MDBox component="img" src={PaySuccess} /> */}
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                {" "}
                <MDAvatar
                  src={images[transDetails.partnerDetails.partnerName]}
                  size="logo"
                  variant="square"
                />{" "}
              </Grid>

              <MDButton
                size="large"
                variant="outlined"
                color="white"
                iconOnly
                circular
                sx={{ mt: "1.5rem", background: "#ff0000" }}
              >
                <Icon sx={{ fontWeight: "bold" }}>close</Icon>
              </MDButton>
              <MDTypography
                variant="h6"
                sx={{
                  mt: "2rem",
                  fontSize: "1.25rem",
                  textAlign: "center",
                  widht: "100%",
                  color: "#ff0000",
                }}
              >
                {" "}
                Payment Failed
              </MDTypography>

              <Grid container sx={{ my: "3rem" }}>
                {" "}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {" "}
                  <MDTypography
                    variant="h6"
                    sx={{ mt: "5rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    Transaction No:{" "}
                  </MDTypography>{" "}
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  {" "}
                  <MDTypography
                    textAlign="center"
                    variant="body1"
                    sx={{ mt: "5rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {transDetails.transID}{" "}
                  </MDTypography>{" "}
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {" "}
                  <MDTypography
                    variant="body1"
                    sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    Amount to be Paid:{" "}
                  </MDTypography>{" "}
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                  {" "}
                  <MDTypography
                    textAlign="center"
                    variant="body1"
                    sx={{ mt: "1rem", fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    ₹ {transDetails.paidAmount}{" "}
                  </MDTypography>{" "}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  display="flex"
                  justifyContent="center"
                >
                  <MDButton color="info" onClick={retrypayment} sx={{ width: "auto", mt: "1rem" }}>
                    Retry Payment
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
function PolicySummary({ transDetails }) {
  return (
    <MDBox>
      {transDetails.paymentStatus === "Success" && <Download transDetails={transDetails} />}
      {transDetails.paymentStatus === "Failure" && <Failure transDetails={transDetails} />}
    </MDBox>
  );
}
export default PolicySummary;
