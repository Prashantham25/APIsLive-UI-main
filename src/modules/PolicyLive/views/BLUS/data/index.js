import { getRequest, postRequest } from "core/clients/axiosclient";
import { useState, useEffect } from "react";
import swal from "sweetalert";

const getSalutation = async () => {
  //
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
  productinfo.setAttribute("value", "Bharat Laghu Udhyam Surakha–USLU");
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
    // const PGData = await postRequest(`PaymentExtension/Payment?ICProductName=USGIPGPayU`, bodyData);
    const PGData = await postRequest(`PaymentExtension/Payment?ICProductName=USGIPGPayU`, bodyData);
    console.log("PAYMENTGATEWAYData", PGData);
    return PGData;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const makePayment = (bodyData) => {
  // alert("Hello World");

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
    };
    console.log("payment details", data);
    console.log("params", data.data.checksumHash);
    console.log("payment details", details);
    post(details);
  });
};

const fetchPaymentURL = async (productId, proposalNumber, PremiumAmount) => {
  try {
    console.log("Inside fetch");
    // proposalNumber = encodeURIComponent(proposalNumber);
    const paymentURL = await getRequest(
      `Policy/GeneratePGUrl?ProductId=${productId}&ProposalNumber=${encodeURIComponent(
        proposalNumber
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
// const getPincode = async () => {
//   try {
//     const pincode = await getRequest(
//       //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
//       `ClaimManagement/GetMasterData?sMasterlist=Pincode`
//     );
//     return pincode;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };

const getGender = async () => {
  //
  try {
    const gender = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `ClaimManagement/GetMasterData?sMasterlist=Gender`
    );
    return gender;
  } catch (error) {
    console.log("error", error);
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

const getZoneByPincode = async (pincode) => {
  try {
    const pincodeData = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `ClaimManagement/GetZoneByPincode?Pincode=${pincode}`
    );
    return pincodeData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const callPremiumMethod = async (jsonvalue) => {
  try {
    const premium = await postRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      // `Product/GenericApi?ProductCode=BGRUSGI01&ApiName=BGRUSGIAPIPremium`,
      `Product/GenericApi?ProductCode=BLUS_BSUS&ApiName=BLUSPremium`,
      jsonvalue
    );
    return premium.data;
  } catch (error) {
    console.log("error", error);
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
const generateFile = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  // setImg(src);
  const link = document.createElement("a");
  link.href = src;

  link.download = fileName;
  console.log("Filename", link.download);
  link.click();
};
async function UploadFiles(data) {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
}
async function ViewFiles(dwnfile) {
  await getRequest(`DMS/GetDocumentById?id=${dwnfile}`).then((result) => {
    if (result.status === 200) {
      generateFile(result.data.data, dwnfile);
    }
    console.log("ViewFileData", result.data.data, "Name", dwnfile);
  });
}
const handleIssuePolicy = async (jsonValue) => {
  try {
    return await postRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=BharatGrihaRakshaIssuePolicy`,
      `Product/GenericApi?ProductCode=BLUS_BSUS&ApiName=BLUSBSUSIssuePolicy`,
      jsonValue
    );
    // console.log("OTPData");
    // return PolicyData;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const SavePaymentdetails = async (jsonValue) => {
  try {
    // const policy = await postRequest(`Policy/SavePaymentdetails?ProposalNo=${data}`, jsonValue);
    const policy = await postRequest(`Policy/SavePolicyPaymentDetails`, jsonValue);
    return policy;
  } catch (error) {
    console.log(error);
  }
  return null;
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
      // action: https://uat.billdesk.com/pgidsk/PGIMerchantPayment,
      action: process.env.REACT_APP_BillDeskUrl,
      params: data.data.checksumHash,
      // params:
      //   "UATUSGIV1|C03/08/202333491|NA|1000|NA|NA|NA|INR|NA|R|UATUSGIV1|NA|NA|F|MOTORTRV_CAR|NA|NA|NA|NA|NA|NA|HTTPS://LOCALHOST:44351/API/POLICY/PAYMENTREDIRECTION?PAYMENTREFNO=2970782/0782/29744|D2184D1DFACFC85FF7016E751671D4E734A6C57C1DCBE1CFF814B8CCE13D9650",
    };
    console.log(data);
    postDetails(details);
  });
};

