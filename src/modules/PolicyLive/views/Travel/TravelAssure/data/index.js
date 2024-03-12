import { postRequest, getRequest } from "core/clients/axiosclient";

const calculatePremium = async (jsonValue) => {
  try {
    const premium = await postRequest(`Quotation/CalculatePremium`, jsonValue);
    console.log("pre", premium);
    return premium;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const calculateProposal = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/CreateSavePropsal`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const issuePolicy = async (jsonValue, data) => {
  try {
    const policy = await postRequest(`Policy/SavePaymentdetails?ProposalNo=${data}`, jsonValue);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getSalutation = async () => {
  // debugger;
  try {
    const salutation = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `ClaimManagement/GetMasterData?sMasterlist=Salutation`
    );
    return salutation;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
//   const getPincode = async () => {
//     try {
//       const pincode = await getRequest(
//         //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
//         `ClaimManagement/GetMasterData?sMasterlist=Pincode`
//       );
//       return pincode;
//     } catch (error) {
//       console.log("error", error);
//     }
//     return null;
//   };
const getDistrict = async (jsonData) => {
  try {
    const district = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `ClaimManagement/GetMasDistrictByPinCode?pincode=${jsonData}`
    );
    return district.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const getState = async (jsonData) => {
  try {
    const state = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `ClaimManagement/GetMasState?districtId=${jsonData}`
    );
    return state.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
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
    // console.log("111", product.data);
    return product.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const getPlanbyProductId = async (productId) => {
  try {
    const plan = await getRequest(`Product/GetGroupDetailsForPartner/${productId}`);
    console.log("productid", productId);
    console.log("plan", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getPlanByGroupId = async (planId) => {
  try {
    const plan = await getRequest(`Product/GetPlanDetailsOnGroupId?GroupId=${planId}`);
    console.log("group", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getMasterData = async () => {
  try {
    const Country = await getRequest(`ClaimManagement/GetMasterData`);
    console.log("country list", Country);
    return Country.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export {
  calculateProposal,
  calculatePremium,
  issuePolicy,
  getDistrict,
  getState,
  getSalutation,
  getProductList,
  getPlanbyProductId,
  getPlanByGroupId,
  getMasterData,
};
