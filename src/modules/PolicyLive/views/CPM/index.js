import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { setLogo, setCustTheme, useDataController } from "modules/BrokerPortal/context";
import QuoteDetails from "./QuoteDetails";
import ProposerDetails from "./ProposerDetails";
import PaymentDetails from "./PaymentDetails";
import { GetProposalByNumber } from "../BLUS/data/index";
// import { getQuoteSummary } from "./data/index";

const steps = ["Quote Details", "Proposer Details", "Payment Details"];

function GetStepContent({
  step,
  handleNext,
  handleBack,
  Json,
  setJson,
  setCheckProposalConsent,
  checkProposalConsent,
  setOTP,
  OTP,
  setCheckDisclaimer,
  checkDisclaimer,
  setMaster,
  master,
  addons,
  setAddons,
  currentIndex,
  setCurrentIndex,
  showField,
  setShowField,
  PremiumDetails,
  setPremiumDetails,
  paymentJson,
  setPaymentJson,
  CKYCData,
  setCKYCData,
  CKYCStatus,
  setCKYCStatus,
  CKYCReqJSon,
  setCKYCReqJson,
  IdType,
  setIdType,
  CkycUpdateJson,
  setCkycUpdateJson,
  CKYCUpdateData,
  setCKYCUpdateData,
  docUpload,
  setDocUpload,
  QuoteData,
  setQuoteData,
  checkInsurance,
  setCheckInsurance,
  Addtable,
  setAddtable,
  showbuttons,
  setShowButtons,
  kycDate,
  setKycDate,
  BackFlag,
  setBackFlag,
  activeTab,
  setActiveTab,
  SaveData,
  setSaveData,
  pinCode,
  setPincode,
}) {
  switch (step) {
    case 0:
      return (
        <QuoteDetails
          handleNext={handleNext}
          handleBack={handleBack}
          setCKYCData={setCKYCData}
          Json={Json}
          setJson={setJson}
          addons={addons}
          setAddons={setAddons}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          showField={showField}
          setShowField={setShowField}
          PremiumDetails={PremiumDetails}
          setPremiumDetails={setPremiumDetails}
          QuoteData={QuoteData}
          setQuoteData={setQuoteData}
          Addtable={Addtable}
          setAddtable={setAddtable}
          showbuttons={showbuttons}
          setShowButtons={setShowButtons}
          BackFlag={BackFlag}
          setBackFlag={setBackFlag}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          SaveData={SaveData}
          setSaveData={setSaveData}
          pinCode={pinCode}
          setPincode={setPincode}
          setCKYCStatus={setCKYCStatus}
          setCKYCReqJson={setCKYCReqJson}
          setIdType={setIdType}
          setCkycUpdateJson={setCkycUpdateJson}
        />
      );
    case 1:
      return (
        <ProposerDetails
          handleNext={handleNext}
          handleBack={handleBack}
          Json={Json}
          setJson={setJson}
          setCheckProposalConsent={setCheckProposalConsent}
          checkProposalConsent={checkProposalConsent}
          setOTP={setOTP}
          OTP={OTP}
          checkDisclaimer={checkDisclaimer}
          setCheckDisclaimer={setCheckDisclaimer}
          setMaster={setMaster}
          master={master}
          CKYCData={CKYCData}
          setCKYCData={setCKYCData}
          CKYCStatus={CKYCStatus}
          setCKYCStatus={setCKYCStatus}
          CKYCReqJSon={CKYCReqJSon}
          setCKYCReqJson={setCKYCReqJson}
          IdType={IdType}
          setIdType={setIdType}
          CkycUpdateJson={CkycUpdateJson}
          setCKYCUpdateData={setCKYCUpdateData}
          CKYCUpdateData={CKYCUpdateData}
          setCkycUpdateJson={setCkycUpdateJson}
          docUpload={docUpload}
          setDocUpload={setDocUpload}
          checkInsurance={checkInsurance}
          setCheckInsurance={setCheckInsurance}
          setKycDate={setKycDate}
          kycDate={kycDate}
          BackFlag={BackFlag}
          setBackFlag={setBackFlag}
          SaveData={SaveData}
          setSaveData={setSaveData}
          pinCode={pinCode}
          setPincode={setPincode}
        />
      );
    case 2:
      return (
        <PaymentDetails
          handleNext={handleNext}
          handleBack={handleBack}
          Json={Json}
          paymentJson={paymentJson}
          setPaymentJson={setPaymentJson}
          setJson={setJson}
          SaveData={SaveData}
          setSaveData={setSaveData}
          pinCode={pinCode}
          setPincode={setPincode}
        />
      );
    default:
      return "Unknown step";
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
  Json,
  setJson,
  setCheckProposalConsent,
  checkProposalConsent,
  setOTP,
  OTP,
  setCheckDisclaimer,
  checkDisclaimer,
  setMaster,
  master,
  addons,
  setAddons,
  currentIndex,
  setCurrentIndex,
  showField,
  setShowField,
  PremiumDetails,
  setPremiumDetails,
  paymentJson,
  setPaymentJson,
  CKYCData,
  setCKYCData,
  CKYCStatus,
  setCKYCStatus,
  CKYCReqJSon,
  setCKYCReqJson,
  IdType,
  setIdType,
  CkycUpdateJson,
  setCkycUpdateJson,
  CKYCUpdateData,
  setCKYCUpdateData,
  docUpload,
  setDocUpload,
  QuoteData,
  setQuoteData,
  checkInsurance,
  setCheckInsurance,
  Addtable,
  setAddtable,
  showbuttons,
  setShowButtons,
  kycDate,
  setKycDate,
  BackFlag,
  setBackFlag,
  activeTab,
  setActiveTab,
  SaveData,
  setSaveData,
  pinCode,
  setPincode,
}) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  console.log("activeStep", activeStep);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`modules/PolicyLive/views/CPM/ProposerDetails`);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  // const onHandleBack = () => {
  //   handleBack();
  // };

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

  return (
    <MDBox>
      <MDTypography align="left" display="block" variant="h4" ml={2} mt={2}>
        Contractor&apos;s Plant & Machinery Insurance
      </MDTypography>
      <MDBox xs={{ bgcolor: "background.paper" }} m={5}>
        <ThemeProvider theme={theme}>
          <CustomStepper sx={{ ml: "15%", mr: "15%", mt: "3%" }} activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{
                      flexDirection: "row",
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </CustomStepper>
        </ThemeProvider>
        {activeStep === steps.length ? (
          <fragment>
            <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <MDBox sx={{ flex: "1 1 auto" }} />
              <MDButton onClick={onClick}>Proceed</MDButton>
            </MDBox>
          </fragment>
        ) : (
          <GetStepContent
            step={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            Json={Json}
            setJson={setJson}
            SaveData={SaveData}
            setSaveData={setSaveData}
            setCheckProposalConsent={setCheckProposalConsent}
            // PolicyDto={PolicyDto}
            // setPolicyDto={setPolicyDto}
            checkProposalConsent={checkProposalConsent}
            setOTP={setOTP}
            OTP={OTP}
            checkDisclaimer={checkDisclaimer}
            setCheckDisclaimer={setCheckDisclaimer}
            setMaster={setMaster}
            master={master}
            addons={addons}
            setAddons={setAddons}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            showField={showField}
            setShowField={setShowField}
            PremiumDetails={PremiumDetails}
            setPremiumDetails={setPremiumDetails}
            paymentJson={paymentJson}
            setPaymentJson={setPaymentJson}
            CKYCData={CKYCData}
            setCKYCData={setCKYCData}
            CKYCStatus={CKYCStatus}
            setCKYCStatus={setCKYCStatus}
            CKYCReqJSon={CKYCReqJSon}
            setCKYCReqJson={setCKYCReqJson}
            IdType={IdType}
            setIdType={setIdType}
            CkycUpdateJson={CkycUpdateJson}
            setCKYCUpdateData={setCKYCUpdateData}
            CKYCUpdateData={CKYCUpdateData}
            setCkycUpdateJson={setCkycUpdateJson}
            docUpload={docUpload}
            setDocUpload={setDocUpload}
            QuoteData={QuoteData}
            setQuoteData={setQuoteData}
            checkInsurance={checkInsurance}
            setCheckInsurance={setCheckInsurance}
            Addtable={Addtable}
            setAddtable={setAddtable}
            showbuttons={showbuttons}
            setShowButtons={setShowButtons}
            setKycDate={setKycDate}
            kycDate={kycDate}
            BackFlag={BackFlag}
            setBackFlag={setBackFlag}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            pinCode={pinCode}
            setPincode={setPincode}
          />
        )}
      </MDBox>
    </MDBox>
  );
}

function CPM() {
  const [, dispatch] = useDataController();
  const [master, setMaster] = useState({
    Salutation: { mID: "", mValue: "" },
    Gender: { mID: "", mValue: "" },
  });
  const [CKYCData, setCKYCData] = useState();
  const [CKYCStatus, setCKYCStatus] = useState("");
  const [SaveData, setSaveData] = useState([]);
  const [kycDate, setKycDate] = useState(null);
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
    CIN: "",
    GSTIN: "",
  });
  const [IdType, setIdType] = useState({
    Pan: "",
    GSTIN: "",
    CIN: "",
  });
  const [CkycUpdateJson, setCkycUpdateJson] = useState({
    source: "AVO",
    uniqueTransactionNumber: "",
    extraField1: "",
    extraField2: "",
    extraField3: "",
    extraField4: "",
    extraField5: "",
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
      DMSDocId: "",
    },
  ]);
  const [CKYCUpdateData, setCKYCUpdateData] = useState();
  const [showField, setShowField] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [QuoteData, setQuoteData] = useState({});
  const [pinCode, setPincode] = useState(true);
  const [addons, setAddons] = useState([
    {
      "Property Damage": "No",
      Terrorism: "No",
      Floater: "No",
      Earthquake: "Yes",
      STFI: "Yes",
      "Third Party Liability": "No",
      "Owners Surrounding Property": "No",
      "Marine Inland Transit": "No",
      "Removal of Debris": "No",
      "Escalation Clause": "No",
      EscalationClause: "0",
      InlandTransitPolicyRate: "",
    },
  ]);
  const [PremiumDetails, setPremiumDetails] = useState([
    {
      "CPM Basic Premium": "",
      "EQ Premium": "",
      "STFI Premium": "",
      "Floater Premium": "",
      "Third Party Liability Premium": "",
      "Owners Surrounding Property Premium": "",
      "Removal of Debris Premium": "",
      "Escalation Clause Premium": "",
      "Terrorism Premium": "",
      // "Add on Premium": "",
      "Inland Transit Policy": "",
      Loading: "",
      "Net Premium": "",
      "GST(18%)": "",
      "Total with Tax": "",
      GCBasewithLoadingPremium: "",
      CGST: "",
      SGST: "",
      ThirdPartyLiabilitySI: "",
      OwnerSurroundingSI: "",
      EscalationClauseSI: "",
      RemovalDebrisSI: "",
      BaseInclTerrorism: "",
      PremiumexcTer: "",
    },
  ]);

  const [Json, setJson] = useState({
    PolicyStartDate: "",
    PolicyEndDate: "",
    PStartDate: "",
    PEndDate: "",
    ProposalDate: "",
    "Agent Id": "",
    "Product Code": "CPM_V1",
    ProductName: "CONTRACTOR's PLANT AND MACHINERY",
    TotalSumInsured: "",
    Locationoftheequipment: "",
    AgeofEquipment: "",
    BusinessType: "New Business",
    ClaimsExperience: "",
    AnnualMaintenanceContractAMC: "",
    RepairFacilitiesinIndia: "",
    Hypothecation: "",
    BankName: "",
    BankbranchaddressName: "",
    LoanAccountNumber: "",
    LoadingDiscount: "0",
    Discount: "0",
    CustomerType: "Individual",
    "Quotation No": "",
    proposalNumber: "",
    // ProposalNo: "",
    AdditionalTermsCondtions: "",
    Remarks: "",
    BackDatingMessage: "",
    GCProductName: "CONTRACTORPLANTANDMACHINERYINSURANCE",
    GCProductCode: "2224",
    LOB: "Property",
    QuoteMobileNo: "",
    QuoteEmail: "",
    Channel: {
      BranchCode: "",
      BranchLocation: "",
      AgentID: "",
      AgentName: "",
      AgentType: "",
      AgentContactNo: "",
      Salespersoncode: "",
      Salespersonname: "",
      ChannelType: "Agent",
      OfficeCode: "",
      OfficeName: "",
      OfficeAddress: "",
      PrimaryMOCode: "",
      PrimaryMOName: "",
      PrimaryVerticalCode: "",
      PrimaryVerticalName: "",
      DealId: "",
    },
    ProposerDetails: {
      Salutation: "",
      Name: "",
      "First Name": "",
      "Last Name": "",
      Gender: "",
      DOB: "",

      "Email ID": "",
      "Mobile Number": "",
      PanNo: "",
      GSTNumber: "",
      CKYCParam: "",
      AadharID: "",
      AadharMobileNo: "",
      AadharName: "",
      AadharGender: "",
      CommunicationSameAsPermanent: "Yes",
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        Pincode: "",
        District: "",
        City: "",
        State: "",
        "Email ID": "",
        "Mobile Number": "",
        Statecode: "",
        Districtcode: "",
      },
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        Pincode: "",
        District: "",
        City: "",
        State: "",
        "Email ID": "",
        "Mobile Number": "",
        Statecode: "",
        Districtcode: "",
      },
    },
    PaymentDetails: {
      ChequeAmount: "",
      InstrumentNo: "",
      InstrumentDate: "",
      BankName: "",
      transactionNo: "",
      paymentSource: "",
      paymentId: "",
      paymentResponse: "",
      paymentType: "",
      paymentRefNo: "",
    },
    InsurableItem: [
      {
        InsurableName: "Property",
        Covers: [
          {
            CoverName: "Property Damage",
            IsOptional: false,
          },
          {
            CoverName: "Terrorism",
            IsOptional: true,
          },
          {
            CoverName: "Floater",
            IsOptional: true,
          },
          {
            CoverName: "Earthquake",
            IsOptional: false,
          },
          {
            CoverName: "STFI",
            IsOptional: false,
          },
          {
            CoverName: "Third Party Liability",
            IsOptional: true,
          },
          {
            CoverName: "Owners Surrounding Property",
            IsOptional: true,
          },
          {
            CoverName: "Marine Inland Transit",
            IsOptional: true,
            InlandTransitPolicyRate: "",
          },
          {
            CoverName: "Removal of Debris",
            IsOptional: true,
          },
          {
            CoverName: "Escalation Clause",
            IsOptional: true,
            EscalationClause: "",
          },
        ],
        RiskItems: [
          {
            EquipmentCode: "",
            "Make & Model": "",
            EquipmentDescription: "",
            EquipmentSerialNo: "",
            EquipmentGroup: "",
            "SerialNumber & ChasisNumber": "",
            SumInsured: "",
            YearofManufacturing: "",
            RiskLocation: {
              AnyWhereinindia: "No",
              Address01: "",
              Address02: "",
              Pincode: "",
              District: "",
              State: "",
              Zone: "",
              ZoneNo: "",
            },
          },
        ],
      },
    ],
  });

  const [checkProposalConsent, setCheckProposalConsent] = useState(false);
  const [checkDisclaimer, setCheckDisclaimer] = useState(false);
  const [checkInsurance, setCheckInsurance] = useState(false);
  const [OTP, setOTP] = useState("");
  const [Addtable, setAddtable] = React.useState(false);
  const [showbuttons, setShowButtons] = React.useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [paymentJson, setPaymentJson] = useState({
    paymentDetailsDTO: {
      ChequeAmount: "",
      InstrumentNo: "",
      InstrumentDate: "",
      BankName: "",
      transactionNo: "",
      paymentSource: "",
      paymentId: "",
      paymentResponse: "",
      "Pay-U": "Pay",
    },
    proposalNo: "",
    policyNo: "",
  });

  const [BackFlag, setBackFlag] = useState(false);

  const { search } = useLocation();
  // const quoteNo = "USCPM202308180001055";
  const quoteNo = new URLSearchParams(search).get("quotationno");

  // const proposalNo = "USCPM202308290000472Proposal";
  const proposalNo = new URLSearchParams(search).get("proposernum");

  // useEffect(async () => {
  //   debugger;
  //   if (quoteNo !== null) {
  //     await getQuoteSummary(quoteNo).then((result) => {
  //       debugger;
  //       console.log("response", result);
  //       const channeldata = result.data.quotation.channel;
  //       const channelparse = JSON.parse(channeldata);
  //       setJson((prev) => ({ ...prev, Channel: channelparse }));
  //       console.log("chanelparse", channelparse);
  //       const quotation = result.data.quotation.quotationDetailsDTO[0].quotationDetails;
  //       const quotationparse = JSON.parse(quotation);
  //       setJson((prev) => ({ ...prev, ...quotationparse }));
  //       // setActiveTab(quotationparse.AddOnArray.length - 1);
  //       setAddons(quotationparse.AddOnArray);
  //       console.log("quotationparse", quotationparse);
  //       setShowField(quotationparse.InsurableItem[0].RiskItems);
  //       setPremiumDetails(quotationparse.PremiumArray);
  //     });
  //   }
  // }, []);

  useEffect(async () => {
    if (proposalNo !== null) {
      await GetProposalByNumber(proposalNo).then((result) => {
        console.log("response", result);
        setJson(result.data[0].policyDetails);
        setCKYCStatus(result.data[0].policyDetails.CkycStatus);
        setCKYCReqJson(result.data[0].policyDetails.CkycDetails.result);
        setAddons(result.data[0].policyDetails.AddOnArray);
        setCKYCData(result.data[0].policyDetails.CkycDetails);
        setShowField(result.data[0].policyDetails.InsurableItem[0].RiskItems);
        setPremiumDetails(result.data[0].policyDetails.PremiumArray);
        const newQuoteSave = result.data[0].policyDetails;
        const updatedQuoteSave = [...SaveData];
        IdType.Pan = result.data[0].policyDetails.ProposerDetails.PanNo;
        IdType.GSTIN = result.data[0].policyDetails.ProposerDetails.GSTNumber;
        IdType.CIN = result.data[0].policyDetails.ProposerDetails.CIN;
        CKYCReqJSon.dob = result.data[0].policyDetails.ProposerDetails.DOB;
        setCKYCStatus(result.data[0].policyDetails.CkycStatus);
        setIdType({ ...IdType });
        setCKYCReqJson({ ...CKYCReqJSon });
        updatedQuoteSave[activeTab] = newQuoteSave;
        setSaveData(updatedQuoteSave);
        setCkycUpdateJson((prevState) => ({
          ...prevState,
          uniqueTransactionNumber: result.data[0].policyDetails.CkycDetails.uniqueTransactionNumber,
        }));
        // setIdType((prev) => ({
        //   ...prev,
        //   CIN: "",
        //   GSTIN: result.data[0].policyDetails.ProposerDetails.GSTNumber,
        //   Pan: result.data[0].policyDetails.ProposerDetails.PanNo,
        // }));
      });
    }
  }, []);

  useEffect(() => {
    if (false) {
      setLogo(dispatch, "USGILogo");
      setCustTheme(dispatch, "USGILogo");
    }
  }, []);

  let step = new URLSearchParams(search).get("step");
  if (quoteNo) {
    step = 0;
  } else if (proposalNo) {
    step = 1;
  } else {
    step = new URLSearchParams(search).get("step");
  }

  return (
    <MDBox>
      <Card>
        <HorizontalLinearStepper
          // stepPar={proposalNo !== null ? 1 : step}
          stepPar={step}
          Json={Json}
          setJson={setJson}
          pinCode={pinCode}
          setPincode={setPincode}
          setCheckProposalConsent={setCheckProposalConsent}
          checkProposalConsent={checkProposalConsent}
          checkDisclaimer={checkDisclaimer}
          setCheckDisclaimer={setCheckDisclaimer}
          setOTP={setOTP}
          OTP={OTP}
          setMaster={setMaster}
          SaveData={SaveData}
          setSaveData={setSaveData}
          master={master}
          addons={addons}
          setAddons={setAddons}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          showField={showField}
          setShowField={setShowField}
          PremiumDetails={PremiumDetails}
          setPremiumDetails={setPremiumDetails}
          paymentJson={paymentJson}
          setPaymentJson={setPaymentJson}
          CKYCData={CKYCData}
          setCKYCData={setCKYCData}
          CKYCStatus={CKYCStatus}
          setCKYCStatus={setCKYCStatus}
          CKYCReqJSon={CKYCReqJSon}
          setCKYCReqJson={setCKYCReqJson}
          IdType={IdType}
          setIdType={setIdType}
          CkycUpdateJson={CkycUpdateJson}
          setCKYCUpdateData={setCKYCUpdateData}
          CKYCUpdateData={CKYCUpdateData}
          setCkycUpdateJson={setCkycUpdateJson}
          docUpload={docUpload}
          setDocUpload={setDocUpload}
          QuoteData={QuoteData}
          setQuoteData={setQuoteData}
          checkInsurance={checkInsurance}
          setCheckInsurance={setCheckInsurance}
          Addtable={Addtable}
          setAddtable={setAddtable}
          showbuttons={showbuttons}
          setShowButtons={setShowButtons}
          setKycDate={setKycDate}
          kycDate={kycDate}
          BackFlag={BackFlag}
          setBackFlag={setBackFlag}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Card>
    </MDBox>
  );
}

export default CPM;
