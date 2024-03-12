import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";

const getProductMaster = async (data, id) => {
  try {
    const master = await getRequest(`Product/GetProductMaster?masterType=${data}&parentId=${id}`);
    return master.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getProducts = async () => {
  try {
    const payload = {
      productName: "",
      productCode: "",
      productStatusId: "",

      includeFields: ["ProductName", "ProductId", "ProductStatusId"],
    };
    const products = await postRequest(`Product/SearchProduct`, payload);
    return products;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const apiKitMethod = async (id) => {
  try {
    const json = await getRequest(`Partner/GetPartnerApiKit?productId=${id}`);
    return json;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMasterData = async () => {
  try {
    const master = await getRequest(`Product/GetMasterData?isFilter=true`);
    return master;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getProductJson = async (id) => {
  try {
    // const product = await getRequest(`Product/GetProductJson?ProductId=${id}`);
    const data = await getRequest(
      `Product/GetProductJsonV2?ProductId=${id}&ProductName=""&ProductCode=""`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getCoverData = async () => {
  try {
    const covers = await getRequest(`Product/GetAllProductMaster?masterType=Cover&parentID=0`);
    return covers;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getAllPlansOnId = async (id) => {
  try {
    const plan = await postRequest(`Product/GetGroupList`, [id]);
    return plan;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const saveCoverGrouping = async (data) => {
  try {
    const result = await postRequest(`Product/SaveCoverGrouping`, data);
    return result;
  } catch (error) {
    return error;
  }
};
export {
  getProducts,
  getMasterData,
  getProductJson,
  getCoverData,
  getAllPlansOnId,
  saveCoverGrouping,
  getProductMaster,
  apiKitMethod,
};
