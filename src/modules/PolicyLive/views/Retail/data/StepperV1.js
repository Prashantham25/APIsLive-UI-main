import {
  getProcessSteps as getMCProcessSteps,
  getPageContent as getMCPageContent,
  getSectionContent as getMCSectionContent,
  getOnNextClick as getMotorCycleOnNextClick,
  getButtonDetails as getMotorCycleButtonDetails,
  // getPolicyDto as getMotorCyclePolicyDto,
} from "../Products/NepalProds/MotorCycle";

import {
  getProcessSteps as getMagmaProcessSteps,
  getPageContent as getMagmaPageContent,
  getSectionContent as getMagmaSectionContent,
  getOnNextClick as getMagmaOnNextClick,
  getButtonDetails as getMagmaButtonDetails,
} from "../Products/Magma/Magma";

import {
  getProcessSteps as getNBTravelProcessSteps,
  getPageContent as getNBTravelPageContent,
  getSectionContent as getNBTravelSectionContent,
  getOnNextClick as getNBTravelOnNextClick,
  getButtonDetails as getNBTravelButtonDetails,
} from "../Products/NBTravel";

import {
  getProcessSteps as getAgriBPCProcessSteps,
  getPageContent as getAgriBPCPageContent,
  getSectionContent as getAgriBPCSectionContent,
  getOnNextClick as getAgriBPCOnNextClick,
  getButtonDetails as getAgriBPCButtonDetails,
} from "../Products/NepalProds/AgriBPC";

import {
  getProcessSteps as getAgriGoatProcessSteps,
  getPageContent as getAgriGoatPageContent,
  getSectionContent as getAgriGoatSectionContent,
  getOnNextClick as getAgriGoatOnNextClick,
  getButtonDetails as getAgriGoatButtonDetails,
} from "../Products/NepalProds/AgriGoat";

import {
  getProcessSteps as getMagmaMasterProcessSteps,
  getPageContent as getMagmaMasterPageContent,
  getSectionContent as getMagmaMasterSectionContent,
  getOnNextClick as getMagmaMasterOnNextClick,
  getButtonDetails as getMagmaMasterButtonDetails,
} from "../Products/Magma/MagmaMasterPolicy";

import {
  getButtonDetails as getRetailButtonDetails1,
  getOnNextClick as getRetailOnNextClick1,
  getSectionContent as getRetailSectionContent1,
  getPageContent as getRetailPageContent1,
  getProcessSteps as getRetailProcessSteps1,
} from "../Products/NBRetail/NBTravel";
// import {
//   getProcessSteps as getHomeInsuranceProcessSteps,
//   getPageContent as getHomeInsurancePageContent,
//   getSectionContent as getHomeInsuranceSectionContent,
//   getOnNextClick as getHomeInsuranceOnNextClick,
//   getButtonDetails as getHomeInsuranceButtonDetails,
// } from "../Products/NepalProds/HomeInsurance";
import {
  getProcessSteps as getPoultryProcessSteps,
  getPageContent as getPoultryPageContent,
  getSectionContent as getPoultrySectionContent,
  getOnNextClick as getPoultryOnNextClick,
  getButtonDetails as getPoultryButtonDetails,
} from "../Products/NepalProds/Poultry";

const getProductSteps = (productName) => {
  let steps = ["Risk Details", "Proposer Details", "Payment Details"];
  switch (productName) {
    case "MotorCycle":
      steps = getMCProcessSteps();
      break;
    case "Magma":
      steps = getMagmaProcessSteps();
      break;
    case "NBTravel":
      steps = getNBTravelProcessSteps();
      break;
    case "AgriBPC":
      steps = getAgriBPCProcessSteps();
      break;
    case "AgriGoat":
      steps = getAgriGoatProcessSteps();
      break;
    case "MagmaMasterPolicy":
      steps = getMagmaMasterProcessSteps();
      break;
    // case "HomeInsurance":
    //   steps = getHomeInsuranceProcessSteps();
    //   break;
    case "NBTravel1":
      steps = getRetailProcessSteps1();
      break;
    case "Poultry":
      steps = getPoultryProcessSteps();
      break;
    default:
      steps = ["Risk Details", "Proposer Details", "Payment Details"];
      break;
  }
  return steps;
};

