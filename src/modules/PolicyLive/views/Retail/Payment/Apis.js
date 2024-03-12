import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";

const GetNPCommonMaster = async () => {
  try {
    const masterData = await getRequest(`Policy/GetNPCommonMaster?sMasterlist=DocType`);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
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

const GeneratePaymentRequest = async (obj) => {
  try {
    const res = await postRequest(`PaymentExtension/GeneratePaymentRequest?PgName=connectips`, obj);
    return res;
  } catch (error) {
    return error;
  }
};

const GeneratePGUrl = async (productId, ProposalNumber, Premiumamount, status) => {
  try {
    const policy = await getRequest(
      `Policy/GeneratePGUrl?ProductId=${productId}&ProposalNumber=${ProposalNumber}&Premiumamount=${Premiumamount}&status=${status}`
    );
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SavePolicyPaymentDetails = async (jsonValue) => {
  try {
    const policy = await postRequest(`Policy/SavePolicyPaymentDetails`, jsonValue);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetPolicyDetailsByTransactionID = async (TransactionID) => {
  try {
    const res = await getRequest(
      `Policy/GetPolicyDetailsByTransactionID?TransactionID=${TransactionID}`
    );
    return res;
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
const GetTemplatePayload = async (obj) => {
  try {
    const data = await postRequest(`Policy/GetTemplatePayload`, obj);
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
const EventCommunicationExecution = async (jsonValue) => {
  try {
    const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const InternalGetProposalDetailsByNumber = async (proposalNo) => {
  try {
    const data = await getRequest(
      `Policy/InternalGetProposalDetailsByNumber?proposalNumber=${proposalNo}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPolicyDetailsByNumber = async (policyNumber) => {
  try {
    const masterData = await getRequest(
      `Policy/InternalGetPolicyDetailsByNumber?policyNumber=${policyNumber}`
    );
    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const SendNotification = async (policyNumber, EmailId, json) => {
  try {
    const masterData = await postRequest(
      `Policy/SendNotification?PolicyNumber=${policyNumber}&EmailId=${EmailId}`,
      json
    );

    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const UpdateOrderDetails = async (json) => {
  try {
    const masterData = await postRequest(`Policy/UpdateOrderDetails`, json);

    return masterData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetEndoDetailsByTransactionID = async (TransactionID) => {
  try {
    const data = await getRequest(
      `Policy/GetEndoDetailsByTransactionID?TransactionID=${TransactionID}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
const QueryExecution = async (jsonValue) => {
  try {
    const data = await postRequest(`Report/QueryExecution`, jsonValue);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPayLoadByQueryDynamic = async (jsonValue) => {
  try {
    const data = await postRequest(`Report/GetPayLoadByQueryDynamic`, jsonValue);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const UpdatePaymentDetailsByProposalNo = async (proposalNo, json) => {
  try {
    const result = await postRequest(
      `Policy/UpdatePaymentDetailsByProposalNo?proposalno=${proposalNo}`,
      json
    );
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export {
  GenericApi,
  GetNPCommonMaster,
  GeneratePaymentRequest,
  GeneratePGUrl,
  SavePolicyPaymentDetails,
  GetPolicyDetailsByTransactionID,
  GetProposalByNumber,
  GetTemplatePayload,
  SavepolicyWFStatus,
  UpdateWorkflowStatus,
  EventCommunicationExecution,
  InternalGetProposalDetailsByNumber,
  SearchCdAccountAsync,
  GetPolicyDetailsByNumber,
  SendNotification,
  UpdateOrderDetails,
  GetEndoDetailsByTransactionID,
  QueryExecution,
  GetPayLoadByQueryDynamic,
  UpdatePaymentDetailsByProposalNo,
};
