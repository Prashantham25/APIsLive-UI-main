import { Typography } from "@mui/material";
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

async function GetOTP(dispatch, jsonValue) {
  console.log("JSON value", jsonValue);
  return verifyOTP(jsonValue);
}

const CreateProfileUser = async (jsonValue) => {
  try {
    const createUser = await postRequest(`UserProfile/CreateProfileUser`, jsonValue);
    console.log("createUser", createUser.data);
    return createUser.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const Authenticate = async (jsonValue) => {
  try {
    const Auth = await postRequest(`Login/Authenticate`, jsonValue);
    console.log("createUser", Auth.data);
    return Auth.data;
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
function Timer({ counter }) {
  return (
    <Typography style={{ color: "#4caf50", fontSize: "15px" }}>
      Click On Resend OTP in 00:{counter}
    </Typography>
  );
}

export { GetOTP, getOTP, Timer, GetUserByNumber, CreateProfileUser, Authenticate, ChangePassword };
