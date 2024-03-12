// import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../../../../../../core/clients/axiosclient";

const GetNPCommonMaster = async () => {
  try {
    const masterData = await getRequest(`Policy/GetNPCommonMaster?sMasterlist=DocType`);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
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

const Transliteration = async (obj) => {
  try {
    const res = await postRequest(`ML/Transliteration`, obj);
    return res.data.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const DocumenUpload = async (data) => {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
};

const DeleteDocument = async (fileName) => {
  try {
    const DeleteFileData = await getRequest(`DMS/DeleteDocument?id=${fileName}`);
    return DeleteFileData;
  } catch (error) {
    return error;
  }
};

const SaveQuotation = async (obj) => {
  try {
    const res = await postRequest(`Quotation/SaveQuotation`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SaveCreateProposal = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/SaveCreateProposal`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const UpdateProposalDetails = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/UpdateProposalDetails`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProdPartnermasterData = async (MasterType, obj) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=1193&MasterType=${MasterType}`,
      obj
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const QuotationUpdate = async (jsonValue) => {
  try {
    const Quotation = await postRequest(`Quotation/QuotationUpdate`, jsonValue);
    return Quotation;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetWorkFlowStageCount = async () => {
  try {
    const stageCount = await getRequest(`Workflow/GetStageStatusCount?WfprocessId=81`);
    return stageCount;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetWFTableDetails = async (StageStatusId) => {
  try {
    const data = await getRequest(`Workflow/GetWFTableDetails?StageStatusId=${StageStatusId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SavepolicyWFStatus = async (proposalNo, obj) => {
  try {
    const data = await postRequest(`Policy/SavepolicyWFStatus?proposalNumber=${proposalNo}`, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProposalByNumber = async (proposalNo) => {
  try {
    const data = await getRequest(`Policy/GetProposalByNumber?proposalNumber=${proposalNo}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetAction = async () => {
  try {
    const data = await getRequest(`Workflow/GetAction?StageStatusId=309`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetUserByUserId = async (userId) => {
  try {
    const data = await getRequest(`UserProfile/GetUserByUserId?Id=${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProposalByWFId = async (id) => {
  try {
    const policy = await getRequest(`Policy/GetProposalByWFId?StageStatusId=${id}`);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const DeduplicationByDistrictRefNo = async (obj) => {
  try {
    const data = await postRequest(`CustomerManagement/DeduplicationByDistrictRefNo`, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreateCustomer = async (obj) => {
  try {
    const data = await postRequest(`CustomerManagement/CreateCustomer`, obj);
    return data;
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
const UpdateWorkflowStatus = async (workFlowId, actionId) => {
  try {
    const data = await postRequest(
      `Workflow/UpdateWorkflowStatus?workFlowId=${workFlowId}&actionId=${actionId}`,
      {}
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
//
const SendNotification = async (emailId, notificationsData) => {
  try {
    const data = await postRequest(
      `Policy/SendNotification?PolicyNumber=${""}&EmailId=${emailId}`,
      notificationsData
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Documentuploadaws = async (binary) => {
  try {
    const result = await postRequest(
      `DMS/Documentupload/Documentupload?tagName=NepalMotorrenevaldoc`,
      binary
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const IsAlphaNoSpace = (str) => {
  const regex =
    /^([A-Za-z])+([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}$/;
  // const regex = /^([A-Za-z]+\s)+([A-Za-z]+\s)+([A-Za-z]+\s)+([A-Za-z]+\s)+([A-Za-z]+\s)+$/;
  // const regex =/^([A-Za-z])+([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}$/;

  if (regex.test(str) || str === "") {
    return true;
  }
  return "Allows only alphabets and space";
};

const IsAlphaNumNoSpace = (str) => {
  // const regex = /^([A-Za-z0-9])+([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}$/;
  const regex =
    /^([A-Za-z0-9])+([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}$/;
  if (regex.test(str) || str === "") {
    return true;
  }
  return "Allows only alphabets, numbers and space";
};

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

export {
  GenericApi,
  GetNPCommonMaster,
  Transliteration,
  DocumenUpload,
  DeleteDocument,
  SaveQuotation,
  SaveCreateProposal,
  UpdateProposalDetails,
  GetProdPartnermasterData,
  QuotationUpdate,
  GetWFTableDetails,
  GetWorkFlowStageCount,
  SavepolicyWFStatus,
  GetProposalByNumber,
  GetAction,
  GetUserByUserId,
  GetProposalByWFId,
  DeduplicationByDistrictRefNo,
  CreateCustomer,
  GetPolicyWFStatusCount,
  UpdateWorkflowStatus,
  SendNotification,
  Documentuploadaws,
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  getPolicyByNumber,
  getPolicyDetailsByNumber,
  getMasterData,
  getEndorsementConfig,
};
