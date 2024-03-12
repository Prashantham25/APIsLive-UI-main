import axios from "axios";

import {
  getRequest,
  postRequest,
  setAuthorizationIfUserLoggedIn,
} from "../../../core/clients/axiosclient/index";

const getUserType = async (json) => {
  try {
    const userData = await getRequest(`Login/GetUserType?username=${json.UserName}`);
    return userData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Authenticate = async (data) => {
  try {
    const user = await postRequest(`Login/Authenticate`, data);
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const OAuthAuthenticate = async (data) => {
  try {
    const user = await postRequest(`Login/OAuthAuthenticate`, data);
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetWorkFlowStageCount = async () => {
  try {
    const stageCount = await getRequest(`Workflow/GetStageStatusCount?WfprocessId=53`);
    return stageCount;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetWFTableDetails = async (StageStatusId) => {
  try {
    const data = await getRequest(`Workflow/GetWFTableDetails?StageStatusId=${StageStatusId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const UpdateWorkflowStatus = async (workFlowId, actionId, data) => {
  try {
    const data1 = await postRequest(
      `Workflow/UpdateWorkflowStatus?workFlowId=${workFlowId}&actionId=${actionId}`,
      data
    );
    return data1;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetAction = async (stageStatusId) => {
  try {
    const data2 = await getRequest(`Workflow/GetAction?StageStatusId=${stageStatusId}`);
    return data2;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SearchUserSettingDetails = async (listOfSettingTypes, obj) => {
  try {
    setAuthorizationIfUserLoggedIn();
    const data2 = await postRequest(
      `CustomerProvisioning/SearchUserSettingDetails?listOfSettingTypes=${listOfSettingTypes}`,
      obj
    );
    return data2;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetUserByUserId = async (id) => {
  try {
    const res = await getRequest(`UserProfile/GetUserByUserId?Id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetSsoDetails = async (serialNO) => {
  try {
    // const res = await getRequest(`CustomerProvisioning/GetSsoDetails?serialNO=${serialNO}`);
    const axiosClient = axios.create();
    axiosClient.defaults.baseURL = process.env.REACT_APP_BASEURL;
    axiosClient.defaults.timeout = 90000;
    axiosClient.defaults.withCredentials = true;
    axiosClient.defaults.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: process.env.REACT_APP_API_KEY,
    };
    return axiosClient
      .get(`/CustomerProvisioning/GetSsoDetails?serialNO=${serialNO}`)
      .then((response) => response);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SendOTP = async (jsonValue) => {
  try {
    const otpData = await postRequest(`UserProfile/SendOTP`, jsonValue);
    console.log("OTPData", otpData.data);
    return otpData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GenericApi = async (productCode, apiName, requestJson) => {
  try {
    const response = await postRequest(
      `Product/GenericApi?ProductCode=${productCode}&ApiName=${apiName}`,
      requestJson
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getOTP = async (jsonValue) => {
  try {
    const otpData = await postRequest(`UserProfile/MobileNumberLogin`, jsonValue);
    console.log("OTPData", otpData.data);
    return otpData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const verifyOTP = async (jsonValue) => {
  try {
    const verifyData = await postRequest(`UserProfile/VerifyingOTPForDeclaration`, jsonValue);
    console.log("OTPData", verifyData.data);
    return verifyData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const ChangePassword = async (jsonValue) => {
  try {
    const passwordData = await postRequest(`UserProfile/ChangePassword`, jsonValue);
    console.log("loginData", passwordData.data);
    return passwordData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
export {
  getUserType,
  Authenticate,
  GetWorkFlowStageCount,
  GetWFTableDetails,
  UpdateWorkflowStatus,
  GetAction,
  SearchUserSettingDetails,
  GetUserByUserId,
  GetSsoDetails,
  SendOTP,
  GenericApi,
  OAuthAuthenticate,
  getOTP,
  verifyOTP,
  ChangePassword,
};
