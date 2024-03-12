import { getRequest, postRequest } from "core/clients/axiosclient";

const getMasterPolicyData = async () => {
  try {
    const masterPolicies = await getRequest(`Partner/GetMasterPolicyOnPartnerID?partnerID=16219`);
    console.log("masterPolicies", masterPolicies.data);
    return masterPolicies.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAssignProductByMasterPolicyNumber = async (policyNo) => {
  try {
    const masterPolicies = await getRequest(
      `Partner/GetAssignProductByMasterPolicyNumber?masterPolicyNo=${policyNo}`
    );
    console.log("masterPolicies", masterPolicies.data);
    return masterPolicies.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getPlanbyProductId = async (policyId) => {
  try {
    const plan = await getRequest(
      `Partner/GetPlanOnMasterPolicy?policyId=${policyId}&GroupType=105`
    );
    console.log("ProductId", 769);
    console.log("plan", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getProdPartnerMasterData = async () => {
  try {
    const plan = await postRequest(
      "Product/GetProdPartnermasterData?ProductId=1022&MasterType=Relation",
      []
    );
    console.log("ProductId", 1022);
    console.log("plan", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getProdPartnerMasterDataGender = async () => {
  try {
    const plan = await postRequest(
      "Product/GetProdPartnermasterData?ProductId=1022&MasterType=Gender",
      []
    );
    return plan.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const GenericApi = async (ProductCode, ApiName, obj) => {
  try {
    const masterData = await postRequest(
      `Product/GenericApi?ProductCode=${ProductCode}&ApiName=${ApiName}`,
      obj
    );
    console.log("Premium", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetBenefits = async (obj) => {
  try {
    const masterData = await postRequest(`Product/GetBenefits`, obj);
    console.log("Benefits", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetAssignProduct = async () => {
  try {
    const plan = await getRequest(`Partner/GetAssignProduct?partnerId=16219`);
    console.log("Assign", 769);
    console.log("plan", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetProposalDetailByNumber = async (proposalNumber) => {
  try {
    const plan = await getRequest(
      `Policy/InternalGetProposalDetailsByNumber?proposalNumber=${proposalNumber}`
    );
    console.log("ProposalNumber", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetPolicy = async (obj) => {
  try {
    const masterData = await postRequest(`Policy/GetTemplatePayload`, obj);
    console.log("Benefits", masterData);
    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetUploadStatus = async (id) => {
  try {
    const res = await getRequest(`ExcelUpload/GetUploadStatus?DocumentUploadId=${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
// const GetTemplateDetails = async () => {
//   try {
//     const res = await getRequest(`ExcelUpload/GetTemplateDetails?TemplateId=153`);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

const GetGhd = async () => {
  try {
    const ghddata = await getRequest(
      "Questionnaries/GetQuestionnaire?id=5&subType=Health&NoOfQuestions=0",

      []
    );

    console.log("GHD", ghddata);

    return ghddata;
  } catch (error) {
    console.log("error", error);

    return error;
  }
};
const createOrdersRazorPay = async (amount, proposalNumber) => {
  try {
    const masterData = await postRequest(
      `Policy/CreateOrdersRazorPay?amount=${amount}&proposalNumber=${proposalNumber}`,
      {}
    );

    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const getProdPartnermasterData = async (ProductId, masterType, data) => {
  const abc = {
    MasterType: data,
  };
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${masterType}`,
      abc
    );
    return res;
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

const CreatePartner = async (request) => {
  try {
    const response = await postRequest("Partner/CreatePartner", request);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const FetchListOfCOI = async (request) => {
  try {
    const response = await postRequest("Policy/FetchListOfCOI", request);

    console.log("GHD", response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetGroupingDetailsByPlan = async (request) => {
  try {
    const response = await postRequest("Product/GetGroupingDetailsByPlan?planName=Plan3", request);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const PostRateRulesSet = async (request) => {
  // debugger;
  try {
    const response = await postRequest("RatingConfig/CreateRateRulesSet", request);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const SaveProductMasterPolicy = async (request) => {
  // debugger;
  try {
    const response = await postRequest("Partner/SaveProductMasterPolicy", request);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

async function DeleteCoverGroups(GroupName) {
  try {
    const DeleteFileData = await getRequest(
      `Product/DeleteCoverGroups?GroupName=${GroupName}&ProductId=1022`
    );
    return DeleteFileData;
  } catch (error) {
    return error;
  }
}
async function GetGroupingDetailsByPlanGrid(PlanName, payload) {
  try {
    const response = await postRequest(
      `Product/GetGroupingDetailsByPlan?planName=${PlanName}`,
      payload
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function UpdateCoverGroups(payload) {
  try {
    const response = await postRequest(`Product/UpdateCoverGroups`, payload);
    console.log(response);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

const EventCommunicationExecution = async (obj) => {
  try {
    const masterData = await postRequest("Notifications/EventCommunicationExecution", obj);
    console.log("Premium", masterData);
    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetProposalList = async (proposalNo) => {
  try {
    const res = await getRequest(`Policy/ProposerSearch?proposerNumber=${proposalNo}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const Savequestions = async (id) => {
  try {
    const masterData = await postRequest("Questionnaries/SaveQuestions", id);
    console.log("savequestion", masterData);
    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const QueryExecution = async (Request) => {
  try {
    const masterData = await postRequest("Report/QueryExecution", Request);
    console.log("ProposalSearch", masterData);
    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetUsersRoles = async (userId) => {
  try {
    const res = await getRequest(`Role/GetUserRole/${userId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllMasterPolicyDetails = async () => {
  try {
    const response = await getRequest(`Partner/GetAllMasterPolicyDetails?ProductId=1022`);
    console.log("GetAllMasterPolicyDetails", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetRateReupload = async (id, data) => {
  try {
    const Product = await postRequest(`RatingConfig/RateReupload?RatingId=${id}`, data);
    return Product;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetGroupingDetails = async (obj3) => {
  try {
    const Product = await postRequest(`Product/GetGroupingDetails`, obj3);
    return Product.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const UpdateProposalDetails = async (obj) => {
  try {
    const masterData = await postRequest("Policy/UpdateProposalDetails", obj);
    console.log("Benefits", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetPolicyInfoByPolicyNumber = async (PolicyNumber) => {
  try {
    const result = await getRequest(
      `Policy/GetPolicyInfoByPolicyNumber?policyNumber=${PolicyNumber}`
    );
    console.log("result", result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPolicyWFStatusCount = async (ids) => {
  try {
    const data = await getRequest(`Policy/GetPolicyWFStatusCount?stageStatusId=${ids}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProposalByWFId = async (obj) => {
  try {
    const data = await postRequest(`Policy/GetProposalByWFId`, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getProdPartnermasterDatas = async (ProductId, masterType, data) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${masterType}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getProdPartnermasterData1 = async (ProductId, masterType, data) => {
  try {
    const res = await postRequest(
      `product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${masterType}`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetSavepolicyWFStatus = async (ids, obj) => {
  try {
    const data = await postRequest(`Policy/SavepolicyWFStatus?proposalNumber=${ids}`, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProposalWFId = async (ids) => {
  // to get WFid
  try {
    const data = await getRequest(`Policy/GetProposalWFId?PolicyID=${ids}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SaveEndorsementWFStatus = async (EndReqNo, obj) => {
  try {
    const data = await postRequest(
      `Policy/SaveEndorsementWFStatus?endorsementNumber=${EndReqNo}`,
      obj
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetUpdateWorkflowStatus = async (ids1, ids2, obj) => {
  try {
    const data = await postRequest(
      `Workflow/UpdateWorkflowStatus?workFlowId=${ids1}&actionId=${ids2}`,
      obj
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetSaveProposalFailedRules = async (pnumber, obj) => {
  try {
    const data = await postRequest(`Policy/SaveProposalFailedRules?proposalNumber=${pnumber}`, obj);
    return data;
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

const EndorsementGenericSave = async (Status, json) => {
  try {
    const res = await postRequest(`Policy/EndorsementGenericSave?status=${Status}`, json);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

const SearchCdAccountAsync = async (obj) => {
  try {
    const masterData = await postRequest(`Accounts/SearchCdAccountAsync`, obj);
    return masterData.data;
  } catch (error) {
    return error;
  }
};
const ReverseCDTransaction = async (obj) => {
  try {
    const masterData = await postRequest(`Accounts/ReverseCDTransaction`, obj);
    return masterData.data;
  } catch (error) {
    return error;
  }
};
const UploadExcel = async (formData) => {
  try {
    const uploadRes = await postRequest(`ExcelUpload/Upload`, formData);
    return uploadRes;
  } catch (error) {
    return error;
  }
};

const GetCoiList = async (obj) => {
  try {
    const masterData = await postRequest("Policy/GetCoiList", obj);
    console.log("masterData", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const UpdateSequenceNumber = async (NumberType, AttributeName, Prefix, Suffix, obj) => {
  try {
    const resObj = await postRequest(
      `Policy/UpdateSequenceNumber?NumberType=${NumberType}&AttributeName=${AttributeName}&Prefix=${Prefix}&Suffix=${Suffix}`,
      obj
    );
    // console.log("sequenced members object : ", resObj);
    return resObj;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetCommunicationDetails = async (obj) => {
  try {
    const masterData = await postRequest("Policy/GetCommunicationDetails", obj);
    console.log("masterData", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetPayLoadByQueryDynamic = async (obj) => {
  try {
    const masterData = await postRequest("Report/GetPayLoadByQueryDynamic", obj);
    console.log("masterData", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetPermissions = async (ids2, ids3) => {
  try {
    const masterData = await getRequest(
      `Permission/GetPermissions?permissionType=Pages&userId=${ids2}&roleId=${ids3}`
    );
    console.log("masterData", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetEndorsListByWfStatusID = async (obj) => {
  try {
    const masterData = await postRequest("Policy/GetEndorsListByWfStatusID", obj);
    console.log("masterData", masterData);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const UpdateEndorsementV2 = async (status, obj) => {
  try {
    const res = await postRequest(`Policy/UpdateEndorsementV2?Status=${status}`, obj);
    // const res = await postRequest(`Policy/EndorsementGenericSave?status=true`, json);
    return res.data;
  } catch (error) {
    return error.response;
  }
};
const GetEndorsementJson = async (EndorsementNumber) => {
  try {
    const res = await getRequest(
      `Policy/GetEndorsementJson?EndorsementNumber=${EndorsementNumber}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CheckPolicyInEndoStage = async (PolicyNo) => {
  try {
    const res = await getRequest(`Policy/CheckPolicyInEndoStage?policyNumber=${PolicyNo}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GenerateCDTransactionForDispatcher = async (obj) => {
  try {
    const res = await postRequest(`Accounts/GenerateCDTransactionForDispatcher`, obj);
    // const res = await postRequest(`Policy/EndorsementGenericSave?status=true`, json);
    return res.data;
  } catch (error) {
    return error.response;
  }
};
const GetPolicyEndoCountByAllocation = async (obj) => {
  try {
    const res = await postRequest(`Policy/GetPolicyEndoCountByAllocation`, obj);
    // const res = await postRequest(`Policy/EndorsementGenericSave?status=true`, json);
    return res.data;
  } catch (error) {
    return error.response;
  }
};
const GetDynamicPermissions = async (userid, roleid) => {
  try {
    const itemType = "Report";

    console.log("login: ", userid);
    const reports = await getRequest(
      `Role/GetDynamicPermissions?Userid=${userid}&Roleid=${roleid}&itemType=${itemType}`
    );
    return reports.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getAllClaimDetails = async (data) => {
  try {
    const result = await postRequest(`ClaimManagement/GetAllClaimDetails`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export {
  getPlanbyProductId,
  GetAssignProductByMasterPolicyNumber,
  getMasterPolicyData,
  getProdPartnerMasterData,
  getProdPartnermasterData,
  getProdPartnerMasterDataGender,
  GenericApi,
  GetBenefits,
  GetAssignProduct,
  GetProposalDetailByNumber,
  GetPolicy,
  GetUploadStatus,
  GetGhd,
  createOrdersRazorPay,
  SaveCoverGrouping,
  CreatePartner,
  FetchListOfCOI,
  GetGroupingDetailsByPlan,
  PostRateRulesSet,
  SaveProductMasterPolicy,
  DeleteCoverGroups,
  GetGroupingDetailsByPlanGrid,
  UpdateCoverGroups,
  EventCommunicationExecution,
  GetProposalList,
  Savequestions,
  QueryExecution,
  GetUsersRoles,
  GetAllMasterPolicyDetails,
  GetRateReupload,
  GetGroupingDetails,
  UpdateProposalDetails,
  GetPolicyInfoByPolicyNumber,
  GetPolicyWFStatusCount,
  GetProposalByWFId,
  getProdPartnermasterDatas,
  getProdPartnermasterData1,
  GetSavepolicyWFStatus,
  GetProposalWFId,
  GetUpdateWorkflowStatus,
  getEndorsementConfig,
  GetEndorsementConfigV2ByProductId,
  GetSaveProposalFailedRules,
  EndorsementGenericSave,
  SearchCdAccountAsync,
  UploadExcel,
  GetCoiList,
  UpdateSequenceNumber,
  GetCommunicationDetails,
  GetPayLoadByQueryDynamic,
  SaveEndorsementWFStatus,
  GetPermissions,
  GetEndorsListByWfStatusID,
  GetEndorsementJson,
  UpdateEndorsementV2,
  CheckPolicyInEndoStage,
  GenerateCDTransactionForDispatcher,
  GetPolicyEndoCountByAllocation,
  GetDynamicPermissions,
  ReverseCDTransaction,
  getAllClaimDetails,
};
