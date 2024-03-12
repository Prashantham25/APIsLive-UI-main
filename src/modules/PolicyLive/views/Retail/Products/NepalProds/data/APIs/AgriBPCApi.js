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

const GetProposalByNumber = async (proposalNo) => {
  try {
    const data = await getRequest(`Policy/GetProposalByNumber?proposalNumber=${proposalNo}`);
    return data;
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
const ExcelUpload = async (obj) => {
  try {
    const data = await postRequest(`ExcelUpload/Upload`, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProdPartnermasterData1 = async (ProductId, MasterType, obj) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${MasterType}`,
      obj
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
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
  GetProposalByNumber,
  DeduplicationByDistrictRefNo,
  ExcelUpload,
  GetProdPartnermasterData1,
  SendNotification,
};
