import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import swal from "sweetalert";
import { setLogo, setCustTheme, useDataController } from "modules/BrokerPortal/context";
import Policysearch from "./data/PolicySearchjson";
import ProposerDetailsData from "./ProposerDetailsData";
// import PropertyDetails from "./PropertyDetails";
// import DocumentsUpload from "./DocumentsUpload";
// import PremiumBreakup from "./PremiumBreakup";
import PaymentDetailsPage from "./PaymentDetailsPage";
// import PaymentSuccess from "./PaymentSuccess";
import Quote from "./Quote";

import { postRequest } from "../../../../core/clients/axiosclient";
import {
  // handleIssuePolicy,
  callPremiumMethod,
  getSalutation,
  getState,
  getDistrict,
  callSaveQuoteMethod,
  callSaveProposalMethod,
  GetProposalDetailsByQuoteNumber,
  GetProposalDetailsByPolicyNumber,
  BGRsendPolicyPdf,
  BGRQuoteMail,
  GetProposalByNumber,
} from "./data/index";
import data from "./JsonData";
// import { parse } from "@babel/parser";
const steps = [
  "Property Details",
  // "Premium Breakup",
  // "Documents Upload",
  "Proposer Details",
  "Payment Details",
  // "Payment Success",
];
// const [setFlags] = useState({
//   errorFlag: false,
//   // errorFlag: true,
// });
function generateUUID() {
  const ab = uuid();
  return ab;
}

function GetStepContent({
  step,
  handleNext,
  PolicyDto,
  QuoteNumber,
  setPolicyDto,
  handleSetPolicy,
  paymentCall,
  handleSetValue,
  handleOdSET,
  handleSet,
  salutationData,
  handleDateChange,
  handleChange,
  handleDD,
  commonObj,
  handleSetPincode,
  permAddress,
  handleSetPermPinCode,
  ratingData,
  QuoteData,
  setQuoteData,
  ProposalData,
  // PolicyNumberData,
  flag,
  ProposalFlag, // recent changes
  pinLoad,
  pinPermLoad,
  handleAutoPops,
  HandleDownload,
  handleClick,
  handelSumInsured,
  handleproposal,
  handlepolicy,
  master,
  setMaster,
  setCalculatePremium,
  calculatePremium,
  setPinLoad,
  setCommonObj,
  setPinPermLoad,
  callDistrict,
  setPremStructure,
  premStructure,
  valueTab,
  setValuetab,
  setFlag,
  setPermAddress,
  setProposalFlag,
  setProposalData,
  handleBack,
  setOTP,
  OTP,
  setCheckDisclaimer,
  checkDisclaimer,
  checkInsurance,
  setCheckInsurance,
  checkProposalConsent,
  setCheckProposalConsent,
  setQ3,
  q3,
  setQ2,
  q2,
  setDocUpload,
  docUpload,
  pStartDate,
  setPolEndDate,
  setPolStartDate,
  pEndDate,
  loadingflag,
  setloadingflag,
  setShowButton,
  showButton,
  kycDate,
  setKycDate,
  kycSecDisable,
  setKYCSecDisable,
  counter,
  setCounter,
  startCounterFlag,
  setStartCounterFlag,
  timerFlag,
  setTimerFlag,
  sendOtpFlag,
  setSendOtpFlag,
  status,
  setStatus,
  CKYCData,
  setCKYCData,
  CKYCStatus,
  setCKYCStatus,
  CKYCReqJSon,
  setCKYCReqJson,
  CkycEmailFlag,
  setCkycEmailFlag,
  IdType,
  setIdType,
  setDate,
  datetoShow,
  tSIVal1,
  tSIVal2,
  tSIVal3,
  tSIVal4,
  settSIVal1,
  settSIVal2,
  settSIVal3,
  settSIVal4,
  disableFlag,
  setDisableFlag,
  QuoteSave,
  setQuoteSave,
  setCkycUpdateJson,
  CkycUpdateJson,
}) {
  switch (step) {
    case 0:
      return (
        <Quote
          PolicyDto={PolicyDto}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
          setPolicyDto={setPolicyDto}
          QuoteSave={QuoteSave}
          setQuoteSave={setQuoteSave}
          setCKYCData={setCKYCData}
          handleSet={handleSet}
          handleDateChange={handleDateChange}
          handleChange={handleChange}
          handleDD={handleDD}
          handleSetValue={handleSetValue}
          handleAutoPops={handleAutoPops}
          handelSumInsured={handelSumInsured}
          ratingData={ratingData}
          QuoteData={QuoteData}
          setQuoteData={setQuoteData}
          HandleDownload={HandleDownload}
          handleClick={handleClick}
          master={master}
          setMaster={setMaster}
          flag={flag}
          setCalculatePremium={setCalculatePremium}
          calculatePremium={calculatePremium}
          setPremStructure={setPremStructure}
          premStructure={premStructure}
          valueTab={valueTab}
          setValuetab={setValuetab}
          handleNext={handleNext}
          setFlag={setFlag}
          setQ3={setQ3}
          q3={q3}
          setQ2={setQ2}
          q2={q2}
          tSIVal1={tSIVal1}
          tSIVal2={tSIVal2}
          tSIVal3={tSIVal3}
          tSIVal4={tSIVal4}
          settSIVal1={settSIVal1}
          settSIVal2={settSIVal2}
          settSIVal3={settSIVal3}
          settSIVal4={settSIVal4}
          disableFlag={disableFlag}
          setDisableFlag={setDisableFlag}
          setShowButton={setShowButton}
          showButton={showButton}
        />
      );
    case 1:
      return (
        <ProposerDetailsData
          setDate={setDate}
          datetoShow={datetoShow}
          QuoteSave={QuoteSave}
          setQuoteSave={setQuoteSave}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
          valueTab={valueTab}
          handleDateChange={handleDateChange}
          handleNext={handleNext}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          QuoteNumber={QuoteNumber}
          handleSetValue={handleSetValue}
          handleOdSET={handleOdSET}
          salutationData={salutationData}
          commonObj={commonObj}
          handleSetPincode={handleSetPincode}
          permAddress={permAddress}
          handleSetPermPinCode={handleSetPermPinCode}
          flag={flag}
          pinLoad={pinLoad}
          pinPermLoad={pinPermLoad}
          handleSet={handleSet}
          HandleDownload={HandleDownload}
          BGRsendPolicyPdf={BGRsendPolicyPdf}
          BGRQuoteMail={BGRQuoteMail}
          handleClick={handleClick}
          handleDD={handleDD}
          handleproposal={handleproposal}
          handlepolicy={handlepolicy}
          master={master}
          setMaster={setMaster}
          QuoteData={QuoteData}
          ProposalFlag={ProposalFlag}
          setPinLoad={setPinLoad}
          setCommonObj={setCommonObj}
          setPinPermLoad={setPinPermLoad}
          callDistrict={callDistrict}
          setPermAddress={setPermAddress}
          setProposalFlag={setProposalFlag}
          setProposalData={setProposalData}
          handleBack={handleBack}
          setOTP={setOTP}
          OTP={OTP}
          setCheckInsurance={setCheckInsurance}
          checkInsurance={checkInsurance}
          setCheckDisclaimer={setCheckDisclaimer}
          checkDisclaimer={checkDisclaimer}
          checkProposalConsent={checkProposalConsent}
          setCheckProposalConsent={setCheckProposalConsent}
          setDocUpload={setDocUpload}
          docUpload={docUpload}
          pStartDate={pStartDate}
          setPolEndDate={setPolEndDate}
          setPolStartDate={setPolStartDate}
          pEndDate={pEndDate}
          loadingflag={loadingflag}
          setloadingflag={setloadingflag}
          setShowButton={setShowButton}
          showButton={showButton}
          kycDate={kycDate}
          setKycDate={setKycDate}
          kycSecDisable={kycSecDisable}
          setKYCSecDisable={setKYCSecDisable}
          counter={counter}
          setCounter={setCounter}
          startCounterFlag={startCounterFlag}
          setStartCounterFlag={setStartCounterFlag}
          timerFlag={timerFlag}
          setTimerFlag={setTimerFlag}
          sendOtpFlag={sendOtpFlag}
          setSendOtpFlag={setSendOtpFlag}
          status={status}
          setStatus={setStatus}
          CKYCData={CKYCData}
          setCKYCData={setCKYCData}
          CKYCStatus={CKYCStatus}
          setCKYCStatus={setCKYCStatus}
          CKYCReqJSon={CKYCReqJSon}
          setCKYCReqJson={setCKYCReqJson}
          CkycEmailFlag={CkycEmailFlag}
          setCkycEmailFlag={setCkycEmailFlag}
          IdType={IdType}
          setIdType={setIdType}
        />
      );
    case 2:
      return (
        <PaymentDetailsPage
          valueTab={valueTab}
          QuoteSave={QuoteSave}
          setQuoteSave={setQuoteSave}
          handleNext={handleNext}
          PolicyDto={PolicyDto[valueTab]}
          QuoteNumber={QuoteNumber}
          setPolicyDto={setPolicyDto}
          handleSetPolicy={handleSetPolicy}
          handleSetValue={handleSetValue} // now only added 21-11-2022
          handleDateChange={handleDateChange} // now only added
          paymentCall={paymentCall}
          HandleDownload={HandleDownload}
          BGRsendPolicyPdf={BGRsendPolicyPdf}
          BGRQuoteMail={BGRQuoteMail}
          handleClick={handleClick}
          handleproposal={handleproposal}
          handlepolicy={handlepolicy}
          QuoteData={QuoteData}
          ProposalData={ProposalData}
          handleBack={handleBack}
          master={master[valueTab]}
          CKYCStatus={CKYCStatus}
          setCKYCStatus={setCKYCStatus}
          showButton={showButton}
          setShowButton={setShowButton}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      );
    default:
      return "Unknown step"; // + { step };
  }
}

