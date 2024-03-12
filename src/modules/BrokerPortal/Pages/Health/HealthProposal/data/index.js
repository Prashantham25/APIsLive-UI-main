import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";
import { setQuoteProposalOutput } from "../../../../context";

const getPartnerId = {
  CareHealth: 260,
  GoDigitHealth: 255,
  KotakHealth: 269,
  HDFCHealth: 270,
  ICICI: 77,
  USGI: 256,
};

const fetchProposalDetails = async (quoteNumber, partnerId, PartnerProdId) => {
  try {
    const proposalData = await getRequest(
      `Policy/GetQuoteForProposal?QuoteNo=${quoteNumber}&PartnerId=${partnerId}&PartnerProdId=${PartnerProdId}`
    );
    console.log("proposalDetails", proposalData.data);
    return proposalData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GetQuote1 = async (quoteNumber) => {
  try {
    const proposalData = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNumber}`);
    console.log("GetQuote1", proposalData.data);
    return proposalData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GetProposalDetails(dispatch, quoteNumber, partnerName) {
  // console.log("fast lane input", jsonValue);
  Promise.all([
    fetchProposalDetails(quoteNumber, getPartnerId[partnerName], 966),
    GetQuote1(quoteNumber),
  ]).then((results) => {
    const res = results[0].finalResult;
    const res1 = results[1].quoteInputJson.CustomerDetails;
    res.ProposerDetails.ContactNo = res1.MobileNo;
    res.ProposerDetails.CustomerFirstName = res1.FirstName;
    res.ProposerDetails.CustomerLastName = res1.LastName;
    res.ProposerDetails.Email = res1.Email;
    res.CorrelationId = results[1].quoteInputJson.CorrelationId;
    setQuoteProposalOutput(dispatch, { ...res });
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
    console.log("save details", saveData.data);
    return saveData.data;
  } catch (error) {
    return error;
  }
};

async function SaveProposal(partnerProductId, jsonValue) {
  return fetchSaveDetails(partnerProductId, jsonValue);
}

const fetchPaymentURL = async (productId, proposalNumber) => {
  try {
    const paymentURL = await getRequest(
      `Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`
    );
    console.log("payment URL", paymentURL.data);
    return paymentURL.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

function GetPaymentURL(productId, proposalNumber, setPaymentData) {
  console.log("payment url input", productId, proposalNumber);
  Promise.all([fetchPaymentURL(productId, proposalNumber)]).then((results) => {
    const data = results[0].finalResult;
    setPaymentData(data);
  });
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
    console.log("proposal masters", productId, partnerId, masterType, jsonValue, saveData.data);
    return saveData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GetProductPartnerMaster(inputData) {
  const [master, setMaster] = useState({
    Salutation: [],
    NomineeRelation: [],
    PincodeDetails: [],
    Occupation: [],
  });

  const { productId, partnerId, masterType, jsonValue } = inputData;
  let fieldName = null;
  if (masterType === "DetailsPincode") fieldName = "PincodeDetails";
  console.log("get product master input", inputData);

  const getDetails = () => {
    Promise.all([fetchProdPartnerMaster(productId, partnerId, masterType, jsonValue)]).then(
      (results) => {
        const data = results[0];
        console.log("Pin", data);
        setMaster({ ...master, [fieldName]: data });
      }
    );
  };

  const getAllMaster = async () => {
    Promise.all([
      fetchProdPartnerMaster(productId, partnerId, "Salutation", { Salutation: "" }),
      fetchProdPartnerMaster(productId, partnerId, "NomineeRelation", { NomineeRelation: "" }),
      fetchProdPartnerMaster(productId, partnerId, "Occupation", { Occupation: "" }),
    ]).then((results) => {
      setMaster({
        ...master,

        Salutation: results[0],
        NomineeRelation: results[1],
        Occupation: results[7],
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
    fetchProdPartnerMaster(productId, partnerId, "Salutation", { Salutation: "" }),
    fetchProdPartnerMaster(productId, partnerId, "Occupation", { Occupation: "" }),
  ]).then((resp) => {
    const res = {
      Salutation: resp[0],
      Occupation: resp[5],
    };
    setMasters(res);
    // return res;
  });
};

export { GetProposalDetails, GetProductPartnerMaster, GetAllMasters, GetPaymentURL, SaveProposal };
