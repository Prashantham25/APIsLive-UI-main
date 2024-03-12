import { useEffect, useState } from "react";
import { postRequest, getRequest } from "core/clients/axiosclient";
import { setGetQuoteOutput, setQuickQuoteOutput, setQuoteProposalOutput } from "../../../context";

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

// 99
// 75
const getQuoteData = async (quoteNumber) => {
  try {
    // console.log("quotenumber",quoteNumber)
    const quoteData = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNumber}`);
    // setMaster(quoteData.data);
    console.log("getQuoteData", quoteData);
    return quoteData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
function GetQuote(dispatch, quoteNumber) {
  // const [master, setMaster] = useState(null);
  console.log("123457", quoteNumber);
  Promise.all([getQuoteData(quoteNumber)]).then((results) => {
    setGetQuoteOutput(dispatch, results[0]);
  });

  // return {
  //   CompData: master,
  // };
}

const generateQuickQuote = async (jsonValue) => {
  try {
    const quoteData = await postRequest(
      `Quotation/GenerateQuickQuote?ProductCode=BPTravel`,
      jsonValue
    );
    console.log("generateQuickQuote", quoteData.data);
    return quoteData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GenerateQuickQuote(dispatch, jsonValue) {
  // console.log("JSON value", jsonValue);
  Promise.all([generateQuickQuote(jsonValue)]).then((results) => {
    setQuickQuoteOutput(dispatch, results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}
const getPartnerId = {
  CareHealth: 260,
  GoDigitHealth: 255,
  KotakHealth: 269,
  HDFCHealth: 270,
  ICICI: 77,
  Reliance: 99,
  Kotak: 128,
  BajajAlliance: 86,
  IffcoTokio: 225,
  HDFC: 73,
  USGI: 256,
  GoDigit: 62,
  TataAIG: 59,
};

const fetchProposalDetails = async (quoteNumber, partnerId, partnerProductId) => {
  try {
    const proposalData = await getRequest(
      `Policy/GetQuoteForProposal?QuoteNo=${quoteNumber}&PartnerId=${partnerId}&PartnerProdId=${partnerProductId}`
    );
    console.log("proposalDetails", proposalData.data);
    return proposalData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

async function GetProposalDetails(dispatch, quoteNumber, partnerName, partnerProductId) {
  // console.log("fast lane input", jsonValue);
  await Promise.all([
    fetchProposalDetails(quoteNumber, getPartnerId[partnerName], partnerProductId),
  ]).then((results) => {
    setQuoteProposalOutput(dispatch, results[0].finalResult);
    console.log(123123, results[0].finalResult);
  });
  // return {
  //   QuoteData: master,
  // };
}

const fetchSaveDetails = async (partnerProductId, jsonValue, productId, partnerId) => {
  try {
    const saveData = await postRequest(
      `Policy/SaveProposalDetails?PartnerProductId=${partnerProductId}&BProdId=${productId}&PartnerId=${partnerId}`,
      jsonValue
    );
    console.log("save details", saveData.data);
    return saveData.data;
  } catch (error) {
    return error;
  }
};

async function SaveProposal(partnerProductId, jsonValue, productId, partnerId) {
  return fetchSaveDetails(partnerProductId, jsonValue, productId, partnerId);
}

const fetchPaymentURL = async (productproductId, proposalNumber, productId, partnerId) => {
  try {
    const paymentURL = await getRequest(
      `Policy/GeneratePaymentUrl?ProductId=${productproductId}&ProposalNumber=${proposalNumber}&BProdId=${productId}&PartnerId=${partnerId}`
    );
    console.log("payment URL", paymentURL.data);
    return paymentURL.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

function GetPaymentURL(productproductId, proposalNumber, productId, partnerId, setPaymentData) {
  console.log("payment url input", productId, proposalNumber);
  Promise.all([fetchPaymentURL(productproductId, proposalNumber, productId, partnerId)]).then(
    (results) => {
      const data = results[0].finalResult;
      setPaymentData(data);
    }
  );
  // return {
  //   QuoteData: master,
  // };
}
const fetchProdPartnerMaster = async (productId, masterType, jsonValue) => {
  try {
    const saveData = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
      jsonValue
    );
    console.log("proposal masters", productId, masterType, jsonValue, saveData.data);
    if (!saveData.data.status) {
      return saveData.data;
    }
    if (saveData.data.status) {
      return [];
    }
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const getCountryData = async (MasterType, obj) => {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=918&MasterType=${MasterType}`,
      obj
    );
    console.log("res", res);
    return res;
  } catch (error) {
    console.log(error);
  }

  return null;
};
function GetProductPartnerMaster(inputData) {
  const [master, setMaster] = useState({
    TripType: [],
    InsuredRelationShip: [],
    SumInsured: [],
    TravelPolicyType: [],
    TravelPEDList: [],
    Visatype: [],
    Nationality: [],
    Purposeoftravel: [],
    Geography: [],
    CountryOnGeography: [],
    SumInsuredinEuros: [],
    Salutation: [],
    Occupation: [],
    TravelRelation: [],
    SportsActivity: [],
    MultiTripDuration: [],
    TravelAddonCovers: [],
    ICList: [],
  });

  const { productId, masterType, jsonValue } = inputData;
  console.log("masterType, jsonValue", masterType, jsonValue);

  const getAllMaster = async () => {
    Promise.all([
      fetchProdPartnerMaster(productId, "TripType", { TripType: "" }),
      fetchProdPartnerMaster(productId, "InsuredRelationShip", { InsuredRelationShip: "" }),
      fetchProdPartnerMaster(productId, "SumInsured", { SumInsured: "" }),
      fetchProdPartnerMaster(productId, "TravelPolicyType", { TravelPolicyType: "" }),
      fetchProdPartnerMaster(productId, "TravelPEDList", { TravelPEDList: "" }),
      fetchProdPartnerMaster(productId, "Visatype", { Visatype: "" }),
      fetchProdPartnerMaster(productId, "Purposeoftravel", { Purposeoftravel: "" }),
      fetchProdPartnerMaster(productId, "Nationality", { Nationality: "" }),
      fetchProdPartnerMaster(productId, "Geography", { Geography: "" }),
      fetchProdPartnerMaster(productId, "SumInsuredinEuros", { SumInsuredinEuros: "" }),
      fetchProdPartnerMaster(productId, "Salutation", { Salutation: "" }),
      fetchProdPartnerMaster(productId, "Occupation", { Occupation: "" }),
      fetchProdPartnerMaster(productId, "TravelRelation", { TravelRelation: "" }),
      fetchProdPartnerMaster(productId, "SportsActivity", { SportsActivity: "" }),
      fetchProdPartnerMaster(productId, "MultiTripDuration", { MultiTripDuration: "" }),
      fetchProdPartnerMaster(productId, "TravelAddonCovers", { TravelAddonCovers: "" }),
      fetchProdPartnerMaster(productId, "ICList", { ICList: "" }),
    ]).then((results) => {
      console.log("mastersResults", results);

      setMaster({
        ...master,
        TripType: results[0],
        InsuredRelationShip: results[1],
        SumInsured: results[2],
        TravelPolicyType: results[3],
        TravelPEDList: results[4],
        Visatype: results[5],
        Purposeoftravel: results[6],
        Nationality: results[7],
        Geography: results[8],
        SumInsuredinEuros: results[9],
        Salutation: results[10],
        Occupation: results[11],
        TravelRelation: results[12],
        SportsActivity: results[13],
        MultiTripDuration: results[14],
        TravelAddonCovers: results[15],
        ICList: results[16],
      });
    });
  };
  useEffect(() => {
    if (inputData.productId) getAllMaster();
  }, [inputData.productId]);
  return {
    Masters: master,
  };
  // return {
  //   QuoteData: master,
  // };
}

