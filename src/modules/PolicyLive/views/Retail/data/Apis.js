import { postRequest, getRequest } from "../../../../../core/clients/axiosclient";

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

const Quotations = async (obj) => {
  try {
    const masterData = await postRequest(`Quotation/Quotations`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const SaveQuote = async (obj) => {
  try {
    const masterData = await postRequest(`Quotation/SaveQuote`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const Proposals = async (obj) => {
  try {
    const masterData = await postRequest(`Proposal/Proposals`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const Policies = async (obj) => {
  try {
    const masterData = await postRequest(`Policy/Policies`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GenerateCOI = async (obj) => {
  try {
    const masterData = await postRequest(`Policy/GenerateCOI`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const Pdfs = async (obj) => {
  try {
    const masterData = await postRequest(`Policy/Pdfs`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const getProductJsonV2 = async (ProductId) => {
  try {
    const masterData = await getRequest(`Product/getProductJsonV2?ProductId=${ProductId}`);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetDocumentByType = async (obj) => {
  try {
    const masterData = await postRequest(`DMS/GetDocumentByType`, obj);
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetDynScreen = async (productCode) => {
  try {
    const res = await getRequest(`Product/GetDynScreen?productCode=${productCode}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const SetDynScreen = async (obj) => {
  try {
    const res = await postRequest(`Product/SetDynScreen`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetDynScreenList = async (type) => {
  try {
    const res = await getRequest(`Product/GetDynScreenList?type=${type}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GeneratePDF = async (templateName, obj) => {
  try {
    const res = await postRequest(`ReportPdf/GeneratePDF?templateName=${templateName}`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetProposalByNumber = async (proposalNo) => {
  try {
    const res = await getRequest(`Policy/GetProposalByNumber?proposalNumber=${proposalNo}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GenericApi,
  Quotations,
  SaveQuote,
  Proposals,
  Policies,
  GenerateCOI,
  Pdfs,
  getProductJsonV2,
  GetDocumentByType,
  GetDynScreen,
  SetDynScreen,
  GetDynScreenList,
  GeneratePDF,
  GetProposalByNumber,
};
