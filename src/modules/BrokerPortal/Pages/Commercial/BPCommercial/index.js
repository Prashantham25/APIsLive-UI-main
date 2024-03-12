import { useState } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import MobileStepper from "@mui/material/MobileStepper";
import BGR from "assets/images/BrokerPortal/BGR.png";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import { useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../../../../components/MDButton";

// import MDButton from "components/MDButton";

import BasicDetails from "./BasicDetails";

import PropertyDetails from "./PropertyDetails";

import RiskDetails from "./RiskDetails";
// import QuoteList from "./QuoteList";
import CommercialJson from "../data/JsonData";

const steps = ["BasicDetails", "PropertyDetails", "RiskDetails"];
function GetStepContent({ step, handleNext, handleBack, setCommercialJson1, CommercialJson1 }) {
  switch (step) {
    case 0:
      return (
        <BasicDetails
          setCommercialJson1={setCommercialJson1}
          CommercialJson1={CommercialJson1}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    case 1:
      return (
        <PropertyDetails
          setCommercialJson1={setCommercialJson1}
          CommercialJson1={CommercialJson1}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    case 2:
      return (
        <RiskDetails
          setCommercialJson1={setCommercialJson1}
          CommercialJson1={CommercialJson1}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      );
    // case 3:
    //   return (
    //     <QuoteList
    //       setCommercialJson1={setCommercialJson1}
    //       CommercialJson1={CommercialJson1}
    //       handleNext={handleNext}
    //       handleBack={handleBack}
    //     />
    //   );
    default:
      return "Unknown step";
  }
}

function CommercialQuote() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const [CommercialJson1, setCommercialJson1] = useState({ ...CommercialJson });
  //   const navigate = useNavigate();
  // const theme = useTheme();

  //   const handleProceed = () => {
  //     navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails`);
  //   };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleProceed = () => {
    navigate(`/modules/BrokerPortal/Pages/Commercial/BPCommercial/QuoteList`);
  };

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleProceed();
    }
  };

  return (
    <MDBox>
      <BPNavbar />
      <MDBox sx={{ px: "2rem" }}>
        <MDBox display="flex" flexDirection="row">
          <KeyboardBackspace />
          <MDTypography variant="body1" sx={{ fontSize: 13 }}>
            Back
          </MDTypography>
        </MDBox>
        <Grid
          container
          // justifyContent="center"
          // alignItems="center"
          display="flex"
          spacing={4}
          sx={{ mt: "2rem" }}
        >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDBox component="img" src={BGR} sx={{ width: "100%" }} />
            <MDBox sx={{ fontsize: "32px", fontweight: 600, color: "#000000", rm: 2 }}>
              <MDTypography
                variant="h4"
                sx={{ fontSize: "1.9rem", color: "#000000" }}
                className="text"
                textAlign="center"
              >
                {/* When you&apos;re ready to travel,
                <br />
                we&apos;re here for you */}
                Your Home, rented or Owned Secure it Today
              </MDTypography>
              <MDTypography
                className="text"
                textAlign="center"
                variant="h6"
                sx={{ fontSize: "1rem" }}
              >
                Avail best-in-class Home insurance online to
                <br />
                secure you home structure & Home Belongings
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDBox sx={{ mx: "1rem" }}>
              <MDTypography variant="h6" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                Home Insurance Plan -Bharat Griha Raksha
              </MDTypography>
              <MDTypography>Compare & Buy Customised Home Insurance Plans</MDTypography>
              {/* <MDTypography>
                Tell us your destination and how many members are travelling to
              </MDTypography> */}
              <MDBox display="flex" flexDirection="row">
                <MobileStepper
                  variant="progress"
                  steps={3}
                  position="static"
                  CommercialJson1={CommercialJson1}
                  setCommercialJson1={setCommercialJson1}
                  activeStep={activeStep}
                  sx={{ maxWidth: 800, flexGrow: 2, color: "inherit" }}
                />
                <MobileStepper
                  variant="text"
                  steps={3}
                  position="static"
                  CommercialJson1={CommercialJson1}
                  setCommercialJson1={setCommercialJson1}
                  activeStep={activeStep}
                  sx={{ flexGrow: 1 }}
                />
              </MDBox>

              <GetStepContent
                CommercialJson1={CommercialJson1}
                setCommercialJson1={setCommercialJson1}
                step={activeStep}
                handleNext={handleNext}
                handleBack={handleBack}
              />

              <Grid container justifyContent="space-between">
                <MDButton
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="outlined"
                  color="info"
                  sx={{ mt: "2rem" }}
                >
                  Back
                </MDButton>

                <MDButton
                  onClick={handleNext}
                  // disabled={activeStep === steps.length - 1}
                  // display={activeStep !== steps.length - 1}
                  // onClick={activeStep === steps.length - 1 ? { handleProceed } : { handleNext }}
                  variant="contained"
                  position="static"
                  color="info"
                  sx={{ mt: "2rem" }}
                  // activeStep={steps}
                >
                  Proceed
                  {/* {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
                </MDButton>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default CommercialQuote;
