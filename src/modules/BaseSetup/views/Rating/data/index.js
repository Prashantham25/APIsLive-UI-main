// import axios from "axios";
import { getRequest, postRequest, deleteRequest } from "../../../../../core/clients/axiosclient";

const Parameters = async () => {
  try {
    const Product = await postRequest(`RatingConfig/SearchRateParameters`);

    return Product.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const CreateParameter = async ({ feilds }) => {
  //  debugger;
  try {
    const Product = await postRequest(`RatingConfig/CreateParameter`, feilds);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetRateRule = async () => {
  // debugger;
  try {
    const Product = await getRequest(`RatingConfig/GetRateRule`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetEventParameter = async (EventId) => {
  // debugger;
  try {
    const Product = await getRequest(`RatingConfig/GetHandleExecEvents?EventId=${EventId}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const DeleteValue = async (parametersId) => {
  //  debugger;
  try {
    const Product = await deleteRequest(
      `RatingConfig/DeleteRatingParameter/DeleteRatingParameter?ParameterId=${parametersId}`
    );

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const CreateParamSet = async ({ feilds }) => {
  //  debugger;
  try {
    const Product = await postRequest(`RatingConfig/CreateParamSet`, feilds);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const RateUpload = async (fields, data, version) => {
  //  debugger;
  try {
    const Product = await postRequest(
      `RatingConfig/RateUpload?RateName=${fields.rateName}&RateObj=${fields.rateObj}&StartDate=${fields.startDate}&Enddate=${fields.endDate}&isVersion=${version}`,
      data
    );
    //  axios.defaults.headers = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6Im9taS5hc2hpc2hAZ21haWwuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIiLCJSb2xlIjoiQmVuZWZpdCBTdXBlcnZpc29yIiwiTmFtZSI6IkFkbWluIiwiVXNlck5hbWUiOiJlaW51YmVhZG1pbiIsIlByb2R1Y3RUeXBlIjoiTWljYSIsIlNlcnZlclR5cGUiOiIyOTciLCJleHAiOjE3OTMzNDA1NTIsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.iKuuYvyVMt8zBfTPEYdowvFDkcWdzQxjJj3Ya5D3ls0",
    // };
    // const Product = axios.post(
    //   `https://localhost:44364/api/RatingConfig/RateUpload?RateName=${fields.rateName}&RateObj=${fields.rateObj}&StartDate=${fields.startDate}&Enddate=${fields.endDate}&isVersion=${version}`,
    //   data
    // );
    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const RuleSet = async (fields) => {
  //  debugger;
  try {
    const Product = await postRequest(
      `RatingConfig/CheckRuleSets/CheckRuleSets/${fields.RateName}`,
      fields
    );

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const RateNameRule = async () => {
  try {
    const Rate = await getRequest(`RatingConfig/GetRuleObjects`);
    // axios.defaults.headers = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI1Y2M0ZTFjZi04MzYxLTQwY2QtODVjMC1hMjE3YThiZGEwYTYiLCJFbWFpbCI6Im9taS5hc2hpc2hAZ21haWwuY29tIiwiT3JnSWQiOiIxMTIiLCJQYXJ0bmVySWQiOiIiLCJSb2xlIjoiQmVuZWZpdCBTdXBlcnZpc29yIiwiTmFtZSI6IkFkbWluIiwiVXNlck5hbWUiOiJlaW51YmVhZG1pbiIsIlByb2R1Y3RUeXBlIjoiTWljYSIsIlNlcnZlclR5cGUiOiIyOTciLCJleHAiOjE3OTMzNDA1NTIsImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.iKuuYvyVMt8zBfTPEYdowvFDkcWdzQxjJj3Ya5D3ls0",
    // };
    // const Rate = await axios.get(`https://localhost:44364/api/RatingConfig/GetRuleObjects`);
    return Rate.data;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const CreateCal = async (fields1) => {
  //    debugger;
  try {
    const Product = await postRequest(`RatingConfig/CreateCalConfigRules`, fields1);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const UpdateCal = async (fields1) => {
  try {
    const Product = await postRequest(`RatingConfig/EditCalConfigRules`, fields1);
    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const deleteExp = async (expId, id) => {
  try {
    const exp = await deleteRequest(
      `RatingConfig/DeleteCalculationExpression/DeleteExpression?expressionId=${expId}&paramId=${id}`
    );
    return exp;
  } catch (error) {
    return error;
  }
};
const GetRatesParam = async (EventId) => {
  //  debugger;
  try {
    const Product = await getRequest(`RatingConfig/GetHandleExecEventsObject?EventId=${EventId}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetHandleEvents = async (EventId) => {
  // debugger;
  try {
    const Product = await getRequest(`RatingConfig/GetHandleEvents?EventId=${EventId}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetOutputParams = async (id) => {
  // debugger;
  try {
    const params = await getRequest(`RatingConfig/OutputParamsObject?CalconfigId=${id}`);

    return params;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const RateNameUpload = async (rate, data) => {
  //  debugger;
  try {
    const Product = await postRequest(
      `RatingConfig/UploadCalculationConfig?RateName=${rate.RateName}`,
      data
    );

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetRateConfig = async () => {
  //  debugger;
  try {
    const Product = await getRequest("RatingConfig/GetRateConfigName?isFilter=true");

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetParamTypeSet = async (EventId) => {
  // debugger;
  try {
    const Product = await getRequest(`RatingConfig/GetParamterTypeSetByRate?RatingId=${EventId}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetCalculation = async () => {
  try {
    const Rate = await getRequest(`RatingConfig/GetCalculationConfiguration`);
    return Rate.data.finalDTO;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetGridRates = async (RuleId) => {
  // debugger;
  try {
    const Product = await getRequest(`RatingConfig/GetRateRulesGrid?RuleId=${RuleId}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const RateReupload = async (fields, data) => {
  //  debugger;
  try {
    const Product = await postRequest(
      `RatingConfig/RateReupload?RatingId=${fields.RateName}`,
      data
    );

    return Product;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetRateByParameter = async (fields, data) => {
  // debugger;
  try {
    const Product = await postRequest(
      `RatingConfig/GetRateRulesGridByParameter?RatingId=${fields}`,
      data
    );

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetCalConfigExp = async (feilds) => {
  //  debugger;
  try {
    const Product = await getRequest(
      `RatingConfig/GetCalConfigExpressions?CalculationConfigId=${feilds.CalculationConfigId}%20&isFilter=true`
    );

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetCalConfigParam = async (feilds) => {
  //  debugger;
  try {
    const Product = await getRequest(
      `RatingConfig/GetCalConfigParam?CalculationConfigId=${feilds.CalculationConfigId}%20&isFilter=true`
    );

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const EditCalSave = async (fields1) => {
  //  debugger;
  try {
    const Product = await postRequest(`RatingConfig/EditCalConfigRules`, fields1);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const CheckCalRating = async (fields, json) => {
  //  debugger;
  try {
    const Product = await postRequest(
      `RatingConfig/CheckCalculationRatingMapping/CheckCalculationRatingMapping/${fields.RateName}`,
      json
    );

    return Product;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const deleteMappedParam = async (MapperId, CalculatorId) => {
  try {
    const data = await deleteRequest(
      `RatingConfig/DeleteMappedParameters?MapperId=${MapperId}&CalculatorId=${CalculatorId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

const deleteCalculatorParameters = async (calcId, paramId) => {
  try {
    const data = await deleteRequest(
      `RatingConfig/DeleteCalculatorParameters?ParamId=${paramId}&CalculatorId=${calcId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
const deleteCalculatorMapperParameters = async (mapperId, calcId) => {
  try {
    const data = await deleteRequest(
      `RatingConfig/DeleteCalculatorMappingParameters?MapperId=${mapperId}&CalculationConfigId=${calcId}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
export {
  CreateParameter,
  Parameters,
  GetRateRule,
  GetEventParameter,
  GetHandleEvents,
  DeleteValue,
  CreateParamSet,
  RateUpload,
  RuleSet,
  RateNameRule,
  CreateCal,
  GetRatesParam,
  RateNameUpload,
  GetRateConfig,
  GetParamTypeSet,
  GetCalculation,
  GetGridRates,
  RateReupload,
  GetRateByParameter,
  GetCalConfigExp,
  GetCalConfigParam,
  EditCalSave,
  CheckCalRating,
  UpdateCal,
  deleteExp,
  deleteMappedParam,
  deleteCalculatorParameters,
  GetOutputParams,
  deleteCalculatorMapperParameters,
};
