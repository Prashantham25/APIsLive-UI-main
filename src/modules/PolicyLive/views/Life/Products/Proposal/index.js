import PolicyJson from "./data/JSON/LifeProposalJson";

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = () => {
  const steps = ["Proposal Form", "Insured Details", "Beneficiary", "Documents"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Proposal Form", visible: true },
        { name: "Policy Owner Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "Member Details", visible: true },
        { name: "Questionnaire", visible: true },
        { name: "Premium and Coverage Details", visible: true },
      ];
      break;
    case 2:
      steps = [{ name: "Beneficiary Details", visible: true }];
      break;
    case 3:
      steps = [
        { name: "Premium Details", visible: true },
        { name: "Communication", visible: true },
        { name: "Documents and Declaration", visible: true },
      ];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep }) => {
  let data = [];
  switch (activeStep) {
    case 0:
      data = [[], []];
      break;
    case 1:
      data = [[], [], []];
      break;
    case 2:
      data = [[]];
      break;
    case 3:
      data = [[], [], []];
      break;
    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      fun = true;

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const mst = { Salutation: [], Gender: [] };

  return mst;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
