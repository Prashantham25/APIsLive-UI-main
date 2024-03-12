import React, { useState, useEffect } from "react";
import { Card, Backdrop, CircularProgress } from "@mui/material";

import { useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import swal from "sweetalert";
import { useDataController, setTravellerInfinityDetails } from "modules/BrokerPortal/context";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import ProposerDetails from "./ProposerDetails";
import InsuredDetails from "./InsuredDetails";
import OtherDetails from "./OtherDetails";
import QuotationDetails from "./QuotationDetails";
import PremiumBreakup from "./PremiumBreakup";
import PolicySummary from "./PolicySummary";

import { calculatePremium, getMasterData, PolicyGenerateCoi } from "./data";
import PolicyObj from "./data/jsonData";

const steps = [
  "Quotation Details",
  "Proposer Details",
  "Insured Details",
  "Other Details",
  "Premium Breakup",
  "Policy Summary",
];

function GetStepContent({
  step,
  InfinityDto,
  setInfinityDto,
  setPremiumData,
  FinalPremiumData,
  setFinalPremiumData,
  PolicyData,
  setPolicyData,
  PreData,
  setPreData,
  handleNext,
  handleBack,
  ongetMasterData,
  PremiumData,
  policynum,
  backflag,
}) {
  switch (step) {
    case 0:
      return (
        <QuotationDetails
          InfinityDto={InfinityDto}
          setInfinityDto={setInfinityDto}
          PremiumData={PremiumData}
          setPremiumData={setPremiumData}
          handleNext={handleNext}
          backflag={backflag}
          handleBack={handleBack}
        />
      );
    case 1:
      return (
        <ProposerDetails
          InfinityDto={InfinityDto}
          setInfinityDto={setInfinityDto}
          ongetMasterData={ongetMasterData}
        />
      );
    case 2:
      return (
        <InsuredDetails
          handleNext={handleNext}
          InfinityDto={InfinityDto}
          setInfinityDto={setInfinityDto}
        />
      );
    case 3:
      return (
        <OtherDetails
          InfinityDto={InfinityDto}
          setInfinityDto={setInfinityDto}
          handleNext={handleNext}
          PremiumData={PremiumData}
          setPremiumData={setPremiumData}
          setFinalPremiumData={setFinalPremiumData}
        />
      );
    case 4:
      return (
        <PremiumBreakup
          InfinityDto={InfinityDto}
          setInfinityDto={setInfinityDto}
          handleNext={handleNext}
          FinalPremiumData={FinalPremiumData}
          PolicyData={PolicyData}
          setPolicyData={setPolicyData}
          setPreData={setPreData}
          PreData={PreData}
        />
      );
    case 5:
      return (
        <PolicySummary
          handleNext={handleNext}
          PolicyData={PolicyData}
          setpolicyData={setPolicyData}
          setPreData={setPreData}
          PreData={PreData}
          policynum={policynum}
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
  InfinityDto,
  PremiumData,
  setInfinityDto,
  FinalPremiumData,
  setFinalPremiumData,
  PolicyData,
  PreData,
  setPreData,
  setPremiumData,
  callPremium,
  Quotationval,
  Quotationval1,
  Quotationval2,
  Quotationval3,
  setbackflag,
  backflag,
  // Clearthedata,
  // navflag,
  PolicyGenerateCoimethod,

  ongetMasterData,
}) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  const [skipped, setSkipped] = useState(new Set());

  // const [TravelInfinityLocal, setTravelInfinityLocal] = useState();
  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

    setbackflag(true);

    console.log("backflagval", backflag);
  };

  const handleNext = async () => {
    //
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 0) {
      const res = Quotationval();

      // if (navflag === false) {
      //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
      // } else {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }
      if (res === true) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 1) {
      const res1 = Quotationval1();
      // if (navflag === false) {
      //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
      // } else {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }
      if (res1 === true) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 2) {
      const res2 = Quotationval2();
      // if (navflag === false) {
      //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
      // } else {
      //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // }
      if (res2 === true) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep === 3) {
      const res3 = Quotationval3();

      if (res3 === true) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        await callPremium();
      }
    }
    if (activeStep === 4) {
      const res4 = await PolicyGenerateCoimethod();
      if (res4 === true) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    if (activeStep === 5) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    // Clearthedata();

    window.location.reload();
  };

  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      <Stepper activeStep={activeStep}>
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
      </Stepper>
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
            InfinityDto={InfinityDto}
            PremiumData={PremiumData}
            PolicyData={PolicyData}
            setPreData={setPreData}
            FinalPremiumData={FinalPremiumData}
            setFinalPremiumData={setFinalPremiumData}
            PreData={PreData}
            setInfinityDto={setInfinityDto}
            setPremiumData={setPremiumData}
            handleNext={handleNext}
            handleBack={handleBack}
            ongetMasterData={ongetMasterData}
          />
          {/* <MDButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </MDButton> */}
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <MDButton
              color="primary"
              disabled={activeStep === 0 || activeStep === 5}
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
          </MDBox>
        </>
      )}
    </MDBox>
  );
}

