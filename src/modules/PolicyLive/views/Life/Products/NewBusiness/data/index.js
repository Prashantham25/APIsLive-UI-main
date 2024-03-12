import { getRequest, postRequest } from "../../../../../../../core/clients/axiosclient";

// Lead APIs

async function GetLeadPool(type) {
  try {
    const res = await getRequest(`Lead/ContactPool?type=${type}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function GetLeadInfo(id) {
  try {
    const res = await getRequest(`Lead/LoadSuspectInformation?ContactID=${id}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function SaveLead(details) {
  try {
    const res = await postRequest(`Lead/SaveSuspect`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function ModifySuspect(details) {
  try {
    const res = await postRequest(`Lead/ModifySuspect`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function SaveContact(details) {
  try {
    const res = await postRequest(`Lead/SaveContact`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function SaveOpportunity(details) {
  try {
    const res = await postRequest(`Lead/SaveOpportunity`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetContact(id) {
  try {
    const res = await getRequest(`Lead/GetContact?contactId=${id}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function GetOpportunity(id, number) {
  try {
    const res = await getRequest(
      `Lead/GetOpportunity?opportunityId=${id}&opportunityNumber=${number}`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function GetOpportunityByNumber(number) {
  try {
    const res = await getRequest(`Lead/GetOpportunity?opportunityNumber=${number}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetMasters() {
  try {
    const res = await getRequest(`Lead/GetMaster?isFilter=true`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetMasterLocation(masterList, parentId) {
  try {
    const res = await getRequest(
      `Lead/GetMasterLocation?sMasterlist=${masterList}&ParentId=${parentId}&isfilter=true`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

// Quotation APIs

async function GetQuotationCount() {
  try {
    const res = await getRequest(`Quotation/GetQuotationDetailCount`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetProductMasterAVO(masterType, parentId) {
  try {
    const res = await getRequest(
      `Product/GetProductMasterAvoFromPc?masterType=${masterType}&parentID=${parentId}`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function GetProdPartnerMasterDataWithID(masterType, json, ProductId, service) {
  try {
    if (ProductId) {
      const res = await postRequest(
        `${
          service || "Product"
        }/GetProdPartnermasterData?MasterType=${masterType}&ProductId=${ProductId}`,
        json
      );
      return res.data;
    }
    if (ProductId === null || ProductId === undefined) {
      const res = await postRequest(
        `${service || "Product"}/GetProdPartnermasterData?MasterType=${masterType}`,
        json
      );
      return res.data;
    }
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetProdPartnerMasterData(masterType, json) {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?MasterType=${masterType}`,
      json
    );
    if (masterType === "Product") {
      const permissions = await getRequest(
        `Permission/GetPermissions?permissionType=Plans&userId=${localStorage.getItem(
          "userId"
        )}&roleId=${localStorage.getItem("roleId")}`
      );
      if (permissions?.data && res?.data) {
        /* eslint-disable eqeqeq */
        const filteredProducts = res.data.filter((x) =>
          permissions.data.some((y) => y.url == x.mID)
        );
        /* eslint-enable eqeqeq */
        return filteredProducts;
      }
    }
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetProdPartnerMasterDataCM(masterType, json) {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?MasterType=${masterType}`,
      json
    );
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function GetQuotationMaster(masterType) {
  try {
    const res = await getRequest(`LeadQuotation/GetQuotationMaster?masterType=${masterType}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function FetchQuotation() {
  try {
    const res = await getRequest(`Quotation/FetchQuotation`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetQuoteDetails(quoteNumber) {
  try {
    const res = await getRequest(`Quotation/GetQuoteDetailByNumber?QuoteNo=${quoteNumber}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function UpdateQuotation(details) {
  try {
    const res = await postRequest(`Quotation/QuotationUpdate`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function SaveQuotation(details) {
  try {
    const res = await postRequest(`Quotation/LifeQuotationSave`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetRiders(productId, planId) {
  try {
    const res = await getRequest(`Product/GetRiders?ProductId=${productId}&PlanId=${planId}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function StoredProcedureResult(procedureName, requestJson) {
  try {
    const res = await postRequest(
      `Policy/GetStoredProcedureResult?StoredProcedureName=${procedureName}`,
      requestJson
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function CheckIllustration(illustrationName, from, to, requestBody) {
  // const requestBody = {
  //   EllConfigName: 26,
  //   From: "1",
  //   To: "5",
  //   Yr: "1",
  //   Mnth: "1",
  //   BasicPremium: "",
  //   Age: prospectDetails.age,
  //   DrawDownPeriod: productDetails.drawDownPeriodValue,
  //   PolicyTerm: productDetails.premiumData,
  //   AdditionalLifePremium: "",
  //   WOPpremium: "",
  //   AccidentBenefit: "",
  //   FundBalanceDiv8PrevVal: "0",
  //   FundBalanceDiv12PrevVal: "0",
  //   PremiumPayingPeriod: productDetails.premiumData,
  //   FundBalanceDiv4PrevVal: "0",
  // };
  try {
    const res = await postRequest(
      `RatingConfig/CheckIllustration/CheckIllustration/${illustrationName}?From=${from}&To=${to}`,
      requestBody
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GenericApi(productCode, ApiName, requestBody) {
  try {
    const res = await postRequest(
      `Product/GenericApi?ProductCode=${productCode}&ApiName=${ApiName}`,
      requestBody
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GenericExtApi(productCode, ApiName, requestBody) {
  try {
    const res = await postRequest(
      `Product/GenericExtApi?ProductCode=${productCode}&ApiName=${ApiName}`,
      requestBody
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetQuestionnaire(id) {
  try {
    const res = await getRequest(`Questionnaries/GetQuestionnaire?id=${id}&NoOfQuestions=0`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetTemplatePayload(requestBody) {
  try {
    const res = await postRequest(`Policy/GetTemplatePayload`, requestBody);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function SendDocuSignNotification(requestBody) {
  try {
    const res = await postRequest(`DocuSign/SendDocuSignNotification`, requestBody);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetDocumentInformation(envelopeId, documentId) {
  try {
    const res = await getRequest(
      `DocuSign/GetDocumentInformation?envelopeId=${envelopeId}&documentId=${documentId}`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

const Proposals = async (obj) => {
  try {
    const masterData = await postRequest(`Proposal/Proposals`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const UpdateProposalDetails = async (obj) => {
  try {
    const masterData = await postRequest(`Policy/UpdateProposalDetails`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

async function ExecuteProcedure(procedureName, requestJson) {
  try {
    const res = await postRequest(
      `Policy/ExecuteProcedure?procedureName=${procedureName}`,
      requestJson
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

const Quotations = async (obj) => {
  try {
    const masterData = await postRequest(`Quotation/Quotations`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const DocumentUpload = async (data) => {
  try {
    const UploadedData = await postRequest(`DMS/Documentupload/Documentupload?tagName=LIC`, data);
    return UploadedData.data;
  } catch (error) {
    return error;
  }
};
const DocumentSimpleupload = async (data) => {
  try {
    const UploadedData = await postRequest(`DMS/DocumentSimpleupload/DocumentSimpleupload`, data);
    return UploadedData.data;
  } catch (error) {
    return error;
  }
};
const DeleteDocument = async (fileName) => {
  try {
    const DeleteFileData = await getRequest(`DMS/DeleteDocument?id=${fileName}`);
    return DeleteFileData.data;
  } catch (error) {
    return error;
  }
};

const GetDocumentById = async (id) => {
  try {
    const res = await getRequest(`DMS/GetDocumentById?id=${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

async function EventCommunicationExecution(requestBody) {
  try {
    const res = await postRequest(`Notifications/EventCommunicationExecution`, requestBody);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function SaveUploadDocumentDetails(requestBody) {
  try {
    const res = await postRequest(`Notifications/SaveUploadDocumentDetails`, requestBody);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetProposalByNumber(proposalNo) {
  try {
    const res = await getRequest(`Policy/GetProposalByNumber?proposalNumber=${proposalNo}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GenerateMultiplePGUrl(opportunityId) {
  try {
    const res = await getRequest(`Policy/GenerateMultiplePGUrl?OpportunityId=${opportunityId}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function PaymentRedirectionNew(paymentRefNo, requestJson) {
  try {
    const res = await postRequest(
      `Policy/PaymentRedirectionNew?PaymentRefNo=${paymentRefNo}`,
      requestJson
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetDashboardCount() {
  try {
    const res = await getRequest(`Policy/GetDashboardCount`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetDashboardData(policyCurrentStageID) {
  try {
    const res = await getRequest(
      `Policy/GetDashboardData?policyCurrentStageID=${policyCurrentStageID}`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetOpportunityList(Stageid, Statusid) {
  try {
    const res = await postRequest(`Lead/GetOpportunityList`, {
      stageID: Stageid,
      stageStatusID: Statusid,
    });
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function AllocationLogic(proposalNo, requestBody) {
  try {
    const res = await postRequest(
      `Policy/SaveProposalFailedRules?proposalNumber=${proposalNo}`,
      requestBody
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GeneratePDF(templateName, bindJson) {
  try {
    const res = await postRequest(`ReportPdf/GeneratePDF?templateName=${templateName}`, bindJson);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

const getOTP = async (jsonValue) => {
  try {
    const otpData = await postRequest(`UserProfile/MobileNumberLogin`, jsonValue);
    console.log("OTPData", otpData.data);
    return otpData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const verifyOTP = async (jsonValue) => {
  try {
    const verifyData = await postRequest(`UserProfile/VerifyingOTPForDeclaration`, jsonValue);
    console.log("OTPData", verifyData.data);
    return verifyData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

async function QueryExecution(requestJson) {
  try {
    const res = await postRequest(`Report/QueryExecution`, requestJson);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
const SendOTP = async (jsonValue) => {
  try {
    const otpData = await postRequest(`UserProfile/SendOTP`, jsonValue);
    return otpData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const OTPVerification = async (jsonValue) => {
  try {
    const otpData = await postRequest(`UserProfile/OTPVerification`, jsonValue);
    return otpData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const NotificationsVerifyOTP = async (jsonValue) => {
  try {
    const otpData = await postRequest(`Notifications/VerifyOTP`, jsonValue);
    return otpData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

async function GetPayLoadByQueryDynamic(details) {
  try {
    const res = await postRequest(`Report/GetPayLoadByQueryDynamic`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function RedirectionTransaction(TxnNo) {
  try {
    const res = await getRequest(`Policy/RedirectionTransaction?TxnNo=${TxnNo}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function LICEdms(opportunityId, FileIDList) {
  try {
    const res = await postRequest(
      `PaymentExtension/LICEdms?opportunityId=${opportunityId}&FileIDList=${FileIDList}`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
const GetJPGFromTIFByte = async (base64) => {
  try {
    const res = await fetch(
      "https://winserviceextension.azurewebsites.net/api/WinExtension/GetJPGFromTIFByte",
      {
        method: "POST",
        headers: {
          // dataType: "json",
          charset: "utf8",
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: token,
        },
        body: JSON.stringify({ isByte64: true, data: base64 }),
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const LICMailRequest = {
  message: {
    to: [
      {
        email: "",
        name: "",
        type: "to",
      },
    ],
    html: "<h1>Example HTML content<h1>",
    subject: "LIC",
    from_email: "info@licindia.com",
    from_name: "LIC India",
  },
  owner_id: "65891462",
  token: "c4ooL4eDRlSdwNIFuttUxKyL",
  smtp_user_name: "smtp66549432",
};

export {
  GetLeadPool,
  GetLeadInfo,
  SaveLead,
  SaveContact,
  SaveOpportunity,
  GetContact,
  GetOpportunity,
  GetOpportunityByNumber,
  ModifySuspect,
  GetMasters,
  GetMasterLocation,
  GetQuotationCount,
  GetProductMasterAVO,
  GetProdPartnerMasterData,
  GetQuotationMaster,
  FetchQuotation,
  GetQuoteDetails,
  UpdateQuotation,
  SaveQuotation,
  GetRiders,
  StoredProcedureResult,
  CheckIllustration,
  GenericApi,
  GetQuestionnaire,
  Proposals,
  UpdateProposalDetails,
  GetDocumentInformation,
  SendDocuSignNotification,
  GetTemplatePayload,
  ExecuteProcedure,
  Quotations,
  DocumentUpload,
  DeleteDocument,
  GetDocumentById,
  EventCommunicationExecution,
  GetProposalByNumber,
  GenerateMultiplePGUrl,
  PaymentRedirectionNew,
  GetDashboardData,
  GetDashboardCount,
  AllocationLogic,
  GeneratePDF,
  GetProdPartnerMasterDataWithID,
  GetProdPartnerMasterDataCM,
  QueryExecution,
  GetOpportunityList,
  LICMailRequest,
  verifyOTP,
  getOTP,
  SendOTP,
  OTPVerification,
  NotificationsVerifyOTP,
  GetPayLoadByQueryDynamic,
  SaveUploadDocumentDetails,
  GenericExtApi,
  RedirectionTransaction,
  DocumentSimpleupload,
  LICEdms,
  GetJPGFromTIFByte,
};
