import { postRequest, getRequest, putRequest } from "../../../../../core/clients/axiosclient";

const WrapperCalculatePremium = async (obj) => {
  try {
    const res = await postRequest(`Mica_EGI/WrapperCalculatePremium`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const CreateProposal = async (obj) => {
  try {
    const res = await postRequest(`Policy/CreateProposal`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const CalculatePremium = async (obj) => {
  try {
    const res = await postRequest(`MICA_EGI/CalculatePremium`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetProposalByNumber = async (proposalNumber) => {
  try {
    const res = await getRequest(`Policy/GetProposalByNumber?proposalNumber=${proposalNumber}`);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const MobileNumberLogin = async (obj) => {
  try {
    const res = await postRequest(`UserProfile/MobileNumberLogin`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const VerifyingOTPForDeclaration = async (obj) => {
  try {
    const res = await postRequest(`UserProfile/VerifyingOTPForDeclaration`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetProposalByMobileNumber = async (MobileNumber) => {
  try {
    const res = await getRequest(`Policy/GetProposalByMobileNumber?MobileNumber=${MobileNumber}`);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const IssuePolicy = async (obj) => {
  try {
    const res = await putRequest(`Policy/IssuePolicy`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const UpdateProposal = async (obj) => {
  try {
    const res = await putRequest(`Policy/UpdateProposal`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const PolicySearch = async (obj) => {
  try {
    const res = await postRequest(`Policy/PolicySearch`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetPolicyDetailsByNumber = async (policyNumber) => {
  try {
    const res = await getRequest(`Policy/GetPolicyDetailsByNumber?policyNumber=${policyNumber}`);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export {
  WrapperCalculatePremium,
  CreateProposal,
  MobileNumberLogin,
  CalculatePremium,
  GetProposalByNumber,
  VerifyingOTPForDeclaration,
  GetProposalByMobileNumber,
  UpdateProposal,
  IssuePolicy,
  PolicySearch,
  GetPolicyDetailsByNumber,
};
