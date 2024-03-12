import { postRequest, getRequest } from "core/clients/axiosclient";

// const calculatePremium = async (jsonValue) => {
//   try {
//     const premium = await postRequest(
//       `Product/GenericApi?ProductCode=PDentalTest&ApiName=HDFCDenatalAPIPremium`,
//       jsonValue
//     );
//     return premium;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

const calculatePremium = async (jsonValue) => {
  try {
    const premium = await postRequest(
      `Product/GenericApi?ProductCode=RSGroupHealth&ApiName=RSHealthGroupAPI`,
      jsonValue
    );
    return premium;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const calculateProposal = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/SaveCreateProposal`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const issuePolicy = async (jsonValue) => {
  try {
    // const policy = await postRequest(`Policy/SavePaymentdetails?ProposalNo=${data}`, jsonValue);
    const policy = await postRequest(`Policy/SavePolicyPaymentDetails`, jsonValue);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const sendPdf = async (policyNumber) => {
  const pdf = {
    // key: "0889/0000/0002/00/000",
    key: policyNumber,
    keyType: "RSpolicy",
    communicationId: 110,
    ISDMS: true,
    referenceId: 1,
  };
  try {
    // const policy = await postRequest(`Policy/SavePaymentdetails?ProposalNo=${data}`, jsonValue);
    const pdfResponse = await postRequest(
      `Policy/SendNotification?PolicyNumber=${policyNumber}`,
      pdf
    );
    return pdfResponse;
  } catch (error) {
    console.log(error);
  }
  return null;
};
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

export { getDistrict, getState, calculateProposal, calculatePremium, issuePolicy, sendPdf };
