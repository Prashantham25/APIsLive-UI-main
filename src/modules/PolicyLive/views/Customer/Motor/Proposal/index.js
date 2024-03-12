import MDBox from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import React, { useEffect, useState } from "react";
import StepLabel from "@mui/material/StepLabel";
// import MDButton from "@mui/material/Button";

// import Card from "@mui/material/Card";
import ProposerDetails from "./ProposerDetails";
import CKYC from "./CKYC";
// import Success from "./Success";
import { GetProdPartnermasterData, GetProdPartnermasterData1 } from "../../data";
import PaymentSuccess from "../../../Retail/Products/Demo/PaymentSuccess";

const steps = ["Proposer", "CKYC", "Download Policy"];
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
  setLoader,
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
        <CKYC
          dto={dto}
          setDto={setDto}
          masters={masters}
          setMasters={setMasters}
          mValues={mValues}
          setMValues={setMValues}
          handelNext={handelNext}
          setLoader={setLoader}
          handelBack={handelBack}
        />
      );
    case 2:
      return <PaymentSuccess dto={dto} />;

    default:
      return "Unknown step"; // + { step };
  }
}

function HorizontalLinearStepper({ dto, setDto, setLoader }) {
  console.log("dto", dto);
  const [activeStep, setActiveStep] = useState(0);
  const [masters, setMasters] = useState({
    Salutation: [],
    Gender: [],
    NomineeRelation: [],
    Nationality: [],
    VariantDetails: [],
    RtoDetails: [],
    MaritalStatus: [],
    Occupation: [],
    DocumentType: [],
    Hypothecation: [],
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
    const res1 = await GetProdPartnermasterData(449, "Salutation", {
      Salutation: "",
    });
    const res2 = await GetProdPartnermasterData(449, "Gender", { Gender: "" });
    const res3 = await GetProdPartnermasterData1(449, 73, "NomineeRelation", {
      NomineeRelation: "",
    });
    // const res4 = await GetProdPartnermasterData(449, "Nationality", {
    //   Nationality: "",
    // });
    // const res5 = await GetProdPartnermasterData(449, "VariantDetails", {
    //   Variant_Id: dto.VehicleDetails.VariantId,
    // });
    // const res6 = await GetProdPartnermasterData(449, "RtoDetails", {
    //   RTO_ID: dto.VehicleDetails.RTOId,
    // });
    const res7 = await GetProdPartnermasterData1(449, 73, "MaritalStatus", {
      MaritalStatus: "",
    });
    const res8 = await GetProdPartnermasterData(449, "Occupation", {
      Occupation: "",
    });
    const res9 = await GetProdPartnermasterData(449, "DocumentType", {
      DocumentType: "",
    });
    // const res10 = await GetProdPartnermasterData(449, "Hypothecation", {});

    masters.Salutation = res1;
    masters.Gender = res2;
    masters.NomineeRelation = res3;
    // masters.Nationality = res4;
    // masters.VariantDetails = res5;
    // masters.RtoDetails = res6;
    masters.MaritalStatus = res7;
    masters.Occupation = res8;
    masters.DocumentType = res9;
    // masters.Hypothecation = res10;

    setMasters({ ...masters });
  }, []);

  return (
    <MDBox p={1} pl={5} pr={5}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <MDBox p={3}>
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
          setLoader={setLoader}
        />
        {/* <MDButton onClick={handelBack}>Back</MDButton>
        <MDButton onClick={handelNext}>Proceed</MDButton> */}
      </MDBox>
    </MDBox>
  );
}

function Proposal({ policyDto, setPolicyDto, setLoader }) {
  return (
    <MDBox>
      {policyDto !== null && (
        <HorizontalLinearStepper dto={policyDto} setDto={setPolicyDto} setLoader={setLoader} />
      )}
    </MDBox>
  );
}

export default Proposal;