GetStepContent.defaultProps = {
  step: 0,
  handleNext: {},
};

GetStepContent.propTypes = {
  step: PropTypes.number,
  handleNext: PropTypes.func,
};
function HorizontalLinearStepper({
  stepPar,
  PolicyDto,
  QuoteNumber,
  setPolicyDto,
  showButton,
  setShowButton,
  setCkycUpdateJson,
  CkycUpdateJson,
  // paymentHandler,
  handleSetValue,
  handleOdSET,
  handleSet,
  salutationData,
  handleDateChange,
  handleChange,
  handleDD,
  commonObj,
  handleSetPincode,
  permAddress,
  handleSetPermPinCode,
  ratingData,
  QuoteData,
  setQuoteData,
  ProposalData,
  PolicyNumberData,
  pinLoad,
  pinPermLoad,
  handleAutoPops,
  HandleDownload,
  handelSumInsured,
  handleClick,
  handleproposal,
  handlepolicy,
  master,
  setMaster,

  setCalculatePremium,
  calculatePremium,
  setPinLoad,
  setCommonObj,
  setPinPermLoad,
  callDistrict,
  setPremStructure,
  premStructure,
  valueTab,
  setValuetab,
  setPermAddress,
  setProposalData,
  setOTP,
  OTP,
  setCheckDisclaimer,
  checkDisclaimer,
  checkInsurance,
  setCheckInsurance,
  checkProposalConsent,
  setCheckProposalConsent,
  setQ3,
  q3,
  setQ2,
  q2,
  setDocUpload,
  docUpload,
  pStartDate,
  setPolEndDate,
  setPolStartDate,
  pEndDate,
  // loadingflag,
  // setloadingflag,

  kycDate,
  setKycDate,
  kycSecDisable,
  setKYCSecDisable,
  counter,
  setCounter,
  startCounterFlag,
  setStartCounterFlag,
  timerFlag,
  setTimerFlag,
  sendOtpFlag,
  setSendOtpFlag,
  status,
  setStatus,
  CKYCData,
  setCKYCData,
  CKYCStatus,
  setCKYCStatus,
  CKYCReqJSon,
  setCKYCReqJson,
  CkycEmailFlag,
  setCkycEmailFlag,
  IdType,
  setIdType,
  setDate,
  datetoShow,
  disableFlag,
  setDisableFlag,
}) {
  console.log("data", PolicyDto);
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  console.log("activeStep", activeStep);
  const [skipped, setSkipped] = useState(new Set());
  const [flag, setFlag] = useState(false);
  const [ProposalFlag, setProposalFlag] = useState(false);
  const [loadingflag, setloadingflag] = useState(false);
  const [disable, setDisable] = useState(false);
  // const [showButton, setShowButton] = useState(false);
  const [tSIVal1, settSIVal1] = useState(false);
  const [tSIVal2, settSIVal2] = useState(false);
  const [tSIVal3, settSIVal3] = useState(false);
  const [tSIVal4, settSIVal4] = useState(false);
  const [QuoteSave, setQuoteSave] = useState([]);
  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);
  // const [showButton, setShowButton] = useState(false);

  // const handleNext = async (event) => {
  //   debugger;
  //   console.log("123456",PolicyDto,Array.isArray(PolicyDto));
  //   const filerArray = Array.isArray(PolicyDto) ? PolicyDto.filter((x,i)=> i === valueTab)[0] : PolicyDto
  //   setPolicyDto(filerArray);
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }
  //   if (activeStep === 0) {
  //     console.log("callPremium",PolicyDto);
  //     setFlag(true);
  //     if (filerArray.permiumamount !== "") {
  //       setFlag(false);
  //       setloadingflag(false);
  //       // console.log("Save Quotation Called");
  //       setFlag(true);
  //       await callSaveQuoteData(filerArray);
  //     }

  //     //
  //     if (
  //       filerArray["Business Type"] === "" ||
  //       filerArray.InsurableItem[0].RiskItems[0]["Additional Parameter"] === "" ||
  //       filerArray.ProposalData["First Name"] === "" ||
  //       filerArray.ProposalData["Last Name"] === "" ||
  //       filerArray.ProposalData["Email ID"] === "" ||
  //       filerArray.ProposalData["Mobile Number"] === "" ||
  //       filerArray["Customer Category"] === "" ||
  //       filerArray.InsurableItem[0].RiskItems[0]["Year of Construction(Age of Building)"] === "" ||
  //       filerArray.InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"] === "" ||
  //       filerArray.InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] === "" ||
  //       filerArray.InsurableItem[0].RiskItems[0]["Does the Building have a basement ?"] === "" ||
  //       //  PolicyDto.InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] === ""
  //       filerArray.InsurableItem[0].RiskItems[0]["Do you want to take Personal Accident cover?"] ===
  //         "" ||
  //         filerArray.InsurableItem[0].RiskItems[0]["Past Claims Experience of the Risk(%)"] === "" ||
  //         filerArray["Occupying the premises"] === "" ||
  //         filerArray["Cover Type"] === ""
  //     ) {
  //       // setFlag((prevState) => ({ ...prevState, errorFlag: true }));
  //       setFlag(true);
  //       swal({
  //         icon: "error",
  //         // text: "Please select the Additional Parameter",
  //         text: "Please select the required fileds* ",
  //         button: "OK",
  //       });
  //     } else if (filerArray.InsurableItem[0].RiskItems[0]["Additional Parameter"] === "NO") {
  //       if (filerArray["Occupying the premises"] === "Landlord") {
  //         if (
  //           filerArray.InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] === "YES"
  //         ) {
  //           if (
  //             filerArray.InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === "" ||
  //             filerArray.InsurableItem[0].RiskItems[0]["Rent Per Month"] === ""
  //           ) {
  //             setFlag(true);
  //             swal({
  //               icon: "error",
  //               // text: "Please select the Additional Parameter",
  //               text: "Please select the required fileds* ",
  //               button: "OK",
  //             });
  //           }
  //         } else if (
  //           filerArray.InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] === "NO"
  //         ) {
  //           if (
  //             filerArray.InsurableItem[0].RiskItems[0][
  //               "Do you want to cover Rent for Alternative Accommodation ?"
  //             ] === "YES"
  //           ) {
  //             if (
  //               filerArray.InsurableItem[0].RiskItems[0][
  //                 "Rent for Alternative Accommodation(Months)"
  //               ] === "" ||
  //               filerArray.InsurableItem[0].RiskItems[0]["Rent Per Month"] === ""
  //             ) {
  //               setFlag(true);
  //               swal({
  //                 icon: "error",
  //                 // text: "Please select the Additional Parameter",
  //                 text: "Please select the required fileds* ",
  //                 button: "OK",
  //               });
  //             }
  //           }
  //         }
  //       }
  //     } else {
  //       debugger;
  //       console.log(event);
  //       setFlag((prevState) => ({ ...prevState, errorFlag: false })); // recent change
  //       // setFlag(true);
  //       // HandleDownload(); // 07122022
  //       if (QuoteData !== "") {
  //         HandleDownload(QuoteData.quotation.quoteNo);
  //       }
  //       handleClick(); // 07122022
  //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //       setSkipped(newSkipped);
  //       // setFlag(true);
  //       // setloadingflag(true);
  //       // await callPremiumData();
  //       // console.log("111", PolicyDto.permiumamount);
  //       // if (PolicyDto.permiumamount !== "") {
  //       //   setFlag(false);
  //       //   setloadingflag(false);
  //       //   // console.log("Save Quotation Called");
  //       //   setFlag(true);
  //       //   await callSaveQuoteData();
  //       // }
  //     }
  //     setSkipped(newSkipped); // recent changes
  //     console.log("callPremium");

  //     // setSkipped(newSkipped);
  //   }
  //   // if (activeStep === 1) {
  //   //   console.log("Save Quotation Called");
  //   //   setFlag(true);
  //   //   // await callSaveQuoteData();

  //   //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   //   setSkipped(newSkipped);

  //   //   // if (PolicyDto.permiumamount !== "") {
  //   //   //   setFlag(false);
  //   //   //   setloadingflag(false);
  //   //   //   console.log("Save Quotation Called");
  //   //   //   setFlag(true);
  //   //   //   await callSaveQuoteData();
  //   //   // }

  //   //   // swal({
  //   //   //   text: `Quote created successfully ${QuoteData.quotation.quoteNo}`,
  //   //   //   html: true,
  //   //   //   icon: "success",
  //   //   // });
  //   // }
  //   // if (activeStep === 1) {
  //   //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   //   setSkipped(newSkipped);
  //   // }
  //   if (activeStep === 1) {
  //     console.log("Save Proposal Called");

  //     setFlag(true);
  //     setloadingflag(true);
  //     await callSaveProposalData();
  //     console.log("callRazorpay");
  //     setloadingflag(false);
  //     if (
  //       PolicyDto.ProposalData["First Name"] === "" ||
  //       PolicyDto.ProposalData["Last Name"] === "" ||
  //       // PolicyDto.ProposalData["GST Number"] === "" ||
  //       PolicyDto.ProposalData["Date of Birth"] === "" ||
  //       PolicyDto.ProposalData["Email ID"] === "" ||
  //       PolicyDto.ProposalData["Mobile Number"] === "" ||
  //       // PolicyDto.ProposalData["PAN Number"] === "" ||
  //       PolicyDto.ProposalData.CommunicationAddress.Address1 === "" ||
  //       // PolicyDto.PinCode === "" ||
  //       PolicyDto.ProposalData.autoFill === "" ||
  //       PolicyDto.ProposalData["Nominee First Name"] === "" ||
  //       PolicyDto.ProposalData["Nominee Last Name"] === "" ||
  //       // PolicyDto.ProposalData["Appointee Name"] === "" ||
  //       // PolicyDto.["Customer Type"] === "" ||
  //       PolicyDto.OtherDetails[0].FinancierInterest[0][
  //         "Is Home owned through hire/purchase/lease agreement?"
  //       ] === "" ||
  //       // PolicyDto.ProposalData["Nominee Title"] === "" ||
  //       // PolicyDto.ProposalData["Nominee Gender"] === "" ||
  //       // PolicyDto.ProposalData["Relationship with Proposer"] === ""
  //       PolicyDto.ProposalData.Salutation === "" ||
  //       PolicyDto.ProposalData.PinCode === ""
  //     ) {
  //       // setFlag((prevState) => ({ ...prevState, errorFlag: true }));
  //       // setFlag(true);
  //       setProposalFlag(true);
  //       swal({
  //         icon: "error",
  //         // text: "Please select the Additional Parameter",
  //         text: "Please select the required fileds* ",
  //         button: "OK",
  //       });

  //     } else {
  //       // setFlag((prevState) => ({ ...prevState, errorFlag: false })); // now changed
  //       // paymentHandler();
  //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     }
  //     setSkipped(newSkipped);
  //   }
  //   if (activeStep === 2) {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     setSkipped(newSkipped);
  //   }
  //   // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);
  const CustomStepper = styled(Stepper)(({ theme }) => ({
    "& .MuiStepLabel-labelContainer": {
      fontSize: theme.fontStyle.fontSize,
    },
    ".MuiSvgIcon-root.Mui-completed": {
      color: "green",
    },
  }));
  const theme = createTheme({
    fontStyle: {
      fontSize: "30px",
    },
    palette: {
      primary: {
        main: "#c70825",
      },
    },
  });

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const { search } = useLocation();
  const proposalNumber = new URLSearchParams(search).get("proposernum");
  useEffect(async () => {
    if (proposalNumber !== null) {
      await GetProposalByNumber(proposalNumber).then((result) => {
        console.log("response", result.data[0].policyDetails);
        console.log("response", result);
        setCkycUpdateJson((prevState) => ({
          ...prevState,
          uniqueTransactionNumber: result.data[0].policyDetails.CkycDetails.uniqueTransactionNumber,
        }));
        const newQuoteSave = result.data[0].policyDetails;
        const updatedQuoteSave = [...QuoteSave];
        updatedQuoteSave[valueTab] = newQuoteSave;
        setCKYCData(result.data[0].policyDetails.CkycDetails);
        setQuoteSave(updatedQuoteSave);
        setPolicyDto([result.data[0].policyDetails]);

        setActiveStep(1);
      });
    }
  }, []);

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [Fetchdata] = useState(Policysearch);
  useEffect(async () => {
    const query = new URLSearchParams(search);
    const SearchQuoteNumber = query.get("QuotationNo");
    const SearchPolicyNumber = query.get("PolicyNo");

    if (SearchQuoteNumber) {
      const QuoteResp = await (await GetProposalDetailsByQuoteNumber(SearchQuoteNumber)).data;
      console.log("Number", SearchQuoteNumber);
      console.log("proposalResp", QuoteResp);
      setActiveStep(2);
      setPolicyDto({ ...QuoteResp.quotationDetail });
      PolicyDto({ ...QuoteResp.quotationDetail });
      console.log("newdata", PolicyDto);
    }
    if (SearchPolicyNumber) {
      Fetchdata.policynumber = SearchPolicyNumber;
      console.log("FetchPolicy", Fetchdata);
      const QuoteResp = await (await GetProposalDetailsByPolicyNumber(SearchPolicyNumber)).data;
      setActiveStep(3);
      setDisable(true);
      setPolicyDto({ ...QuoteResp });
      console.log("FetchPolicy", QuoteResp);
    }
  }, []);

  return (
    <MDBox px={3}>
      <MDTypography align="left" display="block" variant="h4" ml={2} mt={2}>
        Bharat Griha Raksha
      </MDTypography>
      <MDBox xs={{ bgcolor: "background.paper" }} m={5}>
        <ThemeProvider theme={theme}>
          <CustomStepper sx={{ ml: "15%", mr: "15%", mt: "3%" }} activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                // labelProps.optional = (
                //   // <MDTypography variant="caption">Optional</MDTypography>
                // );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps} sx={{ flexDirection: "column", fontSize: 6 }}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </CustomStepper>
        </ThemeProvider>
      </MDBox>
      {activeStep === steps.length ? (
        <>
          {/* <MDTypography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </MDTypography> */}
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDBox sx={{ flex: "1 1 auto" }} />
            <MDButton onClick={handleReset}>Reset</MDButton>
          </MDBox>
        </>
      ) : (
        <>
          {/* <MDTypography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</MDTypography> */}
          <GetStepContent
            step={activeStep}
            handleNext={handleNext}
            CkycUpdateJson={CkycUpdateJson}
            setCkycUpdateJson={setCkycUpdateJson}
            PolicyDto={PolicyDto}
            QuoteNumber={QuoteNumber}
            setPolicyDto={setPolicyDto}
            QuoteSave={QuoteSave}
            setQuoteSave={setQuoteSave}
            handleSetValue={handleSetValue}
            handleOdSET={handleOdSET}
            handleSet={handleSet}
            salutationData={salutationData}
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            // handleSet1={handleSet1}
            commonObj={commonObj}
            handleSetPincode={handleSetPincode}
            permAddress={permAddress}
            handleSetPermPinCode={handleSetPermPinCode}
            ratingData={ratingData}
            QuoteData={QuoteData}
            setQuoteData={setQuoteData}
            ProposalData={ProposalData}
            PolicyNumberData={PolicyNumberData}
            flag={flag}
            pinLoad={pinLoad}
            pinPermLoad={pinPermLoad}
            handleAutoPops={handleAutoPops}
            handleDD={handleDD}
            HandleDownload={HandleDownload}
            BGRsendPolicyPdf={BGRsendPolicyPdf}
            BGRQuoteMail={BGRQuoteMail}
            handelSumInsured={handelSumInsured}
            handleClick={handleClick}
            handleproposal={handleproposal}
            handlepolicy={handlepolicy}
            loadingflag={loadingflag}
            setShowButton={setShowButton}
            showButton={showButton}
            master={master}
            setMaster={setMaster}
            ProposalFlag={ProposalFlag}
            setCalculatePremium={setCalculatePremium}
            calculatePremium={calculatePremium}
            setPinLoad={setPinLoad}
            setCommonObj={setCommonObj}
            setPinPermLoad={setPinPermLoad}
            callDistrict={callDistrict}
            setPremStructure={setPremStructure}
            premStructure={premStructure}
            valueTab={valueTab}
            setValuetab={setValuetab}
            setFlag={setFlag}
            setPermAddress={setPermAddress}
            setProposalFlag={setProposalFlag}
            setProposalData={setProposalData}
            handleBack={handleBack}
            setloadingflag={setloadingflag}
            disable={disable}
            setOTP={setOTP}
            OTP={OTP}
            setCheckDisclaimer={setCheckDisclaimer}
            checkDisclaimer={checkDisclaimer}
            checkInsurance={checkInsurance}
            setCheckInsurance={setCheckInsurance}
            checkProposalConsent={checkProposalConsent}
            setCheckProposalConsent={setCheckProposalConsent}
            setQ3={setQ3}
            q3={q3}
            setQ2={setQ2}
            q2={q2}
            setDocUpload={setDocUpload}
            docUpload={docUpload}
            pStartDate={pStartDate}
            setPolEndDate={setPolEndDate}
            setPolStartDate={setPolStartDate}
            pEndDate={pEndDate}
            kycDate={kycDate}
            setKycDate={setKycDate}
            kycSecDisable={kycSecDisable}
            setKYCSecDisable={setKYCSecDisable}
            counter={counter}
            setCounter={setCounter}
            startCounterFlag={startCounterFlag}
            setStartCounterFlag={setStartCounterFlag}
            timerFlag={timerFlag}
            setTimerFlag={setTimerFlag}
            sendOtpFlag={sendOtpFlag}
            setSendOtpFlag={setSendOtpFlag}
            status={status}
            setStatus={setStatus}
            CKYCData={CKYCData}
            setCKYCData={setCKYCData}
            CKYCStatus={CKYCStatus}
            setCKYCStatus={setCKYCStatus}
            CKYCReqJSon={CKYCReqJSon}
            setCKYCReqJson={setCKYCReqJson}
            CkycEmailFlag={CkycEmailFlag}
            setCkycEmailFlag={setCkycEmailFlag}
            IdType={IdType}
            setIdType={setIdType}
            setDate={setDate}
            datetoShow={datetoShow}
            tSIVal1={tSIVal1}
            tSIVal2={tSIVal2}
            tSIVal3={tSIVal3}
            tSIVal4={tSIVal4}
            settSIVal1={settSIVal1}
            settSIVal2={settSIVal2}
            settSIVal3={settSIVal3}
            settSIVal4={settSIVal4}
            disableFlag={disableFlag}
            setDisableFlag={setDisableFlag}
          />
          {/* <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDButton
              color="primary"
              disabled={activeStep === 0 || disable}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </MDButton>
            <MDBox sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <MDButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </MDButton>
            )}

            <MDButton disabled={disable} onClick={handleNext}>
              {activeStep === steps.length - 2 ? "Finish" : "Next"}
            </MDButton>
            <Backdrop
              sx={{ color: "#ff0000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loadingflag}
            >
              <CircularProgress />
            </Backdrop>
          </MDBox> */}
        </>
      )}
    </MDBox>
  );
}