const getProcessSteps = (productName) => {
  try {
    const steps = getProductSteps(productName);
    return steps;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getAccordion = ({ prod, activeStep }) => {
  let steps = ["Plan Details", "Property Details", "Personal Accident Details", "Contact Details"];
  switch (prod) {
    case "MotorCycle":
      steps = getMCPageContent(activeStep);
      break;
    case "Magma":
      steps = getMagmaPageContent(activeStep);
      break;
    case "NBTravel":
      steps = getNBTravelPageContent(activeStep);
      break;
    case "AgriBPC":
      steps = getAgriBPCPageContent(activeStep);
      break;
    case "AgriGoat":
      steps = getAgriGoatPageContent(activeStep);
      break;
    case "MagmaMasterPolicy":
      steps = getMagmaMasterPageContent(activeStep);
      break;
    // case "HomeInsurance":
    //   steps = getHomeInsurancePageContent(activeStep);
    //   break;
    case "Poultry":
      steps = getPoultryPageContent(activeStep);
      break;

    case "NBTravel1":
      steps = getRetailPageContent1(activeStep);
      break;
    default:
      steps = ["Plan Details", "Property Details", "Personal Accident Details", "Contact Details"];
      break;
  }
  return steps;
};

const getPageContent = ({ prod, activeStep }) => {
  try {
    const steps = getAccordion({ prod, activeStep });
    return steps;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getSection = ({ prod, activeStep }) => {
  let steps = "";
  switch (prod) {
    case "MotorCycle":
      steps = getMCSectionContent(activeStep);
      break;
    case "Magma":
      steps = getMagmaSectionContent(activeStep);
      break;
    case "NBTravel":
      steps = getNBTravelSectionContent(activeStep);
      break;
    case "AgriBPC":
      steps = getAgriBPCSectionContent(activeStep);
      break;
    case "AgriGoat":
      steps = getAgriGoatSectionContent(activeStep);
      break;
    case "MagmaMasterPolicy":
      steps = getMagmaMasterSectionContent(activeStep);
      break;
    // case "HomeInsurance":
    //   steps = getHomeInsuranceSectionContent(activeStep);
    //   break;
    case "Poultry":
      steps = getPoultrySectionContent(activeStep);
      break;

    case "NBTravel1":
      steps = getRetailSectionContent1(activeStep);
      break;
    default:
      steps = "";
      break;
  }
  return steps;
};

const getSectionContent = ({ prod, activeStep }) => {
  try {
    const steps = getSection({ prod, activeStep });
    return steps;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getOnNextClick = ({ prod, activeStep, setBackDropFlag, genericInfo, genericPolicyDto }) => {
  let fun = true;
  switch (prod) {
    case "MotorCycle":
      fun = getMotorCycleOnNextClick(activeStep, setBackDropFlag, genericInfo);
      break;
    case "Magma":
      fun = getMagmaOnNextClick(activeStep, setBackDropFlag, genericInfo);
      break;
    case "NBTravel":
      fun = getNBTravelOnNextClick(activeStep, setBackDropFlag, genericInfo);
      break;
    case "AgriBPC":
      fun = getAgriBPCOnNextClick(activeStep, setBackDropFlag, genericInfo);
      break;
    case "AgriGoat":
      fun = getAgriGoatOnNextClick(activeStep, setBackDropFlag, genericInfo);
      break;
    case "MagmaMasterPolicy":
      fun = getMagmaMasterOnNextClick(activeStep, setBackDropFlag, genericInfo, genericPolicyDto);
      break;
    // case "HomeInsurance":
    //   fun = getHomeInsuranceOnNextClick(activeStep, setBackDropFlag, genericInfo);
    //   break;
    case "Poultry":
      fun = getPoultryOnNextClick(activeStep, setBackDropFlag, genericInfo);
      break;

    case "NBTravel1":
      fun = getRetailOnNextClick1(activeStep, setBackDropFlag, genericInfo);
      break;
    default:
      fun = true;
      break;
  }
  return fun;
};

const getButtonDetails = ({ prod, activeStep, dto, setBackDropFlag }) => {
  let btnDetails = {};
  switch (prod) {
    case "MotorCycle":
      btnDetails = getMotorCycleButtonDetails(activeStep);
      break;
    case "AgriBPC":
      btnDetails = getAgriBPCButtonDetails(activeStep);
      break;
    case "Magma":
      btnDetails = getMagmaButtonDetails(activeStep);
      break;
    case "NBTravel":
      btnDetails = getNBTravelButtonDetails(activeStep);
      break;
    case "AgriGoat":
      btnDetails = getAgriGoatButtonDetails(activeStep);
      break;
    case "MagmaMasterPolicy":
      btnDetails = getMagmaMasterButtonDetails({ activeStep, dto, setBackDropFlag });
      break;
    // case "HomeInsurance":
    //   btnDetails = getHomeInsuranceButtonDetails(activeStep);
    //   break;
    case "Poultry":
      btnDetails = getPoultryButtonDetails(activeStep);
      break;

    case "NBTravel1":
      btnDetails = getRetailButtonDetails1(activeStep);
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

// const getPolicyDto = ({ prod }) => {
//   let dto = {};
//   switch (prod) {
//     case "MotorCycle":
//       dto = getMotorCyclePolicyDto();
//       break;
//     case "AgriBPC":
//       dto = {};
//       break;
//     case "Magma":
//       dto = {};
//       break;
//     case "NBTravel":
//       dto = {};
//       break;
//     default:
//       dto = {};
//       break;
//   }
//   return dto;
// };

export {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  // getPolicyDto,
};
