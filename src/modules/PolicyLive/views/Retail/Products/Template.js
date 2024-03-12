const getPolicyDto = () => {
  console.log(".");
  return {};
};

const getProcessSteps = () => {
  const steps = ["step1", "step2", "step3", "step4", "step5"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "a1", visible: true },
        { name: "a2", visible: true },
        { name: "a3", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "b1", visible: true },
        { name: "b2", visible: true },
        { name: "b3", visible: true },
      ];
      break;
    case 2:
      steps = [
        { name: "c1", visible: true },
        { name: "c2", visible: true },
        { name: "c3", visible: true },
      ];
      break;
    case 3:
      steps = [
        { name: "d1", visible: true },
        { name: "d2", visible: true },
        { name: "d3", visible: true },
      ];
      break;
    case 4:
      steps = [
        { name: "e1", visible: true },
        { name: "e2", visible: true },
        { name: "e3", visible: true },
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
      data = [[], [], []];
      break;
    case 1:
      data = [[], [], []];
      break;
    case 2:
      data = [[], [], []];
      break;
    case 3:
      data = [[], [], []];
      break;
    case 4:
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
        next: { label: "Calculate Premium", visible: true },
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
