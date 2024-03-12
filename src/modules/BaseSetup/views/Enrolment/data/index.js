import { postRequest, getRequest } from "core/clients/axiosclient";

const Documentuploadaws = async (binary) => {
  try {
    const result = await postRequest(
      `DMS/Documentupload/Documentupload?tagName=StudentEnrollment`,
      binary
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getGroupPartnerList = async () => {
  try {
    const partnerlist = await getRequest(`Partner/GetGroupPartnerList`);
    return partnerlist;
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
const GetMasterData = async (Geography) => {
  try {
    const destination = await getRequest(`ClaimManagement/GetMasterData?sMasterlist=${Geography}`);
    return destination;
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

const IsPassport = (pspt) => {
  const regex = /([A-Z]){1}([0-9]){7}$/;
  if (regex.test(pspt)) return true;
  return "Invalid format";
};
const IsAlphaNum = (str) => {
  const regex = /^[a-zA-Z0-9_.-]*$/;
  if (regex.test(str)) return true;
  return "Invalid format";
};

export {
  Documentuploadaws,
  getGroupPartnerList,
  getMasterPolicyOnPartnerID,
  getPlanOnMasterPolicy,
  getPlanDetailsOnGroupId,
  GetMasterData,
  IsPassport,
  IsAlphaNum,
};
