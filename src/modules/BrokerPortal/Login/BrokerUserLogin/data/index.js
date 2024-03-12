import { postRequest } from "core/clients/axiosclient";

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

const sendOTP = async (jsonValue) => {
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

const verifyOTP = async (jsonValue) => {
  try {
    const verifyData = await postRequest(`UserProfile/OTPVerification`, jsonValue);
    console.log("OTPData", verifyData.data);
    return verifyData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const LoginAuth = async (jsonValue) => {
  try {
    const loginData = await postRequest(`Login/Authenticate`, jsonValue);
    console.log("loginData", loginData.data);
    return loginData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    return error.response;
  }
};

async function GetOTP(dispatch, jsonValue) {
  console.log("JSON value", jsonValue);
  return verifyOTP(jsonValue);
}

async function GetLOGIN(dispatch, jsonValue) {
  console.log("JSON value", jsonValue);
  return LoginAuth(jsonValue);
}

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

export { GetOTP, getOTP, GetLOGIN, ChangePassword, sendOTP };
