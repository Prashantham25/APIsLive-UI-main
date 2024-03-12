import { useState } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import MobileStepper from "@mui/material/MobileStepper";
import { useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import Travelimg from "assets/images/BrokerPortal/Travel/Travel.png";
import Destination from "./Destination";
import Medical from "./Medical";
import TravelDate from "./TravelDate";
import Travellers from "./Travellers";

const steps = ["Destination", "TravelDate", "Travellers", "Medical"];
function GetStepContent({ step, handleNext, handleBack }) {
  switch (step) {
    case 0:
      return <Destination handleNext={handleNext} handleBack={handleBack} />;
    case 1:
      return <TravelDate handleNext={handleNext} handleBack={handleBack} />;
    case 2:
      return <Travellers handleNext={handleNext} handleBack={handleBack} />;
    case 3:
      return <Medical handleNext={handleNext} handleBack={handleBack} />;
    default:
      return "Unknown step";
  }
}

function TravelQuote() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  // const theme = useTheme();

  const handleProceed = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails`);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleProceed();
    }
  };

  return (
    <MDBox sx={{ bgcolor: "background.paper" }}>
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
          justifyContent="center"
          alignItems="center"
          display="flex"
          spacing={4}
          sx={{ mt: "2rem" }}
        >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDBox component="img" src={Travelimg} sx={{ width: "100%" }} />
            <MDBox sx={{ fontsize: "32px", fontweight: 600, color: "#000000", rm: 2 }}>
              <MDTypography
                variant="h4"
                sx={{ fontSize: "1.9rem", color: "#000000" }}
                className="text"
                textAlign="center"
              >
                When you&apos;re ready to travel,
                <br />
                we&apos;re here for you
              </MDTypography>
              <MDTypography
                className="text"
                textAlign="center"
                variant="h6"
                sx={{ fontSize: "1rem" }}
              >
                Avail best-in-class travel insurance online to
                <br />
                secure you and your family.
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDBox>
              <MDTypography variant="h6" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                Get Travel Insurance to your trip in Minutes..!!
              </MDTypography>
              <MDTypography>Compare & Buy Customised Travel Plans</MDTypography>
              {/* <MDTypography>
                Tell us your destination and how many members are travelling to
              </MDTypography> */}
              <Stack direction="row" spacing={1}>
                <MobileStepper
                  variant="progress"
                  steps={4}
                  position="static"
                  activeStep={activeStep}
                  sx={{ maxWidth: 800, flexGrow: 2, color: "inherit", bgcolor: "#FFFFFF" }}
                />
                <MobileStepper
                  variant="text"
                  steps={4}
                  position="static"
                  activeStep={activeStep}
                  sx={{ flexGrow: 1, bgcolor: "#FFFFFF" }}
                />
              </Stack>

              <GetStepContent step={activeStep} handleNext={handleNext} handleBack={handleBack} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default TravelQuote;
