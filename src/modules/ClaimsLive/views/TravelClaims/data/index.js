import { getRequest, postRequest, postRequestNoApi } from "core/clients/axiosclient";

const GetMasterData = async () => {
  try {
    const result = await getRequest(`ClaimManagement/GetMasterData`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetBsiDetails = async (policyNumber, memberId, benefit) => {
  try {
    const data = await getRequest(
      `ClaimManagement/GetBSIDetails?policyNo=${policyNumber}&MemberID=${memberId}&BenefitID=${benefit}`
    );
    return data.data;
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

const GetPolicyDetailsByNumber = async ({ PolicyNumber }) => {
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

const SaveClaimHistory = async ({ transactionNumber }) => {
  try {
    const result = await postRequest(`ClaimManagement/SaveClaimHistory`, transactionNumber);
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

const GenericApi = async ({ ProductCode, ApiName, SearchObj }) => {
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

const GetProductById = async (productId) => {
  try {
    const result = await getRequest(`Product/GetProductById?productId=${productId}`);
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
  GetProductById,
  GetBsiDetails,
};
