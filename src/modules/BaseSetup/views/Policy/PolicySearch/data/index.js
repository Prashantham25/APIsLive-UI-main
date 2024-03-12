import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";

const getPolicySearch = async (data) => {
  try {
    const polSearchRes = await postRequest(`Policy/PolicySearch`, data);
    return polSearchRes;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getProposalPolicyDetail = async (data) => {
  try {
    const proposalData = await getRequest(`Policy/GetProposalPolicyDetail?policyno=${data}`);
    return proposalData;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getEndorsementDetail = async (data) => {
  try {
    const endorsementData = await getRequest(`Policy/SearchEndorsement?policyNumber=${data}`);
    return endorsementData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getClaimDetails = async (data) => {
  try {
    const claimData = await postRequest(`ClaimManagement/SeachClaimTransactions`, data);
    return claimData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const sendEmail = async (data) => {
  try {
    const emailData = await postRequest(`Notifications/SendGenericNotification`, data);
    return emailData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getProductById = async (data) => {
  try {
    const productData = await getRequest(`Product/GetProductById?productId=${data}`);
    return productData;
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

export {
  getPolicySearch,
  getProposalPolicyDetail,
  getEndorsementDetail,
  getClaimDetails,
  sendEmail,
  getProductById,
  getDocumentByType,
};
