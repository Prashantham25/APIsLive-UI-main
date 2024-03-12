import { postRequest, getRequest } from "core/clients/axiosclient";

const calculatePremium = async (jsonValue) => {
  try {
    const premium = await postRequest(`Quotation/CalculatePremium`, jsonValue);
    return premium;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const saveHealthDeclaration = async (obj, jsonvalue) => {
  try {
    const savehealth = await postRequest(
      `Policy/SaveHealthDeclaration?MasterPolicyNo=${obj.MasterPolicyNo}&UserID=${obj.UserID}`,
      jsonvalue
    );
    return savehealth;
  } catch (error) {
    console.log(error);
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
// const policyIssuance = async (obj, jsonValue) => {
//   try {
//     const IssuancePolicy = await postRequest(
//       `Product/GenericApi?ProductCode=${obj.ProductCode}&ApiName=IssueGroupPolicy`,
//       jsonValue
//     );

//     return IssuancePolicy;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };

const PolicyGenerateCoi = async (jsonValue) => {
  try {
    const generatecoi = await postRequest(`Policy/GenerateCOI`, jsonValue);

    return generatecoi;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const DownloadPolicybypolicynumber = async (obj) => {
  try {
    const policydownload = await postRequest(`DMS/GetDocumentByType`, obj);
    console.log("download", policydownload);
    return policydownload.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
// const getSalutation = async () => {
//   try {
//     const salutation = await getRequest(`ClaimManagement/GetMasterData?sMasterlist=Salutation`);
//     return salutation;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };

const getGender = async () => {
  try {
    const gender = await getRequest(`ClaimManagement/GetMasterData?sMasterlist=Gender`);
    return gender;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getDestination = async () => {
  try {
    const destination = await getRequest(
      `ClaimManagement/GetMasterData?sMasterlist=Worldwide excl USA/Canada With Domestic`
    );
    return destination;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getMaritalStatus = async () => {
  try {
    const marital = await getRequest(`ClaimManagement/GetMasterData?sMasterlist=MaritalStatus`);
    return marital;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getMasterNominee = async () => {
  try {
    const nominee = await getRequest(`ClaimManagement/GetMasterData?sMasterlist=NomineeRelation`);
    return nominee;
  } catch (error) {
    console.log("error", error);
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
const getMasterMemberRelation = async () => {
  try {
    const relation = await getRequest(`Product/GetMasterData?isFilter=true`);
    return relation;
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

const getAssignProductOnPartnerID = async (partnerId) => {
  try {
    const onpartnerid = await getRequest(`Partner/GetAssignProduct?partnerId=${partnerId}`);
    return onpartnerid;
  } catch (error) {
    console.log("error", error);
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
const getMasterData = async (type) => {
  try {
    const list = await getRequest(`ClaimManagement/GetMasterData?sMasterlist=${type}`);
    console.log("list", list);
    return list;
  } catch (error) {
    console.log(error);
  }
  return null;
};
// api/Product/GetProductById
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

const getProductIdByProductcode = async (productCode) => {
  try {
    const productID = await getRequest(`Product/GetProductByCode?productCode=${productCode}`);
    console.log("productid", productID);
    console.log("plan", productID);
    return productID.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProdPartnermasterData = async (prodId, masterType, jsonValue) => {
  try {
    const pcitylist = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${prodId}&MasterType=${masterType}`,

      jsonValue
    );

    console.log("pcitylist", pcitylist);

    return pcitylist.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetPolicyDetailsByNumber = async (policyNumber) => {
  try {
    const policyno = await getRequest(
      `Policy/GetPolicyDetailsByNumber?policyNumber=${policyNumber}`
    );
    console.log("policyno", policyno);
    return policyno;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetLocationAsync = async (type, id) => {
  try {
    const res = await getRequest(
      `Organization/GetLocationAsync?locationType=${type}&parentID=${id}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
// Product/GetGroupingDetails
export {
  calculatePremium,
  // policyIssuance,
  PolicyGenerateCoi,
  getGender,
  getMaritalStatus,
  getGroupPartnerList,
  getMasterPolicyOnPartnerID,
  getMasterData,
  getDestination,
  getMasterMemberRelation,
  getAssignProductOnPartnerID,
  getPartnerDetailsonpartnerId,
  getProductById,
  getPlanOnMasterPolicy,
  getMasterNominee,
  getPlanDetailsOnGroupId,
  getGroupingDetails,
  saveHealthDeclaration,
  PartnerAccountSearchCd,
  GetPolicyTripTenureMaster,
  GetLocationAsync,
  DownloadPolicybypolicynumber,
  GetPolicyDetailsByNumber,
  GetProdPartnermasterData,
  getProductIdByProductcode,
};
