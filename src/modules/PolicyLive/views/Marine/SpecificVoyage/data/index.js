import { postRequest, getRequest } from "core/clients/axiosclient";
import swal from "sweetalert";

const handleIssuePolicy = async (jsonValue) => {
  try {
    return await postRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=BharatGrihaRakshaIssuePolicy`,
      `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=BGRUSGIIssuePolicy`,
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
async function ViewFiles(dwnfile) {
  await getRequest(`DMS/GetDocumentById?id=${dwnfile}`).then((result) => {
    if (result.status === 200) {
      generateFile(result.data.data, dwnfile);
    }
    console.log("ViewFileData", result.data.data, "Name", dwnfile);
  });
}

async function UploadFiles(data) {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
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
const BGRCkycRegMail = async (notificationReq) => {
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
  productinfo.setAttribute("value", "Marine Specific Voyage");
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

const PortData = async (productId, MasterType, obj) => {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&MasterType=${MasterType}`,
      obj
    );
    return res;
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

const callPremiumMethod = async (jsonvalue) => {
  try {
    const premium = await postRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `Product/GenericApi?ProductCode=MarineSpecificVoyage&ApiName=MarineSPVAPI`,
      // `Product/GenericApi?ProductCode=MarineSpecificVoyage&ApiName=Marine_SPV`,
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
const updateProposal = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/UpdateProposalDetails`, jsonValue);
    console.log("calculateProposal....");
    return proposal;
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
    console.log("calculateProposal....", profile);
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
//     console.log("calculateProposal....", profile);
//     return profile;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };
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
const getPincode = async () => {
  try {
    const pincode = await getRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
      `ClaimManagement/GetMasterData?sMasterlist=Pincode`
    );
    return pincode;
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
  handleIssuePolicy,
  callPremiumMethod,
  getSalutation,
  getPincode,
  getDistrict,
  getState,
  calculateProposal,
  updateProposal,
  fetchProfile,
  makePayment,
  fetchPaymentURL,
  SavePaymentdetails,
  sendPaymentMail,
  getCKYCDetails,
  GetCkycUpdateStatus,
  BGRCkycRegMail,
  getMasterDatalist,
  fetchMMVData,
  PortData,
  ViewFiles,
  UploadFiles,
  GetProposalByNumber,
  SendSMS,
  fetchuser,
  fetchusername,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
  makeBilldeskPayment,
};
