import { getRequest, postRequest } from "core/clients/axiosclient";

const getMasterPolicyData = async (partnerID) => {
  try {
    const masterPolicies = await getRequest(
      `Partner/GetMasterPolicyOnPartnerID?partnerID=${partnerID}`
    );
    console.log("masterPolicies", masterPolicies.data);
    return masterPolicies.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAssignProduct = async (partnerId) => {
  try {
    const plan = await getRequest(`Partner/GetAssignProduct?partnerId=${partnerId}`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetPartnerDetails = async (partnerId) => {
  try {
    const plan = await getRequest(`Partner/GetPartnerDetails?partnerId=${partnerId}`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetLocationAsync = async (locationType, parentID) => {
  try {
    const plan = await getRequest(
      `Organization/GetLocationAsync?locationType=${locationType}&parentID=${parentID}`
    );
    return plan.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetAssignProductByMasterPolicyNumber = async (masterPolicyNo) => {
  try {
    const plan = await getRequest(
      `Partner/GetAssignProductByMasterPolicyNumber?masterPolicyNo=${masterPolicyNo}`
    );
    return plan.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetPlanOnMasterPolicy = async (policyId, GroupType) => {
  try {
    const plan = await getRequest(
      `Partner/GetPlanOnMasterPolicy?policyId=${policyId}&GroupType=${GroupType}`
    );
    return plan.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetBenefitDetails = async (obj) => {
  try {
    const res = await postRequest(`Product/GetBenefitDetails`, obj);
    return res.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GenericApi = async (ProductCode, ApiName, obj) => {
  try {
    const masterData = await postRequest(
      `Product/GenericApi?ProductCode=${ProductCode}&ApiName=${ApiName}`,
      obj
    );
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const SaveCreateProposal = async (obj) => {
  try {
    const res = await postRequest(`Policy/SaveCreateProposal`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export {
  getMasterPolicyData,
  GetAssignProduct,
  GetPartnerDetails,
  GetLocationAsync,
  GetAssignProductByMasterPolicyNumber,
  GetPlanOnMasterPolicy,
  GetBenefitDetails,
  GenericApi,
  SaveCreateProposal,
};
