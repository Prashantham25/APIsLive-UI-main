import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest, getRequest } from "core/clients/axiosclient";
// import { useDataController } from "../../../BrokerPortal/context";
import MDButton from "../../../../../../../components/MDButton";

function PaymentSuccess({ BGRTransactionId }) {
  //   const [controller] = useDataController();
  //   const { BGRTransactionId } = controller;

  const navigate = useNavigate();
  const handleProceed = () => {
    navigate(`https://uatagency.universalsompo.com/Home/Dashboard`);
  };
  const { search } = useLocation();

  const [paydetails, setpaydetails] = useState({});
  const [paydetails1, setpaydetails1] = useState({});

  useEffect(() => {
    setpaydetails1(paydetails);
    console.log("paydetails3333", paydetails1);
    console.log("paydetails33334", paydetails);
  }, [paydetails]);
  const [reponseFlag, setReponseFlag] = useState(false);
  console.log("paydetails11111122", paydetails);
  const [PaymentDetails, setPaymentDetails] = useState({
    PaymentRefNo: "",
  });
  console.log("PaymentDetails", PaymentDetails);
  useEffect(async () => {
    // debugger;
    let PaymentRefNo;
    console.log("BGRTransactionId", BGRTransactionId);
    // const PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");
    if (BGRTransactionId === "") {
      PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");
    } else {
      PaymentRefNo = BGRTransactionId;
    }
    // const PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");
    setPaymentDetails((prevState) => ({
      ...prevState,
      PaymentRefNo,
    }));
    if (PaymentRefNo !== null) {
      const paydetail = await (
        await getRequest(`Policy/GetPolicyDetailsByTransactionID?TransactionID=${PaymentRefNo}`)
      ).data;
      console.log("paydetails", paydetail);
      console.log("policyNo", paydetail.policyNo);
      setpaydetails({ ...paydetail });
      setReponseFlag(true);
    }
  }, []);
  console.log("paydetails1212", paydetails);

  const sendPolicyPdf = async (policyNo, emailId) => {
    const jsonValue = {
      communicationId: 199,
      keyType: "BGRPolicy",
      key: policyNo,
      stakeHolderDetails: [
        {
          communicationType: "Email",
          stakeholderCode: "CUS",
          communicationValue: emailId,
        },
      ],
    };
    try {
      const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
      // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
      console.log(mail.data);
      return mail.data;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const sendProposalPdf = async (proposalNumber, emailId) => {
    const jsonValue = {
      communicationId: 198,
      keyType: "BGRProposal",
      key: proposalNumber,
      stakeHolderDetails: [
        {
          communicationType: "Email",
          stakeholderCode: "CUS",
          communicationValue: emailId,
        },
      ],
    };
    try {
      const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
      // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
      console.log(mail.data);
      return mail.data;
    } catch (error) {
      console.log(error);
    }
    return null;
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

  const HandleDownload = async (policyNo) => {
    console.log("proposal", policyNo);
    const downloadDTO = {
      key: policyNo,
      templateId: 196,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, policyNo);
      }
      console.log("result", result);
    });
  };

  const handleproposal = async (proposalNumber) => {
    // console.log("Proposalll", ProposalData.proposalNumber);
    console.log("proposal", proposalNumber);
    const downloadDTO = {
      key: proposalNumber,

      templateId: 195,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNumber);
      }
    });
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 2, background: "#FFFFFF" }}
      fullwidth
    >
      {reponseFlag && (
        <Card
          position="absolute"
          sx={{ borderRadius: "0.3rem", m: 2, background: "#EEEEEE" }}
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
                      minHeight: "20rem",
                    }}
                  >
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
                      Payment Details <p>Saved Successfully</p>
                    </MDTypography>

                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography sx={{ fontSize: "0.8rem", ml: "0rem" }}>
                        Transaction Number :{paydetails.transID}
                      </MDTypography>
                    </Grid> */}

                    <MDTypography
                      variant="h6"
                      sx={{ my: "2rem", fontSize: "1rem", textAlign: "center", widht: "100%" }}
                    >
                      {" "}
                    </MDTypography>
                    <Grid container spacing={2} ml={5} mt={2} pb={10}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                          Amount Paid &nbsp;&nbsp; :
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                          Payment Mode&nbsp;&nbsp;:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          {formatter.format(Number(paydetails.paidAmount).toFixed(0))}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          {paydetails.paymentMode}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Grid container spacing={4} sx={{ mt: "2rem" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.8rem", color: "#000000" }}>
                    Here is your policy
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    Policy No : <b>{paydetails.policyNo}</b>
                  </MDTypography>
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    Proposer Name :{" "}
                    <b>
                      {paydetails.proposerData.Salutation}
                      {paydetails.proposerData["First Name"]}
                    </b>{" "}
                    <b>{paydetails.proposerData["Last Name"]}</b>
                  </MDTypography>
                </Grid>{" "}
                <Grid container spacing={1} p={1}>
                  <Grid item xs={12} sm={12} md={3} lg={2.5} xl={2.5} xxl={2.5} ml={2.5}>
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="error"
                      sx={{ color: "#E41D25" }}
                      onClick={() => sendPolicyPdf(paydetails.policyNo, paydetails.proposerEmail)}
                    >
                      Email Policy
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="error"
                      sx={{ color: "#E41D25" }}
                      onClick={() =>
                        sendProposalPdf(paydetails.proposalNumber, paydetails.proposerEmail)
                      }
                    >
                      Email Proposal
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDButton
                      display="flex"
                      color="success"
                      onClick={() => HandleDownload(paydetails.policyNo)}
                    >
                      Download Policy
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDButton
                      display="flex"
                      color="success"
                      onClick={() => handleproposal(paydetails.proposalNumber)}
                    >
                      Download Proposal
                    </MDButton>
                  </Grid>
                </Grid>
                <Grid item>
                  <MDButton
                    variant="outlined"
                    display="flex"
                    color="error"
                    sx={{ color: "#E41D25" }}
                    onClick={handleProceed}
                  >
                    <a href="https://uatagency.universalsompo.com/Home/Dashboard">
                      {" "}
                      <MDTypography
                        variant="outlined"
                        display="flex"
                        color="error"
                        sx={{ color: "#E41D25", padding: "5px" }}
                      >
                        Go To Home
                      </MDTypography>
                    </a>
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </Card>
  );
}

export default PaymentSuccess;
