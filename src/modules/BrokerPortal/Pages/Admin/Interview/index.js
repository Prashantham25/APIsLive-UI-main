import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card, Stack } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
// import AdminDashBoard from "modules/BrokerPortal/Pages/Admin/AppLication/AdminDashBoard";
// import AppReview from "./AppReview";
// import Interview from "./Interview";
// import Training from "./Training";
// import UserPrevilages from "./UserPrevilages";
import { useDataController } from "../../../context";
import Applicationreview from "./Applicationreview";
import ApplicationUpdate from "./ApplicationUpdate";

const steps = ["Candidate Details", "Interview Details"];

function GetStepContent({
  step,
  handleNext,
  handleBack,
  InterviewStaus,
  setInterviewstatus,
  InterviewRemarks,
  setInterviewRemarks,
}) {
  switch (step) {
    case 0:
      return <Applicationreview handleNext={handleNext} step={step} handleBack={handleBack} />;
    case 1:
      return (
        <ApplicationUpdate
          handleNext={handleNext}
          step={step}
          handleBack={handleBack}
          InterviewStaus={InterviewStaus}
          setInterviewstatus={setInterviewstatus}
          InterviewRemarks={InterviewRemarks}
          setInterviewRemarks={setInterviewRemarks}
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
  InterviewStaus,
  setInterviewstatus,
  InterviewRemarks,
  setInterviewRemarks,
}) {
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

  //   const handleNextStep = (step) => {
  //     setActiveStep(step);
  //   };
  const navigate = useNavigate();
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 0) {
      navigate("/modules/BrokerPortal/Pages/Admin/Interview/ApplicationList");
    }
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
            // handleNextStep={handleNextStep}
            handleBack={handleBack}
            // paymentDetails={paymentDetails}
            InterviewStaus={InterviewStaus}
            setInterviewstatus={setInterviewstatus}
            InterviewRemarks={InterviewRemarks}
            setInterviewRemarks={setInterviewRemarks}
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

function Interview() {
  const [controller] = useDataController();
  const { appReviewResponse, InterviewStatus } = controller;
  const { search } = useLocation();
  const step = new URLSearchParams(search).get("step");
  const [InterviewStaus, setInterviewstatus] = useState({
    mID: "",
    mValue: "",
  });
  const [InterviewRemarks, setInterviewRemarks] = useState("");

  useEffect(() => {
    if (InterviewStatus !== null || InterviewStatus !== undefined) {
      setInterviewstatus(InterviewStatus.InterviewStatus);
      setInterviewRemarks(InterviewStatus.InterviewRemarks);
    }
  }, [InterviewStatus !== null]);
  // const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);
  // const navigate = useNavigate();
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   if (activeStep === 0) {
  //     navigate("/modules/BrokerPortal/Pages/Admin/Interview/ApplicationList");
  //   }
  // };

  return (
    <MDBox>
      <Card>
        <Stack direction="row" spacing={5} pt={3} pl={5}>
          <Stack direction="row">
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Agent Onboarding Applictaion:
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
          {/* <Stack direction="row">
            <MDButton
              sx={{ ml: "13.5rem", width: "90px" }}
              variant="outlined"
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </MDButton>
          </Stack> */}
        </Stack>
        <HorizontalLinearStepper
          stepPar={step}
          InterviewStaus={InterviewStaus}
          setInterviewstatus={setInterviewstatus}
          InterviewRemarks={InterviewRemarks}
          setInterviewRemarks={setInterviewRemarks}
        />
      </Card>
    </MDBox>
  );
}

export default Interview;
