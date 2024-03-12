import axios from "axios";
import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";

axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: process.env.REACT_APP_API_KEY,
};

const getProductMaster = async (data, id) => {
  try {
    const master = await getRequest(`Product/GetProductMaster?masterType=${data}&parentId=${id}`);
    return master.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMasterData = async () => {
  try {
    const master = await getRequest(`Product/GetMasterData?sMasterlist=das&isFilter=true`);
    return master.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const createProduct = async (ProductJson) => {
  try {
    const create = await postRequest(`Product/CreateProduct`, ProductJson);
    return create.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
  // return null;
};

const createProductV2 = async (ProductJson) => {
  try {
    const create = await postRequest(`Product/CreateProductV2`, ProductJson);
    return create.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
  // return null;
};

const modifyProductV2 = async (ProductJson) => {
  try {
    const update = await postRequest(`Product/ModifyProductV2`, ProductJson);
    return update.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
  // return null;
};
const getRisks = async (id, typeId) => {
  try {
    if (id === undefined) {
      const Risk = await getRequest(
        `Product/GetRiskClaimMaster?masterType=Risk&typeId=0&parentID=0`
      );
      return Risk.data;
    }

    if (id > 0 && typeId === undefined) {
      const Risks = await getRequest(
        `Product/GetRiskClaimMaster?masterType=Risk&typeId=0&parentID=${id}`
      );
      return Risks.data;
    }

    if (id > 0 && typeId > 0) {
      const Risks = await getRequest(
        `Product/GetRiskClaimMaster?masterType=Risk&typeId=${typeId}&parentID=${id}`
      );
      return Risks.data;
    }
  } catch (error) {
    return error.response;
  }
  return null;
};
const getClaims = async (id) => {
  try {
    if (id === undefined) {
      const Claim = await getRequest(
        `Product/GetRiskClaimMaster?masterType=Claim&typeId=0&parentID=0`
      );
      return Claim.data;
    }
    if (id > 0) {
      const Claims = await getRequest(
        `Product/GetRiskClaimMaster?masterType=Claim&typeId=0&parentId=${id}`
      );
      return Claims.data;
    }
  } catch (error) {
    return error.response;
  }
  return null;
};

const getCovers = async (id) => {
  try {
    const Cover = await getRequest(`Product/GetProductMaster?masterType=Cover&parentID=${id}`);
    return Cover.data;
  } catch (error) {
    return error.response;
  }
  //  return null;
};

const getRates = async () => {
  try {
    const rates = await getRequest(`RatingConfig/GetRuleObjects`);
    return rates.data;
  } catch (error) {
    return error.response;
  }
  //  return null;
};
const getRules = async () => {
  // axios.defaults.headers = {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   Authorization: process.env.REACT_APP_API_KEY,
  // };
  try {
    const rules = await axios.get("https://devapi.inubesolutions.com/RuleConfig/GetAllRules");

    return rules.data;
  } catch (error) {
    return error.response;
  }
  // return null;
};

const getCwe = async () => {
  try {
    // const cwe = await getRequest(`Product/GetRiskClaimMaster?masterType=CweType`);
    const cwe = await getRequest(`Product/GetMasterData?sMasterlist=das`);

    return cwe.data;
  } catch (error) {
    return error.response;
  }
  // return null;
};

const getCweDetails = async (lob, typeId) => {
  try {
    const cweDetails = await getRequest(
      `Product/CWEDetails?LOBId=${lob}&CWETypeID=${typeId}&typeId=51`
    );
    return cweDetails.data;
  } catch (error) {
    return error.response;
  }
  // return null;
};

export {
  getMasterData,
  getProductMaster,
  createProduct,
  getRisks,
  getClaims,
  getCovers,
  getRates,
  getRules,
  getCwe,
  getCweDetails,
  createProductV2,
  modifyProductV2,
};
