import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
// import AdminDashBoard from "modules/BrokerPortal/Pages/Admin/AppLication/AdminDashBoard";
import AppReview from "./AppReview";
import Interview from "./Interview";
import Training from "./Training";
import UserPrevilages from "./UserPrevilages";
import { useDataController } from "../../../context";

const steps = ["Review", "Interview", "Training", "User Privileges"];

function GetStepContent({ step, handleNext, handleNextStep, handleBack }) {
  switch (step) {
    case 0:
      return (
        <AppReview
          handleNext={handleNext}
          step={step}
          handleNextStep={handleNextStep}
          handleBack={handleBack}
        />
      );
    case 1:
      return (
        <Interview
          handleNext={handleNext}
          step={step}
          handleNextStep={handleNextStep}
          handleBack={handleBack}
        />
      );
    case 2:
      return (
        <Training
          handleNext={handleNext}
          step={step}
          handleNextStep={handleNextStep}
          handleBack={handleBack}
        />
      );
    case 3:
      return (
        <UserPrevilages
          handleNext={handleNext}
          step={step}
          handleNextStep={handleNextStep}
          handleBack={handleBack}
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
function HorizontalLinearStepper({ stepPar }) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleNextStep = (step) => {
    setActiveStep(step);
  };
  console.log("activeStep", activeStep);
  const navigate = useNavigate();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 0) {
      navigate("/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList");
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      {/* <Grid container justifyContent="flex-end">
        <MDButton
          sx={{ width: "90px" }}
          variant="outlined"
          // disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<ArrowBack />}
        >
          Back
        </MDButton>
      </Grid> */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
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
            {/* All steps completed - you&apos;re finished */}
            Agent On Boarded,
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
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            // paymentDetails={paymentDetails}
          />
          {/* <MDButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </MDButton> */}
          {/* <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ display: "flex", flexDirection: "row", pt: 2 }}
          >
            <MDButton onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Proceed"}
            </MDButton>
          </MDBox> */}
        </>
      )}
    </MDBox>
  );
}

function PospOnboarding({ stepPar }) {
  const [controller] = useDataController();
  const { appReviewResponse, StepPar } = controller;
  const { search } = useLocation();
  const step = StepPar > 0 ? StepPar : new URLSearchParams(search).get("step");
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  const navigate = useNavigate();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 0) {
      navigate("/modules/BrokerPortal/Pages/Admin/AppLication/ApplicationList");
    }
  };

  return (
    <MDBox>
      <Card>
        <Stack direction="row" spacing={5} pt={3} pl={5}>
          <Stack direction="row">
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Agent Onboarding Application:
            </MDTypography>
            <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
              {appReviewResponse.applicationNo}
            </MDTypography>
          </Stack>
          <Stack direction="row">
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Agent Name:{" "}
            </MDTypography>
            <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
              {appReviewResponse.pospdetailsJson.FirstName}{" "}
              {appReviewResponse.pospdetailsJson.LastName}
            </MDTypography>
          </Stack>
          {/* <Grid container justifyContent="flex-end"> */}
          <Stack direction="row">
            <MDButton
              sx={{ ml: "10rem", width: "90px" }}
              variant="outlined"
              // disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </MDButton>
            {/* </Grid> */}
          </Stack>
        </Stack>
        <HorizontalLinearStepper stepPar={step} />
      </Card>
    </MDBox>
  );
}

export default PospOnboarding;
