import { useState, useEffect } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
// import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
// import Health from "assets/images/BrokerPortal/Health/Health.png";
import BusinessType from "./BusinessType";
import Brand from "./Brand";
import Model from "./Model";
import Variant from "./Variant";
import FuelType from "./FuelType";
import Year from "./Year";
import RTO from "./RTO";
import Summary from "./Summary";
import CustomerDetails from "../../CustomerDetails";
import Proposal from "../Proposal";

// import { policyJson } from "../data/json";
import MDButton from "../../../../../../components/MDButton";
import MDLoader from "../../../../../../components/MDLoader";
import PremiumBreakup from "./PremiumBreakup";
import { PolicyJson } from "../../../Retail/Products/Demo/data/Json";
import { DateFormatFromDateObject } from "../../../../../../Common/Validations";

function GetStepContent({ step, handleNext, handleBack, policyDto, setPolicyDto, setLoader }) {
  switch (step) {
    case 0:
      return (
        <BusinessType
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 1:
      return (
        <Brand
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 2:
      return (
        <Model
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 3:
      return (
        <Variant
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 4:
      return (
        <FuelType
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 5:
      return (
        <Year
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 6:
      return (
        <RTO
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 7:
      return (
        <Summary
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 8:
      return (
        <CustomerDetails
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 9:
      return (
        <PremiumBreakup
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );
    case 10:
      return (
        <Proposal
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
      );

    default:
      return "Unknown step";
  }
}

function CustomerMotorQuote({ VehicleType }) {
  const [activeStep, setActiveStep] = useState(0);
  const [loader, setLoader] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [policyDto, setPolicyDto] = useState({ ...PolicyJson() });
  console.log("policyDto", policyDto);
  useEffect(() => {
    const ODDate = new Date();
    const TPDate = new Date();
    const dd1 = new Date();
    const StartDate = DateFormatFromDateObject(new Date(), "y-m-d");
    const StartTime = `${dd1.getHours()}:${dd1.getMinutes()}:${dd1.getSeconds()}`;

    ODDate.setFullYear(new Date().getFullYear() + 1);
    ODDate.setMonth(new Date().getMonth());
    ODDate.setDate(new Date().getDate() - 1);

    TPDate.setFullYear(new Date().getFullYear() + 3);
    TPDate.setMonth(new Date().getMonth());
    TPDate.setDate(new Date().getDate() - 1);

    setPolicyDto({
      ...PolicyJson(),
      PolicyStartDate: StartDate,
      TPStartDate: StartDate,
      ODStartDate: StartDate,
      TPStartTime: StartTime,
      ODStartTime: StartTime,

      PolicyEndDate: TPDate,
      TPEndDate: DateFormatFromDateObject(TPDate, "y-m-d"),
      ODEndDate: DateFormatFromDateObject(ODDate, "y-m-d"),

      VehicleType: VehicleType.VehicleTypeID,
      VehicleTypeValue: VehicleType.VehicleType,
    });
  }, []);

  return (
    <MDBox sx={{ bgcolor: "#ffffff" }} minHeight="100vh">
      <MDLoader loader={loader} />
      <MDBox p={1}>
        {activeStep !== 0 && activeStep <= 9 && (
          <MDButton onClick={handleBack} variant="text">
            <KeyboardBackspace />
            Back
          </MDButton>
        )}
        {/* <Grid
          container
          justifyContent="center"
          alignItems="center"
          display="flex" 
          spacing={4}
          sx={{ mt: "2rem" }}
        > */}
        <GetStepContent
          step={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          policyDto={policyDto}
          setPolicyDto={setPolicyDto}
          setLoader={setLoader}
        />
        {/* </Grid> */}
      </MDBox>
    </MDBox>
  );
}

export default CustomerMotorQuote;
