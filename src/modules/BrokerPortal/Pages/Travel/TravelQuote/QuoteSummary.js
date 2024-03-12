import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import { Grid, Modal, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KeyboardBackspace } from "@mui/icons-material";

import MDAvatar from "components/MDAvatar";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
// import SBI from "assets/images/BrokerPortal/Travel/SBIGeneral.png";
// import SaveIcon from "@mui/icons-material/Save";
import SouthIcon from "@mui/icons-material/South";
import ShareIcon from "@mui/icons-material/Share";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getRequest, postRequest } from "core/clients/axiosclient";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
// import MemberDetails from "./MemberDetails";

import { useDataController, images, setQuoteProposalOutput } from "../../../context/index";
// import { data } from "../data/JsonData";
import { GetAllMasters } from "../data/index";

// function EditMemberModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
// const navigate = useNavigate();

// const onClick = () => {
//   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
// };
// return (
//   <div>

/* <MDTypography
        variant="h6"
        fontSize="0.9rem"
        textAlign="right"
        sx={{ textDecoration: "underline", color: "#1E90FF", mr: "1rem" }}
      >
        <Link
          href="/modules/BrokerPortal/Pages/Travel/TravelQuote/MemberDetails"
          color="#000000"
          font-family="Roboto"
        >
          Edit Members
        </Link>
      </MDTypography> */

/* <MDButton
        variant="success"
        onClick={handleOpen}
        sx={{ textDecoration: "underline", color: "#1E90FF" }}
      >
        Edit Members
      </MDButton> */

/* <Modal open={open} onClose={handleClose} sx={{ overflowY: "auto" }}>
        <MDBox pt={10} pl={10}>
          <MDBox
            // p={6}
            sx={{
              background: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "15px",
              height: "600px",
              width: "650px",
            }}
          >
            <Grid ml={5} mr={5}>
              <Grid mr={5}>
                <MDButton color="white" round onClick={handleClose} sx={{ textAlign: "right" }}>
                  x
                </MDButton>
              </Grid>
              <MemberDetails />
            </Grid>
          </MDBox>
        </MDBox>
      </Modal>
    </div>
  );
} */

