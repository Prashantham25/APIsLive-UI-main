import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import { useLocation } from "react-router-dom";
import { postRequest, getRequest } from "core/clients/axiosclient";
import { useDataController } from "../../../BrokerPortal/context";
// import { CPMProposalMail } from "./data/index";
import MDButton from "../../../../components/MDButton";

function PaymentSuccess() {
  const [controller] = useDataController();
  const { BGRTransactionId } = controller;

  const handleProceed = () => {
    window.location.replace(process.env.REACT_APP_HOMEURL, "_self");
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

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };

  const sendPolicyPdf = async (policyNo, emailId) => {
    if (paydetails.productID === "1039") {
      const jsonValue = {
        communicationId: 201,
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
        const mobileNo = paydetails.quoteMobileNo;
        const Message = `Dear Customer,Welcome to USGI Family. Your CONTRACTOR PLANT AND MACHINERY INSURANCE has been issued with policy no. ${
          paydetails.policyNo
        } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;
        await getRequest(
          `WCFExtension/SendSms?ICProductName=usgi&MobileNo=${mobileNo}&Message=${Message}`
        );
        return mail.data;
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  };

  // const sendProposalPdf = async (policyNo, emailId) => {
  //   // const salutation = await getRequest(
  //   //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
  //   `Policy/GetPolicyByNumber?policyNumber=${policyNo}`
  // );
  // console.log("ProposalRequest", salutation);

  //   const jsonValue = {
  //     communicationId: 200,
  //     keyType: "BGRProposal",
  //     key: policyNo,
  //     stakeHolderDetails: [
  //       {
  //         communicationType: "Email",
  //         stakeholderCode: "CUS",
  //         communicationValue: emailId,
  //       },
  //     ],
  //   };
  //   try {
  //     const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
  //     // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
  //     console.log(mail.data);
  //     return mail.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return null;
  // };

  const HandleDownload = async (policyNo) => {
    console.log("proposal", policyNo);
    if (paydetails.productID === "1039") {
      const downloadDTO = {
        key: policyNo,
        templateId: 199,
        referenceId: "",
      };
      await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
        console.log("result", result);
        if (result.status === 200) {
          generateFile(result.data, policyNo);
        }
        console.log("result", result);
      });
    }
  };

  // const handleproposal = async (proposalNumber) => {
  //   // console.log("Proposalll", ProposalData.proposalNumber);
  //   console.log("proposal", proposalNumber);
  //   if (paydetails.productID === "1039") {
  //     const downloadDTO = {
  //       key: proposalNumber,
  //       templateId: 198,
  //       referenceId: "",
  //     };
  //     await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
  //       console.log("result", result);
  //       if (result.status === 200) {
  //         generateFile(result.data, proposalNumber);
  //       }
  //     });
  //   }
  // };

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  return (
    <Card
      position="absolute"
      sx={{ borderRadius: "0.3rem", m: 7, background: "#FFFFFF" }}
      fullwidth
    >
      {reponseFlag && (
        <Card
          position="absolute"
          sx={{ borderRadius: "0.3rem", m: 7, background: "#EEEEEE" }}
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
                        <MDTypography sx={{ fontSize: "1rem", mt: "2rem", ml: "0rem" }}>
                          Amount Paid &nbsp;&nbsp; :
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem", mt: "1rem", ml: "0rem" }}>
                          Payment Mode&nbsp;&nbsp;:
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem", mt: "2rem", fontWeight: "bold" }}>
                          {formatter.format(Number(paydetails.paidAmount).toFixed(0))}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem", mt: "1rem", fontWeight: "bold" }}>
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
                    Policy No :
                    <b style={{ float: "right", marginRight: "100px" }}>{paydetails.policyNo}</b>
                  </MDTypography>
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    Proposer Name :
                    <b style={{ float: "right", marginRight: "100px" }}>
                      {paydetails.proposerData.Salutation} {paydetails.proposerData["First Name"]}{" "}
                      {paydetails.proposerData["Last Name"]}
                    </b>
                  </MDTypography>
                </Grid>{" "}
                {paydetails.productID === "1039" ? (
                  <Grid item md={3}>
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="error"
                      sx={{ color: "#E41D25" }}
                      onClick={() => sendPolicyPdf(paydetails.policyNo, paydetails.quoteEmail)}
                    >
                      Email&nbsp;Policy
                    </MDButton>
                  </Grid>
                ) : null}
                {/* {paydetails.productID === "1039" ? (
                  <Grid item md={3}>
                    <MDButton
                      variant="outlined"
                      display="flex"
                      color="error"
                      sx={{ color: "#E41D25" }}
                      onClick={() =>
                        sendProposalPdf(paydetails1.proposalNumber, paydetails.proposerEmail)
                      }
                    >
                      Email Proposal
                    </MDButton>
                  </Grid>
                ) : null} */}
                <Grid item md={3} ml={3}>
                  <MDButton
                    display="flex"
                    color="success"
                    onClick={() => HandleDownload(paydetails.policyNo)}
                  >
                    Download&nbsp;Policy
                  </MDButton>
                </Grid>
                {/* <Grid item md={3}>
                  <MDButton
                    display="flex"
                    color="success"
                    onClick={() => handleproposal(paydetails1.proposalNumber)}
                  >
                    Download Proposal
                  </MDButton>
                </Grid> */}
                <Grid item md={3} ml={7}>
                  <MDButton
                    // variant="outlined"
                    display="flex"
                    color="error"
                    onClick={handleProceed}
                  >
                    GO&nbsp;TO&nbsp;HOME
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
