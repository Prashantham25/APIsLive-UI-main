import { postRequest, getRequest } from "core/clients/axiosclient";
import { setFastLaneOutput, setGetQuoteOutput, setQuickQuoteOutput } from "../../../context";

const getQuoteData = async (quoteNumber) => {
  try {
    const quoteData = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNumber}`);
    // setMaster(quoteData.data);
    console.log("getQuoteData", quoteData.data);
    return quoteData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
function GetQuote(dispatch, quoteNumber) {
  // const [master, setMaster] = useState(null);
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
      `Quotation/GenerateQuickQuote?ProductCode=BaseMotorProduct`,
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
    setQuickQuoteOutput(dispatch, { ...results[0] });
  });
  // return {
  //   QuoteData: master,
  // };
}

const fetchFastLaneData = async (jsonValue) => {
  try {
    const motorData = await postRequest(
      `Product/GenericApi?ProductCode=FastLane&ApiName=Fastlane_service`,
      jsonValue
    );
    console.log("fastLane", motorData.data);
    return motorData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function FastLane(dispatch, jsonValue) {
  console.log("fast lane input", jsonValue);
  Promise.all([fetchFastLaneData(jsonValue)]).then((results) => {
    setFastLaneOutput(dispatch, results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}

const Getpermittype = async (Json) => {
  try {
    const Data = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=449&MasterType=TypeofPermit`,
      Json
    );
    return Data.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GetGCVwheelers = async (Json, matertype) => {
  // Others (More Than 4 wheelers)
  try {
    const Data = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=449&MasterType=${matertype}`,
      Json
    );
    return Data.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
export { GenerateQuickQuote, GetQuote, FastLane, Getpermittype, GetGCVwheelers };
