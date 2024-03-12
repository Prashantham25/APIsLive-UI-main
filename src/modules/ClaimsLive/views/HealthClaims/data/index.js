import axios from "axios";
import { getRequest, postRequest, postRequestNoApi } from "core/clients/axiosclient";
import swal from "sweetalert2";

const GetMasterData = async () => {
  try {
    const result = await getRequest(`ClaimManagement/GetMasterData`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetPolicyBenefitList = async ({ PolicyNumber }) => {
  try {
    const result = await getRequest(`Policy/GetPolicyBenefitList?policyNo=${PolicyNumber}`);
    return result.data;
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

const CheckDuplicateClaimNumber = async ({ memberId, currDate, benefitNo }) => {
  try {
    const result = await postRequest(
      `ClaimManagement/CheckDuplicateClaimNumber?memberId=${memberId}&currDate=${currDate}&benefit=${benefitNo}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetTpaData = async ({ TPAcode }) => {
  try {
    const result = await postRequest(`ClaimManagement/GetTpaData`, TPAcode);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveClaimDataDetails = async ({ TravelClaimIntimation }) => {
  try {
    const result = await postRequest(`ClaimManagement/SaveClaimDataDetails`, TravelClaimIntimation);
    console.log("on save response", result);
    return result.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GetCountryMaster = async () => {
  try {
    const result = await getRequest(`ClaimManagement/GetCountryMaster`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetPolicyInfoByPolicyNumber = async (PolicyNumber) => {
  // debugger;
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

const GetPolicyDetailsByNumber = async (PolicyNumber) => {
  try {
    const result = await getRequest(`Policy/GetPolicyDetailsByNumber?PolicyNumber=${PolicyNumber}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProductJson = async (ProductCode) => {
  try {
    const result = await getRequest(`Product/GetProductJson?ProductCode=${ProductCode}`);
    return result.data;
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

const SaveClaimWFStatus = async (transactionNumber, data) => {
  try {
    const result = await postRequest(
      `ClaimManagement/SaveClaimWFStatus?transactionNo=${transactionNumber}`,
      data
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SeachClaimTransactions = async ({ SearchObj }) => {
  try {
    const result = await postRequest(`ClaimManagement/SeachClaimTransactions`, SearchObj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const generateFile = (content, fileName) => {
  console.log("content", content); // here at console if i copy the code and use online tool(https://base64.guru/converter/decode/pdf) it shows the correct pdf
  // const blob = new Blob([content], { type: "application/pdf" });
  // console.log(blob);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  link.click();
};

const onDownloadClick = async (id) => {
  try {
    const result = await getRequest(`DMS/GetDocumentById?id=${id}`);
    console.log("ddddd", result);
    const data1 = result.data;
    const fileName = data1.fileName.concat(".", data1.fileExtension);
    if (data1.data !== "") {
      generateFile(data1.data, fileName);
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetClaimHistory = async ({ SearchObj }) => {
  console.log("SearchObj", SearchObj);
  try {
    const result = await postRequest(`ClaimManagement/GetClaimHistory`, SearchObj);
    return result.data;
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

const UpdateClaimBankAccounts = async ({ ClaimId, TransactionId, ClaimObj }) => {
  try {
    const result = await postRequest(
      `ClaimManagement/UpdateClaimBankAccounts?claimId=${ClaimId}&transactionId=${TransactionId}`,
      ClaimObj
    );
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProductByCode = async ({ ProductCode }) => {
  try {
    const result = await getRequest(`Product/GetProductByCode?productCode=${ProductCode}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProductAPI = async ({ ProductID, ActivityType }) => {
  try {
    const result = await getRequest(
      `Product/GetProductAPI?productId=${ProductID}&ActivityType=${ActivityType}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetStakeHoldersDetails = async ({ TransactionId, ClaimCategory }) => {
  try {
    const result = await getRequest(
      `ClaimManagement/GetStakeHoldersDetails?KeyType=TravelClaims&Key=${TransactionId}&ClaimType=${ClaimCategory}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const RuleExecution = async ({ SearchObj }) => {
  console.log("SearchObj", SearchObj);
  try {
    const result = await postRequestNoApi(`RuleEngine/RuleExecution/30358`, SearchObj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetClaimTransactionFinanceBankData = async ({ SearchObj }) => {
  console.log("SearchObj", SearchObj);
  try {
    const result = await postRequest(
      `ClaimManagement/GetClaimTransactionFinanceBankData`,
      SearchObj
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Documentupload = async ({ binary }) => {
  console.log("binary11", binary);
  try {
    const result = await postRequestNoApi(`DMS/Documentupload/Documentupload`, binary);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
async function UploadFiles(data) {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
}
const getInvoiceData = async (SearchObj) => {
  // debugger;

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: process.env.REACT_APP_API_KEY,
  };
  const payload = {
    base64: SearchObj,
  };
  try {
    // const result = await axios.post(`http://localhost:60000/api/ML/getInvoiceData`, payload);
    // const result = await postRequest(`ML/getInvoiceData`, payload);
    const result = await axios.post(
      `https://devapi.inubesolutions.com/api/ML/getInvoiceData`,
      payload
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getDocumentData = async (SearchObj) => {
  // debugger;

  axios.defaults.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: process.env.REACT_APP_API_KEY,
  };
  const payload = {
    base64: SearchObj,
  };
  try {
    // const result = await axios.post(`http://localhost:60000/api/ML/getDocumentData`, payload);
    // const result = await postRequest(`ML/getDocumentData`, payload);
    const result = await axios.post(
      `https://devapi.inubesolutions.com/api/ML/getDocumentData`,
      payload
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetDocumentApimId = async (SearchObj) => {
  // debugger;
  const payload = {
    base64: SearchObj,
  };
  try {
    const UploadedData = await postRequest(`ML/GetDocumentApimId`, payload);
    return UploadedData;
  } catch (error) {
    return error;
  }
};
const GetDocumentDataByApimId = async (SearchObj) => {
  try {
    const result = await getRequest(`ML/GetDocumentDataByApimId?processId=${SearchObj}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetInvoiceApimId = async (SearchObj) => {
  // debugger;
  const payload = {
    base64: SearchObj,
  };
  try {
    const UploadedData = await postRequest(`ML/GetInvoiceApimId`, payload);
    return UploadedData;
  } catch (error) {
    return error;
  }
};
const GetInvoiceDataByApimId = async (SearchObj) => {
  try {
    const result = await getRequest(`ML/GetInvoiceDataByApimId?processId=${SearchObj}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const TransactionImport = async (data) => {
  try {
    const result = await postRequest(
      `ClaimManagement/TransactionImport/TransactionImport?IsTransactionBasis=Yes`,
      data
    );
    return result.data;
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

const sendOTP = async (data) => {
  try {
    const res = await postRequest(`UserProfile/MobileNumberLogin`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const validateOtp = async (data) => {
  try {
    const res = await postRequest(`UserProfile/VerifyingOTPForDeclaration`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getClaimDetails = async (claimNo) => {
  try {
    const result = await getRequest(`ClaimManagement/GetClaimDetails?claimNo=${claimNo}`);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getProdPartnermasterData = async (ProductId, masterType, data) => {
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

const master = async (productId, MasterType, data) => {
  // debugger;
  try {
    const masterData = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&MasterType=${MasterType}`,
      data
    );
    return masterData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const masterIFSC = async (productId, MasterType, data) => {
  // debugger;
  // const IFSc = {
  //   TXT_IFSC_CODE: "",
  // };
  try {
    const masterData = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&MasterType=${MasterType}`,
      data
    );
    return masterData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getProdPartnermasterDatas = async (ProductId, masterType, data) => {
  // debugger;
  const abc = {
    Refid: data,
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

const SearchClaimDetailsByRegClaimNo = async (ClaimId, ClaimNo) => {
  // debugger;
  try {
    const result = await postRequest(
      `ClaimManagement/SearchClaimDetailsByRegClaimNo?RegClaimNo=${ClaimId}&ClaimNo=${ClaimNo}`
    );
    console.log(result);
    return result.data;
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

const updateStageStatusIdByTno = async (transactionNo, ClaimStatusId) => {
  // debugger;
  try {
    const result = await getRequest(
      `ClaimManagement/updateStageStatusIdByTno?transactionNo=${transactionNo}&ClaimStatusId=${ClaimStatusId}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetMemberdetailsByUHID = async (memberId) => {
  // debugger;
  const productId = "1022";
  try {
    const result = await getRequest(
      `Policy/GetMemberdetailsByUHID?memberId=${memberId}&productId=${productId}`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const QueryExecution = async (jsonValue) => {
  try {
    const reportExecution = await postRequest(`Report/QueryExecution`, jsonValue);
    return reportExecution;
  } catch (error) {
    console.log(error);
  }
  return null;
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
const EventCommunicationExecution = async (data) => {
  // debugger;
  try {
    const result = await postRequest(`Notifications/EventCommunicationExecution`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

async function DeleteFile(fileName) {
  try {
    const DeleteFileData = await getRequest(`DMS/DeleteDocument?id=${fileName}`);
    return DeleteFileData;
  } catch (error) {
    return error;
  }
}

const getPolicyDetails = async (policyNumber) => {
  try {
    const result = await getRequest(`Policy/GetPolicyDetailsByNumber?policyNumber=${policyNumber}`);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const claimgetProductByCode = async (productCode) => {
  try {
    const result = await getRequest(`Product/GetProductByCode?productCode=${productCode}`);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getProdPartnermasterDatastatus = async (ProductId, masterType, data) => {
  const abc = {
    Refid: data,
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
const getAllClaimDetail = async (SearchValues) => {
  try {
    const result = await postRequest(`ClaimManagement/GetAllClaimDetails`, SearchValues);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const claimsDedupe = async (productId, data) => {
  try {
    const result = await postRequest(`ClaimManagement/ClaimsDeDupe?productId=${productId}`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const UpdateClaimDetails = async (data) => {
  try {
    const result = await postRequest(`ClaimManagement/UpdateClaimDetails`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SearchClaimDetailsByClaimNo = async (ClaimNo) => {
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
const SendNotification = async (EmailId, data) => {
  try {
    const masterData = await postRequest(`Policy/SendNotification?EmailId=${EmailId}`, data);

    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const fetchCommunicationLog = async (claimNumber) => {
  // debugger;
  try {
    const result = await getRequest(
      `Notifications/FetchCommunicationLog?KeyType=Claims&KeyValue=${claimNumber}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
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
const GetUserById = async (Id) => {
  // debugger;
  try {
    const Product = await getRequest(`UserProfile/SearchUserById?Id=${Id}`);
    return Product;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const DispatcherCallEvent = async (data) => {
  // debugger;
  try {
    const dispData = await postRequest(
      `Dispatcher/DispatcherCallEvent?EventType=IMPSFundTransfer_Dispatcher`,
      data
    );
    return dispData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetPaymentDetails = async (ClaimNumber) => {
  // debugger;
  try {
    const result = await getRequest(
      `ClaimManagement/GetPaymentDetailsByClaimNumber?ClaimNumber=${ClaimNumber}`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetPayLoadByQueryDynamic = async (data) => {
  // debugger;
  try {
    const result = await postRequest(`Report/GetPayLoadByQueryDynamic`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveBSIV2 = async (data) => {
  try {
    const result = await postRequest(`ClaimManagement/SaveBSIV2`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPaymentDetailByStatus = async (data) => {
  try {
    const result = await postRequest(`ClaimManagement/GetPaymentDetailByStatus`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
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
const SwalMessageApiIfFails = () => {
  swal.fire({
    icon: "error",
    text: "Incurred an error please try again later",
    confirmButtonColor: "#0079CE",
  });
};

const DateFormateing = (dd) => {
  const date = new Date(dd);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return formattedDate;
};

export {
  GetPolicyBenefitList,
  GetMasterData,
  CheckDuplicateClaimNumber,
  GetTpaData,
  SaveClaimDataDetails,
  GetCountryMaster,
  GetProductJson,
  GetPolicyInfoByPolicyNumber,
  GetPolicyDetailsByNumber,
  SaveClaimHistory,
  SeachClaimTransactions,
  onDownloadClick,
  GetClaimHistory,
  GenericApi,
  UpdateClaimBankAccounts,
  GetProductByCode,
  GetProductAPI,
  RuleExecution,
  GetClaimTransactionFinanceBankData,
  Documentupload,
  TransactionImport,
  GetStakeHoldersDetails,
  GetBenefits,
  SaveClaimDetails,
  sendOTP,
  validateOtp,
  getClaimDetails,
  UploadFiles,
  getInvoiceData,
  getDocumentData,
  getProdPartnermasterData,
  getProdPartnermasterDatas,
  getAllClaimDetails,
  GetMemberdetailsByUHID,
  SearchClaimDetailsByRegClaimNo,
  GetDynamicPermissions,
  QueryExecution,
  EventCommunicationExecution,
  DeleteFile,
  getPolicyDetails,
  getProdPartnermasterDatastatus,
  getAllClaimDetail,
  UpdateClaimDetails,
  master,
  masterIFSC,
  SearchClaimDetailsByClaimNo,
  SaveClaimWFStatus,
  updateStageStatusIdByTno,
  SendNotification,
  fetchCommunicationLog,
  GetUserById,
  GetUsersRoles,
  DispatcherCallEvent,
  claimsDedupe,
  GetPaymentDetails,
  claimgetProductByCode,
  SaveBSIV2,
  GetPaymentDetailByStatus,
  GetPayLoadByQueryDynamic,
  GetDocumentApimId,
  GetEndorsementJson,
  GetDocumentDataByApimId,
  GetInvoiceApimId,
  GetInvoiceDataByApimId,
  SwalMessageApiIfFails,
  DateFormateing,
};
