import { postRequest, getRequest } from "core/clients/axiosclient";

const GetMasterDataAsynconPartner = async () => {
  try {
    const partnerdata = await getRequest(`Partner/GetMasterDataAsync?sMasterlist=Partner`);
    console.log("partnerdata", partnerdata);
    return partnerdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const GetMasterDataAsynconPaymentMode = async () => {
  try {
    const paymentdata = await getRequest(`Partner/GetMasterDataAsync?sMasterlist=PaymentMode`);
    console.log("paymentdata", paymentdata);
    return paymentdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const GetMasterDataAsynconPartnerIDandProduct = async (partnerId) => {
  try {
    const productdata = await getRequest(
      `Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=${partnerId}`
    );
    console.log("productdata", productdata);
    return productdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const CreateCDAccountmethod = async (jsonValue) => {
  try {
    const createcd = await postRequest(`Accounts/CreateCdAccount`, jsonValue);

    return createcd;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const ReplenishAccountmethod = async (jsonValue) => {
  try {
    const replenish = await postRequest(`Accounts/ReplenishCdAccount`, jsonValue);

    return replenish;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const SearchCDAccountmethod = async (jsonValue) => {
  try {
    const searchcd = await postRequest(`Accounts/SearchCdAccountAsync`, jsonValue);

    return searchcd;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const SearchCdTransactionAsyncmethod = async (jsonValue) => {
  try {
    const transcd = await postRequest(`Accounts/SearchCdTransactionAsync`, jsonValue);

    return transcd;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

export {
  GetMasterDataAsynconPartner,
  GetMasterDataAsynconPartnerIDandProduct,
  CreateCDAccountmethod,
  SearchCDAccountmethod,
  SearchCdTransactionAsyncmethod,
  GetMasterDataAsynconPaymentMode,
  ReplenishAccountmethod,
};
