import { postRequest, getRequest } from "../../../../../../../../core/clients/axiosclient";

const GenericApi = async (ProductCode, ApiName, obj) => {
  try {
    const masterData = await postRequest(
      `Product/GenericApi?ProductCode=${ProductCode}&ApiName=${ApiName}`,
      obj
    );
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GenericAp1i = async (ProductCode, ApiName, obj) => {
  try {
    const masterData = await postRequest(
      `Product/GenericApi?ProductCode=${ProductCode}&ApiName=${ApiName}`,
      obj
    );
    return masterData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const callSaveQuoteMethod = async (jsonValue) => {
  try {
    const Quotation = await postRequest(`Quotation/SaveQuotation`, jsonValue);
    return Quotation;
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
const getCkycDetails = async (productId, jsonValue) => {
  try {
    console.log("Calling function getCkycDetails");
    const ckycDetails = await postRequest(
      `Policy/CKYCVerification?productId=${productId}`,
      jsonValue
    );
    console.log("ckycDetails", ckycDetails);
    return ckycDetails.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const getCkycUpdateStatus = async (jsonValue) => {
  try {
    console.log("Calling function ckycStatusUpdate");
    const ckycUpdatedStatus = await postRequest(`Policy/CKYCUpdateStatus`, jsonValue);
    console.log("ckycDetails", ckycUpdatedStatus);
    return ckycUpdatedStatus.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const CkycRegMail = async (notificationReq) => {
  try {
    const mail = await postRequest(
      `Notifications/SendMultipleTemplateNotificationAsync`,
      notificationReq
    );
    console.log("mail data", mail.data);
    if (mail.data.status === 1) {
      // swal({ text: `Email send successfully ${mail.data.status}`, html: true, icon: "success" });
    }
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
// const DocumenUpload = async (data) => {
//   try {
//     const UploadedData = await postRequest(`DMS/DocumenUpload`, data);

//     return UploadedData;
//   } catch (error) {
//     return error;
//   }
// };
const DocumenUpload = async (data, fileName) => {
  try {
    const UploadedData = await postRequest(
      `DMS/Documentupload/Documentupload?tagName=WCUSGI&tagValue=${fileName}`,
      data
    );
    return UploadedData;
  } catch (error) {
    return error;
  }
};
const DeleteDocument = async (fileName) => {
  try {
    const DeleteFileData = await getRequest(`DMS/DeleteDocument?id=${fileName}`);
    return DeleteFileData;
  } catch (error) {
    return error;
  }
};
const fetchPaymentURL = async (productId, proposalNumber, PremiumAmount) => {
  try {
    const paymentURL = await getRequest(
      `Policy/GeneratePGUrl?ProductId=${productId}&ProposalNumber=${encodeURIComponent(
        proposalNumber
      )}&Premiumamount=${PremiumAmount}`
    );
    return paymentURL.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
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
const SavePaymentdetails = async (jsonValue) => {
  try {
    const policy = await postRequest(`Policy/SavePolicyPaymentDetails`, jsonValue);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const buildForm = ({
  action,
  params,
  fn,
  pamount,
  transactionID,
  PEmail,
  MobileNo,
  successurl,
  failureurl,
  prodName,
}) => {
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", action);

  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "hash");
  input.setAttribute("value", params);
  form.appendChild(input);
  const key = document.createElement("input");
  key.setAttribute("name", "key");
  key.setAttribute("value", process.env.REACT_APP_PayuKey);
  form.appendChild(key);
  const txnid = document.createElement("input");
  txnid.setAttribute("name", "txnid");
  txnid.setAttribute("value", transactionID);
  form.appendChild(txnid);
  const amount = document.createElement("input");
  amount.setAttribute("name", "amount");
  amount.setAttribute("value", pamount);
  form.appendChild(amount);
  const productinfo = document.createElement("input");
  productinfo.setAttribute("name", "productinfo");
  productinfo.setAttribute("value", prodName);
  form.appendChild(productinfo);
  const firstname = document.createElement("input");
  firstname.setAttribute("name", "firstname");
  firstname.setAttribute("value", fn);
  form.appendChild(firstname);
  const email = document.createElement("input");
  email.setAttribute("name", "email");
  email.setAttribute("value", PEmail);
  form.appendChild(email);
  const phone = document.createElement("input");
  phone.setAttribute("name", "phone");
  phone.setAttribute("value", MobileNo);
  form.appendChild(phone);
  const surl = document.createElement("input");
  surl.setAttribute("name", "surl");
  surl.setAttribute("value", successurl);
  form.appendChild(surl);
  const furl = document.createElement("input");
  furl.setAttribute("name", "furl");
  furl.setAttribute("value", failureurl);
  form.appendChild(furl);
  const salt = document.createElement("input");
  salt.setAttribute("name", "salt");
  salt.setAttribute("value", process.env.REACT_APP_PayuSalt);
  form.appendChild(salt);
  console.log("form", form);
  return form;
};

const post = (details) => {
  const form = buildForm(details);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};

const getPaymentData = async (bodyData) => {
  try {
    const PGData = await postRequest(`PaymentExtension/Payment?ICProductName=USGIPGPayU`, bodyData);
    return PGData;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const makePayment = (bodyData) => {
  getPaymentData(bodyData).then((data) => {
    const details = {
      // action: "https://test.payu.in/_payment",
      action: process.env.REACT_APP_PayuUrl,
      params: data.data.checksumHash,
      fn: data.data.firstname,
      pamount: data.data.amount,
      transactionID: data.data.transactionID,
      PEmail: bodyData.email,
      MobileNo: bodyData.phone,
      successurl: bodyData.surl,
      failureurl: bodyData.furl,
      prodName: bodyData.productinfo,
    };
    post(details);
  });
};
const sendPaymentMail = async (proposalNumber, emailId) => {
  const jsonValue = {
    communicationId: 127,
    keyType: "BGRProposal",
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
    return mail.data;
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
    if (!pcitylist?.data?.status) {
      return pcitylist?.data;
    }
    if (pcitylist?.data?.status) {
      return [];
    }
    // return pcitylist.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const NSTPPincodeData = async (prodId, masterType, obj) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${prodId}&MasterType=${masterType}`,
      obj
    );
    if (!res?.data?.status) {
      return res;
    }
    if (res?.data?.status) {
      return [];
    }
    // return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getPincodeDetails = async (pincodeValue) => {
  const ProductId = 782;
  const getPincodeDistrictStateData = async (type, id) => {
    const urlString = `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${type}`;
    let payload;
    switch (type) {
      case "State":
        payload = { State_Code: id };
        break;
      case "District":
        payload = { District_ID_PK: id };
        break;
      case "City":
        payload = { City_ID: id };
        break;
      case "Pincode":
        payload = { Pincode: id };
        break;
      default:
        break;
    }
    const dataValue = await (await postRequest(urlString, payload)).data;
    return dataValue;
  };
  // const pincodeData = await getPincodeDistrictStateData("Pincode", pincodeValue);
  const city = await getPincodeDistrictStateData("City", pincodeValue);
  const district = await getPincodeDistrictStateData("District", city[0].DistrictID);
  const state = await getPincodeDistrictStateData("State", city[0].State_CD);
  return { city, district, state };
  //
};

const generateFile = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;

  link.download = fileName;
  link.click();
};
const downloadQuote = async (data) => {
  await postRequest(`Policy/GetTemplatePayload`, data).then((result) => {
    console.log("result", result);
    if (result.status === 200) {
      generateFile(result.data, data.key);
    }
  });
};
const callUpdateQuoteMethod = async (jsonValue) => {
  try {
    const Quotation = await postRequest(`Quotation/QuotationUpdate`, jsonValue);
    return Quotation;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const shareQuote = async (QuoteNo, emailId) => {
  const jsonValue = {
    communicationId: 197,
    keyType: "BGRQuote",
    key: QuoteNo,
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
    console.log("mail data", mail.data);
    if (mail.data.status === 1) {
      // swal({
      //   text: `Email send successfully ${mail.data.status}`,
      //   html: true,
      //   icon: "success",
      // });
    }
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const proposerEamil = async (QuoteNo, emailId) => {
  const jsonValue = {
    communicationId: 198,
    keyType: "BGRProposal",
    key: QuoteNo,
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
    console.log("mail data", mail.data);
    if (mail.data.status === 1) {
      // swal({
      //   text: `Email send successfully ${mail.data.status}`,
      //   html: true,
      //   icon: "success",
      // });
    }
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SKproposerEamil = async (QuoteNo, emailId) => {
  const jsonValue = {
    communicationId: 230,
    keyType: "BGRProposal",
    key: QuoteNo,
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
    console.log("mail data", mail.data);
    if (mail.data.status === 1) {
      // swal({
      //   text: `Email send successfully ${mail.data.status}`,
      //   html: true,
      //   icon: "success",
      // });
    }
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const policyEmail = async (policyNo, emailId) => {
  const jsonValue = {
    communicationId: 199,
    keyType: "BGRPolicy",
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
    console.log(mail.data);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const policyEmailShopkeeper = async (policyNo, emailId) => {
  const jsonValue = {
    communicationId: 231,
    keyType: "BGRPolicy",
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
    console.log(mail.data);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const policyEmailCyber = async (policyNo, emailId) => {
  const jsonValue = {
    communicationId: 235,
    keyType: "BGRPolicy",
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
    console.log(mail.data);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SendSMS = async (productCode, MobileNo, Message) => {
  try {
    const sms = await getRequest(
      `WCFExtension/SendSms?ICProductName=${productCode}&MobileNo=${MobileNo}&Message=${Message}`
    );
    return sms.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const proposalConsentMail = async (email, QuoteNum) => {
  const jsonValue = {
    communicationId: 207,
    keyType: "BGRQuote",
    key: QuoteNum,
    stakeHolderDetails: [
      {
        communicationType: "Email",
        stakeholderCode: "CUS",
        communicationValue: email,
      },
    ],
  };
  await postRequest(`Notifications/EventCommunicationExecution`, jsonValue).then((resp) => {
    console.log("resp", resp);
  });
};
const DiscountVal = (number) => {
  const regex = /^[0-9]*$/;
  if (regex.test(number) && number < 86) return true;
  return "maximum discount applicable is 85%";
};
const getQuoteSummary = async (quoteRefNo) => {
  try {
    const summaryquote = await getRequest(`Quotation/GetQuoteByNumber?QuoteNo=${quoteRefNo}`);
    return summaryquote;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const GetACDBalanceAmt = async (obj) => {
  try {
    const res = await postRequest(
      `PaymentExtension/GetACDBalanceAmt?ICProductName=ACDAccount`,
      obj
    );
    return res;
  } catch (error) {
    console.log("error", error);
  }

  return null;
};

const GetACDPaymentStatus = async (obj1) => {
  try {
    const res = await postRequest(
      `PaymentExtension/GetACDPaymentStatus?ICProductName=ACDAccount`,
      obj1
    );
    return res;
  } catch (error) {
    console.log("error", error);
  }

  return null;
};

const buildBillDeskForm = ({ action, params }) => {
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", action);
  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "msg");
  input.setAttribute("value", params);
  form.appendChild(input);
  return form;
};

const postDetails = (details) => {
  const form = buildBillDeskForm(details);
  document.body.appendChild(form);
  form.submit();
};

const getBillDeskData = async (bodyData1) => {
  try {
    const PGBillDeskData = await postRequest(
      `PaymentExtension/Payment?ICProductName=BillDesk`,
      bodyData1
    );
    console.log("PAYMENTGATEWAYData", PGBillDeskData);
    return PGBillDeskData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const makeBilldeskPayment = (bodyData1) => {
  getBillDeskData(bodyData1).then((data) => {
    const details = {
      action: process.env.REACT_APP_BillDeskUrl,
      params: data.data.checksumHash,
    };
    console.log(data);
    postDetails(details);
  });
};

export {
  GenericApi,
  GenericAp1i,
  callSaveQuoteMethod,
  calculateProposal,
  downloadQuote,
  shareQuote,
  getCkycDetails,
  getCkycUpdateStatus,
  DocumenUpload,
  fetchPaymentURL,
  SavePaymentdetails,
  makePayment,
  sendPaymentMail,
  DeleteDocument,
  GetProdPartnermasterData,
  callUpdateQuoteMethod,
  CkycRegMail,
  generateFile,
  proposerEamil,
  getPincodeDetails,
  DiscountVal,
  policyEmail,
  SendSMS,
  proposalConsentMail,
  getQuoteSummary,
  NSTPPincodeData,
  SKproposerEamil,
  policyEmailShopkeeper,
  policyEmailCyber,
  GetACDBalanceAmt,
  fetchusername,
  GetACDPaymentStatus,
  makeBilldeskPayment,
};
