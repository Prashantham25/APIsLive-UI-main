import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
// import swal from "sweetalert";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import PaySuccess from "assets/images/BrokerPortal/PaySuccess.png";
import { useLocation } from "react-router-dom";
// import { useDataController } from "modules/BrokerPortal/context";
import { getRequest, postRequest } from "core/clients/axiosclient";
import { useDataController } from "../../../../BrokerPortal/context";
// import { BGRsendPolicyPdf } from "./data/index";
// import { getRequest } from "../../../../../core/clients/axiosclient";

function PaymentSuccess() {
  // const prName = "First Name";
  // const prLastName = "Last Name";
  // const prEmail = "Email ID";
  // const formatter = new Intl.NumberFormat("en-IN", {
  //   maximumFractionDigits: 2,
  //   style: "currency",
  //   currency: "INR",
  // });
  const [controller] = useDataController();
  const { MarineTransactionId } = controller;

  // const [controller] = useDataController();
  // const { HomeBGR } = controller;

  // console.log(HomeBGR, "setHomeBGR");
  // ;

  // const navigate = useNavigate();
  // const handleProceed = () => {
  //   navigate(`https://uatagency.universalsompo.com/Home/Dashboard`);
  // };
  // useEffect(() => {
  //   console.log(HomeBGR, "HomeBGR");
  // }, [HomeBGR]);
  // useEffect(() => {
  //   postRequest(
  //     `Product/GenericApi?ProductCode=BGRUSGI02&ApiName=BGRUSGIIssuePolicy`,
  //     HomeBGR.PolicyDto
  //   );
  // }, []);
  // console.log("PolicyDto", HomeBGR.PolicyDto);

  // console.log(
  //   // DentalInsuranceDetails.proposalNumber.proposalNumber,
  //   DentalInsuranceDetails.PolicyDto.ProposerDetails.EmailId,
  //   "mailid,proposalno"
  // );
  // useEffect(() => {
  //   if (DentalInsuranceDetails.PolicyDto.ProposerDetails.Emailid) {
  //   const emailDTO = {
  //     proposalNo: "",
  //     policyNo:" 0769 / 0000 / 0042 / 00 / 000",
  //     transactionId: "",
  //     customerId: "",
  //     key:" 0769 / 0000 / 0042 / 00 / 000",
  //     keyType: "",
  //     communicationId: 102,
  //     referenceId: 62,
  //     ICPDF: true,
  //     ISDMS: false,
  //   };
  //   postRequest(
  //     `Policy/SendNotification?PolicyNumber=${0769 / 0000 / 0042 / 00 / 000}& EmailId=${pallavi.b@inubesolutions.com}`,
  //     emailDTO
  //   ).then((result) => {
  //     console.log("result", result);
  //   });
  //   // }
  // });
  const { search } = useLocation();
  // const [PolicyNumberData, setPolicyData] = useState("");
  // console.log("setPolicyData".setPolicyData);
  // const [paydetails, setpaydetails] = useState({
  //   paidAmount: "",
  //   paymentStatus: "",
  //   policyNo: "",
  //   proposalNumber: "",
  //   transID: "",
  // });
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
    let PaymentRefNo;
    // const PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");
    if (MarineTransactionId === "") {
      PaymentRefNo = new URLSearchParams(search).get("PaymentRefNo");
    } else {
      PaymentRefNo = MarineTransactionId;
    }
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
      setpaydetails(paydetail);
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
    console.log("emailpolicyformarine1");
    const jsonValue = {
      communicationId: 121,
      keyType: "MarinePolicy",
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
      const mobileNo = paydetails.proposerData["Mobile Number"];
      const Message = `Dear Customer,Welcome to USGI Family. Your Marine Specific Voyage has been issued with policy no. ${
        paydetails.policyNo
      } on ${new Date().toDateString()} and you should receive the policy document within 15 days.If you do not receive the policy document or if you have any queries please feel free to write to us on contactus@universalsompo.com.Thanks`;

      await getRequest(
        `WCFExtension/SendSms?ICProductName=usgi&MobileNo=${mobileNo}&Message=${Message}`
      );
      return mail.data;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  // const HandleDownload = async (policyNo) => {
  //   console.log("quoteNumber", policyNo);
  //   const downloadDTO = {
  //     key: policyNo,
  //     templateId: 76,
  //     referenceId: "",

  //     keyValue: "",
  //     templateKey: "",

  //     requestData: "",
  //   };

  //   await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
  //     console.log("result", result);
  //     console.log("binaryfile", result.data);
  //     if (result.status === 200) {
  //       generateFile(result.data, policyNo);
  //     }
  //   });
  // };
  const HandleDownload = async (proposalNumber) => {
    console.log("Proposalll", PaymentDetails.policyNo);
    console.log("proposal", proposalNumber);
    // const downloadDTO = {
    //   refenceNumber: `${proposalNumber}.pdf`,
    //   documentType: "",
    //   emailId: "",
    // };
    // await postRequest(`DMS/GetDocumentByType`, downloadDTO).then((result) => {
    //   console.log("result", result);
    //   if (result.status === 200) {
    //     generateFile(result.data.documentDetails[0].data, proposalNumber);
    //   }
    //   console.log("result", result);
    // });
    const downloadDTO = {
      key: proposalNumber,
      templateId: 110,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNumber);
      }
    });
  };

  const handleproposal = async (proposalNumber) => {
    console.log("Proposalll", PaymentDetails.proposalNumber);
    console.log("proposal", proposalNumber);
    const downloadDTO = {
      key: proposalNumber,
      templateId: 111,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNumber);
      }
    });
  };

  const sendProposalPdf1 = async (policyNo, emailId) => {
    const jsonValue = {
      communicationId: 122,
      keyType: "MarineProposal",
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
      console.log(mail.data);
      return mail.data;
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  const handleGoToHome = () => {
    window.open(process.env.REACT_APP_HOMEURL, "_self");
  };

  // console.log("setPolicyData", setPolicyData);
  // const handleSetPolicy = async () => {
  //   await handleIssuePolicy(PolicyDto).then((result) => {
  //     if (result.status === 200) {
  //       swal({
  //         text: result.data.finalResult.responseMessage,
  //         html: true,
  //         icon: "success",
  //       });
  //       console.log("IstConsole", result.data.id);
  //       BGRsendPolicyPdf(result.data.finalResult.policyNo, PolicyDto.ProposalData["Email ID"]);
  //     }
  //     setPolicyData(result.data.id);
  //     console.log("PolicyNumber", PolicyNumberData);
  //   });
  // };
  return (
    <Card
      position="absolute"
      // sx={{ borderRadius: "0.3rem", mt: 3, background: " #EEEEEE" }}
      sx={{ borderRadius: "0.3rem", m: 7, background: "#FFFFFF" }}
      fullwidth
    >
      {reponseFlag && (
        <Card
          position="absolute"
          // sx={{ borderRadius: "0.3rem", mt: 3, background: " #EEEEEE" }}
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

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography sx={{ fontSize: "0.8rem", ml: "0rem" }}>
                        Transaction Number :{paydetails.transID}
                      </MDTypography>
                    </Grid>

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
                          {/* {formatter.format(paydetails.paidAmount)} */}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem", ml: "0rem" }}>
                          Payment Mode&nbsp;&nbsp;:{/* {paydetails.paymentMode} */}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          {Number(paydetails.paidAmount).toFixed(0)}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "1rem" }}>
                          {paydetails.paymentMode}
                        </MDTypography>
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDTypography sx={{ fontSize: "1rem" }}>Online</MDTypography>
                    </Grid> */}
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
                    Policy No :{" "}
                    <b style={{ float: "right", marginRight: "100px" }}>{paydetails.policyNo}</b>
                  </MDTypography>
                </Grid>{" "}
                {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    <b>{paydetails.policyNo}</b>
                  </MDTypography>
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    {/* Proposer Name : <b>{paydetails.proposerData.Salutation}</b>{" "}
                    <b>{paydetails.proposerData["First Name"]}</b>{" "}
                    <b>{paydetails.proposerData["Last Name"]}</b> */}
                    Proposer Name:
                    <b style={{ float: "right", marginRight: "100px" }}>
                      {paydetails.proposerData.Salutation} {paydetails.proposerData["First Name"]}{" "}
                      {paydetails.proposerData["Last Name"]}
                    </b>
                  </MDTypography>
                </Grid>{" "}
                {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography sx={{ fontSize: "1rem", color: "#000000" }}>
                    <b>{paydetails.proposerData[prName]}</b>{" "}
                    <b>{paydetails.proposerData[prLastName]}</b>
                    {/* {HomeBGR.PolicyDto.ProposalData["First Name"]} &nbsp;{" "} */}
                {/* {DentalInsuranceDetails.data.ProposerDetails.MiddleName} &nbsp;{" "}
                  {DentalInsuranceDetails.data.ProposerDetails.LastName}8 */}
                {/* </MDTypography>
                </Grid>  */}
                {/* <Grid xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} spacing={2}> */}
                <Grid item md={3}>
                  <MDButton
                    variant="outlined"
                    display="flex"
                    color="error"
                    sx={{ color: "#E41D25" }}
                    onClick={() => sendPolicyPdf(paydetails.policyNo, paydetails.proposerEmail)}

                    // onClick={
                    //   () => handleSetPolicy(paydetails.policyNo, paydetails.proposerData[prEmail])

                    //   // "7520202200000000880",
                    // }

                    // sendMail(
                    //   DentalInsuranceDetails.data.PolicyNumber,
                    //   DentalInsuranceDetails.data.ProposerDetails.EmailId
                    // )
                    // }
                    // sx={{
                    //   maxHeight: "1.5rem",
                    //   // width: "7rem",
                    //   fontSize: "0.5rem",
                    //   width: "8rem",
                    //   mr: "0rem",
                    //   borderRadius: "0rem",
                    // }}
                  >
                    Email Policy
                  </MDButton>
                </Grid>
                <Grid item md={3} ml={4}>
                  <MDButton
                    variant="outlined"
                    display="flex"
                    color="error"
                    sx={{ color: "#E41D25" }}
                    onClick={() =>
                      sendProposalPdf1(paydetails1.proposalNumber, paydetails.proposerEmail)
                    }
                  >
                    Email&nbsp;Proposal
                  </MDButton>
                </Grid>
                {/* <Grid item md={3}>
                  <MDButton
                    display="flex"
                    color="success"
                    // onClick={() => HandleDownload(DentalInsuranceDetails.data.PolicyNumber)}11
                    onClick={() => HandleDownload(paydetails.policyNo)}
                    // sx={{
                    //   maxHeight: "1.5rem",
                    //   width: "10rem",
                    //   fontSize: "12px",
                    //   // borderRadius: "0.1rem",
                    // }}
                  >
                    Download Policy
                  </MDButton>
                </Grid> */}
                <Grid item md={3} ml={5}>
                  <MDButton
                    display="flex"
                    color="success"
                    onClick={() => HandleDownload(paydetails.policyNo)}
                  >
                    Download&nbsp;Policy
                  </MDButton>
                </Grid>
                <Grid item md={3} ml={0.5}>
                  <MDButton
                    display="flex"
                    color="success"
                    // onClick={() => HandleDownload(paydetails.policyNo)}
                    onClick={() => handleproposal(paydetails1.proposalNumber)}

                    // sx={{
                    //   maxHeight: "1.5rem",
                    //   width: "8rem",
                    //   fontSize: "0.5rem",
                    //   ml: "2rem",
                    //   borderRadius: "0rem",
                    // }}
                  >
                    Download&nbsp;Proposal
                  </MDButton>
                </Grid>
                {/* </Grid> */}
                {/* <Grid item md={3}>
                  <MDButton
                    display="flex"
                    color="success"
                    onClick={() => handleproposal(paydetails1.proposalNumber)}

                    // sx={{
                    //   maxHeight: "1.5rem",
                    //   width: "8rem",
                    //   fontSize: "0.5rem",
                    //   ml: "2rem",
                    //   borderRadius: "0rem",
                    // }}
                  >
                    Download Proposal
                  </MDButton>
                </Grid> */}
                {/* <Grid item md={3} ml={2}>
                  <MDButton
                    variant="outlined"
                    display="flex"
                    color="error"
                    sx={{ color: "#E41D25" }}
                    // sx={{ color: "#E41D25" }}
                    // display="flex"
                    // sx={{
                    //   maxHeight: "1.5rem",
                    //   width: "7rem",
                    //   fontSize: "0.5rem",
                    //   ml: "4rem",
                    //   borderRadius: "0rem",
                    //   fontcolor: "White",
                    // }}
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
                </Grid> */}
                <Grid item md={3} ml={7}>
                  <MDButton
                    // variant="outlined"
                    display="flex"
                    color="error"
                    onClick={handleGoToHome}

                    // sx={{ color: "#E41D25" }}
                    // display="flex"
                    // sx={{
                    //   maxHeight: "1.5rem",
                    //   width: "7rem",
                    //   fontSize: "0.5rem",
                    //   ml: "4rem",
                    //   borderRadius: "0rem",
                    //   fontcolor: "White",
                    // }}
                    // onClick={handleProceed}
                  >
                    {/* <MDTypography
                      variant="outlined"
                      display="flex"
                      color="error"
                      sx={{ color: "#E41D25", padding: "5px" }}
                    > */}
                    Go&nbsp;To&nbsp;Home
                    {/* </MDTypography> */}
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