const fetchProdPartnerMasterProposer = async (productId, partnerId, masterType, jsonValue) => {
  try {
    const saveData = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&PartnerId=${partnerId}&MasterType=${masterType}`,
      jsonValue
    );
    console.log("proposal masters", productId, partnerId, masterType, jsonValue, saveData.data);
    if (!saveData.data.status) {
      return saveData.data;
    }
    if (saveData.data.status) {
      return [];
    }
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GetProductPartnerMasterProposer(inputData) {
  const [master, setMaster] = useState({
    TripType: [],
    InsuredRelationShip: [],
    SumInsured: [],
    TravelPolicyType: [],
    TravelPEDList: [],
    Visatype: [],
    Nationality: [],
    Purposeoftravel: [],
    Geography: [],
    CountryOnGeography: [],
    SumInsuredinEuros: [],
    Salutation: [],
    Occupation: [],
    NomineeRelation: [],
    TravelInsuredRelation: [],
    TravelOccupation: [],
    TravelNomineeRelationship: [],
    Gender: [],
  });

  const { productId, partnerId, masterType, jsonValue } = inputData;
  console.log("masterType, jsonValue", masterType, jsonValue);

  const getAllMaster = async () => {
    Promise.all([
      fetchProdPartnerMasterProposer(productId, partnerId, "TripType", { TripType: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "InsuredRelationShip", {
        InsuredRelationShip: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "SumInsured", { SumInsured: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "TravelPolicyType", {
        TravelPolicyType: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "TravelPEDList", { TravelPEDList: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "Visatype", { Visatype: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "Purposeoftravel", {
        Purposeoftravel: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "Nationality", { Nationality: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "Geography", { Geography: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "SumInsuredinEuros", {
        SumInsuredinEuros: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "Salutation", { Salutation: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "Occupation", { Occupation: "" }),
      fetchProdPartnerMasterProposer(productId, partnerId, "NomineeRelation", {
        NomineeRelation: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "TravelInsuredRelation", {
        TravelInsuredRelation: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "TravelOccupation", {
        TravelOccupation: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "TravelNomineeRelationship", {
        TravelNomineeRelationship: "",
      }),
      fetchProdPartnerMasterProposer(productId, partnerId, "Gender", {
        Gender: "",
      }),

      // fetchProdPartnerMaster(productId, "CountryOnGeography", { CountryOnGeography: "" }),
    ]).then((results) => {
      console.log("mastersResults", results);

      setMaster({
        ...master,
        TripType: results[0],
        InsuredRelationShip: results[1],
        SumInsured: results[2],
        TravelPolicyType: results[3],
        TravelPEDList: results[4],
        Visatype: results[5],
        Purposeoftravel: results[6],
        Nationality: results[7],
        Geography: results[8],
        SumInsuredinEuros: results[9],
        Salutation: results[10],
        Occupation: results[11],
        NomineeRelation: results[12],
        TravelInsuredRelation: results[13],
        TravelOccupation: results[14],
        TravelNomineeRelationship: results[15],
        Gender: results[16],

        // CountryOnGeography: results[9],
      });
    });
  };
  useEffect(() => {
    if (inputData.partnerId) getAllMaster();
  }, [inputData.partnerId]);
  return {
    ProposerMasters: master,
  };
  // return {
  //   QuoteData: master,
  // };
}

const GetCountry = async (obj, setMasters) => {
  // const { productId } = inputObj;
  Promise.all([getCountryData("CountryOnGeography", obj)]).then((resp) => {
    console.log("GetCountry", resp);
    const res = {
      CountryOnGeography: resp[0].data,
    };
    setMasters(res);
    console.log("res", res);
    // return res;
  });
};

const sendMail = async (proposalNumber, emailId) => {
  const jsonValue = {
    communicationId: 140,
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
    const mail = await postRequest(`Notifications/EventCommunicationExecution`, jsonValue); // const mail = await getRequest(`Policy/GeneratePaymentUrl?ProductId=${productId}&ProposalNumber=${proposalNumber}`);
    return mail.data;
  } catch (error) {
    console.log(error);
  }

  return null;
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
const GetICDetails = async (id, setPartner) => {
  const data = await getRequest(`Partner/GetPartnerDetails?partnerId=${id}`);
  setPartner(data.data);
  return data.data;
};

const GetAllMasters = async (inputObj, setMasters) => {
  const { productId } = inputObj;
  Promise.all([
    fetchProdPartnerMaster(productId, "TravelPolicyType", { TravelPolicyType: "" }),
    fetchProdPartnerMaster(productId, "TripType", { TripType: "" }),
    fetchProdPartnerMaster(productId, "Visatype", { Visatype: "" }),
    fetchProdPartnerMaster(productId, "Salutation", { Salutation: "" }),
    fetchProdPartnerMaster(productId, "TravelPEDList", { TravelPEDList: "" }),
  ]).then((resp) => {
    console.log("GetAllMasters", resp);
    const res = {
      TravelPolicyType: resp[0],
      TripType: resp[1],
      Visatype: resp[2],
      Salutation: resp[3],
      TravelPEDList: resp[4],
    };
    setMasters(res);
    console.log("res", res);
    // return res;
  });
};

const GetAllMastersProposer = async (inputObj, setMasters) => {
  const { productId, partnerId } = inputObj;
  Promise.all([
    fetchProdPartnerMasterProposer(productId, partnerId, "Gender", { Gender: "" }),
    fetchProdPartnerMasterProposer(productId, partnerId, "Salutation", { Salutation: "" }),

    fetchProdPartnerMasterProposer(productId, partnerId, "TravelInsuredRelation", {
      TravelInsuredRelation: "",
    }),
    fetchProdPartnerMasterProposer(productId, partnerId, "TravelOccupation", {
      TravelOccupation: "",
    }),
    fetchProdPartnerMasterProposer(productId, partnerId, "Purposeoftravel", {
      Purposeoftravel: "",
    }),
    fetchProdPartnerMasterProposer(productId, partnerId, "Nationality", {
      Nationality: "",
    }),
    fetchProdPartnerMasterProposer(productId, partnerId, "TravelNomineeRelationship", {
      TravelNomineeRelationship: "",
    }),
  ]).then((resp) => {
    console.log("GetAllMastersProposer", resp);
    const res = {
      Gender: resp[0],
      Salutation: resp[1],
      TravelInsuredRelation: resp[2],
      TravelOccupation: resp[3],
      Purposeoftravel: resp[4],
      Nationality: resp[5],
      TravelNomineeRelationship: resp[6],
    };
    setMasters(res);
    console.log("res", res);
    // return res;
  });
};

const getComparisonData = async (partnerList) => {
  let stringData = partnerList.reduce(
    (result, item) => `${result}${item.quoteDetails.partnerProductCode},`,
    ""
  );
  stringData = stringData.slice(0, -1);
  console.log("comparison Data input ", stringData, partnerList);
  try {
    const policyDetailsData = await getRequest(
      `Product/GetProductPartnerPlanFeature?ProductCode=BPTravel&ListOfPlans=${stringData}`
    );
    console.log("getComparisonData", policyDetailsData.data);
    return policyDetailsData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function ComparisonData(setData, partnerList) {
  // console.log("JSON value", jsonValue);
  Promise.all([getComparisonData(partnerList)]).then((results) => {
    // console.log("results12", results);
    setData(results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}

const fetchPDFData = async (jsonValue) => {
  try {
    const pdfData = await postRequest(
      `Policy/GetPolicyPDF?BProdId=${jsonValue.baseProductId}&PartnerId=${jsonValue.partnerId}`,
      jsonValue
    );
    console.log("pdfData", pdfData.data);
    return pdfData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GetPDF(setPdf, jsonValue) {
  // console.log("fast lane input", jsonValue);
  Promise.all([fetchPDFData(jsonValue)]).then((results) => {
    console.log("PDF Output", results[0].finalResult);
    const pdf = results[0].finalResult.OutputResult;
    setPdf(pdf);
  });
  // return {
  //   QuoteData: master,
  // };
}

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
  GenerateQuickQuote,
  GetQuote,
  GetPaymentURL,
  SaveProposal,
  GetProposalDetails,
  GetProductPartnerMaster,
  sendMail,
  GetProposalDetailsByProposalNumber,
  GetICDetails,
  GetAllMasters,
  getCountryData,
  ComparisonData,
  GetCountry,
  GetProductPartnerMasterProposer,
  GetPDF,
  GetAllMastersProposer,
};
