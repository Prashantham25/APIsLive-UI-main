import {
  getJson,
  getAccordianList as getNBAccordianList,
  getAccordianContents as getNBAccordianContents,
} from "../Products/NB";

const getJsonData = (productCode) => {
  let data = null;
  switch (productCode) {
    case "NBHTIOP22148V012122":
      data = getJson();
      break;
    case "GroupTravelV1":
      data = getJson();
      break;
    default:
      data = [];
  }
  return data;
};
const getAccordianData = (productCode, flag) => {
  let data = null;
  switch (productCode) {
    case "NBHTIOP22148V012122":
      data = getNBAccordianList(flag);
      break;
    case "GroupTravelV1":
      data = getNBAccordianList(flag);
      break;
    default:
      data = [];
  }
  return data;
};

const getAccordianContentData = (productCode, id, claimjson, policyJson) => {
  let data = null;
  switch (productCode) {
    case "NBHTIOP22148V012122":
      data = getNBAccordianContents(id, claimjson, policyJson);
      break;
    case "GroupTravelV1":
      data = getNBAccordianContents(id, claimjson, policyJson);
      break;
    default:
      data = [];
  }
  return data;
};
const getJsondetails = (productCode) => {
  try {
    const data = getJsonData(productCode);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getAccordianSteps = (productCode, flag) => {
  try {
    const data = getAccordianData(productCode, flag);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getAccordianContent = (productCode, id, claimjson, policyJson) => {
  try {
    const data = getAccordianContentData(productCode, id, claimjson, policyJson);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export { getJsondetails, getAccordianSteps, getAccordianContent };