function GetBLUSBSUSMasters() {
  const [master, setMaster] = useState({
    AgeOfBuildingBLUSBSUS: [],
    RiskTerrainBLUSBSUS: [],
    HouseKeepingBLUSBSUS: [],
    StockExposureBLUSBSUS: [],
    DstPublicFireBrigade: [],
    ClientBusinessExperiance: [],
    TypeOfConstructionBLUSBSUS: [],
    ClaimsRationBLUSBSUS: [],
    FireProtection: [],
    PastFlooding: [],
    BasementExposure: [],
    ClaimExperience: [],
    OccupancyBLUSBSUS: [],
  });

  const productId = 910;

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "AgeOfBuildingBLUSBSUS", {}),
      fetchMMVData(productId, "RiskTerrainBLUSBSUS", {}),
      fetchMMVData(productId, "HouseKeepingBLUSBSUS", {}),
      fetchMMVData(productId, "StockExposureBLUSBSUS", {}),
      fetchMMVData(productId, "DstPublicFireBrigade", {}),
      fetchMMVData(productId, "ClientBusinessExperiance", {}),
      fetchMMVData(productId, "TypeOfConstructionBLUSBSUS", {}),
      fetchMMVData(productId, "ClaimsRationBLUSBSUS", {}),
      fetchMMVData(productId, "FireProtection", {}),
      fetchMMVData(productId, "PastFlooding", {}),
      fetchMMVData(productId, "BasementExposure", {}),
      fetchMMVData(productId, "ClaimExperience", {}),
      fetchMMVData(productId, "OccupancyBLUSBSUS", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        AgeOfBuildingBLUSBSUS: results[0],
        RiskTerrainBLUSBSUS: results[1],
        HouseKeepingBLUSBSUS: results[2],
        StockExposureBLUSBSUS: results[3],
        DstPublicFireBrigade: results[4],
        ClientBusinessExperiance: results[5],
        TypeOfConstructionBLUSBSUS: results[6],
        ClaimsRationBLUSBSUS: results[7],
        FireProtection: results[8],
        PastFlooding: results[9],
        BasementExposure: results[10],
        ClaimExperience: results[11],
        OccupancyBLUSBSUS: results[12],
      });
      // console.log("masters", results[0], results[1], results[2], results[3]);
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    blusMaster: {
      Masters: master,
    },
  };
}

const getCKYCDetails = async (productId, jsonValue) => {
  try {
    console.log("Calling function getCKYCDetails");
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

const BLUSCkycRegMail = async (notificationReq) => {
  try {
    const mail = await postRequest(
      `Notifications/SendMultipleTemplateNotificationAsync`,
      notificationReq
    );
    console.log("mail data", mail.data);
    if (mail.data.status === 1) {
      swal({ text: `Email send successfully ${mail.data.status}`, html: true, icon: "success" });
    }
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

const GetCkycUpdateStatus = async (jsonValue) => {
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

const GetProposalByNumber = async (proposalNumber) => {
  try {
    const proposalquote = await getRequest(
      `Policy/GetProposalByNumber?proposalNumber=${proposalNumber}`
    );
    return proposalquote;
  } catch (error) {
    console.log("error", error);
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

export {
  getSalutation,
  getGender,
  makePayment,
  fetchPaymentURL,
  getState,
  getDistrict,
  callPremiumMethod,
  UploadFiles,
  ViewFiles,
  calculateProposal,
  handleIssuePolicy,
  callSaveQuoteMethod,
  SavePaymentdetails,
  GetBLUSBSUSMasters,
  getCKYCDetails,
  BLUSCkycRegMail,
  getZoneByPincode,
  SendSMS,
  GetCkycUpdateStatus,
  GetProposalByNumber,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
  fetchusername,
  makeBilldeskPayment,
};
