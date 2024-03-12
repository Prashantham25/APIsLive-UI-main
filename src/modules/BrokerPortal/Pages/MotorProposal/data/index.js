import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";
import { setQuoteProposalOutput, useDataController } from "../../../context";

const getPartnerId = {
  Magma: 58,
  TataAIG: 59,
  Rsa: 60,
  Liberty: 61,
  GoDigit: 62,
  HDFC_PvtCar: 73,
  Chola: 76,
  ICICI: 77,
  Reliance: 99,
  Kotak: 128,
  BajajAlliance: 86,
  IffcoTokio: 225,
  HDFC: 73,
  USGI: 256,
};

const GetProposalDetailsByProposalNumber = async (proposalNumber) => {
  try {
    const proposalData = await getRequest(
      `Policy/GetProposalByNumber?proposalNumber=${proposalNumber}`
    );
    return proposalData;
  } catch (error) {
    console.error("error", error);
  }
  return null;
};

const fetchProposalDetails = async (quoteNumber, partnerId) => {
  try {
    const proposalData = await getRequest(
      `Policy/GetQuoteForProposal?QuoteNo=${quoteNumber}&PartnerId=${partnerId}`
    );
    // console.log("proposalDetails", proposalData.data);
    return proposalData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GetProposalDetails(dispatch, quoteNumber, partnerName) {
  // console.log("fast lane input", jsonValue);
  Promise.all([fetchProposalDetails(quoteNumber, getPartnerId[partnerName])]).then((results) => {
    setQuoteProposalOutput(dispatch, results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}

const fetchPDFData = async (jsonValue) => {
  try {
    const pdfData = await postRequest(`Policy/GetPolicyPDF`, jsonValue);
    // console.log("pdfData", pdfData.data);
    return pdfData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GetPDF(setPdf, jsonValue) {
  // console.log("fast lane input", jsonValue);
  Promise.all([fetchPDFData(jsonValue)]).then((results) => {
    // console.log("PDF Output", results[0].finalResult);
    const pdf = results[0].finalResult.OutputResult;
    setPdf(pdf);
  });
  // return {
  //   QuoteData: master,
  // };
}

const fetchSaveDetails = async (partnerProductId, jsonValue) => {
  try {
    const saveData = await postRequest(
      `Policy/SaveProposalDetails?PartnerProductId=${partnerProductId}`,
      jsonValue
    );
    // console.log("save details", saveData.data);
    return saveData.data;
  } catch (error) {
    return error;
  }
};

async function SaveProposal(partnerProductId, jsonValue) {
  return fetchSaveDetails(partnerProductId, jsonValue);
}

const fetchPaymentURL = async (productId, proposalNumber, baseProductId, parterId) => {
  try {
    const paymentURL = await getRequest(
      baseProductId && parterId
        ? `Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}&BProdId=${baseProductId}&PartnerId=${parterId}`
        : `Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`
    );
    // console.log("payment URL", paymentURL.data);
    return paymentURL.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

function GetPaymentURL(productId, proposalNumber, setPaymentData, baseProductId, parterId) {
  // console.log("payment url input", productId, proposalNumber, baseProductId, parterId);
  Promise.all([fetchPaymentURL(productId, proposalNumber, baseProductId, parterId)]).then(
    (results) => {
      const data = results[0].finalResult;
      setPaymentData(data);
    }
  );
  // return {
  //   QuoteData: master,
  // };
}

const fetchProdPartnerMaster = async (productId, partnerId, masterType, jsonValue) => {
  try {
    const saveData = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&PartnerId=${partnerId}&MasterType=${masterType}`,
      jsonValue
    );
    // console.log("proposal masters", productId, partnerId, masterType, jsonValue, saveData.data);
    return saveData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GetProductPartnerMaster(inputData) {
  const [master, setMaster] = useState({
    Gender: [],
    NomineeRelation: [],
    Country: [],
    PincodeDetails: [],
    VehicleDetails: [],
    RTODetails: [],
    Salutation: [],
    MaritalStatus: [],
    Occupation: [],
    PolicyType: [],
    DocumentType: [],
    Hypothecation: [],
  });
  const { productId, partnerId, masterType, jsonValue } = inputData;

  const [controller] = useDataController();
  const { quoteProposalOutput } = controller;
  const { VehicleDetails } = quoteProposalOutput.finalResult;
  let fieldName = null;
  // if (masterType === "Gender") fieldName = "Gender";
  // if (masterType === "NomineeRelation") fieldName = "NomineeRelation";
  // if (masterType === "Country") fieldName = "Country";
  if (masterType === "DetailsPincode") fieldName = "PincodeDetails";
  if (masterType === "VariantDetails") fieldName = "VehicleDetails";
  if (masterType === "RtoDetails") fieldName = "RTODetails";

  // console.log("get product master input", inputData);

  const getDetails = () => {
    Promise.all([fetchProdPartnerMaster(productId, partnerId, masterType, jsonValue)]).then(
      (results) => {
        const data = results[0];
        setMaster({ ...master, [fieldName]: data });
      }
    );
  };
  const getAllMaster = async () => {
    Promise.all([
      fetchProdPartnerMaster(productId, partnerId, "Gender", { Gender: "" }),
      fetchProdPartnerMaster(productId, partnerId, "NomineeRelation", { NomineeRelation: "" }),
      fetchProdPartnerMaster(productId, partnerId, "Nationality", { Nationality: "" }),
      fetchProdPartnerMaster(productId, partnerId, "VariantDetails", {
        Variant_Id: VehicleDetails.VariantId,
      }),
      fetchProdPartnerMaster(productId, partnerId, "RtoDetails", { RTO_ID: VehicleDetails.RTOId }),
      fetchProdPartnerMaster(productId, partnerId, "Salutation", { Salutation: "" }),
      fetchProdPartnerMaster(productId, partnerId, "MaritalStatus", { MaritalStatus: "" }),
      fetchProdPartnerMaster(productId, partnerId, "Occupation", { Occupation: "" }),
      fetchProdPartnerMaster(productId, 0, "PolicyType", {}),
      fetchProdPartnerMaster(productId, 0, "DocumentType", { DocumentType: "" }),
      fetchProdPartnerMaster(productId, partnerId, "Hypothecation", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        Gender: results[0],
        NomineeRelation: results[1],
        Country: results[2],
        VariantDetailsOutput: results[3],
        RTODetailsOutput: results[4],
        Salutation: results[5],
        MaritalStatus: results[6],
        Occupation: results[7],
        PolicyType: results[8],
        DocumentType: results[9],
        Hypothecation: results[10],
      });
    });
  };
  useEffect(() => {
    if (inputData.fieldName) getDetails();
    if (inputData.partnerId) getAllMaster();
  }, [inputData]);
  return {
    Masters: master,
  };
  // return {
  //   QuoteData: master,
  // };
}

const GetAllMasters = async (inputObj, setMasters) => {
  const { productId, partnerId } = inputObj;
  Promise.all([
    fetchProdPartnerMaster(productId, partnerId, "Gender", { Gender: "" }),
    fetchProdPartnerMaster(productId, partnerId, "NomineeRelation", { NomineeRelation: "" }),
    fetchProdPartnerMaster(productId, partnerId, "Nationality", { Nationality: "" }),
    // fetchProdPartnerMaster(productId, partnerId, "VariantDetails", {
    //   Variant_Id: VariantId,
    // }),
    // fetchProdPartnerMaster(productId, partnerId, "RtoDetails", { RTO_ID: VehicleDetails.RTOId }),
    fetchProdPartnerMaster(productId, partnerId, "Salutation", { Salutation: "" }),
    fetchProdPartnerMaster(productId, partnerId, "MaritalStatus", { MaritalStatus: "" }),
    fetchProdPartnerMaster(productId, partnerId, "Occupation", { Occupation: "" }),
    fetchProdPartnerMaster(productId, 0, "PolicyType", {}),
    fetchProdPartnerMaster(productId, 0, "DocumentType", { DocumentType: "" }),
    fetchProdPartnerMaster(productId, partnerId, "Hypothecation", {}),
  ]).then((resp) => {
    const res = {
      Gender: resp[0],
      NomineeRelation: resp[1],
      Nationality: resp[2],
      Salutation: resp[3],
      MaritalStatus: resp[4],
      Occupation: resp[5],
      PolicyType: resp[6],
      DocumentType: resp[7],
      Hypothecation: resp[8],
    };
    setMasters(res);
    // return res;
  });
};

const GetVehicleDetails = async (inputObj, setVehicle) => {
  const { productId, partnerId, variantId, rtoId } = inputObj;
  Promise.all([
    fetchProdPartnerMaster(productId, partnerId, "VariantDetails", {
      Variant_Id: variantId,
    }),
    fetchProdPartnerMaster(productId, partnerId, "RtoDetails", { RTO_ID: rtoId }),
  ]).then((resp) => {
    const res = {
      VehicleDetail: resp[0],
      RtoDetail: resp[1],
    };
    // console.log("VEHICLE", res);
    setVehicle(res);
    // return res;
  });
};

const GetICDetails = async (id, setPartner) => {
  const data = await getRequest(`Partner/GetPartnerDetails?partnerId=${id}`);
  setPartner(data.data);
  return data.data;
};

const GetQuote = async (quoteNo, setQuote) => {
  const data = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNo}`);
  setQuote(data.data);
  return data.data;
};

// API call to get the premium amount

const GetPremiumAmount = async (quoteNo, partnerId) => {
  const premiumDetails = await getRequest(
    `Quotation/GetQuoteDetailsByPartnerId?QuoteNumber=${quoteNo}&PartnerId=${partnerId}`
  );
  // console.log("ininin", premiumDetails);
  return premiumDetails;
};

// PAY U integration for Kotak

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
  key,
  productinfo,
  salt,
}) => {
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", action);

  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "hash");
  input.setAttribute("value", params);
  form.appendChild(input);
  const keyInput = document.createElement("input");
  keyInput.setAttribute("name", "key");
  keyInput.setAttribute("value", key);
  form.appendChild(keyInput);
  const txnid = document.createElement("input");
  txnid.setAttribute("name", "txnid");
  txnid.setAttribute("value", transactionID);
  form.appendChild(txnid);
  const amount = document.createElement("input");
  amount.setAttribute("name", "amount");
  amount.setAttribute("value", pamount);
  form.appendChild(amount);
  const productInfoInput = document.createElement("input");
  productInfoInput.setAttribute("name", "productinfo");
  productInfoInput.setAttribute("value", productinfo);
  form.appendChild(productInfoInput);
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
  const saltInput = document.createElement("input");
  saltInput.setAttribute("name", "salt");
  saltInput.setAttribute("value", salt);
  form.appendChild(saltInput);
  // console.log("form", form);
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
      action: data.data.postUrl,
      params: data.data.checksumHash,
      fn: data.data.firstname,
      pamount: data.data.amount,
      transactionID: data.data.transactionID,
      PEmail: bodyData.email,
      MobileNo: bodyData.phone,
      successurl: bodyData.surl,
      failureurl: bodyData.furl,
      salt: data.data.salt,
      key: data.data.key,
      productinfo: bodyData.productinfo,
    };
    post(details);
  });
};

const fetchPayUURL = async (productId, proposalNumber, PremiumAmount) => {
  try {
    // console.log("Inside fetch", proposalNumber);
    const paymentURL = await getRequest(
      `Policy/GeneratePGUrl?ProductId=${productId}&ProposalNumber=${encodeURIComponent(
        proposalNumber
      )}&Premiumamount=${PremiumAmount}`
    );
    // console.log("payment URL", paymentURL);
    return paymentURL.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export {
  GetProposalDetails,
  GetPDF,
  SaveProposal,
  GetPaymentURL,
  GetProductPartnerMaster,
  GetProposalDetailsByProposalNumber,
  GetAllMasters,
  GetVehicleDetails,
  GetICDetails,
  GetQuote,
  fetchPayUURL,
  makePayment,
  GetPremiumAmount,
  fetchProdPartnerMaster,
};
