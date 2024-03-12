import React, { useState, useEffect } from "react";

import { Grid, Stack, Stepper, Step, StepLabel } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Details from "./Details";
import StartingDate from "./StartingDate";
import BillingFrequency from "./BillingFrequency";
// import Payment from "./Payment";
import { CalculatePremium } from "./data";

const stepList = ["Starting Date", "Billing Frequency", "Details"];

function GetStepContent({ step, handleNext, handleBack, setObj, obj }) {
  switch (step) {
    // case 0:
    //   return <Details handleNext={handleNext} obj={obj} setObj={setObj} />;

    case 0:
      return (
        <StartingDate handleNext={handleNext} handleBack={handleBack} obj={obj} setObj={setObj} />
      );

    case 1:
      return (
        <BillingFrequency
          handleNext={handleNext}
          handleBack={handleBack}
          obj={obj}
          setObj={setObj}
        />
      );
    case 2:
      return <Details handleNext={handleNext} handleBack={handleBack} obj={obj} setObj={setObj} />;
    //   return <Payment handleBack={handleBack} obj={obj} setObj={setObj} />;

    default:
      return "Unknown step";
  }
}

function HorizontalLinearStepper({ stepPar, setPageNo, setObj, obj }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onBack = () => {
    setPageNo(1);
  };

  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      {activeStep === 0 && (
        <MDButton variant="text" onClick={onBack}>
          Back
        </MDButton>
      )}
      <Stepper activeStep={activeStep}>
        {stepPar.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ flexDirection: "column" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === stepPar.length ? (
        <MDTypography sx={{ mt: 2, mb: 1 }}>All steps completed</MDTypography>
      ) : (
        <Grid container spacing={2} p={2}>
          <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
            <GetStepContent
              step={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              obj={obj}
              setObj={setObj}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <MDBox sx={{ bgcolor: "#fafafa" }} p={2}>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center", display: "flex" }}
                >
                  <MDTypography variant="h6">Summary of insurance</MDTypography>
                  <VerifiedUserIcon />
                </Stack>
                <Stack>
                  <MDTypography>Title </MDTypography>
                  <MDTypography variant="h6">{obj.ProposerReq.Salutation} </MDTypography>
                </Stack>
                <Stack>
                  <MDTypography>Name </MDTypography>
                  <MDTypography variant="h6">{obj.ProposerReq.Name} </MDTypography>
                </Stack>
                <Stack>
                  <MDTypography>Starting Date </MDTypography>
                  <MDTypography variant="h6">{obj.ProposerReq["Policy Start Date"]} </MDTypography>
                </Stack>
              </Stack>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}

function Steps({ setPageNo, setObj, obj }) {
  useEffect(async () => {
    const obj1 = obj;
    const res1 = await CalculatePremium(obj1.WCPRequest);
    obj1.CP = { ...res1.data };
    obj1.ProposerReq.PaymentInfo[0].Amount = res1.data.finalAmount;
    setObj({ ...obj1 });
  }, []);
  return (
    <HorizontalLinearStepper obj={obj} setObj={setObj} setPageNo={setPageNo} stepPar={stepList} />
  );
}
export default Steps;
