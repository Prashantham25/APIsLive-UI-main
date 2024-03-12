import { getRequest, postRequest } from "core/clients/axiosclient";

const PolicyCount = async (jsonValue) => {
  try {
    const Count = await postRequest(`Policy/PolicyCount`, jsonValue);
    return Count;
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

const PolicySearch = async (jsonValue) => {
  try {
    const Policy = await postRequest(`Policy/PolicySearch`, jsonValue);
    return Policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const ProposalSearch = async (jsonValue) => {
  try {
    const Policy = await postRequest(`Policy/ProposalSearch`, jsonValue);
    return Policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetUsers = async (userName) => {
  try {
    const user = await getRequest(`Login/GetUsers?username=${userName}&envId=297&productType=Mica`);
    return user.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
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
const generateFilePreview = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const pdfWindow = window.open();
  pdfWindow.document.write(
    `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
  );
};
const generateFile = (content, fileName) => {
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  link.click();
};

const GetUserByNumber = async (jsonValue) => {
  try {
    const getUserData = await postRequest(`Login/GetUserByNumber`, jsonValue);
    console.log("getUserData", getUserData.data);
    return getUserData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
export {
  PolicyCount,
  GetPayLoadByQueryDynamic,
  PolicySearch,
  ProposalSearch,
  GetUsers,
  GetTemplatePayload,
  generateFile,
  generateFilePreview,
  GetUserByNumber,
};
