import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

// import swal from "sweetalert";
import { setLogo, setCustTheme, useDataController } from "modules/BrokerPortal/context";
import {
  callPremiumMethod,
  calculateProposal,
  getState,
  getDistrict,
  // handleIssuePolicy,
  // callSaveQuoteMethod,
  GetProposalByNumber,
} from "./data/index";

import ProposerDetails from "./ProposerDetails";
import RiskDetails from "./RiskDetails";
// import DocumentsUpload from "./DocumentsUpload";
import PremiumBreakup from "./PremiumBreakup";
import PaymentDetailsPage from "./PaymentDetailsPage";
import data from "./JsonData";
import { getRequest } from "../../../../core/clients/axiosclient";
// import { getQuoteSummary } from "../Home/data/index";

const steps = ["Risk Details", "Premium Breakup", "Proposer Details", "Payment Details"];

function generateUUID() {
  const ab = uuid();
  return ab;
}

function GetStepContent({
  step,
  handleNext,
  PolicyDto,
  setPolicyDto,
  ratingData,
  // handleSetPolicy,
  // QuoteData,
  paymentCall,
  flag,
  setFlag,
  handleBack,
  setRatingData,
  setMaster,
  master,
  setProposalNumber,
  proposalNumber,
  rowsID,
  setRowsID,
  addLoc,
  setaddLoc,
  setOTP,
  OTP,
  setCheckDisclaimer,
  checkDisclaimer,
  setCheckInsurance,
  checkInsurance,
  checkProposalConsent,
  setCheckProposalConsent,
  setDocUpload,
  docUpload,
  setPolEndDate,
  polEndDate,
  setPolStartDate,
  polStartDate,
  setCKYCReqJson,
  CKYCReqJSon,
  setCKYCStatus,
  CKYCStatus,
  setCKYCData,
  CKYCData,
  setIdType,
  IdType,
  setDateToShow,
  datetoShow,
  setKycDate,
  kycDate,
  setKYCSecDisable,
  kycSecDisable,
  setRiskPincode,
  riskPincode,
  setCkycUpdateJson,
  CkycUpdateJson,
}) {
  switch (step) {
    case 0:
      return (
        <RiskDetails
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          flag={flag}
          setFlag={setFlag}
          handleNext={handleNext}
          setRatingData={setRatingData}
          setMaster={setMaster}
          master={master}
          ratingData={ratingData}
          rowsID={rowsID}
          setRowsID={setRowsID}
          addLoc={addLoc}
          setaddLoc={setaddLoc}
          setRiskPincode={setRiskPincode}
          riskPincode={riskPincode}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      );
    // case 1:
    //   return <DocumentsUpload handleNext={handleNext} />;
    case 1:
      return (
        <PremiumBreakup
          handleNext={handleNext}
          PolicyDto={PolicyDto}
          ratingData={ratingData}
          handleBack={handleBack}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      );
    case 2:
      return (
        <ProposerDetails
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          handleNext={handleNext}
          flag={flag}
          setFlag={setFlag}
          setMaster={setMaster}
          master={master}
          handleBack={handleBack}
          proposalNumber={proposalNumber}
          setProposalNumber={setProposalNumber}
          setOTP={setOTP}
          OTP={OTP}
          setCheckDisclaimer={setCheckDisclaimer}
          checkDisclaimer={checkDisclaimer}
          setCheckInsurance={setCheckInsurance}
          checkInsurance={checkInsurance}
          checkProposalConsent={checkProposalConsent}
          setCheckProposalConsent={setCheckProposalConsent}
          setDocUpload={setDocUpload}
          docUpload={docUpload}
          setPolEndDate={setPolEndDate}
          polEndDate={polEndDate}
          setPolStartDate={setPolStartDate}
          polStartDate={polStartDate}
          setCKYCReqJson={setCKYCReqJson}
          CKYCReqJSon={CKYCReqJSon}
          setCKYCStatus={setCKYCStatus}
          CKYCStatus={CKYCStatus}
          setCKYCData={setCKYCData}
          CKYCData={CKYCData}
          setIdType={setIdType}
          IdType={IdType}
          addLoc={addLoc}
          setaddLoc={setaddLoc}
          setDateToShow={setDateToShow}
          datetoShow={datetoShow}
          setKycDate={setKycDate}
          kycDate={kycDate}
          setKYCSecDisable={setKYCSecDisable}
          kycSecDisable={kycSecDisable}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}

          // QuoteData={QuoteData}
        />
      );
    case 3:
      return (
        <PaymentDetailsPage
          handleNext={handleNext}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          setMaster={setMaster}
          master={master}
          // handleSetPolicy={handleSetPolicy}
          paymentCall={paymentCall}
          handleBack={handleBack}
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
  //   callPremiumData,
  handleSetValue,
  handleSet,
  handleDateChange,
  handleChange,
  handleSet1,
  commonObj,
  handleSetPincode,
  permAddress,
  handleSetPermPinCode,
  ratingData,
  pinLoad,
  pinPermLoad,
  callPremiumData,
  // callProposal,
  setRatingData,
  setMaster,
  master,
  proposalNumber,
  setProposalNumber,
  rowsID,
  setRowsID,
  addLoc,
  setaddLoc,
  setOTP,
  OTP,
  setCheckDisclaimer,
  checkDisclaimer,
  setCheckInsurance,
  checkInsurance,
  checkProposalConsent,
  setCheckProposalConsent,
  setDocUpload,
  docUpload,
  setPolEndDate,
  polEndDate,
  setPolStartDate,
  polStartDate,
  setCKYCReqJson,
  CKYCReqJSon,
  setCKYCStatus,
  CKYCStatus,
  setCKYCData,
  CKYCData,
  setIdType,
  IdType,
  setDateToShow,
  datetoShow,
  setKycDate,
  kycDate,
  setKYCSecDisable,
  kycSecDisable,
  setRiskPincode,
  riskPincode,
  CkycUpdateJson,
  setCkycUpdateJson,
  // handleSetPolicy,
  // QuoteData,
  // callSaveQuoteData,
}) {
  console.log("data", PolicyDto);
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  console.log("activeStep", activeStep);
  const [skipped, setSkipped] = useState(new Set());
  const [flag, setFlag] = useState(false);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);
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

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    // debugger;
    // PolicyDto.InsurableItem[0].RiskItems.forEach((x, i) => {
    //   if (PolicyDto.InsurableItem[0].RiskItems[i].Address1 !== "") {
    //    addLoc.Address1=PolicyDto.InsurableItem[0].RiskItems[i].Address1
    //    addLoc.Address2=PolicyDto.InsurableItem[0].RiskItems[i].Address
    //     setaddLoc({ ...addLoc });
    //   }
    // });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.addLoc(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <MDBox px={3}>
      <MDTypography align="left" display="block" variant="h4" ml={2} mt={2}>
        Bharat Laghu Udyam Suraksha/Bharat Sukshma Udyam Suraksha
      </MDTypography>
      <MDBox xs={{ bgcolor: "background.paper" }} m={5}>
        <ThemeProvider theme={theme}>
          <CustomStepper activeStep={activeStep}>
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
            PolicyDto={PolicyDto}
            setPolicyDto={setPolicyDto}
            handleSetValue={handleSetValue}
            handleSet={handleSet}
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            handleSet1={handleSet1}
            commonObj={commonObj}
            handleSetPincode={handleSetPincode}
            permAddress={permAddress}
            handleSetPermPinCode={handleSetPermPinCode}
            ratingData={ratingData}
            flag={flag}
            setFlag={setFlag}
            pinLoad={pinLoad}
            pinPermLoad={pinPermLoad}
            callPremiumData={callPremiumData}
            handleBack={handleBack}
            setRatingData={setRatingData}
            master={master}
            setMaster={setMaster}
            proposalNumber={proposalNumber}
            setProposalNumber={setProposalNumber}
            rowsID={rowsID}
            setRowsID={setRowsID}
            addLoc={addLoc}
            setaddLoc={setaddLoc}
            setOTP={setOTP}
            OTP={OTP}
            setCheckDisclaimer={setCheckDisclaimer}
            checkDisclaimer={checkDisclaimer}
            setCheckInsurance={setCheckInsurance}
            checkInsurance={checkInsurance}
            checkProposalConsent={checkProposalConsent}
            setCheckProposalConsent={setCheckProposalConsent}
            setDocUpload={setDocUpload}
            docUpload={docUpload}
            setPolEndDate={setPolEndDate}
            polEndDate={polEndDate}
            setPolStartDate={setPolStartDate}
            polStartDate={polStartDate}
            setCKYCReqJson={setCKYCReqJson}
            CKYCReqJSon={CKYCReqJSon}
            setCKYCStatus={setCKYCStatus}
            CKYCStatus={CKYCStatus}
            setCKYCData={setCKYCData}
            CKYCData={CKYCData}
            setIdType={setIdType}
            IdType={IdType}
            setDateToShow={setDateToShow}
            datetoShow={datetoShow}
            setKycDate={setKycDate}
            kycDate={kycDate}
            setKYCSecDisable={setKYCSecDisable}
            kycSecDisable={kycSecDisable}
            CkycUpdateJson={CkycUpdateJson}
            setCkycUpdateJson={setCkycUpdateJson}
            setRiskPincode={setRiskPincode}
            riskPincode={riskPincode}
            // QuoteData={QuoteData}
            // paymentDetails={paymentDetails}
          />
          {/* <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDButton
              color="primary"
              disabled={activeStep === 0}
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

            <MDButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </MDButton>
          </MDBox> */}
        </>
      )}
    </MDBox>
  );
}

