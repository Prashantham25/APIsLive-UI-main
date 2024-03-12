import { postRequest } from "core/clients/axiosclient";

const ClientSSODetails = async (jsonValue) => {
  try {
    const Data = await postRequest(`CustomerProvisioning/ValidateUserDetails`, jsonValue);
    return Data.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

async function GetClientSSODetails(jsonValue) {
  return ClientSSODetails(jsonValue);
}

const SSODetails = async (jsonValue) => {
  try {
    const Data = await postRequest(`CustomerProvisioning/SsoValidation`, jsonValue);
    console.log("sso", Data.data);
    if (Data.data !== "") {
      return Data.data;
    }
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

async function GetSSODetails(jsonValue) {
  return SSODetails(jsonValue);
}

export { GetSSODetails, GetClientSSODetails };
