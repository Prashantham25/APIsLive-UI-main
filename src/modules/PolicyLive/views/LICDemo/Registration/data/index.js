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

async function GetOTP(dispatch, jsonValue) {
  console.log("JSON value", jsonValue);
  return verifyOTP(jsonValue);
}

export { GetOTP, getOTP };
