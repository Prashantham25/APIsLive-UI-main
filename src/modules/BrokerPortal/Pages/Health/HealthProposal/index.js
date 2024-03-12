import MDBox from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import React, { useState } from "react";
import StepLabel from "@mui/material/StepLabel";
import MDButton from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import ProposerDetails from "./ProposerDetails";
import MemberDetails from "./MemberDetails";
import MedicalDetails from "./MedicalDetails";
import NomineeDetails from "./NomineeDetails";
import CKYC from "./CKYC";
import PoratabilityDetails from "./PoratabilityDetails";
import { useDataController } from "../../../context";

const steps = ["Proposer", "Member", "Medical", "Nominee", "Portability", "CKYC"];
const steps1 = ["Proposer", "Member", "Medical", "Nominee", "CKYC"];

function GetStepContent({ step, handleNext, handleBack, quoteProposalOutput, customerDetails }) {
  console.log("customerDetails2", customerDetails);
  switch (step) {
    case 0:
      return (
        <ProposerDetails
          handleNext={handleNext}
          quoteProposalOutput={quoteProposalOutput}
          customerDetails={customerDetails}
        />
      );
    case 1:
      return <MemberDetails handleNext={handleNext} handleBack={handleBack} />;
    case 2:
      return <MedicalDetails handleNext={handleNext} handleBack={handleBack} />;
    case 3:
      return <NomineeDetails handleNext={handleNext} handleBack={handleBack} />;
    case 4:
      return <CKYC handleNext={handleNext} handleBack={handleBack} />;
    case 5:
      return <PoratabilityDetails handleNext={handleNext} />;
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

function HorizontalLinearStepper({ stepPar, quoteProposalOutput, customerDetails }) {
  console.log("customer", customerDetails);
  // const [activeStep, setActiveStep] = React.useState(0);
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);

  // const [controller] = useDataController();
  // const { customerDetails } = controller;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/PaymentDetails`);
  };

  return (
    <PageLayout>
      <BPNavbar />
      <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4, mt: 7 }}>
        {quoteProposalOutput.BusinessType === "New Business" ? (
          <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
            <MDBox sx={{ width: "65%" }} ml={26}>
              <Stepper activeStep={activeStep}>
                {steps1.map((label) => {
                  const stepProps = {};
                  const labelProps = {};
                  // if (quoteProposalOutput.BusinessType === "New Business") {
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                  // } else {
                  //   return (
                  //     <Step key={label} {...stepProps}>
                  //       <StepLabel {...labelProps}>{label}</StepLabel>
                  //     </Step>
                  //   );
                  // }
                })}
              </Stepper>
            </MDBox>
            {activeStep === steps1.length ? (
              <fragment>
                <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <MDBox sx={{ flex: "1 1 auto" }} />
                  <MDButton onClick={onClick}>Proceed</MDButton>
                </MDBox>
              </fragment>
            ) : (
              <fragment>
                <GetStepContent
                  step={activeStep}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  quoteProposalOutput={quoteProposalOutput}
                  customerDetails={customerDetails}
                  // paymentDetails={paymentDetails}
                />

                {/* <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <MDButton
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </MDButton>

                <MDButton onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Proceed"}
                </MDButton>
              </MDBox> */}
              </fragment>
            )}
          </Card>
        ) : (
          <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
            <MDBox sx={{ width: "65%" }} ml={26}>
              <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                  const stepProps = {};
                  const labelProps = {};
                  // if (quoteProposalOutput.BusinessType === "New Business") {
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                  // } else {
                  //   return (
                  //     <Step key={label} {...stepProps}>
                  //       <StepLabel {...labelProps}>{label}</StepLabel>
                  //     </Step>
                  //   );
                  // }
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
              <fragment>
                <GetStepContent
                  step={activeStep}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  quoteProposalOutput={quoteProposalOutput}
                  customerDetails={customerDetails}
                  // paymentDetails={paymentDetails}
                />

                {/* <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <MDButton
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </MDButton>

              <MDButton onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Proceed"}
              </MDButton>
            </MDBox> */}
              </fragment>
            )}
          </Card>
        )}
      </MDBox>
    </PageLayout>
  );
}

function HealthProposal() {
  const { search } = useLocation();
  const step = new URLSearchParams(search).get("step");

  const [controller] = useDataController();
  const { quoteProposalOutput, customerDetails } = controller;
  console.log("customerDetails1", customerDetails);
  return (
    <MDBox>
      <Card>
        <HorizontalLinearStepper
          stepPar={step}
          quoteProposalOutput={quoteProposalOutput}
          customerDetails={customerDetails}
        />
      </Card>
    </MDBox>
  );
}

export default HealthProposal;
