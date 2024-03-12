import { postRequest, getRequest } from "core/clients/axiosclient";
// import Benefits from "../../../../BaseSetup/views/Products/ProductConfiguration/Benefits";

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

const CkycResponse = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/GenerateCkycDetails`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Documentuploadaws = async (binary) => {
  try {
    const result = await postRequest(
      `DMS/Documentupload/Documentupload?tagName=TravelRetail`,
      binary
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPaymentDetails = async (jsonValue, data) => {
  try {
    const policy = await postRequest(`Policy/SavePaymentdetails?ProposalNo=${data}`, jsonValue);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetMasterData = async () => {
  // debugger;
  try {
    const salutation = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `ClaimManagement/GetMasterData`
    );
    return salutation;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const buildForm = ({ action, params }) => {
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", action);
  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  // input.setAttribute("name", "hash");
  input.setAttribute("name", "encparam");
  input.setAttribute("value", params);
  form.appendChild(input);
  // const txnid = document.createElement("input");
  // txnid.setAttribute("name", "txnid");
  // txnid.setAttribute("value", transactionID);
  // form.appendChild(txnid);
  return form;
};

const post = (details) => {
  console.log("PaymentFormDataPost", details);
  const formdata = {
    action: details.action,
    params: details.params,
  };
  const form = buildForm(formdata);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};
const NivaPaymentGateway = async (json) => {
  try {
    const payment = await postRequest(`Policy/NivaPaymentGateway`, json);
    // const payment = await postRequest(
    //   `https://localhost:44351/api/Policy/NivaPaymentGateway`,
    //   json
    // );
    return payment;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const makePayment = (jsonData) => {
  NivaPaymentGateway(jsonData).then((X) => {
    console.log("responsedata", X);
    const details = {
      action: "https://paymbhid.nivabupa.com/Pages/getPaymentValues.aspx",
      params:
        // "oE8bgiAK48xPxc4xdoWxT8n2N3VaU3dxyvEz4ZDDO5RrbJ7hd/PFKSnW7dbfk8zDmE2uzJJNvV1GLBM1QyKQrTXT9DWnKb2YxDbUq8uC2lA3ntL9+xti0ywX7vuXwny+TPgHqPOOUr8JCH/bIXBcFtDOTbDOXpsIBkkBsePIMa6S3Vr2tvpVch232xR1+SvBJnoXgK5u+8KIyS5PoIkxbEs605ygE6XquGvjHtkJWvA5xjTnF0Dc2W4vWVMdJU7C0BZftaQ9BHyZ6RXGCES4LqAAwLsEWIaEX9H8Z9JKNifCAS0d61C0RGg2IWuj1AhXuDjSLb4inOerOSruemx0KKnqhIjS5YcQ6GMbG/GRHm2F0XmnP5Z3JsCYH4ie5HvSgQri5NEYZqOKZ2bu8IHt+VTb49vIvaYuff12E2d88oQ+N4VWDTbPNGR0l2u65ASNvcBVtidbO9/kc/vhDfyL8uBj9sfEIhtEiHoAJk27KeFO0vOBZQQQmAcs/WbQtqYU5uxbw5706sSIZrg6pf8MYQ==",
        // X.data.finalResult["s:Body"].encRespResponse.encRespResult,
        X.data.finalResult,
    };
    post(details);
  });
};

// const productId = 698;
// const fetchPaymentURL = async (productId, proposalNo, PremiumAmount) => {
//   try {
//     console.log("Inside fetch");
//     const paymentURL = await getRequest(
//       `Policy/GeneratePGUrl?ProductId=${productId}&ProposalNumber=${encodeURIComponent(
//         proposalNo
//       )}&Premiumamount=${PremiumAmount}`
//     );
//     // const paymentURL = await getRequest(encoded);
//     console.log("payment URL", paymentURL);
//     return paymentURL.data;
//   } catch (error) {
//     console.log("error", error);
//     return error;
//   }
// };

