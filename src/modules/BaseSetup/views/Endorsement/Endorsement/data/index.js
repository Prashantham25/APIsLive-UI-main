import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";

const getPolicyByNumber = async (policyNumber) => {
  try {
    const policy = await getRequest(`Policy/GetPolicyByNumber?policyNumber=${policyNumber}`);
    return policy.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getPolicyDetailsByNumber = async (policyNumber) => {
  try {
    const pol = await getRequest(`Policy/GetPolicyDetailsByNumber?policyNumber=${policyNumber}`);
    return pol.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getMasterData = async () => {
  try {
    const master = await getRequest(`Product/GetMasterData?isFilter=true`);
    return master.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getEndorsementConfig = async (productId) => {
  try {
    const endo = await getRequest(`Product/GetEndorsementConfigByProductId?productId=${productId}`);
    return endo.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const calculatePremium = async (apiName, filterPolicyJson) => {
  console.log("--->>>>>>", filterPolicyJson);
  try {
    const premium = await postRequest(
      `Product/GenericApi?ProductCode=${filterPolicyJson.ProductCode}&ApiName=${apiName}`,
      filterPolicyJson
    );
    return premium;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const saveApi = async (payload) => {
  // console.log("--->>>>>>", filterPolicyJson);
  try {
    const final = await postRequest(`Policy/EndorsementSave`, payload);
    return final;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const sendNotification = async (obj) => {
  try {
    const notification = await postRequest(`Notifications/SendGenericNotification`, obj);
    return notification;
  } catch (error) {
    return error.response;
  }
};

const SearchProduct = async (obj) => {
  try {
    const res = await postRequest(`Product/SearchProduct`, obj);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const GetEndorsementConfigByProductId = async (productId) => {
  try {
    const res = await getRequest(`Product/GetEndorsementConfigByProductId?productId=${productId}`);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const GetProductJsonV2 = async (productId) => {
  try {
    const res = await getRequest(`Product/GetProductJsonV2?ProductId=${productId}`);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const UpdateEndrosementConfig = async (obj) => {
  try {
    const res = await postRequest(`Product/UpdateEndrosementConfig`, obj);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const SaveEndrosementConfig = async (obj) => {
  try {
    const res = await postRequest(`Product/SaveEndrosementConfig`, obj);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const GetEndorsementConfigV2ByProductId = async (productId) => {
  try {
    const res = await getRequest(
      `Product/GetEndorsementConfigV2ByProductId?productId=${productId}`
    );
    return res.data;
  } catch (error) {
    return error.response;
  }
};
const SaveEndorsementConfigV2 = async (obj) => {
  try {
    const res = await postRequest(`Product/SaveEndorsementConfigV2`, obj);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const EndorsementGenericSave = async (obj) => {
  try {
    const res = await postRequest(`Policy/EndorsementGenericSave`, obj);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

export {
  getPolicyByNumber,
  getPolicyDetailsByNumber,
  getMasterData,
  getEndorsementConfig,
  calculatePremium,
  saveApi,
  sendNotification,
  SearchProduct,
  GetEndorsementConfigByProductId,
  GetProductJsonV2,
  UpdateEndrosementConfig,
  SaveEndrosementConfig,
  GetEndorsementConfigV2ByProductId,
  SaveEndorsementConfigV2,
  EndorsementGenericSave,
};
