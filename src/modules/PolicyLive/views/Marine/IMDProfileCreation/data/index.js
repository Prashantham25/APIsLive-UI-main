import { postRequest, getRequest } from "core/clients/axiosclient";

const ClauseData = async (MasterType, obj) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=872&MasterType=${MasterType}`,
      obj
    );
    console.log(res, "ClauseData");
    const a = [];
    res.data.forEach((x) => {
      if (x?.mValue && x?.mValue !== "") {
        a.push(x);
      }
    });
    console.log(a, "ClausesData");
    return a;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const BranchData = async (MasterType, obj) => {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=872&MasterType=${MasterType}`,
      obj
    );
    console.log(res, "BranchData");
  } catch (error) {
    console.log(error);
  }
  return null;
};

const fetchProfile = async (AgentCode, UserName, BranchName, ProfileType, BranchCode) => {
  try {
    const profile = await getRequest(
      `Policy/GetProfile?AgentCode=${AgentCode}&UserName=${UserName}&BranchName=${BranchName}&ProfileType=${ProfileType}&BranchCode=${BranchCode}`
    );
    await console.log("profileinformation....", [...profile.data]);
    return profile;
  } catch (error) {
    console.log(error);
  }
  return null;
};
// const fetchProfile = async (AgentCode, UserName) => {
//   try {
//     const profile = await getRequest(
//       `Policy/GetProfile?AgentCode=${AgentCode}&UserName=${UserName}`
//     );
//     await console.log("profileinformation....", [...profile.data]);
//     return profile;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

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

const getMasterDatalist = async () => {
  try {
    const masterData = await getRequest(`Product/GetMasterData`);
    return masterData;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

// const getCountryMaster = async () => {
//   try {
//     const countryMaster = await getRequest(`ClaimManagement/GetCountryMaster`);
//     return countryMaster;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };

const Saveprofile = async (AgentCode, UserName, BranchName, ProfileNumber, jsonValue) => {
  try {
    const proposal = await postRequest(
      `Policy/Saveprofile?AgentCode=${AgentCode}&UserName=${UserName}&BranchName=${BranchName}&ProfileNumber=${ProfileNumber}`,
      jsonValue
    );
    console.log("Saveprofile  ....");
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export {
  Saveprofile,
  getMasterDatalist,
  fetchProfile,
  fetchuser,
  ClauseData,
  fetchusername,
  BranchData,
};