const sendProposalLink = async (proposalNo, emailId) => {
  const jsonValue = {
    communicationId: process.env.REACT_APP_Communicationid,
    keyType: "HDFC",
    key: proposalNo,
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

const getRelWithProposer = async (data) => {
  try {
    const relation = await getRequest(`Product/GetMasterData?isFilter=${data}`);
    console.log("relation list", relation);
    return relation.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProdPartnermasterData = async (prodId, masterType, jsonValue) => {
  try {
    const pcitylist = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${prodId}&MasterType=${masterType}`,

      jsonValue
    );

    console.log("pcitylist", pcitylist);

    return pcitylist.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// const proposercityList = async (prodId, masterType, id) => {
//   const jsonValue = {
//     DistrictID: id,
//   };
//   try {
//     const pcitylist = await postRequest(
//       `Product/GetProdPartnermasterData?ProductId=${prodId}&MasterType=${masterType}`,

//       jsonValue
//     );

//     console.log("pcitylist", pcitylist);

//     return pcitylist.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };
// const proposerpincodeList = async (prodId, masterType, id) => {
//   const jsonValue = {
//     CityID: id,
//   };
//   try {
//     const ppincodelist = await postRequest(
//       `Product/GetProdPartnermasterData?ProductId=${prodId}&MasterType=${masterType}`,

//       jsonValue
//     );

//     console.log("ppincodelist", ppincodelist);

//     return ppincodelist.data;
//   } catch (error) {
//     console.log(error);
//   }

//   return null;
// };
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
const getDisplayNameByProductId = async (productId) => {
  try {
    const plan = await getRequest(`Product/GetDisplayNameForPlan?productId=${productId}`);
    console.log("productid", productId);
    console.log("plan", plan);
    return plan.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getProductIdByProductcode = async (productCode) => {
  try {
    const productID = await getRequest(`Product/GetProductByCode?productCode=${productCode}`);
    console.log("productid", productID);
    console.log("plan", productID);
    return productID.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetPolicyTripTenureMaster = async (productId, Type) => {
  try {
    const TripDuration = await getRequest(
      `Policy/GetPolicyTripTenureMaster?ProductId=${productId}&Type=${Type}`
    );
    console.log("productid", productId);
    console.log("TripDuration", TripDuration);
    return TripDuration.data;
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

const GetTemplateDetails = async (TemplateId) => {
  try {
    const plan = await getRequest(`ExcelUpload/GetTemplateDetails?TemplateId=${TemplateId}`);
    console.log("group", plan);
    return plan.blob();
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetProposalByNumber = async (proposalNumber) => {
  try {
    const gDbProposalno = await getRequest(
      `Policy/GetProposalByNumber?proposalNumber=${proposalNumber}`
    );
    console.log("proposalNumber", gDbProposalno);
    return gDbProposalno;
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

const getMasterData1 = async () => {
  try {
    const Country = await getRequest(`ClaimManagement/GetMasterData`);
    console.log("country list", Country);
    return Country.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getCoverBenfitData = async (obj) => {
  try {
    const Benefits = await postRequest(`Product/GetBenefitDetails`, obj);
    console.log("benefit list", Benefits);
    return Benefits.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

async function UploadFiles(data) {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
}

const GetPolicyDetailsByNumber = async (policyNumber) => {
  try {
    const policyno = await getRequest(
      `Policy/GetPolicyDetailsByNumber?policyNumber=${policyNumber}`
    );
    console.log("policyno", policyno);
    return policyno;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetPartnerDetailsByMasterPolicyNumber = async (masterpolicyNumber) => {
  try {
    const policyno = await getRequest(
      `Partner/GetPartnerDetailsByMasterPolicyNumber?MasterPolicyNo=${masterpolicyNumber}`
    );
    console.log("policyno", policyno);
    return policyno;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const emailpolicy = async (policyno, emailId) => {
  const jsonValue = {
    communicationId: 67,
    keyType: "NivaPolicy",
    key: policyno,
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
const emailpolicy1 = async (policyno, emailId) => {
  const jsonValue = {
    communicationId: 68,
    keyType: "NivaPolicy",
    key: policyno,
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

const fetchPaymentURL = async (productId, proposalNo, PremiumAmount) => {
  try {
    console.log("Inside fetch");

    const paymentURL = await getRequest(
      `Policy/GeneratePGUrl?ProductId=${productId}&ProposalNumber=${encodeURIComponent(
        proposalNo
      )}&Premiumamount=${PremiumAmount}`
    );

    // const paymentURL = await getRequest(encoded);

    console.log("payment URL", paymentURL);

    return paymentURL.data;
  } catch (error) {
    console.log("error", error);

    return error;
  }
};

const DownloadPolicybypolicynumber = async (obj) => {
  try {
    const policydownload = await postRequest(`DMS/GetDocumentByType`, obj);
    console.log("download", policydownload);
    return policydownload.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const IsName = (str) => {
  const regex = /^([A-Za-z])+([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}$/;
  if (regex.test(str) || str === "") {
    return true;
  }
  return "Allows only alphabets and space";
};

const IsPincode = (str) => {
  const regex = /([0-9]){6}$/;
  if (regex.test(str) || str === "") {
    return true;
  }
  return "Please enter valid Pincode";
};

const ProposerLink = async (notificationReq) => {
  try {
    const mail = await postRequest(
      `Notifications/SendMultipleTemplateNotificationAsync`,
      notificationReq
    );
    console.log("mail data", mail.data);
    // if (mail.data.status === 1) {
    //   swal({ text: `Email send successfully ${mail.data.status}`, html: true, icon: "success" });
    // }
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const ExcelUploadApi = async (formData) => {
  try {
    // const Country = await LPostRequest(`Policy/CKYCNoUpdatefromExcel`, formData);
    // const Country = await postRequest(
    //   `https://localhost:44351/api/Policy/CKYCNoUpdatefromExcel`,
    //   formData
    // );
    const result = await postRequest(`Policy/CKYCNoUpdatefromExcel`, formData);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Decryptresponse = async (Ciphertext) => {
  try {
    const DecrpResp = await postRequest(`Policy/Decrypt`, Ciphertext);
    console.log("What is the Response", DecrpResp);
    return DecrpResp;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetUploadStatus = async (obj) => {
  try {
    const res = await getRequest(`ExcelUpload/GetUploadStatus?DocumentUploadId=${obj.id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetUploadStatusbyDateRange = async (obj) => {
  try {
    const res = await getRequest(
      `ExcelUpload/GetUploadStatus?TemplateId=154&FromDate=${obj.FromDate}&ToDate=${obj.ToDate}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetBulkUploadTotalPremium = async (obj, data) => {
  try {
    const TotalPremium = await postRequest(`Policy/ExecuteProcedure?procedureName=${obj}`, data);
    console.log("What is the Response", TotalPremium);
    return TotalPremium;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// const GetPartnerDetailsByMasterPolicyNumber = async (MasterPolicyNo) => {
//   try {
//     const pcitylist = await postRequest(
//       `Product/GetPartnerDetailsByMasterPolicyNumber?MasterPolicyNo=${MasterPolicyNo}`
//     );

//     console.log("pcitylist", pcitylist);

//     return pcitylist.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

// const NivaSendSMS = async (jsonValue) => {
//   debugger; // eslint-disable-line
//   try {
//     const Sms = await postRequest(`Notifications/NivaSendSMS`, jsonValue);
//     return Sms;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

export {
  calculateProposal,
  calculatePremium,
  GetPaymentDetails,
  getDistrict,
  getState,
  GetMasterData,
  getProductList,
  getPlanbyProductId,
  getPlanByGroupId,
  getMasterData,
  getMasterData1,
  // insuredRelationShip,
  // CallMail,
  getCoverBenfitData,
  // proposerstateList,
  // proposerdistrictList,
  // proposercityList,
  // proposerpincodeList,
  GetProposalByNumber,
  sendProposalLink,
  CkycResponse,
  // NivaPaymentGateway,
  makePayment,
  UploadFiles,
  GetPolicyDetailsByNumber,
  GetProdPartnermasterData,
  emailpolicy,
  emailpolicy1,
  Documentuploadaws,
  GetPolicyTripTenureMaster,
  fetchPaymentURL,
  DownloadPolicybypolicynumber,
  ProposerLink,
  IsName,
  Decryptresponse,
  // NivaSendSMS,
  IsPincode,
  GetTemplateDetails,
  getDisplayNameByProductId,
  ExcelUploadApi,
  GetUploadStatus,
  GetUploadStatusbyDateRange,
  GetPartnerDetailsByMasterPolicyNumber,
  getProductIdByProductcode,
  getRelWithProposer,
  GetBulkUploadTotalPremium,
};