function BLUS() {
  const [, dispatch] = useDataController();
  const [refNo, setrefNo] = useState();
  const [PolicyDto, setPolicyDto] = useState(data);
  const [ratingData, setRatingData] = useState({});
  const [master, setMaster] = useState({
    Occupancy: { mID: "", mValue: "" },
    Salutation: { mID: "", mValue: "" },
    Gender: { mID: "", mValue: "" },
    PastFlooding: { mID: "", mValue: "" },
    BasementExposure: { mID: "", mValue: "" },
    ClaimExperience: { mID: "", mValue: "" },
    AgeofBuilding: { mID: "", mValue: "" },
    HousekeepingType: { mID: "", mValue: "" },
    ClaimsRatio: { mID: "", mValue: "" },
    RiskTerrian: { mID: "", mValue: "" },
    StockExposure: { mID: "", mValue: "" },
    Distancefrompublicfirebrigade: { mID: "", mValue: "" },
    ClientsBusinessExperience: { mID: "", mValue: "" },
    TypeofConstruction: { mID: "", mValue: "" },
    FireProtection: { mID: "", mValue: "" },
    BankName: { mID: "", mValue: "" },
  });
  const [addLoc, setaddLoc] = useState([
    {
      id: 1,
      cancelFlag: false,
      Pincode: "",
      State: "",
      City: "",
      Address1: "",
      Address2: "",
      GSTNo: "",
      Total: 0,
      TariffZone: "",
      SumInsuredBifurcation: {
        Building: "",
        "Plant and Machinery": "",
        "Furniture Fixture and Fittings": "",
        "Other Content": "",
        "Raw Material": "",
        "Stock in Progress": "",
        "Finished Stock": "",
        "Other Contents Please Specify": "",
      },
    },
  ]);

  // useEffect(() => {
  //   debugger;
  //   PolicyDto.InsurableItem[0].RiskItems.forEach((x, index) => {
  //     addLoc[index].Address1 = x.Address1 !== "" ? x.Address1 : "";
  //     addLoc[index].Address2 = x.Address2 !== "" ? x.Address2 : "";
  //     setaddLoc({ ...addLoc });
  //   });
  // }, []);
  const [rowsID, setRowsID] = useState(1);
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
  const [polStartDate, setPolStartDate] = useState(null);
  const [polEndDate, setPolEndDate] = useState(null);
  const [kycDate, setKycDate] = useState(null);
  // const [validDate, setValidDate] = useState(false);
  const [datetoShow, setDateToShow] = useState({
    dateOfBirth: null,
  });
  const [IdType, setIdType] = useState({
    Pan: "",
    GSTIN: "",
    CIN: "",
  });
  const [CKYCData, setCKYCData] = useState();
  const [CKYCStatus, setCKYCStatus] = useState("");
  const [CKYCReqJSon, setCKYCReqJson] = useState({
    source: "AVO",
    customerType: "I",
    uniqueTransactionNumber: "",
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
    CIN: "",
    GSTIN: "",
    PAN: "",
  });
  const [kycSecDisable, setKYCSecDisable] = useState(false);
  const [riskPincode, setRiskPincode] = useState([]);
  const { search } = useLocation();
  const [CkycUpdateJson, setCkycUpdateJson] = useState({
    source: "AVO",
    uniqueTransactionNumber: "AVO/202301052516857",
    extraField1: "",
    extraField2: "",
    extraField3: "",
    extraField4: "",
    extraField5: "",
  });
  const proposalNo = new URLSearchParams(search).get("proposernum");
  const quoteNoo = new URLSearchParams(search).get("quotationno");

  useEffect(async () => {
    const proposalNumber = new URLSearchParams(search).get("proposernum");
    const quoteNo = new URLSearchParams(search).get("quotationno");
    console.log("propnumber", proposalNumber);
    // const newproposalnum = "0910/0000/0663/00/000";
    if (quoteNo !== null) {
      await getRequest(`Quotation/GetQuoteDetailByNumber?QuoteNo=${quoteNo}`).then((res) => {
        console.log("1234567890", res);
        setPolicyDto(res.data.quotationDetail);
        setCKYCData(res.data.quotationDetail.CkycDetails);
        setCkycUpdateJson((prevState) => ({
          ...prevState,

          uniqueTransactionNumber: res.data.quotationDetail.CkycDetails.uniqueTransactionNumber,
        }));

        const sumInsuredChanges = res.data.quotationDetail.InsurableItem[0].RiskItems;
        res.data.quotationDetail.InsurableItem[0].RiskItems.forEach((x1, i1) => {
          let Obj = {};
          x1.SumInsuredBifurcation.forEach((x2) => {
            Obj = { ...Obj, [x2.RiskType]: x2.SI };
          });
          sumInsuredChanges[i1].SumInsuredBifurcation = Obj;
        });
        setaddLoc(sumInsuredChanges);
        setRowsID(res.data.quotationDetail.InsurableItem[0].RiskItems.length);
      });
    }
    if (proposalNumber !== null) {
      // debugger;
      await GetProposalByNumber(proposalNumber).then((result) => {
        console.log("response", result);
        setPolicyDto(result.data[0].policyDetails);
        const psd = result.data[0].policyDetails.ProposerDetails.PolicyStartDate.split("/");
        setPolStartDate(new Date(psd[2], psd[1], psd[0]));
        const ped = result.data[0].policyDetails.ProposerDetails.PolicyEndDate.split("/");
        setPolEndDate(new Date(ped[2], ped[1], ped[0]));
        setRowsID(result.data[0].policyDetails.InsurableItem[0].RiskItems.length);
        setDocUpload(result.data[0].policyDetails.DocumentDetails);
        const dob = result.data[0].policyDetails.ProposerDetails.DOB.split("/");
        setKycDate(new Date(dob[2], dob[1], dob[0]));
        setDateToShow((prev) => ({ ...prev, datetoShow: dob }));
        setIdType((prev) => ({
          ...prev,
          CINId: "",
          GSTINId: result.data[0].policyDetails.ProposerDetails.GST,
          PanId: result.data[0].policyDetails.CkycDetails.result.pan,
        }));
        setCKYCData(result.data[0].policyDetails.CkycDetails);
        setCkycUpdateJson((prevState) => ({
          ...prevState,

          uniqueTransactionNumber: result.data[0].policyDetails.CkycDetails.uniqueTransactionNumber,
        }));
        setCKYCReqJson((prev) => ({
          ...prev,
          idNo: result.data[0].policyDetails.CkycDetails.result.pan,
        }));
        setCKYCStatus(result.data[0].policyDetails.CkycDetails.status);
        if (result.data[0].policyDetails.CkycDetails.status === "success") {
          setKYCSecDisable(true);
        }
        const sumInsuredChanges = result.data[0].policyDetails.InsurableItem[0].RiskItems;
        result.data[0].policyDetails.InsurableItem[0].RiskItems.forEach((x1, i1) => {
          let Obj = {};
          x1.SumInsuredBifurcation.forEach((x2) => {
            Obj = { ...Obj, [x2.RiskType]: x2.SI };
          });
          sumInsuredChanges[i1].SumInsuredBifurcation = Obj;
        });
        setaddLoc(sumInsuredChanges);
      });
    }
  }, []);

  // const [QuoteData, setQuoteData] = useState({});

  const callPremiumData = async () => {
    await callPremiumMethod(PolicyDto).then((result) => {
      console.log("Premium Called", result);

      if (result.status === 1) {
        // PolicyDto.permiumamount = result.finalResult.FinalPremium;
        setRatingData({ ...result.finalResult });
        setPolicyDto(PolicyDto);
      }
    });
  };

  const [proposalNumber, setProposalNumber] = useState("");

  const callProposal = () => {
    console.log("callProposal....");
    calculateProposal(PolicyDto).then((result) => {
      console.log("11", result);
      if (result.data.proposalNumber !== "") {
        setProposalNumber(result.data.proposalNumber);
        PolicyDto.proposalNumber = result.data.proposalNumber;
        setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));

        // setPropFlag(false);
      }
    });
  };
  // console.log(ratingData, "ratingData");
  useEffect(() => {
    const abc = generateUUID();
    console.log("abc", abc, refNo);
    setrefNo(abc);
    if (false) {
      setLogo(dispatch, "USGILogo");
      setCustTheme(dispatch, "USGILogo");
    }
  }, []);
  const callstateDistrict = async (data2) => {
    const dist = await getDistrict(data2);
    const state = await getState(dist[0].mdata[0].mID);
    return { dist, state };
  };
  useEffect(async () => {
    if (PolicyDto.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      const abc = await callstateDistrict(PolicyDto.ProposerDetails.CommunicationAddress.Pincode);
      console.log("abc", abc);
      PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict = abc.dist[0].mdata[0].mValue;
      PolicyDto.ProposerDetails.CommunicationAddress.State = abc.state[0].mdata[0].mValue;
      setPolicyDto((prevState) => ({
        ...prevState,
        PolicyDto: prevState.PolicyDto,
      }));
    }
  }, [PolicyDto?.ProposerDetails?.CommunicationAddress?.Pincode]);
  // console.log("pincode", PolicyDto.ProposerDetails.CommunicationAddress.Pincode);
  // const callSaveQuoteData = async () => {
  //   await callSaveQuoteMethod(PolicyDto).then((result) => {
  //     console.log("Quotation Saved", result.data.quotation.quoteNo);
  //     console.log("Swal", result.status);

  //     if (result.status === 200) {
  //       setPolicyDto(PolicyDto);

  //       swal({
  //         text: `Quote Saved Successfully ${result.data.quotation.quoteNo}`,
  //         html: true,
  //         icon: "success",
  //       });
  //     }

  //     setQuoteData({ ...result.data });
  //   });
  // };
  // useEffect(async () => {
  //   if (PolicyDto.ProposerDetails.PinCode.length === 6) {
  //     const abc = await callstateDistrict(PolicyDto.ProposerDetails.PinCode);
  //     console.log("abc", abc);
  //     PolicyDto.ProposerDetails.District = abc.dist[0].mdata[0].mValue;
  //     PolicyDto.ProposerDetails.State = abc.state[0].mdata[0].mValue;
  //     setPolicyDto((prevState) => ({
  //       ...prevState,
  //       PolicyDto: prevState.PolicyDto,
  //     }));
  //   }
  // }, [PolicyDto.ProposerDetails.PinCode]);
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

  let step = new URLSearchParams(search).get("step");
  if (quoteNoo) {
    step = 0;
  } else if (proposalNo) {
    step = 2;
  } else {
    step = new URLSearchParams(search).get("step");
  }
  return (
    <MDBox>
      <Card>
        <HorizontalLinearStepper
          stepPar={step}
          setPolicyDto={setPolicyDto}
          PolicyDto={PolicyDto}
          callPremiumData={callPremiumData}
          callProposal={callProposal}
          ratingData={ratingData}
          setRatingData={setRatingData}
          master={master}
          setMaster={setMaster}
          proposalNumber={proposalNumber}
          setProposalNumber={setProposalNumber}
          rowsID={rowsID}
          setRowsID={setRowsID}
          addLoc={addLoc}
          setaddLoc={setaddLoc}
          setOTP={setOTP}
          OTP={OTP}
          setCheckDisclaimer={setCheckDisclaimer}
          checkDisclaimer={checkDisclaimer}
          setCheckInsurance={setCheckInsurance}
          checkInsurance={checkInsurance}
          checkProposalConsent={checkProposalConsent}
          setCheckProposalConsent={setCheckProposalConsent}
          setDocUpload={setDocUpload}
          docUpload={docUpload}
          setPolEndDate={setPolEndDate}
          polEndDate={polEndDate}
          setPolStartDate={setPolStartDate}
          polStartDate={polStartDate}
          setCKYCReqJson={setCKYCReqJson}
          CKYCReqJSon={CKYCReqJSon}
          setCKYCStatus={setCKYCStatus}
          CKYCStatus={CKYCStatus}
          setCKYCData={setCKYCData}
          CKYCData={CKYCData}
          setIdType={setIdType}
          IdType={IdType}
          setDateToShow={setDateToShow}
          datetoShow={datetoShow}
          setKycDate={setKycDate}
          kycDate={kycDate}
          setKYCSecDisable={setKYCSecDisable}
          CkycUpdateJson={CkycUpdateJson}
          setCkycUpdateJson={setCkycUpdateJson}
          kycSecDisable={kycSecDisable}
          setRiskPincode={setRiskPincode}
          riskPincode={riskPincode}
          // paymentHandler={paymentHandler}
          // handleSetPolicy={handleSetPolicy}
          // QuoteData={QuoteData}
          // callSaveQuoteData={callSaveQuoteData}
        />
      </Card>
    </MDBox>
  );
}

export default BLUS;
