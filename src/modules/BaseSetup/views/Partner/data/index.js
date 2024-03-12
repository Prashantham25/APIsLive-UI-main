import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from "../../../../../core/clients/axiosclient";

const GetMasterDataAsync = async () => {
  try {
    const res = await getRequest(`Organization/GetMasterDataAsync?sMasterlist=OrgCategory`);

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetLocationAsync = async (type, id) => {
  try {
    const res = await getRequest(
      `Organization/GetLocationAsync?locationType=${type}&parentID=${id}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const partnercode = async (code) => {
  try {
    const res = await getRequest(`Partner/PartnerCodevalidation?partnercode=${code}`);

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreatePartnerApi = async (obj) => {
  try {
    const res = await postRequest(`Partner/CreatePartner`, obj);

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SearchPartnerApi = async (obj) => {
  try {
    const res = await postRequest(`Partner/SearchPartner`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const DeletePartner = async (id) => {
  try {
    const res = await deleteRequest(`Partner/DeletePartner?PartnerId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPartnerDetails = async (id) => {
  try {
    const res = await getRequest(`Partner/GetPartnerDetails?partnerId=${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProductMaster = async (masterType, parentID) => {
  try {
    const res = await getRequest(
      `Product/GetProductMaster?masterType=${masterType}&parentID=${parentID}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetCommonMaster = async (masterType) => {
  try {
    const res = await getRequest(`Product/GetCommonMaster?masterType=${masterType}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAssignProductbyId = async (obj) => {
  try {
    const res = await postRequest(`Partner/GetAssignProductbyId`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAssignProduct = async (id) => {
  try {
    const res = await getRequest(`Partner/GetAssignProduct?partnerId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetGroupList = async (arr) => {
  try {
    const res = await postRequest(`Product/GetGroupList`, arr);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SaveAssignProduct = async (obj) => {
  try {
    const res = await postRequest(`Partner/SaveAssignProduct`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const EditAssignProductDate = async (id, obj) => {
  try {
    const res = await putRequest(`Partner/EditAssignProductDate?PolicyId=${id}`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAttachedPlanListOfPartner = async (PartnerID, ProductId) => {
  try {
    const res = await getRequest(
      `Partner/GetAttachedPlanListOfPartner?PartnerID=${PartnerID}&ProductId=${ProductId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const UpdateGroupPlans = async (ProductId, PartnerID, obj) => {
  try {
    const res = await postRequest(
      `Partner/UpdateGroupPlans?ProductId=${ProductId}&PartnerId=${PartnerID}`,
      obj
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CheckMasterPolicyHaveActivePolicy = async (obj) => {
  try {
    const res = await postRequest(`Partner/CheckMasterPolicyHaveActivePolicy`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GetMasterDataAsync,
  GetLocationAsync,
  partnercode,
  CreatePartnerApi,
  SearchPartnerApi,
  DeletePartner,
  GetPartnerDetails,
  GetProductMaster,
  GetAssignProductbyId,
  GetAssignProduct,
  GetGroupList,
  SaveAssignProduct,
  EditAssignProductDate,
  GetAttachedPlanListOfPartner,
  UpdateGroupPlans,
  CheckMasterPolicyHaveActivePolicy,
  GetCommonMaster,
};
