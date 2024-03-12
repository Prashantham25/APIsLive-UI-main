import { postRequest, getRequest, putRequestNoApi } from "core/clients/axiosclient";
import { putRequest } from "../../../core/clients/axiosclient";

const getProductList = async () => {
  const searchData = {
    productId: 0,
    lobid: 0,
    cobid: 0,
    productStatusId: 0,
    productName: "",
    productCode: "",
    activeFrom: "",
    activeTo: "",
    premiumAmount: 0,
    createdBy: 0,
    createdDate: "",
    modifyBy: 0,
    modifyDate: "",
    pageNumber: 0,
    pageSize: 0,
    sortOn: "",
    sortDirection: "",
    partnerId: 0,
    envId: 0,
    lstProductId: [0],
  };
  try {
    const product = await postRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `Product/SearchProduct`,
      searchData
    );
    return product.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getAllMaster = async () => {
  try {
    const Master = await getRequest(`PSD/GetAllMaster`);
    return Master.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const geEntitiess = async () => {
  try {
    const product = await getRequest(`PSD/GetEntities`);
    return product.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const searchProductEntities = async () => {
  const payload = {
    includeField: ["Id", "Name", "Structure"],
  };
  try {
    const entities = await postRequest(`PSD/SearchProductEntities`, payload);
    return entities;
  } catch (error) {
    return error;
  }
};
const getAttribute = async () => {
  try {
    const plan = await getRequest(`PSD/GetAttribute?WithMasterId=true`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetDynamicTargetProperty = async () => {
  try {
    const plan = await getRequest(`ObjectMapper/GetMapperDetails`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const createEntities = async (json) => {
  try {
    const product = await postRequest(`PSD/CreateEntitiesFromJson`, json);
    return product.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const saveEntities = async (jsonValue) => {
  // debugger;
  try {
    const Quotation = await postRequest(`PSD/SaveEntity`, jsonValue);
    return Quotation;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveDynamicListMapper = async (jsonValue) => {
  // debugger;
  try {
    const Quotations = await postRequest(`Dispatcher/SaveDynamicListMapper`, jsonValue);
    return Quotations;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveProductMasterApi = async (jsonValue) => {
  // debugger;
  try {
    const response = await postRequest(`Product/SaveApiActivityList`, jsonValue);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const UpdateProductMasterApiList = async (jsonValue) => {
  // debugger;
  try {
    const response = await putRequest(`Product/UpdateApiActivityList`, jsonValue);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const createDispatcherTask = async (jsonValue) => {
  // debugger;
  try {
    const Quotations = await postRequest(`Dispatcher/CreateDispatcherTask`, jsonValue);
    return Quotations;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getRiskDetails = async (value) => {
  // debugger;
  try {
    const plan = await getRequest(`Product/GetInsurableRiskDetails?ProductId=${value}`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getMasterss = async (value) => {
  // debugger;
  try {
    const plan = await getRequest(`Product/GetMasterMapper?MasterTypeId=${value}`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProductMasterAPIbyProductID = async (productId) => {
  // debugger;
  try {
    const plan = await getRequest(`Product/GetProductMasterAPIbyProductID?ProductId=${productId}`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const sourceProperty = async (jsonValue, type) => {
  // debugger;
  try {
    const proposal = await postRequest(`Product/GetDynamicSourceProperty`, jsonValue, type);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const executeApi = async (apiName, json, code) => {
  // debugger;
  try {
    const proposal = await postRequest(
      `Product/GenericApi?ProductCode=${code}&ApiName=${apiName}`,
      json
    );
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const targetcomponentAPI = async (value, config) => {
  try {
    const proposal = await getRequest(
      `Product/GetDynamicTargetProperty?EventId=${config}&Id=${value}`
    );
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const dispatcherExecutions = async (value, json) => {
  // debugger;
  try {
    const dispatcher = await postRequest(
      `Dispatcher/ExternalDispatcherEventTask?dispatcherId=${value}`,
      json.requestObject
    );
    return dispatcher;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const dispatcherTaskExecution = async (value) => {
  // debugger;
  try {
    const dispatcher = await getRequest(`Dispatcher/GetDispatcherDetails?DispatcherId=${value}`);
    return dispatcher;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const saveMapperAndDispatcher = async (json) => {
  // debugger;
  try {
    const dispatcher = await putRequestNoApi(`api/Dispatcher/UpdateDynamicListMapper`, json);
    return dispatcher;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CreateEntitiesFromJson = async (jsonValue) => {
  try {
    const proposal = await postRequest(`PSD/CreateEntitiesFromJson`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMas = async () => {
  try {
    const plan = await getRequest(`Product/GetMasterData?isFilter=true`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMapperMaster = async () => {
  try {
    const res = await getRequest(`ObjectMapper/GetMasterDynamicMapper`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMasterModule = async () => {
  try {
    const plan = await getRequest(`Product/GetMasterModuleConfig`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetMapperDetails = async () => {
  try {
    const plan = await getRequest(`ObjectMapper/GetMapperDetails`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getMapperDetails = async (mapperId) => {
  try {
    const data = await getRequest(`ObjectMapper/GetMapperDetails?mapperId=${mapperId}`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getDispatcherList = async () => {
  try {
    const plan = await getRequest(`Dispatcher/GetMasterDispatcher`);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getMasterList = async () => {
  try {
    const masList = await getRequest(`Product/GetMasterList?Masterlist=ActivityType`);
    return masList.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  getProductList,
  getAttribute,
  getAllMaster,
  GetDynamicTargetProperty,
  geEntitiess,
  createEntities,
  // checkIfAlreadyConfigured,
  saveEntities,
  getRiskDetails,
  getMasterss,
  sourceProperty,
  getMas,
  getMasterModule,
  GetMapperDetails,
  CreateEntitiesFromJson,
  SaveDynamicListMapper,
  createDispatcherTask,
  GetProductMasterAPIbyProductID,
  getDispatcherList,
  SaveProductMasterApi,
  UpdateProductMasterApiList,
  executeApi,
  targetcomponentAPI,
  dispatcherExecutions,
  dispatcherTaskExecution,
  saveMapperAndDispatcher,
  searchProductEntities,
  getMapperMaster,
  getMasterList,
  getMapperDetails,
};
