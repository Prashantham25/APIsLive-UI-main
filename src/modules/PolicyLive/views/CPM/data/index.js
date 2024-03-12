import { useEffect, useState } from "react";
import { getRequest, postRequest } from "core/clients/axiosclient";
import swal from "sweetalert";

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
async function GetVerticalName(productId, masterType, jsonValue) {
  const bodyJSON = jsonValue;

  try {
    const mmvData = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,

      bodyJSON
    );

    return mmvData.data;
  } catch (error) {
    console.log("error", error);

    return error;
  }
}
function GetCPMMasters() {
  const [master, setMaster] = useState({
    DocumentsNameCPM: [],
    AnnualMaintenanceContractCPM: [],
    HypothecationCPM: [],
    LocationoftheEquipmentCPM: [],
    AgeofEquipmentCPM: [],
    ClaimExperirenceCPM: [],
    BusinessTypeCPM: [],
    RepairFacilitiesAvailableinIndiaCPM: [],
    EquipmentDescriptionCPM: [],
    EscalationClause: [],
  });

  const productId = 1039;
  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "DocumentsNameCPM", {}),
      fetchMMVData(productId, "AnnualMaintenanceContract(Amc)CPM", {}),
      fetchMMVData(productId, "HypothecationCPM", {}),
      fetchMMVData(productId, "LocationoftheEquipmentCPM", {}),
      fetchMMVData(productId, "AgeofEquipmentCPM", {}),
      fetchMMVData(productId, "ClaimExperirenceCPM", {}),
      fetchMMVData(productId, "BusinessTypeCPM", {}),
      fetchMMVData(productId, "RepairFacilitiesAvailableinIndiaCPM", {}),
      fetchMMVData(productId, "EquipmentDescriptionCPM", {}),
      fetchMMVData(productId, "EscalationClause", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        DocumentsNameCPM: results[0],
        AnnualMaintenanceContractCPM: results[1],
        HypothecationCPM: results[2],
        LocationoftheEquipmentCPM: results[3],
        AgeofEquipmentCPM: results[4],
        ClaimExperirenceCPM: results[5],
        BusinessTypeCPM: results[6],
        RepairFacilitiesAvailableinIndiaCPM: results[7],
        EquipmentDescriptionCPM: results[8],
        EscalationClause: results[9],
      });
    });
  };
  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    bgrMaster: {
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

const CPMCkycRegMail = async (notificationReq) => {
  try {
    const mail = await postRequest(
      `Notifications/SendMultipleTemplateNotificationAsync`,
      notificationReq
    );
    console.log("mail data", mail.data);
    if (mail.data.status === 1) {
      swal({ text: `Email send successfully`, html: true, icon: "success" });
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

// const getDistrict = async (jsonData) => {
//   try {
//     const district = await getRequest(
//       //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
//       `ClaimManagement/GetMasDistrictByPinCode?pincode=${jsonData}`
//     );
//     return district.data;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };

// const getState = async (jsonData) => {
//   try {
//     const state = await getRequest(
//       //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=CalCulatePremiumBharatGrihaRaksha1`,
//       `ClaimManagement/GetMasState?districtId=${jsonData}`
//     );
//     return state.data;
//   } catch (error) {
//     console.log("error", error);
//   }
//   return null;
// };

const callPremiumMethod = async (jsonvalue) => {
  try {
    const premium = await postRequest(
      `Product/GenericApi?ProductCode=CPM_V1&ApiName=USGICPMCalculatorAPI`,
      jsonvalue
    );
    return premium.data;
  } catch (error) {
    console.log("error", error);
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

const callUpdateQuoteMethod = async (jsonValue) => {
  try {
    const Quotation = await postRequest(`Quotation/QuotationUpdate`, jsonValue);
    return Quotation;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const callSaveProposalMethod = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/SaveCreateProposal`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
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
  key.setAttribute("value", "7Y4RPX");
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
  productinfo.setAttribute("value", "Contractor's Plant & Machinery Insurance");
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
  salt.setAttribute("value", "hl8aISlY");
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

const handleIssuePolicy = async (jsonValue) => {
  try {
    return await postRequest(
      //   `Product/GenericApi?ProductCode=BharatGrihaRaksha1&ApiName=BharatGrihaRakshaIssuePolicy`,
      `Product/GenericApi?ProductCode=BGRUSGI02&ApiName=BGRUSGIIssuePolicy`,
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

const CPMQuoteMail = async (QuoteNo, emailId) => {
  const jsonValue = {
    communicationId: 205,
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
      swal({
        text: `Email send successfully`,
        html: true,
        icon: "success",
      });
    }

    // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const CPMProposalMail = async (proposalNumber, emailId) => {
  const jsonValue = {
    communicationId: 200,
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
    console.log("mail data", mail.data);
    if (mail.data.status === 1) {
      swal({
        text: `Email send successfully`,
        html: true,
        icon: "success",
      });
    }

    // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
    return mail.data;
  } catch (error) {
    console.log(error);
  }
  return null;
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

const fetchusername = async (UserId) => {
  try {
    const profile = await getRequest(`UserProfile/SearchUserById?Id=${UserId}`);
    console.log("profileinformation....", profile);
    return profile;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GetCPMMasters,
  getCKYCDetails,
  GetCkycUpdateStatus,
  CPMCkycRegMail,
  SendSMS,
  getSalutation,
  getGender,
  // getDistrict,
  // getState,
  callPremiumMethod,
  callUpdateQuoteMethod,
  callSaveQuoteMethod,
  callSaveProposalMethod,
  makePayment,
  fetchPaymentURL,
  getPaymentData,
  post,
  sendPaymentMail,
  handleIssuePolicy,
  buildForm,
  SavePaymentdetails,
  CPMQuoteMail,
  CPMProposalMail,
  getQuoteSummary,
  fetchusername,
  GetACDBalanceAmt,
  GetACDPaymentStatus,
  GetVerticalName,
};
