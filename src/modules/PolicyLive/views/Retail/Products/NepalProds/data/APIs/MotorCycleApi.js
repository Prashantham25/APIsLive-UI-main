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
const SavepolicyWFStatus = async (proposalNo, productCode, obj) => {
  try {
    const data = await postRequest(
      `Policy/SavepolicyWFStatus?proposalNumber=${proposalNo}&productCode=${productCode}`,
      obj
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProposalByNumber = async (proposalNo, productid) => {
  try {
    const data = await getRequest(
      `Policy/GetProposalByNumber?proposalNumber=${proposalNo}&productid=${productid}`
    );
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
const GetProposalByWFId = async (obj) => {
  try {
    const policy = await postRequest(`Policy/GetProposalByWFId`, obj);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetEndorsListByWfStatusID = async (obj) => {
  try {
    const policy = await postRequest(`Policy/GetEndorsListByWfStatusID`, obj);
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

// const IsAlphaNoSpace = (str) => {
//   const regex =
//     /^([A-Za-z])+([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}$/;
//   // const regex = /^([A-Za-z]+\s)+([A-Za-z]+\s)+([A-Za-z]+\s)+([A-Za-z]+\s)+([A-Za-z]+\s)+$/;
//   // const regex =/^([A-Za-z])+([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}$/;

//   if (regex.test(str) || str === "") {
//     return true;
//   }
//   return "Allows only alphabets and space";
// };

const IsAlphaNoSpace = (str) => {
  if (str === " ") return "Allows only alphabets ";

  const regex = /^[a-zA-Z\s]*$/;
  // const regex = /^[a-zA-Z][a-zA-Z\s]*$/;

  if (regex.test(str)) return true;
  return "Allows only alphabets and space";
};

const IsAlphaNumNoSpace = (str) => {
  if (str === " ") return "Allows only alphabets and numbers ";

  const regex = /^[A-Za-z0-9\s]*$/;
  // const regex = /^[a-zA-Z][a-zA-Z\s]*$/;

  if (regex.test(str)) return true;
  return "Allows only alphabets, numbers and space";
};

// const IsAlphaNumNoSpace = (str) => {
//   // const regex = /^([A-Za-z0-9])+([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}$/;
//   const regex =
//     /^([A-Za-z0-9])+([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}([\s]){0,1}([A-Za-z0-9]){0,}$/;
//   if (regex.test(str) || str === "") {
//     return true;
//   }
//   return "Allows only alphabets, numbers and space";
// };

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

const FiscalYear = () => {
  const curM = new Date().getMonth() + 1;
  const curD = new Date().getDate();
  let curY2 = new Date().getFullYear();
  let curY1 = new Date().getFullYear();
  if (curM < 7) {
    curY1 -= 1;
  } else if (curM > 7) {
    curY2 += 1;
  } else if (curD < 17) curY1 -= 1;
  else curY2 += 1;
  return curY1.toString().slice(2, 4).concat("/", curY2.toString().slice(2, 4));
};
const IsNumeric1 = (number) => {
  const regex = /^(?!(0))[0-9]*$/;
  if (regex.test(number)) return true;
  return "Value must be greater than zero and Numeric";
  //  " Allows only number";
};
const NumberofDaysinYear = (StartDate, year) => {
  let numberofDays = "";
  const CheckYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  const feb29datestartyear = CheckYear === true ? new Date(`02/29/${year}`) : null;
  if (feb29datestartyear !== null) {
    if (new Date(StartDate).getTime() <= new Date(feb29datestartyear).getTime()) {
      numberofDays = "366";
    }
    if (new Date(StartDate).getTime() > new Date(feb29datestartyear).getTime()) {
      numberofDays = "365";
    }
  }
  if (feb29datestartyear === null) {
    const Year1 = Number(year) + 1;
    const CheckYear1 = Year1 % 400 === 0 || (Year1 % 100 !== 0 && Year1 % 4 === 0);
    const feb29datestartyear1 = CheckYear1 === true ? new Date(`02/29/${Year1}`) : null;
    if (
      (feb29datestartyear1 !== null && StartDate > `02/29/${year}`) ||
      (feb29datestartyear1 === null && StartDate >= `03/01/${year}` && CheckYear1 === true)
    ) {
      numberofDays = "366";
    }
    if (
      (feb29datestartyear1 === null && StartDate !== `03/01/${year}`) ||
      (feb29datestartyear1 !== null && StartDate === `02/29/${year}` && CheckYear1 === true) ||
      (feb29datestartyear1 !== null && StartDate < `02/29/${year}` && CheckYear1 === true)
    ) {
      numberofDays = "365";
    }
  }
  // if (CheckYear === true) {
  //   numberofDays = "366";
  // } else {
  //   numberofDays = "365";
  // }
  return numberofDays;
};
const PolicyStartDateFiscalYear = () => {
  // const Dat = FiscalYear().split("/");
  // const CYear = Number(Dat[0]);
  // const Current = new Date().getFullYear() % 100;
  let Date1 = "";
  if (new Date().getDate() < 17 && new Date().getMonth() + 1 === 7) {
    Date1 = `07/16/${new Date().getFullYear() - 1}`;
  }
  if (new Date().getMonth() + 1 < 7) {
    Date1 = `07/16/${new Date().getFullYear() - 1}`;
  }
  if (new Date().getDate() > 16 && new Date().getMonth() + 1 === 7) {
    Date1 = `07/17/${new Date().getFullYear()}`;
  }
  if (new Date().getMonth() + 1 > 7) {
    Date1 = `07/17/${new Date().getFullYear()}`;
  }
  return Date1;
};

// const GetPolicies = async () => {
//   try {
//     const pol = await getRequest(`Policy/GetPolicies`);
//     return pol.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

const AccountConfig = async (type) => {
  try {
    const pol = await getRequest(`AccountConfig/GetDepositsAndCredits?type=${type}`);
    return pol.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// const UpdateGenerateDeposit = async (policyNo) => {
//   try {
//     const pol = await postRequest(`Policy/UpdateGenerateDeposit`, policyNo);
//     return pol.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

const UpdateDepositsAndCredits = async (policyNo, depositDetails) => {
  try {
    const pol = await postRequest(
      `AccountConfig/UpdateDepositsAndCredits`,
      policyNo,
      depositDetails
    );
    return pol.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const VochurNumberGeneration = async (policyNo) => {
  try {
    const pol = await postRequest(`AccountConfig/VoucherNumberGeneration`, policyNo);
    return pol.data;
  } catch (error) {
    console.log(error);
  }
  return null;
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

const UpdatePolicyDetails = async (PolicyNo, json) => {
  try {
    const res = await postRequest(`Policy/UpdatePolicyDetails?policyNumber=${PolicyNo}`, json);
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
const PolicyStartDateMinDate = () => {
  const startYear = parseInt(
    new Date().getFullYear().toString().slice(0, 2).concat(FiscalYear().split("/")[0]),
    10
  );
  let Date1 = "";
  // if (new Date().getDate() < 17 && new Date().getMonth() + 1 === 7) {
  //   Date1 = `07/16/${startYear}`;
  // }
  // if (new Date().getMonth() + 1 < 7) {
  //   Date1 = `07/16/${startYear}`;
  // }
  // if (new Date().getDate() > 16 && new Date().getMonth() + 1 === 7) {
  //   Date1 = `07/17/${new Date().getFullYear()}`;
  // }
  // if (new Date().getMonth() + 1 > 7) {
  //   Date1 = `07/17/${new Date().getFullYear()}`;
  // }
  if (FiscalYear() === "23/24") {
    Date1 = `07/17/${startYear}`;
  }
  if (FiscalYear() === "24/25") {
    Date1 = `07/16/${startYear}`;
  }
  return Date1;
};
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const PolicyStartDateMaxDate = () => {
  let endYear = "";
  endYear = parseInt(
    new Date().getFullYear().toString().slice(0, 2).concat(FiscalYear().split("/")[1]),
    10
  );
  let Date1 = "";
  // if (new Date().getDate() < 17 && new Date().getMonth() + 1 === 7) {
  //   Date1 = `07/16/${new Date().getFullYear()}`;
  // }
  // if (new Date().getMonth() + 1 < 7) {
  //   Date1 = `07/16/${new Date().getFullYear()}`;
  // }
  // if (new Date().getDate() > 16 && new Date().getMonth() + 1 === 7) {
  //   Date1 = `07/16/${endYear}`;
  // }
  // if (new Date().getMonth() + 1 > 7) {
  //   Date1 = `07/16/${endYear}`;
  // }
  if (FiscalYear() === "23/24" || FiscalYear() === "24/25") {
    Date1 = `07/15/${endYear}`;
  }

  return Date1;
};

const NoofDays = () => {
  const endDate = new Date(PolicyStartDateMaxDate());
  const startDate = new Date(PolicyStartDateMinDate());
  const currDate = new Date();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
  const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;
  if (
    (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
    (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
    currDate <= feb29datestartyear ||
    currDate <= feb29dateendyear
  ) {
    return 366;
  }
  return 365;
};

// const NoofDays1 = (startDate1, endDate1) => {
//   const endDate = new Date(endDate1);
//   const startDate = new Date(startDate1);
//   const currDate = new Date();
//   const startYear = startDate.getFullYear();
//   const endYear = endDate.getFullYear();
//   const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
//   const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;
//   if (
//     (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
//     (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
//     currDate <= feb29datestartyear ||
//     currDate <= feb29dateendyear
//   ) {
//     return 366;
//   }
//   return 365;
// };

const SaveEndorsementWFStatus = async (EndProposalNo, obj) => {
  try {
    const data = await postRequest(
      `Policy/SaveEndorsementWFStatus?endorsementNumber=${EndProposalNo}`,
      obj
    );
    return data;
  } catch (error) {
    return error;
  }
};
const GetProdPartnermasterData1 = async (MasterType, obj) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=1279&MasterType=${MasterType}`,
      obj
    );
    console.log("master", res);
    return res;
  } catch (error) {
    return error;
  }
};
const UpdateSequenceNumber = async (NumberType, Prefix, AttributeName, Suffix, obj) => {
  try {
    const data = await postRequest(
      `Policy/UpdateSequenceNumber?NumberType=${NumberType}&Prefix=${Prefix}&AttributeName=${AttributeName}&Suffix=${Suffix}`,
      obj
    );
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const UpdateEndorsementV2 = async (Status, json) => {
  try {
    const res = await postRequest(`Policy/UpdateEndorsementV2?status=${Status}`, json);
    return res.data;
  } catch (error) {
    return error.response;
  }
};
const GetEndorsementJson = async (EndorsementNumber) => {
  try {
    const data = await getRequest(
      `Policy/GetEndorsementJson?EndorsementNumber=${EndorsementNumber}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CheckPolicyInEndoStage = async (policyNumber) => {
  try {
    const data = await getRequest(`Policy/CheckPolicyInEndoStage?policyNumber=${policyNumber}`);
    return data;
  } catch (error) {
    return error;
  }
};
const GetProductByCode = async (ProductCode) => {
  try {
    const data = await getRequest(`Product/GetProductByCode?productCode=${ProductCode}`);
    return data;
  } catch (error) {
    return error;
  }
};

const GetEndorsementStageChecked = async (PolicyNo) => {
  try {
    const data = await getRequest(`Policy/GetEndorsementStageChecked?policyNumber=${PolicyNo}`);
    return data;
  } catch (error) {
    return error;
  }
};

const GetPayLoadByQueryDynamic = async (json) => {
  try {
    const result = await postRequest(`Report/GetPayLoadByQueryDynamic`, json);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const RiAllocation = async (object) => {
  try {
    const ridata = await postRequest(`ReInsurance/RiAllocation`, object);

    return ridata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const IsEmail = (email) => {
  const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i;
  if (email.length !== 0) {
    if (emailRegex.test(email)) return true;
    return "Not a valid Email";
  }
  return false;
};

const copyToClipboard = (p) => {
  const textarea = document.createElement("textarea");
  textarea.value = p;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};
const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
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
  FiscalYear,
  IsNumeric1,
  PolicyStartDateFiscalYear,
  NumberofDaysinYear,
  // GetPolicies,
  // UpdateGenerateDeposit,
  GetEndorsementConfigV2ByProductId,
  UpdatePolicyDetails,
  AccountConfig,
  UpdateDepositsAndCredits,
  VochurNumberGeneration,
  EndorsementGenericSave,
  PolicyStartDateMinDate,
  PolicyStartDateMaxDate,
  SaveEndorsementWFStatus,
  GetEndorsListByWfStatusID,
  GetProdPartnermasterData1,
  UpdateSequenceNumber,
  UpdateEndorsementV2,
  GetEndorsementJson,
  getDocumentById,
  CheckPolicyInEndoStage,
  GetProductByCode,
  GetEndorsementStageChecked,
  GetPayLoadByQueryDynamic,
  RiAllocation,
  NoofDays,
  // NoofDays1,
  IsEmail, // Accept only .com
  copyToClipboard,
  redAsterisk,
};
