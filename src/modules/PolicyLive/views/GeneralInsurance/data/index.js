import { postRequest, getRequest } from "../../../../../core/clients/axiosclient";

const GetProdPartnermasterData = async (ProductId, MasterType, obj) => {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${MasterType}`,
      obj
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const SaveQuotation = async (obj) => {
  try {
    const res = await postRequest(`Quotation/SaveQuotation`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const Proposals = async (obj) => {
  try {
    const res = await postRequest(`Proposal/Proposals`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const Policies = async (obj) => {
  try {
    const res = await postRequest(`Policy/Policies`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const Pdfs = async (obj) => {
  try {
    const res = await postRequest(`Policy/Pdfs`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const getProductJsonV2 = async (ProductId) => {
  try {
    const res = await getRequest(`Product/getProductJsonV2?ProductId=${ProductId}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const ExecuteProcedure = async (procedureName, obj) => {
  try {
    const res = await postRequest(`Policy/ExecuteProcedure?procedureName=${procedureName}`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export {
  GetProdPartnermasterData,
  Proposals,
  Policies,
  Pdfs,
  getProductJsonV2,
  SaveQuotation,
  ExecuteProcedure,
};
