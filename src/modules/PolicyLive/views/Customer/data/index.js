import { postRequest, getRequest } from "../../../../../core/clients/axiosclient";

const GetProdPartnermasterData = async (productId, masterType, obj) => {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
      obj
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
const GetProdPartnermasterData1 = async (productId, PartnerId, masterType, obj) => {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}&PartnerId=${PartnerId}`,
      obj
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
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

const generateQuickQuote = async (jsonValue) => {
  try {
    const quoteData = await postRequest(
      `Quotation/GenerateQuickQuote?ProductCode=BaseMotorProduct`,
      jsonValue
    );
    return quoteData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GetQuote = async (quoteNumber) => {
  try {
    const quoteData = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNumber}`);
    return quoteData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GetQuoteForProposal = async (quoteNumber, partnerId) => {
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

const SaveProposalDetails = async (PartnerProductId, obj) => {
  try {
    const proposalData = await postRequest(
      `Policy/SaveProposalDetails?PartnerProductId=${PartnerProductId}`,
      obj
    );
    // console.log("proposalDetails", proposalData.data);
    return proposalData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
function ImportAll(brands, brandList) {
  const images = {};
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item
        .replace("./", "")
        .toUpperCase()
        .replace(/\.[^/.]+$/, "");
      if (brandList.includes(myKey)) images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

const SaveCreateProposal = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/SaveCreateProposal`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const formate = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const GenerateCkycDetails = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/GenerateCkycDetails`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SendOTP = async (jsonValue) => {
  try {
    const proposal = await postRequest(`UserProfile/SendOTP`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const OTPVerification = async (jsonValue) => {
  try {
    const proposal = await postRequest(`UserProfile/OTPVerification`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GetProdPartnermasterData,
  GetProdPartnermasterData1,
  GenericApi,
  generateQuickQuote,
  GetQuote,
  GetQuoteForProposal,
  SaveProposalDetails,
  SaveCreateProposal,
  ImportAll,
  formate,
  GenerateCkycDetails,
  SendOTP,
  OTPVerification,
};