function TravelQuoteSummary() {
  const navigate = useNavigate();
  const [controller, dispatch] = useDataController();

  // const data = controller.getQuoteOutput;
  // const { quickQuoteOutput } = controller;
  const { quoteProposalOutput, customerDetails, navigateToOtherPage } = controller;
  // const { customerDetails } = controller;
  console.log(customerDetails, "customerDetails");
  // const {details} =quickQuoteOutput;
  // const [PolicyDto, setPolicyDto] = useState(quoteProposalOutput);
  console.log("111111111111quoteProposalOutput", quoteProposalOutput);

  const [args, setArgs] = useState({
    productId: null,
    // partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const [masters, setMasters] = useState({
    TravelPolicyType: [],
    TripType: [],
  });
  console.log("TravelPolicyType", masters);

  const getValue = (masterType, value) => {
    if (masters[masterType]) {
      const val = masters[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

  useEffect(async () => {
    if (quoteProposalOutput && quoteProposalOutput.PartnerId) {
      const argObj = {
        ...args,
        productId: 918,
        // partnerId: data.PartnerId,
        masterType: null,
        jsonValue: null,
      };
      setArgs(argObj);
      GetAllMasters(argObj, setMasters);
    }
  }, [quoteProposalOutput && quoteProposalOutput.PartnerId]);

  const [openShareModal, setShareOpen] = React.useState(false);
  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => setShareOpen(false);
  // const onClose = () => setShareOpen(false);
  const { InsurableItem } = controller;
  console.log("InsurableItem", InsurableItem);

  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails || {};
  console.log("partnerDetails", partnerDetails);
  // const TPolicyDto = PolicyDto;
  // const [seconds, setSeconds] = useState(0);
  // const [gotData, setGotData] = useState(false);

  // const intervalRef = useRef(null);
  // const startIntervalTask = () => {
  //   intervalRef.current = setInterval(() => {
  //     setSeconds((prevState) => prevState + 1);
  //   }, 5000);
  // };
  // const stopIntervalTask = () => {
  //   clearInterval(intervalRef.current);
  // };

  // useEffect(() => {
  //   startIntervalTask();
  //   return () => stopIntervalTask();
  // }, []);

  // useEffect(() => {
  //   // console.log(seconds);
  //   if (seconds > 12) stopIntervalTask();
  //   if (quickQuoteOutput && quickQuoteOutput && quickQuoteOutput.quoteDetails && !gotData)
  //     GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
  //   if (
  //     data &&
  //     quickQuoteOutput &&
  //     quickQuoteOutput.quoteDetails &&
  //     quickQuoteOutput.quoteDetails.icCount === data.icCount
  //   )
  //     setGotData(true);
  // }, [seconds]);

  // const { TravellerInsuranceDetails } = controller;
  // const data1 = TravellerInsuranceDetails;
  // const data2 = TravellerInsuranceDetails.TravellerDetails;
  // const [TravelDto, setTravelDto] = useState(data);
  // console.log("TravelDto", TravelDto);
  // const handleChange = (e) => {
  //   if (e.target.name === "SumInsured") {
  //     const travelRegex = /^[0-9]*$/;
  //     if (travelRegex.test(e.target.value) || e.target.value === "") {
  //       setTravelDto((prev) => ({ ...prev, SumInsured: e.target.value }));
  //     }
  //   }
  // };
  // useEffect(() => {
  //   setTravellerInsuranceDetails(dispatch, TravelDto);

  //   console.log(11111111, TravellerInsuranceDetails);
  // }, [TravelDto]);

  // const TravelQuoteMail = async (QuoteNo, emailId) => {
  //   const jsonValue = {
  //     communicationId: 108,
  //     keyType: "BGRQuote",
  //     key: QuoteNo,
  //     stakeHolderDetails: [
  //       {
  //         communicationType: "Email",
  //         stakeholderCode: "CUS",
  //         communicationValue: emailId,
  //       },
  //     ],
  //   };
  // };

  const handleProceed = () => {
    // setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    // setQuoteProposalOutput(dispatch, PolicyDto);
    if (quoteProposalOutput !== null) {
      console.log("quoteProposalOutputQuoteSummary", quoteProposalOutput);
      navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/FinalTravelDetails`);
      // TravelQuoteMail(quoteProposalOutput.BaseQuotationNo, customerDetails.Email);
    }
  };

  const handleProposalInCustomerFlow = async () => {
    handleProceed();
    const shareQuoteDTO = {
      proposalNo: "",
      policyNo: "quoteNumber",
      transactionId: "",
      customerId: "",
      key: quoteProposalOutput.BaseQuotationNo,
      keyType: "BGRQuote",
      communicationId: 170,
      referenceId: quoteProposalOutput.PartnerId,
      ICPDF: true,
      ISDMS: false,
    };
    await postRequest(
      `Policy/SendNotification?PolicyNumber=${""}&EmailId=${customerDetails.Email}`,
      shareQuoteDTO
    ).then((result) => {
      console.log("result1", result);
    });
  };

  const handleNavQuotelist = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision`);
  };
  // const [loadingflag, setloadingflag] = useState(false);

  // const handleCalculate = async () => {
  //   setloadingflag(true);
  //   await callPremiumData();
  // };
  // const handleCalculateQuotePremium = async () => {
  //   setloadingflag(true);
  //   await callPremiumData();
  // };
  // const [TravelDto, setTravelDto]= useState();
  // const callPremiumData = async () => {
  // TravelDto.quotationDetails[0] =
  // Number(premiumResult.SGST) + Number(premiumResult.CGST);
  // setTravelDto({ ...TravelDto });
  // };

  // const TotalTax = () => {
  //   Number(TravelDto.quoteDetails[0].premiumResult.SGST) +
  //     Number(TravelDto.quotationDetails[0].premiumResult.CGST);
  // };
  // TravelDto.quotationDetails[0] = Number(premiumResult.SGST) + Number(premiumResult.CGST);
  // console.log("TotalTax", TotalTax);

  const [data4, setData4] = useState();
  console.log("data1234", data4);
  useEffect(async () => {
    const productPartnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput && quoteProposalOutput.PartnerId}`
    );
    // console.log("partnerDetails", productPartnerDetails);
    const partnerDetailsData = productPartnerDetails.data;
    // console.log("partnerDetailsData", partnerDetailsData);
    setData4(partnerDetailsData);
  }, []);

  const [gst, setGst] = useState(0);
  useEffect(() => {
    if (quoteProposalOutput !== null && quoteProposalOutput.PartnerId === "99") {
      const total = Number(premiumResult.SGST) + Number(premiumResult.CGST);
      quoteProposalOutput.PaymentDetails.TotalGST = total;
      setGst(total);
      console.log("total", total);
    } else if (quoteProposalOutput !== null && quoteProposalOutput.PartnerId === "77") {
      const total = premiumResult.TaxAmount;
      quoteProposalOutput.PaymentDetails.TotalGST = total;
      setGst(total);
    }

    setQuoteProposalOutput(dispatch, { ...quoteProposalOutput });
  }, [quoteProposalOutput && quoteProposalOutput.PartnerId]);
  console.log("gst", gst);

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    link.click();
  };
  const HandleDownload = async (quoteNumber) => {
    console.log("quoteNumber", quoteNumber);
    const downloadDTO = {
      key: quoteNumber,
      templateId: 150,
      referenceId: quoteProposalOutput.PartnerId,
      communicationId: 0,
      keyValue: "",
      templateKey: "",
      requestData: "",
    };

    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, quoteNumber);
      }
    });
  };
  const BrokerUser = localStorage.getItem("BrokerUser");

  const handleEmail = async (e, quoteNumber) => {
    handleShareClose();
    // setDisabled(false);
    const shareQuoteDTO = {
      proposalNo: "",
      policyNo: "quoteNumber",
      transactionId: "",
      customerId: "",
      key: quoteNumber,
      keyType: "BGRQuote",
      communicationId: 170,
      referenceId: quoteProposalOutput.PartnerId,
      ICPDF: true,
      ISDMS: false,
    };
    await postRequest(
      `Policy/SendNotification?PolicyNumber=${""}&EmailId=${customerDetails.Email}`,
      shareQuoteDTO
    ).then((result) => {
      console.log("result1", result);
    });
  };
  useEffect(() => {
    // const POSPSales = localStorage.getItem("POSPSales");
    // const BrokerUser = localStorage.getItem("BrokerUser");
    if (window.performance) {
      // console.log("refresh", performance.navigation.type);
      if (
        performance.navigation.type === 1 &&
        navigateToOtherPage === null &&
        quoteProposalOutput === null &&
        partnerDetails === null &&
        premiumResult === undefined
      ) {
        // console.log("This page is reloaded");
        if (BrokerUser === "Broker") {
          navigate("/modules/BrokerPortal/Login/brokeruserlogin");
        } else {
          navigate("/modules/BrokerPortal/Pages/CustomerLanding");
        }
      } else {
        // console.log("This page is not reloaded");
      }
    }
  }, []);
  return (
    <PageLayout>
      <BPNavbar />

      <MDBox m={7}>
        <MDButton variant="h6" mt="1rem" fontSize="1rem" onClick={handleNavQuotelist}>
          <KeyboardBackspace />
          <u>
            {" "}
            <b>Back to Quotes</b>{" "}
          </u>
        </MDButton>
        {/* <MDBox display="flex" flexDirection="row">
          <MDButton
            variant="h6"
            fontSize="0.8rem"
            onClick={handleNavQuotelist}
            // sx={{ textDecoration: "underline" }}
          >
            {/* <Link
              href="/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision"
              color="#000000"
              font-family="Roboto"
            >
              Back to quote
            </Link> */}
        {/* <MDTypography
              variant="body1"
             
              sx={{ fontSize: 13, color: "#000000", fontFamily: "Lexend", cursor: "pointer" }}
            > */}
        {/* <KeyboardBackspace /> */}
        {/* Back to quote */}
        {/* </MDTypography> 
          </MDButton>
        </MDBox> */}
        {quoteProposalOutput !== null && (
          <Card sx={{ bgcolor: "background.paper" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                <Grid container spacing={2} p={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDAvatar
                      src={images[data4]}
                      size="xl"
                      variant="square"
                      sx={{ width: 180, height: 110, mt: "-34px" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography color="primary" fontSize="1rem" sx={{ mt: "-34px" }}>
                      <h3>Plan Selected</h3>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="h7" sx={{ mt: "-34px" }}>
                      Plan Name : <b>{quoteProposalOutput.PartnerProdDetails.Plans[0].PlanName}</b>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography color="primary" fontSize="1rem" sx={{ mt: "1px" }}>
                      <h3>Trip Details</h3>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="h7" sx={{ mt: "-45px" }}>
                      Geography : <b>{quoteProposalOutput.Geography}</b>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="h7" sx={{ mt: "-45px" }}>
                      Country : <b>{quoteProposalOutput.ListOfDestinationValue}</b>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="h7">
                      Trip Type :<b> {getValue("TripType", quoteProposalOutput.TripType)}</b>
                      {/* <b>{quoteProposalOutput.TripType}</b> */}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="h7">
                      Duration :{" "}
                      <b>
                        {quoteProposalOutput.TripStartDate} to {quoteProposalOutput.TripEndDate}
                      </b>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="h7">
                      Days :<b>{` ${quoteProposalOutput.NOOfDays} days`}</b>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography color="primary" fontSize="1rem">
                      <h3> Member Covered </h3>
                    </MDTypography>
                  </Grid>
                  {quoteProposalOutput.InsurableItem[0].RiskItems.map((x) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDBox display="flex" flexDirection="row">
                        <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                          {x.Name} ({x.Age}Years)
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="h6" color="primary">
                      <h3> Sum Insured(For All Travellers) </h3>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      name="SumInsured"
                      label="Sum Insured"
                      value={quoteProposalOutput.SumInsured}
                      error={quoteProposalOutput.SumInsured === 0}
                      required
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={10} sm={10} md={3} lg={3} xl={3} xxl={3}>
                <MDBox mx={8}>
                  <Card sx={{ background: "#CEEBFF", width: "490px", height: "500px", mt: "50px" }}>
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography variant="h6" sx={{ fontSize: "2rem", mt: "-12px" }}>
                          Summary
                        </MDTypography>
                      </Grid>
                      {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                        <MDTypography variant="h7" sx={{ fontSize: "1rem", color: "#0071D9" }}>
                           <SaveIcon /> <u>Save Quote</u> 
                        </MDTypography>
                      </MDBox>
                    </Grid> */}
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          Quote No
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {quoteProposalOutput.BaseQuotationNo}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "1rem", color: "#5F5F5F", mt: "1rem" }}
                        >
                          Insurer
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                          <MDAvatar
                            src={images[data4]}
                            size="xxl"
                            variant="square"
                            sx={{ width: 180, height: 80, mr: "-14px", mt: "-10px" }}
                          />
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "1rem", color: "#5F5F5F", mt: "-5px" }}
                        >
                          Policy Type
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F", mt: "-5px" }}
                        >
                          {/* {quoteProposalOutput.PolicyType} */}
                          {getValue("TravelPolicyType", quoteProposalOutput.PolicyType)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          Sum Insured (All Travellers)
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {/* {formatter.format(quoteProposalOutput.SumInsured)} */}
                          {quoteProposalOutput.SumInsured}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          Gross Premium
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {formatter.format(premiumResult.GrossPremium)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          GST@18%
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                        >
                          {/* {formatter.format(Number(premiumResult.SGST) + Number(premiumResult.CGST))} */}
                          {formatter.format(gst)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                          <b>Total Premium</b> (inc.GST)
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "2rem", color: "#0071D9" }}
                        >
                          {formatter.format(premiumResult.TotalPremium)}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        {BrokerUser === "Broker" ? (
                          <MDTypography
                            textAlign="left"
                            variant="h7"
                            onClick={handleShareOpen}
                            sx={{ fontSize: "1rem", color: "#0071D9", cursor: "pointer" }}
                          >
                            <ShareIcon /> <u>Share Quote </u>
                          </MDTypography>
                        ) : (
                          <MDButton
                            textAlign="left"
                            variant="outlined"
                            onClick={() => HandleDownload(quoteProposalOutput.BaseQuotationNo)}
                            // sx={{ fontSize: "1rem", color: "#0071D9" }}
                          >
                            <SouthIcon />
                            Download Quote
                          </MDButton>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                        <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                          <MDButton
                            sx={{ width: "auto", fontSize: "0.7rem" }}
                            onClick={
                              BrokerUser === "Broker" ? handleProceed : handleProposalInCustomerFlow
                            }
                          >
                            Proceed to Proposal
                          </MDButton>
                        </MDBox>
                      </Grid>

                      <Modal
                        open={openShareModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        onClose={handleShareClose}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MDBox
                          align-item="center"
                          sx={{
                            position: "relative",
                            width: 700,
                            height: 200,
                            bgcolor: "background.paper",
                            boxShadow: (theme) => theme.shadows[5],
                            p: 6,
                          }}
                        >
                          <CloseIcon
                            style={{
                              position: "absolute",
                              right: 5,
                              top: 5,
                            }}
                            color="action"
                            instanceof
                            onClick={handleShareClose}
                            variant="text"
                          />
                          <Grid container>
                            <Grid item xs={12} mt={2}>
                              <MDTypography style={{ position: "absolute", top: 20, right: 250 }}>
                                <b>Share Quotation</b>
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} mt={2}>
                              <Stack direction="row" spacing={3}>
                                <FormControlLabel
                                  value="email"
                                  style={{ position: "absolute", left: 130 }}
                                  control={<Checkbox />}
                                  label="Email"
                                />{" "}
                                <FormControlLabel
                                  value="sms"
                                  style={{ position: "absolute", left: 300 }}
                                  control={<Checkbox />}
                                  label="SMS"
                                />{" "}
                                <FormControlLabel
                                  value="whatsapp"
                                  style={{ position: "absolute", right: 130 }}
                                  control={<Checkbox />}
                                  label="Whatsapp"
                                />{" "}
                              </Stack>
                            </Grid>
                          </Grid>
                          <Grid align="end" mr="1px">
                            <MDButton
                              style={{ position: "absolute", bottom: 10, right: 280 }}
                              onClick={(e) => handleEmail(e, quoteProposalOutput.BaseQuotationNo)}
                            >
                              Share Quote
                            </MDButton>
                          </Grid>
                        </MDBox>
                      </Modal>
                    </Grid>
                  </Card>
                </MDBox>
              </Grid>
            </Grid>
          </Card>
        )}
      </MDBox>
    </PageLayout>
  );
}
export default TravelQuoteSummary;
