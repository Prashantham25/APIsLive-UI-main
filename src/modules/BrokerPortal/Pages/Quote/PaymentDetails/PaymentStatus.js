// prop-types is a library for typechecking of props
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// @mui material components
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Icon from "@mui/material/Icon";
import { MailOutlined } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";

// import colors from "../../../../../assets/themes/bptheme/base/colors";
import { images } from "../../../context";

import { GetPDF, GetPaymentURL } from "../../MotorProposal/data";
import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";

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

// const { primary } = colors;

function downloadPDF(pdf, name) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = `${name}.pdf`;

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

function Download({ paymentDetails, handleModalSendEmailOpen }) {
  console.log("paymentDetails", paymentDetails);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Email, setEmail] = useState();

  const pdfInput = {
    proposalNo: paymentDetails.ProposalNumber,
    policyNo: paymentDetails.PolicyNumber,
    transactionId: paymentDetails.transID,
    customerId: paymentDetails.CustomerID,
  };

  const onClick = () => {
    setLoading(true);
    GetPDF(setPdf, pdfInput);
  };
  useEffect(() => {
    getRequest(`Policy/GetPolicyDetailsByNumber?policyNumber=${paymentDetails.PolicyNumber}`).then(
      (result) => {
        console.log("result", result);
        if (result.status === 200) {
          setEmail(result.data.ProposerDetails.EmailId);
        }
      }
    );
  }, []);
  useEffect(() => {
    if (pdf) {
      if (pdf.PdfUrl) {
        setLoading(false);
        window.location.href = pdf.PdfUrl;
      }
      if (pdf.PolicyBase64String) {
        setLoading(false);
        downloadPDF(pdf.PolicyBase64String, paymentDetails.PolicyNumber);
      }
    }
  }, [pdf]);

  useEffect(() => {
    if (paymentDetails.PolicyNumber && Email) {
      const emailDTO = {
        proposalNo: "",
        policyNo: paymentDetails.PolicyNumber,
        transactionId: "",
        customerId: "",
        key: paymentDetails.PolicyNumber,
        keyType: "",
        communicationId: 102,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      postRequest(
        `Policy/SendNotification?PolicyNumber=${paymentDetails.PolicyNumber}&EmailId=${Email}`,
        emailDTO
      ).then((result) => {
        console.log("result", result);
      });
    }
  }, [paymentDetails.PolicyNumber, Email]);
  const handleEmail = () => {
    handleModalSendEmailOpen();
  };

  return (
    <Card position="absolute" sx={{ borderRadius: "0.3rem", background: "#CEEBFF" }} fullwidth>
      <Grid container p={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDBox
            sx={{
              display: "flex",
              backgroundImage: `url(${PaySuccess})`,
              backgroundSize: "cover",
              flexDirection: "column",
              backgroundPosition: "center",
              textAlign: "center",
              alignItems: "center",
              minHeight: "100%",
            }}
          >
            <Grid container justifyContent="center" spacing={3} p={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDButton
                  size="large"
                  variant="outlined"
                  color="white"
                  iconOnly
                  circular
                  sx={{ background: "#00CA72" }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>check</Icon>
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography
                  variant="h6"
                  sx={{
                    fontSize: "1.25rem",
                    textAlign: "center",
                    color: "#00CA72",
                  }}
                >
                  Payment Successful
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography
                  variant="h6"
                  sx={{ fontSize: "1rem", textAlign: "center", widht: "100%" }}
                >
                  {`Transaction No: ${paymentDetails.transID}`}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  {`Amount Paid ${paymentDetails.payDetails.paidAmount}`}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                  {`Payment Mode ${paymentDetails.payDetails.paymentMode}`}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h1" sx={{ fontSize: "1.9rem" }}>
                Here is your policy
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDAvatar
                src={images[paymentDetails.payDetails.partnerName]}
                size="logo"
                variant="square"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                {paymentDetails.payDetails.companyName}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                {`Plan type : ${paymentDetails.payDetails.planType}`}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                {`Policy No. : ${paymentDetails.PolicyNumber}`}
              </MDTypography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDButton variant="outlined" onClick={handleEmail}>
                <MailOutlined sx={{ mr: "0.5rem" }} /> EMail
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDButton onClick={onClick}>Download Policy</MDButton>
              {loading && <CircularProgress size="1.5rem" />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

function Failure({ paymentDetails }) {
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
    if (paymentDetails) {
      GetPaymentURL(
        paymentDetails.payDetails.productID,
        paymentDetails.payDetails.proposalNo,
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
    <MDBox height="100%" sx={{ borderRadius: "0.3rem", background: "#CEEBFF" }} p={2}>
      <MDBox
        sx={{
          display: "flex",
          backgroundImage: `url(${PaySuccess})`,
          // backgroundSize: "cover",
          // flexDirection: "column",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          textAlign: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDAvatar
                src={images[paymentDetails.payDetails.partnerName]}
                size="logo"
                variant="square"
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton
              size="large"
              variant="outlined"
              color="white"
              iconOnly
              circular
              sx={{ background: "#ff0000" }}
            >
              <Icon sx={{ fontWeight: "bold" }}>close</Icon>
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="h6"
              sx={{
                fontSize: "1.25rem",
                textAlign: "center",
                color: "#ff0000",
              }}
            >
              Payment Failed
            </MDTypography>{" "}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="h6"
              sx={{ textAlign: "center", fontSize: "1rem", color: "#5F5F5F" }}
            >
              {`Transaction No: ${paymentDetails.transID}`}
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="h6"
              sx={{ textAlign: "center", fontSize: "1rem", color: "#5F5F5F" }}
            >
              {`Amount to be Paid : ₹ ${paymentDetails.payDetails.paidAmount}`}
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={retrypayment}>Retry Payment</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

function PaymentStatus() {
  const { search } = useLocation();

  const [paymentDetails, setPaymentDetails] = useState({
    transID: "",
    paymentStatus: "",
    PolicyNumber: "",
    ProposalNumber: "",
    CustomerID: "",
    PaymentRefNo: "",
    step: 0,
    pageState: "",
    payDetails: {
      partnerName: "",
      policyNo: "",
      paidAmount: "",
      planType: "",
      transID: "",
      paymentStatus: "",
      proposalNumber: "",
      paymentMode: "",
      companyName: "",
      paymentDetailsPanel: {},
    },
    rtoName: "",
  });
  useEffect(() => {
    paymentDetails.paymentStatus = new URLSearchParams(search).get("paymentStatus");
    paymentDetails.PolicyNumber = new URLSearchParams(search).get("PolicyNumber");
    paymentDetails.ProposalNumber = new URLSearchParams(search).get("ProposalNumber");
    paymentDetails.transID = new URLSearchParams(search).get("transID");
    paymentDetails.CustomerID = new URLSearchParams(search).get("CustomerId");
    paymentDetails.PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");

    setPaymentDetails({ ...paymentDetails });
  }, []);

  return (
    <MDBox sx={style}>
      {paymentDetails.paymentStatus === "Failure" && <Failure paymentDetails={paymentDetails} />}
      {paymentDetails.paymentStatus === "Success" && <Download paymentDetails={paymentDetails} />}
    </MDBox>
  );
}
export default PaymentStatus;