function HomeInsurance() {
  const [refNo, setrefNo] = useState();
  const [PolicyDto, setPolicyDto] = useState(data);
  const [disableFlag, setDisableFlag] = useState(false);
  console.log("PolicyDto", PolicyDto);
  const [salutationData, setSalutationData] = useState([]);
  const [QuoteNumber] = useState([]);
  const [ProposalData, setProposalData] = useState({});
  const [PolicyNumberData, setPolicyData] = useState("");
  const [, dispatch] = useDataController();
  const [showButton, setShowButton] = useState(false);
  const [QuoteSave, setQuoteSave] = useState([]);
  const [commonObj, setCommonObj] = useState({
    Comm: {
      district: "",
      state: "",
    },
    permanent: {
      district: "",
      state: "",
    },
    risk: {
      district: "",
      state: "",
    },
  });

  const [master, setMaster] = useState({
    PolicyTenure: { mID: "", mValue: "" },
    CustomerCategory: { mID: "", mValue: "" },
    CustomerType: { mID: "", mValue: "" },
    ProposalType: { mID: "", mValue: "" },
    CommunicationAddressStatePropertyState: { mID: "", mValue: "" },
    YearofConstruction: { mID: "", mValue: "" },
    RentforAlternative: { mID: "", mValue: "" },
    LossOfRent: { mID: "", mValue: "" },
    TypeofConstruction: { mID: "", mValue: "" },
    Housekeeping: { mID: "", mValue: "" },
    RiskTerrain: { mID: "", mValue: "" },
    PastClaimsExperience: { mID: "", mValue: "" },
    Salutation: { mID: "", mValue: "" },
    NomineeGender: { mID: "", mValue: "" },
    NomineeTitle: { mID: "", mValue: "" },
    RelationshipwithNominee: { mID: "", mValue: "" },
    Relationshipwithproposer: { mID: "", mValue: "" },
    SelectFinanceType: { mID: "", mValue: "" },
    InsuredMemberCovered: { mID: "", mValue: "" },
  });
  const [permAddress, setPermAddress] = useState({
    PinCode: "",
    Address: "",
    State: "",
    District: "",
  });
  const [ratingData, setRatingData] = useState({});
  const [QuoteData, setQuoteData] = useState({});
  const [calculatePremium, setCalculatePremium] = useState(false);
  const [valueTab, setValuetab] = useState(0);
  const [pinLoad, setPinLoad] = useState(false);
  const [pinPermLoad, setPinPermLoad] = useState(false);
  const [premStructure, setPremStructure] = useState({
    "Sum Insured": 0,
    "Base Premium": 0,
    "Terrorism Base": 0,
    "Add On (Premium)": 0,
    "Rent for Accomodation (Premium)": 0,
    "Loss(Terrorism)": 0,
    "Long term": 0,
    "Net Premium": 0,
    "Disc/Loading %": 0,
    "Prem aft Disc": 0,
    "Terrorism Prem": 0,
    "Total Premium": 0,
    SGST: 0,
    CGST: 0,
    "Total with Tax": 0,
    BuildingFireRate: 0,
    BuildingSTFIRate: 0,
    ContentFireRate: 0,
    TotalFireRate: 0,
    TotalSTFIRate: 0,
    BuildingEQRate: 0,
    ContentSTFIRate: 0,
    ContentEQRate: 0,
    TotalEQRate: 0,
    TerrorismRate: 0,
    TotalBaseRate: 0,
    EQExcTerrPremium: 0,
    STFIExcTerrPremium: 0,
    FireExcTerrPremium: 0,
    GCLoadingBasePremiumBGR: 0,
    PAPremium: 0,
    NewBuildingPremium: 0,
    BuildingFirePremium: 0,
    BuildingSTFIPremium: 0,
    BuildingEQPremium: 0,
    NewContentPremium: 0,
    ContentFirePremium: 0,
    ContentSTFIPremium: 0,
    ContentEQPremium: 0,
  });
  const [checkProposalConsent, setCheckProposalConsent] = useState(false);
  const [checkDisclaimer, setCheckDisclaimer] = useState(false);
  const [checkInsurance, setCheckInsurance] = useState(false);
  const [OTP, setOTP] = useState("");
  const [docUpload, setDocUpload] = useState([
    {
      DocName: "",
      DocId: 1,
      DocType: "",
      DocRemarks: "",
      DocFlag: false,
      DocExtension: "",
      DocDate: "",
      DMSDocId: "",
    },
  ]);

  const [pStartDate, setPolStartDate] = useState(new Date());
  const [pEndDate, setPolEndDate] = useState(null);
  const [loadingflag, setloadingflag] = useState(false);
  const [kycDate, setKycDate] = useState(null);
  const [kycSecDisable, setKYCSecDisable] = useState(false);
  const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [timerFlag, setTimerFlag] = useState(false);
  const [sendOtpFlag, setSendOtpFlag] = useState(true);
  const [status, setStatus] = useState(false);
  const [datetoShow, setDate] = useState({
    dateOfBirth: null,
    nomineeDOB: null,
  });
  const [CKYCData, setCKYCData] = useState();
  const [CKYCStatus, setCKYCStatus] = useState("");
  const [CKYCReqJSon, setCKYCReqJson] = useState({
    source: "AVO",
    customerType: "I",
    uniqueTransactionNumber: "AVO/261122/009",
    idNo: "",
    idType: "PAN",
    dob: "",
    mobileNo: "",
    pincode: "",
    cKYCNo: "",
    extraField1: "",
    extraField2: "",
    extraField3: "",
    extraField4: "",
    extraField5: "",
  });
  // const navigate = useNavigate();
  const [CkycEmailFlag, setCkycEmailFlag] = useState(true);
  // const [CkycIdType,SetCkycIdType] = useState(false);
  const [IdType, setIdType] = useState({
    PanId: "",
    GSTINId: "",
    CINId: "",
  });

  console.log("PolicyDto", PolicyDto);
  // console.log("PolicyDto", PolicyDto.InsurableItem[0].RiskItems[0]);
  console.log("setPolicyData", setPolicyData);
  useEffect(() => {
    const abc = generateUUID();
    console.log("abc", abc, refNo);

    setrefNo(abc);
    if (false) {
      setLogo(dispatch, "USGILogo");
      setCustTheme(dispatch, "USGILogo");
    }
    // getPincode().then((result) => {
    //   console.log("salutation Called", result);
    //   setPincodeMaster([...result.data[0].mdata]);

    // });

    getSalutation().then((result) => {
      console.log("salutation Called", result);
      setSalutationData([...result.data[0].mdata]);
    });
  }, []);

  const callDistrict = async (dataa) => {
    const dist = await getDistrict(dataa);
    const state = await getState(dist[0].mdata[0].mID);

    return { dist, state };
  };

  // useEffect(async () => {
  //   if (PolicyDto.ProposalData.PinCode.length === 6) {
  //     setPinLoad(true);
  //     // if(PolicyDto.ProposalData.District===0 || PolicyDto.ProposalData.State===0){
  //     //   <CircularProgress />
  //     // }

  //     const abc = await callDistrict(PolicyDto.ProposalData.PinCode);

  //     console.log("abc", abc);
  //     PolicyDto.ProposalData.District = abc.dist[0].mdata[0].mID;
  //     PolicyDto.ProposalData.State = abc.state[0].mdata[0].mID;
  //     commonObj.Comm.district = abc.dist[0].mdata[0].mValue;
  //     commonObj.Comm.state = abc.state[0].mdata[0].mValue;
  //     setCommonObj({ ...commonObj });
  //     setPolicyDto(PolicyDto);
  //   } else {
  //     setPinLoad(false);
  //   }
  // }, [PolicyDto.ProposalData.PinCode]);

  // useEffect(async () => {
  //   if (permAddress.PinCode.length === 6) {
  //     setPinPermLoad(true);
  //     const abc = await callDistrict(permAddress.PinCode);
  //     console.log("abc", abc);
  //     //  PolicyDto.ProposalData.District=abc.dist[0].mdata[0].mID;
  //     //  PolicyDto.ProposalData.State=abc.state[0].mdata[0].mID;
  //     commonObj.permanent.district = abc.dist[0].mdata[0].mValue;
  //     commonObj.permanent.state = abc.state[0].mdata[0].mValue;
  //     setCommonObj({ ...commonObj });
  //     // setPolicyDto(PolicyDto);
  //   } else {
  //     setPinPermLoad(false);
  //   }
  // }, [permAddress.PinCode]);

  const callPremiumData = async () => {
    await callPremiumMethod(PolicyDto).then((result) => {
      console.log("Premium Called", result);

      if (result.status === 1) {
        PolicyDto.permiumamount = result.finalResult.FinalPremium;
        setRatingData({ ...result.finalResult });
        setPolicyDto(PolicyDto);
        // swal({
        //   text: result.data.finalResult.responseMessage,
        //   html: true,
        //   icon: "success",
        // });
      }
    });
  };

  const callSaveQuoteData = async () => {
    console.log("1234567890", PolicyDto);
    await callSaveQuoteMethod(PolicyDto).then((result) => {
      console.log("Quotation Saved", result.data.quotation.quoteNo);
      console.log("Swal", result.status);

      if (result.status === 200) {
        setPolicyDto(PolicyDto);

        swal({
          text: `Quote Saved Successfully ${result.data.quotation.quoteNo}`,
          html: true,
          icon: "success",
        });
      }

      setQuoteData({ ...result.data });
    });
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
  const HandleDownload = async (quoteNo) => {
    console.log("quoteNumber", quoteNo);
    const downloadDTO = {
      key: quoteNo,
      templateId: 78,
      referenceId: "",
    };

    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, quoteNo);
      }
    });
  };

  const callSaveProposalData = async () => {
    await callSaveProposalMethod(PolicyDto).then((result) => {
      console.log("Proposal Saved", result);
      console.log("Proposal Saved", result.data.proposalNumber);
      if (result.status === 1) {
        setPolicyDto(PolicyDto);
      }

      setProposalData({ ...result.data });
      console.log("Proposalll", ProposalData.proposalNumber);
    });
  };

  const handleproposal = async (proposalNumber) => {
    console.log("Proposalll", ProposalData.proposalNumber);
    console.log("proposal", proposalNumber);
    const downloadDTO = {
      key: proposalNumber,
      templateId: 77,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNumber);
      }
    });
  };

  const handleChange = (e, value) => {
    PolicyDto[e.target.id.split("-")[0]] = value.mValue;
    setPolicyDto(PolicyDto);
  };

  const handleDateChange = (e, name) => {
    if (name === "Date of Birth") {
      console.log("PolicyDto", PolicyDto);
      const today = new Date(e[0].toDateString()).toLocaleDateString();
      let [mm6, dd6, yyyy6] = today.split("/");
      if (mm6 <= 9) {
        mm6 = `0${mm6}`;
      }
      if (dd6 <= 9) {
        dd6 = `0${dd6}`;
      }
      yyyy6 = `${yyyy6}`;
      const ab = `${dd6}-${mm6}-${yyyy6}`;
      PolicyDto.ProposalData[name] = ab;
      setPolicyDto(PolicyDto);
      setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        PolicyDto: prevState.PolicyDto,
      }));
      // } else if (name === "Nominee Date of Birth") {
      //   const today = new Date(e[0].toDateString()).toLocaleDateString();
      //   let [mm6, dd6, yyyy6] = today.split("/");
      //   if (mm6 <= 9) {
      //     mm6 = `0${mm6}`;
      //   }
      //   if (dd6 <= 9) {
      //     dd6 = `0${dd6}`;
      //   }
      //   yyyy6 = `${yyyy6}`;
      //   const ab = `${dd6}-${mm6}-${yyyy6}`;
      //   PolicyDto.ProposalData[name] = ab;
      //   setPolicyDto(PolicyDto);
      //   setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
      //   setPolicyDto((prevState) => ({
      //     ...prevState,
      //     PolicyDto: prevState.PolicyDto,
      //   }));
    } else {
      const today = new Date(e[0].toDateString());
      PolicyDto["Policy Start Date"] = today;

      PolicyDto.ProposalData[e.target.name] = e.target.value; // now only changes

      const date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const mm1 = date1.getMonth().toString();

      const dd1 = date1.getDate().toString();

      if (dd1 === 1 && mm1 === 0) {
        date1.setMonth(11);
      } else {
        date1.setFullYear(date1.getFullYear() + 1);
      }

      date1.setDate(date1.getDate() - 1);

      if (PolicyDto["Policy Tenure"] > 1) {
        const newAdd = PolicyDto["Policy Tenure"] - 1;

        date1.setFullYear(date1.getFullYear() + newAdd);
      }
      if (name === "Policy Start Date") {
        PolicyDto["Policy End Date"] = date1;
      }
      setPolicyDto(PolicyDto);
      setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        PolicyDto: prevState.PolicyDto,
      }));
    }
  };

  const handleSetPermPinCode = (e) => {
    permAddress[e.target.name] = e.target.value;
    setPermAddress({ ...permAddress });
  };
  const handleSetPincode = (e) => {
    PolicyDto.ProposalData[e.target.name] = e.target.value;
    setPolicyDto(PolicyDto);
    if (e.target.value === "Yes") {
      permAddress.Address = PolicyDto.ProposalData.Address;
      // permAddress.District=commonObj.Comm.district
      permAddress.PinCode = PolicyDto.ProposalData.PinCode;
      // permAddress.State=commonObj.Comm.state;
      commonObj.permanent.district = commonObj.Comm.district;
      commonObj.permanent.state = commonObj.Comm.state;
      setPermAddress({ ...permAddress });
    } else {
      permAddress.Address = "";
      permAddress.District = "";
      permAddress.PinCode = "";
      permAddress.State = "";
      commonObj.permanent.district = "";
      commonObj.permanent.state = "";
      setPermAddress({ ...permAddress });
    }
  };

  const handlepolicy = async (policyNo) => {
    console.log("policynumber", policyNo);
    const downloadDTO = {
      key: policyNo,
      templateId: 76,
      referenceId: "",
    };
    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, policyNo);
      }
    });
  };

  const handleSetValue = (e, value) => {
    console.log("set proposer");
    PolicyDto.ProposalData[e.target.name] = e.target.value;

    // if (e.target.id.split("-")[0] === "Salutation") {
    setMaster((prevState) => ({ ...prevState, [e.target.id.split("-")[0]]: value }));
    PolicyDto.ProposalData[e.target.id.split("-")[0]] = value.mID;
    // }
    setPolicyDto(PolicyDto);
  };

  const handleOdSET = (e, value, type) => {
    switch (type) {
      case "financier": {
        PolicyDto.OtherDetails[0].FinancierInterest[0][e.target.name] = e.target.value;
        break;
      }
      case "Eissuance": {
        PolicyDto.OtherDetails[0].EissuanceandOtherDetails[0][e.target.name] = e.target.value;
        break;
      }

      default:
        console.log("wrong choice");
    }
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  };

  const handleDD = (e, value, type) => {
    switch (type) {
      case "base": {
        PolicyDto[e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk": {
        if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
          PolicyDto.InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mID;
          if (value.mID === 1) {
            PolicyDto.InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 500000;
          }
          if (value.mID === 2) {
            PolicyDto.InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
          }
        } else {
          PolicyDto.InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        }
        break;
      }
      case "finance": {
        setMaster((prevState) => ({ ...prevState, SelectFinanceType: value }));
        PolicyDto.OtherDetails[0].FinancierInterest[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      default:
        console.log("wrong choice");
    }

    // PolicyDto[e.target.id.split("-")[0]] = value.mValue;

    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  };

  const handleSet = (e) => {
    console.log("set proposer");

    if (e.target.name === "Policy Tenure") {
      PolicyDto[e.target.name] = e.target.value;
    }
    if (e.target.name === "Business Type") {
      PolicyDto[e.target.name] = e.target.value;
    } else {
      PolicyDto[e.target.name] = e.target.value;
    }
    if (e.target.name === "Do you want to take Personal Accident cover?") {
      PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        PolicyDto.InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = "0";
      }
    } else if (e.target.name === "Do you want to cover additional structure?") {
      PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        PolicyDto.InsurableItem[0].RiskItems[0]["Additional Structure SI"] = "0";
        PolicyDto.InsurableItem[0].RiskItems[0]["Total Building SI"] = "0";
      }
    }
    // else if (e.target.name === "Do you want to cover loss of rent ?") {
    //   PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    //   if (e.target.value === "No") {
    //     PolicyDto.InsurableItem[0].RiskItems[0]["Rent Per Month"] = "0";
    //     PolicyDto.InsurableItem[0].RiskItems[0]["Rent Covered Sum Insured"] = "0";
    //   }
    // } else if (e.target.name === "Do you want to cover Rent for Alternative Accommodation ?") {
    //   PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    //   if (e.target.value === "No") {
    //     PolicyDto.InsurableItem[0].RiskItems[0]["Rent Per Month"] = "0";
    //     PolicyDto.InsurableItem[0].RiskItems[0]["Rent Covered Sum Insured"] = "0";
    //   }
    // }
    // else if (e.target.name === "Furniture, Fixture & Fitting Sum Insured") {
    //   const FurniSumInsValue = /^[0-9]$/;
    //   if (FurniSumInsValue.test(e.target.value) || e.target.value === "") {
    //     PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    //   }

    //   console.log("Furniture", FurniSumInsValue.test(e.target.value));
    //   console.log("val1", e.target.value);
    // } else if (e.target.name === "Electric & Electronic Items Sum Insured") {
    //   const ElectriSumIns = /^[0-9]$/;
    //   if (ElectriSumIns.test(e.target.value) || e.target.value === "") {
    //     PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    //   }

    //   console.log("Electric & Electronic Items Sum Insured", ElectriSumIns.test(e.target.value));
    //   console.log("val", e.target.value);
    // } else if (e.target.name === "Other Sum Insured") {
    //   const OthSumIns = /^[0-9]$/;
    //   if (OthSumIns.test(e.target.value) || e.target.value === "") {
    //     PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    //   }
    // } else if (e.target.name === "Value of Inbuilt content (excluding valuable)") {
    //   const OthSumIns = /^[0-9]$/;
    //   if (OthSumIns.test(e.target.value) || e.target.value === "") {
    //     PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    //   }
    // const electriSI =
    //   PolicyDto.InsurableItem[0].RiskItems[0]["Furniture, Fixture & Fitting Sum Insured"];
    // const FurniSI =
    //   PolicyDto.InsurableItem[0].RiskItems[0]["Electric & Electronic Items Sum Insured"];
    // const OtherSI = PolicyDto.InsurableItem[0].RiskItems[0]["Other Sum Insured"];
    // PolicyDto.InsurableItem[0].RiskItems[0]["Value of Inbuilt content (excluding valuable)"] = electriSI + FurniSI + OtherSI;
    // },
    else if (e.target.name === "Carpet Area (in sq. mts.)") {
      PolicyDto.InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] = (
        PolicyDto.InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"] / 10.76
      ).toFixed(2);
    } else if (e.target.name === "Cost of Construction per Sqmt") {
      PolicyDto.InsurableItem[0].RiskItems[0]["Cost of Construction per Sqmt"] = (
        PolicyDto.InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] * 10.76
      ).toFixed(2);
    } else if (e.target.name === "Total cost of construction/Sum Insured") {
      PolicyDto.InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"] = (
        PolicyDto.InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] *
        PolicyDto.InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"]
      ).toFixed(2);
      PolicyDto.InsurableItem[0].RiskItems[0]["Residential Structure Sum Insured"] =
        PolicyDto.InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"];
    } else {
      PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }

    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  };

  const handleAutoPops = () => {
    PolicyDto.InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] = (
      PolicyDto.InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"] / 10.76
    ).toFixed(2);

    PolicyDto.InsurableItem[0].RiskItems[0]["Cost of Construction"] = (
      PolicyDto.InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] * 10.76
    ).toFixed(2);

    PolicyDto.InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"] = (
      PolicyDto.InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] *
      PolicyDto.InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"]
    ).toFixed(2);

    if (
      PolicyDto.InsurableItem[0].RiskItems[0]["Total Building SI"] === 0 &&
      PolicyDto.InsurableItem[0].RiskItems[0]["Do you want to cover additional structure?"] === "No"
    ) {
      PolicyDto.InsurableItem[0].RiskItems[0]["Residential Structure Sum Insured"] =
        PolicyDto.InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"];
    } else {
      PolicyDto.InsurableItem[0].RiskItems[0]["Total Building SI"] = (
        Number(PolicyDto.InsurableItem[0].RiskItems[0]["Additional Structure SI"]) +
        Number(PolicyDto.InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"])
      ).toFixed(2);

      PolicyDto.InsurableItem[0].RiskItems[0]["Residential Structure Sum Insured"] =
        PolicyDto.InsurableItem[0].RiskItems[0]["Total Building SI"];
    }

    // PolicyDto.InsurableItem[0].RiskItems[0]["Residential Structure Sum Insured"] =
    //   PolicyDto.InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"];

    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  };
  const handelSumInsured = (e, value) => {
    if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
      PolicyDto.InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mID;
      if (value.mID === 1) {
        PolicyDto.InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 500000;
      }
      if (value.mID === 2) {
        PolicyDto.InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
      }
    }
  };
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

  const handleClick = () => {
    BGRQuoteMail(QuoteData.quotation.quoteNo, PolicyDto.ProposalData["Email ID"]);
  };
  const [CkycUpdateJson, setCkycUpdateJson] = useState({
    source: "AVO",
    uniqueTransactionNumber: "AVO/202301052516857",
    extraField1: "",
    extraField2: "",
    extraField3: "",
    extraField4: "",
    extraField5: "",
  });
  // const paymentHandler = () => {
  //   console.log("check2", PolicyDto);
  //   console.log("check1", refNo);
  //   PolicyDto["Reference No"] = refNo;
  //   setPolicyDto(PolicyDto);

  //   const options = {
  //     key: "rzp_test_KK09FiPyLY2aKI",
  //     amount: Math.round(PolicyDto.PremiumDetails["Total with Tax"] * 100),
  //     name: PolicyDto.ProposalData.Name,
  //     description: "Policy Payment",
  //     handler: (response) => {
  //       console.log("response", response);

  //       if (
  //         typeof response.razorpay_payment_id !== "undefined" ||
  //         response.razorpay_payment_id > 1
  //       ) {
  //         // debugger;

  //         console.log("response check", response.razorpay_payment_id);
  //         PolicyDto.Razorpay_Payment_ID = response.razorpay_payment_id;

  //         PolicyDto.Razorpay_Signature = response.razorpay_signature;

  //         setPolicyDto(PolicyDto);
  //         handleSetPolicy();
  //       } else {
  //         swal({
  //           text: "Payment Failed",
  //           icon: "error",
  //           html: true,
  //         });
  //       }
  //     },

  //     prefill: {
  //       name: PolicyDto.ProposalData.Name,
  //       email: PolicyDto.ProposalData["Email ID"],
  //       contact: PolicyDto.ProposalData["Mobile Number"],
  //     },
  //     notes: {
  //       address: "Bangalore",
  //     },
  //     theme: {
  //       color: "blue",
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  //   console.log("rzp", rzp);
  // };
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);
  const { search } = useLocation();
  const step = new URLSearchParams(search).get("step");

  return (
    <MDBox>
      <Card>
        <HorizontalLinearStepper
          stepPar={step}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
          // paymentHandler={paymentHandler}
          QuoteSave={QuoteSave}
          setQuoteSave={setQuoteSave}
          callPremiumData={callPremiumData}
          callSaveQuoteData={callSaveQuoteData}
          callSaveProposalData={callSaveProposalData}
          handleSetValue={handleSetValue}
          handleSet={handleSet}
          salutationData={salutationData}
          QuoteNumber={QuoteNumber}
          handleDateChange={handleDateChange}
          handleChange={handleChange}
          handleSetPincode={handleSetPincode}
          handleDD={handleDD}
          commonObj={commonObj}
          permAddress={permAddress}
          handleSetPermPinCode={handleSetPermPinCode}
          ratingData={ratingData}
          QuoteData={QuoteData}
          setQuoteData={setQuoteData}
          ProposalData={ProposalData}
          PolicyNumberData={PolicyNumberData}
          pinLoad={pinLoad}
          pinPermLoad={pinPermLoad}
          handleAutoPops={handleAutoPops}
          HandleDownload={HandleDownload}
          BGRsendPolicyPdf={BGRsendPolicyPdf}
          BGRQuoteMail={BGRQuoteMail}
          handleClick={handleClick}
          handelSumInsured={handelSumInsured}
          handleproposal={handleproposal}
          handlepolicy={handlepolicy}
          handleOdSET={handleOdSET}
          master={master}
          setShowButton={setShowButton}
          showButton={showButton}
          setMaster={setMaster}
          setCalculatePremium={setCalculatePremium}
          calculatePremium={calculatePremium}
          setPinLoad={setPinLoad}
          setCommonObj={setCommonObj}
          setPinPermLoad={setPinPermLoad}
          callDistrict={callDistrict}
          setPremStructure={setPremStructure}
          premStructure={premStructure}
          valueTab={valueTab}
          setValuetab={setValuetab}
          setPermAddress={setPermAddress}
          setProposalData={setProposalData}
          setOTP={setOTP}
          OTP={OTP}
          setCheckDisclaimer={setCheckDisclaimer}
          checkInsurance={checkInsurance}
          setCheckInsurance={setCheckInsurance}
          checkDisclaimer={checkDisclaimer}
          checkProposalConsent={checkProposalConsent}
          setCheckProposalConsent={setCheckProposalConsent}
          setQ3={setQ3}
          q3={q3}
          setQ2={setQ2}
          q2={q2}
          setDocUpload={setDocUpload}
          docUpload={docUpload}
          pStartDate={pStartDate}
          setPolEndDate={setPolEndDate}
          setPolStartDate={setPolStartDate}
          pEndDate={pEndDate}
          loadingflag={loadingflag}
          setloadingflag={setloadingflag}
          kycDate={kycDate}
          setKycDate={setKycDate}
          kycSecDisable={kycSecDisable}
          setKYCSecDisable={setKYCSecDisable}
          counter={counter}
          setCounter={setCounter}
          startCounterFlag={startCounterFlag}
          setStartCounterFlag={setStartCounterFlag}
          timerFlag={timerFlag}
          setTimerFlag={setTimerFlag}
          sendOtpFlag={sendOtpFlag}
          setSendOtpFlag={setSendOtpFlag}
          status={status}
          setStatus={setStatus}
          CKYCData={CKYCData}
          setCKYCData={setCKYCData}
          CKYCStatus={CKYCStatus}
          setCKYCStatus={setCKYCStatus}
          CKYCReqJSon={CKYCReqJSon}
          setCKYCReqJson={setCKYCReqJson}
          CkycEmailFlag={CkycEmailFlag}
          setCkycEmailFlag={setCkycEmailFlag}
          IdType={IdType}
          setIdType={setIdType}
          setDate={setDate}
          datetoShow={datetoShow}
          disableFlag={disableFlag}
          setDisableFlag={setDisableFlag}
        />
      </Card>
    </MDBox>
  );
}

export default HomeInsurance;
