import { postRequest, getRequest } from "core/clients/axiosclient";

const getGroupPartnerList = async () => {
  try {
    const partnerlist = await getRequest(`Partner/GetGroupPartnerList`);
    return partnerlist.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getMasterPolicyOnPartnerID = async (partnerId) => {
  try {
    const partnerid = await getRequest(`Partner/GetMasterPolicyOnPartnerID?partnerID=${partnerId}`);
    return partnerid;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getPlanOnMasterPolicy = async (policyid) => {
  try {
    const Plan = await getRequest(
      `Partner/GetPlanOnMasterPolicy?policyId=${policyid}&GroupType=105`
    );
    console.log("GetProductById", Plan);
    return Plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreatePartnerApi = async (obj) => {
  try {
    const res = await postRequest(`Partner/CreatePartner`, obj);

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getPlanDetailsOnGroupId = async (groupid) => {
  try {
    const Data = await getRequest(`Product/GetPlanDetailsOnGroupId?GroupId=${groupid}`);
    console.log("GetProductById", Data);
    return Data.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getGroupingDetails = async (json) => {
  try {
    const details = await postRequest(`Product/GetGroupingDetails`, json);
    console.log("details", details);
    return details;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getPartnerDetailsonpartnerId = async (partnerId) => {
  try {
    const partnerdata = await getRequest(`Partner/GetPartnerDetails?partnerId=${partnerId}`);
    return partnerdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const PartnerAccountSearchCd = async (jsonValue) => {
  try {
    const accountSearch = await postRequest(`Accounts/SearchCdAccountAsync`, jsonValue);
    return accountSearch;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SaveCoverGrouping = async (request) => {
  try {
    const response = await postRequest("Product/SaveCoverGrouping", request);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const getAssignProductOnPartnerID = async (partnerId) => {
  try {
    const onpartnerid = await getRequest(`Partner/GetAssignProduct?partnerId=${partnerId}`);
    return onpartnerid;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getProductById = async (productid) => {
  try {
    const Data = await getRequest(`Product/GetProductById?productId=${productid}`);
    console.log("GetProductById", Data);
    return Data.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllMasterData = async (type) => {
  try {
    const list = await getRequest(`ClaimManagement/GetMasterData?sMasterlist=${type}`);
    console.log("list", list);
    return list;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPolicyTripTenureMaster = async (productId, Type) => {
  try {
    const trip = await getRequest(
      `Policy/GetPolicyTripTenureMaster?ProductId=${productId}&Type=${Type}`
    );
    return trip;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const calculatePremium = async (jsonValue) => {
  try {
    const premium = await postRequest(`Quotation/CalculatePremium`, jsonValue);
    return premium;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export {
  getGroupPartnerList,
  getMasterPolicyOnPartnerID,
  getPlanOnMasterPolicy,
  getGroupingDetails,
  getPlanDetailsOnGroupId,
  PartnerAccountSearchCd,
  getPartnerDetailsonpartnerId,
  getAssignProductOnPartnerID,
  getProductById,
  GetAllMasterData,
  GetPolicyTripTenureMaster,
  calculatePremium,
  CreatePartnerApi,
  SaveCoverGrouping,
};
