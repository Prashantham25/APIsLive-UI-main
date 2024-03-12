import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setLogo, setCustTheme, useDataController } from "modules/BrokerPortal/context";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import swal from "sweetalert";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { GetBGRMasters } from "../../Home/data/index";
import PropertyDetails from "./PropertyDetails";
import ProposerDetails from "./ProposerDetails";
import PremiumBreakup from "./PremiumBreakup";
import PaymentDetailsPage from "./PaymentDetails";
import {
  // handleIssuePolicy,
  callPremiumMethod,
  getSalutation,
  getState,
  getDistrict,
  calculateProposal,
  updateProposal,
  SendSMS,
  fetchProfile,
  fetchusername,
  fetchuser,
  GetProposalByNumber,
} from "./data/index";
import data from "./JsonData";
import { postRequest, getRequest } from "../../../../../core/clients/axiosclient";

const steps = ["Specific Voyage Details", "Proposer Details", "Premium Breakup", "Payment Details"];

function generateUUID() {
  const ab = uuid();
  return ab;
}

function GetStepContent({
  step,
  handleNext,
  PolicyDto,
  setPolicyDto,
  handleSetPolicy,
  paymentCall,
  handleSetValue,
  handleSet,
  salutationData,
  handleChange,
  // commonObj,
  handleSetPincode,
  permAddress,
  handleSetPermPinCode,
  ratingData,
  flag,
  flag1,
  setFlag1,
  loadingflag,
  setMaster,
  master,
  setDocUpload,
  docUpload,
  checkProposalConsent,
  setCheckProposalConsent,
  checkDisclaimer,
  setCheckDisclaimer,
  checkInsurance,
  setCheckInsurance,
  OTP,
  setOTP,
  cust,
  setCust,
  flags,
  setFlags,
  setSendOtpFlag,
  sendOtpFlag,
  setTimerFlag,
  timerFlag,
  TransitId,
  setTransitId,
  setCoverOptions,
  CoverOptions,
  profile,
  setProfile,
  Branch,
  setBranch,
  AgentCode,
  setAgentCode,
  startCounterFlag,
  setCounter,
  setStartCounterFlag,
  counter,
  setdropdowndata,
  dropdowndata,
  setProfileInfo,
  ProfileInfo,
  CkycEmailFlag,
  setCkycEmailFlag,
  CKYCData,
  setCKYCData,
  CkycUpdateJson,
  setCkycUpdateJson,
}) {
  switch (step) {
    case 0:
      return (
        <PropertyDetails
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          handleSet={handleSet}
          handleSetPincode={handleSetPincode}
          handleChange={handleChange}
          flag={flag}
          setMaster={setMaster}
          master={master}
          flag1={flag1}
          setFlag1={setFlag1}
          cust={cust}
          setCust={setCust}
          flags={flags}
          setFlags={setFlags}
          setSendOtpFlag={setSendOtpFlag}
          sendOtpFlag={sendOtpFlag}
          setTimerFlag={setTimerFlag}
          timerFlag={timerFlag}
          TransitId={TransitId}
          setTransitId={setTransitId}
          setCoverOptions={setCoverOptions}
          CoverOptions={CoverOptions}
          profile={profile}
          setProfile={setProfile}
          Branch={Branch}
          setBranch={setBranch}
          AgentCode={AgentCode}
          setAgentCode={setAgentCode}
          setCounter={setCounter}
          setStartCounterFlag={setStartCounterFlag}
          counter={counter}
          startCounterFlag={startCounterFlag}
          setdropdowndata={setdropdowndata}
          dropdowndata={dropdowndata}
          ProfileInfo={ProfileInfo}
          setProfileInfo={setProfileInfo}
          CkycEmailFlag={CkycEmailFlag}
          setCkycEmailFlag={setCkycEmailFlag}
          setCKYCData={setCKYCData}
          CKYCData={CKYCData}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      );
    case 1:
      return (
        <ProposerDetails
          handleNext={handleNext}
          PolicyDto={PolicyDto}
          handleSetValue={handleSetValue}
          salutationData={salutationData}
          // commonObj={commonObj}
          flag1={flag1}
          setFlag1={setFlag1}
          loadingflag={loadingflag}
          handleSetPincode={handleSetPincode}
          permAddress={permAddress}
          handleSetPermPinCode={handleSetPermPinCode}
          setPolicyDto={setPolicyDto}
          flag={flag}
          setMaster={setMaster}
          master={master}
          setSendOtpFlag={setSendOtpFlag}
          sendOtpFlag={sendOtpFlag}
          setTimerFlag={setTimerFlag}
          timerFlag={timerFlag}
          TransitId={TransitId}
          setTransitId={setTransitId}
          setCoverOptions={setCoverOptions}
          CoverOptions={CoverOptions}
          profile={profile}
          setProfile={setProfile}
          Branch={Branch}
          setBranch={setBranch}
          setCounter={setCounter}
          setStartCounterFlag={setStartCounterFlag}
          counter={counter}
          startCounterFlag={startCounterFlag}
          setdropdowndata={setdropdowndata}
          dropdowndata={dropdowndata}
          ProfileInfo={ProfileInfo}
          setProfileInfo={setProfileInfo}
          CkycEmailFlag={CkycEmailFlag}
          setCkycEmailFlag={setCkycEmailFlag}
          setCKYCData={setCKYCData}
          CKYCData={CKYCData}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      );
    case 2:
      return (
        <PremiumBreakup
          handleNext={handleNext}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          ratingData={ratingData}
          setMaster={setMaster}
          master={master}
          setDocUpload={setDocUpload}
          docUpload={docUpload}
          checkProposalConsent={checkProposalConsent}
          setCheckProposalConsent={setCheckProposalConsent}
          checkDisclaimer={checkDisclaimer}
          setCheckDisclaimer={setCheckDisclaimer}
          checkInsurance={checkInsurance}
          setCheckInsurance={setCheckInsurance}
          OTP={OTP}
          setOTP={setOTP}
          flag={flag}
          setSendOtpFlag={setSendOtpFlag}
          sendOtpFlag={sendOtpFlag}
          setTimerFlag={setTimerFlag}
          timerFlag={timerFlag}
          TransitId={TransitId}
          setTransitId={setTransitId}
          setCoverOptions={setCoverOptions}
          CoverOptions={CoverOptions}
          profile={profile}
          setProfile={setProfile}
          Branch={Branch}
          setBranch={setBranch}
          setCounter={setCounter}
          setStartCounterFlag={setStartCounterFlag}
          counter={counter}
          startCounterFlag={startCounterFlag}
          setdropdowndata={setdropdowndata}
          dropdowndata={dropdowndata}
          ProfileInfo={ProfileInfo}
          setProfileInfo={setProfileInfo}
          CkycEmailFlag={CkycEmailFlag}
          setCkycEmailFlag={setCkycEmailFlag}
          setCKYCData={setCKYCData}
          CKYCData={CKYCData}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      );
    case 3:
      return (
        <PaymentDetailsPage
          handleNext={handleNext}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          handleSetPolicy={handleSetPolicy}
          paymentCall={paymentCall}
          setSendOtpFlag={setSendOtpFlag}
          sendOtpFlag={sendOtpFlag}
          setTimerFlag={setTimerFlag}
          timerFlag={timerFlag}
          TransitId={TransitId}
          setTransitId={setTransitId}
          setCoverOptions={setCoverOptions}
          CoverOptions={CoverOptions}
          profile={profile}
          setProfile={setProfile}
          Branch={Branch}
          setBranch={setBranch}
          setCounter={setCounter}
          setStartCounterFlag={setStartCounterFlag}
          counter={counter}
          startCounterFlag={startCounterFlag}
          setdropdowndata={setdropdowndata}
          dropdowndata={dropdowndata}
          ProfileInfo={ProfileInfo}
          setProfileInfo={setProfileInfo}
          CkycEmailFlag={CkycEmailFlag}
          setCkycEmailFlag={setCkycEmailFlag}
          setCKYCData={setCKYCData}
          CKYCData={CKYCData}
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
  setPolicyDto,
  // paymentHandler,
  callPremiumData,
  callProposal,
  handleSetValue,
  handleSet,
  salutationData,
  handleDateChange,
  handleChange,
  commonObj,
  handleSetPincode,
  permAddress,
  handleSetPermPinCode,
  ratingData,
  setMaster,
  master,
  setDocUpload,
  docUpload,
  checkProposalConsent,
  setCheckProposalConsent,
  checkDisclaimer,
  setCheckDisclaimer,
  checkInsurance,
  setCheckInsurance,
  setSendOtpFlag,
  sendOtpFlag,
  OTP,
  setOTP,
  setTimerFlag,
  timerFlag,
  TransitId,
  setTransitId,
  setCoverOptions,
  CoverOptions,
  profile,
  setProfile,
  Branch,
  setBranch,
  AgentCode,
  setAgentCode,
  startCounterFlag,
  setCounter,
  setStartCounterFlag,
  counter,
  setdropdowndata,
  dropdowndata,
  flag1,
  setFlag1,
  CkycEmailFlag,
  setCkycEmailFlag,
  CKYCData,
  setCKYCData,
  CkycUpdateJson,
  setCkycUpdateJson,
}) {
  console.log("data", PolicyDto);
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  console.log("activeStep", activeStep);
  const [skipped, setSkipped] = useState(new Set());
  const [flag, setFlag] = useState(false);
  const [cust, setCust] = useState({
    phoneno: "",
    NumberError: false,
    PinCodeError: false,
    PAN: "",
  });
  const [flags, setFlags] = useState({
    errorFlag: false,
    // erroremailFlag: false,
    emailflag: false,
    gstflag: false,
    panflag: false,
    // errorFlag: true,
  });

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
  const masterArray = master;
  const { search } = useLocation();
  const proposalNumber1 = new URLSearchParams(search).get("proposalno");
  // console.log("propnumber", proposalNumber1);
  const formatDate1 = (date) => {
    const input = date;
    const [day, month, year] = input.split("/");
    return `${month}/${day}/${year}`;
  };
  const [ProfileInfo, setProfileInfo] = useState([]);

  useEffect(async () => {
    if (proposalNumber1 !== null) {
      await GetProposalByNumber(proposalNumber1).then(async (result) => {
        setAgentCode(result.data[0].policyDetails["Agent Id"]);
        const result11 = await fetchusername(`${localStorage.getItem("userId")}`);
        const uname = result11.data.userName;
        masterArray.uname = result11.data.userName;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        const result123 = await fetchProfile(
          result.data[0].policyDetails["Agent Id"],
          uname,
          result.data[0].policyDetails.BranchName,
          result.data[0].policyDetails.ProfileType,
          result.data[0].policyDetails.BranchCode
        );
        setCkycEmailFlag(true);
        setdropdowndata(result123.data[0]);
        masterArray["Policy Start Date"] = formatDate1(
          result.data[0].policyDetails.ProposerDetails["Policy Start Date"]
        );
        masterArray["Invoice Date"] = formatDate1(result.data[0].policyDetails["Invoice Date"]);
        masterArray["Policy End Date"] = formatDate1(
          result.data[0].policyDetails.ProposerDetails["Policy End Date"]
        );
        masterArray["Type of Policy"] = result.data[0].policyDetails["Type of Policy"];
        masterArray["Cover Type"] = result.data[0].policyDetails.CoverTypemValue;
        masterArray.ckycstatus1 = result.data[0].policyDetails.CkycDetails.status;
        if (result.data[0].policyDetails.CkycDetails.status === "success") {
          masterArray.ckycstatus = true;
        }
        if (result.data[0].policyDetails.CkycDetails.status === "success") {
          if (result.data[0].policyDetails.ProposerDetails["Customer Type"] === "Corporate") {
            const convertDate = new Date(result.data[0].policyDetails.CkycDetails.result.dob);
            console.log("convertDate", convertDate);

            const formattedDate = `${convertDate.getFullYear()}-${String(
              convertDate.getMonth() + 1
            ).padStart(2, "0")}-${String(convertDate.getDate()).padStart(2, "0")}`;
            console.log("formattedDate", formattedDate);

            const parts = formattedDate.split("-");
            console.log("parts", parts);
            const year = parts[0];
            const month = parts[2];
            const day = parts[1];
            const formattedDate1 = `${day}-${month}-${year}`;
            console.log("formattedDate1", formattedDate1);
            masterArray.DOB = formattedDate1;
          } else {
            masterArray.DOB = result.data[0].policyDetails.CkycDetails.result.dob;
          }
        } else {
          masterArray.DOB = result.data[0].policyDetails.ProposerDetails["Date of Birth"];
        }
        masterArray.PAN = result.data[0].policyDetails.ProposerDetails.PAN;
        masterArray.GST = result.data[0].policyDetails.ProposerDetails.GSTIN;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        setFlag1(result.data[0].policyDetails.CkycDetails.status);
        setPolicyDto(result.data[0].policyDetails);
        setCKYCData(result.data[0].policyDetails.CkycDetails);
        setCkycUpdateJson((prevState) => ({
          ...prevState,
          uniqueTransactionNumber: result.data[0].policyDetails.CkycDetails.uniqueTransactionNumber,
        }));
        setActiveStep(1);
      });
    }
  }, []);
  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const [loadingflag, setloadingflag] = useState(false);

  const handleNext = async () => {
    const policyStartDateString = PolicyDto.ProposerDetails["Policy Start Date"];

    const policyStartDate = new Date(
      parseInt(policyStartDateString.split("/")[2], 10),

      parseInt(policyStartDateString.split("/")[1], 10) - 1,

      parseInt(policyStartDateString.split("/")[0], 10)
    );

    policyStartDate.setHours(0, 0, 0, 0);

    // const currentDate = new Date();

    // currentDate.setHours(0, 0, 0, 0);
    // Added BY Pravat
    const dt = new Date();
    const date = dt.getDate();
    const month = dt.getMonth();
    let year = dt.getFullYear();
    if (month === 12) {
      year += 1;
    }
    const minimumDate = new Date(year, month, date - dropdowndata.BackDate);
    minimumDate.setHours(0, 0, 0, 0);
    //
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      if (
        PolicyDto["Type of Policy"] === "" ||
        PolicyDto["Type of Policy"] === null ||
        PolicyDto.ProposerDetails["Policy Start Date"] === "" ||
        PolicyDto.ProposerDetails["Policy End Date"] === "" ||
        (PolicyDto.ProposerDetails["Customer Type"] === "Individual" && flag1 !== "success"
          ? PolicyDto.ProposerDetails.Salutation === ""
          : null) ||
        (PolicyDto["Type of Policy"] === "Marine Specific Voyage Import" ||
        PolicyDto["Type of Policy"] === "Marine Specific Voyage Export" ||
        PolicyDto["Type of Policy"] === "Marine Specifc Voyage Duty"
          ? PolicyDto["Port of Loading"] === ""
          : null) ||
        (PolicyDto["Type of Policy"] === "Marine Specific Voyage Import" ||
        PolicyDto["Type of Policy"] === "Marine Specific Voyage Export" ||
        PolicyDto["Type of Policy"] === "Marine Specifc Voyage Duty"
          ? PolicyDto["Port of Discharge"] === ""
          : null) ||
        (PolicyDto["Port of Loading"] === "Others" ? PolicyDto["Port of Loading1"] === "" : null) ||
        (PolicyDto["Port of Discharge"] === "Others"
          ? PolicyDto["Port of Discharge1"] === ""
          : null) ||
        PolicyDto.BranchName === "" ||
        PolicyDto.ProfileType === "" ||
        PolicyDto.ProposerDetails["Customer Type"] === "" ||
        PolicyDto["Consignee Name & Address"] === "" ||
        PolicyDto.ProposerDetails["First Name"] === "" ||
        (PolicyDto.ProposerDetails["Customer Type"] === "Individual"
          ? PolicyDto.ProposerDetails["Last Name"] === ""
          : null) ||
        PolicyDto.ProposerDetails.State === "" ||
        PolicyDto.ProposerDetails["Address 1"] === "" ||
        PolicyDto.ProposerDetails["Mobile Number"] === "" ||
        PolicyDto.ProposerDetails["Email ID"] === "" ||
        PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "" ||
        // PolicyDto["Cover Type"] === "" ||
        PolicyDto.InsurableItem[0].RiskItems[0].Cargo === "" ||
        PolicyDto.InsurableItem[0].RiskItems[0]["Type of Cargo"] === "" ||
        PolicyDto.InsurableItem[0].RiskItems[0]["Is Cargo Containerized"] === "" ||
        PolicyDto.InsurableItem[0].RiskItems[0].Packing === "" ||
        PolicyDto["Transit To"] === "" ||
        PolicyDto["Transit From"] === "" ||
        PolicyDto["City From"] === "" ||
        PolicyDto["City To"] === "" ||
        PolicyDto["Basis of Valuation"] === "" ||
        PolicyDto["Risk Type"] === "" ||
        PolicyDto["Risk Type"] === null ||
        PolicyDto.Deductible === "" ||
        PolicyDto["Invoice No"] === "" ||
        PolicyDto["Invoice Date"] === "" ||
        PolicyDto["Settling Agent"] === "" ||
        PolicyDto["Currency of Invoice"] === "" ||
        // PolicyDto["Cover Type"] === "" ||
        masterArray["Cover Type"] === "" ||
        // PolicyDto["Vessel Name"] === "" ||
        PolicyDto["Description of Cargo"] === ""
      ) {
        setFlag(true);
        swal({
          icon: "error",
          text: "Please Enter the Required fields",
          buttons: "OK",
        });
      }

      //  else if (policyStartDate < currentDate) {
      //   swal({
      //     icon: "error",

      //     text: `Please select Current date for Policy start date`,
      //   });
      // }

      // Added By Pravat
      else if (policyStartDate < minimumDate) {
        swal({
          icon: "error",

          text: `Please select  Correct Policy start date`,
        });
      }
      //
      else if (flags.emailflag === true || flags.panflag === true || cust.NumberError === true) {
        swal({
          icon: "error",

          text: `Please Enter Correct data`,
        });
      } else {
        const LPolicyDto = PolicyDto;
        // LPolicyDto["BL/AWB/LR/RR No"] = "-";
        // Added by Shreya
        if (LPolicyDto["BL/AWB/LR/RR No"] === "" || LPolicyDto["BL/AWB/LR/RR No"] === null) {
          LPolicyDto["BL/AWB/LR/RR No"] = "-";
        }
        setPolicyDto({ ...LPolicyDto });
        console.log("handlenext");
        setFlag(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 1) {
      if (
        PolicyDto["Sum Insured in Currency of Invoice"] === "" ||
        PolicyDto["Exchange Rate"] === "" ||
        PolicyDto["Sum Insured in INR for Duty "] === "" ||
        PolicyDto["Sum Insured in INR "] === "" ||
        PolicyDto.Rate === "" ||
        PolicyDto.ProposerDetails.PinCode === ""
      ) {
        setFlag(true);
        swal({
          icon: "error",
          text: "Please Enter the Required fields",
          buttons: "OK",
        });
      } else if (flag1 === "") {
        swal({
          icon: "error",
          text: "Please initaite KYC before you proceed to payment",
        });
      } else if (flag1 === "failure") {
        await callProposal();
        swal({
          icon: "error",
          text: "CKYC is failure",
        });
      } else if (PolicyDto["Sum Insured in INR "] > master.MaximumSumInsured) {
        swal({
          icon: "error",
          text: `Please note that the maximum sum insured allowed is ${master.MaximumSumInsured}, enter a  value below  ${master.MaximumSumInsured} to proceed`,
        });
      } else {
        console.log("callPremium");
        setloadingflag(true);
        await callPremiumData();
        await callProposal();
        setloadingflag(false);
        console.log("111", PolicyDto.permiumamount);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    if (activeStep === 2) {
      console.log("RAZORPAY", Math.round(PolicyDto.PremiumDetails.PremiumIncludingGST));
      if (
        checkDisclaimer === false ||
        checkInsurance === false ||
        checkProposalConsent === false ||
        // (checkProposalConsent === true
        //   ? OTP === "" && checkDisclaimer === false && checkInsurance === false
        //   : null)
        (checkProposalConsent === true ? OTP === "" && checkDisclaimer === false : null)
      ) {
        setFlag(true);
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
      }
      // else if (
      //   Math.round(PolicyDto.PremiumDetails.PremiumIncludingGST) < Number(master.MinimumPremium)
      // ) {
      //   swal({
      //     icon: "error",
      //     text: `Please note that the minimum Premium allowed is ₹${master.MinimumPremium}`,
      //   });
      // }
      else if (Math.round(PolicyDto.PremiumDetails.PremiumExcludingGST) < master.MinimumPremium) {
        swal({
          icon: "error",
          text: `Please note that the minimum Premium allowed is ₹${master.MinimumPremium}`,
        });
      } else if (master.OTP1 === "") {
        swal({
          icon: "error",
          text: "Please Enter OTP",
        });
      } else if (master.verifyotp === "" || master.verifyotp === "true") {
        swal({
          icon: "error",
          text: "Please Enter Valid OTP",
        });
      } else if (docUpload.some((x) => x.DocType !== "" && x.DocName === "")) {
        swal({
          icon: "error",
          text: "Please Upload the Document",
        });
      } else {
        setFlag(false);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = async () => {
    if (activeStep === 1) {
      fetchusername(`${localStorage.getItem("userId")}`).then(async (result11) => {
        const uname = result11.data.userName;
        await fetchuser(uname).then(async (result) => {
          console.log("123456789result", result, result.data.partnerId);
          const partnerDetailssss = result.data.additionalDetails;
          console.log("123456789", partnerDetailssss);
          const partnerDetail = JSON.parse(partnerDetailssss);

          // const UserId = new URLSearchParams(search).get("UserName");
          // console.log("UserId", UserId);

          const Profile = await fetchProfile(
            // PolicyDto["Agent Id"],
            partnerDetail.AdditionalDetails.IntermediaryCode,
            uname,
            PolicyDto.BranchName,
            PolicyDto.ProfileType
          );
          console.log("username", uname);
          setdropdowndata(Profile.data[0]);
        });
      });
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      {/* <Stepper activeStep={activeStep}>
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
              <StepLabel {...labelProps} sx={{ flexDirection: "column" }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper> */}
      <ThemeProvider theme={theme}>
        <CustomStepper sx={{ ml: "15%", mr: "15%", mt: "3%", mb: "3%" }} activeStep={activeStep}>
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
                <StepLabel {...labelProps} sx={{ flexDirection: "column" }}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </CustomStepper>
      </ThemeProvider>
      {activeStep === steps.length ? (
        <>
          <MDTypography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </MDTypography>
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
            flag={flag}
            flag1={flag1}
            setFlag1={setFlag1}
            loadingflag={loadingflag}
            handleNext={handleNext}
            PolicyDto={PolicyDto}
            setPolicyDto={setPolicyDto}
            handleSetValue={handleSetValue}
            handleSet={handleSet}
            salutationData={salutationData}
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            commonObj={commonObj}
            handleSetPincode={handleSetPincode}
            permAddress={permAddress}
            handleSetPermPinCode={handleSetPermPinCode}
            ratingData={ratingData}
            master={master}
            setMaster={setMaster}
            setSendOtpFlag={setSendOtpFlag}
            sendOtpFlag={sendOtpFlag}
            setDocUpload={setDocUpload}
            docUpload={docUpload}
            checkProposalConsent={checkProposalConsent}
            setCheckProposalConsent={setCheckProposalConsent}
            checkDisclaimer={checkDisclaimer}
            setCheckDisclaimer={setCheckDisclaimer}
            checkInsurance={checkInsurance}
            setCheckInsurance={setCheckInsurance}
            OTP={OTP}
            setOTP={setOTP}
            cust={cust}
            setCust={setCust}
            flags={flags}
            setFlags={setFlags}
            setTimerFlag={setTimerFlag}
            timerFlag={timerFlag}
            TransitId={TransitId}
            setTransitId={setTransitId}
            setCoverOptions={setCoverOptions}
            CoverOptions={CoverOptions}
            profile={profile}
            setProfile={setProfile}
            Branch={Branch}
            setBranch={setBranch}
            AgentCode={AgentCode}
            setAgentCode={setAgentCode}
            setCounter={setCounter}
            setStartCounterFlag={setStartCounterFlag}
            counter={counter}
            startCounterFlag={startCounterFlag}
            setdropdowndata={setdropdowndata}
            dropdowndata={dropdowndata}
            CkycEmailFlag={CkycEmailFlag}
            setCkycEmailFlag={setCkycEmailFlag}
            setCKYCData={setCKYCData}
            CKYCData={CKYCData}
            setProfileInfo={setProfileInfo}
            ProfileInfo={ProfileInfo}
            CkycUpdateJson={CkycUpdateJson}
            setCkycUpdateJson={setCkycUpdateJson}
            // paymentDetails={paymentDetails}
          />
          {/* <MDButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </MDButton> */}
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDButton
              color="primary"
              disabled={activeStep === 0 || (activeStep === 1 && proposalNumber1 !== null)}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </MDButton>
            <MDBox sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
              <MDButton color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </MDButton>
            )} */}

            {/* <MDButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? null : "Next"}
            </MDButton> */}
            {activeStep !== steps.length - 1 && <MDButton onClick={handleNext}>Next</MDButton>}
          </MDBox>
        </>
      )}
    </MDBox>
  );
}

function SpecificVoyage() {
  const [refNo, setrefNo] = useState();
  const [, dispatch] = useDataController();
  const [PolicyDto, setPolicyDto] = useState(data);
  const { VerticalName } = GetBGRMasters().bgrMaster.Masters;
  console.log("VerticalName", VerticalName);
  const [salutationData, setSalutationData] = useState([]);
  const [TransitId, setTransitId] = useState("");
  const [CoverOptions, setCoverOptions] = useState([]);
  const [profile, setProfile] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [AgentCode, setAgentCode] = useState("");
  const [counter, setCounter] = useState(30);
  const [startCounterFlag, setStartCounterFlag] = useState(false);
  const [ProfileInfo, setProfileInfo] = useState([]);
  const [dropdowndata, setdropdowndata] = useState([]);
  const [CkycEmailFlag, setCkycEmailFlag] = useState(false);
  const [CKYCData, setCKYCData] = useState();
  const [flag1, setFlag1] = useState("");
  const { search } = useLocation();
  const [master, setMaster] = useState({
    uname: "",
    "Type of Policy": "",
    Salutation: { mID: "", mValue: "" },
    "Transport Type": "",
    "Cover Type": "",
    BranchName: "",
    "Transit From": { mID: "", mValue: "" },
    "Transit To": { mID: "", mValue: "" },
    "Type of Cargo": "",
    Cargo: { mID: "", mValue: "" },
    "Currency of Invoice": { mID: "", mValue: "" },
    "Cargo on Deck": "",
    "Is Cargo Containerized": "",
    "Is Cargo Carried in FCL": "",
    Packing: "",
    "Age of Vessel": "",
    "Port of Loading": { mID: "", mValue: "" },
    "Port of Discharge": { mID: "", mValue: "" },
    "Basis of Valuation": "",
    "Risk Type": "",
    "Flag of Convenience": "",
    "Policy Start Date": null,
    "Policy End Date": null,
    "Invoice Date": null,
    "Settling Agent": { mID: "", mValue: "" },
    FireProtection: { mID: "", mValue: "" },
    BankName: { mID: "", mValue: "" },
    PAN: "",
    GST: "",
    CIN: "",
    DOB: null,
    ckycstatus: false,
    otpflag: false,
    pinflag: true,
    ckycstatus1: "",
    ClauseFlag: 0,
    Markup: 0,
    MaximumSumInsured: 0,
    OTP1: "",
    verifyotp: "",
    MinimumPremium: 0,
  });
  const [docUpload, setDocUpload] = useState([
    {
      DocName: "",
      DocId: 1,
      DocType: "",
      DocRemarks: "",
      DocFlag: false,
      DocExtension: "",
      DocDate: "",
    },
  ]);
  const [CkycUpdateJson, setCkycUpdateJson] = useState({
    source: "AVO",
    uniqueTransactionNumber: "AVO/202301052516857",
    extraField1: "",
    extraField2: "",
    extraField3: "",
    extraField4: "",
    extraField5: "",
  });
  const [checkProposalConsent, setCheckProposalConsent] = useState(false);
  const [checkDisclaimer, setCheckDisclaimer] = useState(false);
  const [checkInsurance, setCheckInsurance] = useState(false);
  const [sendOtpFlag, setSendOtpFlag] = useState(true);
  const [timerFlag, setTimerFlag] = useState(false);
  const [OTP, setOTP] = useState("");
  // const [proposalNumber, setProposalNumber] = useState("");
  const callProposal = async () => {
    await getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
      async (result) => {
        console.log("result", result);
        const { partnerId } = result.data.userDetails[0];
        await getRequest(
          `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
            "userId"
          )}&productCode=${PolicyDto.GCProductCode}`
        ).then(async (res) => {
          console.log("qwertyuiop", res);
          const partnerDetailssss = res.data.additionalDetails;
          console.log("123456789", partnerDetailssss);
          const partnerDetail = JSON.parse(partnerDetailssss);
          console.log("partnerDetail", partnerDetail);
          const { Channel } = PolicyDto;
          Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
          Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
          Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
          Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
          Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
          Channel.AgentContactNo = partnerDetail.Mobile;
          Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
          Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
          Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
          Channel.PrimaryVerticalName =
            partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
              ? VerticalName.filter(
                  (x) =>
                    x.VerticalCode ===
                    partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                )[0].mValue
              : partnerDetail.AdditionalDetails.PrimaryVerticalName;
          Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
          Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
          Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
          Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
          Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
          Channel.DealId = partnerDetail.AdditionalDetails.DealId;
          PolicyDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;

          setPolicyDto((prev) => ({ ...prev, Channel }));

          setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
        });
      }
    );
    console.log("callProposal....");
    if (PolicyDto.ProposalNo === "" || PolicyDto.ProposalNo === undefined) {
      const obj = {
        ...PolicyDto,
        DocumentDetails: docUpload[0].DocName === "" ? [] : docUpload,
      };
      setPolicyDto((prev) => ({ ...prev, ...obj }));
      if (flag1 !== "failure") {
        await calculateProposal(obj).then(async (result) => {
          console.log("11", result);
          if (result.data.proposalNumber !== "") {
            // setProposalNumber(result.data.proposalNumber);
            // console.log("proposalNumberPolicyDto", proposalNumber);
            PolicyDto.ProposalNo = result.data.proposalNumber;
            setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
            const MobileNo = PolicyDto.ProposerDetails["Mobile Number"];
            const Message = `Dear Customer,Based on your requirements, Marine Specific Voyage Policy Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
            await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
              console.log("1234567890", smsResp);
            });
            const jsonValue = {
              communicationId: 122,
              keyType: "MarineProposal",
              key: result.data.proposalNumber,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: PolicyDto.ProposerDetails["Email ID"],
                },
              ],
            };
            const jsonValue1 = {
              communicationId: 276,
              keyType: "MarineProposal",
              key: PolicyDto.ProposalNo,
              stakeHolderDetails: [
                {
                  communicationType: "Email",
                  stakeholderCode: "CUS",
                  communicationValue: PolicyDto.ProposerDetails["Email ID"],
                },
              ],
            };
            try {
              const mail = await postRequest(
                `Notifications/EventCommunicationExecution`,
                jsonValue
              );
              const mail1 = await postRequest(
                `Notifications/EventCommunicationExecution`,
                jsonValue1
              );
              console.log(mail.data);
              console.log(mail1.data);
              return mail.data;
            } catch (error) {
              console.log(error);
            }
            console.log(" PolicyDto.proposalNumber", PolicyDto);
            // console.log("proposalNumberPolicyDto", proposalNumber);
            // setPropFlag(false);
          }
          return null;
        });
      } else {
        const result = await calculateProposal(obj);
        PolicyDto.ProposalNo = result.data.proposalNumber;
        setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
      }
    } else if (flag1 !== "failure") {
      await updateProposal(PolicyDto).then(async (result) => {
        console.log("111updateProposal", result);
        if (result.data.status === 1) {
          // setProposalNumber(result.data.proposalNumber);
          // console.log("proposalNumberPolicyDto", proposalNumber);
          // PolicyDto.ProposalNo = result.data.proposalNumber;
          // setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
          const MobileNo = PolicyDto.ProposerDetails["Mobile Number"];
          const Message = `Dear Customer,Based on your requirements, Marine Specific Voyage Policy Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
          await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
            console.log("1234567890", smsResp);
          });
          const jsonValue = {
            communicationId: 122,
            keyType: "MarineProposal",
            key: PolicyDto.ProposalNo,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: PolicyDto.ProposerDetails["Email ID"],
              },
            ],
          };
          const jsonValue1 = {
            communicationId: 276,
            keyType: "MarineProposal",
            key: PolicyDto.ProposalNo,
            stakeHolderDetails: [
              {
                communicationType: "Email",
                stakeholderCode: "CUS",
                communicationValue: PolicyDto.ProposerDetails["Email ID"],
              },
            ],
          };
          try {
            const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
            const mail1 = await postRequest(
              `Notifications/EventCommunicationExecution`,
              jsonValue1
            );
            console.log(mail.data);
            console.log(mail1.data);
            return mail.data;
          } catch (error) {
            console.log(error);
          }
          console.log(" PolicyDto.proposalNumber", PolicyDto);
          // console.log("proposalNumberPolicyDto", proposalNumber);
          // setPropFlag(false);
        }
        return null;
      });
    } else {
      await updateProposal(PolicyDto);
    }
  };

  const [ratingData, setRatingData] = useState({});

  useEffect(() => {
    const abc = generateUUID();
    console.log("abc", abc, refNo);
    setrefNo(abc);
    if (false) {
      setLogo(dispatch, "USGILogo");
      setCustTheme(dispatch, "USGILogo");
    }
  }, []);
  // const formatDate1 = (date) => {
  //   const input = date;
  //   const [day, month, year] = input.split("/");
  //   return `${month}/${day}/${year}`;
  // };
  // const proposalNumber1 = new URLSearchParams(search).get("proposalno");

  // useEffect(async () => {
  //   // console.log(flag);
  //   if (proposalNumber1 !== null) {
  //     await GetProposalByNumber(proposalNumber1).then((result) => {
  //       console.log("response", result);
  //       debugger;
  //       console.log("response", result.data[0].policyDetails);
  //       setAgentCode(result.data[0].policyDetails["Agent Id"]);
  //       fetchusername(`${localStorage.getItem("userId")}`).then(async (result11) => {
  //         const uname = result11.data.userName;
  //         master.uname = result11.data.userName;
  //         setMaster((prevState) => ({ ...prevState, ...master }));
  //         fetchProfile(
  //           result.data[0].policyDetails["Agent Id"],
  //           uname,
  //           result.data[0].policyDetails.BranchName,
  //           result.data[0].policyDetails.ProfileType,
  //           PolicyDto.BranchCode
  //         ).then((result123) => {
  //           console.log("ProfileRedirection", result123);
  //           // setLPolicyDto((prevState) => ({ ...prevState, ...result123.data[0] }));
  //           // setPolicyDto((prevState) => ({
  //           //   ...prevState,
  //           //   ...LPolicyDto,
  //           setdropdowndata(result123.data[0]);
  //           // }));
  //         });
  //         if (Branch.length === 0) {
  //           const Profile = await fetchProfile(
  //             result.data[0].policyDetails["Agent Id"],
  //             uname,
  //             "",
  //             ""
  //           );
  //           // setdropdowndata(Profile.data[0]);
  //           console.log("IMD123", Profile);
  //           setProfileInfo(Profile);
  //           console.log("IMD", ProfileInfo);
  //           const uniqueBranches = new Set();
  //           if (Array.isArray(Profile.data) && Profile.data.length > 0) {
  //             Profile.data.forEach((row) => {
  //               uniqueBranches.add(row.BranchName);
  //             });
  //             setBranch([...uniqueBranches]);
  //             console.log("CoverOptions123", Branch);
  //           } else {
  //             setBranch([]);
  //           }
  //         }
  //         if (profile.length === 0) {
  //           const Profile1 = await fetchProfile(
  //             result.data[0].policyDetails["Agent Id"],
  //             uname,
  //             result.data[0].policyDetails.BranchName,
  //             "",
  //             ""
  //           );

  //           console.log("IMD123", Profile1);
  //           setProfileInfo(Profile1);
  //           console.log("IMD", ProfileInfo);
  //           const profileTypes = new Set();
  //           // if (Array.isArray(Profile1.data) && Profile1.data.length > 0) {
  //           //   Profile1.data.forEach((row) => {
  //           //     if (row.ProfileType.length === 2) {
  //           //       setProfile(row.ProfileType);
  //           //     } else {
  //           //       profileTypes.add(row.ProfileType);
  //           //       setProfile([...profileTypes]);
  //           //     }
  //           //   });
  //           //   console.log("ProfileTypes", profile);
  //           // } else {
  //           //   setProfile([]);
  //           // }
  //           if (Array.isArray(Profile1.data) && Profile1.data.length > 0) {
  //             const foundRow = Profile1.data.find((row) => row.ProfileType.length === 2);
  //             let profileCount = 0;
  //             let profileType = "";
  //             if (foundRow) {
  //               setProfile(foundRow.ProfileType);
  //               profileCount = 2;
  //             } else {
  //               profileTypes.clear();
  //               Profile1.data.forEach((row) => {
  //                 profileTypes.add(row.ProfileType);
  //                 if (row.ProfileType !== "" && row.ProfileType.length !== 0) {
  //                   profileCount += 1;
  //                   profileType = row.ProfileType;
  //                 }
  //               });
  //               setProfile([...profileTypes]);
  //             }
  //             if (
  //               profileCount === 0 ||
  //               (profileCount === 1 && profileType[0] === "Common Profile")
  //             ) {
  //               setProfile([]);
  //             }
  //             console.log("ProfileTypes", profile);
  //           } else {
  //             setProfile([]);
  //           }
  //         }
  //       });
  //       setPolicyDto(result.data[0].policyDetails);
  //       // setPolicyDto((prevState) => ({ ...prevState, ...result.data[0].policyDetails }));
  //       // setPolicyDto((prevState) => ({
  //       //   ...prevState,
  //       //   ...PolicyDto,
  //       // }));
  //       master["Policy Start Date"] = formatDate1(
  //         result.data[0].policyDetails.ProposerDetails["Policy Start Date"]
  //       );
  //       master["Invoice Date"] = formatDate1(result.data[0].policyDetails["Invoice Date"]);
  //       master["Policy End Date"] = formatDate1(
  //         result.data[0].policyDetails.ProposerDetails["Policy End Date"]
  //       );
  //       master["Type of Policy"] = result.data[0].policyDetails["Type of Policy"];
  //       master["Cover Type"] = result.data[0].policyDetails.CoverTypemValue;
  //       master.ckycstatus1 = result.data[0].policyDetails.CkycDetails.status;
  //       if (result.data[0].policyDetails.CkycDetails.status === "success") {
  //         master.ckycstatus = true;
  //       }
  //       if (result.data[0].policyDetails.CkycDetails.status === "success") {
  //         if (result.data[0].policyDetails.ProposerDetails["Customer Type"] === "Corporate") {
  //           const convertDate = new Date(result.data[0].policyDetails.CkycDetails.result.dob);
  //           console.log("convertDate", convertDate);

  //           const formattedDate = `${convertDate.getFullYear()}-${String(
  //             convertDate.getMonth() + 1
  //           ).padStart(2, "0")}-${String(convertDate.getDate()).padStart(2, "0")}`;
  //           console.log("formattedDate", formattedDate);

  //           const parts = formattedDate.split("-");
  //           console.log("parts", parts);
  //           const year = parts[0];
  //           const month = parts[2];
  //           const day = parts[1];
  //           const formattedDate1 = `${day}-${month}-${year}`;
  //           console.log("formattedDate1", formattedDate1);
  //           master.DOB = formattedDate1;
  //         } else {
  //           master.DOB = result.data[0].policyDetails.CkycDetails.result.dob;
  //         }
  //       } else {
  //         master.DOB = result.data[0].policyDetails.ProposerDetails["Date of Birth"];
  //       }
  //       master.PAN = result.data[0].policyDetails.ProposerDetails.PAN;

  //       master.GST = result.data[0].policyDetails.ProposerDetails.GSTIN;

  //       // master.GST = result.data[0].policyDetails.ProposerDetails["Date of Birth"];
  //       setMaster((prevState) => ({ ...prevState, ...master }));
  //       setFlag1(result.data[0].policyDetails.CkycDetails.status);
  //       // setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

  //       // setPolicyDto((prevState) => ({
  //       //   ...prevState,
  //       //   ...LPolicyDto,
  //       // }));
  //       // setPolicyDto((prevState) => ({ ...prevState, ...result.data[0].policyDetails }));
  //     });
  //   }
  // }, []);
  useEffect(() => {
    PolicyDto["Net Premium"] = ratingData.PremiumExcludingGST;
    PolicyDto["Stamp Duty"] = ratingData.Stampduty;
    PolicyDto["ST/GST"] = ratingData.GST;
    // PolicyDto["Total Premium"] = ratingData.PremiumIncludingGST;
    PolicyDto["Total Premium"] = Math.round(ratingData.PremiumIncludingGST);
    PolicyDto.PremiumDetails.CollectedCGST = Number(ratingData.CollectedCGST).toFixed(2).toString();
    PolicyDto.PremiumDetails.CollectedIGST = Number(ratingData.CollectedIGST).toFixed(2).toString();
    PolicyDto.PremiumDetails.CollectedSGST = Number(ratingData.CollectedSGST).toFixed(2).toString();
    PolicyDto.PremiumDetails.GST = Number(ratingData.GST).toFixed(2).toString();
    PolicyDto.PremiumDetails.InvoicevalueINR = Number(ratingData.InvoicevalueINR)
      .toFixed(2)
      .toString();
    PolicyDto.PremiumDetails.PremiumExcludingGST = Number(ratingData.PremiumExcludingGST)
      .toFixed(2)
      .toString();
    PolicyDto.PremiumDetails.PremiumIncludingGST = Number(ratingData.PremiumIncludingGST)
      .toFixed(2)
      .toString();
    PolicyDto.PremiumDetails.Stampduty = Number(ratingData.Stampduty).toFixed(2).toString();
    PolicyDto.PremiumDetails.SumInsuredinINR = Number(ratingData.SumInsuredinINR)
      .toFixed(2)
      .toString();
    PolicyDto.PremiumDetails.TotalCargoSI = Number(ratingData.TotalCargoSI).toFixed(2).toString();

    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));

    console.log(
      "ratingdata",
      ratingData,
      ratingData.PremiumIncludingGST,
      PolicyDto["Total Premium"],
      PolicyDto
    );
  }, [ratingData]);

  console.log("PolicyDto", PolicyDto);

  useEffect(() => {
    const abc = generateUUID();
    console.log("abc", abc, refNo);

    setrefNo(abc);
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
  useEffect(async () => {
    if (PolicyDto.ProposerDetails.PinCode.length === 6) {
      const abc = await callDistrict(PolicyDto.ProposerDetails.PinCode);
      console.log("abc", abc);
      PolicyDto.ProposerDetails.District = abc.dist[0].mdata[0].mValue;
      PolicyDto.ProposerDetails.State = abc.state[0].mdata[0].mValue;
      // commonObj.Comm.district = abc.dist[0].mdata[0].mValue;
      // commonObj.Comm.state = abc.state[0].mdata[0].mValue;
      // setCommonObj({ ...commonObj });
      setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    }
  }, [PolicyDto.ProposerDetails.PinCode]);

  // useEffect(async () => {
  //   if (permAddress.PinCode.length === 6) {
  //     const abc = await callDistrict(permAddress.PinCode);
  //     console.log("abc", abc);
  //     //  PolicyDto.ProposalData.District=abc.dist[0].mdata[0].mID;
  //     //  PolicyDto.ProposalData.State=abc.state[0].mdata[0].mID;
  //     commonObj.permanent.district = abc.dist[0].mdata[0].mValue;
  //     commonObj.permanent.state = abc.state[0].mdata[0].mValue;
  //     setCommonObj({ ...commonObj });
  //     // setPolicyDto(PolicyDto);
  //   }
  // }, [permAddress.PinCode.length]);

  const callPremiumData = async () => {
    await callPremiumMethod(PolicyDto).then((result) => {
      console.log("Premium Called", result);

      if (result.status === 1) {
        // PolicyDto.permiumamount = result.finalResult.FinalPremium;
        setRatingData({ ...result.finalResult });
        PolicyDto["Total Premium"] = Math.round(result.finalResult.PremiumIncludingGST);
        setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
        // swal({
        //   text: result.data.finalResult.responseMessage,
        //   html: true,
        //   icon: "success",
        // });
      }
    });
  };

  const handleChange = (e, value) => {
    PolicyDto[e.target.id.split("-")[0]] = value;
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  };

  const handleDateChange = (e, name) => {
    const today = new Date(e[0].toDateString());
    PolicyDto.ProposerDetails["Policy Start Date"] = today;

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
      PolicyDto.ProposerDetails["Policy End Date"] = date1;
    }
    // setPolicyDto(PolicyDto);
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    setPolicyDto((prevState) => ({
      ...prevState,
      PolicyDto: prevState.PolicyDto,
    }));
  };
  // const handleSetPermPinCode = (e) => {
  //   permAddress[e.target.name] = e.target.value;
  //   setPermAddress({ ...permAddress });
  // };
  const handleSetPincode = (e) => {
    PolicyDto.ProposerDetails[e.target.name] = e.target.value;
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    // if (e.target.value === "Yes") {
    //   permAddress.Address = PolicyDto.ProposerDetails.Address;
    //   // permAddress.District=commonObj.Comm.district
    //   permAddress.PinCode = PolicyDto.ProposerDetails.PinCode;
    //   // permAddress.State=commonObj.Comm.state;
    //   commonObj.permanent.district = commonObj.Comm.district;
    //   commonObj.permanent.state = commonObj.Comm.state;
    //   setPermAddress({ ...permAddress });
    // } else {
    //   permAddress.Address = "";
    //   permAddress.District = "";
    //   permAddress.PinCode = "";
    //   permAddress.State = "";
    //   commonObj.permanent.district = "";
    //   commonObj.permanent.state = "";
    //   setPermAddress({ ...permAddress });
    // }
  };

  const handleSetValue = (e, value) => {
    console.log("set proposer");
    PolicyDto.ProposerDetails[e.target.name] = e.target.value;

    if (e.target.id.split("-")[0] === "Salutation") {
      PolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mID;
    }
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  };
  const handleSet = (e) => {
    console.log("set proposer");

    if (e.target.name === "Do you want to take Personal Accident cover?") {
      PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        PolicyDto.InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = "";
      }
    } else if (e.target.name === "Do you want to cover additional structure?") {
      PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        PolicyDto.InsurableItem[0].RiskItems[0]["Additional Structure SI"] = "";
        PolicyDto.InsurableItem[0].RiskItems[0]["Total Building SI"] = "";
      }
    } else {
      PolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }

    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  };

  // const handleSetPolicy = () => {
  //   console.log("clicked");
  //   setPolicyDto(PolicyDto);
  //   handleIssuePolicy(PolicyDto).then((result) => {
  //     console.log("Policy issued", result);
  //     if (result.status === 200) {
  //       swal({
  //         text: result.data.finalResult.responseMessage,
  //         html: true,
  //         icon: "success",
  //       });
  //     }
  //   });
  // };
  // const paymentHandler = () => {
  //   console.log("check2", PolicyDto);
  //   // console.log("check1", refNo);
  //   PolicyDto["Reference No"] = refNo;
  //   setPolicyDto(PolicyDto);

  //   const options = {
  //     key: "rzp_test_KK09FiPyLY2aKI",
  //     amount: Math.round(PolicyDto.permiumamount * 100),
  //     name: PolicyDto.ProposalData.Name,
  //     description: "Policy Payment",
  //     // image: require("assets/icons/berry.png"),
  //     email: PolicyDto.ProposalData["Email ID"],
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

  // useEffect(() => {
  //   console.log(PolicyDto, "newwwpolicydto");
  // });
  const step = new URLSearchParams(search).get("step");

  return (
    <MDBox>
      <MDTypography>Marine - Specific Voyage</MDTypography>
      <Card>
        <HorizontalLinearStepper
          stepPar={step}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          setCoverOptions={setCoverOptions}
          CoverOptions={CoverOptions}
          profile={profile}
          setProfile={setProfile}
          Branch={Branch}
          setBranch={setBranch}
          AgentCode={AgentCode}
          setAgentCode={setAgentCode}
          // paymentHandler={paymentHandler}
          callPremiumData={callPremiumData}
          callProposal={callProposal}
          handleSetValue={handleSetValue}
          handleSet={handleSet}
          salutationData={salutationData}
          handleDateChange={handleDateChange}
          handleChange={handleChange}
          handleSetPincode={handleSetPincode}
          setSendOtpFlag={setSendOtpFlag}
          sendOtpFlag={sendOtpFlag}
          // commonObj={commonObj}
          // permAddress={permAddress}
          // handleSetPermPinCode={handleSetPermPinCode}
          ratingData={ratingData}
          master={master}
          setMaster={setMaster}
          setDocUpload={setDocUpload}
          docUpload={docUpload}
          checkProposalConsent={checkProposalConsent}
          setCheckProposalConsent={setCheckProposalConsent}
          checkDisclaimer={checkDisclaimer}
          setCheckDisclaimer={setCheckDisclaimer}
          checkInsurance={checkInsurance}
          setCheckInsurance={setCheckInsurance}
          OTP={OTP}
          setOTP={setOTP}
          setTimerFlag={setTimerFlag}
          timerFlag={timerFlag}
          TransitId={TransitId}
          setTransitId={setTransitId}
          setCounter={setCounter}
          setStartCounterFlag={setStartCounterFlag}
          counter={counter}
          startCounterFlag={startCounterFlag}
          setdropdowndata={setdropdowndata}
          dropdowndata={dropdowndata}
          ProfileInfo={ProfileInfo}
          setProfileInfo={setProfileInfo}
          flag1={flag1}
          setFlag1={setFlag1}
          CkycEmailFlag={CkycEmailFlag}
          setCkycEmailFlag={setCkycEmailFlag}
          setCKYCData={setCKYCData}
          CKYCData={CKYCData}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      </Card>
    </MDBox>
  );
}
export default SpecificVoyage;
