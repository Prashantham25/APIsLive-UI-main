import {
  getProcessSteps as getTravelProcessSteps,
  getStepContent as getTravelStepContent,
} from "../Products/Travel1";
import {
  getProcessSteps as getHealthProcessSteps,
  getStepContent as getHealthStepContent,
} from "../Products/Health/Health1";

const getProductSteps = (productName) => {
  let steps = [];
  switch (productName) {
    case "Travel":
      steps = getTravelProcessSteps();
      break;
    case "Health":
      steps = getHealthProcessSteps();
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};
const getStepContent = (productName, activeStep) => {
  let steps = [];
  switch (productName) {
    case "Travel":
      steps = getTravelStepContent(activeStep);
      break;
    case "Health":
      steps = getHealthStepContent(activeStep);
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

export { getProductSteps, getStepContent };
