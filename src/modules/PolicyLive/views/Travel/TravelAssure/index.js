import React, { useState } from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import ProposerDetails from "./ProposerDetails";
import QuotationDetails from "./QuotationDetails";
import PremiumBreakup from "./PremiumBreakup";
import PolicySummary from "./PolicySummary";
import InsuredDetails from "./InsuredDetails";
import OtherDetails from "./OtherDetails";
// import { useDataController, setTravelAssureDetails } from "../../../../BrokerPortal/context/index";
import { calculatePremium, calculateProposal } from "./data/index";
import { data } from "./data/JsonData";

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
  PolicyDto,
  setPolicyDto,
  handleNext,
  ratingData,
  // setRatingData,
  // handleCalculate,
  callSavePropData,
  // PolicyIssueDto,
  // setPolicyIssueDto,
}) {
  switch (step) {
    case 0:
      return (
        <QuotationDetails
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          // ratingData={ratingData}
          // setRatingData={setRatingData}
          // handleCalculate={handleCalculate}
        />
      );
    case 1:
      return <ProposerDetails PolicyDto={PolicyDto} setPolicyDto={setPolicyDto} />;

    case 2:
      return <InsuredDetails PolicyDto={PolicyDto} setPolicyDto={setPolicyDto} />;
    case 3:
      return (
        <OtherDetails
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          // handleCalculate={handleCalculate}
          callSavePropData={callSavePropData}
        />
      );
    case 4:
      return (
        <PremiumBreakup
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          ratingData={ratingData}
          // setRatingData={setRatingData}
          // PolicyIssueDto={PolicyIssueDto}
          // setPolicyIssueDto={setPolicyIssueDto}
        />
      );

    case 5:
      return <PolicySummary handleNext={handleNext} />;
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
  ratingData,
  // setRatingData,
  callPremiumData,
  // handleCalculate,
  callSavePropData,
}) {
  console.log("data", PolicyDto);
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  const [skipped, setSkipped] = useState(new Set());
  // const [productData, setProductData] = useState([]);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 3) {
      console.log("aaaa");
      await callPremiumData();
    }
    // if (activeStep === 4) {
    //   console.log("bbbb");
    //   await callSavePropData();
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
            handleNext={handleNext}
            PolicyDto={PolicyDto}
            setPolicyDto={setPolicyDto}
            ratingData={ratingData}
            // setRatingData={setRatingData}
            // handleCalculate={handleCalculate}
            callSavePropData={callSavePropData}

            // callPremium={callPremium}
            // PolicyIssueDto={PolicyIssueDto}
            // setPolicyIssueDto={setPolicyIssueDto}
          />
          {/* <MDButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </MDButton> */}
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
          </MDBox>
        </>
      )}
    </MDBox>
  );
}

function TravelInsurance() {
  const [PolicyDto, setPolicyDto] = useState(data);
  const [ratingData, setRatingData] = useState({});
  // const TPolicyDto = PolicyDto;
  // const [PolicyIssueDto, setPolicyIssueDto] = useState(paymentData);
  // const [proposalNumber, setProposalNumber] = useState("");
  // const [controller, dispatch] = useDataController();
  // const { TravelAssureDetails } = controller;
  // React.useEffect(() => {
  //   setTravelAssureDetails(dispatch, { ...data });
  // }, []);

  // React.useEffect(() => {
  //   setPolicyDto({ ...TravelAssureDetails });
  // }, [TravelAssureDetails]);

  const callPremiumData = async () => {
    const d = await calculatePremium(PolicyDto);
    console.log("fffffffff", d);
    console.log("...", typeof d.data);
    // await calculatePremium(PolicyDto).then((result) => {
    //   console.log("Premium Called", result);
    // console.log("Premium Ratings", ratingData);
    // console.log("Premium Called", result);
    setRatingData(d.data);
    console.log("rating", ratingData);
    // setPolicyDto(PolicyDto);
  };
  // swal({
  //   text: result.data.finalResult.responseMessage,
  //   html: true,
  //   icon: "success",
  // });

  const callSavePropData = async () => {
    const prop = await calculateProposal(PolicyDto);
    console.log("prop", prop);

    // await calculateProposal(json).then((result) => {
    //   console.log("Premium Called", result);
    // setRatingData({ ...result.data.PremiumDetail });
    // setPolicyDto(PolicyDto);
    // swal({
    //   text: result.data.finalResult.responseMessage,
    //   html: true,
    //   icon: "success",
    // });
    // });
  };
  // const handleCalculate = async () => {
  //   // setFlag(true);
  //   // setloadingflag(true);
  //   //const result = await callPremiumData();
  //   const result1 = await callSavePropData();
  //   console.log("aksjsdfh", result);
  //   console.log("aaaa", result1);
  //   // await callSaveQuoteData();
  // };
  // console.log("call", PremiumDetails);

  // useEffect(() => {
  //   console.log("length", PolicyDto.InsurableItem[0].RiskItems);
  //   console.log(PolicyDto);
  // }, [PolicyDto.InsurableItem[0].RiskItems]);

  return (
    <MDBox>
      <MDTypography>Travel Assure</MDTypography>

      <Card>
        <HorizontalLinearStepper
          stepPar={steps}
          PolicyDto={PolicyDto}
          setPolicyDto={setPolicyDto}
          // PolicyIssueDto={PolicyIssueDto}
          ratingData={ratingData}
          // setRatingData={setRatingData}
          // callPremium={callPremium}
          callPremiumData={callPremiumData}
          callSavePropData={callSavePropData}
          // handleCalculate={handleCalculate}
        />
      </Card>
    </MDBox>
  );
}

export default TravelInsurance;
