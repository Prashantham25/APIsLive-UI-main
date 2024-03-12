import { getRequest, postRequest } from "core/clients/axiosclient";

const checkForValue = (value) => value === "" || value === undefined || value === null;

const anyApiCall = async (type, url, data) => {
  try {
    const methodType = type.toUpperCase();
    let result;
    switch (methodType) {
      case "POST":
        result = await postRequest(`${url}`, data);
        return result;
      case "GET":
        result = await getRequest(`${url}`);
        return result;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getClaimDetails = async (claimNo, status, tranNo) => {
  try {
    let result;
    if (checkForValue(tranNo)) {
      result = await getRequest(
        `ClaimManagement/GetClaimDetails?claimNo=${claimNo}&transaction=${status}`
      );
    } else {
      result = await getRequest(
        `ClaimManagement/GetClaimDetails?claimNo=${claimNo}&transaction=${status}&transactionNo=${tranNo}`
      );
    }
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getPolicyDetails = async (policyNumber) => {
  try {
    const result = await getRequest(`Policy/GetPolicyDetailsByNumber?policyNumber=${policyNumber}`);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SaveClaimDetails = async (data) => {
  try {
    const claimsaveResult = await postRequest(`ClaimManagement/SaveClaimDetails`, data);
    return claimsaveResult;
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
const GetProdPartnermasterData = async (productId, PartnerId, MasterType, data) => {
  // debugger;
  try {
    let master;
    if (checkForValue(PartnerId)) {
      master = await postRequest(
        `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&MasterType=${MasterType}`,
        data
      );
    } else {
      master = await postRequest(
        `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&PartnerId=${PartnerId}&MasterType=${MasterType}`,
        data
      );
    }
    return master;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetBenefits = async (SearchObj) => {
  try {
    const result = await postRequest(`Product/GetBenefits`, SearchObj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getDocumentByType = async (data) => {
  try {
    const docData = await postRequest(`DMS/GetDocumentByType`, data);
    return docData;
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
const GenericApi = async (ProductCode, ApiName, SearchObj) => {
  try {
    const result = await postRequest(
      `Product/GenericApi?ProductCode=${ProductCode}&ApiName=${ApiName}`,
      SearchObj
    );
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
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

const DocumentUpload = async (Note, body) => {
  try {
    const UploadedData = await postRequest(
      `DMS/Documentupload/Documentupload?TagName=${Note}&TagValue=false`,
      body
    );
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

const GetDocumentById = async (fileName) => {
  try {
    const docdata = await getRequest(`DMS/GetDocumentById?id=${fileName}`);
    return docdata;
  } catch (error) {
    return error;
  }
};

const DashboardCount = async (procedureName, Json) => {
  try {
    const Count = await postRequest(`Policy/ExecuteProcedure?procedureName=${procedureName}`, Json);
    return Count;
  } catch (error) {
    return error;
  }
};

export {
  getClaimDetails,
  getPolicyDetails,
  SaveClaimDetails,
  GetProdPartnermasterData,
  GetBenefits,
  SearchClaimDetailsByClaimNo,
  getDocumentByType,
  GetAssignProductByMasterPolicyNumber,
  anyApiCall,
  GenericApi,
  GetPayLoadByQueryDynamic,
  DocumentUpload,
  DeleteDocument,
  GetDocumentById,
  DashboardCount,
};
