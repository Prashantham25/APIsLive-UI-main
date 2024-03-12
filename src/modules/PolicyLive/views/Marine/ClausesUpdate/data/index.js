import { getRequest, postRequest } from "core/clients/axiosclient";

const fetchuser = async (UserName) => {
  try {
    // const profile = await getRequest(`UserProfile/SearchUserById?Id=${UserName}`);
    const profile = await getRequest(`UserProfile/GetUserByUserName?UserName=${UserName}`);
    console.log("profileinformation....", profile);
    return profile;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const fetchusername = async (UserId) => {
  try {
    const profile = await getRequest(`UserProfile/SearchUserById?Id=${UserId}`);
    // const profile = await getRequest(`UserProfile/GetUserByUserName?UserName=${UserName}`);
    console.log("profileinformation....", profile);
    return profile;
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
    console.log("calculateProposal....", profile);
    return profile;
  } catch (error) {
    console.log(error);
  }
  return null;
};
async function fetchMMVData(productId, masterType, jsonValue) {
  const bodyJSON = jsonValue;
  try {
    const mmvData = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
      bodyJSON
    );
    return mmvData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
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

export { fetchProfile, fetchuser, fetchusername, fetchMMVData, getMasterDatalist };
