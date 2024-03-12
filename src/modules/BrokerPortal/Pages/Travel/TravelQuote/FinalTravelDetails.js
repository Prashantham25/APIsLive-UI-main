import React, { useState, useEffect } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card } from "@mui/material";
// import swal from "sweetalert";
// import { isValid } from "date-fns";
// import { postRequest } from "core/clients/axiosclient";

// import { ArrowBack } from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import BPNavbar from "../../../Layouts/BPNavbar";
import ProposerDetails from "./ProposerDetails";
import TravellerDetails from "./TravellerDetails";
import PolicySummary from "./PolicySummary";
import CKYC from "./CKYC";
// import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";
import {
  useDataController,
  //  setQuoteProposalOutput
} from "../../../context/index";
// import {
//   GetProductPartnerMasterProposer,
//   // GetAllMasters,
//   // GetAllMastersProposer,
// } from "../data/index";

const steps = ["ProposerDetails", "TravellerDetails", "CKYC", "PolicySummary"];

function GetStepContent({
  step,
  handleNext,
  handleBack,
  quoteProposalOutput,
  transDetails,
  customerDetails,
  // masters1,
  // handleRelationShip,
  // Masters,
  // handleSalutation,
  // handleGender,
  // datetoShow,
  // handleDateChange,
  // setFlags,
  // flags,
  // addressCity,
  // handleAddress,
  // PolicyDto,
  // setPolicyDto,
  // handleSetProposerAddress,
}) {
  switch (step) {
    case 0:
      return (
        quoteProposalOutput !== null && (
          <ProposerDetails
            handleNext={handleNext}
            quoteProposalOutput={quoteProposalOutput}
            customerDetails={customerDetails}
            // GetProductPartnerMasterProposer={GetProductPartnerMasterProposer}
            // GetAllMastersProposer={GetAllMastersProposer}
            // GetAllMasters={GetAllMasters}
            handleBack={handleBack}
            // handleGender={handleGender}
            // handleRelationShip={handleRelationShip}
            // Masters={Masters}
            // handleSalutation={handleSalutation}
            // masters1={masters1}
            // handleDateChange={handleDateChange}
            // datetoShow={datetoShow}
            // setFlags={setFlags}
            // flags={flags}
            // addressCity={addressCity}
            // handleAddress={handleAddress}
            // handleSetProposerAddress={handleSetProposerAddress}
            // setPolicyDto={setPolicyDto}
            // PolicyDto={PolicyDto}
          />
        )
      );
    case 1:
      return (
        quoteProposalOutput !== null && (
          <TravellerDetails
            handleNext={handleNext}
            handleBack={handleBack}
            quoteProposalOutput={quoteProposalOutput}
            // handleGender={handleGender}
            // handleSalutation={handleSalutation}
          />
        )
      );
    case 2:
      return (
        quoteProposalOutput !== null && <CKYC handleNext={handleNext} handleBack={handleBack} />
      );
    case 3:
      return (
        <PolicySummary
          handleNext={handleNext}
          handleBack={handleBack}
          transDetails={transDetails}
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
  transDetails,
  quoteProposalOutput,
  customerDetails,
  // handleRelationShip,
  // Masters,
  // handleSalutation,
  // handleGender,
  // masters1,
  // handleDateChange,
  // datetoShow,
  // setFlags,
  // flags,
  // addressCity,
  // handleAddress,
  // setPolicyDto,
  // PolicyDto,
  // handleSetProposerAddress,
}) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  console.log("activestep", activeStep);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/PaymentMethod`);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const navigate = useNavigate();
  const onHandleBack = () => {
    // navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
    handleBack();
  };
  const BacktoQuotes = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision`);
  };
  // console.log("customer", customerDetails);

  return (
    <MDBox>
      <BPNavbar />
      <MDBox xs={{ bgcolor: "background.paper" }} m={10}>
        <MDBox>
          {activeStep === 0 ? (
            <MDTypography sx={{ cursor: "pointer" }} onClick={BacktoQuotes}>
              <KeyboardBackspace />
              <u> Back to Quotes </u>
            </MDTypography>
          ) : null}
          {activeStep === 1 || activeStep === 2 ? (
            <MDTypography sx={{ cursor: "pointer" }} onClick={onHandleBack}>
              <KeyboardBackspace />
              <u> Back </u>
            </MDTypography>
          ) : null}

          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </MDBox>
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
            transDetails={transDetails}
            quoteProposalOutput={quoteProposalOutput}
            customerDetails={customerDetails}
            // handleGender={handleGender}
            // handleRelationShip={handleRelationShip}
            // Masters={Masters}
            // handleSalutation={handleSalutation}
            // masters1={masters1}
            // handleDateChange={handleDateChange}
            // datetoShow={datetoShow}
            // setFlags={setFlags}
            // flags={flags}
            // addressCity={addressCity}
            // handleAddress={handleAddress}
            // setPolicyDto={setPolicyDto}
            // PolicyDto={PolicyDto}
            // handleSetProposerAddress={handleSetProposerAddress}
          />
        )}
      </MDBox>
    </MDBox>
  );
}