function TravelInfinityInsurance() {
  const [controller, dispatch] = useDataController();
  const { TravellerInfinityDetails } = controller;

  // const [flags, setFlags] = useState(false);
  const [TInfinityDto] = useState({ ...TravellerInfinityDetails });
  console.log("TravellerInfinityDetails", TravellerInfinityDetails);
  useEffect(() => {
    setTravellerInfinityDetails(dispatch, { ...TInfinityDto });
  }, [TInfinityDto]);
  const { search } = useLocation();
  const [InfinityDto, setInfinityDto] = useState({ ...PolicyObj });

  const [PremiumData, setPremiumData] = useState("");
  const [FinalPremiumData, setFinalPremiumData] = useState("");
  const [PolicyData, setPolicyData] = useState("");
  const [PreData, setPreData] = useState("");

  const [flag, setFlag] = useState(false);
  const [issueflag, setissueflag] = useState(false);
  const [calflag, setcalflag] = useState(false);

  const [backflag, setbackflag] = useState(false);

  useEffect(() => {
    setTravellerInfinityDetails(dispatch, PolicyObj);
    console.log("TravellerInfinityDetails11", TravellerInfinityDetails);
    console.log("PolicyObj", PolicyObj);
    setFlag(true);
  }, []);

  // const Clearthedata = () => {
  //   setTravellerInfinityDetails(dispatch, "");
  // };

  const ongetMasterData = async () => {
    const Data1 = await getMasterData();
    console.log("list", Data1);
  };

  const callPremium = async () => {
    // calculatePremium(TravellerInfinityDetails);
    setcalflag(true);
    const Data1 = await calculatePremium(TravellerInfinityDetails);

    setFinalPremiumData(Data1.data.premiumDetail);
    console.log("finalpdata", FinalPremiumData);
    setcalflag(false);
  };

  const Quotationval = () => {
    if (
      TravellerInfinityDetails.Plan === "" ||
      TravellerInfinityDetails.GroupId === "" ||
      TravellerInfinityDetails.TripType === "" ||
      TravellerInfinityDetails.Geography === "" ||
      TravellerInfinityDetails.SumInsured === "" ||
      TravellerInfinityDetails.PartnerDetails.productId === "" ||
      TravellerInfinityDetails.ProposerDetails.ContactNo === "" ||
      TravellerInfinityDetails.NOOfDays === "" ||
      TravellerInfinityDetails.ProposerDetails.DOB === "" ||
      TravellerInfinityDetails.ProposerDetails.DOB === "NA" ||
      TravellerInfinityDetails.TripStartDate === "" ||
      TravellerInfinityDetails.TripEndDate === ""
    ) {
      swal({
        text: "Enter All the  Required Details",
        icon: "error",
      });
      return false;
    }
    if (TravellerInfinityDetails.ProposerDetails.EmailId !== "") {
      const reg = /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+[.][A-Za-z]+$/;
      if (!reg.test(TravellerInfinityDetails.ProposerDetails.EmailId)) {
        swal({
          text: "Enter valid email id for Proposer",
          icon: "error",
        });
        return false;
      }
    }
    if (TravellerInfinityDetails.ProposerDetails.EmailId === "") {
      swal({
        text: "Enter valid email id for Proposer",
        icon: "error",
      });
      return false;
    }

    if (TravellerInfinityDetails.InsurableItem[0].RiskItems.length >= 0) {
      let vall = false;

      TravellerInfinityDetails.InsurableItem[0].RiskItems.forEach((item) => {
        if (item.DOB === "") {
          vall = true;
        }
      });
      if (vall === true) {
        swal({
          text: "Enter Date Of Birth Of Member",
          icon: "error",
        });
        return false;
      }
    }

    // let vallu = false;
    // TravellerInfinityDetails.InsurableItem[0].RiskItems.forEach((item) => {
    //   if (
    //     item.DOB === ""

    //     // item.Questionaire[0].Answer === ""
    //   ) {
    //     vallu = true;
    //   }
    // });
    // if (vallu === true) {
    //   swal({
    //     text: "Enter Date of Birth of Traveller  ",
    //     icon: "error",
    //   });
    //   return false;
    // }
    // else {
    //   setnavflag(true);
    // }
    return true;
  };

  const Quotationval1 = () => {
    if (
      TravellerInfinityDetails.ProposerDetails.Salutation === "" ||
      TravellerInfinityDetails.ProposerDetails.Name.length < 2 ||
      TravellerInfinityDetails.ProposerDetails.Name.length > 70 ||
      TravellerInfinityDetails.ProposerDetails.DOB === "" ||
      TravellerInfinityDetails.ProposerDetails.DOB === "NA" ||
      TravellerInfinityDetails.ProposerDetails.EmailId === "" ||
      TravellerInfinityDetails.ProposerDetails.Gender === "" ||
      TravellerInfinityDetails.ProposerDetails.ContactNo === "" ||
      TravellerInfinityDetails.ProposerDetails.PermanentAddress.AddressLine1 === "" ||
      TravellerInfinityDetails.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
      TravellerInfinityDetails.ProposerDetails.PermanentAddress.CityDistrict === "" ||
      TravellerInfinityDetails.ProposerDetails.CommunicationAddress.CityDistrict === "" ||
      TravellerInfinityDetails.ProposerDetails.PermanentAddress.City === "" ||
      TravellerInfinityDetails.ProposerDetails.CommunicationAddress.City === "" ||
      TravellerInfinityDetails.ProposerDetails.PermanentAddress.State === "" ||
      TravellerInfinityDetails.ProposerDetails.CommunicationAddress.State === "" ||
      TravellerInfinityDetails.ProposerDetails.PermanentAddress.Country === "" ||
      TravellerInfinityDetails.ProposerDetails.CommunicationAddress.Country === "" ||
      TravellerInfinityDetails.ProposerDetails.PermanentAddress.Pincode === "" ||
      TravellerInfinityDetails.ProposerDetails.CommunicationAddress.Pincode === ""
    ) {
      swal({
        text: "Enter All the  Required Details",
        icon: "error",
      });
      return false;
    }
    if (TravellerInfinityDetails.ProposerDetails.EmailId !== "") {
      const reg = /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+[.][A-Za-z]+$/;
      if (!reg.test(TravellerInfinityDetails.ProposerDetails.EmailId)) {
        swal({
          text: "Enter valid email id for Proposer",
          icon: "error",
        });
        return false;
      }
    }

    if (TravellerInfinityDetails.ProposerDetails.ContactNo.length !== 10) {
      swal({
        text: "Mobile Number should be of 10 digits",
        icon: "error",
      });
    }
    if (TravellerInfinityDetails.ProposerDetails.ContactNo.length === 10) {
      const re = /^[6-9]\d{1}[0-9]\d{7}$/;

      if (!re.test(TravellerInfinityDetails.ProposerDetails.ContactNo)) {
        swal({
          text: "Mobile Number should begin from 6-9",
          icon: "error",
        });
        return false;
      }
    }
    // else {
    //   setnavflag(true);
    // }
    return true;
  };

  const Quotationval2 = () => {
    console.log("2nd stepper");
    let vall = false;
    TravellerInfinityDetails.InsurableItem[0].RiskItems.forEach((item) => {
      if (
        item.Name === "" ||
        item.Gender === "" ||
        item.relationShipToProposer === "" ||
        item.Nationality === "" ||
        item.PassportNo === "" ||
        item.MobileNoMember === "" ||
        item.DOB === "" ||
        item.MobileNoMember.length !== 10 ||
        item.PassportNo.length !== 8
      ) {
        vall = true;
      }
    });
    // Selecting YES/NO for Good Health Declaration is Mandatory
    if (vall === true) {
      swal({
        text: "Enter all the details for member",
        icon: "error",
      });
      return false;
    }

    let vallue = false;
    TravellerInfinityDetails.InsurableItem[0].RiskItems.forEach((item1) => {
      if (item1.Questionaire[0].Answer === "") {
        vallue = true;
      }
    });
    // TravellerInfinityDetails.InsurableItem[0].RiskItems.forEach((item1) => {
    //   if (item1.PassportNo !== "") {
    //     const reg = /^[A-Z]{1}[0-9]{7}/g;
    //     console.log("eee", reg.test(e.target.value));
    //     vallue = true;
    //   }
    // });

    if (vallue === true) {
      swal({
        text: "Selecting YES/NO for Good Health Declaration is Mandatory ",
        icon: "error",
      });

      return false;
    }

    return true;
  };

  const Quotationval3 = () => {
    const handleCalculateAge = (date) => {
      const dob = new Date(date);
      const dobYear = dob.getYear();
      const dobMonth = dob.getMonth();
      const dobDate = dob.getDate();
      const now = new Date();
      // extract the year, month, and date from current date
      const currentYear = now.getYear();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();
      let yearAge = currentYear - dobYear;
      let monthAge;
      if (currentMonth >= dobMonth) {
        monthAge = currentMonth - dobMonth;
      }
      // get months when current month is greater
      else {
        yearAge -= 1;
        monthAge = 12 + currentMonth - dobMonth;
      }

      // get days
      // let dateAge;
      if (currentDate >= dobDate) {
        // dateAge = currentDate - dobDate;
      } else {
        monthAge -= 1;
        // dateAge = 31 + currentDate - dobDate;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge -= 1;
        }
      }
      return yearAge;
    };

    if (TravellerInfinityDetails.TripType === "StudentTravel") {
      if (
        TravellerInfinityDetails.UniversityDetails.Name === "" ||
        TravellerInfinityDetails.UniversityDetails.CourseDuration === "" ||
        TravellerInfinityDetails.UniversityDetails.CourseOptedFor === "" ||
        TravellerInfinityDetails.UniversityDetails.AddressLine1 === "" ||
        TravellerInfinityDetails.UniversityDetails.Sponsor[0].AddressLine1 === "" ||
        TravellerInfinityDetails.UniversityDetails.Sponsor[0].RelationshipwithStudent === "" ||
        TravellerInfinityDetails.UniversityDetails.Sponsor[0].DOB === "" ||
        TravellerInfinityDetails.UniversityDetails.Sponsor[0].Name === ""
      ) {
        swal({
          text: "Enter All the Details",
          icon: "error",
        });
        return false;
      }
    }
    if (
      TravellerInfinityDetails.NomineeDetails[0].NomineeRelationWithProposer === "" ||
      TravellerInfinityDetails.NomineeDetails[0].NomineeName.length < 2 ||
      TravellerInfinityDetails.NomineeDetails[0].NomineeName.length > 70
    ) {
      swal({
        text: "Enter All the Required Details",
        icon: "error",
      });
      return false;
    }
    if (TravellerInfinityDetails.NomineeDetails[0].NomineeDOB !== "") {
      const age = handleCalculateAge(TravellerInfinityDetails.NomineeDetails[0].NomineeDOB);
      if (age < 18 && TravellerInfinityDetails.NomineeDetails[0].AppointeeName === "") {
        swal({
          text: "Enter Appointee Details",
          icon: "error",
        });
        return false;
      }
    }
    return true;
  };

  const PolicyGenerateCoimethod = async () => {
    // setFlags(true);

    const myjsonobj = TravellerInfinityDetails;
    delete myjsonobj.PartnerDetails.partnerCode;
    delete myjsonobj.PartnerDetails.productId;
    delete myjsonobj.GroupId;
    delete myjsonobj.ProductId;
    delete myjsonobj.NOOfTravellers;
    myjsonobj.InsurableItem[0].RiskItems.forEach((r, i) => {
      delete myjsonobj.InsurableItem[0].RiskItems[i].MAge;
    });
    setissueflag(true);

    const PPData = await PolicyGenerateCoi(myjsonobj);
    console.log("policymaster", PPData);
    if (PPData.data.responseMessage === "Success") {
      setPreData(PPData.data.finalResult.policyNo);

      setissueflag(false);
      return true;
    }
    if (PPData.data.responseMessage !== "Success") {
      setissueflag(true);
      swal({
        text: "Policy Issuence Failed! Please Try again",
        icon: "error",
      });
      return false;
    }

    console.log("Ppolicydata", PolicyData);

    console.log("policymaster", PreData);
    return true;
    // setFlags(false);
  };

  const step = new URLSearchParams(search).get("step");

  return (
    flag && (
      <MDBox>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={issueflag}
        >
          <CircularProgress />
        </Backdrop>

        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={calflag}>
          <CircularProgress />
        </Backdrop>
        <MDTypography>Travel Infinity</MDTypography>
        {/* <MDBox width="100%" display="flex" justifyContent="end" alignItems="end">
            <Icon onClick={handleConfiguratorOpen}>settings</Icon>
          </MDBox>
          <Modal open={configuratorOpen} onClose={handleConfiguratorClose}>
            <Configurator handleConfiguratorClose={handleConfiguratorClose} />
          </Modal> */}
        <Card>
          <HorizontalLinearStepper
            stepPar={step}
            InfinityDto={InfinityDto}
            setInfinityDto={setInfinityDto}
            PremiumData={PremiumData}
            PolicyData={PolicyData}
            setPremiumData={setPremiumData}
            setFinalPremiumData={setFinalPremiumData}
            FinalPremiumData={FinalPremiumData}
            setPolicyData={setPolicyData}
            setPreData={setPreData}
            PreData={PreData}
            callPremium={callPremium}
            Quotationval={Quotationval}
            Quotationval1={Quotationval1}
            Quotationval2={Quotationval2}
            Quotationval3={Quotationval3}
            setbackflag={setbackflag}
            backflag={backflag}
            // Clearthedata={Clearthedata}
            // navflag={navflag}
            ongetMasterData={ongetMasterData}
            PolicyGenerateCoimethod={PolicyGenerateCoimethod}
          />
        </Card>
      </MDBox>
    )
  );
}

export default TravelInfinityInsurance;
