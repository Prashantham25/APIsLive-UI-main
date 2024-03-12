import MDBox from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import React, { useEffect, useState } from "react";
import StepLabel from "@mui/material/StepLabel";
import MDButton from "@mui/material/Button";

import Card from "@mui/material/Card";
import ProposerDetails from "./ProposerDetails";
import MemberDetails from "./MemberDetails";
import MedicalDetails from "./MedicalDetails";
import NomineeDetails from "./NomineeDetails";
import CKYC from "./CKYC";

import { useDataController, setQuoteProposalOutput } from "../../../context";
import { GetProdPartnermasterData } from "../data";

const steps = ["Proposer", "Member", "Medical", "Nominee", "CKYC"];
// const steps1 = ["Proposer", "Member", "Medical", "Nominee", "CKYC"];

function GetStepContent({
  step,
  dto,
  setDto,
  masters,
  setMasters,
  mValues,
  setMValues,
  handelNext,
  handelBack,
}) {
  switch (step) {
    case 0:
      return (
        <ProposerDetails
          dto={dto}
          setDto={setDto}
          masters={masters}
          setMasters={setMasters}
          mValues={mValues}
          setMValues={setMValues}
          handelNext={handelNext}
        />
      );
    case 1:
      return (
        <MemberDetails
          dto={dto}
          setDto={setDto}
          mValues={mValues}
          setMValues={setMValues}
          handelNext={handelNext}
          handelBack={handelBack}
        />
      );
    case 2:
      return (
        <MedicalDetails
          dto={dto}
          setDto={setDto}
          mValues={mValues}
          setMValues={setMValues}
          handelNext={handelNext}
          handelBack={handelBack}
        />
      );
    case 3:
      return (
        <NomineeDetails
          dto={dto}
          setDto={setDto}
          mValues={mValues}
          setMValues={setMValues}
          handelNext={handelNext}
          handelBack={handelBack}
        />
      );
    case 4:
      return (
        <CKYC
          dto={dto}
          setDto={setDto}
          mValues={mValues}
          setMValues={setMValues}
          handelBack={handelBack}
        />
      );

    default:
      return "Unknown step"; // + { step };
  }
}

function HorizontalLinearStepper({ dto, setDto }) {
  console.log("dto", dto);
  const [activeStep, setActiveStep] = useState(0);
  const [masters, setMasters] = useState({
    Gender: [],
    Salutation: [],
    NomineeRelation: [],
  });
  const [mValues, setMValues] = useState({
    proposerDistrict: "",
    proposerState: "",
    proposerCity: "",
    ProposerSalutation: "",
  });

  const handelNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handelBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  useEffect(async () => {
    const res1 = await GetProdPartnermasterData(780, "Salutation", {}, dto.PartnerId);
    const res2 = await GetProdPartnermasterData(780, "NomineeRelation", {}, dto.PartnerId);

    masters.Salutation = [...res1];
    masters.NomineeRelation = [...res2];

    setMasters({ ...masters });
  }, []);

  return (
    <MDBox p={4}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <MDBox>
        <GetStepContent
          step={activeStep}
          dto={dto}
          setDto={setDto}
          masters={masters}
          setMasters={setMasters}
          mValues={mValues}
          setMValues={setMValues}
          handelNext={handelNext}
          handelBack={handelBack}
        />
        <MDButton onClick={handelBack}>Back</MDButton>
        <MDButton onClick={handelNext}>Proceed</MDButton>
      </MDBox>
    </MDBox>
  );
}

function Proposal() {
  const [controller, dispatcher] = useDataController();
  const { quoteProposalOutput } = controller;
  const [dto, setDto] = useState("");
  useEffect(() => {
    setDto({ ...quoteProposalOutput });
  }, []);
  useEffect(() => {
    if (dto !== "") {
      setQuoteProposalOutput(dispatcher, { ...dto });
    }
  }, [dto]);
  return (
    <MDBox>
      {dto !== "" && (
        <Card>
          <HorizontalLinearStepper dto={dto} setDto={setDto} />
        </Card>
      )}
    </MDBox>
  );
}

export default Proposal;
