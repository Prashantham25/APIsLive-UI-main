import { postRequest, getRequest } from "core/clients/axiosclient";

const ClauseData = async (MasterType, obj) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=872&MasterType=${MasterType}`,
      obj
    );
    console.log(res, "ClauseData");
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const fetchProfile = async (AgentCode, UserName) => {
  try {
    const profile = await getRequest(
      `Policy/GetProfile?AgentCode=${AgentCode}&UserName=${UserName}`
    );
    await console.log("profileinformation....", [...profile.data]);
    return profile;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const fetchuser = async (UserName) => {
  try {
    const profile = await getRequest(`UserProfile/SearchUserById?Id=${UserName}`);
    console.log("profileinformation....", profile);
    return profile;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMasterDatalist = async () => {
  // debugger;
  try {
    const masterData = await getRequest(`Product/GetMasterData`);
    return masterData;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const getCountryMaster = async () => {
  try {
    const countryMaster = await getRequest(`ClaimManagement/GetCountryMaster`);
    return countryMaster;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const Saveprofile = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/Saveprofile  `, jsonValue);
    console.log("Saveprofile  ....");
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export { Saveprofile, getMasterDatalist, getCountryMaster, fetchProfile, fetchuser, ClauseData };
