import {
  getIndexPageContent as getTravelIndexPageContent,
  getStepContent as getTravelStepContent,
} from "../Products/Travel";
import {
  getIndexPageContent as getHealthIndexPageContent,
  getStepContent as getHealthStepContent,
} from "../Products/Health/Health";

const getIndexPageContent = (productName) => {
  let steps = {};
  switch (productName) {
    case "Travel":
      steps = getTravelIndexPageContent();
      break;
    case "Health":
      steps = getHealthIndexPageContent();
      break;

    default:
      steps = {};
      break;
  }
  return steps;
};
const getStepContent = (productName, activeStep) => {
  let data = [];
  switch (productName) {
    case "Travel":
      data = getTravelStepContent(activeStep);
      break;
    case "Health":
      data = getHealthStepContent(activeStep);
      break;

    default:
      data = [];
      break;
  }
  return data;
};
export { getIndexPageContent, getStepContent };
