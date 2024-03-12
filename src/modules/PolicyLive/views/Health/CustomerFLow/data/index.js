import { postRequest, getRequest } from "core/clients/axiosclient";

const calculatePremium = async (jsonValue) => {
  try {
    const premium = await postRequest(
      `Product/GenericApi?ProductCode=PDentalTest&ApiName=HDFCDenatalAPIPremium`,
      jsonValue
    );
    return premium;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const calculateProposal1 = async (jsonValue) => {
  try {
    const premium = await postRequest(
      `Product/GenericApi?ProductCode=PDentalTest&ApiName=HDFCSaveProposal`,
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
    console.log("calculateProposal....");
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const issuePolicy = async (jsonValue) => {
  try {
    const policy = await postRequest(
      `Product/GenericApi?ProductCode=PDentalTest&ApiName=HDFCIssuePolicy `,
      jsonValue
    );
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// const issuePolicy = async (jsonValue) => {
//   try {
//     // const policy = await postRequest(`Policy/SavePaymentdetails?ProposalNo=${data}`, jsonValue);
//     const policy = await postRequest(`Policy/SavePolicyPaymentDetails`, jsonValue);
//     return policy;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };
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
const getMasterDatalist = async () => {
  // debugger;
  try {
    const masterData = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `Product/GetMasterData`
    );
    return masterData;
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
    return product.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const getPlanbyProductId = async (policyId) => {
  try {
    // const plan = await getRequest(`Product/GetGroupDetailsForPartner/${productId}`);
    // const plan = await getRequest(`Product/GetGroupDetailsForPartner/769`);
    const plan = await getRequest(
      `Partner/GetPlanOnMasterPolicy?policyId=${policyId}&GroupType=105`
    );
    console.log("ProductId", 769);
    console.log("plan", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getPlanByGroupId = async (jsonValue) => {
  try {
    // const plan = await getRequest(`Product/GetPlanDetailsOnGroupId?GroupId=${planId}`);
    // const plan = await getRequest(`Product/GetPlanDetailsOnGroupId?GroupId=251`);
    const covers = await postRequest(`Product/GetBenefits`, jsonValue);
    console.log("coverdetails", jsonValue);
    console.log("Coverdetails", covers.data);
    return covers.data.finalResult;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getMasterPolicyData = async () => {
  try {
    const masterPolicies = await getRequest(`Partner/GetMasterPolicyOnPartnerID?partnerID=224`);
    console.log("masterPolicies", masterPolicies.data);
    return masterPolicies.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMasterPolicyDetails = async () => {
  try {
    const masterPolicyDetail = await getRequest(`Partner/GetAssignProduct?partnerId=224`);
    console.log("masterpolicycompletedata", masterPolicyDetail.data);
    return masterPolicyDetail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getClaimTypeDetails = async (PlanName, claimRequesJSON) => {
  try {
    const claimTypeDetails = await postRequest(
      `Product/GetGroupingDetailsByPlan?planName=${PlanName}`,
      claimRequesJSON
    );
    console.log("ClaimData", claimTypeDetails.data);
    return claimTypeDetails.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getPlanDetailsByProductID = async () => {
  try {
    const PlanCompleteDetails = await getRequest(
      `Product/GetGroupingData?ProductId=769&GroupTypeId=105`
    );
    // console.log("ProductID", ProductId);
    console.log("PlanData", PlanCompleteDetails.data);
    return PlanCompleteDetails.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const sendMail = async (proposalNumber, emailId) => {
  const jsonValue = {
    communicationId: 105,
    keyType: "HDFC",
    key: proposalNumber,
    stakeHolderDetails: [
      {
        communicationType: "Email",
        stakeholderCode: "CUS",
        communicationValue: emailId,
      },
    ],
  };
  try {
    const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
    // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const sendPolicyPdf = async (policyNo, emailId) => {
  const jsonValue = {
    communicationId: 106,
    keyType: "Chomp",
    key: policyNo,
    stakeHolderDetails: [
      {
        communicationType: "Email",
        stakeholderCode: "CUS",
        communicationValue: emailId,
      },
    ],
  };
  try {
    const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue);
    // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
    console.log(mail.data);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const generateFile = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;

  link.download = fileName;
  console.log("FilenameQuote", link.download);

  link.click();
};
const HandleDownload = async (proposalNumber) => {
  console.log("quoteNumber", proposalNumber);
  const downloadDTO = {
    key: proposalNumber,
    templateId: 73,
    referenceId: "",

    keyValue: "",
    templateKey: "",

    requestData: "",
  };

  await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
    console.log("result", result);
    console.log("binaryfile", result.data);
    if (result.status === 200) {
      generateFile(result.data, proposalNumber);
    }
  });
};
export {
  calculateProposal,
  calculateProposal1,
  calculatePremium,
  issuePolicy,
  getDistrict,
  getState,
  getSalutation,
  getMasterDatalist,
  getProductList,
  getPlanbyProductId,
  getPlanByGroupId,
  getMasterPolicyData,
  sendMail,
  HandleDownload,
  sendPolicyPdf,
  getMasterPolicyDetails,
  getClaimTypeDetails,
  getPlanDetailsByProductID,
};
