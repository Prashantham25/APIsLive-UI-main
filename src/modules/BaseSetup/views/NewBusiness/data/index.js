import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";

// Lead APIs

async function GetLeadPool(type) {
  try {
    const res = await getRequest(`Lead/ContactPool?type=${type}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function GetLeadInfo(id) {
  try {
    const res = await getRequest(`Lead/LoadSuspectInformation?ContactID=${id}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function SaveLead(details) {
  try {
    const res = await postRequest(`Lead/SaveSuspect`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
async function ModifySuspect(details) {
  try {
    const res = await postRequest(`Lead/ModifySuspect`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetMasters() {
  try {
    const res = await getRequest(`Lead/GetMaster?isFilter=true`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetMasterLocation(masterList, parentId) {
  try {
    const res = await getRequest(
      `Lead/GetMasterLocation?sMasterlist=${masterList}&ParentId=${parentId}&isfilter=true`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

// Quotation APIs

async function GetQuotationCount() {
  try {
    const res = await getRequest(`Quotation/GetQuotationDetailCount`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetProductMasterAVO(masterType, parentId) {
  try {
    const res = await getRequest(
      `Product/GetProductMasterAvo?masterType=${masterType}&parentID=${parentId}`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetQuotationMaster(masterType) {
  try {
    const res = await getRequest(`LeadQuotation/GetQuotationMaster?masterType=${masterType}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function FetchQuotation() {
  try {
    const res = await getRequest(`Quotation/FetchQuotation`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetQuoteDetails(quoteNumber) {
  try {
    const res = await getRequest(`Quotation/GetQuoteDetailByNumber?QuoteNo=${quoteNumber}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function UpdateQuotation(details) {
  try {
    const res = await postRequest(`Quotation/QuotationUpdate`, details);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetRiders(productId, planId) {
  try {
    const res = await getRequest(`Product/GetRiders?ProductId=${productId}&PlanId=${planId}`);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function StoredProcedureResult(procedureName, requestJson) {
  try {
    const res = await postRequest(
      `Policy/GetStoredProcedureResult?StoredProcedureName=${procedureName}`,
      requestJson
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function CheckIllustration(illustrationName, from, to, requestBody) {
  // const requestBody = {
  //   EllConfigName: 26,
  //   From: "1",
  //   To: "5",
  //   Yr: "1",
  //   Mnth: "1",
  //   BasicPremium: "",
  //   Age: prospectDetails.age,
  //   DrawDownPeriod: productDetails.drawDownPeriodValue,
  //   PolicyTerm: productDetails.premiumData,
  //   AdditionalLifePremium: "",
  //   WOPpremium: "",
  //   AccidentBenefit: "",
  //   FundBalanceDiv8PrevVal: "0",
  //   FundBalanceDiv12PrevVal: "0",
  //   PremiumPayingPeriod: productDetails.premiumData,
  //   FundBalanceDiv4PrevVal: "0",
  // };
  try {
    const res = await postRequest(
      `RatingConfig/CheckIllustration/CheckIllustration/${illustrationName}?From=${from}&To=${to}`,
      requestBody
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export {
  GetLeadPool,
  GetLeadInfo,
  SaveLead,
  ModifySuspect,
  GetMasters,
  GetMasterLocation,
  GetQuotationCount,
  GetProductMasterAVO,
  GetQuotationMaster,
  FetchQuotation,
  GetQuoteDetails,
  UpdateQuotation,
  GetRiders,
  StoredProcedureResult,
  CheckIllustration,
};
