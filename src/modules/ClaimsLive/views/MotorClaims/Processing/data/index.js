import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";

const getClaimDetails = async (data) => {
  try {
    const claimSearchRes = await getRequest(`ClaimManagement/GetClaimDetails?claimNo=${data}`);
    return claimSearchRes;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const dispatcherDetails = async (data) => {
  try {
    const dispData = await postRequest(
      `Dispatcher/DispatcherCallEvent?EventType=USGIClaimProcessDisp`,
      data
    );
    return dispData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Policies = async (TxnType, DataType, TxnValue) => {
  try {
    const response = await getRequest(
      `Policy/Policies?TxnType=${TxnType}&DataType=${DataType}&TxnValue=${TxnValue}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProdPartnermasterData = async (ProductId, masterType, data) => {
  const abc = {
    MasterType: data,
  };
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${masterType}`,
      abc
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProdPartnermastersMasterData = async (ProductId, masterType, data) => {
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

const UpdateSequenceNumber = async (NumberType, Prefix, AttributeName, json) => {
  try {
    const res = await postRequest(
      `Policy/UpdateSequenceNumber?NumberType=${NumberType}&Prefix=${Prefix}&AttributeName=${AttributeName}`,
      json
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveClaimDetails = async (data) => {
  try {
    const dispData = await postRequest(`ClaimManagement/SaveClaimDetails`, data);
    return dispData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveClaimHistory = async (transactionNumber, CreatedBy) => {
  try {
    const result = await postRequest(
      `ClaimManagement/SaveClaimHistory`,
      transactionNumber,
      CreatedBy
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SearchClaimDetailsByClaimNo = async (ClaimNo) => {
  // debugger;
  try {
    const result = await postRequest(
      `ClaimManagement/SearchClaimDetailsByRegClaimNo?ClaimNo=${ClaimNo}`
    );
    console.log("result", result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetClaimDetails = async (data) => {
  try {
    const claimSearchRes = await getRequest(
      `ClaimManagement/GetClaimDetails?claimNo=${data}&transaction=true`
    );
    return claimSearchRes;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const DocumentUpload = async (body) => {
  try {
    const UploadedData = await postRequest(
      `DMS/Documentupload/Documentupload?TagName=Note&TagValue=false`,
      body
    );
    return UploadedData.data;
  } catch (error) {
    return error;
  }
};

const getDocumentById = async (data) => {
  try {
    const result = await getRequest(`DMS/GetDocumentById?id=${data}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const generateFile = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;

  link.download = fileName;
  link.click();
};

const DeleteDocument = async (fileName) => {
  try {
    const DeleteFileData = await getRequest(`DMS/DeleteDocument?id=${fileName}`);
    return DeleteFileData;
  } catch (error) {
    return error;
  }
};

const GetPayLoadByQueryDynamic = async (data) => {
  try {
    const result = await postRequest(`Report/GetPayLoadByQueryDynamic`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GenericApi = async (ProductCode, ApiName, SearchObj) => {
  console.log("GenericApi", GenericApi);
  try {
    const result = await postRequest(
      `Product/GenericApi?ProductCode=${ProductCode}&ApiName=${ApiName}`,
      SearchObj
    );
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export {
  getClaimDetails,
  dispatcherDetails,
  Policies,
  GetProdPartnermasterData,
  GetProdPartnermastersMasterData,
  UpdateSequenceNumber,
  SaveClaimDetails,
  SaveClaimHistory,
  SearchClaimDetailsByClaimNo,
  GetClaimDetails,
  DocumentUpload,
  getDocumentById,
  generateFile,
  DeleteDocument,
  GetPayLoadByQueryDynamic,
  GenericApi,
};