function TravelPolicyPurchase({ step, transDetails }) {
  // const { search } = useLocation();
  // const step = new URLSearchParams(search).get("step");

  const [controller] = useDataController();
  const { quoteProposalOutput, customerDetails, navigateToOtherPage } = controller;
  // const [PolicyDto, setPolicyDto] = useState(quoteProposalOutput);
  // const [args, setArgs] = useState({
  //   productId: null,
  //   partnerId: null,
  //   masterType: null,
  //   jsonValue: null,
  // });
  // useEffect(() => {
  //   setArgs({
  //     productId: 918,
  //     partnerId: PolicyDto.PartnerId,
  //     masterType: null,
  //     jsonValue: null,
  //   });
  // }, [PolicyDto]);
  // const { Masters } = GetProductPartnerMasterProposer(args);
  // // const { Salutation, TravelInsuredRelation, Gender } = Masters;``
  // const [masters1, setMasters1] = useState({
  //   TravelInsuredRelation: { mID: "", mValue: "" },
  //   Gender: { mID: "", mValue: "" },
  //   // Purposeoftravel: { mID: "", mValue: "" },
  //   // Nationality: { mID: "", mValue: "" },
  //   Salutation: { mID: "", mValue: "" },
  // });

  // const [datetoShow, setDate] = useState({
  //   dateOfBirth: null,
  // });

  // const [flags, setFlags] = useState({
  //   errorFlag: false,
  //   nameReg: false,
  //   numError: false,
  //   relationReg: false,
  //   pinCodeRegex: false,
  //   cityReg: false,
  //   stateReg: false,
  //   emailError: false,
  //   mobileRegex: false,
  //   ageFlag: false,
  //   Age: "",
  //   areaReg: false,
  //   areaError: false,
  // });

  // const [addressCity, setAddressCity] = useState({
  //   city: "",
  //   district: "",
  //   state: "",
  // });

  // const handleSalutation = (event, values, name) => {
  //   if (name === "Salutation") {
  //     setMasters1((prevState) => ({ ...prevState, Salutation: values }));
  //     if (values.mValue !== "") {
  //       // setPolicyDto((prevState) => ({ ...prevState, Salutation: values.mID }));
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ProposerDetails: { ...prevState.ProposerDetails, Salutation: values.mID },
  //       }));
  //     }
  //   }
  // };
  // const handleGender = (event, values, name) => {
  //   if (name === "Gender") {
  //     // PolicyDTO.InsurableItem[0].RiskItems[index][name] = values.mValue;
  //     setMasters1((prevState) => ({ ...prevState, Gender: values }));
  //     if (values.mValue !== "") {
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ProposerDetails: { ...prevState.ProposerDetails, Gender: values.mID },
  //       }));
  //     }
  //   }
  // };

  // const handleRelationShip = (event, values, name) => {
  //   if (name === "TravelInsuredRelation") {
  //     // PolicyDTO.InsurableItem[0].RiskItems[index][name] = values.mValue;
  //     setMasters1((prevState) => ({ ...prevState, TravelInsuredRelation: values }));
  //     if (values.mValue !== "") {
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ProposerDetails: { ...prevState.ProposerDetails, RelationWithInsured: values.mID },
  //       }));
  //     }
  //   }
  // };
  // const [validDate, setValidDate] = useState(false);
  // const handleCalculateAge = (date) => {
  //   const dob = new Date(date);
  //   const dobYear = dob.getYear();
  //   const dobMonth = dob.getMonth();
  //   const dobDate = dob.getDate();
  //   const now = new Date();
  //   // extract the year, month, and date from current date
  //   const currentYear = now.getYear();
  //   const currentMonth = now.getMonth();
  //   const currentDate = now.getDate();
  //   let yearAge = currentYear - dobYear;
  //   let monthAge;
  //   if (currentMonth >= dobMonth) {
  //     monthAge = currentMonth - dobMonth;
  //   }
  //   // get months when current month is greater
  //   else {
  //     yearAge -= 1;
  //     monthAge = 12 + currentMonth - dobMonth;
  //   }
  //   // get days
  //   // let dateAge;
  //   if (currentDate >= dobDate) {
  //     // dateAge = currentDate - dobDate;
  //   } else {
  //     monthAge -= 1;
  //     // dateAge = 31 + currentDate - dobDate;
  //     if (monthAge < 0) {
  //       monthAge = 11;
  //       yearAge -= 1;
  //     }
  //   }
  //   // group the age in a single variable
  //   return yearAge;
  // };
  // console.log("validDate", validDate);

  // // const formatPropDate = (date) => {
  // //   const propformat = (val) => (val > 9 ? val : `0${val}`);
  // //   const propdate = new Date(date);
  // //   return `${propformat(propdate.getDate())}-${propformat(
  // //     propdate.getMonth() + 1
  // //   )}-${propdate.getFullYear()}`;
  // // };
  // const formatDate = (date) => {
  //   const format1 = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format1(dt.getDate())}-${format1(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };

  // const handleDateChange = (value, label, type) => {
  //   // PolicyDto.ProposerDetails[e.target.name] = e.target.value;

  //   const date = new Date(value).getFullYear();
  //   const dateString = date.toString().length;
  //   if (value !== null && isValid(new Date(value)) && dateString === 4) {
  //     const dob = value.toLocaleDateString("en-ZA");
  //     const age = handleCalculateAge(dob);
  //     setValidDate(false);
  //     if (age < 18) {
  //       setFlags((prevState) => ({ ...prevState, Age: age }));
  //       swal({
  //         icon: "error",
  //         text: "Please enter valid Date of birth",
  //       });
  //     } else {
  //       setDate((prevState) => ({ ...prevState, [label]: value }));
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ProposerDetails: { ...prevState.ProposerDetails, [type]: formatDate(value) },
  //       }));
  //       console.log("setPolicyDto", PolicyDto);
  //     }
  //   } else {
  //     setValidDate(true);
  //     setDate((prevState) => ({ ...prevState, [label]: null }));
  //   }
  // };
  // const handleAddress = (e, type) => {
  //   if (type === "Pincode") {
  //     // const { CommunicationAddress } = PolicyDto;
  //     if (e.target.name === "Pincode") {
  //       const pinCodeRegex = /^[0-9]*$/;
  //       if (pinCodeRegex.test(e.target.value) || e.target.value === "") {
  //         PolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //         setPolicyDto({ ...PolicyDto });
  //       }
  //     } else {
  //       PolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //       setPolicyDto({ ...PolicyDto });
  //     }
  //   }
  // };

  // const handleSetProposerAddress = (e) => {
  //   // PolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //   if (e.target.name === "AddressLine1") {
  //     PolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //   } else if (e.target.name === "AddressLine2") {
  //     // setPolicyDto((prevState) => ({ ...prevState, AddressLine2: e.target.value }));
  //     PolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //   } else if (e.target.name === "Area/Locality") {
  //     const areaReg = /^[a-zA-Z\s]*$/;
  //     if (areaReg.test(e.target.value)) {
  //       setFlags((prevState) => ({ ...prevState, areaReg: false }));
  //       PolicyDto.ProposerDetails.CommunicationAddress.Area = e.target.value;
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, areaReg: true }));
  //     }
  //   } else if (e.target.name === "City") {
  //     const stateReg = /^[a-zA-Z\s]*$/;
  //     if (stateReg.test(e.target.value)) {
  //       // setPolicyDto((prevState) => ({ ...prevState, CityDistrict: e.target.value }));
  //       setFlags((prevState) => ({ ...prevState, stateReg: false }));
  //       PolicyDto.ProposerDetails.CommunicationAddress.Landmark = e.target.value;
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, stateReg: true }));
  //     }
  //   } else if (e.target.name === "State") {
  //     const stateReg = /^[a-zA-Z\s]*$/;
  //     if (stateReg.test(e.target.value)) {
  //       // setPolicyDto((prevState) => ({ ...prevState, State: e.target.value }));
  //       setFlags((prevState) => ({ ...prevState, stateReg: false }));
  //       PolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, stateReg: true }));
  //     }
  //   } else if (e.target.name === "Pincode") {
  //     const pinCodeRegex = /^[0-9]*$/;
  //     if (pinCodeRegex.test(e.target.value)) {
  //       setFlags((prevState) => ({ ...prevState, pinCodeRegex: false }));
  //       PolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, pinCodeRegex: true }));
  //     }
  //   }
  //   setPolicyDto({ ...PolicyDto });
  // };

  // const getPincodeDetails1 = async (pincodeValue) => {
  //   const getPincodeDistrictStateData = async (type, id) => {
  //     const urlString = `Product/GetProdPartnermasterData?ProductId=${args.productId}&PartnerId=${args.partnerId}&MasterType=${type}`;
  //     let payload;
  //     switch (type) {
  //       case "State":
  //         payload = { State_Id: id };
  //         break;
  //       case "CityDistrict":
  //         payload = { City_Id: id };
  //         break;
  //       case "DetailsPincode":
  //         payload = { Pincode: id };
  //         break;
  //       default:
  //         break;
  //     }

  //     const dataValue = await (await postRequest(urlString, payload)).data;
  //     return dataValue;
  //   };

  //   const pincodeData = await getPincodeDistrictStateData("DetailsPincode", pincodeValue);

  //   const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].CityId);

  //   const state = await getPincodeDistrictStateData("State", district[0].StateId);

  //   return { pinCode: pincodeData, district, state };
  // };

  // useEffect(async () => {
  //   // if(PolicyDto.partnerId===99){
  //   if (PolicyDto.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
  //     const { district, state } = await getPincodeDetails1(
  //       PolicyDto.ProposerDetails.CommunicationAddress.Pincode
  //     );
  //     const newCommunicationAddress = {
  //       Pincode: PolicyDto.ProposerDetails.CommunicationAddress.Pincode,
  //     };
  //     setAddressCity((prevState) => ({
  //       ...prevState,
  //       state: state[0].mValue,
  //       city: district[0].mValue,
  //       district: district[0].DistrictName,
  //     }));
  //     setPolicyDto((prevState) => {
  //       const { CommunicationAddress } = prevState.ProposerDetails;
  //       const newValue = {
  //         ...CommunicationAddress,
  //         State: state[0].mID,
  //         CityDistrict: district[0].mID,
  //         CityDistrictName: district[0].mValue,
  //         District: district[0].DistrictId,
  //         // CityId: district[0].CityId ? district[0].CityId : district[0].mID,
  //       };
  //       return {
  //         ...prevState,
  //         ProposerDetails: {
  //           ...prevState.ProposerDetails,
  //           CommunicationAddress: { ...newValue, ...newCommunicationAddress },
  //         },
  //       };
  //     });
  //   }
  //   // }
  // }, [PolicyDto.ProposerDetails.CommunicationAddress.Pincode]);
  const navigate = useNavigate();

  useEffect(() => {
    // const POSPSales = localStorage.getItem("POSPSales");
    const BrokerUser = localStorage.getItem("BrokerUser");
    if (window.performance) {
      // console.log("refresh", performance.navigation.type);
      if (
        performance.navigation.type === 1 &&
        navigateToOtherPage === null &&
        quoteProposalOutput === null &&
        step !== 3
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
    <MDBox>
      <Card>
        {/* {quoteProposalOutput !== null && ( */}
        <HorizontalLinearStepper
          stepPar={step}
          quoteProposalOutput={quoteProposalOutput}
          customerDetails={customerDetails}
          transDetails={transDetails}
          // masters1={masters1}
          // Masters={Masters}
          // handleSalutation={handleSalutation}
          // handleGender={handleGender}
          // handleRelationShip={handleRelationShip}
          // handleDateChange={handleDateChange}
          // datetoShow={datetoShow}
          // setFlags={setFlags}
          // flags={flags}
          // addressCity={addressCity}
          // handleAddress={handleAddress}
          // handleSetProposerAddress={handleSetProposerAddress}
          // setPolicyDto={setPolicyDto}
          // PolicyDto={PolicyDto}
        />
        {/* )} */}
      </Card>
    </MDBox>
  );
}

export default TravelPolicyPurchase;
