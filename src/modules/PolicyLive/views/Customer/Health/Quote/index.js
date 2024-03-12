import { useState, useEffect } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Health from "assets/images/BrokerPortal/Health/Health.png";
import StepperWithCountLabel from "../../data/components/StepperWithCountLabel";

import Members from "./Members";
import Ages from "./Ages";
import Location from "./Location";
import MedicalHistory from "./MedicalHistory";
import Summary from "./Summary";
import CustomerDetails from "../../CustomerDetails";
import PremiumBreakup from "./PremiumBreakup";
import Proposal from "../Proposal";
import { policyJson } from "../data/json";

function GetStepContent({ step, handleNext, handleBack, policyDto, setPolicyDto }) {
  switch (step) {
    case 0:
      return (
        <Members
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
        />
      );
    case 1:
      return (
        <Ages
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
        />
      );
    case 2:
      return (
        <Location
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
        />
      );
    case 3:
      return (
        <MedicalHistory
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
        />
      );
    case 4:
      return <Summary handleNext={handleNext} handleBack={handleBack} policyDto={policyDto} />;
    case 5:
      return (
        <CustomerDetails handleNext={handleNext} handleBack={handleBack} policyDto={policyDto} />
      );
    case 6:
      return (
        <PremiumBreakup handleNext={handleNext} handleBack={handleBack} policyDto={policyDto} />
      );
    case 7:
      return <Proposal policyDto={policyDto} setPolicyDto={setPolicyDto} />;
    default:
      return "Unknown step";
  }
}

function CustomerHealthQuote() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function format(val) {
    return val < 10 ? `0${val}` : val;
  }

  const [policyDto, setPolicyDto] = useState({ ...policyJson });
  useEffect(() => {
    const current = new Date();
    const startDate = `${format(current.getDate())}-${format(
      current.getMonth() + 1
    )}-${current.getFullYear()}`;
    const yesterday = new Date(Date.now() - 86400000);

    const endDate = `${format(yesterday.getDate())}-${format(yesterday.getMonth() + 1)}-${
      yesterday.getFullYear() + parseInt(1, 10)
    }`;

    setPolicyDto({ ...policyJson, PolicyStartDate: startDate, PolicyEndDate: endDate });
  }, []);

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }}>
      <MDBox sx={{ p: "2rem" }}>
        <MDBox display="flex" flexDirection="row">
          <KeyboardBackspace />
          <MDTypography variant="body1" sx={{ fontSize: 13 }}>
            Back
          </MDTypography>
        </MDBox>
        <Grid container spacing={4}>
          {activeStep < 5 && (
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
              <MDBox component="img" src={Health} sx={{ width: "100%" }} />
              <MDBox sx={{ fontsize: "32px", fontweight: 600, color: "#000000", rm: 2 }}>
                <MDTypography variant="h4" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                  Live More Relaxed with
                  <br />
                  Health Insurance
                </MDTypography>
                <MDTypography>
                  Having health insurance is a smart choice,
                  <br />
                  where you can have many benefits form it
                </MDTypography>
              </MDBox>
            </Grid>
          )}
          {activeStep === 5 && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <GetStepContent
                step={activeStep}
                handleNext={handleNext}
                handleBack={handleBack}
                policyDto={policyDto}
                setPolicyDto={setPolicyDto}
              />
            </Grid>
          )}
          {activeStep < 5 && (
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <MDBox sx={{ mx: "1rem" }}>
                {activeStep < 4 && (
                  <MDTypography variant="h6" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                    Get Health Insurance to your Family in Minutes..!!
                  </MDTypography>
                )}
                {activeStep < 4 && (
                  <MDTypography>Compare & Buy Customised Health Plans </MDTypography>
                )}
                {activeStep < 4 && <StepperWithCountLabel activeStep={activeStep} steps={4} />}
                <GetStepContent
                  step={activeStep}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  policyDto={policyDto}
                  setPolicyDto={setPolicyDto}
                />
              </MDBox>
            </Grid>
          )}
          {activeStep >= 6 && (
            <GetStepContent
              step={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              policyDto={policyDto}
              setPolicyDto={setPolicyDto}
            />
          )}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default CustomerHealthQuote;
