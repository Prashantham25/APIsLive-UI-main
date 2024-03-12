import { postRequest, getRequest } from "../../../../../core/clients/axiosclient";

const GetProdPartnermasterData = async (productId, masterType, obj, PartnerId) => {
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

const UpdateQuote = async (QuoteNo, obj) => {
  try {
    const res = await postRequest(`Quotation/UpdateQuote?QuoteNumber=${QuoteNo}`, obj);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GenerateQuickQuote = async (obj) => {
  try {
    const res = await postRequest(
      `Quotation/GenerateQuickQuote?ProductCode=BaseHealthProduct`,
      obj
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetQuote = async (quoteNumber) => {
  try {
    const res = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNumber}`);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetQuoteForProposal = async (quoteNumber, partnerId, PartnerProdId) => {
  try {
    const res = await getRequest(
      `Policy/GetQuoteForProposal?QuoteNo=${quoteNumber}&PartnerId=${partnerId}&PartnerProdId=${PartnerProdId}`
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
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

const getPartnerId = (partnerName) => {
  const partnerList = [
    { name: "CareHealth", id: 260 },
    { name: "GoDigitHealth", id: 255 },
    { name: "KotakHealth", id: 269 },
    { name: "HDFCHealth", id: 270 },
    { name: "ICICI", id: 77 },
    { name: "USGI", id: 256 },
  ];

  const partnerId = partnerList.filter((x) => x.name === partnerName);
  return partnerId.length > 0 ? partnerId[0].id : "";
};

const GetProdPartnermasterData1 = async (ProductId, PartnerId, MasterType, obj) => {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${ProductId}&PartnerId=${PartnerId}&MasterType=${MasterType}`,
      obj
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const getAddDetailsByPincode = async (ProductId, PartnerId, pincode) => {
  const DetailsPincode = await GetProdPartnermasterData1(ProductId, PartnerId, "DetailsPincode", {
    Pincode: pincode,
  });

  const CityDistrict = await GetProdPartnermasterData1(ProductId, PartnerId, "CityDistrict", {
    City_Id: DetailsPincode.data[0].CityId,
  });

  const State = await GetProdPartnermasterData1(ProductId, PartnerId, "State", {
    State_Id: CityDistrict.data[0].StateId,
  });

  return {
    detailsPincode: DetailsPincode.data[0],
    cityDistrict: CityDistrict.data[0],
    state: State.data[0],
  };
};

export {
  GetProdPartnermasterData,
  getAddDetailsByPincode,
  UpdateQuote,
  GenerateQuickQuote,
  GetQuote,
  GetQuoteForProposal,
  GetQuote1,
  getPartnerId,
};
